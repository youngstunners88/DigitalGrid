import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import SearchBar from './SearchBar'

function Layout({ children }) {
  const { count } = useCart()
  const { count: wishlistCount } = useWishlist()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-brand-500/30">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <Link to="/" className="font-heading font-bold text-2xl text-brand-600 hover:text-brand-700 transition-colors">
            Digital Grid
          </Link>

          {/* Desktop search */}
          <div className="hidden md:block flex-1 max-w-sm">
            <SearchBar />
          </div>

          {/* Nav links + icons */}
          <div className="flex items-center gap-6">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-gray-700 hover:text-brand-500'}`
              }
            >
              Shop
            </NavLink>

            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-700 hover:text-brand-600 transition-colors"
              aria-label={`Cart — ${count} item${count !== 1 ? 's' : ''}`}
            >
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-pulse">
                  {count}
                </span>
              )}
            </Link>

            <Link
              to="/#wishlist"
              className="relative flex items-center gap-1 text-gray-700 hover:text-brand-600 transition-colors"
              aria-label={`Wishlist — ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 hover:text-brand-600"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t-2 border-brand-500/30 p-4">
            <div className="mb-4">
              <SearchBar />
            </div>
          </div>
        )}
      </header>

      {/* ── Main ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-brand-500/30 bg-gray-50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div>
              <h3 className="font-heading font-bold text-lg text-brand-600 mb-3">Digital Grid</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Premium refurbished computers for South Africa. Tested, certified, and warrantied.
              </p>
              <address className="not-italic text-sm text-gray-600 space-y-1">
                <p>Cape Town, Western Cape</p>
                <p>South Africa</p>
              </address>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-heading font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/shop" className="hover:text-brand-600 transition-colors">All Products</Link></li>
                <li><Link to="/shop" className="hover:text-brand-600 transition-colors">Laptops</Link></li>
                <li><Link to="/shop" className="hover:text-brand-600 transition-colors">Desktops</Link></li>
                <li><Link to="/cart" className="hover:text-brand-600 transition-colors">Cart</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-heading font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-brand-600 transition-colors">FAQ</Link></li>
                <li><Link to="/" className="hover:text-brand-600 transition-colors">Warranty</Link></li>
                <li><Link to="/" className="hover:text-brand-600 transition-colors">Returns</Link></li>
                <li><Link to="/" className="hover:text-brand-600 transition-colors">Terms &amp; Privacy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a
                    href="https://wa.me/27712345678"
                    className="flex items-center gap-2 hover:text-brand-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-brand-600 font-semibold">WhatsApp</span>
                    <span>+27 71 234 5678</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@digitalgrid.co.za" className="hover:text-brand-600 transition-colors font-medium">
                    info@digitalgrid.co.za
                  </a>
                </li>
                <li className="pt-2 text-xs">
                  <p>Secure payments via <span className="font-semibold text-brand-600">Payflex</span></p>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
            <p>&copy; 2025 Digital Grid. All rights reserved.</p>
            <Link to="/admin" className="hover:text-brand-600 transition-colors font-medium">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
