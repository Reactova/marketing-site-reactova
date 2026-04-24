'use client'

import { usePathname } from 'next/navigation'
import { dashboardNavItems } from '@/config/dashboard.config'
import { Bell, Search, PanelLeft } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export default function DashboardHeader() {
  const pathname = usePathname()

  const currentPage = dashboardNavItems.find((item) => {
    if (item.route === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(item.route)
  })

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
      <button
        type="button"
        className="hidden rounded-md border border-transparent p-1.5 transition-colors hover:border-border hover:bg-muted/60 lg:inline-flex"
        aria-label="Toggle sidebar"
      >
        <PanelLeft className="h-4 w-4 text-muted-foreground" />
      </button>
      <h1 className="min-w-0 flex-1 font-['Outfit'] text-base font-bold tracking-tight text-foreground truncate">
        {currentPage?.name || 'Documents'}
      </h1>

      <div className="hidden w-full max-w-xs md:block">
        <InputGroup className="h-9 bg-muted/30 shadow-none">
          <InputGroupInput
            type="search"
            placeholder="Search…"
            aria-label="Search dashboard"
          />
          <InputGroupAddon align="inline-start">
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <button
        type="button"
        className="ml-auto inline-flex rounded-md border border-transparent p-2 text-muted-foreground transition-colors hover:border-border hover:bg-muted/60 hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
      </button>
    </header>
  )
}
