import './globals.css'
import { defaultMetadata, viewport } from '@/config/metadata'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { Providers } from './providers'
import Footer from '@/components/Footer'

export const metadata = defaultMetadata
export { viewport }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <AnalyticsTracker />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
