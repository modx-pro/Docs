import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,

  enhanceApp(ctx: EnhanceAppContext) {
    ctx.app.component('DocsComponentsList', DocsComponentsList)
  },
}
