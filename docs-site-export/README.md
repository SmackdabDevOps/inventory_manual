# Smackdab Inventory Manual (Docs Site)

This is the standalone repository for the UI-rich documentation website.

Contents:
- website/  -> VitePress site (builds to docs/.vitepress/dist)
- docs/manual/ -> Source manual chapters (Education is generated from these)
- render.yaml -> Render blueprint for static hosting

Quick start:

```bash
# Install deps for the site
npm install --prefix website

# Import chapters and generate Examples from TOC
npm run --prefix website sync
npm run --prefix website examples:generate

# Dev
npm run --prefix website dev

# Build
npm run --prefix website build

# Preview
npm run --prefix website preview
```

Deployment on Render:
- Build Command: `npm install --prefix website && npm run --prefix website sync && npm run --prefix website examples:generate && npm run --prefix website build`
- Publish Directory: `website/docs/.vitepress/dist`

Analytics:
- GA4: set `VITE_GA_ID` env var
- Plausible: set `VITE_PLAUSIBLE_DOMAIN` env var

