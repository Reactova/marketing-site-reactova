'use client'

import { useEffect, useState, useCallback, type ChangeEvent } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
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
} from '@/components/ui'
import {
  CheckCircle,
  XCircle,
  Mail,
  Search,
  ExternalLink,
  RefreshCw,
  Clock
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
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-[var(--border)]">
                  <TableHead className="text-[var(--muted-foreground)] font-semibold">Creator</TableHead>
                  <TableHead className="text-[var(--muted-foreground)] font-semibold">Instagram</TableHead>
                  <TableHead className="text-[var(--muted-foreground)] font-semibold">Status</TableHead>
                  <TableHead className="text-right text-[var(--muted-foreground)] font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creators.map((creator) => (
                  <TableRow key={creator._id} className="border-b-[var(--border)]/50">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{creator.name}</span>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {creator.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => openDecisionDialog(creator._id, 'approved')}
                              disabled={processingId === creator._id}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => openDecisionDialog(creator._id, 'rejected')}
                              disabled={processingId === creator._id}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {creator.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleResendEmail(creator._id)}
                            disabled={processingId === creator._id}
                          >
                            <Mail className="w-3 h-3 mr-2" /> Resend Email
                          </Button>
                        )}
                      </div>
                    </TableCell>
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
    </div>
  )
}
