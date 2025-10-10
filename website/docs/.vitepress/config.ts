import { defineConfig } from 'vitepress'
import educationSidebar from './generated/education-sidebar.json'

// Analytics injection via environment variables at build time
// Supported:
// - Google Analytics 4: VITE_GA_ID (e.g., G-XXXXXXXXXX)
// - Plausible: VITE_PLAUSIBLE_DOMAIN (e.g., docs.example.com)
const head = [] as any[]

if (process.env.VITE_GA_ID) {
  head.push([
    'script',
    { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${process.env.VITE_GA_ID}` }
  ])
  head.push([
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.VITE_GA_ID}');`
  ])
}

if (process.env.VITE_PLAUSIBLE_DOMAIN) {
  head.push([
    'script',
    { defer: '', 'data-domain': process.env.VITE_PLAUSIBLE_DOMAIN, src: 'https://plausible.io/js/script.js' }
  ])
}

export default defineConfig({
  title: 'Smackdab Inventory Manual',
  description: 'Contract-grounded user manual for the Smackdab Inventory platform',
  cleanUrls: true,
  head,
  markdown: {
    mermaid: true
  },
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'Smackdab' },
    nav: [
      { text: 'Education', link: '/education/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Search', link: '/search' }
    ],
    sidebar: {
      '/education/': [educationSidebar],
      '/examples/': [
        // Generated sidebar from TOC
        require('./generated/examples-sidebar.json')
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/smackdab/inventory_system_design' }
    ],
    search: {
      provider: 'local'
    },
    outline: [2,3]
  }
})
