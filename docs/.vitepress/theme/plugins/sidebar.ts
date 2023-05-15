import type { DefaultTheme } from 'vitepress'
import { normalize } from 'vitepress/dist/client/shared'

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
      .map(path => {
        const src = readFileSync(path, 'utf-8')
        const { data } = matter(src)
        const { name, items } = data
        const { title = name || DocsSidebar.getTitleFromContent(src) || basename(path) } = data

        const link = normalize(path.replace(/^docs/, ''))

        const output: DefaultTheme.SidebarItem = {
          text: title,
          link,
        }

        if (items) {
          output.collapsed = options.collapsed === null || options.collapsed === undefined || options.collapsed
          output.items = DocsSidebar.generateSidebarItem(items, link)
        }

        return output
      })
      .sort((a, b) => (a.text && b.text) ? a.text.localeCompare(b.text) : 0)
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

export const { generateSidebar, generateSidebarItem, getTitleFromContent } = DocsSidebar;
