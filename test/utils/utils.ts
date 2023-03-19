import { WebSocket } from "ws";

export function waitForSocketConnection(client: WebSocket) {
  return new Promise<void>(function (resolve) {
    client.on("open", () => resolve());
  });
}

export function sendSocketMessageAndWaitForResponse(client: WebSocket, message: string) {
  return new Promise<unknown>(function (resolve) {
    client.on("message", (message) => resolve(JSON.parse(message.toString())));
    client.send(message);
  });
}
