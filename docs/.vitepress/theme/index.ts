import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { createZoom, useZoom } from './composables/zoom'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'
import './styles/glightbox.css'

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
