import { createHash } from 'node:crypto'
import type { DefaultTheme, PageData, SiteConfig } from 'vitepress'
import { ensureStartingSlash, getAuthor, normalize } from '../utils'

import { readFileSync } from 'fs'
import { basename } from 'path'
import fg from 'fast-glob'
import matter from 'gray-matter'

import { generateSidebarItem, getTitleFromContent } from './sidebar'

import type { Author } from '../../../docs/authors'
import { findPath } from '../utils'

function withCacheBust(url: string): string {
  const v = createHash('md5').update(url).digest('hex').slice(0, 8)
  return `${url}${url.includes('?') ? '&' : '?'}v=${v}`
}

function decodeHtmlEntities(str: string | undefined): string | undefined {
  if (!str || typeof str !== 'string') return str
  return str
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, '\u00A0')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
}

export interface ComponentData {
  path: string
  link: string
  title: string
  titleLower: string
  description?: string

  text?: string
  author?: Author
  logo?: string
  dependencies?: Array<string>
  categories?: Array<string>

  modstore?: string
  modx?: string
  repository?: string

  items?: DefaultTheme.SidebarItem[]
}

export const components: ComponentData[] = fg
  .sync([
    'docs/components/*.md',
    '!docs/components/index.md',
    'docs/components/*/index.md',

    'docs/en/components/*.md',
    '!docs/en/components/index.md',
    'docs/en/components/*/index.md',
  ])
  .map(file => {
    const content = readFileSync(file, 'utf-8')
    const { data } = matter(content)
    const {
      title = getTitleFromContent(content) || basename(file),
      author,
      logo,
      categories = [],
      dependencies = [],
      items,
      modstore,
      modx,
      repository,
      description,
    } = data

    const filePath = file.substring(file.indexOf('/') + 1)
    const component: ComponentData = {
      path: filePath,
      link: ensureStartingSlash(normalize(filePath)),
      modstore,
      modx,
      repository,
      title: decodeHtmlEntities(title) ?? title,
      titleLower: (decodeHtmlEntities(title) ?? title).toLowerCase(),
      text: decodeHtmlEntities(title) ?? title,
      description: decodeHtmlEntities(description) ?? description,
      logo: logo ? withCacheBust(logo) : undefined,
      dependencies: Array.isArray(dependencies) ? dependencies : Array(dependencies),
      categories: Array.isArray(categories) ? categories : Array(categories),
    }

    component.author = getAuthor(author)

    if (items) {
      component.items = generateSidebarItem(items, component.link)
    }

    return component
  })
  .sort((a, b) => (a.text && b.text) ? a.text.localeCompare(b.text) : 0)

export default class DocsComponent {
  static prepareData(
    pageData: PageData,
    siteConfig: SiteConfig,
  ): PageData {
    const component = components.find(component => pageData.relativePath.startsWith(component.path.replace(/index\.md$/, '')))

    pageData.component = component
    pageData.breadcrumbs = findPath(pageData, siteConfig.userConfig)

    const rawTitle = !pageData.frontmatter.title && pageData.breadcrumbs.length
        ? pageData.breadcrumbs.map(item => item.text).reverse().join(siteConfig.userConfig.themeConfig.titleSeparator)
        : pageData.title
    pageData.title = decodeHtmlEntities(rawTitle) ?? rawTitle

    if (
      component
      && !pageData.description
      && pageData.component.description
    ) {
      pageData.description = pageData.component.description
    } else if (pageData.description) {
      pageData.description = decodeHtmlEntities(pageData.description) ?? pageData.description
    }

    return pageData
  }
}

export { DocsComponent }

export const { prepareData } = DocsComponent
