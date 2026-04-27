import { useState } from 'react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

const CATEGORIES = [
  { value: 'all',         label: 'All Products' },
  { value: 'laptop',      label: 'Laptops' },
  { value: 'desktop',     label: 'Desktops' },
  { value: 'accessories', label: 'Accessories' },
]

function ShopPage() {
  const [category, setCategory] = useState('all')

  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category)

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-brand-400 font-mono text-sm uppercase tracking-widest mb-2">Browse</p>
        <h1 className="font-heading font-bold text-5xl text-white">Shop</h1>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-5 py-2 rounded-lg text-sm font-medium font-heading transition-all duration-200 ${
              category === cat.value
                ? 'bg-brand-500 text-brand-900 shadow-glow-sm'
                : 'glass-card text-brand-300 hover:text-white hover:border-brand-500/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <span className="ml-auto text-brand-400 text-sm font-mono self-center">
          {filtered.length} device{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-brand-300 mb-4">No products found in this category.</p>
          <button
            onClick={() => setCategory('all')}
            className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
          >
            View all products
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopPage
