import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Check, ShoppingCart, Heart } from 'lucide-react'
import ProductCarousel from '../components/ProductCarousel'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductPage() {
  const { handle } = useParams()
  const { addItem } = useCart()
  const { isSaved, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist()
  const [added, setAdded] = useState(false)
  const product = products.find(p => p.id === handle)
  const saved = isSaved(product?.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 text-center py-24">
        <h1 className="font-heading font-bold text-2xl text-gray-900 mb-4">Product not found</h1>
        <Link to="/shop" className="text-brand-600 hover:text-brand-700 font-semibold transition-colors">
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

  const handleWishlist = () => {
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
    <div className="min-h-screen bg-white page-enter">
      <div className="container mx-auto px-4 py-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 transition-colors mb-10 text-sm font-semibold">
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image carousel */}
          <div>
            <ProductCarousel images={[product.image]} productName={product.name} />
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <span className="badge-brand mb-3 inline-block">{product.category.toUpperCase()}</span>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-gray-700 text-base leading-relaxed mb-10">{product.description}</p>

            {/* Specs table */}
            <div className="card-flat p-6 mb-8 border-2 border-brand-300/50">
              <h2 className="font-heading font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-500" />
                Technical Specifications
              </h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="py-3 pr-4 font-mono text-brand-600 uppercase text-xs font-semibold">
                        {key}
                      </td>
                      <td className="py-3 text-right text-gray-900 font-semibold">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Condition + Price */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Condition</p>
              <span className="inline-block badge-outline mb-4">
                {product.condition}
              </span>
            </div>

            <div className="card-flat p-6 mb-6 border-2 border-brand-500/50">
              <p className="font-heading font-bold text-5xl text-brand-600 mb-4">
                R{product.price.toLocaleString('en-ZA')}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-heading font-bold text-lg transition-all ${
                    added
                      ? 'bg-emerald-500 text-white'
                      : 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={22} />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={22} />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleWishlist}
                  className={`px-6 py-4 rounded-lg font-bold transition-colors border-2 ${
                    saved
                      ? 'bg-brand-50 border-brand-500 text-brand-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-brand-500'
                  }`}
                  aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={22} fill={saved ? 'currentColor' : 'none'} />
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free delivery · Secure checkout via Payflex
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
