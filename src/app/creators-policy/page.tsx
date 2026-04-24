import { readFileSync } from 'fs'
import { join } from 'path'

import LegalPage from '@/components/LegalPage'
import { siteConfig } from '@/config/site.config'

export const metadata = {
  title: `Creators Program Policy - ${siteConfig.brand.name}`,
  description: `Rules, eligibility, and obligations for the ${siteConfig.brand.name} Creators Program.`,
}

function loadCreatorsPolicyContent(): string {
  const filePath = join(
    process.cwd(),
    'src',
    'assets',
    'docx',
    'extracted_text',
    'Reactova_Creators_Program_Policy.txt'
  )
  let text = readFileSync(filePath, 'utf8').trim()
  const lines = text.split('\n')

  if (lines[0] === 'Reactova' && lines[1]?.includes('Creators Program Policy')) {
    text = lines.slice(4).join('\n').trim()
  }

  text = text.replace(/\nReactova — April 2026\s*$/i, '').trim()

  return text
    .replace(/reactova\.com\/terms\b/g, 'reactova.com/terms-of-service')
    .replace(/reactova\.com\/privacy\b/g, 'reactova.com/privacy-policy')
    .replace(/reactova\.com\/acceptable-use\b/g, 'reactova.com/acceptable-use-policy')
    .replace(/reactova\.com\/refunds\b/g, 'reactova.com/refund-policy')
}

export default function CreatorsProgramPolicyPage() {
  return (
    <LegalPage
      title="Creators Program Policy"
      lastUpdated="April 2026"
      content={loadCreatorsPolicyContent()}
    />
  )
}
