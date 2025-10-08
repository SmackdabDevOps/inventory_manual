#!/usr/bin/env node
import { mkdirSync, readdirSync, statSync, copyFileSync, rmSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const exportRoot = join(repoRoot, 'docs-site-export')

// clean export if exists
try { rmSync(exportRoot, { recursive: true, force: true }) } catch {}
mkdirSync(exportRoot, { recursive: true })

const includes = [
  { src: 'website', dest: 'website' },
  { src: 'docs/manual', dest: 'docs/manual' },
  { src: 'render.yaml', dest: 'render.yaml', isFile: true },
  { src: 'docs/DEPLOYMENT_GUIDE.md', dest: 'docs/DEPLOYMENT_GUIDE.md', isFile: true },
  { src: 'docs/MAINTAINING_MANUAL.md', dest: 'docs/MAINTAINING_MANUAL.md', isFile: true }
]

function copyRecursive(srcPath, destPath) {
  const s = statSync(srcPath)
  if (s.isDirectory()) {
    mkdirSync(destPath, { recursive: true })
    for (const entry of readdirSync(srcPath)) {
      if (entry === 'node_modules' || entry === '.vitepress/cache') continue
      copyRecursive(join(srcPath, entry), join(destPath, entry))
    }
  } else {
    mkdirSync(dirname(destPath), { recursive: true })
    copyFileSync(srcPath, destPath)
  }
}

for (const item of includes) {
  const src = join(repoRoot, item.src)
  const dest = join(exportRoot, item.dest)
  copyRecursive(src, dest)
}

// Add .gitignore
writeFileSync(join(exportRoot, '.gitignore'), `# Node\nnode_modules\n\n# Local caches\n.vitepress/cache\n.DS_Store\n`) 

// Add README
writeFileSync(join(exportRoot, 'README.md'), `# Smackdab Inventory Manual (Docs Site)\n\nThis is the standalone repository for the UI-rich documentation website.\n\nContents:\n- website/  -> VitePress site (builds to docs/.vitepress/dist)\n- docs/manual/ -> Source manual chapters (Education is generated from these)\n- render.yaml -> Render blueprint for static hosting\n\nQuick start:\n\n\`\`\`bash\n# Install deps for the site\nnpm install --prefix website\n\n# Import chapters and generate Examples from TOC\nnpm run --prefix website sync\nnpm run --prefix website examples:generate\n\n# Dev\nnpm run --prefix website dev\n\n# Build\nnpm run --prefix website build\n\n# Preview\nnpm run --prefix website preview\n\`\`\`\n\nDeployment on Render:\n- Build Command: \`npm install --prefix website && npm run --prefix website sync && npm run --prefix website examples:generate && npm run --prefix website build\`\n- Publish Directory: \`website/docs/.vitepress/dist\`\n\nAnalytics:\n- GA4: set \`VITE_GA_ID\` env var\n- Plausible: set \`VITE_PLAUSIBLE_DOMAIN\` env var\n\n`) 

console.log('Exported docs site to', exportRoot)
