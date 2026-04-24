'use client'

import { Button } from '@/components/ui'
import { FormField } from '@/components/FormField'
import { siteConfig } from '@/config/site.config'
import { useEffect, useState } from 'react'
import { useAnalytics } from './AnalyticsTracker'
import Link from 'next/link'

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

type OfferTier = 'tier1' | 'tier2' | 'tier3'

interface TierInfo {
  totalClaimed: number
  currentTier: OfferTier
  currentDiscount: number
  tier1Remaining: number
  tier2Remaining: number
  tier1MaxSpots: number
  tier2MaxSpots: number
}

export default function PreRegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tierInfo, setTierInfo] = useState<TierInfo | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState({ name: false, email: false })
  const { markConversion } = useAnalytics()

  useEffect(() => {
    async function fetchTierInfo() {
      try {
        const res = await fetch('/api/register')
        if (res.ok) {
          const data = await res.json()
          setTierInfo(data)
        }
      } catch {
        setTierInfo({
          totalClaimed: siteConfig.waitlist.initialClaimed,
          currentTier: 'tier1',
          currentDiscount: 50,
          tier1Remaining: 12,
          tier2Remaining: 15,
          tier1MaxSpots: 15,
          tier2MaxSpots: 30,
        })
      }
    }
    fetchTierInfo()
  }, [])

  const currentTier = tierInfo?.currentTier || 'tier1'
  const currentDiscount = tierInfo?.currentDiscount || 50

  const getFormTitle = () => {
    if (currentTier === 'tier3') return 'Join the waitlist'
    return 'Pre-register now'
  }

  const getFormHint = () => {
    if (currentTier === 'tier1') {
      return `Join the waitlist — lock in your ${currentDiscount}% off before spots fill`
    }
    if (currentTier === 'tier2') {
      return `Join the waitlist — ${currentDiscount}% off for early adopters`
    }
    return 'Be the first to know when we launch'
  }

  const getCtaText = () => {
    if (currentTier === 'tier1') return `Pre-register — claim ${currentDiscount}% off`
    if (currentTier === 'tier2') return `Pre-register — get ${currentDiscount}% off`
    return 'Join the waitlist'
  }

  const getSuccessMessage = () => {
    if (currentTier === 'tier3') {
      return "You're on the list! We'll email you when we launch."
    }
    return "You're on the list! We'll email you on launch day with your discount code."
  }

  const getSpotsDisplay = () => {
    if (!tierInfo) return { remaining: 12, total: 15, label: '50% off spots' }

    if (currentTier === 'tier1') {
      return {
        remaining: tierInfo.tier1Remaining,
        total: tierInfo.tier1MaxSpots,
        label: '50% off spots',
      }
    }
    if (currentTier === 'tier2') {
      return {
        remaining: tierInfo.tier2Remaining,
        total: tierInfo.tier2MaxSpots - tierInfo.tier1MaxSpots,
        label: '10% off spots',
      }
    }
    return null
  }

  const spotsData = getSpotsDisplay()
  const fillPct = spotsData
    ? Math.round(((spotsData.total - spotsData.remaining) / spotsData.total) * 100)
    : 0

  async function handleSubmit() {
    setError(null)

    const nameErr = name.trim() === ''
    const emailErr = email.trim() === '' || !email.includes('@')
    setErrors({ name: nameErr, email: emailErr })
    if (nameErr || emailErr) return

    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          device: getDeviceInfo(),
          source: getSourceInfo(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.alreadyRegistered) {
          setError('This email is already registered! Check your inbox for your discount code.')
        } else {
          setError(data.error || 'Something went wrong. Please try again.')
        }
        setLoading(false)
        return
      }

      setTierInfo(prev => prev ? {
        ...prev,
        totalClaimed: data.totalClaimed,
        tier1Remaining: data.tier1Remaining,
        tier2Remaining: data.tier2Remaining,
      } : null)
      setSubmitted(true)
      markConversion()
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-wrap">
      <div className="form-title">{getFormTitle()}</div>
      <div className="form-hint">{getFormHint()}</div>

      {spotsData && (
        <div className="spots-bar-wrap">
          <div className="spots-meta">
            <span>{spotsData.label}</span>
            <span>{spotsData.remaining} of {spotsData.total} remaining</span>
          </div>
          <div className="spots-bar">
            <div
              className="spots-fill"
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>
      )}

      {!submitted ? (
        <div id="form-area">
          {error && (
            <div className="bg-error/10 border border-error/30 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 mb-3 text-xs sm:text-sm text-error text-center">
              {error}
            </div>
          )}

          {/* ── Name + Email via shared FormField ── */}
          <div className="input-row">
            <FormField
              id="pr-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((err) => ({ ...err, name: false }))
                if (error) setError(null)
              }}
              disabled={loading}
              hasError={errors.name}
            />

            <FormField
              id="pr-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((err) => ({ ...err, email: false }))
                if (error) setError(null)
              }}
              disabled={loading}
              hasError={errors.email}
            />
          </div>

          <Button
            variant="primary"
            className="w-full mb-2 text-sm!"
            onClick={handleSubmit}
            disabled={loading}
            isLoading={loading}
          >
            {loading ? 'Submitting...' : <>{getCtaText()} &rarr;</>}
          </Button>

          <Link
            href="/creators-program"
            className="w-full text-primary mt-2! inline-block text-center underline text-xs"
          >
            Content Creator? Join the Creators Program
          </Link>

          <p className="text-[10px] text-slate-400 text-center mt-4 leading-relaxed">
            By registering, you agree to our{' '}
            <Link href="/terms-of-service" className="underline hover:text-primary transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="underline hover:text-primary transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </div>
      ) : (
        <div
          className="success-msg"
          style={{ display: 'block' }}
        >
          {getSuccessMessage()}
        </div>
      )}
    </div>
  )
}