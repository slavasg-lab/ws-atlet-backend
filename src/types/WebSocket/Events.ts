export enum ClientToServerEvents {
  sessionCreationRequested = "session_creation_requested",
  sensorReadingsBatchSent = "sensor_readings_batch_sent",
  sessionDestoymentRequested = "session_destroyment_requested",
}
export enum ServerToClientEvents {
  sessionCreated = "session_created",
  sessionCreationRejected = "session_creation_rejected",
  sensorReadingsBatchWritten = "sensor_readings_batch_written",
  sensorReadingsBatchRejected = "sensor_readings_batch_rejected",
  sessionDestroyed = "session_destroyed",
  sessionDestroymentRejected = "session_destroyment_rejected",
}
