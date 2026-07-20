import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Query logging is a dev affordance: in production it writes a line per query
// to the serverless log, which costs latency on every request and buries real
// errors in noise. Warnings and errors still surface.
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'production'
        ? ['warn', 'error']
        : ['query', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db