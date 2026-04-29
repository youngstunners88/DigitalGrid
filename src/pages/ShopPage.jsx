import { useState, useMemo } from 'react'
import { Sliders, X } from 'lucide-react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'laptop', label: 'Laptops' },
  { value: 'desktop', label: 'Desktops' },
  { value: 'accessories', label: 'Accessories' },
]

const CONDITIONS = [
  { value: 'all', label: 'All Conditions' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
]

const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: '0-2000', label: 'Under R2,000' },
  { value: '2000-4000', label: 'R2,000 - R4,000' },
  { value: '4000-6500', label: 'R4,000+' },
]

function ShopPage() {
  const [category, setCategory] = useState('all')
  const [condition, setCondition] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = products

    // Filter by category
    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    // Filter by condition
    if (condition !== 'all') {
      result = result.filter(p => p.condition === condition)
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      result = result.filter(p => {
        if (max === 0) return p.price >= min // 4000+
        return p.price >= min && p.price <= max
      })
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // featured
        break
    }

    return result
  }, [category, condition, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-white page-enter">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading font-bold text-5xl text-gray-900 mb-4">Shop</h1>
          <p className="text-gray-600">Browse {filtered.length} refurbished device{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters — desktop */}
          <div className="hidden md:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sliders size={18} />
                  Filters
                </h3>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase mb-3 block">Category</label>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={category === cat.value}
                        onChange={(e) => setCategory(e.target.value)}
                        className="accent-brand-500"
                      />
                      <span className="text-sm text-gray-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase mb-3 block">Condition</label>
                <div className="space-y-2">
                  {CONDITIONS.map(cond => (
                    <label key={cond.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={cond.value}
                        checked={condition === cond.value}
                        onChange={(e) => setCondition(e.target.value)}
                        className="accent-brand-500"
                      />
                      <span className="text-sm text-gray-700">{cond.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase mb-3 block">Price Range</label>
                <div className="space-y-2">
                  {PRICE_RANGES.map(range => (
                    <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={range.value}
                        checked={priceRange === range.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="accent-brand-500"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            {/* Mobile filters + sort */}
            <div className="mb-8 space-y-4 md:space-y-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden w-full flex items-center justify-between px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 font-semibold hover:border-brand-500 transition-colors"
              >
                <Sliders size={18} />
                <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
              </button>

              {/* Mobile filters panel */}
              {showFilters && (
                <div className="md:hidden bg-gray-50 p-6 rounded-lg border-2 border-gray-200 space-y-6">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase mb-3 block">Category</label>
                    <div className="space-y-2">
                      {CATEGORIES.map(cat => (
                        <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={category === cat.value}
                            onChange={(e) => setCategory(e.target.value)}
                            className="accent-brand-500"
                          />
                          <span className="text-sm text-gray-700">{cat.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase mb-3 block">Condition</label>
                    <div className="space-y-2">
                      {CONDITIONS.map(cond => (
                        <label key={cond.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="condition"
                            value={cond.value}
                            checked={condition === cond.value}
                            onChange={(e) => setCondition(e.target.value)}
                            className="accent-brand-500"
                          />
                          <span className="text-sm text-gray-700">{cond.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase mb-3 block">Price Range</label>
                    <div className="space-y-2">
                      {PRICE_RANGES.map(range => (
                        <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="price"
                            value={range.value}
                            checked={priceRange === range.value}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="accent-brand-500"
                          />
                          <span className="text-sm text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-brand w-full md:w-48 ml-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <X className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4 text-lg font-semibold">No products found</p>
                <button
                  onClick={() => {
                    setCategory('all')
                    setCondition('all')
                    setPriceRange('all')
                  }}
                  className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
