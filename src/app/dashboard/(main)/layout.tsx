'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
 
export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( 
      <div className="flex h-screen bg-background overflow-hidden container">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6">
            {children}
          </main>
        </div>
      </div> 
  )
}
