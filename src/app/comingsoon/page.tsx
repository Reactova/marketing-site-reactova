import Background from '@/components/Background'
import Countdown from '@/components/Countdown'
import PreRegisterForm from '@/components/PreRegisterForm'
import OfferPill from '@/components/OfferPill'
import TrustBadges from '@/components/TrustBadges'
import Navbar from '@/components/Navbar'
import { siteConfig } from '@/config/site.config'

const FEATURES = [
  {
    icon: '💬',
    title: 'Comment → DM Automation',
    description:
      'Someone comments a keyword on your post → Reactova instantly queues a personalized DM. Zero manual work, 30–90s human-like delay.',
    tag: 'Core engine',
  },
  {
    icon: '📊',
    title: 'Full Conversion Analytics',
    description:
      'Track every step: comment → DM → click → sale. Know your best post, keyword, and funnel — not just DM volume.',
    tag: 'Advanced',
  },
  {
    icon: '🔗',
    title: 'Bio Link & Short Links',
    description:
      'A standalone bio link page with per-link click tracking. Every URL in your DMs is a traceable short link.',
    tag: 'Built in',
  },
]

export default function ComingSoonView() {
  const { brand, launch } = siteConfig

  return (
    <>
      <Background />
      <Navbar ctaHref="/creators-program" ctaLabel="Apply as Creator →" ctaVariant="primary" />

      <main className="cs-wrap">
        <div className="container">

          {/* ── HERO — 2-column split ── */}
          <div className="cs-hero">

            {/* LEFT: Copy */}
            <div className="cs-left">
              {/* Badge */}
              <div className="badge" style={{ marginBottom: 28 }}>
                <span className="badge-dot" />
                {launch.badgeText}
              </div>

              {/* Headline */}
              <h1 className="cs-headline">
                Turn every comment
                <br />
                <span className="grad-text">into a paying customer</span>
              </h1>

              {/* Subhead */}
              <p className="cs-subhead">
                {brand.description}
              </p>

              {/* Why pre-register pills */}
              <div className="why-pills">
                <div className="why-pill">
                  <span className="why-pill-icon">⚡</span>
                  Up to 50% off at launch
                </div>
                <div className="why-pill">
                  <span className="why-pill-icon">🔒</span>
                  Lock in founder pricing
                </div>
                <div className="why-pill">
                  <span className="why-pill-icon">🚀</span>
                  Priority early access
                </div>
                <div className="why-pill">
                  <span className="why-pill-icon">🎯</span>
                  First 15 get 50% off
                </div>
              </div>

              {/* Stats */}
              <div className="cs-stats">
                <div className="cs-stat">
                  <span className="cs-stat-num">500+</span>
                  <span className="cs-stat-label">On waitlist</span>
                </div>
                <div className="cs-stat">
                  <span className="cs-stat-num">50%</span>
                  <span className="cs-stat-label">Early discount</span>
                </div>
                <div className="cs-stat">
                  <span className="cs-stat-num">Jun 1</span>
                  <span className="cs-stat-label">Launch date</span>
                </div>
                <div className="cs-stat">
                  <span className="cs-stat-num">$0</span>
                  <span className="cs-stat-label">Card needed</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Form card */}
            <div className="cs-right">
              <div className="glass-card form-card">
                {/* Offer pill */}
                <OfferPill />

                {/* Countdown */}
                <Countdown />

                {/* Pre-register form */}
                <PreRegisterForm />

                {/* Trust badges */}
                <TrustBadges />
              </div>
            </div>
          </div>

          {/* ── FEATURES STRIP ── */}
          <div className="cs-features">
            {FEATURES.map((f, i) => (
              <div key={i} className="cs-feature-card max-md:flex-col">
                <div className="cs-feature-icon">{f.icon}</div>
                <div className="cs-feature-title">{f.title}</div>
                <p className="cs-feature-desc">{f.description}</p>
                <span className="cs-feature-tag">{f.tag} →</span>
              </div>
            ))}
          </div>

        </div>

        {/* Site footer */}
        <div className="container">
          <hr className="section-divider" />
          <footer className="site-footer">
            <p>
              © 2026 {brand.name} · Built for creators &amp; agencies ·{' '}
              <a href="/creators-program">Apply for free Business access →</a>
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
