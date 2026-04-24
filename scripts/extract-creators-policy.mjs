import { execSync } from 'child_process'
import { writeFileSync } from 'fs'

const p =
  'g:/REACTOVA/Website/v1/Marketing/client/src/assets/docx/Reactova_Creators_Program_Policy.docx'
const xml = execSync(`unzip -p "${p}" word/document.xml`, { encoding: 'utf8' })

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

const paras = []
const re = /<w:p[\s>][\s\S]*?<\/w:p>/g
let m
while ((m = re.exec(xml))) {
  const block = m[0]
  const texts = [...block.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((x) => decode(x[1]))
  const line = texts.join('').trim()
  if (line) paras.push(line)
}

const out = paras.join('\n')
writeFileSync(
  'g:/REACTOVA/Website/v1/Marketing/client/src/assets/docx/extracted_text/Reactova_Creators_Program_Policy.txt',
  out,
  'utf8'
)
console.log('Wrote', paras.length, 'paragraphs')
