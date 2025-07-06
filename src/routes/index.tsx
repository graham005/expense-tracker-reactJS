import Index from '@/components/LandingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

// function App() {
//   return (
//     < Index />
//   )
// }
