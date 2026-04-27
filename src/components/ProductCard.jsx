import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { conditionBadgeClasses } from '../utils/conditionBadge'

function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block glass-card glass-card-hover rounded-xl overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-brand-800/80 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Condition badge */}
        <span className={`absolute top-3 left-3 text-xs font-mono font-semibold px-2 py-0.5 rounded-full ${conditionBadgeClasses(product.condition)}`}>
          {product.condition}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-brand-400 text-xs font-mono uppercase tracking-wider mb-1.5">
          {product.category}
        </p>
        <h3 className="font-heading font-semibold text-white text-base mb-1 line-clamp-2 group-hover:text-brand-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-400 text-xs mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-center justify-between">
          <p className="font-heading font-bold text-xl text-brand-400">
            R{product.price.toLocaleString('en-ZA')}
          </p>
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1.5 bg-brand-500/10 border border-brand-500/30 text-brand-400 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-brand-500 hover:text-brand-900 hover:border-brand-500 hover:shadow-glow-sm transition-all duration-200"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
