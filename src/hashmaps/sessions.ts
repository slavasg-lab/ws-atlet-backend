import { Session } from "@prisma/client";

interface SessionInfo {
  totalSensorReadingsWritten: number;
}

const sessions = new Map<number, SessionInfo>();

export default sessions;
