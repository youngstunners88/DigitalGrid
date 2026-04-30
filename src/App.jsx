import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import {
  AdminAuthProvider, AdminDataProvider, RequireAuth,
  AdminLayout, DashboardPage, ProductsPage, OrdersPage,
  InventoryPage, CustomersPage, SettingsPage,
} from './admin/index'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

function StoreFront() {
  const location = useLocation()
  return (
    <Layout>
      <div key={location.pathname} className="page-enter">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:handle" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Layout>
  )
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AdminAuthProvider>
          <AdminDataProvider>
            <BrowserRouter>
              <Routes>
                {/* ── Admin sub-tree (own layout, own auth) ── */}
                <Route path="/admin" element={<RequireAuth />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="inventory" element={<InventoryPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Route>

                {/* ── Public storefront ── */}
                <Route path="/*" element={<StoreFront />} />
              </Routes>
            </BrowserRouter>
          </AdminDataProvider>
        </AdminAuthProvider>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
