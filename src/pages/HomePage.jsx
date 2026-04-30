import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Leaf, Award } from 'lucide-react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

const featured = products.slice(0, 4)

function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Animated grid background */}
        <div className="absolute inset-0 cyber-grid-animated opacity-30 pointer-events-none" />

        {/* Large geometric circles – MORE DRAMATIC */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118,238,0,0.15) 0%, transparent 70%)',
            animation: 'float-accent 12s ease-in-out infinite',
          }}
        />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118,238,0,0.12) 0%, transparent 70%)',
            animation: 'float-accent 15s ease-in-out infinite 3s',
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(118,238,0,0.2) 0%, transparent 70%)',
            animation: 'float-accent 10s ease-in-out infinite 1s',
          }}
        />

        {/* Center content */}
        <div className="relative container mx-auto px-4 py-32 z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-sm font-semibold text-brand-600 uppercase tracking-widest">Refurbished Computers</span>
            </div>

            {/* HERO HEADLINE – BOLD & BIG */}
            <h1 className="font-heading text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.9] mb-8 text-gray-900">
              The Digital <br />
              <span className="text-brand-500">Grid</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-2xl leading-relaxed font-light">
              Premium refurbished computers. <span className="font-semibold">Tested.</span> <span className="font-semibold">Certified.</span> <span className="font-semibold">Backed by warranty.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 mb-20">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-3 bg-brand-500 text-white px-10 py-5 rounded-2xl font-heading font-bold text-lg hover:bg-brand-600 transition-all shadow-2xl shadow-brand-500/40 hover:shadow-brand-500/60 hover:-translate-y-1"
              >
                Explore Now
                <ArrowRight size={22} />
              </Link>
              <Link
                to="/shop?category=laptop"
                className="inline-flex items-center justify-center gap-3 border-2 border-gray-900 text-gray-900 px-10 py-5 rounded-2xl font-heading font-bold text-lg hover:bg-gray-900 hover:text-white transition-all"
              >
                View Laptops
                <ArrowRight size={22} />
              </Link>
            </div>

            {/* Stats – BOLD NUMBERS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                { num: '20+', label: 'Premium Devices' },
                { num: '100%', label: 'Tested & Certified' },
                { num: '3mo', label: 'Warranty' },
                { num: 'ZA', label: 'Based & Trusted' },
              ].map(({ num, label }) => (
                <div key={label} className="border-2 border-gray-200 rounded-xl p-4 hover:border-brand-500 transition-colors">
                  <p className="font-heading text-4xl font-black text-brand-600">{num}</p>
                  <p className="text-xs text-gray-600 mt-2 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(118,238,0,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative container mx-auto px-4 z-10">
          <div className="text-center mb-20">
            <span className="text-brand-600 font-bold text-sm uppercase tracking-widest">Why Us</span>
            <h2 className="font-heading font-black text-6xl sm:text-7xl text-gray-900 mt-3">The Smarter Choice</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Fully Tested', desc: '72-point inspection & quality assurance' },
              { icon: Award, title: 'Save 60%', desc: 'Premium performance at fraction of new price' },
              { icon: Leaf, title: 'Eco-Friendly', desc: 'Reduce e-waste, protect the planet' },
              { icon: Zap, title: 'Warranty', desc: '3-month comprehensive coverage included' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="relative group p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-brand-500 transition-all"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(118,238,0,0.05), transparent)',
                  }}
                />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 group-hover:bg-brand-100 transition-colors mb-4">
                    <Icon size={28} className="text-brand-600" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-32 bg-white relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(118,238,0,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative container mx-auto px-4 z-10">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <span className="text-brand-600 font-bold text-sm uppercase tracking-widest">Hand-Picked</span>
              <h2 className="font-heading font-black text-6xl sm:text-7xl text-gray-900 mt-2">Featured Devices</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-lg transition-colors group">
              View all
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-20">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-12 py-5 rounded-2xl font-heading font-bold text-lg hover:bg-gray-800 transition-all shadow-xl"
            >
              Explore All 20 Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-32 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 relative overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative container mx-auto px-4 text-center z-10">
          <h2 className="font-heading font-black text-6xl sm:text-7xl text-white mb-6 leading-tight">
            Ready to Upgrade?
          </h2>
          <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Find the perfect refurbished device for your budget today.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-3 bg-white text-brand-600 px-12 py-5 rounded-2xl font-heading font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:-translate-y-1"
          >
            Start Shopping Now
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
