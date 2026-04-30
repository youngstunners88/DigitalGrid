import { useState } from 'react'
import { X } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'

const EMPTY = {
  name: '', category: 'laptop', price: '', condition: 'Excellent',
  description: '', image: '', stock: 1,
  specs: { cpu: '', ram: '', storage: '', display: '', gpu: '', os: '' },
}

const inputCls = 'w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 transition-colors'

export default function ProductForm({ product, onClose }) {
  const { addProduct, updateProduct } = useAdminData()
  const isEdit = Boolean(product)
  const [form, setForm] = useState(isEdit ? { ...product } : { ...EMPTY })
  const [errors, setErrors] = useState({})

  function set(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  function setSpec(key, value) {
    setForm(prev => ({ ...prev, specs: { ...prev.specs, [key]: value } }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = 'Enter a valid price'
    if (!form.description.trim()) errs.description = 'Description is required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) }
    isEdit ? updateProduct(data) : addProduct(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 border-2 border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-gray-100">
          <h2 className="font-heading font-bold text-xl text-gray-900">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name *</label>
            <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Dell Latitude 5500 i7" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Category + Condition + Price */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <select className={inputCls} value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Condition</label>
              <select className={inputCls} value={form.condition} onChange={e => set('condition', e.target.value)}>
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (ZAR) *</label>
              <input className={inputCls} type="number" min="1" value={form.price} onChange={e => set('price', e.target.value)} placeholder="0" />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock Qty</label>
              <input className={inputCls} type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL</label>
              <input className={inputCls} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://…" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
            <textarea className={`${inputCls} resize-none`} rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief product description…" />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Specs */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Specifications</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(EMPTY.specs).map(key => (
                <div key={key}>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">{key}</label>
                  <input className={inputCls} value={form.specs?.[key] ?? ''} onChange={e => setSpec(key, e.target.value)} placeholder={key === 'cpu' ? 'e.g. Intel Core i7-8650U' : ''} />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2 border-t-2 border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors text-sm">
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
