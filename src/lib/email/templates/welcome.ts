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
    ? `✓ ${discount}% DISCOUNT SECURED`
    : '✓ EARLY ACCESS CONFIRMED'

  const greetingText = hasDiscount
    ? `You've secured <strong style="color: #6366F1;">spot #${spotNumber}</strong> on our exclusive early access list. As a thank you, we've locked in a <strong style="color: #06B6D4;">${discount}% lifetime discount</strong> for you.`
    : `You've secured <strong style="color: #6366F1;">spot #${spotNumber}</strong> on our early access list. You'll be among the first content creators to experience ${brand.name} when we launch!`

  const whatNextText = hasDiscount
    ? `We'll reach out on launch day with your exclusive invite. Your ${discount}% discount will be automatically linked to your account, or you can use the code below.`
    : `We'll reach out on launch day with your exclusive invite. You'll be among the first to try our AI-powered Instagram automation platform. Keep an eye on your inbox!`

  const discountSection = hasDiscount ? `
    <!-- Coupon Code -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
      <tr>
        <td style="background-color: #F5F3FF; border: 2px dashed #C7D2FE; border-radius: 16px; padding: 32px; text-align: center;">
          <p style="margin: 0 0 12px 0; font-size: 12px; color: #6366F1; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
            YOUR PERSONAL DISCOUNT CODE
          </p>
          <div style="display: inline-block; background-color: #ffffff; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px 32px; margin-bottom: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 800; color: #111827; letter-spacing: 0.15em;">${discountCode}</span>
          </div>
          <p style="margin: 0; font-size: 13px; color: #6B7280;">
            Simply copy and paste this code at checkout.
          </p>
        </td>
      </tr>
    </table>
  ` : `
    <!-- Status Box -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
      <tr>
        <td style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #6366F1; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
            RESERVATION STATUS
          </p>
          <p style="margin: 0; font-size: 24px; font-weight: 800; color: #0F172A;">
            You're on the list! 🎯
          </p>
          <p style="margin: 12px 0 0 0; font-size: 13px; color: #64748B;">
            Estimated Launch: ${launch.badgeText.replace('Launching ', '')}
          </p>
        </td>
      </tr>
    </table>
  `

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Welcome to ${brand.name}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, h1, h2, h3, p, span { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F9FAFB; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F9FAFB;">
    <tr>
      <td align="center" style="padding: 60px 20px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background: linear-gradient(135deg, #06b6d4 0%, #6366f1 100%); width: 36px; height: 36px; border-radius: 10px; text-align: center; vertical-align: middle;">
                    <span style="color: #ffffff; font-size: 16px; font-weight: 800; font-family: sans-serif;">R</span>
                  </td>
                  <td style="padding-left: 12px; font-family: sans-serif; font-size: 22px; font-weight: 800; color: #111827; letter-spacing: -0.02em;">
                    ${brand.name}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Card -->
          <tr>
            <td style="background-color: #ffffff; border: 1px solid #E5E7EB; border-radius: 24px; padding: 60px 48px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02);">
              
              <!-- Badge -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <span style="display: inline-block; background-color: #EEF2FF; color: #6366F1; font-family: sans-serif; font-size: 11px; font-weight: 700; padding: 8px 20px; border-radius: 100px; letter-spacing: 0.08em; border: 1px solid #E0E7FF;">
                      ${welcomeBadgeText}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Hero Text -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 36px; font-weight: 800; color: #111827; line-height: 1.1; letter-spacing: -0.03em;">
                      You're on the list, ${name}! 🎉
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 8px;">
                    <p style="margin: 0; font-family: sans-serif; font-size: 17px; color: #4B5563; line-height: 1.6;">
                      ${greetingText}
                    </p>
                  </td>
                </tr>
              </table>

              ${discountSection}

              <!-- Divider -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 48px 0;">
                    <div style="height: 1px; background-color: #F3F4F6;"></div>
                  </td>
                </tr>
              </table>

              <!-- Product Info -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-family: sans-serif; font-size: 20px; font-weight: 700; color: #111827;">
                      Ready to automate your growth?
                    </h2>
                    <p style="margin: 0 0 32px 0; font-family: sans-serif; font-size: 15px; color: #6B7280; line-height: 1.7;">
                      ${brand.description}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Feature Grid -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 24px;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 44px; height: 44px; background-color: #F0F9FF; border-radius: 12px; text-align: center; vertical-align: middle;">
                          <span style="font-size: 20px;">⚡</span>
                        </td>
                        <td style="padding-left: 20px;">
                          <p style="margin: 0; font-family: sans-serif; font-size: 15px; color: #111827; font-weight: 700;">Instant Response</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 14px; color: #6B7280;">Auto-reply to comments within seconds</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 44px; height: 44px; background-color: #F5F3FF; border-radius: 12px; text-align: center; vertical-align: middle;">
                          <span style="font-size: 20px;">🤖</span>
                        </td>
                        <td style="padding-left: 20px;">
                          <p style="margin: 0; font-family: sans-serif; font-size: 15px; color: #111827; font-weight: 700;">AI Conversations</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 14px; color: #6B7280;">Human-like DMs that convert leads</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 44px; height: 44px; background-color: #F0FDF4; border-radius: 12px; text-align: center; vertical-align: middle;">
                          <span style="font-size: 20px;">📈</span>
                        </td>
                        <td style="padding-left: 20px;">
                          <p style="margin: 0; font-family: sans-serif; font-size: 15px; color: #111827; font-weight: 700;">Smart Analytics</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 14px; color: #6B7280;">Track conversions and optimize funnels</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px; background-color: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 16px; padding: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 8px 0; font-family: sans-serif; font-size: 14px; font-weight: 700; color: #111827;">What's next?</h3>
                    <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #6B7280; line-height: 1.6;">
                      ${whatNextText}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 40px;">
              <p style="margin: 0 0 12px 0; font-family: sans-serif; font-size: 14px; color: #6B7280;">
                Questions? Just reply to this email. We're here to help.
              </p>
              <div style="height: 1px; width: 40px; background-color: #E5E7EB; margin-bottom: 20px;"></div>
              <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em;">
                © ${new Date().getFullYear()} ${brand.name} • Instagram Automation
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
