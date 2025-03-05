import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    
    // Chuyển đổi BigInt thành String trước khi trả về
    const serializedProducts = products.map(product => ({
      ...product,
      id: product.id.toString(),  // Convert BigInt to String
      cat_id: product.cat_id.toString()  // Convert BigInt to String
    }))

    return NextResponse.json(serializedProducts)
  } catch (error) {
    console.error('❌ Database error:', {
      // name: error.name,
      // message: error.message,
      // code: error.code,
      // stack: error.stack
    })

    return NextResponse.json(
      {
        error: 'Không thể lấy sản phẩm',
        details: error.message  // Thêm chi tiết lỗi
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, price, description } = body

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description
      }
    })

    return NextResponse.json(
      { message: 'Tạo thành công', product },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi khi tạo sản phẩm' },
      { status: 500 }
    )
  }
}