import { Session } from "@prisma/client";

interface SessionInfo {
  totalSensorReadingsWritten: number;
  currentSession: Session;
}

const sessions = new Map<number, SessionInfo>();

export default sessions;
