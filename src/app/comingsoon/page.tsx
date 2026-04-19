import Background from '@/components/Background'
import Countdown from '@/components/Countdown'
import PreRegisterForm from '@/components/PreRegisterForm'
import OfferPill from '@/components/OfferPill'
import TrustBadges from '@/components/TrustBadges'
import { siteConfig } from '@/config/site.config'

export default function ComingSoonView() {
  const { brand, launch } = siteConfig

  return (
    <>
      <Background />

      <div className="page">
        {/* Logo */}
        <div className="logo">
          <span className="logo-dot" />
          {brand.name}
        </div>

        {/* Launch badge */}
        <div className="badge">
          <span className="badge-dot" />
          {launch.badgeText}
        </div>

        {/* Headline */}
        <h1 className="headline flex flex-col items-center">
          <span className="inline-block">Automate your</span>
          <span className="headline-accent">Instagram DMs</span>
        </h1>

        {/* Subheadline */}
        <p className="subhead">
          {brand.description}
        </p>

        {/* Offer pill - dynamic based on tier */}
        <OfferPill />

        {/* Countdown */}
        <Countdown />

        {/* Pre-register form */}
        <PreRegisterForm />

        {/* Footer trust row */}
        <TrustBadges />
      </div>
    </>
  )
}
