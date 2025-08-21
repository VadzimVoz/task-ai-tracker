import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
})

// Проверка подключения при инициализации
prisma.$connect()
  .then(() => console.log('✅ Connected to database'))
  .catch((error) => console.error('❌ Database connection error:', error))

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}