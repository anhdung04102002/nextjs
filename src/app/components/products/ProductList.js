'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div 
          key={product.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <Link 
                href={`/products/${product.id}/edit`}
                className="text-blue-500 hover:text-blue-600"
              >
                Sửa
              </Link>
              <DeleteButton 
                productId={product.id} 
                onDelete={fetchProducts}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}