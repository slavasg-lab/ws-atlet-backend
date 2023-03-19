import { WebSocketServer, RawData, WebSocket } from "ws";
import { z } from "zod";

import handlers from "./src/handlers";
import { InvalidEventDataError, InvalidMessageError, RejectionEvent } from "./src/errors";
import { Event } from "./src/types/types";

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

// const eventsHandler = new EventsHandler();
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", async function message(rawMessage: RawData) {
    let handler;
    try {
      const { event, data } = parseRawMessage(rawMessage);

      // get event handler, throw error otherwise
      handler = handlers.get(event);
      if (!handler) {
        throw Error(`[WARNING] No handler for ${event} event found.`);
      }

      // validate event data
      const input = handler.event.data.schema.parse(data);

      // execute handler, throw error otherwise
      const result = await handler.execute(input);
      sendMessage(ws, handler.event, result);
    } catch (error) {
      if (error instanceof InvalidMessageError) {
        // sendErrorMessage(ws, ???, "The message has invalid schema")
      }
      if (error instanceof InvalidEventDataError) {
        sendErrorMessage(ws, handler.event, 'The "data" field has invalid schema');
      }
      if (error instanceof RejectionEvent) {
        const { event, description } = error;

        return ws.send(
          JSON.stringify({
            event: event.name,
            data: {
              ok: false,
              description,
            },
          }),
        );
      }
      console.error(error);
      process.exit(1);
    }
  });

  ws.send("something");
});

function parseRawMessage(rawMessage: RawData) {
  try {
    const message = JSON.parse(rawMessage.toString());

    return z.object({ event: z.string(), data: z.unknown() }).parse(message);
  } catch (error) {
    throw new InvalidMessageError();
  }
}

function sendMessage(ws: WebSocket, event: Event, result: unknown) {
  return ws.send(
    JSON.stringify({
      event: event.name,
      data: {
        ok: true,
        result,
      },
    }),
  );
}

function sendErrorMessage(ws: WebSocket, event: Event, description: string) {
  return ws.send(
    JSON.stringify({
      event: event.name,
      data: {
        ok: false,
        description,
      },
    }),
  );
}
