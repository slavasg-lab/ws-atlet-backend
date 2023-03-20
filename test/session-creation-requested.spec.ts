import * as WebSocket from "ws";

import wss from "../server";
import { sendSocketMessageAndWaitForResponse } from "./utils/utils";

const port = 437;

describe("Wrong Message Test", function () {
  let client: WebSocket.WebSocket;

  beforeAll(function () {
    // init client
    client = new WebSocket(`ws://localhost:${port}`);
    // client.readyState - получение статуса сокета (client.OPEN/client.CLOSED/OPENING/CLOSING)
  });

  afterAll(function () {
    client.close();
  });

  test("should reject because of the incorrect data", async function () {
    client.on("open", () => {
      expect(5).toBe(5);
    });
    const event = "session_creation_requested";
    const data = {};

    const response = await sendSocketMessageAndWaitForResponse(
      client,
      JSON.stringify({ event, data }),
    );

    console.log("RESPONSE", response);
  });
});
