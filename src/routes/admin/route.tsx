import { useState } from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import Header from '@/components/Admin/Header'
import SideNavBar from '@/components/Admin/AdminSideNavBar'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex'>
      <SideNavBar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className='flex-1 flex flex-col'>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
