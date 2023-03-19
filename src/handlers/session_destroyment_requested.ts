import { z } from "zod";

import { RejectionEvent } from "../errors";
import sessions from "../hashmaps/sessions";

export const event = {
  name: "session_destroyment_requested",
  data: {
    schema: z.unknown(),
  },
};

type Input = z.infer<typeof event.data.schema>;

export async function execute(input: Input) {
  return {};
}
