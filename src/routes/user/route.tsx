import Header from '@/components/User/Header'
import UserSideBar from '@/components/User/UserSideBar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/user')({
  component: RouteComponent,
})

function RouteComponent() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return (
    <div className='flex'>
      <UserSideBar  open={sidebarOpen} setOpen={setSidebarOpen}/>
      <div className='flex-1 flex flex-col'>
        <Header  onMenuClick={() => setSidebarOpen(true)}/>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
