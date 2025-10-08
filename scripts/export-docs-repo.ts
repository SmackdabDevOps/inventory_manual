#!/usr/bin/env node
import {
  mkdirSync,
  readdirSync,
  statSync,
  copyFileSync,
  rmSync,
  writeFileSync,
  existsSync,
} from 'node:fs'
import { join, dirname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

type IncludeEntry = { src: string; dest: string }

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(scriptDir, '..')
const exportRoot = join(repoRoot, 'docs-site-export')

try {
  rmSync(exportRoot, { recursive: true, force: true })
} catch {
  // no-op: nothing to clean
}
mkdirSync(exportRoot, { recursive: true })

const includes: IncludeEntry[] = [
  { src: 'website', dest: 'website' },
  { src: 'docs/manual', dest: 'docs/manual' },
  { src: 'render.yaml', dest: 'render.yaml' },
  { src: 'docs/DEPLOYMENT_GUIDE.md', dest: 'docs/DEPLOYMENT_GUIDE.md' },
  { src: 'docs/MAINTAINING_MANUAL.md', dest: 'docs/MAINTAINING_MANUAL.md' },
]

function copyRecursive(srcPath: string, destPath: string): void {
  const stats = statSync(srcPath)
  if (stats.isDirectory()) {
    mkdirSync(destPath, { recursive: true })
    for (const entry of readdirSync(srcPath)) {
      const nextSrc = join(srcPath, entry)
      if (entry === 'node_modules') {
        continue
      }
      const isVitepressCache =
        entry === 'cache' && srcPath.endsWith(`${sep}.vitepress`)
      if (isVitepressCache) {
        continue
      }
      copyRecursive(nextSrc, join(destPath, entry))
    }
    return
  }

  mkdirSync(dirname(destPath), { recursive: true })
  copyFileSync(srcPath, destPath)
}

for (const item of includes) {
  const src = join(repoRoot, item.src)
  if (!existsSync(src)) {
    console.warn(`Skipping missing path: ${item.src}`)
    continue
  }
  const dest = join(exportRoot, item.dest)
  copyRecursive(src, dest)
}

writeFileSync(
  join(exportRoot, '.gitignore'),
  '# Node\nnode_modules\n\n# Local caches\n.vitepress/cache\n.DS_Store\n',
)

writeFileSync(
  join(exportRoot, 'README.md'),
  `# Smackdab Inventory Manual (Docs Site)\n\nThis is the standalone repository for the UI-rich documentation website.\n\nContents:\n- website/  -> VitePress site (builds to docs/.vitepress/dist)\n- docs/manual/ -> Source manual chapters (Education is generated from these)\n- render.yaml -> Render blueprint for static hosting\n\nQuick start:\n\n\`\`\`bash\n# Install deps for the site\nnpm install --prefix website\n\n# Import chapters and generate Examples from TOC\nnpm run --prefix website sync\nnpm run --prefix website examples:generate\n\n# Dev\nnpm run --prefix website dev\n\n# Build\nnpm run --prefix website build\n\n# Preview\nnpm run --prefix website preview\n\`\`\`\n\nDeployment on Render:\n- Build Command: \`npm install --prefix website && npm run --prefix website sync && npm run --prefix website examples:generate && npm run --prefix website build\`\n- Publish Directory: \`website/docs/.vitepress/dist\`\n\nAnalytics:\n- GA4: set \`VITE_GA_ID\` env var\n- Plausible: set \`VITE_PLAUSIBLE_DOMAIN\` env var\n`,
)

console.log('Exported docs site to', exportRoot)
