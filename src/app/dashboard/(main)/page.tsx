'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/skeleton'
import type { DashboardOverview } from '@/lib/types/dashboard'
import {
  Briefcase,
  Database,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'

function StatCard({ title, value, subtitle, icon, trend }: any) {
  return (
    <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 group min-w-0">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-snug">{title}</p>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              trend.positive
                ? 'bg-secondary text-primary border-primary/10'
                : 'bg-red-50 text-red-500 border-red-100'
            }`}>
              {trend.positive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              <span>{trend.positive ? '+' : ''}{trend.value}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1 min-w-0">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-['Outfit'] text-foreground truncate">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-foreground opacity-80">
          <span className="flex items-center gap-1">
            Trending up this month <TrendingUp className="w-3 h-3 text-primary" />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function StatCardSkeleton() {
  return (
    <Card className="rounded-[var(--radius)] bg-white border-border shadow-sm min-w-0">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <Skeleton className="h-10 w-20 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}

// ── Invite Leaderboard ─────────────────────────────────────────────────────────

interface InviteStat {
  name: string
  code: string
  count: number
  url: string
}

function InviteLeaderboard({
  stats,
  total,
}: {
  stats: InviteStat[]
  total: number
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const max = stats[0]?.count || 1

  const MEDALS = ['🥇', '🥈', '🥉']

  function copyLink(url: string, code: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(code)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm min-w-0">
      <CardHeader className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold text-foreground">
              Team Invite Leaderboard
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Creator signups attributed per team member
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full shrink-0">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">{total} total</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {/* Leaderboard rows */}
        <div className="space-y-5 mb-8">
          {stats.map((person, i) => (
            <div key={person.code} className="flex items-center gap-3 sm:gap-4">
              {/* Medal / rank */}
              <span className="text-base w-6 text-center shrink-0">
                {i < 3 ? MEDALS[i] : <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>}
              </span>

              {/* Name */}
              <span className="text-sm font-semibold text-foreground w-16 shrink-0 capitalize">
                {person.name}
              </span>

              {/* Progress bar */}
              <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${max > 0 ? (person.count / max) * 100 : 0}%` }}
                />
              </div>

              {/* Count badge */}
              <span className="text-sm font-bold text-foreground w-6 text-right shrink-0">
                {person.count}
              </span>
            </div>
          ))}

          {total === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No tracked signups yet — share your links below!
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Shareable Links
          </p>

          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {stats.map((person) => (
              <div
                key={person.code}
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-border bg-secondary/40 group"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground capitalize">{person.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate font-mono">
                    ?utm_source={person.code}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyLink(person.url, person.code)}
                  className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-md border border-border bg-card hover:bg-primary hover:text-white hover:border-primary transition-all duration-150"
                >
                  {copied === person.code ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InviteLeaderboardSkeleton() {
  return (
    <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm min-w-0">
      <CardHeader className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-5 w-6 rounded" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-2 flex-1 rounded-full" />
            <Skeleton className="h-4 w-6" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const [data, setData] = useState<DashboardOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [inviteStats, setInviteStats] = useState<{ stats: InviteStat[]; total: number } | null>(null)
  const [inviteLoading, setInviteLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    fetchInviteStats()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/overview')
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchInviteStats = async () => {
    try {
      const response = await fetch('/api/invites/stats')
      if (response.ok) {
        const result = await response.json()
        setInviteStats(result)
      }
    } catch (error) {
      console.error('Failed to fetch invite stats:', error)
    } finally {
      setInviteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <Card className="h-[280px] sm:h-[340px] md:h-[400px] rounded-[var(--radius)] border-border min-w-0">
          <CardContent className="h-full flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
        <InviteLeaderboardSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 min-w-0">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Total Registrations"
          value={data?.registrations?.total || 0}
          subtitle={`${data?.registrations?.todayCount || 0} today, ${data?.registrations?.weekCount || 0} this week`}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, positive: true }}
        />
        <StatCard
          title="Creator Applications"
          value={data?.creators?.total || 0}
          subtitle={`${data?.creators?.pending || 0} pending review`}
          icon={<Briefcase className="w-5 h-5" />}
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title="Total Visitors"
          value={data?.analytics?.totalVisitors || 0}
          subtitle={`${data?.analytics?.totalSessions || 0} total sessions`}
          icon={<Database className="w-5 h-5" />}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Conversion Rate"
          value={`${(data?.analytics?.conversionRate || 0).toFixed(1)}%`}
          subtitle={`${data?.analytics?.totalClicks || 0} total clicks`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 4.5, positive: true }}
        />
      </div>

      {/* Main Chart Section */}
      <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm overflow-hidden min-w-0">
        <CardHeader className="p-4 sm:p-6 border-b border-border flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-base sm:text-lg font-bold text-foreground">Total Visitors</CardTitle>
            <p className="text-xs text-muted-foreground">Total for the last 3 months</p>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-1 p-1 bg-[var(--background)] rounded-lg border border-[var(--border)] overflow-x-auto [-webkit-overflow-scrolling:touch] shrink-0">
            {['Last 3 months', 'Last 30 days', 'Last 7 days'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`shrink-0 px-2.5 sm:px-3 py-1.5 text-[10px] font-bold rounded-md transition-all whitespace-nowrap ${
                  tab === 'Last 30 days'
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[220px] sm:h-[280px] md:h-[320px] lg:h-[350px] w-full min-w-0 relative">
            <svg className="w-full h-full" viewBox="0 0 1000 350" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[...Array(6)].map((_, i) => (
                <line key={i} x1="0" y1={70 * i} x2="1000" y2={70 * i} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
              ))}

              <path
                d="M0 300 Q 100 150, 200 250 T 400 200 T 600 150 T 800 250 T 1000 200 L 1000 350 L 0 350 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0 250 Q 150 100, 300 200 T 600 150 T 900 250 T 1000 200 L 1000 350 L 0 350 Z"
                fill="url(#chartGradient2)"
                fillOpacity="0.3"
              />
              <path
                d="M0 250 Q 150 100, 300 200 T 600 150 T 900 250 T 1000 200"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 px-2 sm:px-6 md:px-8 flex justify-between gap-1 overflow-x-auto text-[8px] sm:text-[10px] font-bold text-[var(--muted-foreground)] opacity-60 uppercase tracking-widest">
              <span>Jun 1</span>
              <span>Jun 5</span>
              <span>Jun 10</span>
              <span>Jun 15</span>
              <span>Jun 20</span>
              <span>Jun 25</span>
              <span>Jun 30</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invite Leaderboard */}
      {inviteLoading ? (
        <InviteLeaderboardSkeleton />
      ) : inviteStats ? (
        <InviteLeaderboard stats={inviteStats.stats} total={inviteStats.total} />
      ) : null}
    </div>
  )
}
