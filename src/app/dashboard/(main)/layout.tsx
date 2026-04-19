'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
 
export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( 
      <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div> 
  )
}
