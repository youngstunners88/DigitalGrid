import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Layout({ children }) {
  const { count } = useCart()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-brand-900 text-white sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              Digital Grid
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/shop" className="hover:text-brand-200 transition-colors">
                Shop
              </Link>
              <Link to="/cart" className="flex items-center gap-2 hover:text-brand-200 transition-colors">
                <ShoppingCart size={24} />
                {count > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-brand-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <p className="text-brand-300 text-sm">
                Digital Grid - Premium refurbished computers for South Africa.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-brand-300">
                <li><Link to="/" className="hover:text-white">Contact</Link></li>
                <li><Link to="/" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/" className="hover:text-white">Warranty</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-brand-300">
                <li><Link to="/" className="hover:text-white">Terms</Link></li>
                <li><Link to="/" className="hover:text-white">Privacy</Link></li>
                <li><Link to="/" className="hover:text-white">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Payment</h3>
              <p className="text-brand-300 text-sm">
                Secure payment via PayFast & Yoco
              </p>
            </div>
          </div>
          <div className="border-t border-brand-700 pt-8 text-center text-brand-300 text-sm">
            <p>&copy; 2024 Digital Grid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
