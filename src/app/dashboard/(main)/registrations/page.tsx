'use client'

import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
} from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Spinner,
} from '@/components/ui'
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
        <Copy className="w-3 h-3 text-[var(--muted-foreground)]" />
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
            <span className="font-['Outfit'] font-bold text-[var(--foreground)]">
              {item.spotNumber}
            </span>
            <Badge
              variant={getTierColor(item.spotNumber) === 'success' ? 'success' : getTierColor(item.spotNumber) === 'warning' ? 'warning' : 'default'}
              className="text-[10px]"
            >
              {getTierLabel(item.spotNumber)}
            </Badge>
          </div>
        )
      case 'name':
        return (
          <span className="text-[var(--foreground)] font-medium">{item.name}</span>
        )
      case 'email':
        return (
          <div className="flex items-start gap-2 min-w-0">
            <Mail className="w-3 h-3 shrink-0 mt-0.5 text-[var(--muted-foreground)]" />
            <span className="text-[var(--foreground)] break-all text-sm min-w-0">{item.email}</span>
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
          <span className="text-[var(--muted-foreground)]">-</span>
        )
      case 'emailSent':
        return item.emailSent ? (
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        ) : (
          <XCircle className="w-4 h-4 text-rose-500" />
        )
      case 'device':
        return (
          <div className="flex items-center gap-1">
            {item.device.isMobile ? (
              <Smartphone className="w-4 h-4 text-slate-400" />
            ) : (
              <Monitor className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-xs text-[var(--muted-foreground)]">
              {item.device.isMobile ? 'Mobile' : 'Desktop'}
            </span>
          </div>
        )
      case 'registeredAt':
        return (
          <span className="text-sm text-[var(--muted-foreground)]">
            {formatDate(item.registeredAt)}
          </span>
        )
      default:
        return null
    }
  }, [])

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
      <div className="flex flex-col gap-2 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-primary inline-block w-fit">Pre-Registrations</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Monitor and manage waitlist signups.</p>
      </div>

      <Card className="border-border bg-card shadow-sm rounded-xl min-w-0 overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/20 p-4 sm:p-6 pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between min-w-0">
            <div className="space-y-1 min-w-0">
              <CardTitle className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground">Waitlist Entries</CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Total of {pagination.total} registrations collected.</CardDescription>
            </div>
            <div className="w-full min-w-0 sm:max-w-sm lg:w-72 lg:max-w-none shrink-0">
              <div className="relative w-full">
                <InputGroup>
                  <InputGroupInput
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                  />
                  <InputGroupAddon align="inline-start">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-16 px-4"> 
              <p className="text-lg font-medium text-foreground">No registrations found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your search query.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column.id}>{column.label}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableRegistrations.map((item) => (
                    <TableRow key={item.id}>
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
