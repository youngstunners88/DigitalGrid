import { createContext, useContext, useReducer, useEffect } from 'react'
import rawProducts from '../../data/products.json'

const DataContext = createContext(null)

// ── Mock orders ──────────────────────────────────────────────────────────────

function generateOrders(products) {
  const names = [
    'Sipho Nkosi', 'Thabo Mokoena', 'Lerato Dlamini', 'Nomsa Khumalo',
    'Bongani Zulu', 'Ayanda Ndlovu', 'Zanele Mahlangu', 'Lungelo Mthembu',
    'Kagiso Sithole', 'Nompumelelo Cele',
  ]
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  const statusWeights = [0.1, 0.15, 0.2, 0.5, 0.05]

  return Array.from({ length: 34 }, (_, i) => {
    const product = products[i % products.length]
    const qty = Math.floor(Math.random() * 3) + 1
    const rand = Math.random()
    let cumulative = 0
    let status = statuses[0]
    for (let s = 0; s < statuses.length; s++) {
      cumulative += statusWeights[s]
      if (rand < cumulative) { status = statuses[s]; break }
    }
    const daysAgo = Math.floor(Math.random() * 60)
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    return {
      id: `ORD-${String(1001 + i).padStart(4, '0')}`,
      customer: names[i % names.length],
      email: `${names[i % names.length].split(' ')[0].toLowerCase()}@example.com`,
      product: product.name,
      productId: product.id,
      qty,
      total: product.price * qty,
      status,
      date: date.toISOString().split('T')[0],
    }
  })
}

function generateCustomers(orders) {
  const seen = new Set()
  return orders
    .filter(o => { const key = o.email; if (seen.has(key)) return false; seen.add(key); return true })
    .map((o, i) => ({
      id: `CUST-${String(i + 1).padStart(4, '0')}`,
      name: o.customer,
      email: o.email,
      orders: orders.filter(x => x.email === o.email).length,
      spent: orders.filter(x => x.email === o.email).reduce((s, x) => s + x.total, 0),
      joined: o.date,
    }))
}

// ── Reducer ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'dg_admin_products'

function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (_) { /* ignore */ }
  return rawProducts.map(p => ({ ...p, stock: Math.floor(Math.random() * 20) + 1 }))
}

function initialState() {
  const products = loadProducts()
  const orders = generateOrders(products)
  return {
    products,
    orders,
    customers: generateCustomers(orders),
    settings: {
      storeName: 'Digital Grid',
      email: 'info@digitalgrid.co.za',
      phone: '+27 82 000 0000',
      address: 'Johannesburg, Gauteng, South Africa',
      currency: 'ZAR',
      freeShippingThreshold: 0,
      lowStockAlert: 3,
    },
    toast: null,
  }
}

function dataReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const products = [
        { ...action.payload, id: `prod-${Date.now()}`, stock: action.payload.stock ?? 1 },
        ...state.products,
      ]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
      return { ...state, products, toast: { type: 'success', message: 'Product added.' } }
    }
    case 'UPDATE_PRODUCT': {
      const products = state.products.map(p =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
      return { ...state, products, toast: { type: 'success', message: 'Product updated.' } }
    }
    case 'DELETE_PRODUCT': {
      const products = state.products.filter(p => p.id !== action.payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
      return { ...state, products, toast: { type: 'success', message: 'Product deleted.' } }
    }
    case 'UPDATE_STOCK': {
      const products = state.products.map(p =>
        p.id === action.payload.id ? { ...p, stock: action.payload.stock } : p
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
      return { ...state, products, toast: { type: 'success', message: 'Stock updated.' } }
    }
    case 'UPDATE_ORDER_STATUS': {
      const orders = state.orders.map(o =>
        o.id === action.payload.id ? { ...o, status: action.payload.status } : o
      )
      return { ...state, orders, toast: { type: 'success', message: 'Order status updated.' } }
    }
    case 'UPDATE_SETTINGS': {
      const settings = { ...state.settings, ...action.payload }
      return { ...state, settings, toast: { type: 'success', message: 'Settings saved.' } }
    }
    case 'CLEAR_TOAST':
      return { ...state, toast: null }
    default:
      return state
  }
}

export function AdminDataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, null, initialState)

  // Auto-clear toast after 3 s
  useEffect(() => {
    if (!state.toast) return
    const timer = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 3000)
    return () => clearTimeout(timer)
  }, [state.toast])

  const actions = {
    addProduct: (product) => dispatch({ type: 'ADD_PRODUCT', payload: product }),
    updateProduct: (product) => dispatch({ type: 'UPDATE_PRODUCT', payload: product }),
    deleteProduct: (id) => dispatch({ type: 'DELETE_PRODUCT', payload: id }),
    updateStock: (id, stock) => dispatch({ type: 'UPDATE_STOCK', payload: { id, stock } }),
    updateOrderStatus: (id, status) => dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    clearToast: () => dispatch({ type: 'CLEAR_TOAST' }),
  }

  return (
    <DataContext.Provider value={{ ...state, ...actions }}>
      {children}
    </DataContext.Provider>
  )
}

export function useAdminData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useAdminData must be used inside AdminDataProvider')
  return ctx
}
