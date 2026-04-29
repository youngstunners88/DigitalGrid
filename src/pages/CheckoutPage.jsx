import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

const inputClass =
  'w-full bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all'

function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [loading, setLoading] = useState(false)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="container mx-auto px-4 text-center py-24">
          <h1 className="font-heading font-bold text-3xl text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600 mb-8">Your cart is empty.</p>
          <Link to="/shop" className="text-brand-600 hover:text-brand-700 font-semibold transition-colors">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      alert('Redirecting to payment gateway…')
      clearCart()
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white page-enter">
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading font-bold text-4xl text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ── Delivery Form ── */}
        <div>
          <h2 className="font-heading font-semibold text-xl text-white mb-6">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name"
                value={formData.firstName} onChange={handleChange} required className={inputClass} />
              <input type="text" name="lastName" placeholder="Last Name"
                value={formData.lastName} onChange={handleChange} required className={inputClass} />
            </div>

            <input type="email" name="email" placeholder="Email address"
              value={formData.email} onChange={handleChange} required className={inputClass} />

            <input type="tel" name="phone" placeholder="Phone number"
              value={formData.phone} onChange={handleChange} required className={inputClass} />

            <input type="text" name="address" placeholder="Street address"
              value={formData.address} onChange={handleChange} required className={inputClass} />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="City"
                value={formData.city} onChange={handleChange} required className={inputClass} />
              <input type="text" name="postalCode" placeholder="Postal code"
                value={formData.postalCode} onChange={handleChange} required className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 text-white py-3.5 rounded-lg font-heading font-bold hover:bg-brand-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Redirecting…' : 'Continue to Payment'}
            </button>
          </form>
        </div>

        {/* ── Order Summary ── */}
        <div>
          <h2 className="font-heading font-semibold text-xl text-gray-900 mb-6">Order Summary</h2>

          <div className="card-flat rounded-xl p-6 mb-4 border-2 border-gray-200">
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm font-medium truncate">{item.name}</p>
                    <p className="text-gray-600 text-xs font-mono mt-0.5">
                      R{item.price.toLocaleString('en-ZA')} &times; {item.quantity}
                    </p>
                  </div>
                  <span className="text-gray-900 font-mono font-semibold text-sm whitespace-nowrap">
                    R{(item.price * item.quantity).toLocaleString('en-ZA')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span className="font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span className="text-brand-600 font-mono">Free</span>
              </div>
              <div className="flex justify-between text-gray-900 font-heading font-bold text-lg pt-3">
                <span>Total</span>
                <span className="text-brand-600 font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
            </div>
          </div>

          {/* Trust note */}
          <div className="card-flat rounded-xl p-4 flex items-start gap-3 bg-blue-50 border-2 border-blue-200">
            <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-blue-900 text-sm leading-relaxed">
              Secure payment via <span className="font-semibold">Payflex</span>. Your card details are encrypted and never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
