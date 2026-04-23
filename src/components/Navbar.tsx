import { siteConfig } from '@/config/site.config'
import Logo from '@/lib/logo'
import Link from 'next/link'

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
  return (
    <nav className="site-nav">
      <div className="site-nav-inner container">
        {/* Logo — CSS only, no SVG to avoid HeroUI conflicts */}

        <Logo />
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
