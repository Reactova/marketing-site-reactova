'use client'

import { usePathname } from 'next/navigation'
import { dashboardNavItems } from '@/config/dashboard.config'
import { Bell, Search, PanelLeft } from 'lucide-react'

export default function DashboardHeader() {
  const pathname = usePathname()

  const currentPage = dashboardNavItems.find(item => {
    if (item.route === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(item.route)
  })

  return (
    <header className="h-14 px-6! flex items-center gap-4 bg-white">
      <div className="p-1.5 hover:bg-white rounded-md border border-transparent hover:border-border transition-all cursor-pointer">
        <PanelLeft className="w-4 h-4 text-muted-foreground" />
      </div>
      <h1 className="font-['Outfit'] font-bold text-base text-foreground">
        {currentPage?.name || 'Documents'}
      </h1>
    </header>
  )
}
