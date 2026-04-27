import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Zap } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Layout({ children }) {
  const { count } = useCart()

  return (
    <div className="flex flex-col min-h-screen bg-brand-900">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 border-b border-brand-500/20"
        style={{ background: 'rgba(3, 15, 10, 0.92)', backdropFilter: 'blur(16px)' }}>
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Zap size={22} className="text-brand-400 group-hover:text-brand-300 transition-colors" />
            <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-brand-300 transition-colors">
              Digital Grid
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-brand-400' : 'text-brand-200 hover:text-white'}`
              }
            >
              Shop
            </NavLink>
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 text-brand-200 hover:text-white transition-colors"
              aria-label={`Cart — ${count} item${count !== 1 ? 's' : ''}`}
            >
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-500 text-brand-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold font-heading animate-glow-pulse">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Main ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-brand-500/20 bg-brand-950 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className="text-brand-400" />
                <span className="font-heading font-bold text-white">Digital Grid</span>
              </div>
              <p className="text-brand-300 text-sm leading-relaxed mb-4">
                Premium refurbished computers for South Africa. Quality you can trust, prices you'll love.
              </p>
              <address className="not-italic text-sm text-brand-300 space-y-1">
                <p>Cape Town, Western Cape</p>
                <p>South Africa</p>
              </address>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-brand-300">
                <li><Link to="/shop" className="hover:text-brand-400 transition-colors">All Products</Link></li>
                <li><Link to="/shop" className="hover:text-brand-400 transition-colors">Laptops</Link></li>
                <li><Link to="/shop" className="hover:text-brand-400 transition-colors">Desktops</Link></li>
                <li><Link to="/cart" className="hover:text-brand-400 transition-colors">Cart</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-brand-300">
                <li><Link to="/" className="hover:text-brand-400 transition-colors">FAQ</Link></li>
                <li><Link to="/" className="hover:text-brand-400 transition-colors">Warranty Policy</Link></li>
                <li><Link to="/" className="hover:text-brand-400 transition-colors">Returns</Link></li>
                <li><Link to="/" className="hover:text-brand-400 transition-colors">Terms &amp; Privacy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm text-brand-300">
                <li>
                  <a
                    href="https://wa.me/27712345678"
                    className="flex items-center gap-2 hover:text-brand-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-brand-500">WhatsApp</span>
                    <span>+27 71 234 5678</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@digitalgrid.co.za" className="hover:text-brand-400 transition-colors">
                    info@digitalgrid.co.za
                  </a>
                </li>
                <li className="text-brand-400 text-xs pt-2">
                  Secure payments via PayFast &amp; Yoco
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brand-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-brand-600">
            <p>&copy; 2025 Digital Grid. All rights reserved.</p>
            <p>Built in South Africa</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
