export interface DashboardUser {
  email: string
  hashedPassword: string
}

export interface DashboardSession {
  email: string
  createdAt: Date
  expiresAt: Date
}

export interface AnalyticsStats {
  totalSessions: number
  totalVisitors: number
  totalClicks: number
  avgSessionDuration: number
  mobileUsers: number
  desktopUsers: number
  conversionRate: number
}

export interface RegistrationStats {
  total: number
  emailsSent: number
  tier1Count: number
  tier2Count: number
  tier3Count: number
  todayCount: number
  weekCount: number
}

export interface CreatorStats {
  total: number
  pending: number
  approved: number
  rejected: number
  waitlisted: number
  todayCount: number
}

export interface DashboardOverview {
  registrations: RegistrationStats
  creators: CreatorStats
  analytics: AnalyticsStats
}
