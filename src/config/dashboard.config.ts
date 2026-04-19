import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  id: string
  name: string
  route: string
  icon: LucideIcon
  order: number
  badge?: string
}

export const dashboardNavItems: NavItem[] = [
  {
    id: 'overview',
    name: 'Overview',
    route: '/dashboard',
    icon: LayoutDashboard,
    order: 1,
  },
  {
    id: 'registrations',
    name: 'Registrations',
    route: '/dashboard/registrations',
    icon: Users,
    order: 2,
  },
  {
    id: 'creators',
    name: 'Creators',
    route: '/dashboard/creators',
    icon: UserPlus,
    order: 3,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    route: '/dashboard/analytics',
    icon: BarChart3,
    order: 4,
  },
  {
    id: 'settings',
    name: 'Settings',
    route: '/dashboard/settings',
    icon: Settings,
    order: 5,
  },
].sort((a, b) => a.order - b.order)

export const dashboardConfig = {
  title: 'Reactova Dashboard',
  sessionCookieName: 'dashboard_session',
  sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
}
