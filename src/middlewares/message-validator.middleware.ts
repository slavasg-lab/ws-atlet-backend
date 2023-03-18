import { z } from "zod";
import { ClientToServerEvents } from "../types/WebSocket/Events";
import { SensorReadingSchema } from "../zod/SensorReadingSchema";

const SendBatchesDataSchema = z.object({
  batchSequenceNumber: z.number(),
  sensorReadings: SensorReadingSchema,
});

const messageValidator = (rawMessage: unknown) => {
  try {
    // validate that received message is object and has an event name in it
    const parsed = JSON.parse(rawMessage as any);
    z.object({ event: z.nativeEnum(ClientToServerEvents) }).parse(parsed);

    const { event, data } = parsed;

    // if sensorReadingsBatchSent event => additionally validate the data inside
    if (event === ClientToServerEvents.sensorReadingsBatchSent) {
      SendBatchesDataSchema.parse(data);
    }

    return { event, data };
  } catch (err) {
    return null;
  }
};

export default messageValidator;
