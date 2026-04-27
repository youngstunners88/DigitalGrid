import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-24">
        <ShoppingCart size={48} className="text-brand-600 mx-auto mb-6" />
        <h1 className="font-heading font-bold text-3xl text-white mb-3">Your cart is empty</h1>
        <p className="text-brand-300 mb-10">Add some products to get started.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-brand-500 text-brand-900 px-8 py-3.5 rounded-lg font-heading font-bold hover:bg-brand-400 transition-colors shadow-glow"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-brand-400 font-mono text-sm uppercase tracking-widest mb-2">Review</p>
        <h1 className="font-heading font-bold text-4xl text-white">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Item list ── */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-xl p-4 flex gap-4">
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
                    className="w-8 h-8 flex items-center justify-center glass-card rounded-lg text-brand-400 hover:text-white hover:border-brand-500/40 transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-mono text-white font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center glass-card rounded-lg text-brand-400 hover:text-white hover:border-brand-500/40 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-mono font-bold text-brand-400 mb-3">
                  R{(item.price * item.quantity).toLocaleString('en-ZA')}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                  className="text-red-500/70 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order summary ── */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-6 sticky top-24">
            <h2 className="font-heading font-semibold text-white text-lg mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-brand-300 text-sm">
                <span>Subtotal</span>
                <span className="font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
              <div className="flex justify-between text-brand-300 text-sm">
                <span>Shipping</span>
                <span className="text-brand-400 font-mono">Free</span>
              </div>
              <div className="border-t border-brand-500/20 pt-3 flex justify-between text-white font-heading font-bold text-lg">
                <span>Total</span>
                <span className="text-brand-400 font-mono">R{total.toLocaleString('en-ZA')}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-brand-500 text-brand-900 py-3.5 rounded-lg font-heading font-bold hover:bg-brand-400 transition-colors shadow-glow hover:shadow-glow-lg mb-3"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="block w-full text-center glass-card rounded-lg py-2.5 text-brand-400 text-sm hover:text-white hover:border-brand-500/40 transition-all"
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
