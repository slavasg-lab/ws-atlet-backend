import { WebSocket } from "ws";
import { PrismaClient } from "@prisma/client";

import { ClientToServerEvents } from "../types/WebSocket/Events";
import messageValidator from "../middlewares/message-validator.middleware";
import { UsersService } from "../services/users.service";
import { SessionsService } from "../services/sessions.service";

export class EventsHandler {
  private readonly usersService: UsersService;
  private readonly sessionsService: SessionsService;

  constructor(prisma: PrismaClient) {
    this.usersService = new UsersService(prisma);
    this.sessionsService = new SessionsService(prisma);
  }

  async handleConnection(ws: WebSocket) {
    ws.on("message", async (rawMessage) => {
      // ~ validation of message
      const parsed = messageValidator(rawMessage);
      if (!parsed) return;

      const { event, data } = parsed;

      // ~ controller
      if (event === ClientToServerEvents.sessionCreationRequested) await this.handleCreateSession();
      if (event === ClientToServerEvents.sensorReadingsBatchSent)
        await this.handleWriteSensorReadings();
      if (event === ClientToServerEvents.sessionDestoymentRequested)
        await this.handleDestroySession();
    });
  }
  async handleCreateSession() {}
  async handleWriteSensorReadings() {}
  async handleDestroySession() {}
}
