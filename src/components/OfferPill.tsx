'use client'

import { useState, useEffect } from 'react'
import { siteConfig } from '@/config/site.config'

type OfferTier = 'tier1' | 'tier2' | 'tier3'

interface TierInfo {
  currentTier: OfferTier
  currentDiscount: number
  tier1Remaining: number
}

export default function OfferPill() {
  const [tierInfo, setTierInfo] = useState<TierInfo | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function fetchTierInfo() {
      try {
        const res = await fetch('/api/register')
        if (res.ok) {
          const data = await res.json()
          setTierInfo(data)
        }
      } catch {
        setTierInfo({
          currentTier: 'tier1',
          currentDiscount: 50,
          tier1Remaining: 12,
        })
      }
    }
    fetchTierInfo()
  }, [])

  const currentTier = tierInfo?.currentTier || 'tier1'
  const { offers } = siteConfig

  const getOfferContent = () => {
    if (currentTier === 'tier1') {
      return {
        headline: offers.tier1.headline,
        description: offers.tier1.description,
        showStar: true,
      }
    }
    if (currentTier === 'tier2') {
      return {
        headline: offers.tier2.headline,
        description: offers.tier2.description,
        showStar: true,
      }
    }
    return {
      headline: offers.tier3.headline,
      description: offers.tier3.description,
      showStar: false,
    }
  }

  const content = getOfferContent()

  if (!mounted) {
    return (
      <div className="offer-pill">
        <div className="offer-icon">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="#F97316"/>
          </svg>
        </div>
        <div className="offer-text-wrap">
          <div className="offer-headline">{offers.tier1.headline}</div>
          <div className="offer-sub">{offers.tier1.description}</div>
        </div>
      </div>
    )
  }

  if (currentTier === 'tier3') {
    return (
      <div className="offer-pill" style={{
        background: 'rgba(124, 106, 247, 0.08)',
        border: '0.5px solid rgba(124, 106, 247, 0.25)',
      }}>
        <div className="offer-icon" style={{ background: 'rgba(124, 106, 247, 0.15)' }}>
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L9.5 6H14L10.5 8.5L11.5 13L8 10.5L4.5 13L5.5 8.5L2 6H6.5L8 2Z" fill="#7C6AF7"/>
          </svg>
        </div>
        <div className="offer-text-wrap">
          <div className="offer-headline" style={{ color: '#7C6AF7' }}>{content.headline}</div>
          <div className="offer-sub">{content.description}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="offer-pill">
      <div className="offer-icon">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="#F97316"/>
        </svg>
      </div>
      <div className="offer-text-wrap">
        <div className="offer-headline">{content.headline}</div>
        <div className="offer-sub">{content.description}</div>
      </div>
    </div>
  )
}
