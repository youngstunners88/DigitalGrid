import { useState } from 'react'
import { Search, Mail } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import DataTable from '../components/DataTable'

export default function CustomersPage() {
  const { customers } = useAdminData()
  const [search, setSearch] = useState('')

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = customers.reduce((s, c) => s + c.spent, 0)
  const avgSpend = customers.length ? Math.round(totalRevenue / customers.length) : 0
  const repeatBuyers = customers.filter(c => c.orders > 1).length

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (v, row) => (
        <div>
          <p className="font-semibold text-gray-900 text-sm">{v}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'orders',
      label: 'Orders',
      render: v => <span className="font-mono font-bold text-gray-900">{v}</span>,
    },
    {
      key: 'spent',
      label: 'Total Spent',
      render: v => <span className="font-mono font-bold text-brand-600">R{v.toLocaleString('en-ZA')}</span>,
    },
    { key: 'joined', label: 'First Order', render: v => <span className="text-gray-500 text-xs">{v}</span> },
    {
      key: 'email',
      label: 'Contact',
      sortable: false,
      render: (v) => (
        <a
          href={`mailto:${v}`}
          className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          <Mail size={13} /> Email
        </a>
      ),
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-3xl text-gray-900">Customers</h1>
        <p className="text-gray-500 text-sm mt-0.5">{customers.length} registered customers</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-4">
          <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide mb-1">Total Customers</p>
          <p className="font-heading font-bold text-2xl text-purple-700">{customers.length}</p>
        </div>
        <div className="bg-brand-50 border-2 border-brand-100 rounded-2xl p-4">
          <p className="text-xs text-brand-700 font-semibold uppercase tracking-wide mb-1">Avg. Spend</p>
          <p className="font-heading font-bold text-2xl text-brand-700">R{avgSpend.toLocaleString('en-ZA')}</p>
        </div>
        <div className="bg-green-50 border-2 border-green-100 rounded-2xl p-4">
          <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Repeat Buyers</p>
          <p className="font-heading font-bold text-2xl text-green-700">{repeatBuyers}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-colors"
          placeholder="Search customers…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <DataTable columns={columns} rows={filtered} emptyMessage="No customers match your search." />
    </div>
  )
}
