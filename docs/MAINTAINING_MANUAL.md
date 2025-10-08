Maintaining the Smackdab Inventory Manual Site

Content Sources
- Authoritative content lives in docs/manual/ (TOC.md and chapters/*.md)
- Website is generated from that content into website/docs/education via a sync script

Daily Workflow
1) Edit or add chapters under docs/manual/chapters
2) Run: npm run --prefix website sync
3) Start dev server: npm run --prefix website dev
4) Verify navigation and search
5) Commit + push (note: agents must not commit without approval)

Adding Examples
- Create pages under website/docs/examples
- Link them from examples/index.md
- Keep examples concise; reference relevant OpenAPI contracts

Navigation
- Education sidebar is generated (do not hand-edit): website/docs/.vitepress/generated/education-sidebar.json
- Examples sidebar is manual; edit examples/_sidebar.md or extend config.ts

Search
- Local search is enabled by default
- For Algolia DocSearch, update website/docs/.vitepress/config.ts:

  search: {
    provider: 'algolia',
    options: {
      appId: process.env.VITE_ALGOLIA_APP_ID,
      apiKey: process.env.VITE_ALGOLIA_API_KEY,
      indexName: process.env.VITE_ALGOLIA_INDEX
    }
  }

Styling
- Theme overrides in website/docs/.vitepress/theme/styles.css
- Brand color: --vp-c-brand-1 (#2563eb)

Deployment
- Render blueprint is render.yaml
- Build command runs sync then build
- Publish path: website/docs/.vitepress/dist

Tips
- Keep chapter filenames stable to preserve permalinks
- Prefer concept content under Education; step-by-step under Examples
- Cross-link related pages using relative links (/education/... or /examples/...)
