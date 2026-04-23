'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { dashboardNavItems } from '@/config/dashboard.config'
import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/dashboard/login')
    router.refresh()
  }

  const isActive = (route: string) => {
    if (route === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(route)
  }

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-[var(--border)]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="font-['Outfit'] font-extrabold text-xl text-[var(--text)]">
            Reactova
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
        </Link>
        <p className="text-xs text-[var(--muted)] mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.route)

          return (
            <Link
              key={item.id}
              href={item.route}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${active
                  ? 'bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30'
                  : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
              {item.badge && (
                <span className="ml-auto bg-[var(--accent)] text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg"
      >
        {mobileOpen ? (
          <X className="w-5 h-5 text-[var(--text)]" />
        ) : (
          <Menu className="w-5 h-5 text-[var(--text)]" />
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-[var(--bg)] border-r border-[var(--border)]
          flex flex-col
          transform transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <NavContent />
      </aside>
    </>
  )
}
