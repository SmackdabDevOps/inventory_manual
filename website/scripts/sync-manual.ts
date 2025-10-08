#!/usr/bin/env node
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'node:fs'
import { join, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

type SidebarItem = { text: string; link: string }

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(scriptDir, '..', '..')
const manualChaptersCandidates: string[] = [
  join(repoRoot, 'docs', 'manual', 'chapters'),
  join(repoRoot, 'docs-site-export', 'docs', 'manual', 'chapters'),
]
const manualChaptersDir = manualChaptersCandidates.find((candidate) =>
  existsSync(candidate),
)
const educationDir = join(repoRoot, 'website', 'docs', 'education')
const generatedDir = join(repoRoot, 'website', 'docs', '.vitepress', 'generated')

if (!manualChaptersDir) {
  console.error(
    'Cannot find manual chapters in any of:',
    manualChaptersCandidates.join(', '),
  )
  process.exit(1)
}

mkdirSync(educationDir, { recursive: true })
mkdirSync(generatedDir, { recursive: true })

const slug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/chapter_\d+_/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const files = readdirSync(manualChaptersDir)
  .filter((file) => file.endsWith('.md'))
  .sort()

const sidebarItems: SidebarItem[] = []
const indexLinks: string[] = []
for (const file of files) {
  const src = join(manualChaptersDir, file)
  let content = readFileSync(src, 'utf8')
  const outName = `${slug(basename(file, '.md'))}.md`
  const outPath = join(educationDir, outName)

  const h1Match = content.match(/^#\s+(.+)$/m)
  const title = h1Match ? h1Match[1].trim() : file.replace(/_/g, ' ').replace('.md', '')

  const frontmatter = `---\noutline: deep\nchapter_source: ${file}\n---\n\n`
  if (!content.startsWith('---')) {
    content = frontmatter + content
  }

  writeFileSync(outPath, content)
  const link = `/education/${outName.replace('.md', '')}`
  indexLinks.push(`- [${title}](${link})`)
  sidebarItems.push({ text: title, link })
}

const index = `---\noutline: deep\n---\n\n# Education\n\nBelow are the educational chapters imported from the manual.\n\n${indexLinks.join('\n')}\n`
writeFileSync(join(educationDir, 'index.md'), index)

writeFileSync(
  join(generatedDir, 'education-sidebar.json'),
  JSON.stringify(
    {
      text: 'Education',
      items: [{ text: 'Overview', link: '/education/' }, ...sidebarItems],
    },
    null,
    2,
  ),
)

console.log(`Synced ${files.length} chapters into /education`)
