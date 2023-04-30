import type { SiteConfig, SiteData, UserConfig, LocaleConfig, LocaleSpecificConfig } from 'vitepress'
import type { DocsPageData } from './plugins/component'
import { normalize } from 'vitepress/dist/client/shared'

import type { Author } from '../../authors'
import { authors } from '../../authors'

export declare interface PathItem {
  text: string
  link?: string
}

export function findPath(
  pageData: DocsPageData,
  config: UserConfig,
): PathItem[] {
  const tree = pageData.component
  const searchable = ensureStartingSlash(normalize(pageData.relativePath))
  const locale = getLocale(pageData.relativePath, config.locales)

  const path: PathItem[] = []

  if (locale) {
    const regex = locale.lang === 'ru' ? /(^.[^\/]+\/)/g : new RegExp(`(^${locale.lang}/.[^/]+/)`, 'g')
    const matches = regex.exec(searchable)

    if (matches !== null) {
      const nav = locale.themeConfig.nav.find(item => item.link.startsWith(ensureStartingSlash(matches[0])))

      if (nav) {
        path.push({
          text: nav.text,
          link: nav.link,
        })
      }
    }
  }

  if (!tree) {
    return []
  }

  path.push({
    text: tree.text || tree.title,
    link: !tree.hidden ? tree.link : undefined,
  })

  const keyExists = (tree) => {
    if (!tree || (typeof tree !== 'object' && !Array.isArray(tree.items))) {
      return false
    }
    else if (tree.hasOwnProperty('link') && tree.link === searchable) {
      return true
    }
    else if (Array.isArray(tree.items)) {
      for (let i = 0; i < tree.items.length; i++) {
        const item = tree.items[i]
        path.push({
          text: item.text,
          link: item.link || undefined,
        })
        const result = keyExists(item)
        if (result) {
          return result
        }

        path.pop()
      }
    }

    return false
  }

  keyExists(tree)

  return path
}

export function getLocale(
  path: string,
  locales: LocaleConfig | undefined,
): LocaleSpecificConfig | SiteData {
  if (typeof locales !== 'object' || locales === null || !Object.keys(locales).length) {
    const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG
    return config.site
  }

  const key = Object.keys(locales).find(locale => path.startsWith(locale))
  return key && Object.prototype.hasOwnProperty.call(locales, key) ? locales[key] : locales.root
}

export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`
}

export function getAuthor(author: string): Author | undefined {
  if (!author) {
    return
  }

  if (!Object.prototype.hasOwnProperty.call(authors, author)) {
    return
  }

  return authors[author]
}
