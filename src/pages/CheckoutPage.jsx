import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

const inputClass =
  'w-full bg-brand-800/60 border border-brand-500/20 text-white placeholder-brand-500 rounded-lg px-4 py-2.5 font-sans text-sm focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/40 transition-all'

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
      <div className="container mx-auto px-4 text-center py-24">
        <h1 className="font-heading font-bold text-3xl text-white mb-4">Checkout</h1>
        <p className="text-brand-300 mb-8">Your cart is empty.</p>
        <Link to="/shop" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
          Continue shopping
        </Link>
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
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-brand-400 font-mono text-sm uppercase tracking-widest mb-2">Secure checkout</p>
        <h1 className="font-heading font-bold text-4xl text-white">Checkout</h1>
      </div>

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
              className="w-full bg-brand-500 text-brand-900 py-3.5 rounded-lg font-heading font-bold hover:bg-brand-400 transition-colors shadow-glow hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Redirecting…' : 'Continue to Payment'}
            </button>
          </form>
        </div>

        {/* ── Order Summary ── */}
        <div>
          <h2 className="font-heading font-semibold text-xl text-white mb-6">Order Summary</h2>

          <div className="glass-card rounded-xl p-6 mb-4">
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name}</p>
                    <p className="text-brand-400 text-xs font-mono mt-0.5">
                      R{item.price.toLocaleString('en-ZA')} &times; {item.quantity}
                    </p>
                  </div>
                  <span className="text-white font-mono font-semibold text-sm whitespace-nowrap">
                    R{(item.price * item.quantity).toLocaleString('en-ZA')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-500/20 pt-4 space-y-3">
              <div className="flex justify-between text-brand-300 text-sm">
                <span>Subtotal</span>
                <span className="font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
              <div className="flex justify-between text-brand-300 text-sm">
                <span>Shipping</span>
                <span className="text-brand-400 font-mono">Free</span>
              </div>
              <div className="flex justify-between text-white font-heading font-bold text-lg border-t border-brand-500/20 pt-3">
                <span>Total</span>
                <span className="text-brand-400 font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
            </div>
          </div>

          {/* Trust note */}
          <div className="glass-card rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck size={18} className="text-brand-400 shrink-0 mt-0.5" />
            <p className="text-brand-300 text-sm leading-relaxed">
              You'll be redirected to a secure payment gateway (PayFast or Yoco) to complete your purchase. Your details are never stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
