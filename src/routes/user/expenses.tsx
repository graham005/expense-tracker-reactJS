import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/expenses')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/expenses"!</div>
}
