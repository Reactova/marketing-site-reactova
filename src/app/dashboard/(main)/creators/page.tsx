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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalDialog,
  ModalBackdrop,
  ModalContainer,
  ModalHeader as HeroModalHeader,
  ModalBody as HeroModalBody,
  ModalFooter as HeroModalFooter,
  ModalCloseTrigger,
  Select,
  ListBox,
  useOverlayState,
} from '@heroui/react'
import { Card, CardBody, Input, Button, Textarea, Spinner } from '@/components/ui'
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

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return 'accent'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'danger'
      case 'waitlisted':
        return 'warning'
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
            <span className="text-[var(--text)] font-medium">{item.name}</span>
            {item.asksForComments && (
              <Chip size="sm" variant="soft" color="default" className="ml-2 text-xs">
                Asks for comments
              </Chip>
            )}
          </div>
        )
      case 'email':
        return <span className="text-[var(--text)]">{item.email}</span>
      case 'instagram':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
          <Chip size="sm" variant="soft">
            {followerRangeLabels[item.followerRange]}
          </Chip>
        )
      case 'niche':
        return (
          <span className="text-[var(--muted)]">
            {nicheLabels[item.contentNiche]}
            {item.otherNiche && ` (${item.otherNiche})`}
          </span>
        )
      case 'status':
        return (
          <Chip
            size="sm"
            color={getStatusColor(item.status)}
            variant="soft"
          >
            <span className="flex items-center gap-1">
              {getStatusIcon(item.status)}
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </Chip>
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
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>{`${item.device.platform} - ${item.device.screenWidth}x${item.device.screenHeight}`}</Tooltip.Content>
          </Tooltip>
        )
      case 'appliedAt':
        return (
          <span className="text-sm text-[var(--muted)]">
            {formatDate(item.appliedAt)}
          </span>
        )
      case 'actions':
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="ghost">
                <MoreVertical className="w-4 h-4 text-[var(--muted)]" />
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
      <div className="flex justify-between items-center">
        <h2 className="font-['Syne'] font-bold text-xl text-[var(--text)]">
          Creator Applications
        </h2>
        <span className="text-sm text-[var(--muted)]">
          {pagination.total} total applications
        </span>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search by name, email, or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startContent={<Search className="w-4 h-4 text-[var(--muted)]" />}
          className="max-w-xs"
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter || null}
          onChange={(value) => setStatusFilter(value as string || '')}
          className="max-w-xs"
        >
          <Select.Trigger className="bg-[var(--surface)] border-[var(--border)]">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {statusOptions.map((option) => (
                <ListBox.Item key={option.key} id={option.key}>{option.label}</ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  ), [search, statusFilter, pagination.total])

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
          ) : creators.length === 0 ? (
            <div className="text-center py-8 text-[var(--muted)]">
              No applications found
            </div>
          ) : (
            <Table className="bg-transparent shadow-none">
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Creators table"
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
                  <TableBody items={tableCreators}>
                    {(item) => (
                      <TableRow id={item.id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(item, columnKey as any)}
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

      <Modal
        isOpen={isModalOpen}
        onOpenChange={(open) => !open && setIsModalOpen(false)}
      >
        <ModalBackdrop className="bg-black/60 backdrop-blur-sm" />
        <ModalContainer>
          <ModalDialog className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-2xl">
            <ModalCloseTrigger className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)]" />
            <HeroModalHeader className="border-b border-[var(--border)] px-6 py-4">
              <h3 className="text-[var(--text)] font-['Syne'] font-bold text-lg">
                Review Application
              </h3>
            </HeroModalHeader>
            <HeroModalBody className="px-6 py-6">
            {selectedCreator && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[var(--muted)]">Name</p>
                    <p className="text-[var(--text)] font-medium">{selectedCreator.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted)]">Email</p>
                    <p className="text-[var(--text)]">{selectedCreator.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted)]">Instagram</p>
                    <a
                      href={selectedCreator.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] hover:underline"
                    >
                      @{selectedCreator.instagramUsername}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted)]">Followers</p>
                    <p className="text-[var(--text)]">
                      {followerRangeLabels[selectedCreator.followerRange]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted)]">Niche</p>
                    <p className="text-[var(--text)]">
                      {nicheLabels[selectedCreator.contentNiche]}
                      {selectedCreator.otherNiche && ` (${selectedCreator.otherNiche})`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--muted)]">Asks for Comments</p>
                    <p className="text-[var(--text)]">
                      {selectedCreator.asksForComments ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)] mb-1">Why they want to join</p>
                  <p className="text-[var(--text)] bg-[var(--bg)] p-3 rounded-lg">
                    {selectedCreator.whyJoin}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
                  <Select
                    value={newStatus}
                    onChange={(value) => setNewStatus(value as ApplicationStatus)}
                    className="w-full"
                  >
                    <label className="text-sm text-[var(--muted)] mb-2 block">Status</label>
                    <Select.Trigger className="bg-[var(--bg)] border-[var(--border)]">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="pending">Pending</ListBox.Item>
                        <ListBox.Item id="approved">Approved</ListBox.Item>
                        <ListBox.Item id="rejected">Rejected</ListBox.Item>
                        <ListBox.Item id="waitlisted">Waitlisted</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div>
                  <p className="text-sm text-[var(--muted)] mb-2">Review Notes</p>
                  <Textarea
                    placeholder="Add notes about this application..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                  />
                </div>
              </div>
            )}
            </HeroModalBody>
            <HeroModalFooter className="border-t border-[var(--border)] px-6 py-4 flex justify-end gap-3">
              <Button
                variant="ghost"
                onPress={() => setIsModalOpen(false)}
                className="text-[var(--muted)]"
              >
                Cancel
              </Button>
              <Button
                variant="secondary"
                onPress={handleStatusUpdate}
                isLoading={updating}
              >
                Update Status
              </Button>
            </HeroModalFooter>
          </ModalDialog>
        </ModalContainer>
      </Modal>
    </div>
  )
}
