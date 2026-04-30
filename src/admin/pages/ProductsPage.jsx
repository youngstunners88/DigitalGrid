import { useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import DataTable from '../components/DataTable'
import ProductForm from '../components/ProductForm'
import ConfirmDialog from '../components/ConfirmDialog'

const CONDITION_COLORS = {
  Excellent: 'bg-green-100 text-green-700',
  Good:      'bg-blue-100 text-blue-700',
  Fair:      'bg-yellow-100 text-yellow-700',
}

export default function ProductsPage() {
  const { products, deleteProduct } = useAdminData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [formProduct, setFormProduct] = useState(null) // null = closed, {} = new, {...} = edit
  const [confirmId, setConfirmId] = useState(null)

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || p.category === category
    return matchSearch && matchCat
  })

  const columns = [
    {
      key: 'name',
      label: 'Product',
      render: (v, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={v}
            className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0"
            loading="lazy"
          />
          <span className="font-semibold text-gray-900 text-sm">{v}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: v => <span className="capitalize text-gray-600">{v}</span>,
    },
    {
      key: 'price',
      label: 'Price',
      render: v => <span className="font-mono font-bold text-gray-900">R{v.toLocaleString('en-ZA')}</span>,
    },
    {
      key: 'condition',
      label: 'Condition',
      render: v => (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CONDITION_COLORS[v] ?? ''}`}>{v}</span>
      ),
    },
    {
      key: 'stock',
      label: 'Stock',
      render: v => (
        <span className={`font-mono font-semibold ${v <= 3 ? 'text-red-600' : 'text-gray-700'}`}>
          {v ?? 0}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFormProduct(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => setConfirmId(row.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} products total</p>
        </div>
        <button
          onClick={() => setFormProduct({})}
          className="flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors shadow-sm text-sm"
        >
          <Plus size={18} />
          Add Product
        </button>
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
        {['all', 'laptop', 'desktop', 'accessories'].map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors capitalize ${
              category === c ? 'bg-brand-500 text-white border-brand-500' : 'border-gray-200 text-gray-600 hover:border-brand-400'
            }`}
          >
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <DataTable columns={columns} rows={filtered} emptyMessage="No products match your search." />

      {formProduct !== null && (
        <ProductForm
          product={Object.keys(formProduct).length ? formProduct : null}
          onClose={() => setFormProduct(null)}
        />
      )}

      <ConfirmDialog
        open={Boolean(confirmId)}
        title="Delete Product"
        message="This will permanently remove the product from your catalogue. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => { deleteProduct(confirmId); setConfirmId(null) }}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}
