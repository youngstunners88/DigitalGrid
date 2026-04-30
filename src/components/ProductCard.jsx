import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowUpRight } from 'lucide-react'
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
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image container with border + glow */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-brand-500 rounded-2xl product-float">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist button – bold & prominent */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg transition-all z-10 ${
            saved
              ? 'bg-brand-500 text-white scale-110 shadow-lg'
              : 'bg-white/95 hover:bg-brand-500 hover:text-white hover:scale-110 text-gray-900 shadow'
          }`}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>

        {/* Condition badge – top left */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className={`text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider ${
            product.condition === 'Excellent'
              ? 'bg-green-100 text-green-700'
              : product.condition === 'Good'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {product.condition}
          </span>
        </div>
      </div>

      {/* Content section – bold typography */}
      <div className="p-6 bg-white group-hover:bg-gray-50 transition-colors">
        {/* Category badge */}
        <p className="text-brand-600 text-xs font-black uppercase tracking-widest mb-2">
          {product.category}
        </p>

        {/* Product name – bold */}
        <h3 className="font-heading font-black text-lg text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs mb-5 line-clamp-2">{product.description}</p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Price</span>
            <p className="font-heading font-black text-2xl text-brand-600">
              R{product.price.toLocaleString('en-ZA')}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center justify-center gap-2 bg-brand-500 text-white px-4 py-3 rounded-xl font-heading font-bold text-sm hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl group/btn"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
