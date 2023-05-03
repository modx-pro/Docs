import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout: DocsLayout,

  enhanceApp({ app }: EnhanceAppContext) {
    app.component('DocsComponentsList', DocsComponentsList)
  },
}

export default theme
