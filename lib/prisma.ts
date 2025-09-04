import { PrismaClient } from '@prisma/client';

declare global {
  // Глобальное расширение для dev-среды
  var prisma: PrismaClient | undefined;
}

// Создание клиента с логами
export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

// Подключение к базе (однократно)
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Проверка подключения
prisma
  .$connect()
  .then(() => console.log('✅ Connected to database'))
  .catch((error) => console.error('❌ Database connection error:', error));
