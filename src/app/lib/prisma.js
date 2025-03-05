import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'], // thêm logging để debug
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Kết nối PostgreSQL thành công!')
    
    // Test query đơn giản
    const result = await prisma.$queryRaw`SELECT NOW()`
    console.log('📅 Server time:', result[0].now)
    
    return true
  } catch (error) {
    console.error('❌ Lỗi kết nối database:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}