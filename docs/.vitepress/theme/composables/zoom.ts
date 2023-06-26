import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.css'
import { scrollbarWidth } from '@xobotyi/scrollbar-width'

import {
  inject,
  nextTick,
  onMounted,
  watch,
  type App,
  type InjectionKey
} from 'vue'
import type { Router } from 'vitepress'

export const glightboxSymbol: InjectionKey<GLightbox> = Symbol('glightbox')

export function useZoom() {
  return onMounted(() => inject(glightboxSymbol).reload())
}

export function createZoom(app: App, router: Router) {
  const lightbox = GLightbox({
    selector: '.vp-doc :not(a) > img',
    openEffect: 'fade',
    closeEffect: 'fade',
    zoomable: true,
    skin: 'white',
  })
  const scrollWidth = scrollbarWidth()

  function updateFixedElements(scrollWidth?: number): void {
    const navEl = document.querySelector('.VPNav') as HTMLElement | null
    if (navEl !== null) {
      navEl.style.paddingRight = scrollWidth ? (scrollWidth + 'px') : ''
    }

    const layoutEl = document.querySelector('.Layout') as HTMLElement | null
    if (layoutEl !== null) {
      layoutEl.style.marginRight = scrollWidth ? (scrollWidth + 'px') : ''
    }

    const sidebarEl = document.querySelector('.VPSidebar') as HTMLElement | null
    if (sidebarEl !== null) {
      sidebarEl.style.left = scrollWidth ? (scrollWidth / 2 * -1 + 'px') : ''
    }
  }

  lightbox.on('open', () => updateFixedElements(scrollWidth))
  lightbox.on('close', () => updateFixedElements())

  app.provide(glightboxSymbol, lightbox)
  watch(
    () => router.route.path,
    () => nextTick(() => {
      lightbox.close()
      lightbox.reload()
    }),
  )
}
