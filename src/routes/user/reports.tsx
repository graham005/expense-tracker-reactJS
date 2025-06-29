import Report from '@/components/User/Report'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Report />
}
