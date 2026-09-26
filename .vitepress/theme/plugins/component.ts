import { createHash } from 'node:crypto'
import type { DefaultTheme, PageData, SiteConfig } from 'vitepress'
import { ensureStartingSlash, getAuthor, normalize } from '../utils.ts'

import { execFileSync } from 'node:child_process'
import { readFileSync } from 'fs'
import { basename } from 'path'
import fg from 'fast-glob'
import matter from 'gray-matter'

import { generateSidebarItem, getTitleFromContent } from './sidebar.ts'
import { normalizeCompatibility } from '../compatibility.ts'
import { categoryKeys } from '../categories.ts'

import type { Author } from '../../../docs/authors.ts'
import { findPath } from '../utils.ts'

const LOGO_CACHE_VERSION = (
  process.env.GITHUB_SHA?.slice(0, 8)
  || process.env.CI_COMMIT_SHA?.slice(0, 8)
  || ''
)

function withCacheBust(url: string): string {
  const v = createHash('md5').update(`${url}|${LOGO_CACHE_VERSION}`).digest('hex').slice(0, 8)
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

export interface ComponentLink {
  title: string
  link: string
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
  popular?: boolean
  addedAt?: string
  compatibility?: Array<string>
  usedBy?: Array<ComponentLink>

  modstore?: string
  modx?: string
  repository?: string | string[]

  items?: DefaultTheme.SidebarItem[]
}

// Дата появления компонента: самый ранний коммит, добавивший любой его файл по текущему пути.
// Перенос файла считается добавлением (--no-renames), иначе перенесённые компоненты теряют дату.
// Нужна полная история (fetch-depth: 0): в shallow-клоне даты совпадут, без git блок новинок не выводится.
function readAddedDates(): Map<string, string> {
  const dates = new Map<string, string>()
  let log = ''
  try {
    log = execFileSync(
      'git',
      [
        '-c', 'core.quotepath=off',
        'log', '--no-renames', '--diff-filter=A', '--name-only', '--format=@%aI',
        '--', 'docs/components', 'docs/en/components',
      ],
      { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] },
    )
  } catch (error) {
    console.warn(`[components] git log недоступен, блок новинок отключён: ${(error as Error).message}`)
    return dates
  }

  let date = ''
  for (const line of log.split('\n')) {
    if (line.startsWith('@')) {
      date = line.slice(1, 11)
      continue
    }
    const match = line.match(/^docs\/((?:en\/)?components\/[^/]+?)(?:\.md$|\/)/)
    // лог идёт от новых коммитов к старым, последняя запись самая ранняя
    if (match && date) dates.set(match[1], date)
  }

  return dates
}

const addedDates = readAddedDates()

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
      compatibility = [],
      items,
      modstore,
      modx,
      repository,
      description,
      popular,
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
      compatibility: normalizeCompatibility(compatibility),
      popular: popular === true,
      addedAt: addedDates.get(filePath.replace(/(\/index)?\.md$/, '')),
    }

    component.author = getAuthor(author)

    const unknown = component.categories!.filter(key => !categoryKeys.includes(key))
    if (unknown.length) {
      console.warn(`[components] ${file}: неизвестные категории ${unknown.join(', ')}`)
    }

    if (items) {
      component.items = generateSidebarItem(items, component.link)
    }

    return component
  })
  .sort((a, b) => (a.text && b.text) ? a.text.localeCompare(b.text) : 0)

function localeOf(path: string): 'en' | 'ru' {
  return path.startsWith('en/') ? 'en' : 'ru'
}

function normName(name: string): string {
  return name.trim().toLowerCase()
}

const usedByMap = new Map<string, ComponentLink[]>()

for (const component of components) {
  const locale = localeOf(component.path)
  for (const dep of component.dependencies ?? []) {
    if (typeof dep !== 'string' || !dep.trim()) continue
    const key = `${locale}:${normName(dep)}`
    const list = usedByMap.get(key) ?? []
    list.push({ title: component.title, link: component.link })
    usedByMap.set(key, list)
  }
}

for (const list of usedByMap.values()) {
  list.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
}

function usedByFor(component: ComponentData): ComponentLink[] {
  const key = `${localeOf(component.path)}:${normName(component.title)}`
  return (usedByMap.get(key) ?? []).filter(item => item.link !== component.link)
}

export default class DocsComponent {
  static prepareData(
    pageData: PageData,
    siteConfig: SiteConfig,
  ): PageData {
    const component = components.find(component => pageData.relativePath.startsWith(component.path.replace(/index\.md$/, '')))

    if (component) {
      component.usedBy = usedByFor(component)
      if (pageData.relativePath === component.path) {
        const fromPage = normalizeCompatibility(pageData.frontmatter.compatibility)
        if (fromPage.length) component.compatibility = fromPage
      }
    }

    pageData.component = component
    pageData.breadcrumbs = findPath(pageData, siteConfig.userConfig)

    const rawTitle = !pageData.frontmatter.title && pageData.breadcrumbs.length
        ? pageData.breadcrumbs.map(item => item.text).reverse().join(siteConfig.userConfig.themeConfig.titleSeparator)
        : pageData.title
    pageData.title = decodeHtmlEntities(rawTitle) ?? rawTitle

    if (
      component
      && !pageData.description
      && component.description
    ) {
      pageData.description = component.description
    } else if (pageData.description) {
      pageData.description = decodeHtmlEntities(pageData.description) ?? pageData.description
    }

    return pageData
  }
}

export { DocsComponent }

export const { prepareData } = DocsComponent
