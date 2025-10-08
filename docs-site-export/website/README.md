Smackdab Inventory Manual Website

Quick start:

1) Sync chapters from docs/manual into Education section
   npm run --prefix website sync

2) Start dev server
   npm run --prefix website dev

3) Build static site
   npm run --prefix website build

Deployment (Render):
- Use a static site with build command: npm run --prefix website build
- Publish directory: website/docs/.vitepress/dist

To switch to Algolia DocSearch later, update docs/.vitepress/config.ts search provider.
