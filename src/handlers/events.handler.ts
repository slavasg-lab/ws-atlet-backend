import { WebSocket } from "ws";
import { PrismaClient } from "@prisma/client";

import { ClientToServerEvents } from "../types/WebSocket/Events";
import { UsersService } from "../services/users.service";
import { SessionsService } from "../services/sessions.service";
import messageValidator from "../middlewares/message-validator.middleware";

export class EventsHandler {
  constructor(public usersService: UsersService, private sessionsService: SessionsService) {}

  async handleConnection(ws: WebSocket) {
    ws.on("message", async (rawMessage) => {
      try {
        // ~ validation of message
        const parsed = messageValidator(rawMessage);
        if (!parsed) return;

        const { event, data } = parsed;

        // console.log("this", this);
        // const user = await this.usersService.findUserByPublicKey(
        //   "ed25519:73g5FkDR5f9onJM7goQEZFMZZTH53Gv4cGAaEeEoQgDW",
        // );
        // console.log(user);

        // ~ controller
        if (event === ClientToServerEvents.sessionCreationRequested)
          await this.handleCreateSession();
        else if (event === ClientToServerEvents.sensorReadingsBatchSent)
          await this.handleWriteSensorReadings();
        else if (event === ClientToServerEvents.sessionDestoymentRequested)
          await this.handleDestroySession();
      } catch (err) {
        return console.error(err);
      }
    });
  }
  async handleCreateSession() {}
  async handleWriteSensorReadings() {}
  async handleDestroySession() {}
}
