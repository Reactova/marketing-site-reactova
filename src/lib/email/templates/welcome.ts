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
        <td style="background-color: #161625; border: 1px dashed #6366F1; border-radius: 12px; padding: 32px; text-align: center;">
          <p style="margin: 0 0 12px 0; font-size: 12px; color: #818196; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
            YOUR PERSONAL DISCOUNT CODE
          </p>
          <div style="display: inline-block; background-color: #0F0F1A; border: 1px solid #2A2A3E; border-radius: 8px; padding: 12px 24px; margin-bottom: 16px;">
            <span style="font-family: 'Courier New', Courier, monospace; font-size: 28px; font-weight: 800; color: #6366F1; letter-spacing: 0.1em;">${discountCode}</span>
          </div>
          <p style="margin: 0; font-size: 13px; color: #818196;">
            Simply copy and paste this code at checkout.
          </p>
        </td>
      </tr>
    </table>
  ` : `
    <!-- Status Box -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
      <tr>
        <td style="background-color: #161625; border: 1px solid #2A2A3E; border-radius: 12px; padding: 32px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #6366F1; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
            RESERVATION STATUS
          </p>
          <p style="margin: 0; font-size: 22px; font-weight: 800; color: #E8E8F0;">
            You're on the list! 🎯
          </p>
          <p style="margin: 12px 0 0 0; font-size: 13px; color: #818196;">
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
<body style="margin: 0; padding: 0; background-color: #0A0A0F; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0A0A0F;">
    <tr>
      <td align="center" style="padding: 60px 20px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom: 40px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background: linear-gradient(135deg, #06b6d4 0%, #6366f1 100%); width: 32px; height: 32px; border-radius: 8px; text-align: center; vertical-align: middle;">
                    <span style="color: #ffffff; font-size: 14px; font-weight: 800; font-family: sans-serif;">R</span>
                  </td>
                  <td style="padding-left: 12px; font-family: sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                    ${brand.name}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Card -->
          <tr>
            <td style="background-color: #11111A; border: 1px solid #1E1E2E; border-radius: 24px; padding: 56px 48px;">
              
              <!-- Badge -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <span style="display: inline-block; background-color: rgba(99, 102, 241, 0.1); color: #6366F1; font-family: sans-serif; font-size: 11px; font-weight: 700; padding: 8px 16px; border-radius: 100px; letter-spacing: 0.08em; border: 1px solid rgba(99, 102, 241, 0.2);">
                      ${welcomeBadgeText}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Hero Text -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 32px; font-weight: 800; color: #ffffff; line-height: 1.1; letter-spacing: -0.02em;">
                      Welcome aboard, ${name}!
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 8px;">
                    <p style="margin: 0; font-family: sans-serif; font-size: 16px; color: #818196; line-height: 1.6;">
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
                    <div style="height: 1px; background-color: #1E1E2E;"></div>
                  </td>
                </tr>
              </table>

              <!-- Product Info -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-family: sans-serif; font-size: 18px; font-weight: 700; color: #ffffff;">
                      What is ${brand.name}?
                    </h2>
                    <p style="margin: 0 0 32px 0; font-family: sans-serif; font-size: 15px; color: #818196; line-height: 1.7;">
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
                        <td style="width: 40px; height: 40px; background-color: #161625; border-radius: 10px; text-align: center; vertical-align: middle;">
                          <span style="font-size: 18px;">⚡</span>
                        </td>
                        <td style="padding-left: 16px;">
                          <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #ffffff; font-weight: 700;">Instant Response</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 13px; color: #818196;">Auto-reply to comments within seconds</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 40px; height: 40px; background-color: #161625; border-radius: 10px; text-align: center; vertical-align: middle;">
                          <span style="font-size: 18px;">🤖</span>
                        </td>
                        <td style="padding-left: 16px;">
                          <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #ffffff; font-weight: 700;">AI Conversations</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 13px; color: #818196;">Human-like DMs that convert leads</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 40px; height: 40px; background-color: #161625; border-radius: 10px; text-align: center; vertical-align: middle;">
                          <span style="font-size: 18px;">📈</span>
                        </td>
                        <td style="padding-left: 16px;">
                          <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #ffffff; font-weight: 700;">Smart Analytics</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 13px; color: #818196;">Track conversions and optimize funnels</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px; background-color: #161625; border-radius: 16px; padding: 24px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 8px 0; font-family: sans-serif; font-size: 14px; font-weight: 700; color: #ffffff;">What happens next?</h3>
                    <p style="margin: 0; font-family: sans-serif; font-size: 13px; color: #818196; line-height: 1.6;">
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
              <p style="margin: 0 0 12px 0; font-family: sans-serif; font-size: 13px; color: #4A4A5A;">
                Questions? Just reply to this email. We're here to help.
              </p>
              <p style="margin: 0; font-family: sans-serif; font-size: 11px; color: #31313F; text-transform: uppercase; letter-spacing: 0.1em;">
                © ${new Date().getFullYear()} ${brand.name} • Instagram Automation for Creators
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
