import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white page-enter flex items-center justify-center">
        <div className="container mx-auto px-4 text-center py-24">
          <ShoppingCart size={48} className="text-gray-300 mx-auto mb-6" />
          <h1 className="font-heading font-bold text-3xl text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-10">Add some products to get started.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-lg font-heading font-bold hover:bg-brand-600 transition-colors shadow-lg"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white page-enter">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-gray-900">Shopping Cart</h1>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Item list ── */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="card-elevated p-4 flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shrink-0 bg-brand-800"
                loading="lazy"
                decoding="async"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.id}`}
                  className="font-heading font-semibold text-white hover:text-brand-400 transition-colors block truncate"
                >
                  {item.name}
                </Link>
                <p className="text-brand-400 text-xs font-mono mt-1 mb-3">
                  R{item.price.toLocaleString('en-ZA')} each
                </p>

                {/* Qty controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 flex items-center justify-center border-2 border-gray-200 rounded-lg text-gray-700 hover:border-brand-500 hover:text-brand-600 transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-mono text-gray-900 font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center border-2 border-gray-200 rounded-lg text-gray-700 hover:border-brand-500 hover:text-brand-600 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-mono font-bold text-brand-600 mb-3">
                  R{(item.price * item.quantity).toLocaleString('en-ZA')}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order summary ── */}
        <div className="lg:col-span-1">
          <div className="card-flat rounded-xl p-6 sticky top-24">
            <h2 className="font-heading font-semibold text-gray-900 text-lg mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 border-b-2 border-gray-200 pb-6">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span className="font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span className="font-mono">Free</span>
              </div>
              <div className="flex justify-between text-gray-900 font-heading font-bold text-lg">
                <span>Total</span>
                <span className="text-brand-600 font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-brand-500 text-white py-3.5 rounded-lg font-heading font-bold hover:bg-brand-600 transition-colors shadow-lg mb-3"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="block w-full text-center border-2 border-gray-200 rounded-lg py-2.5 text-gray-700 text-sm hover:border-red-500 hover:text-red-600 transition-all font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CartPage
