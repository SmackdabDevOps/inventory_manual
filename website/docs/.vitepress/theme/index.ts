import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './styles.css'
import LearningQuiz from './components/LearningQuiz.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('LearningQuiz', LearningQuiz)
  }
}
