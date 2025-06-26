import AdminDashboard from '@/components/Admin/AdminDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminHome,
})

function AdminHome() {
  return (
   <AdminDashboard />
  )
}
