import { type Router, inBrowser } from 'vitepress'
import { type App, watch } from 'vue'
import { NolebaseEnhancedReadabilitiesPlugin } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { createZoom } from './composables/zoom'
import DefaultTheme from 'vitepress/theme-without-fonts'
import DocsLayout from './components/DocsLayout.vue'
import DocsComponentsList from './components/DocsComponentsList.vue'
import './styles/global.css'
import './styles/glightbox.css'

const layoutSwitchClasses = [
  'VPNolebaseEnhancedReadabilitiesLayoutSwitchFullWidth',
  'VPNolebaseEnhancedReadabilitiesLayoutSwitchSidebarWidthAdjustableOnly',
  'VPNolebaseEnhancedReadabilitiesLayoutSwitchBothWidthAdjustable',
]

// The head script sets the saved mode on <html> before paint. The plugin then
// writes the same class on <body>. Drop the html copy once body has it, so a
// later mode switch only updates body.
function handoffEarlyLayoutClass() {
  if (!inBrowser) return

  const html = document.documentElement
  if (!layoutSwitchClasses.some(name => html.classList.contains(name))) return

  const release = () => {
    if (!layoutSwitchClasses.some(name => document.body.classList.contains(name))) return false
    for (const name of layoutSwitchClasses) html.classList.remove(name)
    return true
  }

  if (release()) return

  const observer = new MutationObserver(() => {
    if (release()) observer.disconnect()
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
}

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,

  enhanceApp({ app, router }: { app: App, router: Router }) {
    handoffEarlyLayoutClass()
    app.use(NolebaseEnhancedReadabilitiesPlugin, {
      layoutSwitch: {
        disableAnimation: true,
        contentLayoutMaxWidth: {
          disableAnimation: true,
        },
        pageLayoutMaxWidth: {
          disableAnimation: true,
        },
      },
    })
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
          window.ym(103589705, 'hit', url)
        }
      )
    }
  },
}
