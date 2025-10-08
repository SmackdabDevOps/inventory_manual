#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

type Section = { idx: number; title: string; bullets: string[] }
type SidebarItem = { text: string; link: string }

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = join(scriptDir, '..', '..')
const tocCandidates: string[] = [
  join(repoRoot, 'docs', 'manual', 'TOC.md'),
  join(repoRoot, 'docs-site-export', 'docs', 'manual', 'TOC.md'),
]
const tocPath = tocCandidates.find((candidate) => existsSync(candidate))
const examplesDir = join(repoRoot, 'website', 'docs', 'examples')
const generatedDir = join(repoRoot, 'website', 'docs', '.vitepress', 'generated')

if (!tocPath) {
  console.error(
    'Cannot find manual TOC in any of:',
    tocCandidates.join(', '),
  )
  process.exit(1)
}

mkdirSync(examplesDir, { recursive: true })
mkdirSync(generatedDir, { recursive: true })

const raw = readFileSync(tocPath, 'utf8')
const lines = raw.split(/\r?\n/)

const sections: Section[] = []
let current: Section | null = null
for (const line of lines) {
  const headingMatch = line.match(/^\s*(\d+)\.\s+(.+?)\s*$/)
  if (headingMatch) {
    if (current) sections.push(current)
    current = {
      idx: Number(headingMatch[1]),
      title: headingMatch[2].trim(),
      bullets: [],
    }
    continue
  }
  const bulletMatch = line.match(/^\s*[-•]\s+(.+?)\s*$/)
  if (bulletMatch && current) {
    current.bullets.push(bulletMatch[1])
  }
}
if (current) sections.push(current)

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const pad2 = (value: number): string => String(value).padStart(2, '0')

const indexItems: string[] = []
const sidebarItems: SidebarItem[] = [{ text: 'Overview', link: '/examples/' }]

for (const section of sections) {
  const slug = `${pad2(section.idx)}-${slugify(section.title)}`
  const filePath = join(examplesDir, `${slug}.md`)
  const link = `/examples/${slug}`

  const bullets = section.bullets.length
    ? section.bullets.map((bullet) => `- ${bullet}`).join('\n')
    : '- (Tasks forthcoming)'

  const content = `---\noutline: deep\ngenerated_from: docs/manual/TOC.md\nstatus: draft\n---\n\n# How-To: ${section.title}\n\nThis page contains task-driven examples for \"${section.title}\" based on the manual's Table of Contents.\n\n## Tasks in this section\n${bullets}\n\n## Prerequisites\n- Basic familiarity with Smackdab navigation\n- Appropriate roles/permissions\n\n## Step-by-step walkthroughs\n- Coming soon: detailed steps with sample requests/responses grounded in the OpenAPI contracts.\n\n## Common pitfalls\n- To be documented as examples are filled in\n\n## Related education\n- See the Education section for concepts: /education/\n\n`.replace(/\n\n\n+/g, '\n\n')

  writeFileSync(filePath, content)
  indexItems.push(`- [${section.idx}. ${section.title}](${link})`)
  sidebarItems.push({ text: `${section.idx}. ${section.title}`, link })
}

const index = `---\noutline: deep\n---\n\n# Examples\n\nTask-driven examples derived from the manual's Table of Contents. We'll fill these out in order.\n\n${indexItems.join('\n')}\n`
writeFileSync(join(examplesDir, 'index.md'), index)

writeFileSync(
  join(generatedDir, 'examples-sidebar.json'),
  JSON.stringify({ text: 'Examples', items: sidebarItems }, null, 2),
)

console.log(`Generated ${sections.length} example pages from TOC.md`)
