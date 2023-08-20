import { type Router, inBrowser } from 'vitepress'
import { type App, watch } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,

  enhanceApp({ app, router }: { app: App, router: Router }) {
    app.component('DocsComponentsList', DocsComponentsList)

    if (
      import.meta.env.PROD &&
      inBrowser &&
      window.ym
    ) {
      watch(
        () => router.route.data.relativePath,
        (path) => {
          const url = '/' + path.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
          window.ym(24242593, 'hit', url)
        }
      )
    }
  },
}
