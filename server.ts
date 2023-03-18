import { WebSocketServer, RawData } from "ws";
import { z } from "zod";
import { ClientToServerEvents } from "./src/types/WebSocket/Events";
import handlers from "./src/handlers";
import { CustomError } from "./src/errors";

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
    try {
      const { event, data } = parseRawMessage(rawMessage);
      // get event handler, throw error otherwise
      const handler = handlers.get(event);
      if (!handler) {
        throw Error(`[WARNING] No handler for ${event} event found.`);
      }
      // execute handler, throw error otherwise
      await handler.execute(ws, data);
    } catch (error) {
      if (error instanceof CustomError) {
        const { event, description } = error;
        return ws.send(JSON.stringify({ event, data: { ok: false, description } }));
      }
      console.error(error);
      process.exit(1);
    }
  });

  ws.send("something");
});

function parseRawMessage(rawMessage: RawData) {
  const message = JSON.parse(rawMessage.toString());
  z.object({ event: z.nativeEnum(ClientToServerEvents) }).parse(message);
  return message;
}
