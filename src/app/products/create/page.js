import ProductForm from '@/app/components/products/ProductForm'

export default function CreateProduct() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tạo sản phẩm mới</h1>
      <ProductForm />
    </div>
  )
}