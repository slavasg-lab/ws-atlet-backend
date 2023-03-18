import { Prisma, PrismaClient } from "@prisma/client";
import { WebSocketServer } from "ws";
import { EventsHandler } from "./src/handlers/events.handler";
import { SessionsService } from "./src/services/sessions.service";
import { UsersService } from "./src/services/users.service";

const startWSS = async () => {
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

  const prisma = new PrismaClient();

  const usersService = new UsersService(prisma);
  const sessionsService = new SessionsService(prisma);

  const eventsHandler = new EventsHandler(usersService, sessionsService);
  wss.on("connection", eventsHandler.handleConnection);

  return wss;
};

startWSS();
