import { Session, SensorReading, PrismaClient } from "@prisma/client";
import { SensorReadingWithoutIds } from "@/types_legacy/types";

import { prisma } from "./db";

export class SessionsService {
  async createSession(userId: number): Promise<Session> {
    return prisma.session.create({
      data: {
        userId: userId,
      },
    });
  }

  async writeSensorReadingsIntoSession(
    sessionId: number,
    sensorReadings: SensorReadingWithoutIds[],
  ): Promise<number> {
    return prisma.sensorReading
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
    return prisma.session.findUnique({
      where: { id: sessionId },
    });
  }

  async fetchSessionsForUser(userId: number, take?: number, skip?: number): Promise<Session[]> {
    return prisma.session.findMany({
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
    return prisma.sensorReading.findMany({
      where: { sessionId },
      take,
      skip,
    });
  }

  async destroySession(sessionId: number): Promise<Session> {
    return prisma.session.update({
      where: { id: sessionId },
      data: {
        destroyedAt: new Date(),
      },
    });
  }
}
