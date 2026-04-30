import { useState } from 'react'
import { AlertTriangle, Search, Minus, Plus } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'

export default function InventoryPage() {
  const { products, updateStock } = useAdminData()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'low') return matchSearch && (p.stock ?? 0) <= 3
    if (filter === 'out') return matchSearch && (p.stock ?? 0) === 0
    return matchSearch
  })

  const lowCount = products.filter(p => (p.stock ?? 0) <= 3 && (p.stock ?? 0) > 0).length
  const outCount = products.filter(p => (p.stock ?? 0) === 0).length
  const totalUnits = products.reduce((s, p) => s + (p.stock ?? 0), 0)

  function stockColor(qty) {
    if (qty === 0) return 'text-red-600 bg-red-50'
    if (qty <= 3) return 'text-orange-600 bg-orange-50'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-3xl text-gray-900">Inventory</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage stock levels across all products</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4">
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">Total Units</p>
          <p className="font-heading font-bold text-2xl text-blue-700">{totalUnits}</p>
        </div>
        <div className="bg-orange-50 border-2 border-orange-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-orange-600" />
            <p className="text-xs text-orange-600 font-semibold uppercase tracking-wide">Low Stock</p>
          </div>
          <p className="font-heading font-bold text-2xl text-orange-700">{lowCount}</p>
        </div>
        <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-4">
          <p className="text-xs text-red-600 font-semibold uppercase tracking-wide mb-1">Out of Stock</p>
          <p className="font-heading font-bold text-2xl text-red-700">{outCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-colors"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {[
          { id: 'all', label: 'All Products' },
          { id: 'low', label: 'Low Stock' },
          { id: 'out', label: 'Out of Stock' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
              filter === f.id ? 'bg-brand-500 text-white border-brand-500' : 'border-gray-200 text-gray-600 hover:border-brand-400'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border-2 border-gray-100 overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b-2 border-gray-100">
            <tr>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700">Product</th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700">Category</th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-700">Price</th>
              <th className="px-5 py-3.5 text-center font-semibold text-gray-700">Stock Level</th>
              <th className="px-5 py-3.5 text-center font-semibold text-gray-700">Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(p => {
              const stock = p.stock ?? 0
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" loading="lazy" />
                      <span className="font-semibold text-gray-900 text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 capitalize">{p.category}</td>
                  <td className="px-5 py-3.5 font-mono font-bold text-gray-900">R{p.price.toLocaleString('en-ZA')}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-flex items-center font-mono font-bold px-3 py-1 rounded-full text-sm ${stockColor(stock)}`}>
                      {stock}
                      {stock === 0 && <span className="ml-1.5 text-xs font-normal">OUT</span>}
                      {stock > 0 && stock <= 3 && <span className="ml-1.5 text-xs font-normal">LOW</span>}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => updateStock(p.id, Math.max(0, stock - 1))}
                        className="w-7 h-7 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={e => updateStock(p.id, Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-14 text-center border-2 border-gray-200 rounded-lg py-1 text-sm font-mono font-bold focus:outline-none focus:border-brand-500 transition-colors"
                      />
                      <button
                        onClick={() => updateStock(p.id, stock + 1)}
                        className="w-7 h-7 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-gray-400 text-sm">No products match your filter.</p>
        )}
      </div>
    </div>
  )
}
