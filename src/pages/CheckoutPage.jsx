import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

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
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link to="/shop" className="text-brand-900 hover:underline font-semibold">
          Continue shopping
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In production, this would integrate with PayFast or Yoco
      // For now, we'll show a success message
      setTimeout(() => {
        alert('Proceeding to payment gateway...')
        // PayFast redirect or Yoco integration would happen here
        clearCart()
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
            />

            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-900 text-white py-3 rounded-lg hover:bg-brand-800 transition-colors font-bold disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    R{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="text-lg font-bold flex justify-between border-t border-gray-300 pt-4 mt-4">
                <span>Total</span>
                <span>R{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              ℹ️ You will be redirected to a secure payment gateway (PayFast or Yoco) to complete your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
