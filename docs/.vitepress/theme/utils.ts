import type { UserConfig } from 'vitepress'
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

  const path: PathItem[] = []
  let root: PathItem | undefined

  if (config.themeConfig.nav) {
    root = config.themeConfig.nav.find(item => searchable.startsWith(item.link))
  } else {
    const localeLinks = Object.entries(config.locales).flatMap(([key]) => ({
      key,
      link: key === 'root' ? '/' : `${key}/`,
    }))
    const locale = localeLinks.find(locale => searchable.startsWith(locale.link))
    if (locale && Object.prototype.hasOwnProperty.call(config.locales, locale.key)) {
      root = config.locales[locale.key].themeConfig.nav.find(item => searchable.startsWith(item.link))
    }
  }

  if (root) {
    path.push({
      text: root.text,
      link: root.link,
    })
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

export function ellipsis(
  string: string = '',
  length: number = 0,
  etc: string = '...'
): string {
  if (string.length <= length) {
    return string
  }

  return string.substring(0, length) + (string.length > length ? etc : '')
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
