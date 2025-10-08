VitePress site for the Smackdab Inventory Manual

- Dev: npm run --prefix website dev
- Build: npm run --prefix website build
- Sync chapters: npm run --prefix website sync

This site separates Education (concepts) from Examples (task-driven how-tos) and uses local search by default. Switch to Algolia by setting:

In docs/.vitepress/config.ts:

search: {
  provider: 'algolia',
  options: {
    appId: 'APP_ID',
    apiKey: 'SEARCH_API_KEY',
    indexName: 'INDEX_NAME'
  }
}
