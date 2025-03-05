'use client'
import { useState } from 'react'

export default function DeleteButton({ productId, onDelete }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        onDelete()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Có lỗi xảy ra khi xóa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-600 disabled:opacity-50"
    >
      {loading ? 'Đang xóa...' : 'Xóa'}
    </button>
  )
}