import type { Metadata, Viewport } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reactova.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Reactova — Instagram DM Automation',
    template: '%s | Reactova',
  },
  description:
    'Turn every Instagram comment into a conversion. Reactova sends intelligent, human-like DMs the moment someone engages — so you never miss a lead.',
  keywords: [
    'Instagram automation',
    'DM automation',
    'Instagram DMs',
    'social media automation',
    'Instagram marketing',
    'lead generation',
    'Instagram engagement',
    'auto reply',
    'Instagram bot',
    'comment to DM',
  ],
  authors: [{ name: 'Reactova' }],
  creator: 'Reactova',
  publisher: 'Reactova',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Reactova',
    title: 'Reactova — Instagram DM Automation',
    description:
      'Turn every Instagram comment into a conversion. Automate human-like DMs the moment someone engages.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reactova — Instagram DM Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reactova — Instagram DM Automation',
    description:
      'Turn every Instagram comment into a conversion. Automate human-like DMs the moment someone engages.',
    images: ['/og-image.png'],
    creator: '@reactova',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F0F1A' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F1A' },
  ],
}

export const comingSoonMetadata: Metadata = {
  title: 'Coming Soon',
  description:
    'Reactova is launching soon. Pre-register now to get exclusive early access and up to 50% off your first purchase.',
  openGraph: {
    title: 'Reactova — Coming Soon',
    description:
      'Pre-register now for exclusive early access and up to 50% off. Instagram DM automation launching soon.',
  },
}

export const creatorsMetadata: Metadata = {
  title: 'Creators Program',
  description:
    'Join the Reactova Creators Program. Get exclusive benefits, early access to features, and grow your Instagram presence with AI-powered DM automation.',
  openGraph: {
    title: 'Reactova Creators Program',
    description:
      'Join the Reactova Creators Program for exclusive benefits and early access to features.',
  },
}
