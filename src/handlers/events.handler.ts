import { WebSocket } from "ws";

import { ClientToServerEvents } from "../types/Events";
import messageValidator from "../middlewares/message-validator.middleware";

class EventsHandler {
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

export default new EventsHandler();
