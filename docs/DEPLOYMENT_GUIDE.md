Smackdab Inventory Manual – Deployment Guide (Render.com)

Overview
This guide describes how to deploy the VitePress-based documentation site to Render.

Pre-reqs
- Render account with access to the target organization
- Repo connected to Render
- Node 18+ at build time (Render static uses their default Node; our config works as-is)

Files added by this setup
- render.yaml – defines a static site build + publish
- website/ – VitePress site
- website/package.json – scripts (dev, build, preview, sync)
- website/scripts/sync-manual.js – imports docs/manual chapters into Education

Render Setup
1) Push repository (or ensure Render can access it)
2) In Render, click New + From a Blueprint (render.yaml)
3) Confirm service name: smackdab-inventory-manual
4) Build Command:
   npm install --prefix website && npm run --prefix website sync && npm run --prefix website build
5) Publish Directory:
   website/docs/.vitepress/dist
6) Create service

Environment
No secrets are required for local search. To enable Algolia DocSearch later, add the following env vars in Render and update config.ts accordingly:
- VITE_ALGOLIA_APP_ID
- VITE_ALGOLIA_API_KEY
- VITE_ALGOLIA_INDEX

Local Development
- Sync chapters: npm run --prefix website sync
- Dev server:   npm run --prefix website dev
- Build:        npm run --prefix website build
- Preview:      npm run --prefix website preview

Conventions
- Education mirrors docs/manual/chapters (generated)
- Examples contains task-driven pages; maintain manually under website/docs/examples
- Sidebar for Education is generated at website/docs/.vitepress/generated/education-sidebar.json

Troubleshooting
- If build fails on Render due to missing packages, ensure npm install is used (render.yaml already uses it)
- If chapters don’t appear, verify docs/manual/chapters/ exists and re-run sync
- If routes 404 on Render, static site may need a rewrite rule; our render.yaml includes a passthrough rewrite
