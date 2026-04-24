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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Textarea,
  Spinner,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from '@heroui/react'
import {
  Search,
  Smartphone,
  Monitor,
  ExternalLink,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Users,
} from 'lucide-react'
import type { CreatorApplication, ApplicationStatus, FollowerRange, ContentNiche } from '@/lib/types'

interface CreatorData extends CreatorApplication {
  _id: string
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

const columns = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'instagram', label: 'Instagram', sortable: false },
  { id: 'followers', label: 'Followers', sortable: true },
  { id: 'niche', label: 'Niche', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'device', label: 'Device', sortable: false },
  { id: 'appliedAt', label: 'Applied', sortable: true },
  { id: 'actions', label: 'Actions', sortable: false },
]

const statusOptions = [
  { key: '', label: 'All Status' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'waitlisted', label: 'Waitlisted' },
]

const followerRangeLabels: Record<FollowerRange, string> = {
  'under5k': '< 5K',
  '5k-10k': '5K-10K',
  '10k-50k': '10K-50K',
  '50k-100k': '50K-100K',
  '100k+': '100K+',
}

const nicheLabels: Record<ContentNiche, string> = {
  fitness: 'Fitness',
  business: 'Business',
  marketing: 'Marketing',
  education: 'Education',
  tech: 'Tech',
  lifestyle: 'Lifestyle',
  fashion: 'Fashion',
  food: 'Food',
  travel: 'Travel',
  other: 'Other',
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<CreatorData[]>([])
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string
    direction: 'ascending' | 'descending'
  }>({ column: 'appliedAt', direction: 'descending' })

  const [selectedCreator, setSelectedCreator] = useState<CreatorData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('pending')
  const [reviewNotes, setReviewNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  const fetchCreators = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
        status: statusFilter,
        sortBy: sortDescriptor.column === 'followers' ? 'followerRange' : sortDescriptor.column,
        sortOrder: sortDescriptor.direction === 'ascending' ? 'asc' : 'desc',
      })

      const response = await fetch(`/api/dashboard/creators?${params}`)
      if (response.ok) {
        const data = await response.json()
        setCreators(data.data)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch creators:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, statusFilter, sortDescriptor])

  useEffect(() => {
    fetchCreators()
  }, [fetchCreators])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }))
    }, 300)
    return () => clearTimeout(timer)
  }, [search, statusFilter])

  const tableCreators = useMemo(
    (): (CreatorData & { id: string })[] =>
      creators.map((c) => ({ ...c, id: String(c._id) })),
    [creators]
  )

  const handleStatusUpdate = async () => {
    if (!selectedCreator) return

    setUpdating(true)
    try {
      const response = await fetch('/api/dashboard/creators', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedCreator._id,
          status: newStatus,
          reviewNotes,
          decisionReason: reviewNotes,
        }),
      })

      if (response.ok) {
        fetchCreators()
        setIsModalOpen(false)
        setSelectedCreator(null)
        setReviewNotes('')
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setUpdating(false)
    }
  }

  const openUpdateModal = (creator: CreatorData) => {
    setSelectedCreator(creator)
    setNewStatus(creator.status)
    setReviewNotes(creator.reviewNotes || '')
    setIsModalOpen(true)
  }

  const getStatusVariant = (status: ApplicationStatus): "success" | "destructive" | "warning" | "default" | "info" => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'destructive'
      case 'waitlisted':
        return 'info'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />
      case 'approved':
        return <CheckCircle className="w-3 h-3" />
      case 'rejected':
        return <XCircle className="w-3 h-3" />
      case 'waitlisted':
        return <Users className="w-3 h-3" />
      default:
        return null
    }
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const renderCell = useCallback((item: CreatorData, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div>
            <span className="text-[var(--foreground)] font-medium">{item.name}</span>
            {item.asksForComments && (
              <Badge variant="outline" className="ml-2 text-[10px]">
                Asks for comments
              </Badge>
            )}
          </div>
        )
      case 'email':
        return <span className="text-[var(--foreground)]">{item.email}</span>
      case 'instagram':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <a
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              @{item.instagramUsername}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )
      case 'followers':
        return (
          <Badge variant="secondary">
            {followerRangeLabels[item.followerRange]}
          </Badge>
        )
      case 'niche':
        return (
          <span className="text-[var(--muted-foreground)]">
            {nicheLabels[item.contentNiche]}
            {item.otherNiche && ` (${item.otherNiche})`}
          </span>
        )
      case 'status':
        return (
          <Badge
            variant={getStatusVariant(item.status)}
          >
            <span className="flex items-center gap-1">
              {getStatusIcon(item.status)}
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </Badge>
        )
      case 'device':
        return (
          <Tooltip>
            <Tooltip.Trigger>
              <div className="flex items-center gap-1 cursor-help">
                {item.device.isMobile ? (
                  <Smartphone className="w-4 h-4 text-[var(--muted-foreground)]" />
                ) : (
                  <Monitor className="w-4 h-4 text-[var(--muted-foreground)]" />
                )}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>{`${item.device.platform} - ${item.device.screenWidth}x${item.device.screenHeight}`}</Tooltip.Content>
          </Tooltip>
        )
      case 'appliedAt':
        return (
          <span className="text-sm text-[var(--muted-foreground)]">
            {formatDate(item.appliedAt)}
          </span>
        )
      case 'actions':
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button size="icon" variant="ghost">
                <MoreVertical className="w-4 h-4 text-slate-500" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownItem key="view" onClick={() => openUpdateModal(item)}>
                Review Application
              </DropdownItem>
              <DropdownItem
                key="instagram"
                onClick={() => window.open(item.instagramUrl, '_blank')}
              >
                View Instagram
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      default:
        return null
    }
  }, [])

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        <InputGroup className="max-w-xs">
          <InputGroupInput
            placeholder="Search by name, email, or username..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <InputGroupAddon align="inline-start">
            <Search className="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
        <Select
          value={statusFilter === '' ? '__all__' : statusFilter}
          onValueChange={(v) => setStatusFilter(v === '__all__' ? '' : v)}
        >
          <SelectTrigger className="h-10 w-[min(100%,220px)] max-w-xs bg-background">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem
                key={option.key || '__all__'}
                value={option.key === '' ? '__all__' : option.key}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ), [search, statusFilter])

  const bottomContent = useMemo(() => {
    const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
    const currentPage = pagination.page

    return (
      <div className="flex justify-center py-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                isDisabled={currentPage <= 1}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              />
            </PaginationItem>
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => setPagination(prev => ({ ...prev, page }))}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                isDisabled={currentPage >= pagination.totalPages}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  }, [pagination.page, pagination.totalPages])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-['Outfit'] text-primary inline-block w-fit">Creator Applications</h1>
        <p className="text-muted-foreground">Manage and review all incoming applications for the Creators Program.</p>
      </div>

      <Card className="border-border bg-card shadow-sm rounded-xl">
        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="font-['Outfit'] text-xl font-bold text-foreground">Applications</CardTitle>
              <CardContent className="text-muted-foreground">Total of {pagination.total} applications.</CardContent>
            </div>
            {topContent}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : creators.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
              <p className="text-lg font-medium text-foreground">No applications found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column.id}>{column.label}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableCreators.map((item) => (
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

      <Dialog 
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open)
          if (!open) {
            setSelectedCreator(null)
            setReviewNotes('')
          }
        }}
      > 
          <DialogContent className="max-w-2xl gap-0 overflow-hidden p-6! rounded-xl!">
            <DialogHeader className="border-b border-border px-6! py-4! text-left rounded-t-xl!">
              <DialogTitle className="font-['Outfit'] text-lg font-bold text-foreground p-4! rounded-t-xl!">
                Review Application
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[min(70vh,560px)] overflow-y-auto px-6 py-6 rounded-b-xl!">
              {selectedCreator && (
                <div className="space-y-6 text-foreground">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{selectedCreator.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{selectedCreator.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <a
                        href={selectedCreator.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @{selectedCreator.instagramUsername}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Followers</p>
                      <p>{followerRangeLabels[selectedCreator.followerRange]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Niche</p>
                      <p>
                        {nicheLabels[selectedCreator.contentNiche]}
                        {selectedCreator.otherNiche && ` (${selectedCreator.otherNiche})`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Asks for Comments</p>
                      <p>{selectedCreator.asksForComments ? 'Yes' : 'No'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">Why they want to join</p>
                    <p className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                      {selectedCreator.whyJoin || '—'}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-border pt-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Status
                    </span>
                    <Select
                      value={newStatus}
                      onValueChange={(v) => setNewStatus(v as ApplicationStatus)}
                    >
                      <SelectTrigger className="h-10 w-full bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="waitlisted">Waitlisted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Review Notes (also sent in decision email)
                    </span>
                    <Textarea
                      placeholder="Add notes about this application..."
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="border-t border-border px-6! py-4! sm:justify-end sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleStatusUpdate}
                isLoading={updating}
              >
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        
      </Dialog>
    </div >
  )
}
