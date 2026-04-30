import { useState } from 'react'
import { Search } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import DataTable from '../components/DataTable'

const STATUSES = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
}

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdminData()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase())
      || o.customer.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === 'all' || o.status === status
    return matchSearch && matchStatus
  })

  const columns = [
    { key: 'id', label: 'Order ID', render: v => <span className="font-mono font-semibold text-gray-900 text-xs">{v}</span> },
    { key: 'customer', label: 'Customer' },
    {
      key: 'product',
      label: 'Product',
      render: (v, row) => (
        <div>
          <p className="text-sm text-gray-900 truncate max-w-[200px]">{v}</p>
          <p className="text-xs text-gray-400">×{row.qty}</p>
        </div>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      render: v => <span className="font-mono font-bold text-gray-900">R{v.toLocaleString('en-ZA')}</span>,
    },
    { key: 'date', label: 'Date', render: v => <span className="text-gray-500 text-xs">{v}</span> },
    {
      key: 'status',
      label: 'Status',
      render: (v, row) => (
        <select
          value={v}
          onChange={e => updateOrderStatus(row.id, e.target.value)}
          className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 focus:ring-2 focus:ring-brand-500 cursor-pointer ${STATUS_COLORS[v]}`}
        >
          {STATUSES.slice(1).map(s => (
            <option key={s} value={s} className="text-gray-900 bg-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      ),
    },
  ]

  const revenue = filtered
    .filter(o => o.status !== 'cancelled')
    .reduce((s, o) => s + o.total, 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {filtered.length} orders · R{revenue.toLocaleString('en-ZA')} revenue
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-colors"
            placeholder="Search order ID or customer…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-lg border-2 text-xs font-semibold transition-colors capitalize ${
                status === s ? 'bg-brand-500 text-white border-brand-500' : 'border-gray-200 text-gray-600 hover:border-brand-400'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} rows={filtered} emptyMessage="No orders match your search." />
    </div>
  )
}
