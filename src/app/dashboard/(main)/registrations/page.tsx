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
} from '@heroui/react'
import { Card, CardBody, Input, Spinner } from '@/components/ui'
import { Search, Mail, CheckCircle, XCircle, Smartphone, Monitor, Copy, Check } from 'lucide-react'
import type { PreRegistration } from '@/lib/types'

interface RegistrationData extends PreRegistration {
  _id: string
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

const columns = [
  { id: 'spotNumber', label: '#', sortable: true },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'discountCode', label: 'Discount Code', sortable: false },
  { id: 'emailSent', label: 'Email Sent', sortable: true },
  { id: 'device', label: 'Device', sortable: false },
  { id: 'registeredAt', label: 'Registered', sortable: true },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-[var(--border)] transition-colors"
    >
      {copied ? (
        <Check className="w-3 h-3 text-[var(--success)]" />
      ) : (
        <Copy className="w-3 h-3 text-[var(--muted)]" />
      )}
    </button>
  )
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string
    direction: 'ascending' | 'descending'
  }>({ column: 'registeredAt', direction: 'descending' })

  const fetchRegistrations = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
        sortBy: sortDescriptor.column,
        sortOrder: sortDescriptor.direction === 'ascending' ? 'asc' : 'desc',
      })

      const response = await fetch(`/api/dashboard/registrations?${params}`)
      if (response.ok) {
        const data = await response.json()
        setRegistrations(data.data)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, sortDescriptor])

  useEffect(() => {
    fetchRegistrations()
  }, [fetchRegistrations])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }))
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const tableRegistrations = useMemo(
    (): (RegistrationData & { id: string })[] =>
      registrations.map((r) => ({ ...r, id: String(r._id) })),
    [registrations]
  )

  const getTierColor = (spotNumber: number) => {
    if (spotNumber <= 15) return 'success'
    if (spotNumber <= 30) return 'warning'
    return 'default'
  }

  const getTierLabel = (spotNumber: number) => {
    if (spotNumber <= 15) return '50% off'
    if (spotNumber <= 30) return '10% off'
    return 'Early access'
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderCell = useCallback((item: RegistrationData, columnKey: string) => {
    switch (columnKey) {
      case 'spotNumber':
        return (
          <div className="flex items-center gap-2">
            <span className="font-['Outfit'] font-bold text-[var(--text)]">
              {item.spotNumber}
            </span>
            <Chip
              size="sm"
              color={getTierColor(item.spotNumber)}
              variant="soft"
              className="text-xs"
            >
              {getTierLabel(item.spotNumber)}
            </Chip>
          </div>
        )
      case 'name':
        return (
          <span className="text-[var(--text)] font-medium">{item.name}</span>
        )
      case 'email':
        return (
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-[var(--muted)]" />
            <span className="text-[var(--text)]">{item.email}</span>
            <CopyButton text={item.email} />
          </div>
        )
      case 'discountCode':
        return item.discountCode ? (
          <div className="flex items-center gap-2">
            <code className="bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded text-xs font-mono">
              {item.discountCode}
            </code>
            <CopyButton text={item.discountCode} />
          </div>
        ) : (
          <span className="text-[var(--muted)]">-</span>
        )
      case 'emailSent':
        return item.emailSent ? (
          <Tooltip>
            <Tooltip.Trigger>
              <CheckCircle className="w-4 h-4 text-[var(--success)] cursor-help" />
            </Tooltip.Trigger>
            <Tooltip.Content>Email delivered</Tooltip.Content>
          </Tooltip>
        ) : (
          <Tooltip>
            <Tooltip.Trigger>
              <XCircle className="w-4 h-4 text-red-400 cursor-help" />
            </Tooltip.Trigger>
            <Tooltip.Content>Email not sent</Tooltip.Content>
          </Tooltip>
        )
      case 'device':
        return (
          <Tooltip>
            <Tooltip.Trigger>
              <div className="flex items-center gap-1 cursor-help">
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
      case 'registeredAt':
        return (
          <span className="text-sm text-[var(--muted)]">
            {formatDate(item.registeredAt)}
          </span>
        )
      default:
        return null
    }
  }, [])

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-['Outfit'] font-bold text-xl text-[var(--text)]">
          All Pre-Registrations
        </h2>
        <span className="text-sm text-[var(--muted)]">
          {pagination.total} total registrations
        </span>
      </div>
      <Input
        placeholder="Search by name, email, or discount code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={<Search className="w-4 h-4 text-[var(--muted)]" />}
        className="max-w-md text-[var(--text)] bg-[var(--surface)] border-[var(--border)]"

      />
    </div>
  ), [search, pagination.total])

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
          ) : registrations.length === 0 ? (
            <div className="text-center py-8 text-[var(--muted)]">
              No registrations found
            </div>
          ) : (
            <Table className="bg-transparent shadow-none">
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Pre-registrations table"
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
                  <TableBody items={tableRegistrations}>
                    {(item) => (
                      <TableRow id={item.id}>
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
