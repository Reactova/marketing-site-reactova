import { siteConfig } from '@/config/site.config'

export default function TrustBadges() {
  const { trustBadges } = siteConfig

  return (
    <div className="footer-row">
      {trustBadges.map((badge, i) => (
        <span key={i} className="contents">
          <div className="footer-item">
            {badge.icon === 'star' && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1L7.5 4.5H11L8.5 6.8L9.5 10.5L6 8.2L2.5 10.5L3.5 6.8L1 4.5H4.5L6 1Z"
                  fill="#22C55E"
                />
              </svg>
            )}
            {badge.icon === 'lock' && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="4" width="10" height="7" rx="1.5" stroke="#6B6B80" strokeWidth="0.8" />
                <path d="M4 4V3a2 2 0 0 1 4 0v1" stroke="#6B6B80" strokeWidth="0.8" />
              </svg>
            )}
            {badge.text}
          </div>
          {i < trustBadges.length - 1 && <div className="footer-dot" />}
        </span>
      ))}
    </div>
  )
}
