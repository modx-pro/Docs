import { type Router, inBrowser } from 'vitepress'
import { type App, watch } from 'vue'
import { createZoom } from './composables/zoom'
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'
import './styles/glightbox.css'

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,

  enhanceApp({ app, router }: { app: App, router: Router }) {
    app.component('DocsComponentsList', DocsComponentsList)
    createZoom(app, router)

    if (
      import.meta.env.PROD &&
      inBrowser &&
      window.ym
    ) {
      watch(
        () => router.route.data.relativePath,
        (path, oldPath) => {
          if (!oldPath) { // Skip initial change
            return
          }

          const url = '/' + path.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
          window.ym(24242593, 'hit', url)
        }
      )
    }
  },
}
