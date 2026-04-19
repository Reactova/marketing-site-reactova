'use client'

import { useEffect, useState } from 'react'
import { Card, CardBody } from '@/components/ui'
import { Skeleton } from '@heroui/react'
import {
  Users,
  UserPlus,
  BarChart3,
  TrendingUp,
  MousePointer,
  Clock,
  Smartphone,
  Monitor,
  Mail,
} from 'lucide-react'
import type { DashboardOverview } from '@/lib/types/dashboard'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: { value: number; positive: boolean }
  color?: 'primary' | 'accent' | 'success' | 'warning'
}

function StatCard({ title, value, subtitle, icon, trend, color = 'primary' }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-[var(--primary)]/15 text-[var(--primary)] border-[var(--primary)]/30',
    accent: 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30',
    success: 'bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30',
    warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  }

  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)]">
      <CardBody className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--muted)] mb-1">{title}</p>
            <p className="text-2xl font-['Syne'] font-bold text-[var(--text)]">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-[var(--muted)] mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-xs ${trend.positive ? 'text-[var(--success)]' : 'text-red-400'}`}>
                <TrendingUp className={`w-3 h-3 ${!trend.positive && 'rotate-180'}`} />
                <span>{trend.value}% from last week</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function StatCardSkeleton() {
  return (
    <Card className="bg-[var(--surface)] border border-[var(--border)]">
      <CardBody className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-4 w-24 rounded-lg bg-[var(--border)]" />
            <Skeleton className="h-8 w-16 rounded-lg bg-[var(--border)] mt-2" />
            <Skeleton className="h-3 w-32 rounded-lg bg-[var(--border)] mt-2" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl bg-[var(--border)]" />
        </div>
      </CardBody>
    </Card>
  )
}

export default function DashboardOverviewPage() {
  const [data, setData] = useState<DashboardOverview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
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

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    }
    return `${seconds}s`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-['Syne'] font-bold text-2xl text-[var(--text)] mb-2">
            Welcome back
          </h2>
          <p className="text-[var(--muted)]">
            Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-['Syne'] font-bold text-2xl text-[var(--text)] mb-2">
          Welcome back
        </h2>
        <p className="text-[var(--muted)]">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </div>

      {/* Registrations Stats */}
      <div>
        <h3 className="font-['Syne'] font-semibold text-lg text-[var(--text)] mb-4">
          Pre-Registrations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Registrations"
            value={data?.registrations.total || 0}
            subtitle={`${data?.registrations.todayCount || 0} today`}
            icon={<Users className="w-5 h-5" />}
            color="primary"
          />
          <StatCard
            title="Emails Sent"
            value={data?.registrations.emailsSent || 0}
            subtitle={`${Math.round(((data?.registrations.emailsSent || 0) / (data?.registrations.total || 1)) * 100)}% delivery rate`}
            icon={<Mail className="w-5 h-5" />}
            color="success"
          />
          <StatCard
            title="Tier 1 (50% off)"
            value={data?.registrations.tier1Count || 0}
            subtitle="First 15 spots"
            icon={<TrendingUp className="w-5 h-5" />}
            color="accent"
          />
          <StatCard
            title="Tier 2 (10% off)"
            value={data?.registrations.tier2Count || 0}
            subtitle="Next 15 spots"
            icon={<TrendingUp className="w-5 h-5" />}
            color="warning"
          />
        </div>
      </div>

      {/* Creators Stats */}
      <div>
        <h3 className="font-['Syne'] font-semibold text-lg text-[var(--text)] mb-4">
          Creator Applications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Applications"
            value={data?.creators.total || 0}
            subtitle={`${data?.creators.todayCount || 0} today`}
            icon={<UserPlus className="w-5 h-5" />}
            color="primary"
          />
          <StatCard
            title="Pending Review"
            value={data?.creators.pending || 0}
            icon={<Clock className="w-5 h-5" />}
            color="warning"
          />
          <StatCard
            title="Approved"
            value={data?.creators.approved || 0}
            icon={<TrendingUp className="w-5 h-5" />}
            color="success"
          />
          <StatCard
            title="Rejected"
            value={data?.creators.rejected || 0}
            icon={<TrendingUp className="w-5 h-5" />}
            color="accent"
          />
        </div>
      </div>

      {/* Analytics Stats */}
      <div>
        <h3 className="font-['Syne'] font-semibold text-lg text-[var(--text)] mb-4">
          Site Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Sessions"
            value={data?.analytics.totalSessions || 0}
            subtitle={`${data?.analytics.totalVisitors || 0} unique visitors`}
            icon={<BarChart3 className="w-5 h-5" />}
            color="primary"
          />
          <StatCard
            title="Total Clicks"
            value={data?.analytics.totalClicks || 0}
            icon={<MousePointer className="w-5 h-5" />}
            color="accent"
          />
          <StatCard
            title="Avg. Session Duration"
            value={formatDuration(data?.analytics.avgSessionDuration || 0)}
            icon={<Clock className="w-5 h-5" />}
            color="success"
          />
          <StatCard
            title="Conversion Rate"
            value={`${(data?.analytics.conversionRate || 0).toFixed(1)}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="warning"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <StatCard
            title="Mobile Users"
            value={data?.analytics.mobileUsers || 0}
            subtitle={`${Math.round(((data?.analytics.mobileUsers || 0) / (data?.analytics.totalSessions || 1)) * 100)}% of total`}
            icon={<Smartphone className="w-5 h-5" />}
            color="primary"
          />
          <StatCard
            title="Desktop Users"
            value={data?.analytics.desktopUsers || 0}
            subtitle={`${Math.round(((data?.analytics.desktopUsers || 0) / (data?.analytics.totalSessions || 1)) * 100)}% of total`}
            icon={<Monitor className="w-5 h-5" />}
            color="primary"
          />
        </div>
      </div>
    </div>
  )
}
