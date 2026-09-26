import type { DefaultTheme, UserConfig, PageData } from 'vitepress'
import type { ComponentData } from './plugins/component.ts'

import { type Author, authors } from '../../docs/authors.ts'
import type { DocsTheme } from './types/index.ts'

const HASH_OR_QUERY_RE = /[?#].*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;

/**
 * A node of the sidebar tree: a page with optional children, a list of pages or a component.
 * `base` of multi-sidebar entries is not applied: links are expected to be absolute.
 */
type SidebarNode = { link?: string, items?: DefaultTheme.SidebarItem[] } | DefaultTheme.SidebarItem[]

const warnedSidebar = new Set<string>()

export function findPath(
  pageData: PageData,
  config: UserConfig,
): DefaultTheme.SidebarItem[] {
  let searchable = normalize(pageData.relativePath)

  // a broken locale config must fail the build: empty breadcrumbs would also
  // silently change <title> of pages without a frontmatter title (component.ts)
  const locales = config.locales
  if (!locales || !Object.keys(locales).length) {
    throw new Error('findPath: config.locales is empty')
  }
  const localeLinks = Object.keys(locales).map(key => ({ key, link: key === 'root' ? '/' : `${key}/` }))
  if (localeLinks.some(({ link }) => link === searchable)) return []

  const locale = localeLinks.find(locale => locale.link.startsWith(searchable.replace(/(^.*?\/).*$/, '$1'))) || localeLinks[0]
  searchable = ensureStartingSlash(searchable)
  const localeConfig: DocsTheme.Config | undefined = locales[locale.key].themeConfig
  if (!localeConfig?.nav) {
    throw new Error(`findPath: locale "${locale.key}" has no themeConfig.nav`)
  }
  const root = localeConfig.nav.find(item => {
    if (!('link' in item) || typeof item.link !== 'string') {
      return false
    }
    const tmp = locale.link === '/' ? item.link.replace(/(^\/.*?\/).*$/, '$1') : item.link.replace(/(^\/.*?\/)(.*?\/).*$/, '$1$2')
    return searchable.startsWith(tmp)
  })
  const path: DefaultTheme.SidebarItem[] = []
  if (root && ('link' in root) && typeof root.link === 'string') {
    path.push({ text: root.text, link: root.link })
  }

  let tree: SidebarNode | undefined

  if (pageData.component) {
    const { title, link, items } = pageData.component
    tree = pageData.component
    path.push({ text: title, link, items })
  } else if (localeConfig.sidebar && !Array.isArray(localeConfig.sidebar)) {
    // multi-sidebar: { '/components/x/': items | { items, base } }
    const sidebar = Object.entries(localeConfig.sidebar).find(([link]) => searchable.startsWith(link))
    if (sidebar) tree = sidebar[1]
  } else if (!warnedSidebar.has(locale.key)) {
    // breadcrumbs are built from a multi-sidebar only; without it pages get just the nav root
    warnedSidebar.add(locale.key)
    console.warn(`findPath: locale "${locale.key}" has no multi-sidebar, breadcrumbs contain only the nav item`)
  }

  if (!tree) return path

  const keyExists = (node: SidebarNode | undefined): boolean => {
    if (!node || typeof node !== 'object') {
      return false
    }
    if (!Array.isArray(node) && typeof node.link === 'string' && ensureStartingSlash(node.link) === searchable) {
      return true
    }
    const children = Array.isArray(node) ? node : node.items
    if (!Array.isArray(children)) {
      return false
    }
    for (const item of children) {
      path.push(item)
      if (keyExists(item)) {
        return true
      }
      path.pop()
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

  if (Object.prototype.hasOwnProperty.call(authors, author)) {
    return authors[author]
  }

  const key = Object.keys(authors).find(k => k.toLowerCase() === author.toLowerCase())
  if (!key) {
    return
  }

  return authors[key]
}

export function normalize(path: string): string {
  return decodeURI(path)
      .replace(HASH_OR_QUERY_RE, '')
      .replace(INDEX_OR_EXT_RE, '$1');
}
