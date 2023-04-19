import type { DefaultTheme } from 'vitepress'
import { readFileSync } from 'fs'
import { join, normalize, basename } from 'path'
import fg from 'fast-glob'
import matter from 'gray-matter'

declare interface Options {
  root: string | Array<string>,
  ignore?: Array<string>,
}

export default class DocsSidebar {
  static generateSidebar(options: Options): DefaultTheme.SidebarItem[] {
    const entries = fg.sync(options.root, options)

    const sidebar = entries
        .map(path => {
          const src = readFileSync(path, 'utf-8')
          const { data } = matter(src)
          const link = path
            .replace('docs', '')
            .replace('index.md', '')
            .replace(/\.md$/, '')

          const output: any = {
            text: data.name || DocsSidebar.getTitleFromMd(path),
          }

          if (!data.hidden) {
            output.link = link
          }

          if (data.items) {
            output.collapsed = true
            output.items = DocsSidebar.generateSidebarItem(data.items, link)
          }

          return output
        })
        .sort((a, b) => a.text.localeCompare(b.text))

    return sidebar
  }

  static generateSidebarItem(items, path): DefaultTheme.SidebarItem[] {
    items = items.map(({ text, link, items }) => {
      const item: DefaultTheme.SidebarItem = { text }

      if (link) {
        item.link = normalize(join(path, link)).replace(/\\/g, '/')
      }

      if (items) {
        item.collapsed = true
        item.items = DocsSidebar.generateSidebarItem(items, path)
      }

      return item
    })

    return items
  }

  static getTitleFromMd(path: string): string {
    const data = readFileSync(path, 'utf-8')
    const lines = data.split('\n')
    for (let i = 0, len = lines.length; i < len; i += 1) {
      let str = lines[i].toString().replace('\r', '')
      if (str.indexOf('# ') !== -1) {
        str = str.replace('# ', '')
        return str
      }
    }

    return basename(path)
  }
}

export { DocsSidebar }

export const { generateSidebar } = DocsSidebar;
