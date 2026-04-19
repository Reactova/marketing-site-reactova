import { siteConfig } from '@/config/site.config'

interface CreatorsEmailData {
  name: string
  instagramUsername: string
}

export function getCreatorsEmailSubject({ name }: CreatorsEmailData): string {
  return `🎯 ${name}, your Creators Program application is received!`
}

export function getCreatorsEmailText({ name, instagramUsername }: CreatorsEmailData): string {
  const { brand } = siteConfig

  return `
Welcome to the ${brand.name} Creators Program, ${name}!

We've received your application for @${instagramUsername} and we're excited to review it.

WHAT'S THE CREATORS PROGRAM?

The ${brand.name} Creators Program gives selected influencers and content creators FREE access to our Business plan features — that's a $79/month value at zero cost.

WHAT YOU GET:
- Unlimited comment-to-DM automations
- Advanced analytics & conversion tracking
- DM follow-up sequences
- Priority support
- Full Business plan features

WHAT WE ASK:
- Send at least 300 automated DMs per month
- Run at least 2 automation campaigns every 30 days
- Keep the "Powered by ${brand.name}" footer on your bio link page

WHAT HAPPENS NEXT?

Our team will review your application within 48-72 hours. We look at:
- Your engagement rate and content quality
- Whether you actively ask followers to comment for links
- Your niche alignment with our platform

We'll email you once a decision is made.

Questions? Reply to this email — we read every message.

© ${new Date().getFullYear()} ${brand.name}
`.trim()
}

export function getCreatorsEmailHtml({ name, instagramUsername }: CreatorsEmailData): string {
  const { brand } = siteConfig

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${brand.name} Creators Program!</title>
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
              
              <!-- Application Badge -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <span style="display: inline-block; background-color: rgba(124, 106, 247, 0.15); color: #7C6AF7; font-size: 12px; font-weight: 600; padding: 6px 16px; border-radius: 100px; letter-spacing: 0.05em;">
                      🎯 APPLICATION RECEIVED
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Greeting -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #E8E8F0; line-height: 1.2;">
                      Hey ${name}! 👋
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <p style="margin: 0; font-size: 16px; color: #6B6B80; line-height: 1.6;">
                      We've received your Creators Program application for <strong style="color: #7C6AF7;">@${instagramUsername}</strong> and we're excited to review it!
                    </p>
                  </td>
                </tr>
              </table>

              <!-- What You Get Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background: linear-gradient(135deg, rgba(124, 106, 247, 0.12) 0%, rgba(124, 106, 247, 0.04) 100%); border: 1px solid rgba(124, 106, 247, 0.25); border-radius: 12px; padding: 24px;">
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #7C6AF7; font-weight: 700; letter-spacing: 0.02em;">
                      WHAT YOU GET (IF APPROVED)
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span>
                          <span style="color: #E8E8F0; font-size: 14px;">Full Business plan features ($79/mo value)</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span>
                          <span style="color: #E8E8F0; font-size: 14px;">Unlimited comment-to-DM automations</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span>
                          <span style="color: #E8E8F0; font-size: 14px;">Advanced analytics & conversion tracking</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span>
                          <span style="color: #E8E8F0; font-size: 14px;">DM follow-up sequences</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span>
                          <span style="color: #E8E8F0; font-size: 14px;">Priority support</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px 0;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, #2A2A3E, transparent);"></div>
                  </td>
                </tr>
              </table>

              <!-- Requirements Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.10) 0%, rgba(249, 115, 22, 0.03) 100%); border: 1px solid rgba(249, 115, 22, 0.2); border-radius: 12px; padding: 24px;">
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #F97316; font-weight: 700; letter-spacing: 0.02em;">
                      WHAT WE ASK IN RETURN
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #F97316; margin-right: 8px;">→</span>
                          <span style="color: #E8E8F0; font-size: 14px;">Send at least 300 automated DMs per month</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #F97316; margin-right: 8px;">→</span>
                          <span style="color: #E8E8F0; font-size: 14px;">Run at least 2 automation campaigns every 30 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #F97316; margin-right: 8px;">→</span>
                          <span style="color: #E8E8F0; font-size: 14px;">Keep "Powered by ${brand.name}" on your bio link</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 28px 0;">
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, #2A2A3E, transparent);"></div>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #E8E8F0;">
                      What happens next?
                    </h2>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #6B6B80; line-height: 1.7;">
                      Our team will review your application within <strong style="color: #E8E8F0;">48-72 hours</strong>. We look at your engagement rate, content quality, and whether you actively engage with your audience.
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #6B6B80; line-height: 1.7;">
                      We'll email you once a decision is made. Keep an eye on your inbox!
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Timeline -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                <tr>
                  <td style="background: rgba(30, 30, 46, 0.5); border-radius: 10px; padding: 16px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="33%" align="center" style="padding: 8px;">
                          <p style="margin: 0 0 4px 0; font-size: 20px;">📝</p>
                          <p style="margin: 0; font-size: 11px; color: #22C55E; font-weight: 600;">DONE</p>
                          <p style="margin: 4px 0 0 0; font-size: 12px; color: #6B6B80;">Applied</p>
                        </td>
                        <td width="33%" align="center" style="padding: 8px;">
                          <p style="margin: 0 0 4px 0; font-size: 20px;">🔍</p>
                          <p style="margin: 0; font-size: 11px; color: #7C6AF7; font-weight: 600;">IN PROGRESS</p>
                          <p style="margin: 4px 0 0 0; font-size: 12px; color: #6B6B80;">Review</p>
                        </td>
                        <td width="33%" align="center" style="padding: 8px;">
                          <p style="margin: 0 0 4px 0; font-size: 20px;">🚀</p>
                          <p style="margin: 0; font-size: 11px; color: #6B6B80; font-weight: 600;">PENDING</p>
                          <p style="margin: 4px 0 0 0; font-size: 12px; color: #6B6B80;">Decision</p>
                        </td>
                      </tr>
                    </table>
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
