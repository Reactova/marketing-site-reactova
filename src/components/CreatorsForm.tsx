'use client'

import { useState } from 'react'
import { useAnalytics } from './AnalyticsTracker'
import { FollowerRange, ContentNiche } from '@/lib/types'
import { Input, Label, Textarea, Checkbox, Button, Badge } from '@/components/ui'

const FOLLOWER_OPTIONS: { value: FollowerRange; label: string }[] = [
  { value: 'under5k', label: 'Under 5K' },
  { value: '5k-10k', label: '5K - 10K' },
  { value: '10k-50k', label: '10K - 50K' },
  { value: '50k-100k', label: '50K - 100K' },
  { value: '100k+', label: '100K+' },
]

const NICHE_OPTIONS: { value: ContentNiche; label: string }[] = [
  { value: 'fitness', label: 'Fitness' },
  { value: 'business', label: 'Business' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'education', label: 'Education' },
  { value: 'tech', label: 'Tech' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'food', label: 'Food' },
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
      <div className="w-full max-w-2xl animate-fade-up">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/95 to-[#141424]/98 border border-success/20 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent pointer-events-none" />
          
          <div className="relative w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
            <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="relative font-syne text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Application Submitted!
          </h3>
          <p className="relative text-[#a0a0b8] text-base leading-relaxed mb-2">
            Thanks for applying to the Creators Program! We&apos;ve sent a confirmation email to{' '}
            <strong className="text-primary font-semibold">{formData.email}</strong>.
          </p>
          <p className="relative text-[#a0a0b8] text-base leading-relaxed">
            Our team will review your application within 48-72 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl animate-fade-up [animation-delay:500ms]">
      <form 
        onSubmit={handleSubmit} 
        className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/95 to-[#141424]/98 border border-primary/15 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        {error && (
          <div className="relative mb-6 px-4 py-3 rounded-xl bg-error/10 border border-error/30 text-[#ff6b6b] text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Section: Your Details */}
        <div className="relative mb-8">
          <h3 className="flex items-center gap-3 font-syne text-sm font-bold text-primary tracking-wider uppercase mb-5">
            <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Your Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label required>Full Name</Label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                disabled={loading}
                hasError={fieldErrors.name}
              />
            </div>

            <div>
              <Label required>Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                disabled={loading}
                hasError={fieldErrors.email}
              />
            </div>
          </div>
        </div>

        {/* Section: Instagram Profile */}
        <div className="relative mb-8">
          <h3 className="flex items-center gap-3 font-syne text-sm font-bold text-primary tracking-wider uppercase mb-5">
            <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Instagram Profile
          </h3>
          
          <div className="space-y-5">
            <div>
              <Label required>Instagram Username</Label>
              <Input
                type="text"
                placeholder="yourusername"
                value={formData.instagramUsername}
                onChange={(e) => updateField('instagramUsername', e.target.value.replace(/^@/, ''))}
                disabled={loading}
                hasError={fieldErrors.instagramUsername}
                startContent="@"
                startContentClassName="border-r border-primary/30 !pr-2"
              />
            </div>

            <div>
              <Label required>Follower Count</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {FOLLOWER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200
                      ${formData.followerRange === option.value 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-[#0F0F1A]/80 border-[#3C3C50]/50 text-[#8888a0] hover:border-primary/50 hover:text-[#E8E8F0] hover:bg-primary/5'
                      }
                      border
                      ${fieldErrors.followerRange && !formData.followerRange ? 'border-error/60' : ''}
                    `}
                    onClick={() => updateField('followerRange', option.value)}
                    disabled={loading}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label required>Content Niche</Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {NICHE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200
                      ${formData.contentNiche === option.value 
                        ? 'bg-gradient-to-r from-primary/20 to-primary/10 border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-[#0F0F1A]/80 border-[#3C3C50]/50 text-[#8888a0] hover:border-primary/50 hover:text-[#E8E8F0] hover:bg-primary/5'
                      }
                      border
                      ${fieldErrors.contentNiche && !formData.contentNiche ? 'border-error/60' : ''}
                    `}
                    onClick={() => updateField('contentNiche', option.value)}
                    disabled={loading}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {formData.contentNiche === 'other' && (
                <div className="mt-3">
                  <Input
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

            <div className="pt-1">
              <Checkbox
                isSelected={formData.asksForComments}
                onValueChange={(checked) => updateField('asksForComments', checked)}
                disabled={loading}
              >
                I currently ask my followers to comment for links/guides
              </Checkbox>
            </div>
          </div>
        </div>

        {/* Section: Why You? */}
        <div className="relative mb-8">
          <h3 className="flex items-center gap-3 font-syne text-sm font-bold text-primary tracking-wider uppercase mb-5">
            <span className="w-1 h-5 bg-gradient-to-b from-primary to-accent rounded-full" />
            Why You?
          </h3>
          
          <div>
            <Label>Why do you want to join the Creators Program? (Optional)</Label>
            <Textarea
              placeholder="Tell us a bit about your content and how you'd use Reactova..."
              value={formData.whyJoin}
              onChange={(e) => updateField('whyJoin', e.target.value)}
              disabled={loading}
              rows={4}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          className="w-full py-4"
        >
          {loading ? 'Submitting...' : (
            <span className="flex items-center justify-center gap-2">
              Apply to Creators Program
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          )}
        </Button>

        <p className="relative text-center text-xs text-[#6b6b85] mt-5 leading-relaxed">
          By applying, you agree to maintain an active presence and meet the minimum requirements if accepted.
        </p>
      </form>
    </div>
  )
}
