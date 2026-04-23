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
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Welcome to ${brand.name} Creators Program</title>
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
                    <span style="display: inline-block; background-color: #F0F9FF; color: #0EA5E9; font-family: sans-serif; font-size: 11px; font-weight: 700; padding: 8px 20px; border-radius: 100px; letter-spacing: 0.08em; border: 1px solid #E0F2FE;">
                      🎯 APPLICATION RECEIVED
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Hero Text -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 36px; font-weight: 800; color: #111827; line-height: 1.1; letter-spacing: -0.03em;">
                      Hey ${name}! 👋
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <p style="margin: 0; font-family: sans-serif; font-size: 17px; color: #4B5563; line-height: 1.6;">
                      We've received your application for <strong style="color: #6366F1;">@${instagramUsername}</strong> and our team is excited to review your profile.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Benefits Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 20px; padding: 32px;">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #6366F1; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">WHAT YOU GET (IF APPROVED)</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; font-family: sans-serif; font-size: 15px; color: #1E293B;">
                          <span style="color: #22C55E; margin-right: 12px; font-weight: bold;">✓</span> Full Business plan access ($79/mo value)
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-family: sans-serif; font-size: 15px; color: #1E293B;">
                          <span style="color: #22C55E; margin-right: 12px; font-weight: bold;">✓</span> Unlimited comment-to-DM automations
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-family: sans-serif; font-size: 15px; color: #1E293B;">
                          <span style="color: #22C55E; margin-right: 12px; font-weight: bold;">✓</span> Advanced profile & conversion analytics
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-family: sans-serif; font-size: 15px; color: #1E293B;">
                          <span style="color: #22C55E; margin-right: 12px; font-weight: bold;">✓</span> Priority onboarding & support
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Timeline -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 40px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-family: sans-serif; font-size: 20px; font-weight: 700; color: #111827;">What happens next?</h2>
                    <p style="margin: 0 0 28px 0; font-family: sans-serif; font-size: 15px; color: #6B7280; line-height: 1.7;">
                      Our team manually reviews every application within <strong style="color: #111827;">48-72 hours</strong>. We look at your engagement, content quality, and profile alignment.
                    </p>
                    
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 16px; padding: 24px;">
                      <tr>
                        <td width="33%" align="center">
                          <p style="margin: 0; font-size: 24px;">📝</p>
                          <p style="margin: 6px 0 0 0; font-family: sans-serif; font-size: 10px; color: #22C55E; font-weight: 800; letter-spacing: 0.05em;">DONE</p>
                          <p style="margin: 2px 0 0 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">Applied</p>
                        </td>
                        <td width="33%" align="center">
                          <p style="margin: 0; font-size: 24px;">🔍</p>
                          <p style="margin: 6px 0 0 0; font-family: sans-serif; font-size: 10px; color: #6366F1; font-weight: 800; letter-spacing: 0.05em;">IN REVIEW</p>
                          <p style="margin: 2px 0 0 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">Verification</p>
                        </td>
                        <td width="33%" align="center">
                          <p style="margin: 0; font-size: 24px;">✉️</p>
                          <p style="margin: 6px 0 0 0; font-family: sans-serif; font-size: 10px; color: #94A3B8; font-weight: 800; letter-spacing: 0.05em;">PENDING</p>
                          <p style="margin: 2px 0 0 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">Decision</p>
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
            <td align="center" style="padding-top: 40px;">
              <p style="margin: 0 0 12px 0; font-family: sans-serif; font-size: 14px; color: #6B7280;">
                Have questions? Just reply to this email.
              </p>
              <div style="height: 1px; width: 40px; background-color: #E5E7EB; margin-bottom: 20px;"></div>
              <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em;">
                © ${new Date().getFullYear()} ${brand.name} • Creators Program
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
