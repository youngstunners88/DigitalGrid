import { CheckCircle, XCircle, X } from 'lucide-react'
import { useAdminData } from '../context/AdminDataContext'

export default function Toast() {
  const { toast, clearToast } = useAdminData()
  if (!toast) return null

  const isSuccess = toast.type === 'success'
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border-2 text-sm font-semibold animate-[fadeUp_0.25s_ease] ${
        isSuccess
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-red-50 border-red-200 text-red-800'
      }`}
    >
      {isSuccess ? <CheckCircle size={18} /> : <XCircle size={18} />}
      <span>{toast.message}</span>
      <button onClick={clearToast} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </div>
  )
}
