'use client'

import { useEffect, useState, useCallback, type ChangeEvent } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Textarea,
  Spinner,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from '@/components/ui'
import {
  CheckCircle,
  XCircle,
  Mail,
  Search,
  ExternalLink,
  RefreshCw,
  Clock,
  Eye,
  MoreVertical,
} from 'lucide-react'
import type { CreatorApplication, ApplicationStatus } from '@/lib/types'

interface CreatorData extends CreatorApplication {
  _id: string
}

export default function ApprovalsPage() {
  const [creators, setCreators] = useState<CreatorData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<{ id: string; status: ApplicationStatus } | null>(null)
  const [decisionReason, setDecisionReason] = useState('')
  const [selectedCreator, setSelectedCreator] = useState<CreatorData | null>(null)

  const fetchCreators = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch only pending or approved creators for this view
      const response = await fetch(`/api/dashboard/creators?limit=100&search=${search}`)
      if (response.ok) {
        const data = await response.json()
        setCreators(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch creators:', error)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchCreators()
  }, [fetchCreators])

  const handleStatusUpdate = async (id: string, status: ApplicationStatus, reason: string) => {
    setProcessingId(id)
    try {
      const response = await fetch('/api/dashboard/creators', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, decisionReason: reason }),
      })

      if (response.ok) {
        fetchCreators()
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setProcessingId(null)
    }
  }

  const openDecisionDialog = (id: string, status: ApplicationStatus) => {
    setSelectedAction({ id, status })
    setDecisionReason('')
  }

  const submitDecision = async () => {
    if (!selectedAction) return
    if (selectedAction.status === 'rejected' && !decisionReason.trim()) {
      alert('Please provide a rejection reason to include in the email.')
      return
    }
    await handleStatusUpdate(selectedAction.id, selectedAction.status, decisionReason)
    setSelectedAction(null)
    setDecisionReason('')
  }

  const handleResendEmail = async (id: string) => {
    setProcessingId(id)
    try {
      const response = await fetch('/api/dashboard/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'resend-email' }),
      })

      if (response.ok) {
        alert('Approval email resent successfully!')
      }
    } catch (error) {
      console.error('Failed to resend email:', error)
      alert('Failed to resend email.')
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>
      case 'approved':
        return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>
      case 'waitlisted':
        return <Badge variant="info"><RefreshCw className="w-3 h-3 mr-1" /> Waitlisted</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const renderActions = (creator: CreatorData) => {
    const isProcessing = processingId === creator._id
    const canShowMenu = creator.status === 'pending' || creator.status === 'approved'

    return (
      <div className="flex items-center justify-end gap-2">
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedCreator(creator)}
              disabled={isProcessing}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>View application details</Tooltip.Content>
        </Tooltip>

        {canShowMenu && (
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="ghost" disabled={isProcessing} className="px-2! min-w-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Creator actions">
              {creator.status === 'pending' ? (
                <DropdownItem
                  key="approve"
                  onClick={() => openDecisionDialog(creator._id, 'approved')}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Approve
                  </span>
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="resend"
                  onClick={() => handleResendEmail(creator._id)}
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Resend approval email
                  </span>
                </DropdownItem>
              )}
              {creator.status === 'pending' && (
                <DropdownItem
                  key="reject"
                  className="text-danger"
                  onClick={() => openDecisionDialog(creator._id, 'rejected')}
                >
                  <span className="flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-['Outfit'] text-primary inline-block w-fit">Creator Approvals</h1>
        <p className="text-muted-foreground">Approve new creators and manage their onboarding status.</p>
      </div>

      <Card className="border-border bg-card shadow-sm rounded-xl">
        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="font-['Outfit'] text-xl font-bold text-foreground">Applications</CardTitle>
              <CardDescription className="text-muted-foreground">Review and manage creator program applications.</CardDescription>
            </div>
            <div className="relative w-72">
              <InputGroup>
                <InputGroupInput
                  type="search"
                  placeholder="Search creators..."
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
        </CardHeader>
        <CardContent className="p-6!">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner className="w-8 h-8" />
            </div>
          ) : creators.length === 0 ? (
            <div className="text-center py-12 text-[var(--muted-foreground)]">
              No applications found matching your search.
            </div>
          ) : (
            <Table aria-label="Creator approvals table">
              <TableHeader>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold">Creator</TableColumn>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold">Instagram</TableColumn>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold">Status</TableColumn>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold text-right">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {creators.map((creator) => (
                  <TableRow key={creator._id} className="border-b-[var(--border)]/50">
                    <TableCell>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setSelectedCreator(creator)}
                          className="font-medium text-left hover:underline text-primary"
                        >
                          {creator.name}
                        </button>
                        <span className="text-xs text-[var(--muted-foreground)]">{creator.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={creator.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        @{creator.instagramUsername}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(creator.status)}
                    </TableCell>
                    <TableCell>{renderActions(creator)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(selectedAction)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAction(null)
            setDecisionReason('')
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedAction?.status === 'approved' ? 'Approve creator request' : 'Reject creator request'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Add a reason to include in the email sent to the creator.
            </p>
            <Textarea
              placeholder={
                selectedAction?.status === 'approved'
                  ? 'Optional note for approval email...'
                  : 'Reason for rejection...'
              }
              value={decisionReason}
              onChange={(e) => setDecisionReason(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAction(null)}>
              Cancel
            </Button>
            <Button
              variant={selectedAction?.status === 'rejected' ? 'ghost' : 'primary'}
              className={selectedAction?.status === 'rejected' ? 'text-destructive hover:bg-destructive/10' : undefined}
              onClick={submitDecision}
              disabled={!selectedAction || processingId === selectedAction.id}
            >
              Confirm {selectedAction?.status === 'approved' ? 'Approval' : 'Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(selectedCreator)}
        onOpenChange={(open) => {
          if (!open) setSelectedCreator(null)
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Creator application details</DialogTitle>
          </DialogHeader>
          {selectedCreator && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Name</p>
                <p className="font-medium">{selectedCreator.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Email</p>
                <p className="font-medium break-all">{selectedCreator.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Instagram username</p>
                <p className="font-medium">@{selectedCreator.instagramUsername}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Instagram URL</p>
                <a
                  href={selectedCreator.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline break-all"
                >
                  {selectedCreator.instagramUrl}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Country</p>
                <p className="font-medium">{selectedCreator.country}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Follower range</p>
                <p className="font-medium">{selectedCreator.followerRange}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Content niche</p>
                <p className="font-medium">
                  {selectedCreator.contentNiche === 'other' && selectedCreator.otherNiche
                    ? `${selectedCreator.contentNiche} (${selectedCreator.otherNiche})`
                    : selectedCreator.contentNiche}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Asks for comments</p>
                <p className="font-medium">{selectedCreator.asksForComments ? 'Yes' : 'No'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground text-xs">Why they want to join</p>
                <p className="font-medium whitespace-pre-wrap">
                  {selectedCreator.whyJoin?.trim() || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Status</p>
                <div className="font-medium">{getStatusBadge(selectedCreator.status)}</div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Applied at</p>
                <p className="font-medium">
                  {selectedCreator.appliedAt ? new Date(selectedCreator.appliedAt).toLocaleString() : 'N/A'}
                </p>
              </div>
              {selectedCreator.reviewedAt && (
                <div>
                  <p className="text-muted-foreground text-xs">Reviewed at</p>
                  <p className="font-medium">{new Date(selectedCreator.reviewedAt).toLocaleString()}</p>
                </div>
              )}
              {selectedCreator.decisionReason && (
                <div className="md:col-span-2">
                  <p className="text-muted-foreground text-xs">Decision reason</p>
                  <p className="font-medium whitespace-pre-wrap">{selectedCreator.decisionReason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCreator(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
