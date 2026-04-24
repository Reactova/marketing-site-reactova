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

    return (
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedCreator(creator)}
          disabled={isProcessing}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>

        {creator.status === 'pending' && (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() => openDecisionDialog(creator._id, 'approved')}
              disabled={isProcessing}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:bg-destructive/10"
              onClick={() => openDecisionDialog(creator._id, 'rejected')}
              disabled={isProcessing}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </>
        )}

        {creator.status === 'approved' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleResendEmail(creator._id)}
            disabled={isProcessing}
          >
            <Mail className="w-4 h-4 mr-1" />
            Resend
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 min-w-0">
      <div className="flex flex-col gap-2 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-primary inline-block w-fit">Creator Approvals</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Approve new creators and manage their onboarding status.</p>
      </div>

      <Card className="border-border bg-card shadow-sm rounded-xl min-w-0 overflow-hidden">
        <CardHeader className="border-b-[var(--border)]/50 bg-muted/20 p-0">
          <div className="flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1 min-w-0">
              <CardTitle className="font-['Outfit'] text-lg sm:text-xl font-bold text-foreground">Applications</CardTitle>
              <CardDescription className="text-muted-foreground text-sm">Review and manage creator program applications.</CardDescription>
            </div>
            <div className="relative w-full min-w-0 sm:max-w-sm lg:w-72 lg:max-w-none shrink-0">
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
        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner className="w-8 h-8" />
            </div>
          ) : creators.length === 0 ? (
            <div className="text-center py-12 text-[var(--muted-foreground)]">
              No applications found matching your search.
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <Table aria-label="Creator approvals table">
              <TableHeader>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold">Creator</TableColumn>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold">Instagram</TableColumn>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold">Status</TableColumn>
                <TableColumn className="text-[var(--muted-foreground)] font-semibold text-right">Actions</TableColumn>
              </TableHeader>
              <TableBody items={creators}>
                {(creator) => (
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
                )}
              </TableBody>
            </Table>
            </div>
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
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-lg sm:max-w-lg">
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
          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedAction(null)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              variant={selectedAction?.status === 'rejected' ? 'ghost' : 'primary'}
              className={`w-full sm:w-auto ${selectedAction?.status === 'rejected' ? 'text-destructive hover:bg-destructive/10' : ''}`}
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
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-2xl sm:max-w-2xl max-h-[90dvh] overflow-y-auto">
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
          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedCreator(null)} className="w-full sm:w-auto">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
