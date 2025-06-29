import CategoryList from '@/components/Admin/categories/CategoryList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CategoryList />
}
