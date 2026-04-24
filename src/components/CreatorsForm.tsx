'use client'

import { useState, useEffect } from 'react'
import { useAnalytics } from './AnalyticsTracker'
import { FollowerRange, ContentNiche } from '@/lib/types'
import { Label, Textarea, Checkbox } from '@/components/ui'
import { FormField } from '@/components/FormField'

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
    country: '',
    instagramUsername: '',
    instagramUrl: '',
    followerRange: '' as FollowerRange | '',
    contentNiche: '' as ContentNiche | '',
    otherNiche: '',
    asksForComments: false,
    whyJoin: '',
    termsAndConditions: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null)
  const [spotsCap, setSpotsCap] = useState(50)
  const { markConversion } = useAnalytics()

  useEffect(() => {
    fetch('/api/creators')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.spotsCap === 'number' && data.spotsCap > 0) {
          setSpotsCap(data.spotsCap)
        }
        if (typeof data.spotsRemaining === 'number') {
          setSpotsRemaining(data.spotsRemaining)
        }
      })
      .catch(() => { })
  }, [])

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
    if (!formData.country.trim()) errors.country = true
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
          instagramUrl: `https://instagram.com/${formData.instagramUsername}`,
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

      if (typeof data.spotsCap === 'number' && data.spotsCap > 0) {
        setSpotsCap(data.spotsCap)
      }
      if (typeof data.spotsRemaining === 'number') {
        setSpotsRemaining(Math.max(0, data.spotsRemaining))
        window.dispatchEvent(
          new CustomEvent('creators-spots-remaining', { detail: data.spotsRemaining })
        )
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
            We&apos;ve sent a confirmation to <strong>{formData.email}</strong>. Our team reviews all applications manually and will get back to you within 48–72 hours.
          </p>
          <div className="creators-success-next">
            <p className="creators-success-next-title">While you wait:</p>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="https://instagram.com/reactova"
                target="_blank"
                rel="noopener noreferrer"
                className="creators-success-link"
              >
                → Follow us on Instagram @reactova
              </a>
              <a
                href={`https://instagram.com/${formData.instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="creators-success-link"
              >
                → View your submitted profile
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="creators-form-wrap">
      {/* Spots remaining counter */}
      {spotsRemaining !== null && (
        <div className="creators-spots-counter">
          <span className="creators-spots-dot" />
          {spotsRemaining > 0
            ? `${spotsRemaining} of ${spotsCap} spots remaining`
            : 'All spots have been claimed'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="creators-form">
        {error && (
          <div className="creators-error">
            {error}
          </div>
        )}

        {/* ── Section 1: Your Details ── */}
        <div className="creators-form-section space-y-4!">
          <h3 className="creators-form-section-title">Your Details</h3>

          <FormField
            id="cf-name"
            label="Full Name"
            required
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            disabled={loading}
            hasError={fieldErrors.name}
          />

          <FormField
            id="cf-email"
            label="Email Address"
            required
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            disabled={loading}
            hasError={fieldErrors.email}
          />

          <FormField
            id="cf-country"
            label="Country"
            required
            type="text"
            placeholder="Where are you based? e.g. India, United States"
            value={formData.country}
            onChange={(e) => updateField('country', e.target.value)}
            disabled={loading}
            hasError={fieldErrors.country}
          />
        </div>

        {/* ── Section 2: Instagram Profile ── */}
        <div className="creators-form-section space-y-4!">
          <h3 className="creators-form-section-title">Instagram Profile</h3>

          <FormField
            id="cf-instagram"
            label="Instagram Username"
            required
            type="text"
            placeholder="yourusername"
            value={formData.instagramUsername}
            onChange={(e) => updateField('instagramUsername', e.target.value.replace(/^@/, ''))}
            disabled={loading}
            hasError={fieldErrors.instagramUsername}
            startContent="@"
            startContentClassName="text-muted-foreground px-3!"
            className="px-2.5!"
          />

          <div className="creators-input-group mt-4">
            <Label required>Follower Count</Label>
            <div className="creators-select-grid !gap-1">
              {FOLLOWER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`creators-select-option ${formData.followerRange === option.value ? 'active' : ''}`}
                  onClick={() => updateField('followerRange', option.value)}
                  disabled={loading}
                  style={{ borderColor: fieldErrors.followerRange ? 'rgba(220,38,38,0.6)' : undefined }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="creators-input-group mt-4">
            <Label required>Content Niche</Label>
            <div className="creators-select-grid creators-select-grid-3 !gap-1">
              {NICHE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`creators-select-option ${formData.contentNiche === option.value ? 'active' : ''}`}
                  onClick={() => updateField('contentNiche', option.value)}
                  disabled={loading}
                  style={{ borderColor: fieldErrors.contentNiche ? 'rgba(220,38,38,0.6)' : undefined }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {formData.contentNiche === 'other' && (
              <div className="mt-2.5">
                <FormField
                  id="cf-other-niche"
                  type="text"
                  placeholder="Specify your niche"
                  value={formData.otherNiche}
                  onChange={(e) => updateField('otherNiche', e.target.value)}
                  disabled={loading}
                  hasError={fieldErrors.otherNiche}
                />
              </div>
            )}
          </div>

          <div className="creators-input-group flex items-start gap-2.5 mt-4">
            <Checkbox
              id="asksForComments"
              isSelected={formData.asksForComments}
              onValueChange={(checked) => updateField('asksForComments', checked)}
              disabled={loading}
              size="md"
            />
            <Label
              htmlFor="asksForComments"
              className="mb-0 text-sm leading-relaxed text-[var(--text-2)] font-medium cursor-pointer"
            >
              I already ask followers to comment on posts (e.g. &quot;comment LINK to get the guide&quot;)
            </Label>
          </div>
        </div>

        {/* ── Section 3: Tell Us About Yourself ── */}
        <div className="creators-form-section">
          <h3 className="creators-form-section-title">Tell Us About Yourself</h3>

          <div className="creators-input-group">
            <Label>Why do you want to join the Creators Program? (Optional)</Label>
            <Textarea
              placeholder="Tell us a bit about your content and how you'd use Reactova..."
              value={formData.whyJoin}
              onChange={(e) => updateField('whyJoin', e.target.value)}
              className="p-2!"
              disabled={loading}
              minRows={4}
            />
          </div>
        </div>
        <div className="creators-input-group flex items-start gap-2.5 mt-4">
          <Checkbox
            id="termsAndConditions"
            isSelected={formData.termsAndConditions}
            onValueChange={(checked) => updateField('termsAndConditions', checked)}
            required={true}
            disabled={loading}
            size="md"
          />
          <Label
            htmlFor="termsAndConditions"
            className="mb-0 text-sm leading-relaxed text-[var(--text-2)] font-medium cursor-pointer required:after:content-['*'] required:after:text-red-500 required:after:ml-1"
          >
            I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary!">T&C</a>{" "}
            , <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary!">Privacy Policy</a>{" "}
            and <a href="/creators-policy" target="_blank" rel="noopener noreferrer" className="text-primary!">Creators Policy</a>*{" "} 

          </Label>
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
          All applications are reviewed manually. Accepted creators are notified within 48–72 hours.
        </p>
      </form>
    </div>
  )
}