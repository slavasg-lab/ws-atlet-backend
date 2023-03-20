import { WebSocketServer, RawData, WebSocket } from "ws";
import { z } from "zod";

import handlers from "./src/handlers";
import {
  InvalidEventDataError,
  InvalidEventNameError,
  InvalidMessageError,
  RejectionEvent,
} from "./src/errors";
import { Event, Handler } from "./src/types/types";

const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  },
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", async function message(rawMessage: RawData) {
    let handler;
    try {
      const { event, data } = parseRawMessage(rawMessage);

      // get event handler, throw error otherwise
      handler = handlers.get(event);

      // !!! Rethink about it
      if (!handler) {
        throw new InvalidEventNameError();
        // throw Error(`[WARNING] No handler for ${event} event found.`);
      }

      // validate event data
      let input;
      try {
        input = handler.event.data.schema.parse(data);
      } catch (error) {
        throw new InvalidEventDataError();
      }

      // execute handler, throw error otherwise
      const result = await handler.execute(input);
      return sendMessage(ws, handler.event.name, result);
    } catch (error) {
      if (error instanceof InvalidMessageError) {
        return sendErrorMessage(ws, "invalid_message_received", "The message has invalid schema");
      }
      if (error instanceof InvalidEventNameError) {
        return sendErrorMessage(ws, "invalid_event_received", "The event is not found");
      }
      if (error instanceof InvalidEventDataError) {
        return sendErrorMessage(ws, handler.event.name, 'The "data" field has invalid schema');
      }
      if (error instanceof RejectionEvent) {
        return sendErrorMessage(ws, handler.event.name, error.description);
      }

      console.error(error);
      process.exit(1);
    }
  });
});

function parseRawMessage(rawMessage: RawData) {
  try {
    const message = JSON.parse(rawMessage.toString());

    return z.object({ event: z.string(), data: z.unknown() }).parse(message);
  } catch (error) {
    throw new InvalidMessageError();
  }
}

function sendMessage(ws: WebSocket, eventName: string, result: unknown) {
  return ws.send(
    JSON.stringify({
      event: eventName,
      data: {
        ok: true,
        result,
      },
    }),
  );
}

function sendErrorMessage(ws: WebSocket, eventName: string, description: string) {
  return ws.send(
    JSON.stringify({
      event: eventName,
      data: {
        ok: false,
        description,
      },
    }),
  );
}

export default wss;
