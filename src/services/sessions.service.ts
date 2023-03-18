import { Session, SensorReading, PrismaClient } from '@prisma/client';
import { SensorReadingWithoutIds } from '@/types/types';

export class SessionsService {
  constructor(private prisma: PrismaClient) {}

  async createSession(userId: number): Promise<Session> {
    return this.prisma.session.create({
      data: {
        userId: userId,
      },
    });
  }

  async writeSensorReadingsIntoSession(
    sessionId: number,
    sensorReadings: SensorReadingWithoutIds[],
  ): Promise<number> {
    return this.prisma.sensorReading
      .createMany({
        data: sensorReadings.map((sensorReading) => {
          return {
            sessionId,
            timestamp: new Date(sensorReading.timestamp),
            sensor: sensorReading.sensor,
            xAxis: sensorReading.xAxis,
            yAxis: sensorReading.yAxis,
            zAxis: sensorReading.zAxis,
          };
        }),
      })
      .then((batchPayload) => {
        return batchPayload.count;
      });
  }

  async findSessionById(sessionId: number): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: { id: sessionId },
    });
  }

  async fetchSessionsForUser(
    userId: number,
    take?: number,
    skip?: number,
  ): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: { userId },
      take,
      skip,
    });
  }

  async fetchSensorReadingsForSession(
    sessionId: number,
    take?: number,
    skip?: number,
  ): Promise<SensorReading[]> {
    return this.prisma.sensorReading.findMany({
      where: { sessionId },
      take,
      skip,
    });
  }

  async destroySession(sessionId: number): Promise<Session> {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        destroyedAt: new Date(),
      },
    });
  }
}
