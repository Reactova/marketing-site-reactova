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
                      🎯 APPLICATION RECEIVED
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Hero Text -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <h1 style="margin: 0; font-family: sans-serif; font-size: 32px; font-weight: 800; color: #ffffff; line-height: 1.1; letter-spacing: -0.02em;">
                      Hey ${name}! 👋
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 32px;">
                    <p style="margin: 0; font-family: sans-serif; font-size: 16px; color: #818196; line-height: 1.6;">
                      We've received your Creators Program application for <strong style="color: #6366F1;">@${instagramUsername}</strong> and our team is excited to review it.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Benefits List -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #161625; border-radius: 16px; padding: 32px;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #6366F1; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">WHAT YOU GET (IF APPROVED)</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 6px 0; font-family: sans-serif; font-size: 14px; color: #E8E8F0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span> Full Business plan features ($79/mo value)
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-family: sans-serif; font-size: 14px; color: #E8E8F0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span> Unlimited comment-to-DM automations
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-family: sans-serif; font-size: 14px; color: #E8E8F0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span> Advanced analytics & tracking
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-family: sans-serif; font-size: 14px; color: #E8E8F0;">
                          <span style="color: #22C55E; margin-right: 8px;">✓</span> Priority 1-on-1 support
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Timeline -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 32px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-family: sans-serif; font-size: 18px; font-weight: 700; color: #ffffff;">What happens next?</h2>
                    <p style="margin: 0 0 24px 0; font-family: sans-serif; font-size: 14px; color: #818196; line-height: 1.7;">
                      Our team manually reviews every application within <strong style="color: #ffffff;">48-72 hours</strong>. We look at your engagement, content quality, and niche alignment.
                    </p>
                    
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #161625; border-radius: 12px; padding: 20px;">
                      <tr>
                        <td width="33%" align="center">
                          <p style="margin: 0; font-size: 20px;">📝</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 10px; color: #22C55E; font-weight: 700;">DONE</p>
                          <p style="margin: 2px 0 0 0; font-family: sans-serif; font-size: 11px; color: #818196;">Applied</p>
                        </td>
                        <td width="33%" align="center">
                          <p style="margin: 0; font-size: 20px;">🔍</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 10px; color: #6366F1; font-weight: 700;">IN REVIEW</p>
                          <p style="margin: 2px 0 0 0; font-family: sans-serif; font-size: 11px; color: #818196;">Verification</p>
                        </td>
                        <td width="33%" align="center">
                          <p style="margin: 0; font-size: 20px;">✉️</p>
                          <p style="margin: 4px 0 0 0; font-family: sans-serif; font-size: 10px; color: #4A4A5A; font-weight: 700;">PENDING</p>
                          <p style="margin: 2px 0 0 0; font-family: sans-serif; font-size: 11px; color: #818196;">Decision</p>
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
              <p style="margin: 0 0 12px 0; font-family: sans-serif; font-size: 13px; color: #4A4A5A;">
                Have questions? Just reply to this email. We're here to help.
              </p>
              <p style="margin: 0; font-family: sans-serif; font-size: 11px; color: #31313F; text-transform: uppercase; letter-spacing: 0.1em;">
                © ${new Date().getFullYear()} ${brand.name} • Exclusive Creators Program
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
