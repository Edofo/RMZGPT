import type { User } from "@/domain/models/User";
import prismaClientInstance from "@/infrastructure/db/PrismaClient";

class UserRepository {
  async createUser(user: User) {
    return await prismaClientInstance.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }

  async findByEmail(email: string) {
    return await prismaClientInstance.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await prismaClientInstance.prisma.user.findUnique({
      where: { id },
    });
  }
}

export default new UserRepository();
