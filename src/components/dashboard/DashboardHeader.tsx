'use client'

import { usePathname } from 'next/navigation'
import { dashboardNavItems } from '@/config/dashboard.config'
import { Bell, Search } from 'lucide-react'

export default function DashboardHeader() {
  const pathname = usePathname()
  
  const currentPage = dashboardNavItems.find(item => {
    if (item.route === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(item.route)
  })

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}
        <h1 className="font-['Syne'] font-bold text-xl text-[var(--text)]">
          {currentPage?.name || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent)] rounded-full" />
        </button>
      </div>
    </header>
  )
}
