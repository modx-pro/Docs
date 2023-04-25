import DefaultTheme from 'vitepress/theme'
import DocsLayout from './components/DocsLayout.vue'
import './styles/global.css'

export default {
  ...DefaultTheme,
  Layout: DocsLayout,
}
