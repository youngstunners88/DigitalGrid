import { useState } from 'react'
import { BarChart3, Package, Users, TrendingUp, LogOut, Plus, Edit, Trash } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import products from '../data/products.json'

const ADMIN_PASSWORD = 'admin123' // TODO: Replace with proper auth

function AdminDashboard() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setPassword('')
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    navigate('/')
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-4">
        <div className="card-elevated max-w-md w-full p-8">
          <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600 mb-8">Enter password to access</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              className="input-brand w-full mb-4"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-brand-500 text-white py-3 rounded-lg font-bold hover:bg-brand-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-brand-500/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-heading font-bold text-2xl text-brand-600">Digital Grid Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'customers', label: 'Customers', icon: Users },
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-brand-500'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-50 text-blue-600' },
              { label: 'Total Inventory', value: Math.floor(Math.random() * 150), icon: TrendingUp, color: 'bg-green-50 text-green-600' },
              { label: 'Monthly Revenue', value: 'R' + (Math.random() * 500000).toFixed(0), icon: BarChart3, color: 'bg-brand-50 text-brand-600' },
              { label: 'Active Customers', value: Math.floor(Math.random() * 500), icon: Users, color: 'bg-purple-50 text-purple-600' },
            ].map(stat => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`card-flat p-6 ${stat.color}`}>
                  <Icon size={24} className="mb-3 opacity-50" />
                  <p className="text-sm opacity-75 mb-2">{stat.label}</p>
                  <p className="font-heading font-bold text-2xl">{stat.value}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <h2 className="font-heading font-bold text-2xl text-gray-900">Manage Products</h2>
              <button className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-600 transition-colors">
                <Plus size={18} />
                Add Product
              </button>
            </div>

            <div className="card-elevated overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Condition</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.slice(0, 10).map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                          <span className="font-semibold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                      <td className="px-6 py-4 font-mono font-bold">R{product.price.toLocaleString('en-ZA')}</td>
                      <td className="px-6 py-4">
                        <span className="badge-brand text-xs">{product.condition}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
                Showing 10 of {products.length} products
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="card-elevated p-8 text-center">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">Inventory Management</h3>
            <p className="text-gray-600 mb-6">Track stock levels and manage inventory across all products</p>
            <p className="text-gray-500 text-sm">Feature coming soon. You'll be able to:</p>
            <ul className="text-gray-600 text-sm space-y-2 mt-4 max-w-md mx-auto">
              <li>• View real-time stock levels</li>
              <li>• Set low-stock alerts</li>
              <li>• Track stock movements</li>
              <li>• Generate inventory reports</li>
            </ul>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="card-elevated p-8 text-center">
            <Users size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">Customer Management</h3>
            <p className="text-gray-600 mb-6">View customer details, order history, and preferences</p>
            <p className="text-gray-500 text-sm">Feature coming soon. You'll be able to:</p>
            <ul className="text-gray-600 text-sm space-y-2 mt-4 max-w-md mx-auto">
              <li>• View customer profiles</li>
              <li>• Track purchase history</li>
              <li>• Send email notifications</li>
              <li>• Analyze customer behavior</li>
            </ul>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="bg-yellow-50 border-t-2 border-yellow-200 p-4 text-center text-sm text-yellow-800 mt-10">
        <strong>MVP Note:</strong> Full back office with database integration coming soon. Currently showing demo data.
      </div>
    </div>
  )
}

export default AdminDashboard
