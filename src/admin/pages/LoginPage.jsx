import { useState } from 'react'
import { Zap, Eye, EyeOff } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function LoginPage() {
  const { login, loginError, clearError } = useAdminAuth()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    login(password)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(118,238,0,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(118,238,0,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(118,238,0,0.3) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Zap size={28} className="text-white" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-gray-100">
          <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1 text-center">Admin Sign In</h1>
          <p className="text-gray-500 text-sm text-center mb-8">Digital Grid Back Office</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                autoFocus
                onChange={e => { setPassword(e.target.value); clearError() }}
                className={`w-full border-2 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none transition-colors ${
                  loginError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-brand-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-brand-500 text-white py-3 rounded-xl font-heading font-bold hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20 text-sm"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Demo password: <span className="font-mono text-gray-600">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
