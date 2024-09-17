import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Ensure only one instance of PrismaClient is created and reused
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
// Assign the Prisma instance to the global object to persist during hot reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma