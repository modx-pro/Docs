import type { DefaultTheme, PageData, SiteConfig } from 'vitepress'

import { readFileSync } from 'fs'
import { basename } from 'path'
import fg from 'fast-glob'
import matter from 'gray-matter'

import { generateSidebarItem, getTitleFromContent } from './sidebar'

import { Author, authors } from '../../../authors'
import { findPath } from '../utils'

export interface ComponentLinks {
  label: string
  link: string
}

export interface ComponentData {
  path: string
  link: string
  title: string
  titleLower: string

  text?: string
  author?: Author

  modstore?: string
  modx?: string
  repository?: string

  items?: DefaultTheme.Sidebar
}

export interface DocsPageData extends PageData {
  component?: ComponentData
}

export const components: ComponentData[] = fg
  .sync([
    'docs/*/*.md',
    '!docs/*/index.md',
    'docs/*/*/index.md',

    'docs/en/*/*.md',
    '!docs/en/*/index.md',
    'docs/en/*/*/index.md',
  ])
  .map(file => {
    const content = readFileSync(file, 'utf-8')
    const { data } = matter(content)
    const { name, author, items, modstore, modx, repository } = data
    const { title = name || getTitleFromContent(content) || basename(file) } = data

    const filePath = file.substring(file.indexOf('/') + 1)
    const component: ComponentData = {
      path: filePath,
      link: filePath.replace(/index\.md$/, '').replace(/\.md$/, ''),
      modstore,
      modx,
      repository,
      title,
      titleLower: title.toLowerCase(),
    }

    if (author && authors[author]) {
      component.author = authors[author]
    }

    if (items) {
      component.items = generateSidebarItem(items, component.link)
    }

    return component
  })

export default class DocsComponent {
  static prepareData(
    pageData: PageData,
    siteConfig: SiteConfig,
  ): DocsPageData {
    const component = components.find(component => pageData.relativePath.startsWith(component.path.replace(/index\.md$/, '')))

    const newData = {
      ...pageData,
      component,
    }

    const titleArr: Array<string> = findPath(newData, siteConfig.userConfig).map(item => item.text)
    const title: string = titleArr.reverse().join(siteConfig.userConfig.themeConfig.titleSeparator)
    newData.title = title || pageData.title

    return newData
  }
}

export { DocsComponent }

export const { prepareData } = DocsComponent
