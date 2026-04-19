import Link from 'next/link'
import { siteConfig } from '@/config/site.config'

interface NavbarProps {
  ctaHref?: string
  ctaLabel?: string
  ctaVariant?: 'primary' | 'ghost'
}

export default function Navbar({
  ctaHref = '/creators-program',
  ctaLabel = 'Apply as Creator →',
  ctaVariant = 'primary',
}: NavbarProps) {
  const { brand } = siteConfig
  return (
    <nav className="site-nav">
      <div className="site-nav-inner container">
        {/* Logo — CSS only, no SVG to avoid HeroUI conflicts */}
        <Link href="/" className="nav-logo">
          <div
            className="nav-logo-icon"
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #06B6D4 0%, #6366F1 100%)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(6,182,212,0.35)',
              flexShrink: 0,
              fontSize: 14,
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            R
          </div>
          <span className="nav-logo-wordmark">{brand.name}</span>
        </Link>

        {/* Right CTA */}
        <Link
          href={ctaHref}
          className={ctaVariant === 'primary' ? 'nav-cta-btn' : 'nav-cta-ghost'}
        >
          {ctaLabel}
        </Link>
      </div>
    </nav>
  )
}
