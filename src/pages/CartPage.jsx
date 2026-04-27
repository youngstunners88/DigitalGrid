import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-brand-900 text-white px-8 py-3 rounded-lg hover:bg-brand-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${item.id}`}
                    className="font-bold hover:text-brand-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600 text-sm mb-4">
                    R{item.price.toLocaleString()} each
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold mb-4">
                    R{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="font-bold text-lg mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">R{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>R{total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-brand-900 text-white py-3 rounded-lg hover:bg-brand-800 transition-colors text-center font-bold mb-4"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={() => clearCart()}
              className="block w-full border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
