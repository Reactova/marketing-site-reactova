'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

import { Badge } from '@/components/ui/Badge'
import {
  Spinner,
  ProgressBar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui'
import { Tooltip } from '@heroui/react'
import {
  Smartphone,
  Monitor,
  MousePointer,
  Clock,
  Target,
  Activity,
  Globe,
  TrendingUp,
  Eye,
  ArrowUpRight,
} from 'lucide-react'
import type { VisitorSession } from '@/lib/types'

interface SessionData extends VisitorSession {
  _id: string
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

interface AnalyticsStats {
  avgDuration: number
  avgScrollDepth: number
  totalClicks: number
  avgClicks: number
  totalFormInteractions: number
  deviceBreakdown: Record<string, number>
  landingPages: { _id: string; count: number }[]
  timezones: { _id: string; count: number }[]
}

const columns = [
  { id: 'visitorId', label: 'Visitor', sortable: false },
  { id: 'device', label: 'Device', sortable: false },
  { id: 'landingPage', label: 'Landing Page', sortable: true },
  { id: 'duration', label: 'Duration', sortable: true },
  { id: 'engagement', label: 'Engagement', sortable: false },
  { id: 'converted', label: 'Converted', sortable: true },
  { id: 'startedAt', label: 'Started', sortable: true },
]

function StatCard({
  title,
  value,
  subtitle,
  icon
}: {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
}) {
  return (
    <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 group min-w-0">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-snug">{title}</p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-secondary text-primary border-primary/10">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>+12.5%</span>
          </div>
        </div>

        <div className="space-y-1 min-w-0">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-['Outfit'] text-foreground break-words">
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
            Strong user retention <TrendingUp className="w-3 h-3 text-primary" />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  })
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [deviceFilter, setDeviceFilter] = useState('')
  const [convertedFilter, setConvertedFilter] = useState('')
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string
    direction: 'ascending' | 'descending'
  }>({ column: 'startedAt', direction: 'descending' })

  const fetchSessions = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy: sortDescriptor.column,
        sortOrder: sortDescriptor.direction === 'ascending' ? 'asc' : 'desc',
        device: deviceFilter,
        converted: convertedFilter,
      })

      const response = await fetch(`/api/dashboard/analytics?${params}`)
      if (response.ok) {
        const data = await response.json()
        setSessions(data.data)
        setPagination(data.pagination)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, sortDescriptor, deviceFilter, convertedFilter])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }))
  }, [deviceFilter, convertedFilter])

  /** React Aria table collections require a stable `id` on each row item. */
  const tableSessions = useMemo(
    (): (SessionData & { id: string })[] =>
      sessions.map((s) => ({
        ...s,
        id: String(s._id ?? s.sessionId),
      })),
    [sessions]
  )

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    }
    return `${seconds}s`
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderCell = useCallback((item: SessionData, columnKey: string) => {
    switch (columnKey) {
      case 'visitorId':
        return (
          <Tooltip>
            <Tooltip.Trigger>
              <span className="text-[var(--foreground)] font-mono text-xs cursor-help">
                {item.visitorId.substring(0, 8)}...
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content>{item.visitorId}</Tooltip.Content>
          </Tooltip>
        )
      case 'device':
        return (
          <Tooltip>
            <Tooltip.Trigger>
              <div className="flex items-center gap-2 cursor-help">
                {item.device.isMobile ? (
                  <Smartphone className="w-4 h-4 text-[var(--muted-foreground)]" />
                ) : (
                  <Monitor className="w-4 h-4 text-[var(--muted-foreground)]" />
                )}
                <span className="text-xs text-[var(--muted-foreground)]">
                  {item.device.isMobile ? 'Mobile' : 'Desktop'}
                </span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>{`${item.device.platform} - ${item.device.screenWidth}x${item.device.screenHeight}`}</Tooltip.Content>
          </Tooltip>
        )
      case 'landingPage':
        return (
          <span className="text-sm text-[var(--foreground)]">
            {item.source.landingPage || '/'}
          </span>
        )
      case 'duration':
        return (
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-[var(--muted-foreground)]" />
            <span className="text-sm text-[var(--foreground)]">
              {formatDuration(item.duration)}
            </span>
          </div>
        )
      case 'engagement':
        return (
          <div className="flex items-center gap-3">
            <Tooltip>
              <Tooltip.Trigger>
                <div className="flex items-center gap-1 cursor-help">
                  <MousePointer className="w-3 h-3 text-[var(--muted-foreground)]" />
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {item.engagement.clickCount}
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content>{`${item.engagement.clickCount} clicks`}</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger>
                <div className="flex items-center gap-1 cursor-help">
                  <ArrowUpRight className="w-3 h-3 text-[var(--muted-foreground)]" />
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {item.engagement.scrollDepthMax}%
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content>{`${item.engagement.scrollDepthMax}% scroll depth`}</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger>
                <div className="flex items-center gap-1 cursor-help">
                  <Activity className="w-3 h-3 text-[var(--muted-foreground)]" />
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {item.engagement.formInteractions}
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content>{`${item.engagement.formInteractions} form interactions`}</Tooltip.Content>
            </Tooltip>
          </div>
        )
      case 'converted':
        return (
          <Badge
            variant={item.converted ? 'success' : 'secondary'}
          >
            {item.converted ? 'Yes' : 'No'}
          </Badge>
        )
      case 'startedAt':
        return (
          <span className="text-sm text-[var(--muted-foreground)]">
            {formatDate(item.startedAt)}
          </span>
        )
      default:
        return null
    }
  }, [])

  const totalMobile = stats?.deviceBreakdown?.mobile || 0
  const totalDesktop = stats?.deviceBreakdown?.desktop || 0
  const totalDevices = totalMobile + totalDesktop

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4 sm:gap-6 min-w-0">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Sessions"
          value={pagination.total}
          icon={<Eye className="w-4 h-4" />}
        />
        <StatCard
          title="Avg Duration"
          value={formatDuration(stats?.avgDuration || 0)}
          icon={<Clock className="w-4 h-4" />}
        />
        <StatCard
          title="Total Clicks"
          value={stats?.totalClicks || 0}
          subtitle={`${(stats?.avgClicks || 0).toFixed(1)} avg`}
          icon={<MousePointer className="w-4 h-4" />}
        />
        <StatCard
          title="Avg Scroll Depth"
          value={`${Math.round(stats?.avgScrollDepth || 0)}%`}
          icon={<ArrowUpRight className="w-4 h-4" />}
        />
        <StatCard
          title="Form Interactions"
          value={stats?.totalFormInteractions || 0}
          icon={<Activity className="w-4 h-4" />}
        />
        <StatCard
          title="Conversion Rate"
          value={`${pagination.total > 0 ? ((sessions.filter(s => s.converted).length / sessions.length) * 100).toFixed(1) : 0}%`}
          icon={<Target className="w-4 h-4" />}
        />
      </div>

      {/* Device & Landing Page Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 min-w-0">
        <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 min-w-0">
          <CardContent className="p-4 sm:p-6">
            <h4 className="font-['Outfit'] font-semibold text-sm text-foreground mb-4">
              Device Breakdown
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--muted-foreground)]">Desktop</span>
                  <span className="text-[var(--foreground)]">
                    {totalDesktop} ({totalDevices > 0 ? Math.round((totalDesktop / totalDevices) * 100) : 0}%)
                  </span>
                </div>
                <ProgressBar
                  value={totalDevices > 0 ? (totalDesktop / totalDevices) * 100 : 0}
                  size="sm"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--muted-foreground)]">Mobile</span>
                  <span className="text-[var(--foreground)]">
                    {totalMobile} ({totalDevices > 0 ? Math.round((totalMobile / totalDevices) * 100) : 0}%)
                  </span>
                </div>
                <ProgressBar
                  value={totalDevices > 0 ? (totalMobile / totalDevices) * 100 : 0}
                  size="sm"
                  color="accent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 min-w-0">
          <CardContent className="p-4 sm:p-6">
            <h4 className="font-['Outfit'] font-semibold text-sm text-foreground mb-4">
              Top Landing Pages
            </h4>
            <div className="space-y-2">
              {stats?.landingPages?.slice(0, 5).map((page, i) => (
                <div key={page._id || i} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center min-w-0">
                  <span className="text-sm text-[var(--muted-foreground)] min-w-0 break-all sm:truncate sm:pr-2">
                    {page._id || '/'}
                  </span>
                  <Badge variant="secondary" className="shrink-0 self-start sm:self-auto">
                    {page.count}
                  </Badge>
                </div>
              ))}
              {(!stats?.landingPages || stats.landingPages.length === 0) && (
                <p className="text-sm text-[var(--muted-foreground)]">No data yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timezones */}
      <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 min-w-0">
        <CardContent className="p-4 sm:p-6">
          <h4 className="font-['Outfit'] font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Visitor Timezones
          </h4>
          <div className="flex flex-wrap gap-2">
            {stats?.timezones?.map((tz, i) => (
              <Badge key={tz._id || i} variant="secondary">
                {tz._id || 'Unknown'}: {tz.count}
              </Badge>
            ))}
            {(!stats?.timezones || stats.timezones.length === 0) && (
              <p className="text-sm text-[var(--muted-foreground)]">No data yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  ), [stats, pagination.total, deviceFilter, convertedFilter, sessions, totalMobile, totalDesktop, totalDevices])

  const bottomContent = useMemo(() => {
    const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
    const currentPage = pagination.page

    return (
      <div className="flex justify-center py-2 max-w-full overflow-x-auto px-1 [-webkit-overflow-scrolling:touch]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                isDisabled={currentPage <= 1}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
              />
            </PaginationItem>
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page }))
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                isDisabled={currentPage >= pagination.totalPages}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  }, [pagination.page, pagination.totalPages])

  return (
    <div className="space-y-6 min-w-0">
      {topContent}

      <Card className="border-border bg-card shadow-sm rounded-xl mt-4 sm:mt-6 min-w-0 overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20 rounded-t-xl p-0">
          <div className="flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between min-w-0">
            <div className="space-y-1 min-w-0">
              <CardTitle className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground">Session Details</CardTitle>
              <CardContent className="text-muted-foreground text-sm p-0">Detailed view of all visitor sessions.</CardContent>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row w-full lg:w-auto lg:shrink-0 min-w-0">
              <Select
                value={deviceFilter === '' ? '__all__' : deviceFilter}
                onValueChange={(v) =>
                  setDeviceFilter(v === '__all__' ? '' : v)
                }
              >
                <SelectTrigger className="h-10 w-full min-w-0 sm:min-w-[140px] sm:w-auto bg-background">
                  <SelectValue placeholder="Device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All Devices</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={convertedFilter === '' ? '__all__' : convertedFilter}
                onValueChange={(v) =>
                  setConvertedFilter(v === '__all__' ? '' : v)
                }
              >
                <SelectTrigger className="h-10 w-full min-w-0 sm:min-w-[140px] sm:w-auto bg-background">
                  <SelectValue placeholder="Converted" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">All</SelectItem>
                  <SelectItem value="true">Converted</SelectItem>
                  <SelectItem value="false">Not Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner variant="accent" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No sessions found
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-border">
                    {columns.map((column) => (
                      <TableHead key={column.id} className="text-muted-foreground">
                        {column.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((item) => (
                    <TableRow key={item._id || item.sessionId} className="border-b-border/50">
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {renderCell(item, column.id)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {bottomContent}
        </CardContent>
      </Card>
    </div>
  )
}
