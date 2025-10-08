import { onMounted } from 'vue'

export default {
  mounted() {
    onMounted(() => {
      document.querySelectorAll('pre > code').forEach(block => {
        const pre = block.parentElement
        if (!pre) return
        const btn = document.createElement('button')
        btn.textContent = 'Copy'
        btn.className = 'copy-btn'
        btn.addEventListener('click', async () => {
          await navigator.clipboard.writeText(block.textContent || '')
          btn.textContent = 'Copied!'
          setTimeout(() => (btn.textContent = 'Copy'), 1200)
        })
        pre.appendChild(btn)
      })
    })
  }
}
