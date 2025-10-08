#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const scriptDir = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = join(scriptDir, '..', '..')
const tocPath = join(repoRoot, 'docs', 'manual', 'TOC.md')
const examplesDir = join(repoRoot, 'website', 'docs', 'examples')
const generatedDir = join(repoRoot, 'website', 'docs', '.vitepress', 'generated')

mkdirSync(examplesDir, { recursive: true })
mkdirSync(generatedDir, { recursive: true })

const raw = readFileSync(tocPath, 'utf8')
const lines = raw.split('\n')

const sections = []
let current = null
for (const line of lines) {
  const m = line.match(/^\s*(\d+)\.\s+(.+?)\s*$/)
  if (m) {
    if (current) sections.push(current)
    current = { idx: Number(m[1]), title: m[2].trim(), bullets: [] }
    continue
  }
  const bm = line.match(/^\s*[-•]\s+(.+?)\s*$/)
  if (bm && current) {
    current.bullets.push(bm[1])
  }
}
if (current) sections.push(current)

const slugify = (s) => s
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

const pad2 = (n) => String(n).padStart(2, '0')

const indexItems = []
const sidebarItems = [{ text: 'Overview', link: '/examples/' }]

for (const s of sections) {
  const slug = `${pad2(s.idx)}-${slugify(s.title)}`
  const filePath = join(examplesDir, `${slug}.md`)
  const link = `/examples/${slug}`

  const bullets = s.bullets.length
    ? s.bullets.map(b => `- ${b}`).join('\n')
    : '- (Tasks forthcoming)'

  const content = `---\noutline: deep\ngenerated_from: docs/manual/TOC.md\nstatus: draft\n---\n\n# How-To: ${s.title}\n\nThis page contains task-driven examples for "${s.title}" based on the manual's Table of Contents.\n\n## Tasks in this section\n${bullets}\n\n## Prerequisites\n- Basic familiarity with Smackdab navigation\n- Appropriate roles/permissions\n\n## Step-by-step walkthroughs\n- Coming soon: detailed steps with sample requests/responses grounded in the OpenAPI contracts.\n\n## Common pitfalls\n- To be documented as examples are filled in\n\n## Related education\n- See the Education section for concepts: /education/\n\n`.
  replace(/\n\n\n+/g, '\n\n')

  writeFileSync(filePath, content)
  indexItems.push(`- [${s.idx}. ${s.title}](${link})`)
  sidebarItems.push({ text: `${s.idx}. ${s.title}`, link })
}

const index = `---\noutline: deep\n---\n\n# Examples\n\nTask-driven examples derived from the manual's Table of Contents. We'll fill these out in order.\n\n${indexItems.join('\n')}\n`
writeFileSync(join(examplesDir, 'index.md'), index)

writeFileSync(join(generatedDir, 'examples-sidebar.json'), JSON.stringify({ text: 'Examples', items: sidebarItems }, null, 2))

console.log(`Generated ${sections.length} example pages from TOC.md`)