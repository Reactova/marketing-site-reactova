import Background from '@/components/Background'
import CreatorsForm from '@/components/CreatorsForm'
import { siteConfig } from '@/config/site.config'

const BENEFITS = [
  {
    icon: '💎',
    title: 'Free Business Plan',
    description: 'Get full access to our $79/mo Business plan at zero cost',
  },
  {
    icon: '🚀',
    title: 'Unlimited Automations',
    description: 'Create unlimited comment-to-DM workflows for your content',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Track conversions, engagement, and optimize your funnel',
  },
  {
    icon: '⚡',
    title: 'Priority Support',
    description: 'Get direct access to our team for any questions or issues',
  },
]

const REQUIREMENTS = [
  'Send at least 300 automated DMs per month',
  'Run at least 2 automation campaigns every 30 days',
  'Keep the "⚡︎ Powered by @Reactova" tag in your automated DM messages',
]

export default function CreatorsView() {
  const { brand } = siteConfig

  return (
    <>
      <Background />

      <div className="page creators-page">
        {/* Logo */}
        <div className="logo">
          <span className="logo-dot" />
          {brand.name}
        </div>

        {/* Badge */}
        <div className="badge creators-badge">
          <span className="badge-dot" />
          Creators Program
        </div>

        {/* Headline */}
        <h1 className="headline creators-headline">
          Get <span className="headline-accent">free access</span>
          <br />to our Business plan
        </h1>

        {/* Subheadline */}
        <p className="subhead">
          Join 50 selected creators who get full platform access at zero cost. 
          Automate your Instagram DMs and convert more followers into customers.
        </p>

        {/* Social proof */}
        <p className="creators-social-proof">
          🌍 Creators from 10+ countries have already applied — spots are filling fast
        </p>

        {/* Benefits Grid */}
        <div className="creators-benefits">
          {BENEFITS.map((benefit, i) => (
            <div key={i} className="creators-benefit-card">
              <div className="creators-benefit-icon">{benefit.icon}</div>
              <h3 className="creators-benefit-title">{benefit.title}</h3>
              <p className="creators-benefit-desc">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="creators-requirements">
          <h3 className="creators-requirements-title !text-xl font-bold !text-left">What we ask in return</h3>
          <ul className="creators-requirements-list">
            {REQUIREMENTS.map((req, i) => (
              <li key={i} className="creators-requirements-item">
                <span className="creators-requirements-check">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Application Form */}
        <CreatorsForm />

        {/* Footer */}
        <div className="creators-footer">
          <p>Limited to 50 creators in the initial launch phase</p>
        </div>
      </div>
    </>
  )
}
