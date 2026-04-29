import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const { isSaved, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const saved = isSaved(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    if (saved) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    }
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block card-elevated overflow-hidden product-float product-glow"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-brand-500 hover:text-white transition-colors z-10"
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} color={saved ? '#76EE00' : 'currentColor'} />
        </button>

        {/* Condition badge */}
        <span className="absolute bottom-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-white text-gray-900">
          {product.condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-brand-600 text-xs font-mono uppercase tracking-wider mb-1.5">
          {product.category}
        </p>
        <h3 className="font-heading font-semibold text-gray-900 text-base mb-1 line-clamp-2 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-xs mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between gap-2">
          <p className="font-heading font-bold text-xl text-brand-600">
            R{product.price.toLocaleString('en-ZA')}
          </p>
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1.5 bg-brand-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-brand-600 transition-colors shadow"
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
