import { siteConfig } from '@/config/site.config'
import Link from 'next/link'

function Logo({ variant }: { variant?: 'dark' | 'light' }) {
    const { brand } = siteConfig
    return (
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
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                }}
            >
                R
            </div>
            <span className={`nav-logo-wordmark ${variant === 'light' ? 'text-white!' : 'text-black!'}`}>{brand.name}</span>
        </Link>
    )
}

export default Logo