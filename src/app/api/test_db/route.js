// src/app/api/db-test/route.ts
import { NextResponse } from 'next/server'
import { testDatabaseConnection } from '@/app/lib/prisma'

export async function GET() {
  const isConnected = await testDatabaseConnection()
  
  return NextResponse.json({ 
    connected: isConnected,
    message: isConnected 
      ? 'Kết nối database thành côngggggg!' 
      : 'Kết nối database thất bại' 
  })
}