"use client"
import { useEffect, useState } from 'react'
import Background from '@/components/Background'
import CreatorsForm from '@/components/CreatorsForm'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui'
import { siteConfig } from '@/config/site.config'
import Link from 'next/link'

const BENEFITS = [
  {
    icon: '💎',
    title: 'Free Business Plan',
    description:
      'Full, unrestricted access to our $79/mo Business plan — at zero cost. Every feature, every workflow, every integration unlocked.',
    tag: 'Worth $79/month',
  },
  {
    icon: '♾️',
    title: 'Unlimited Automations',
    description:
      'Create unlimited comment-to-DM workflows across all your posts. No caps, no throttling, no limits.',
    tag: 'Unlimited workflows',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description:
      "Full conversion tracking: comment → DM → click → sale. See exactly what's driving your revenue at every step.",
    tag: 'Full attribution',
  },
  {
    icon: '🔗',
    title: 'Smart Link System',
    description:
      'Short branded links with click tracking and UTM attribution built in — every link in your DMs is tracked end-to-end.',
    tag: 'Click-level tracking',
  },
  {
    icon: '👥',
    title: 'Team Members',
    description:
      'Invite your VA, manager, or team to collaborate on your workspace. Full role-based access at no extra cost.',
    tag: 'Up to 5 seats',
  },
  {
    icon: '⚡',
    title: 'Priority Support',
    description:
      'Skip the queue. Direct access to our core team for onboarding, strategy calls, and technical help — whenever you need.',
    tag: 'Direct team access',
  },
]

const QUALIFICATIONS = [
  '5,000 – 100,000 Instagram followers',
  'Engagement rate above 3%',
  'Posts content at least once per week',
  'Business, marketing, fitness or creator niche',
  'Already drives comment engagement on posts',
  'Actively sells products, courses, or services',
]

const REQUIREMENTS = [
  {
    label: 'Volume',
    text: 'Send at least 300 automated DMs per month via Reactova',
  },
  {
    label: 'Activity',
    text: 'Keep at least 2 active automation campaigns running every 30 days',
  },
  {
    label: 'Branding',
    text: 'Keep the "⚡ Powered by @Reactova" tag in your bio link page footer',
  },
]

const HOW_STEPS = [
  {
    num: '1',
    title: 'Apply in 2 Minutes',
    desc: 'Fill out the short form below. Tell us about your profile and how you engage your audience.',
  },
  {
    num: '2',
    title: 'Manual Review',
    desc: 'Our team reviews every application personally. You will hear back within 48–72 hours.',
  },
  {
    num: '3',
    title: 'Start for Free',
    desc: 'Accepted creators get immediate Business plan access — zero cost, full features.',
  },
]

export default function CreatorsView() {
  const { brand } = siteConfig
  const [showFab, setShowFab] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the form section (#apply) is visible, hide the FAB
        setShowFab(!entry.isIntersecting)
      },
      { 
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px' // Trigger slightly before reaching the form
      }
    )

    const target = document.getElementById('apply')
    if (target) observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Background />
      <Navbar
        ctaHref="/comingsoon"
        ctaLabel="← Back to waitlist"
        ctaVariant="ghost"
      />
      
      <div 
        className={`fixed bottom-6 right-6 z-[999] transition-all duration-500 ease-out transform ${
          showFab 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-12 opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <Button
          variant="primary"
          className="cursor-pointer px-8! py-4! shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] rounded-full font-bold"
          onPress={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Apply Now &darr;
        </Button>
      </div>
      <main className="cp-wrap">
        <div className="container">

          {/* ── HERO ── */}
          <section className="cp-hero">
            <div className="badge creators-badge">
              <span className="badge-dot" />
              Creators Program · Only 50 Spots
            </div>

            <h1 className="cp-headline">
              Get <span className="grad-text">Business Plan</span> access
              — completely free
            </h1>

            <p className="cp-subhead">
              We are selecting 50 creators who already drive Instagram engagement
              to use Reactova at zero cost — in exchange for real usage that
              helps us grow organically.
            </p>

            

            <div className="cp-social-proof max-md:flex-col">
              <span className="cp-social-proof-dot" />
              Creators from 10+ countries have already applied —{' '}
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>only a few spots remain</span>
            </div>
          </section>

          {/* ── STATS BAR ── */}
          <div className="cp-stats-bar">
            <div className="cp-stat">
              <span className="cp-stat-num">
                <span className="">50</span>
              </span>
              <span className="cp-stat-label">Total spots available</span>
            </div>
            <div className="cp-stat">
              <span className="cp-stat-num">$79<span style={{ fontSize: 14, fontWeight: 500 }}>/mo</span></span>
              <span className="cp-stat-label">Value — completely free</span>
            </div>
            <div className="cp-stat">
              <span className="cp-stat-num">48h</span>
              <span className="cp-stat-label">Review turnaround</span>
            </div>
            <div className="cp-stat">
              <span className="cp-stat-num">10+</span>
              <span className="cp-stat-label">Countries represented</span>
            </div>
          </div>

          {/* ── HOW IT WORKS ── */}
          <section className="cp-how-wrap">
            <div className="cp-how-header">
              <p className="section-eyebrow">Getting started</p>
              <h2 className="section-title">How It Works</h2>
            </div>
            <div className="cp-how-steps max-w-none!">
              {HOW_STEPS.map((step) => (
                <div key={step.num} className="cp-step max-md:flex-col! max-md:items-center! max-md:text-center!">
                  <div className="cp-step-num">{step.num}</div>
                  <div className="cp-step-title">{step.title}</div>
                  <p className="cp-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── BENEFITS — 3-col grid ── */}
          <section>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <p className="section-eyebrow">What you get</p>
              <h2 className="section-title">Everything Included, No Strings</h2>
              <p className="section-sub" style={{ maxWidth: 480, margin: '8px auto 0' }}>
                Accepted creators get the full Business plan — not a trial, not
                limited access. Every feature, from day one.
              </p>
            </div>
            <div className="cp-benefits">
              {BENEFITS.map((b, i) => (
                <div key={i} className="cp-benefit-card max-md:flex-col">
                  <span className="cp-benefit-icon">{b.icon}</span>
                  <h3 className="cp-benefit-title">{b.title}</h3>
                  <p className="cp-benefit-desc">{b.description}</p>
                  <span className="cp-benefit-tag">{b.tag}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button 
                variant="outline" 
                className="w-auto px-8 py-3 text-sm font-bold rounded-full"
                onPress={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join the program &darr;
              </Button>
            </div>
          </section>

          <hr className="section-divider" />

          {/* ── SPLIT: Who Qualifies + Requirements ── */}
          <section className="cp-split">

            {/* Who Qualifies */}
            <div className="cp-split-card">
              <h3 className="cp-split-title">
                <span className="cp-split-title-icon green">✅</span>
                Who Qualifies
              </h3>
              <ul className="cp-qualifies-list">
                {QUALIFICATIONS.map((q, i) => (
                  <li key={i} className="cp-qualify-item">
                    <span className="cp-qualify-check">✓</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="cp-split-card">
              <h3 className="cp-split-title">
                <span className="cp-split-title-icon violet">📋</span>
                What We Ask in Return
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, lineHeight: 1.6 }}>
                The program is free — but it is not passive. We need creators who actively use the platform.
              </p>
              <ul className="cp-reqs-list">
                {REQUIREMENTS.map((r, i) => (
                  <li key={i} className="cp-req-item">
                    <span className="cp-req-num">{i + 1}</span>
                    <div>
                      <span style={{ color: 'var(--primary-light)', fontWeight: 600, fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>
                        {r.label}
                      </span>
                      <span>
                        {r.text.split('@Reactova').map((part, j, arr) => (
                          <span key={j}>
                            {part}
                            {j < arr.length - 1 && (
                              <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>@{brand.name}</span>
                            )}
                          </span>
                        ))}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* ── APPLICATION FORM ── */}
          <section className="cp-form-wrap" id="apply">
            <div className="glass-card cp-form-card">
              <div className="cp-form-header">
                <h2 className="cp-form-title">Apply to the Creators Program</h2>
                <p className="cp-form-subtitle">
                  Takes under 2 minutes · Reviewed within 48 hours · No credit card needed
                </p>
              </div>
              <CreatorsForm />
            </div>
          </section>

          {/* Footer */}
          <footer className="cp-footer">
            <p>
              Limited to 50 creators in the initial launch phase ·{' '}
              <Link href="/comingsoon" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                Not a creator? Join the regular waitlist →
              </Link>
            </p>
          </footer>

        </div>
      </main>
    </>
  )
}
