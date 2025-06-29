import UserDashboard from '@/components/User/UserDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserDashboard />
}
