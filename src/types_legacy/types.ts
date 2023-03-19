import { Sensor } from '@prisma/client';
import { Session } from '@prisma/client';

export type SensorReadingWithoutIds = {
  timestamp: number;
  sensor: Sensor;
  xAxis: number;
  yAxis: number;
  zAxis: number;
};

export interface SessionInfo {
  userId: number;
  totalSensorReadingsWritten: number;
  currentSession: Session;
  timeout: NodeJS.Timeout;
}
