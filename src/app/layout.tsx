import './globals.css'
import { defaultMetadata, viewport } from '@/config/metadata'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { Providers } from './providers'

export const metadata = defaultMetadata
export { viewport }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <AnalyticsTracker />
          {children}
        </Providers>
      </body>
    </html>
  )
}
