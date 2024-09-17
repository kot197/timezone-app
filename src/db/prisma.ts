import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Ensure only one instance of PrismaClient is created and reused
export const prisma = globalForPrisma.prisma || new PrismaClient()

export const adapter = new PrismaAdapter(prisma.session, prisma.user);
 
// Assign the Prisma instance to the global object to persist during hot reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma