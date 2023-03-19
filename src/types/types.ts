import { z } from "zod";

export interface Event {
  name: string;
  data: {
    schema: z.AnyZodObject;
  };
}

export interface Handler {
  event: Event;
  execute: () => Record<string, string>;
}
