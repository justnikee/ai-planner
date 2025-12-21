import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
}

declare global {
    var prisma: PrismaClient | undefined
    var pool: Pool | undefined
}

const createPrismaClient = () => {
    const pool = globalThis.pool ?? new Pool({
        connectionString,
        max: 10,
    })

    if (process.env.NODE_ENV !== 'production') {
        globalThis.pool = pool
    }

    const adapter = new PrismaPg(pool)

    return new PrismaClient({ adapter })
}

export const prisma = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma
}