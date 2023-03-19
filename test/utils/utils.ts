import { WebSocket } from "ws";

export function waitForSocketState(client: WebSocket, state: number) {
  return new Promise<void>(function (resolve) {
    setTimeout(function () {
      if (client.readyState === state) {
        resolve();
      } else {
        waitForSocketState(client, state).then(resolve);
      }
    }, 5);
  });
}

export function sendSocketMessageAndWaitForResponse(client: WebSocket, message: string) {
  return new Promise<unknown>(function (resolve) {
    client.on("message", (message) => resolve(JSON.parse(message.toString())));
    client.send(message);
  });
}
