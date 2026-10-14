import type { DefaultTheme } from 'vitepress'
import { normalize, ensureStartingSlash } from '../utils.ts'
import faqCategories from '../../../docs/faq/categories.json' with { type: 'json' }

import { readFileSync } from 'fs'
import { join, basename } from 'path'
import fg from 'fast-glob'
import matter from 'gray-matter'

declare interface Options {
  root: string | Array<string>
  ignore?: Array<string>
  collapsed?: boolean
}

export default class DocsSidebar {
  static generateSidebar(
    options: Options
  ): DefaultTheme.SidebarItem[] {
    const entries = fg.sync(options.root, options)

    return entries
      .map(path => DocsSidebar.getData(path, options))
      .sort((a, b) => (a.text && b.text) ? a.text.localeCompare(b.text) : 0)
  }

  static generateFaqSidebar(): DefaultTheme.SidebarItem[] {
    if (!Object.keys(faqCategories).length) {
      return []
    }

    const entries = fg.sync(['docs/faq/**/*.md', '!docs/faq/index.md'])
    const categoryOf = (path: string) => path.match(/^docs\/faq\/(.*)\//i)?.[1]

    // an article outside the known categories still builds, but is missing from the sidebar
    const orphans = entries.filter(path => !Object.hasOwn(faqCategories, categoryOf(path) ?? ''))
    if (orphans.length) {
      console.warn(`FAQ articles outside the categories of docs/faq/categories.json, not in the sidebar: ${orphans.join(', ')}`)
    }

    return Object.entries(faqCategories).map(([category, text]) => {
      const articles = entries.filter(path => categoryOf(path) === category)
      const items = articles.map(path => DocsSidebar.getData(path))

      return {
        text,
        items,
        collapsed: false,
      } as DefaultTheme.SidebarItem
    })
  }

  static generateSidebarItem(
    items: DefaultTheme.SidebarItem[],
    path: string,
  ): DefaultTheme.SidebarItem[] {
    items = items.map(({ text, link, items }) => {
      const item: DefaultTheme.SidebarItem = { text }

      if (link) {
        item.link = join(path, link).replace(/\\/g, '/')
      }

      if (items) {
        item.collapsed = true
        item.items = DocsSidebar.generateSidebarItem(items, path)
      }

      return item
    })

    return items
  }

  static getData(
    path: string,
    options?: Partial<Options>
  ): DefaultTheme.SidebarItem {
    const src = readFileSync(path, 'utf-8')
    const { data } = matter(src)
    const {
      title = DocsSidebar.getTitleFromContent(src) || basename(path),
      items,
    } = data

    const link = ensureStartingSlash(normalize(path.replace(/^docs/, '')))

    const output: DefaultTheme.SidebarItem = {
      text: title,
      link,
    }

    if (items) {
      output.collapsed = options?.collapsed ?? true
      output.items = DocsSidebar.generateSidebarItem(items, link)
    }

    return output
  }

  static getTitleFromContent(
    content: string,
  ): string | undefined {
    const lines = content.split('\n')
    for (let i = 0, len = lines.length; i < len; i += 1) {
      let str = lines[i].toString().replace('\r', '')
      if (str.indexOf('# ') !== -1) {
        str = str.replace('# ', '')
        return str
      }
    }

    return
  }
}

export { DocsSidebar }

export const {
  generateSidebar,
  generateFaqSidebar,
  generateSidebarItem,
  getTitleFromContent
} = DocsSidebar
