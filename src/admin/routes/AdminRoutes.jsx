import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import LoginPage from '../pages/LoginPage'

export function RequireAuth() {
  const { authenticated, loading } = useAdminAuth()
  if (loading) return null
  return authenticated ? <Outlet /> : <LoginPage />
}

export function RedirectIfAuth() {
  const { authenticated, loading } = useAdminAuth()
  if (loading) return null
  return authenticated ? <Navigate to="/admin" replace /> : <Outlet />
}
