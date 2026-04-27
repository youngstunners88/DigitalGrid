import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

function ShopPage() {
  const [category, setCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'laptop', label: 'Laptops' },
    { value: 'desktop', label: 'Desktops' },
    { value: 'accessories', label: 'Accessories' },
  ]

  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      <div className="mb-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                category === cat.value
                  ? 'bg-brand-900 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No products found in this category.</p>
          <button
            onClick={() => setCategory('all')}
            className="text-brand-900 hover:underline font-semibold"
          >
            View all products
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopPage
