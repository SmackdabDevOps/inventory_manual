#!/usr/bin/env node
// Sync docs/manual chapters into VitePress sections (education)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(scriptDir, '..', '..')
const manualChaptersDir = join(repoRoot, 'docs', 'manual', 'chapters')
const educationDir = join(repoRoot, 'website', 'docs', 'education')
const generatedDir = join(repoRoot, 'website', 'docs', '.vitepress', 'generated')

if (!existsSync(manualChaptersDir)) {
  console.error('Cannot find manual chapters at', manualChaptersDir)
  process.exit(1)
}

mkdirSync(educationDir, { recursive: true })
mkdirSync(generatedDir, { recursive: true })

const slug = (s) => s
  .toLowerCase()
  .replace(/chapter_\d+_/,'')
  .replace(/[^a-z0-9]+/g,'-')
  .replace(/(^-|-$)/g,'')

const files = readdirSync(manualChaptersDir).filter(f => f.endsWith('.md'))
files.sort()

const sidebarItems = []
const indexLinks = []
for (const file of files) {
  const src = join(manualChaptersDir, file)
  let content = readFileSync(src, 'utf8')
  // Ensure top-level heading starts with # and remove leading Chapter N prefix in filename for route
  const outName = slug(basename(file, '.md')) + '.md'
  const outPath = join(educationDir, outName)

  // Try to extract first H1 as title
  const h1Match = content.match(/^#\s+(.+)$/m)
  const title = h1Match ? h1Match[1].trim() : file.replace(/_/g,' ').replace('.md','')

  // Minimal frontmatter: enable outline and add original chapter filename as meta
  const fm = `---\noutline: deep\nchapter_source: ${file}\n---\n\n`
  if (!content.startsWith('---')) {
    content = fm + content
  }

  writeFileSync(outPath, content)
  const link = `/education/${outName.replace('.md','')}`
  indexLinks.push(`- [${title}](${link})`)
  sidebarItems.push({ text: title, link })
}

// Write education index with links
const index = `---\noutline: deep\n---\n\n# Education\n\nBelow are the educational chapters imported from the manual.\n\n${indexLinks.join('\n')}\n`
writeFileSync(join(educationDir, 'index.md'), index)

// Write generated sidebar JSON
writeFileSync(join(generatedDir, 'education-sidebar.json'), JSON.stringify({ text: 'Education', items: [{ text: 'Overview', link: '/education/' }, ...sidebarItems] }, null, 2))

console.log(`Synced ${files.length} chapters into /education`)
