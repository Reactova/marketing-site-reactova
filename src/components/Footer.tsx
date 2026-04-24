'use client'
import Link from 'next/link'
import { siteConfig } from '@/config/site.config'
import Logo from '@/lib/logo'

export default function Footer() {
  const { brand } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer-v2">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo variant='light' />
            </div>
            <p className="footer-tagline">
              The world's most advanced Instagram DM automation for creators and agencies.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-col">
              <h4 className="footer-col-title">Product</h4>
              <ul className="footer-links">
                <li><Link href="/creators-program">Creators Program</Link></li>
                <li><a href="https://instagram.com/reactova" target="_blank" rel="noopener noreferrer">Follow us</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Legal</h4>
              <ul className="footer-links">
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service">Terms of Service</Link></li>
                <li><Link href="/cookie-policy">Cookie Policy</Link></li>
                <li><Link href="/refund-policy">Refund Policy</Link></li>
                <li><Link href="/acceptable-use-policy">Acceptable Use</Link></li>
                <li><Link href="/creators-program-policy">Creators Program Policy</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Support</h4>
              <ul className="footer-links">
                <li><a href="mailto:support@reactova.com">Contact Support</a></li>
                <li><a href="mailto:hi@reactova.com">General Inquiries</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {brand.name}. All rights reserved. Built for the next generation of creators.
          </p>
        </div>
      </div>
    </footer>
  )
}
