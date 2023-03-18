import { User, Prisma, PrismaClient } from "@prisma/client";

import { prisma } from "./db";
export class UsersService {
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findUserByPublicKey(userPublicKey: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { publicKey: userPublicKey },
    });
  }

  async fetchUsers(take?: number, skip?: number): Promise<User[]> {
    return prisma.user.findMany({
      take,
      skip,
    });
  }

  async deleteUser(userId: number): Promise<User> {
    return prisma.user.delete({
      where: { id: userId },
    });
  }

  async incrementSequenceNumber(userId: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { sequenceNumber: { increment: 1 } },
    });
  }
}
