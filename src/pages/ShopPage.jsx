import { useState, useMemo } from 'react'
import { Sliders, X, ChevronDown } from 'lucide-react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

const CATEGORIES = [
  { value: 'all', label: 'All Devices' },
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

    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    if (condition !== 'all') {
      result = result.filter(p => p.condition === condition)
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      result = result.filter(p => {
        if (max === 0) return p.price >= min
        return p.price >= min && p.price <= max
      })
    }

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
      default:
        break
    }

    return result
  }, [category, condition, priceRange, sortBy])

  const activeFilters = [
    category !== 'all' && CATEGORIES.find(c => c.value === category)?.label,
    condition !== 'all' && CATEGORIES.find(c => c.value === condition)?.label,
    priceRange !== 'all' && PRICE_RANGES.find(p => p.value === priceRange)?.label,
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-white page-enter">
      {/* Header with geometric accent */}
      <div className="relative bg-gradient-to-br from-white via-brand-50 to-white border-b-2 border-brand-100/50 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(118,238,0,0.3), transparent)' }}
        />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h1 className="font-heading font-black text-7xl sm:text-8xl text-gray-900 mb-3">Shop</h1>
          <p className="text-xl text-gray-600 font-light">
            <span className="font-bold text-brand-600">{filtered.length}</span> refurbished device{filtered.length !== 1 ? 's' : ''} available
          </p>
          {activeFilters.length > 0 && (
            <p className="text-sm text-gray-500 mt-3">
              Filtered by: <span className="font-semibold">{activeFilters.join(', ')}</span>
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters — desktop sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
                <h3 className="font-heading font-black text-lg text-gray-900 mb-6 flex items-center gap-2">
                  <Sliders size={20} />
                  Filters
                </h3>

                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3.5 block">Category</label>
                    <div className="space-y-2.5">
                      {CATEGORIES.map(cat => (
                        <label key={cat.value} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={category === cat.value}
                            onChange={(e) => setCategory(e.target.value)}
                            className="accent-brand-500 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-brand-600 transition-colors font-medium">{cat.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div className="pt-4 border-t-2 border-gray-100">
                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3.5 block">Condition</label>
                    <div className="space-y-2.5">
                      {CONDITIONS.map(cond => (
                        <label key={cond.value} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="radio"
                            name="condition"
                            value={cond.value}
                            checked={condition === cond.value}
                            onChange={(e) => setCondition(e.target.value)}
                            className="accent-brand-500 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-brand-600 transition-colors font-medium">{cond.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t-2 border-gray-100">
                    <label className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3.5 block">Price Range</label>
                    <div className="space-y-2.5">
                      {PRICE_RANGES.map(range => (
                        <label key={range.value} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="radio"
                            name="price"
                            value={range.value}
                            checked={priceRange === range.value}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="accent-brand-500 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-gray-600 group-hover:text-brand-600 transition-colors font-medium">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Reset filters */}
                  {activeFilters.length > 0 && (
                    <button
                      onClick={() => {
                        setCategory('all')
                        setCondition('all')
                        setPriceRange('all')
                      }}
                      className="w-full mt-4 pt-4 border-t-2 border-gray-100 text-brand-600 hover:text-brand-700 font-bold text-sm transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            {/* Mobile filters + sort */}
            <div className="mb-8 space-y-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden w-full flex items-center justify-between px-5 py-3.5 border-2 border-gray-200 rounded-xl text-gray-900 font-bold hover:border-brand-500 hover:bg-gray-50 transition-all"
              >
                <span className="flex items-center gap-2"><Sliders size={18} />Filters</span>
                <ChevronDown size={20} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Mobile filters panel */}
              {showFilters && (
                <div className="md:hidden bg-gray-50 p-6 rounded-xl border-2 border-gray-200 space-y-6">
                  {[
                    { label: 'Category', options: CATEGORIES, state: category, setState: setCategory },
                    { label: 'Condition', options: CONDITIONS, state: condition, setState: setCondition },
                    { label: 'Price', options: PRICE_RANGES, state: priceRange, setState: setPriceRange },
                  ].map(({ label, options, state, setState }) => (
                    <div key={label} className="pb-6 border-b border-gray-200 last:border-0">
                      <label className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 block">{label}</label>
                      <div className="space-y-2.5">
                        {options.map(opt => (
                          <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
                            <input
                              type="radio"
                              value={opt.value}
                              checked={state === opt.value}
                              onChange={(e) => setState(e.target.value)}
                              className="accent-brand-500 w-4 h-4"
                            />
                            <span className="text-sm text-gray-700 font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sort – bold styling */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-black text-gray-700 uppercase tracking-widest whitespace-nowrap">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-500 transition-colors appearance-none bg-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <X className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-700 mb-6 text-xl font-bold">No products found</p>
                <p className="text-gray-500 mb-8 text-sm">Try adjusting your filters or resetting them to see all products</p>
                <button
                  onClick={() => {
                    setCategory('all')
                    setCondition('all')
                    setPriceRange('all')
                  }}
                  className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors"
                >
                  Reset All Filters
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
