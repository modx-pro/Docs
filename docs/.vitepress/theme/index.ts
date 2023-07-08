import type { EnhanceAppContext } from 'vitepress'
import { createZoom, useZoom } from './composables/zoom'
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,

  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('DocsComponentsList', DocsComponentsList)
    createZoom(app, router)
  },

  setup() {
    useZoom()
  },
}
