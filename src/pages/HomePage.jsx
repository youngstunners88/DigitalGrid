import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function HomePage() {
  return (
    <div>
      <section className="py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-brand-900">
              Premium Refurbished Computers
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Quality, affordable computing for South Africa. Every device tested, certified, and backed by our warranty.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-900 text-white px-8 py-3 rounded-lg hover:bg-brand-800 transition-colors"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="bg-gradient-to-br from-brand-100 to-brand-200 rounded-lg h-80 flex items-center justify-center">
            <div className="text-center text-brand-600">
              <p className="text-6xl mb-4">💻</p>
              <p className="font-semibold">Quality Computers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 -mx-4 sm:-mx-4 md:-mx-4 px-4 sm:px-4 md:px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Digital Grid?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold mb-2">Fully Tested</h3>
            <p className="text-gray-600">Every device is thoroughly tested and certified to work perfectly.</p>
          </div>
          <div className="bg-white p-8 rounded-lg">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2">Warranty Included</h3>
            <p className="text-gray-600">All devices come with a comprehensive warranty for peace of mind.</p>
          </div>
          <div className="bg-white p-8 rounded-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Best Prices</h3>
            <p className="text-gray-600">Save up to 60% on premium computers without compromising quality.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold mb-12">Featured Products</h2>
        <div className="text-center text-gray-600">
          <p className="mb-8">Check out our full range of laptops and desktops</p>
          <Link
            to="/shop"
            className="inline-block bg-brand-900 text-white px-8 py-3 rounded-lg hover:bg-brand-800 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
