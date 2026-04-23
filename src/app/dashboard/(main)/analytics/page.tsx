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
import { Spinner, ProgressBar } from '@/components/ui'
import {
  Tooltip,
  Select,
  ListBox,
  Pagination,
} from '@heroui/react'
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
    <Card className="rounded-(--radius) border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 group p-4!">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-secondary text-primary border-primary/10">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>+12.5%</span>
          </div>
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
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 p-6!">
          <CardContent className="p-6">
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

        <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 p-6!">
          <CardContent className="p-6">
            <h4 className="font-['Outfit'] font-semibold text-sm text-foreground mb-4">
              Top Landing Pages
            </h4>
            <div className="space-y-2">
              {stats?.landingPages?.slice(0, 5).map((page, i) => (
                <div key={page._id || i} className="flex justify-between items-center">
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {page._id || '/'}
                  </span>
                  <Badge variant="secondary">
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
      <Card className="rounded-[var(--radius)] border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 p-6!">
        <CardContent className="p-6">
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
      <div className="flex justify-center py-2">
        <Pagination>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={currentPage <= 1}
                onPress={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              >
                <Pagination.PreviousIcon />
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((page) => (
              <Pagination.Item key={page}>
                <Pagination.Link
                  isActive={page === currentPage}
                  onPress={() => setPagination(prev => ({ ...prev, page }))}
                  className={page === currentPage ? 'bg-[var(--primary)] text-white' : ''}
                >
                  {page}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={currentPage >= pagination.totalPages}
                onPress={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              >
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </div>
    )
  }, [pagination.page, pagination.totalPages])

  return (
    <div className="space-y-6">
      {topContent}

      <Card className="border-border bg-card shadow-sm rounded-xl mt-6!">
        <CardHeader className="border-b border-border/50 bg-muted/20 rounded-t-xl! pb-4">
          <div className="flex items-center justify-between px-6! bg-none!">
            <div className="space-y-1">
              <CardTitle className="font-['Outfit'] text-xl font-bold text-foreground">Session Details</CardTitle>
              <CardContent className="text-muted-foreground">Detailed view of all visitor sessions.</CardContent>
            </div>
            <div className="flex gap-3">
              <Select
                placeholder="Device"
                value={deviceFilter || null}
                onChange={(value) => setDeviceFilter(value as string || '')}
                className="min-w-[120px]!"
              >
                <Select.Trigger className="flex items-center justify-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className='border border-border bg-card shadow-sm rounded-none!'>
                  <ListBox className="border border-border bg-card shadow-sm rounded-none!">
                    <ListBox.Item className='border-b border-border rounded-none! p-2!' id="">All Devices</ListBox.Item>
                    <ListBox.Item className='border-b border-border rounded-none! p-2!' id="desktop">Desktop</ListBox.Item>
                    <ListBox.Item className='border-b border-border rounded-none! p-2!' id="mobile">Mobile</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
              <Select
                placeholder="Converted"
                value={convertedFilter || null}
                onChange={(value) => setConvertedFilter(value as string || '')}
                className="min-w-[120px]!"
              >
                <Select.Trigger className="flex items-center justify-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className='border border-border bg-card shadow-sm rounded-none!'>
                  <ListBox className="border border-border bg-card shadow-sm rounded-none!">
                    <ListBox.Item className='border-b border-border rounded-none! p-2!' id="">All</ListBox.Item>
                    <ListBox.Item className='border-b border-border rounded-none! p-2!' id="true">Converted</ListBox.Item>
                    <ListBox.Item className='border-b border-border rounded-none! p-2!' id="false">Not Converted</ListBox.Item>
                  </ListBox>
                </Select.Popover>
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
            <div className="overflow-x-auto">
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
