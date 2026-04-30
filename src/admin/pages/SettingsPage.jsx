import { useState } from 'react'
import { Save } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'

const inputCls = 'w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 transition-colors'

export default function SettingsPage() {
  const { settings, updateSettings } = useAdminData()
  const [form, setForm] = useState({ ...settings })

  function set(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    updateSettings(form)
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your store configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Store Info */}
        <section className="bg-white rounded-2xl border-2 border-gray-100 p-6 space-y-4">
          <h2 className="font-heading font-semibold text-gray-900 text-lg">Store Information</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Store Name</label>
            <input className={inputCls} value={form.storeName} onChange={e => set('storeName', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Email</label>
              <input className={inputCls} type="email" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <input className={inputCls} type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Address</label>
            <input className={inputCls} value={form.address} onChange={e => set('address', e.target.value)} />
          </div>
        </section>

        {/* Commerce */}
        <section className="bg-white rounded-2xl border-2 border-gray-100 p-6 space-y-4">
          <h2 className="font-heading font-semibold text-gray-900 text-lg">Commerce Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Currency</label>
              <select className={inputCls} value={form.currency} onChange={e => set('currency', e.target.value)}>
                <option value="ZAR">ZAR – South African Rand</option>
                <option value="USD">USD – US Dollar</option>
                <option value="EUR">EUR – Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Free Shipping Threshold (R)</label>
              <input className={inputCls} type="number" min="0" value={form.freeShippingThreshold} onChange={e => set('freeShippingThreshold', Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Low Stock Alert Threshold</label>
            <input className={inputCls} type="number" min="1" max="20" value={form.lowStockAlert} onChange={e => set('lowStockAlert', Number(e.target.value))} />
            <p className="text-xs text-gray-400 mt-1">Alert when stock drops to or below this number</p>
          </div>
        </section>

        {/* Payment – placeholder */}
        <section className="bg-white rounded-2xl border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-gray-900 text-lg">Payment Gateway</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Coming Soon</span>
          </div>
          <p className="text-gray-500 text-sm">
            Payflex / Yoco integration will be configured here once your merchant account is approved.
            Your merchant ID and API keys will be stored as environment variables — never in the database.
          </p>
        </section>

        <button
          type="submit"
          className="flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors shadow-sm text-sm"
        >
          <Save size={16} />
          Save Settings
        </button>
      </form>
    </div>
  )
}
