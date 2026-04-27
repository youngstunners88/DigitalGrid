import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

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
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-brand-900">R{product.price.toLocaleString()}</p>
          <button
            onClick={handleAddToCart}
            className="bg-brand-900 text-white px-4 py-2 rounded-lg hover:bg-brand-800 transition-colors text-sm font-semibold"
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
