import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Globe, Users } from 'lucide-react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

const STATS = [
  { icon: ShoppingCart, label: '20+ Products', value: '20' },
  { icon: Shield, label: 'Tested & Certified', value: '100%' },
  { icon: Zap, label: 'Fast Shipping', value: '3-5 Days' },
  { icon: Globe, label: 'Serving South Africa', value: 'ZA' },
]

const featured = products.slice(0, 4)

function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-brand-50 to-white">
        {/* Animated cyber grid background */}
        <div className="absolute inset-0 cyber-grid-animated opacity-40 pointer-events-none" />

        {/* Floating accent circles */}
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full float-accent"
          style={{ background: 'radial-gradient(circle, rgba(118,238,0,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-40 left-10 w-64 h-64 rounded-full float-accent"
          style={{ background: 'radial-gradient(circle, rgba(118,238,0,0.08) 0%, transparent 70%)', animationDelay: '2s' }} />

        <div className="relative container mx-auto px-4 py-24 z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Entrance animation — "entering computer" concept */}
            <div className="mb-8 inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 blur-lg opacity-40 animate-pulse" />
                <span className="relative inline-block px-4 py-2 bg-brand-50 border-2 border-brand-300 rounded-full text-brand-700 text-sm font-semibold font-mono">
                  ▶ Access Digital Grid
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-900">
              <span className="text-brand-600">Premium</span> Refurbished Computers
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
              Quality computing for South African students, professionals, and businesses.
              Tested, certified, and backed by warranty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-lg font-heading font-bold hover:bg-brand-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Products
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-500 text-brand-600 px-8 py-4 rounded-lg font-heading font-bold hover:bg-brand-50 transition-colors"
              >
                View Laptops
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="card-flat p-4">
                <p className="font-heading font-bold text-2xl text-brand-600">20+</p>
                <p className="text-xs text-gray-600 mt-1">Products</p>
              </div>
              <div className="card-flat p-4">
                <p className="font-heading font-bold text-2xl text-brand-600">100%</p>
                <p className="text-xs text-gray-600 mt-1">Tested</p>
              </div>
              <div className="card-flat p-4">
                <p className="font-heading font-bold text-2xl text-brand-600">3mo</p>
                <p className="text-xs text-gray-600 mt-1">Warranty</p>
              </div>
              <div className="card-flat p-4">
                <p className="font-heading font-bold text-2xl text-brand-600">ZA</p>
                <p className="text-xs text-gray-600 mt-1">Based</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Refurbished? ── */}
      <section className="py-24 section-flow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="badge-brand mb-4 inline-block">WHY REFURBISHED?</span>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900">
              The Smarter Choice
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Fully Tested', desc: '72-point inspection before shipping' },
              { icon: Zap, title: '3-Month Warranty', desc: 'Comprehensive coverage included' },
              { icon: Globe, title: 'Save 60%', desc: 'Same performance, premium price' },
              { icon: Users, title: 'Eco-Friendly', desc: 'Reduce e-waste, protect planet' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-elevated p-6 product-glow">
                <Icon size={32} className="text-brand-500 mb-4" />
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 bg-gray-50 section-flow">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="badge-brand mb-3 inline-block">HAND-PICKED</span>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-gray-900">Featured Devices</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors">
              View all <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-500 text-white px-10 py-4 rounded-lg font-heading font-bold hover:bg-brand-600 transition-colors shadow-lg"
            >
              Explore All 20 Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-brand-600 text-white text-center section-flow">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">Ready to upgrade?</h2>
          <p className="text-brand-100 mb-8 max-w-md mx-auto">
            Browse our collection and find the perfect device for your budget.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-brand-600 px-10 py-4 rounded-lg font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
