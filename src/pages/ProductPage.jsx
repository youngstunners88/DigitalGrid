import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'

function ProductPage() {
  const { handle } = useParams()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const product = products.find(p => p.id === handle)

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop" className="text-brand-900 hover:underline font-semibold">
          Back to shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <Link to="/shop" className="flex items-center gap-2 text-brand-900 hover:underline mb-8">
        <ArrowLeft size={20} />
        Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            decoding="async"
          />
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="font-bold text-lg mb-4">Specifications</h2>
            <div className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{key}:</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-2">Condition</p>
            <p className="text-lg font-semibold mb-6">{product.condition}</p>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-4xl font-bold text-brand-900">
                  R{product.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-brand-900 text-white hover:bg-brand-800'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={24} />
                    Added to cart
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
