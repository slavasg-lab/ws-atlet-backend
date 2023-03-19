import { ServerToClientEvents } from "./Events";

export type SessionCreatedEvent = {
  event: ServerToClientEvents.sessionCreated;
  data: {
    ok: true;
    description: "A new session has been created successfully";
    result: {
      sessionId: number;
      createdAt: Date;
      expiresAt: Date;
    };
  };
};

export type SessionCreationRequestRejected = {
  event: ServerToClientEvents.sessionCreationRejected;
  data: {
    ok: false;
    description: "Session with the identifier #${sessionId} already exists";
  };
};

export type SensorReadingsBatchWrittenEvent = {
  event: ServerToClientEvents.sensorReadingsBatchWritten;
  data: {
    ok: true;
    description: "Sensor readings batch #{batchSequenceNumber} has been written successfully";
    result: {
      sessionId: number;
      batchSequenceNumber: number;
    };
  };
};

export type SensorReadingsBatchRejectedEvent = {
  event: ServerToClientEvents.sensorReadingsBatchRejected;
  data: {
    ok: false;
    description: "Sensor readings batch #${batchSequenceNumber} has invalid size";
  };
};

export type SessionDestroyedEvent = {
  event: ServerToClientEvents.sessionDestroyed;
  data: {
    ok: true;
    description: "Session has been destroyed successfully";
    result: {
      sessionId: number;
      destroyedAt: Date;
    };
  };
};

export type SessionDestroymentRejected = {
  event: ServerToClientEvents.sessionDestroymentRejected;
  data: {
    ok: false;
    description: "Session is not found, has expired, or has been destroyed";
  };
};
