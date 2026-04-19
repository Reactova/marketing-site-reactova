import { siteConfig } from '@/config/site.config'

interface WelcomeEmailData {
  name: string
  spotNumber: number
  discountCode: string | null
  discount: number
  hasDiscount: boolean
}

export function getWelcomeEmailSubject({ name, discount, hasDiscount }: WelcomeEmailData): string {
  if (hasDiscount) {
    return `🎉 You're in, ${name}! Your ${discount}% off code is inside`
  }
  return `🎉 Welcome aboard, ${name}! You're on the early access list`
}

export function getWelcomeEmailText({ name, spotNumber, discountCode, discount, hasDiscount }: WelcomeEmailData): string {
  const { brand } = siteConfig

  const discountSection = hasDiscount
    ? `YOUR EXCLUSIVE ${discount}% OFF CODE: ${discountCode}`
    : "EARLY ACCESS CONFIRMED - You're on the list!"

  const whatNextText = hasDiscount
    ? `We'll email you on launch day with early access to ${brand.name}. Your ${discount}% discount code above will be automatically applied.`
    : `We'll email you on launch day with early access to ${brand.name}. You'll be among the first to try our Instagram DM automation platform.`

  return `
Welcome to ${brand.name}, ${name}!

You're in! You've secured spot #${spotNumber} on our early access list.

${discountSection}

What is ${brand.name}?
${brand.description}

Features:
- Instant Response: Auto-reply to comments within seconds, 24/7
- AI-Powered Conversations: Human-like DMs that convert leads into customers  
- Smart Analytics: Track engagement, conversions, and optimize your funnel

What happens next?
${whatNextText}

Questions? Reply to this email — we read every message.

© ${new Date().getFullYear()} ${brand.name}
`.trim()
}

export function getWelcomeEmailHtml({ name, spotNumber, discountCode, discount, hasDiscount }: WelcomeEmailData): string {
  const { brand, launch } = siteConfig

  const welcomeBadgeText = hasDiscount 
    ? `✓ YOU'RE IN! ${discount}% OFF SECURED`
    : '✓ EARLY ACCESS CONFIRMED'

  const greetingText = hasDiscount
    ? `You've secured <strong style="color: #7C6AF7;">spot #${spotNumber}</strong> on the ${brand.name} early access list with an exclusive <strong style="color: #F97316;">${discount}% discount</strong>!`
    : `You've secured <strong style="color: #7C6AF7;">spot #${spotNumber}</strong> on the ${brand.name} early access list. You'll be among the first to experience ${brand.name} when we launch!`

  const whatNextText = hasDiscount
    ? `We'll email you on launch day with early access to ${brand.name}. Your ${discount}% discount code above will be automatically applied. Keep an eye on your inbox!`
    : `We'll email you on launch day with early access to ${brand.name}. You'll be among the first to try our Instagram DM automation platform. Keep an eye on your inbox!`

  const discountSection = hasDiscount ? `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%); border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 12px; padding: 24px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #F97316; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
            YOUR EXCLUSIVE ${discount}% OFF CODE
          </p>
          <p style="margin: 0; font-size: 32px; font-weight: 800; color: #F97316; letter-spacing: 0.05em; font-family: monospace;">
            ${discountCode}
          </p>
          <p style="margin: 12px 0 0 0; font-size: 13px; color: #6B6B80;">
            Valid on your first purchase • Launching ${launch.badgeText.replace('Launching ', '')}
          </p>
        </td>
      </tr>
    </table>
  ` : `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="background: linear-gradient(135deg, rgba(124, 106, 247, 0.15) 0%, rgba(124, 106, 247, 0.05) 100%); border: 1px solid rgba(124, 106, 247, 0.3); border-radius: 12px; padding: 24px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #7C6AF7; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
            EARLY ACCESS CONFIRMED
          </p>
          <p style="margin: 0; font-size: 20px; font-weight: 800; color: #7C6AF7;">
            You're on the list! 🎯
          </p>
          <p style="margin: 12px 0 0 0; font-size: 13px; color: #6B6B80;">
            Launching ${launch.badgeText.replace('Launching ', '')}
          </p>
        </td>
      </tr>
    </table>
  `

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${brand.name}!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0F0F1A; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0F0F1A;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="width: 10px; height: 10px; background-color: #7C6AF7; border-radius: 50%;"></td>
                  <td style="padding-left: 10px; font-size: 22px; font-weight: 800; color: #E8E8F0; letter-spacing: -0.02em;">
                    ${brand.name}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color: #1A1A2E; border-radius: 16px; padding: 48px 40px; border: 1px solid #2A2A3E;">
              
              <!-- Welcome Badge -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <span style="display: inline-block; background-color: rgba(34, 197, 94, 0.15); color: #22C55E; font-size: 12px; font-weight: 600; padding: 6px 16px; border-radius: 100px; letter-spacing: 0.05em;">
                      ${welcomeBadgeText}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Greeting -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #E8E8F0; line-height: 1.2;">
                      Welcome aboard, ${name}! 🎉
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <p style="margin: 0; font-size: 16px; color: #6B6B80; line-height: 1.6;">
                      ${greetingText}
                    </p>
                  </td>
                </tr>
              </table>

              ${discountSection}

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 32px 0;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, #2A2A3E, transparent);"></div>
                  </td>
                </tr>
              </table>

              <!-- What is Reactova -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #E8E8F0;">
                      What is ${brand.name}?
                    </h2>
                    <p style="margin: 0 0 20px 0; font-size: 15px; color: #6B6B80; line-height: 1.7;">
                      ${brand.description}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Features -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 24px; vertical-align: top;">
                          <span style="color: #7C6AF7; font-size: 16px;">⚡</span>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="margin: 0; font-size: 14px; color: #E8E8F0; font-weight: 600;">Instant Response</p>
                          <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B6B80;">Auto-reply to comments within seconds, 24/7</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 24px; vertical-align: top;">
                          <span style="color: #7C6AF7; font-size: 16px;">🤖</span>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="margin: 0; font-size: 14px; color: #E8E8F0; font-weight: 600;">AI-Powered Conversations</p>
                          <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B6B80;">Human-like DMs that convert leads into customers</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 24px; vertical-align: top;">
                          <span style="color: #7C6AF7; font-size: 16px;">📊</span>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="margin: 0; font-size: 14px; color: #E8E8F0; font-weight: 600;">Smart Analytics</p>
                          <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B6B80;">Track engagement, conversions, and optimize your funnel</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 24px 0;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, #2A2A3E, transparent);"></div>
                  </td>
                </tr>
              </table>

              <!-- What's Next -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #E8E8F0;">
                      What happens next?
                    </h2>
                    <p style="margin: 0; font-size: 14px; color: #6B6B80; line-height: 1.7;">
                      ${whatNextText}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 32px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #6B6B80;">
                Questions? Reply to this email — we read every message.
              </p>
              <p style="margin: 0; font-size: 12px; color: #4A4A5A;">
                © ${new Date().getFullYear()} ${brand.name}. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim()
}
