import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Cpu, Recycle, DollarSign } from 'lucide-react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Fully Tested',
    body: 'Every device passes a 72-point hardware and software inspection before it ships.',
  },
  {
    icon: Cpu,
    title: '3-Month Warranty',
    body: 'All products come with a comprehensive warranty. Buy with confidence.',
  },
  {
    icon: DollarSign,
    title: 'Save Up to 60%',
    body: 'Same performance as new — without the premium price. Every rand counts.',
  },
  {
    icon: Recycle,
    title: 'Good for the Planet',
    body: 'Refurbished tech reduces e-waste. Great for your wallet, great for SA.',
  },
]

const STATS = [
  { value: '20+', label: 'Products' },
  { value: '100%', label: 'Tested' },
  { value: '3mo', label: 'Warranty' },
  { value: 'ZAR', label: 'Pricing' },
]

const FEATURED_IDS = ['macbook-air-m1', 'lenovo-thinkpad-x1', 'dell-optiplex-3080', 'msi-trident']
const featured = products.filter(p => FEATURED_IDS.includes(p.id))

function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated CSS grid */}
        <div className="absolute inset-0 grid-bg-animated opacity-60 pointer-events-none" />

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,214,143,0.10) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,214,143,0.08) 0%, transparent 70%)' }} />

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-glow-pulse" />
              <span className="text-brand-300 text-sm font-medium font-mono">South Africa's #1 Refurbished Tech</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-white">Premium</span>{' '}
              <span className="gradient-text text-glow">Refurbished</span>
              <br />
              <span className="text-white">Computers</span>
            </h1>

            <p className="text-brand-200 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed">
              Quality computing for South African students, remote workers and small businesses.
              Every device tested, certified, and backed by warranty.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-brand-500 text-brand-900 px-8 py-3.5 rounded-lg font-heading font-bold hover:bg-brand-400 transition-colors shadow-glow hover:shadow-glow-lg"
              >
                Browse Products
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 glass-card rounded-lg px-8 py-3.5 font-medium text-brand-300 hover:text-white hover:border-brand-500/40 transition-all"
              >
                View Laptops
              </Link>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-8">
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="font-heading font-bold text-3xl text-brand-400 text-glow">{s.value}</p>
                  <p className="text-brand-400 text-xs font-mono uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Refurbished? ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-brand-400 font-mono text-sm uppercase tracking-widest mb-3">Why go refurbished?</p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white">
              The Smarter Choice
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="glass-card glass-card-hover rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-brand-400" />
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-brand-300 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-brand-400 font-mono text-sm uppercase tracking-widest mb-2">Hand-picked</p>
              <h2 className="font-heading font-bold text-4xl text-white">Featured Devices</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 transition-colors text-sm font-medium">
              View all <ArrowRight size={16} />
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
              className="inline-flex items-center gap-2 bg-brand-500 text-brand-900 px-10 py-4 rounded-lg font-heading font-bold hover:bg-brand-400 transition-colors shadow-glow hover:shadow-glow-lg"
            >
              Browse All 20 Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
            <div className="relative">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Need help choosing?
              </h2>
              <p className="text-brand-300 mb-8 max-w-md mx-auto">
                WhatsApp us and we'll find the perfect device for your budget and needs.
              </p>
              <a
                href="https://wa.me/27712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-500 text-brand-900 px-8 py-3.5 rounded-lg font-heading font-bold hover:bg-brand-400 transition-colors shadow-glow"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
