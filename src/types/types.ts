import { z } from "zod";

export interface Event {
  name: string;
  data: {
    schema: z.AnyZodObject;
  };
}
