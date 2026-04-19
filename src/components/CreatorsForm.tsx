'use client'

import { useState } from 'react'
import { useAnalytics } from './AnalyticsTracker'
import { FollowerRange, ContentNiche } from '@/lib/types'
import { Input, Label, Textarea, Checkbox } from '@/components/ui'

const FOLLOWER_OPTIONS: { value: FollowerRange; label: string }[] = [
  { value: 'under5k', label: 'Under 5K' },
  { value: '5k-10k', label: '5K - 10K' },
  { value: '10k-50k', label: '10K - 50K' },
  { value: '50k-100k', label: '50K - 100K' },
  { value: '100k+', label: '100K+' },
]

const NICHE_OPTIONS: { value: ContentNiche; label: string }[] = [
  { value: 'fitness', label: 'Fitness & Health' },
  { value: 'business', label: 'Business & Entrepreneurship' },
  { value: 'marketing', label: 'Marketing & Growth' },
  { value: 'education', label: 'Education & Coaching' },
  { value: 'tech', label: 'Tech & Software' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'fashion', label: 'Fashion & Beauty' },
  { value: 'food', label: 'Food & Cooking' },
  { value: 'travel', label: 'Travel' },
  { value: 'other', label: 'Other' },
]

function getDeviceInfo() {
  if (typeof window === 'undefined') return {}
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    isMobile,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

function getSourceInfo() {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  return {
    referrer: document.referrer || null,
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
  }
}

export default function CreatorsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagramUsername: '',
    instagramUrl: '',
    followerRange: '' as FollowerRange | '',
    contentNiche: '' as ContentNiche | '',
    otherNiche: '',
    asksForComments: false,
    whyJoin: '',
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const { markConversion } = useAnalytics()

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: false }))
    }
    if (error) setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const errors: Record<string, boolean> = {}
    if (!formData.name.trim()) errors.name = true
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = true
    if (!formData.instagramUsername.trim()) errors.instagramUsername = true
    if (!formData.followerRange) errors.followerRange = true
    if (!formData.contentNiche) errors.contentNiche = true
    if (formData.contentNiche === 'other' && !formData.otherNiche.trim()) errors.otherNiche = true

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          device: getDeviceInfo(),
          source: getSourceInfo(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.alreadyApplied) {
          setError('You have already applied to the Creators Program!')
        } else {
          setError(data.error || 'Something went wrong. Please try again.')
        }
        setLoading(false)
        return
      }

      setSubmitted(true)
      markConversion()
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="creators-form-wrap">
        <div className="creators-success">
          <div className="creators-success-icon">🎉</div>
          <h3 className="creators-success-title">Application Submitted!</h3>
          <p className="creators-success-text">
            Thanks for applying to the Creators Program! We&apos;ve sent a confirmation email to <strong>{formData.email}</strong>.
          </p>
          <p className="creators-success-text">
            Our team will review your application within 48-72 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="creators-form-wrap">
      <form onSubmit={handleSubmit} className="creators-form">
        {error && (
          <div className="creators-error">
            {error}
          </div>
        )}

        <div className="creators-form-section space-y-4">
          <h3 className="creators-form-section-title">Your Details</h3>
          
          <div className="creators-input-group">
            <Label required>Full Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              isDisabled={loading}
              hasError={fieldErrors.name}
            />
          </div>

          <div className="creators-input-group">
            <Label required>Email Address</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              isDisabled={loading}
              hasError={fieldErrors.email}
            />
          </div>
        </div>

        <div className="creators-form-section">
          <h3 className="creators-form-section-title">Instagram Profile</h3>
          
          <div className="creators-input-group">
            <Label required>Instagram Username</Label>
            <Input
              type="text"
              placeholder="yourusername"
              value={formData.instagramUsername}
              onChange={(e) => updateField('instagramUsername', e.target.value.replace(/^@/, ''))}
              isDisabled={loading}
              hasError={fieldErrors.instagramUsername}
              startContent="@"
              startContentClassName="border-r border-gray-500 !pr-2"
            />
          </div>

          <div className="creators-input-group">
            <Label required>Follower Count</Label>
            <div className="creators-select-grid !gap-1">
              {FOLLOWER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`creators-select-option ${formData.followerRange === option.value ? 'active' : ''}`}
                  onClick={() => updateField('followerRange', option.value)}
                  disabled={loading}
                  style={{ borderColor: fieldErrors.followerRange ? 'rgba(239,68,68,0.6)' : undefined }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="creators-input-group">
            <Label required>Content Niche</Label>
            <div className="creators-select-grid creators-select-grid-3 !gap-1">
              {NICHE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`creators-select-option ${formData.contentNiche === option.value ? 'active' : ''}`}
                  onClick={() => updateField('contentNiche', option.value)}
                  disabled={loading}
                  style={{ borderColor: fieldErrors.contentNiche ? 'rgba(239,68,68,0.6)' : undefined }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {formData.contentNiche === 'other' && (
              <div className="mt-2.5">
                <Input
                  type="text"
                  placeholder="Specify your niche"
                  value={formData.otherNiche}
                  onChange={(e) => updateField('otherNiche', e.target.value)}
                  isDisabled={loading}
                  hasError={fieldErrors.otherNiche}
                />
              </div>
            )}
          </div>

          <div className="creators-input-group">
            <Checkbox
              isSelected={formData.asksForComments}
              onValueChange={(checked) => updateField('asksForComments', checked)}
              isDisabled={loading}
            >
              I currently ask my followers to comment for links/guides
            </Checkbox>
          </div>
        </div>

        <div className="creators-form-section">
          <h3 className="creators-form-section-title">Why You?</h3>
          
          <div className="creators-input-group">
            <Label>Why do you want to join the Creators Program? (Optional)</Label>
            <Textarea
              placeholder="Tell us a bit about your content and how you'd use Reactova..."
              value={formData.whyJoin}
              onChange={(e) => updateField('whyJoin', e.target.value)}
              isDisabled={loading}
              minRows={4}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="cta-btn creators-submit-btn"
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
        >
          {loading ? 'Submitting...' : 'Apply to Creators Program →'}
        </button>

        <p className="creators-form-footer">
          By applying, you agree to maintain an active presence and meet the minimum requirements if accepted.
        </p>
      </form>
    </div>
  )
}
