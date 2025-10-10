import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './styles.css'
import LearningQuiz from './components/LearningQuiz.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('LearningQuiz', LearningQuiz)

    if (typeof window !== 'undefined') {
      let mermaidPromise: Promise<typeof import('mermaid').default> | null = null

      const getMermaid = async () => {
        if (!mermaidPromise) {
          mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
            mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' })
            return mermaid
          })
        }
        return mermaidPromise
      }

      const renderMermaidBlocks = async () => {
        const mermaid = await getMermaid()
        const blocks = Array.from(
          document.querySelectorAll<HTMLDivElement>('div[data-mermaid]')
        )

        blocks.forEach((block, index) => {
          if (block.dataset.rendered === 'true') return
          const encoded = block.dataset.code
          if (!encoded) return
          let code: string
          try {
            code = atob(encoded)
          } catch (error) {
            console.error('Failed to decode Mermaid source', error)
            return
          }

          const id = `mermaid-${Date.now()}-${index}`
          try {
            const { mermaidAPI } = mermaid
            mermaidAPI.render(id, code, (svg) => {
              block.innerHTML = svg
              block.dataset.rendered = 'true'
            })
          } catch (error) {
            console.error('Failed to render Mermaid diagram', error)
          }
        })
      }

      const { onAfterRouteChanged } = router
      router.onAfterRouteChanged = async (to) => {
        if (typeof onAfterRouteChanged === 'function') {
          onAfterRouteChanged(to)
        }
        await renderMermaidBlocks()
      }

      const hydrate = () => {
        void renderMermaidBlocks()
      }

      if (document.readyState === 'complete') {
        hydrate()
      } else {
        window.addEventListener('load', hydrate, { once: true })
      }
    }
  }
}
