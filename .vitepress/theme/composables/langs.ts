import { computed } from 'vue'
import { useData, type DefaultTheme } from 'vitepress'
import { ensureStartingSlash } from '../utils'
import type { DocsTheme } from '../types/index.ts'
import { getFlatSideBarLinks, getSidebar } from 'vitepress/dist/client/theme-default/support/sidebar'

export function useLangs({
  removeCurrent = true,
  correspondingLink = false
} = {}) {
  const { site, localeIndex, page, theme } = useData<DocsTheme.Config>()
  const currentLang = computed(() => ({
    label: site.value.locales[localeIndex.value]?.label,
    link:
      site.value.locales[localeIndex.value]?.link ||
      (localeIndex.value === 'root' ? '/' : `/${localeIndex.value}/`)
  }))

  const localeLinks = computed(() =>
    Object.entries(site.value.locales).flatMap(([key, value]) => {
      if (removeCurrent && currentLang.value.label === value.label) {
        return []
      }

      const text = value.label
      const rootLink = value.link || (key === 'root' ? '/' : `/${key}/`)
      let link = normalizeLink(
        rootLink,
        theme.value.i18nRouting !== false && correspondingLink,
        page.value.relativePath.slice(currentLang.value.link.length - 1),
        !site.value.cleanUrls
      )

      if (
        link === '/' ||
        Object.entries(site.value.locales).some(([key]) => link.replace(/^\//, '').replace(/\/$/, '') === key)
      ) {
        return {
          text,
          link
        }
      }

      // this runs in the browser: a locale without nav or components falls back to its root link
      const { themeConfig } = site.value.locales[key]
      const nav = themeConfig?.nav ?? []
      const sidebar = themeConfig?.sidebar

      for (const item of nav) {
        if ('link' in item && item.link === link) {
          return {
            text,
            link
          }
        }
      }

      // getSidebar разбирает обе формы сайдбара и добавляет base к ссылкам — так же, как сам VitePress
      const sidebars = Array.isArray(sidebar)
        ? [getSidebar(sidebar, '')]
        : Object.entries(sidebar ?? {}).map(([dir, value]) =>
          // locale themeConfig is typed as DeepPartial by VitePress; the data is the same sidebar
          getSidebar({ [dir]: value } as DefaultTheme.SidebarMulti, dir))

      for (const items of sidebars) {
        const flatSidebar = getFlatSideBarLinks(items)

        for (const item of flatSidebar) {
          if (item.link === link) {
            return {
              text,
              link
            }
          }
        }
      }

      const current = page.value.component
      if (!current) {
        return {
          text: value.label,
          link: rootLink,
        }
      }

      const component = themeConfig?.components?.find(component => component.title === current.title)
      if (!component?.link) {
        return {
          text: value.label,
          link: rootLink,
        }
      }

      return {
        text,
        link: component.link
      }
    }
  ))

  return { localeLinks, currentLang }
}

function normalizeLink(
  link: string,
  addPath: boolean,
  path: string,
  addExt: boolean
): string {
  return addPath
      ? link.replace(/\/$/, '') +
          ensureStartingSlash(path
              .replace(/(^|\/)?index.md$/, '$1')
              .replace(/\.md$/, addExt ? '.html' : ''))
      : link
}
