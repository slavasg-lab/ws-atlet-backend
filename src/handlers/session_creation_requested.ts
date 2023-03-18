import { WebSocket } from "ws";
import { CustomError } from "../errors";

interface SessionCreationRequestedData {}

export const event = {
  name: "session_creation_requested",
};

export async function execute(ws: WebSocket, data: unknown) {
  // validate data example:
  //   const { userId } = z.object({ userId: z.string() }).parse(data);

  //   raise error (event: { name, description }) => throw
  //
  throw new CustomError(event, "Session already exists");

  ws.send(
    JSON.stringify({
      event: "session_created",
      data: {
        ok: true,
        description: "A new session has been created successfully",
        result: {
          sessionId: 0,
          createdAt: "2023-03-18T21:13:36.223Z",
          expiresAt: "2023-03-18T21:23:36.223Z",
        },
      },
    }),
  );
}
