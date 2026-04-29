import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import products from '../data/products.json'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products
      .filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .slice(0, 8)
  }, [query])

  return (
    <div className="relative w-full max-w-sm">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="input-brand w-full pl-10 pr-10"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {results.map(product => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => {
                      setQuery('')
                      setIsOpen(false)
                    }}
                    className="flex gap-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">R{product.price.toLocaleString('en-ZA')}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No products found for "{query}"
            </div>
          ) : null}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default SearchBar
