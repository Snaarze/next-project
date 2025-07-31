import { PrismaClient } from "@/app/generated/prisma";

// make sure that there are one instance only
// the second time it is re-executed it will store to the cache
// the result will be result of the cache
const globalForPrisma = global as unknown as { prisma: PrismaClient };
// if there are existing object in the global object, the object itself will be use otherwise it will create new instance
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
