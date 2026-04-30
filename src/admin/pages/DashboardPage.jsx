import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'
import StatCard from '../components/StatCard'

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
}

export default function DashboardPage() {
  const { products, orders, customers } = useAdminData()

  const revenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((s, o) => s + o.total, 0)

  const lowStock = products.filter(p => (p.stock ?? 0) <= 3)

  const recentOrders = [...orders]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6)

  const byStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back — here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Products" value={products.length} icon={Package} color="blue" trend={8} />
        <StatCard label="Total Orders" value={orders.length} icon={ShoppingCart} color="purple" trend={12} />
        <StatCard label="Revenue (ZAR)" value={`R${revenue.toLocaleString('en-ZA')}`} icon={TrendingUp} color="brand" trend={5} />
        <StatCard label="Customers" value={customers.length} icon={Users} color="green" trend={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-gray-100">
            <h2 className="font-heading font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.map(o => (
              <div key={o.id} className="px-6 py-3.5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{o.id}</p>
                  <p className="text-xs text-gray-500 truncate">{o.customer} · {o.product}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-mono font-bold text-gray-900">R{o.total.toLocaleString('en-ZA')}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[o.status]}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Order Status Breakdown */}
          <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
            <h2 className="font-heading font-semibold text-gray-900 mb-4">Order Status</h2>
            <div className="space-y-2.5">
              {Object.entries(byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[status]}`}>
                    {status}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-brand-500 h-1.5 rounded-full"
                        style={{ width: `${(count / orders.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-4 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStock.length > 0 && (
            <div className="bg-orange-50 rounded-2xl border-2 border-orange-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-orange-600" />
                <h2 className="font-heading font-semibold text-orange-900">Low Stock</h2>
              </div>
              <div className="space-y-2">
                {lowStock.slice(0, 4).map(p => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <span className="text-orange-800 truncate flex-1 mr-2">{p.name}</span>
                    <span className="font-mono font-bold text-orange-700 shrink-0">{p.stock} left</span>
                  </div>
                ))}
                {lowStock.length > 4 && (
                  <p className="text-xs text-orange-600 mt-1">+{lowStock.length - 4} more</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
