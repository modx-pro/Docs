import type { EnhanceAppContext, Theme } from 'vitepress'
// @ts-expect-error
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout: DocsLayout,

  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('DocsComponentsList', DocsComponentsList)
  },
}

export default theme
