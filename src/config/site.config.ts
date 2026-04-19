export const siteConfig = {
  brand: {
    name: 'Reactova',
    tagline: 'Instagram DMs, fully automated',
    description:
      'Turn every comment into a conversion. Reactova sends intelligent, human-like DMs the moment someone engages — so you never miss a lead.',
  },

  launch: {
    date: new Date(process.env.NEXT_PUBLIC_LAUNCH_DATE || '2026-06-01T00:00:00'),
    badgeText: 'Launching June 1, 2026',
  },

  offers: {
    tier1: {
      maxSpots: 15,
      discount: 50,
      headline: '50% off your first purchase',
      description: 'Exclusive to the first 15 pre-registrations only',
    },
    tier2: {
      maxSpots: 30,
      discount: 10,
      headline: '10% off your first purchase',
      description: 'Exclusive early access discount',
    },
    tier3: {
      discount: 0,
      headline: 'Early access',
      description: 'Be the first to know when we launch',
    },
  },

  waitlist: {
    totalSpots: 15,
    initialClaimed: 3,
    formTitle: 'Pre-register now',
    formHint: 'Join the waitlist — lock in your 50% off before spots fill',
    ctaText: 'Pre-register — claim 50% off',
    successMessage:
      "You're on the list! We'll email you on launch day with your discount code.",
  },

  trustBadges: [
    { icon: 'star', text: 'No credit card required' },
    { icon: 'lock', text: 'No spam, ever' },
    { icon: 'none', text: 'Cancel anytime' },
  ] as const,

  meta: {
    title: 'Reactova — Coming Soon',
    description:
      'Turn every Instagram comment into a conversion. Reactova automates human-like DMs the moment someone engages.',
    ogTitle: 'Reactova — Coming Soon',
    ogDescription: 'Instagram DM automation. Launching June 1st.',
  },
} as const

export type SiteConfig = typeof siteConfig
