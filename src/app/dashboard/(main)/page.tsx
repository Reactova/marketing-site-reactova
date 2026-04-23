'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/skeleton'
import type { DashboardOverview } from '@/lib/types/dashboard' 
import {
  Briefcase,
  Database,
  Plus,
  Settings,
  TrendingDown,
  TrendingUp,
  Users
} from 'lucide-react'
import { useEffect, useState } from 'react'

function StatCard({ title, value, subtitle, icon, trend }: any) {
  return (
    <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
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
        
        <div className="space-y-1">
          <h3 className="text-3xl font-bold tracking-tight font-['Outfit'] text-foreground">
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
    <Card className="rounded-[var(--radius)] bg-white border-border shadow-sm">
      <CardContent className="p-6">
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

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <Card className="h-[400px] rounded-[var(--radius)] border-border">
          <CardContent className="h-full flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm overflow-hidden">
        <CardHeader className="p-6 border-b border-border flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-foreground">Total Visitors</CardTitle>
            <p className="text-xs text-muted-foreground">Total for the last 3 months</p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[var(--background)] rounded-lg border border-[var(--border)]">
            {['Last 3 months', 'Last 30 days', 'Last 7 days'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
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
          <div className="h-[350px] w-full relative">
            {/* Area Chart Placeholder SVG */}
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
              
              {/* Grid Lines */}
              {[...Array(6)].map((_, i) => (
                <line key={i} x1="0" y1={70 * i} x2="1000" y2={70 * i} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
              ))}
              
              {/* Waves */}
              <path 
                d="M0 300 Q 100 150, 200 250 T 400 200 T 600 150 T 800 250 T 1000 200 L 1000 350 L 0 350 Z" 
                fill="url(#chartGradient)" 
              />
              <path 
                d="M0 250 Q 150 100, 300 200 T 600 150 T 900 250 T 1000 200 L 1000 350 L 0 350 Z" 
                fill="url(#chartGradient2)" 
                fillOpacity="0.3"
              />
              
              {/* Main Line */}
              <path 
                d="M0 250 Q 150 100, 300 200 T 600 150 T 900 250 T 1000 200" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
            
            {/* X-Axis Labels */}
            <div className="absolute bottom-4 left-0 right-0 px-8 flex justify-between text-[10px] font-bold text-[var(--muted-foreground)] opacity-60 uppercase tracking-widest">
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

    </div>
  )
}
