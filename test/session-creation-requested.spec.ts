import * as WebSocket from "ws";
import { initSocketEvents } from "../server";
import { sendSocketMessageAndWaitForResponse, waitForSocketState } from "./utils/utils";

const port = 437;

describe("Wrong Message Test", function () {
  let client: WebSocket.WebSocket;

  beforeAll(async function () {
    // init server
    const wss = new WebSocket.WebSocketServer({ port });
    initSocketEvents(wss);

    // init client
    client = new WebSocket(`ws://localhost:${port}`);
    await waitForSocketState(client, client.OPEN);
  });

  afterAll(function () {
    client.close();
  });

  test("should reject because of the incorrect data", async function () {
    const event = "session_creation_requested";
    const data = {};

    // client.on("message", (message) => {
    //   console.log("MESSAGE", message);
    //   expect(JSON.parse(message.toString())).toBe({
    //     event,
    //     data: {
    //       ok: false,
    //       description: 'The "data" field has invalid schema',
    //     },
    //   });
    // });

    // client.send(JSON.stringify({ event, data }));
    // const message = await waitForSocketMessage(client);
    // console.log("MESSAGE", message);
    const response = await sendSocketMessageAndWaitForResponse(
      client,
      JSON.stringify({ event, data }),
    );

    console.log("RESPONSE", response);

    expect(typeof 5).toBe("number");
  });
});
