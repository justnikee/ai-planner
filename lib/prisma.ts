import { PrismaClient } from "../app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// PASS an empty object {} or your config options here
export const prisma = globalForPrisma.prisma ?? new PrismaClient({} as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;