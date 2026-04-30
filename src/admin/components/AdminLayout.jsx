import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Toast from './Toast'
import { useAdminData } from '../context/AdminDataContext'

export default function AdminLayout() {
  const { toast } = useAdminData()
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      {toast && <Toast />}
    </div>
  )
}
