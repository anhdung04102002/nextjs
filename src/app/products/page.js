'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductList from '@/app/components/products/ProductList'

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Link 
          href="/products/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Thêm sản phẩm
        </Link>
      </div>
      <ProductList />
    </div>
  )
}