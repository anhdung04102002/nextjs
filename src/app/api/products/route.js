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
    const product = await prisma.product.create({
      data: {
        id: BigInt(Date.now()),  // Tạo id từ timestamp
        name: body.name,
        code: body.code,
        slug: body.slug,
        contents: body.contents,
        description: body.description,
        image: body.image,
        images: body.images,
        cat_id: BigInt(body.cat_id),
        status: body.status,
        meta_title: body.meta_title,
        meta_keywords: body.meta_keywords,
        meta_description: body.meta_description,
        meta_og_url: body.meta_og_url,
        video: body.video,
        special_info: body.special_info,
        url: body.url,
        options: body.options,
        tech_spec: body.tech_spec,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    const serializedProduct = {
      ...product,
      id: product.id.toString(),
      cat_id: product.cat_id.toString()
    }

    return NextResponse.json(
      { 
        message: 'Tạo sản phẩm thành công', 
        product: serializedProduct 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error)
    return NextResponse.json(
      { error: 'Lỗi khi tạo sản phẩm', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Thiếu ID sản phẩm' },
        { status: 400 }
      )
    }

    const product = await prisma.product.update({
      where: {
        id: BigInt(id)
      },
      data: {
        ...updateData,
        cat_id: updateData.cat_id ? BigInt(updateData.cat_id) : undefined,
        updated_at: new Date()
      }
    })

    const serializedProduct = {
      ...product,
      id: product.id.toString(),
      cat_id: product.cat_id.toString()
    }

    return NextResponse.json({
      message: 'Cập nhật sản phẩm thành công',
      product: serializedProduct
    })
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error)
    return NextResponse.json(
      { error: 'Lỗi khi cập nhật sản phẩm', details: error.message },
      { status: 500 }
    )
  }
}


// DELETE - Xóa sản phẩm theo ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Thiếu ID sản phẩm' },
        { status: 400 }
      )
    }

    await prisma.product.delete({
      where: {
        id: BigInt(id)
      }
    })

    return NextResponse.json({
      message: 'Xóa sản phẩm thành công'
    })
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error)
    return NextResponse.json(
      { error: 'Lỗi khi xóa sản phẩm', details: error.message },
      { status: 500 }
    )
  }
}