import type { Ref } from 'vue'
import type { DefaultTheme, SiteData } from 'vitepress'
import type { DocsTheme } from './.vitepress/theme/types'
import type { ComponentData } from './.vitepress/theme/plugins/component'

declare module 'vitepress' {
  interface PageData {
    site: Ref<SiteData>
    component?: ComponentData
    breadcrumbs?: DefaultTheme.SidebarItem[]
    page?: Ref<PageData>
    theme?: Ref<DocsTheme.Config>
  }
}

export {}
