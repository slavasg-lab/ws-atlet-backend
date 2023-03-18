import { User, Prisma, PrismaClient } from "@prisma/client";

export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findUserByPublicKey(userPublicKey: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { publicKey: userPublicKey },
    });
  }

  async fetchUsers(take?: number, skip?: number): Promise<User[]> {
    return this.prisma.user.findMany({
      take,
      skip,
    });
  }

  async deleteUser(userId: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async incrementSequenceNumber(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { sequenceNumber: { increment: 1 } },
    });
  }
}
