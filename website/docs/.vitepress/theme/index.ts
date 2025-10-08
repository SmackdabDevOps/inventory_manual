import DefaultTheme from 'vitepress/theme'
import './styles.css'
import LearningQuiz from './components/LearningQuiz.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LearningQuiz', LearningQuiz)
  }
}
