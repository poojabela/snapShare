import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const db =
  globalForPrisma.db ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db
