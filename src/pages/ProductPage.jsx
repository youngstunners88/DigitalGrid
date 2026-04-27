import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'
import { conditionBadgeClasses } from '../utils/conditionBadge'

function ProductPage() {
  const { handle } = useParams()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const product = products.find(p => p.id === handle)

  if (!product) {
    return (
      <div className="container mx-auto px-4 text-center py-24">
        <h1 className="font-heading font-bold text-2xl text-white mb-4">Product not found</h1>
        <Link to="/shop" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
          Back to shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors mb-10 text-sm"
      >
        <ArrowLeft size={16} />
        Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ── Image ── */}
        <div className="aspect-square glass-card rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            decoding="async"
          />
        </div>

        {/* ── Details ── */}
        <div>
          {/* Category + Condition */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-brand-400 text-xs font-mono uppercase tracking-widest">
              {product.category}
            </span>
            <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full ${conditionBadgeClasses(product.condition)}`}>
              {product.condition}
            </span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
            {product.name}
          </h1>
          <p className="text-brand-300 text-base leading-relaxed mb-10">{product.description}</p>

          {/* ── Tech Spec Panel ── */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-5 rounded-sm bg-brand-500" />
              <h2 className="font-heading font-semibold text-white">Technical Specifications</h2>
            </div>
            <dl className="space-y-3">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`grid grid-cols-2 gap-4 py-2.5 px-3 rounded-lg spec-row ${
                    i % 2 === 0 ? 'bg-brand-500/5' : ''
                  }`}
                >
                  <dt className="text-brand-400 text-xs font-mono uppercase tracking-wider self-center capitalize">
                    {key}
                  </dt>
                  <dd className="text-white font-mono text-sm font-semibold text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Price + CTA ── */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-heading font-bold text-5xl text-brand-400 text-glow">
                R{product.price.toLocaleString('en-ZA')}
              </span>
              <span className="text-brand-400 text-sm font-mono">ZAR</span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-lg font-heading font-bold text-lg transition-all duration-300 ${
                added
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-brand-500 text-brand-900 hover:bg-brand-400 shadow-glow hover:shadow-glow-lg'
              }`}
            >
              {added ? (
                <>
                  <Check size={22} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={22} />
                  Add to Cart
                </>
              )}
            </button>

            <p className="text-brand-400 text-xs font-mono text-center mt-4">
              Free delivery · Secure checkout via PayFast / Yoco
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
