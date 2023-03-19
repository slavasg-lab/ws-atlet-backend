import { ClientToServerEvents } from "./Events";
import { SensorReading } from "./SensorReading";

export type SessionCreationRequestedEvent = {
  event: ClientToServerEvents.sessionCreationRequested;
  data: {};
};

export type SensorReadingsBatchSentEvent = {
  event: ClientToServerEvents.sensorReadingsBatchSent;
  data: {
    batchSequenceNumber: number;
    sensorReadings: SensorReading[];
  };
};

export type SessionDestroymentRequestedEvent = {
  event: ClientToServerEvents.sessionDestoymentRequested;
  data: {};
};
