'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Tooltip,
  Select,
  ListBox,
  ProgressBar,  
} from '@heroui/react'
import { Card, CardBody, Spinner } from '@/components/ui'
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
    <Card className="bg-[var(--surface)] border border-[var(--border)]">
      <CardBody className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">{title}</p>
            <p className="text-xl font-['Syne'] font-bold text-[var(--text)]">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-[var(--muted)] mt-1">{subtitle}</p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            {icon}
          </div>
        </div>
      </CardBody>
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
              <span className="text-[var(--text)] font-mono text-xs cursor-help">
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
                  <Smartphone className="w-4 h-4 text-[var(--muted)]" />
                ) : (
                  <Monitor className="w-4 h-4 text-[var(--muted)]" />
                )}
                <span className="text-xs text-[var(--muted)]">
                  {item.device.isMobile ? 'Mobile' : 'Desktop'}
                </span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>{`${item.device.platform} - ${item.device.screenWidth}x${item.device.screenHeight}`}</Tooltip.Content>
          </Tooltip>
        )
      case 'landingPage':
        return (
          <span className="text-sm text-[var(--text)]">
            {item.source.landingPage || '/'}
          </span>
        )
      case 'duration':
        return (
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-[var(--muted)]" />
            <span className="text-sm text-[var(--text)]">
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
                  <MousePointer className="w-3 h-3 text-[var(--muted)]" />
                  <span className="text-xs text-[var(--muted)]">
                    {item.engagement.clickCount}
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content>{`${item.engagement.clickCount} clicks`}</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger>
                <div className="flex items-center gap-1 cursor-help">
                  <ArrowUpRight className="w-3 h-3 text-[var(--muted)]" />
                  <span className="text-xs text-[var(--muted)]">
                    {item.engagement.scrollDepthMax}%
                  </span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content>{`${item.engagement.scrollDepthMax}% scroll depth`}</Tooltip.Content>
            </Tooltip>
            <Tooltip>
              <Tooltip.Trigger>
                <div className="flex items-center gap-1 cursor-help">
                  <Activity className="w-3 h-3 text-[var(--muted)]" />
                  <span className="text-xs text-[var(--muted)]">
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
          <Chip
            size="sm"
            color={item.converted ? 'success' : 'default'}
            variant="soft"
          >
            {item.converted ? 'Yes' : 'No'}
          </Chip>
        )
      case 'startedAt':
        return (
          <span className="text-sm text-[var(--muted)]">
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
        <Card className="bg-[var(--surface)] border border-[var(--border)]">
          <CardBody className="p-4">
            <h4 className="font-['Syne'] font-semibold text-sm text-[var(--text)] mb-4">
              Device Breakdown
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--muted)]">Desktop</span>
                  <span className="text-[var(--text)]">
                    {totalDesktop} ({totalDevices > 0 ? Math.round((totalDesktop / totalDevices) * 100) : 0}%)
                  </span>
                </div>
                <ProgressBar
                  value={totalDevices > 0 ? (totalDesktop / totalDevices) * 100 : 0}
                  aria-label="Desktop percentage"
                  size="sm"
                >
                  <ProgressBar.Track className="bg-[var(--border)]">
                    <ProgressBar.Fill className="bg-[var(--primary)]" />
                  </ProgressBar.Track>
                </ProgressBar>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--muted)]">Mobile</span>
                  <span className="text-[var(--text)]">
                    {totalMobile} ({totalDevices > 0 ? Math.round((totalMobile / totalDevices) * 100) : 0}%)
                  </span>
                </div>
                <ProgressBar
                  value={totalDevices > 0 ? (totalMobile / totalDevices) * 100 : 0}
                  aria-label="Mobile percentage"
                  size="sm"
                >
                  <ProgressBar.Track className="bg-[var(--border)]">
                    <ProgressBar.Fill className="bg-[var(--accent)]" />
                  </ProgressBar.Track>
                </ProgressBar>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-[var(--surface)] border border-[var(--border)]">
          <CardBody className="p-4">
            <h4 className="font-['Syne'] font-semibold text-sm text-[var(--text)] mb-4">
              Top Landing Pages
            </h4>
            <div className="space-y-2">
              {stats?.landingPages?.slice(0, 5).map((page, i) => (
                <div key={page._id || i} className="flex justify-between items-center">
                  <span className="text-sm text-[var(--muted)]">
                    {page._id || '/'}
                  </span>
                  <Chip size="sm" variant="soft">
                    {page.count}
                  </Chip>
                </div>
              ))}
              {(!stats?.landingPages || stats.landingPages.length === 0) && (
                <p className="text-sm text-[var(--muted)]">No data yet</p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Timezones */}
      <Card className="bg-[var(--surface)] border border-[var(--border)]">
        <CardBody className="p-4">
          <h4 className="font-['Syne'] font-semibold text-sm text-[var(--text)] mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Visitor Timezones
          </h4>
          <div className="flex flex-wrap gap-2">
            {stats?.timezones?.map((tz, i) => (
              <Chip key={tz._id || i} size="sm" variant="soft">
                {tz._id || 'Unknown'}: {tz.count}
              </Chip>
            ))}
            {(!stats?.timezones || stats.timezones.length === 0) && (
              <p className="text-sm text-[var(--muted)]">No data yet</p>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <h3 className="font-['Syne'] font-bold text-lg text-[var(--text)]">
          Session Details
        </h3>
        <div className="flex gap-3">
          <Select
            placeholder="Device"
            value={deviceFilter || null}
            onChange={(value) => setDeviceFilter(value as string || '')}
            className="min-w-[120px]"
          >
            <Select.Trigger className="bg-[var(--surface)] border-[var(--border)]">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="">All Devices</ListBox.Item>
                <ListBox.Item id="desktop">Desktop</ListBox.Item>
                <ListBox.Item id="mobile">Mobile</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
          <Select
            placeholder="Converted"
            value={convertedFilter || null}
            onChange={(value) => setConvertedFilter(value as string || '')}
            className="min-w-[120px]"
          >
            <Select.Trigger className="bg-[var(--surface)] border-[var(--border)]">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="">All</ListBox.Item>
                <ListBox.Item id="true">Converted</ListBox.Item>
                <ListBox.Item id="false">Not Converted</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
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
      <Card className="bg-[var(--surface)] border border-[var(--border)]">
        <CardBody>
          {topContent}
          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner variant="accent" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-[var(--muted)]">
              No sessions found
            </div>
          ) : (
            <Table className="bg-transparent shadow-none">
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Sessions table"
                  sortDescriptor={sortDescriptor}
                  onSortChange={(descriptor) =>
                    setSortDescriptor(descriptor as typeof sortDescriptor)
                  }
                  className="[&_th]:bg-[var(--bg)] [&_th]:text-[var(--muted)] [&_th]:font-medium [&_td]:py-3"
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn
                        id={column.id}
                        allowsSorting={column.sortable}
                      >
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={sessions}>
                    {(item) => (
                      <TableRow id={String(item._id ?? item.sessionId)}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(item, columnKey as unknown as string)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          )}
          {bottomContent}
        </CardBody>
      </Card>
    </div>
  )
}
