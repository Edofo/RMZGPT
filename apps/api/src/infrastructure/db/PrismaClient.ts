import { PrismaClient } from "@prisma/client";

class Prisma {
  private static instance: Prisma;
  public prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): Prisma {
    if (!Prisma.instance) {
      Prisma.instance = new Prisma();
    }
    return Prisma.instance;
  }
}

export default Prisma.getInstance();
