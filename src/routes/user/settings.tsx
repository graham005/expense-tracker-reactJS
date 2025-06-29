import Settings from '@/components/User/Settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Settings />
}
