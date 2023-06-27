import mediumZoom, { type Zoom } from 'medium-zoom'
import {
  inject,
  nextTick,
  onMounted,
  watch,
  type App,
  type InjectionKey
} from 'vue'
import type { Router } from 'vitepress'

declare module 'medium-zoom' {
  interface Zoom {
    refresh: (selector?: string) => void
  }
}

export const key: InjectionKey<Zoom> = Symbol('medium-zoom')

export function useZoom() {
  return onMounted(() => inject(key).refresh())
}

export function createZoom(app: App, router: Router) {
  const zoom = mediumZoom({ margin: 24, background: 'var(--vp-c-bg)' })
  zoom.refresh = () => zoom.detach().attach('.vp-doc :not(a) > img')
  app.provide(key, zoom)
  watch(
    () => router.route.path,
    () => nextTick(() => zoom.refresh()),
  )
}
