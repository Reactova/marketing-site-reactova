'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Plus,
  FileText,
  LifeBuoy,
  Search,
  MoreHorizontal,
  ChevronRight,
  LogOut,
  UserPlus,
  CheckCircle,
  Activity,
  Briefcase,
  Database,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (route: string) => {
    if (route === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(route)
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/dashboard/login')
    router.refresh()
  }

  const mainNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
    { name: 'Analytics', icon: BarChart3, route: '/dashboard/analytics' },
    { name: 'Registrations', icon: Users, route: '/dashboard/registrations' },
    { name: 'Creators', icon: UserPlus, route: '/dashboard/creators' },
    { name: 'Approvals', icon: CheckCircle, route: '/dashboard/approvals' },
  ]

  const bottomNavItems = [
    { name: 'Settings', icon: Settings, route: '/dashboard/settings' },
    { name: 'Get Help', icon: LifeBuoy, route: '/dashboard/help' },
    { name: 'Search', icon: Search, route: '/dashboard/search' },
  ]

  const NavItem = ({ item }: { item: any }) => {
    const active = isActive(item.route)
    const Icon = item.icon

    return (
      <Link
        href={item.route}
        className={`
          flex items-center gap-3 px-3! py-2! rounded-lg text-sm font-medium transition-all
          ${active
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
          }
        `}
      >
        <Icon className={`w-4 h-4 ${active ? 'text-sidebar-primary' : 'text-muted-foreground'}`} />
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg border border-input bg-background p-2 shadow-sm transition-colors hover:bg-muted/50 lg:hidden"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-sidebar border-r border-sidebar-border
        flex flex-col h-full transform transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-3! flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-['Outfit'] font-bold text-foreground">Reactova Inc.</span>
        </div>


        {/* Nav Sections */}
        <div className="flex-1 overflow-y-auto px-4 space-y-8 custom-scrollbar">
          {/* Main Nav */}
          <div className="space-y-1!">
            {mainNavItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="space-y-1!">
            {bottomNavItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4! border-t border-sidebar-border bg-background/50">
          <div className="flex items-center gap-3 p-2 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">Admin User</p>
              <p className="text-[10px] text-muted-foreground truncate">admin@reactova.com</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
