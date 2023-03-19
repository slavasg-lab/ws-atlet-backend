import { z } from "zod";

import { RejectionEvent } from "../errors";


export const event = {
  name: "session_creation_requested",
  data: {
    schema: z.object({
      userId: z.string(),
    }),
  },
};

type Input = z.infer<typeof event.data.schema>;

export async function execute(input: Input) {
  // validate data example:
  // const { userId } = z.object({ userId: z.string() }).parse(input);

  //   raise error (event: { name, description }) => throw
  //
  console.log(input);
  throw new RejectionEvent("Session already exists");

  return {
    sessionId: 0,
    createdAt: "2023-03-18T21:13:36.223Z",
    expiresAt: "2023-03-18T21:23:36.223Z",
  };
}

// {
//   event: "session_created",
//   data: {
//     ok: true,
//     description: "A new session has been created successfully",
//     result: {
//       sessionId: 0,
//       createdAt: "2023-03-18T21:13:36.223Z",
//       expiresAt: "2023-03-18T21:23:36.223Z",
//     },
//   },
// }
