import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import type { HeadConfig, PageData } from 'vitepress'
import type { Author } from '../../docs/authors.ts'
import type { ComponentData } from '../theme/plugins/component.ts'
import { categoryLabel } from '../theme/categories.ts'
import { normalize } from '../theme/utils.ts'
import { META_DESCRIPTION as EN_DESCRIPTION, SITE_NAME as EN_NAME } from './en.ts'
import { META_DESCRIPTION as RU_DESCRIPTION, SITE_NAME as RU_NAME } from './ru.ts'

const SITE_HOST = 'https://docs.modx.pro/'

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '../../docs')
const pages = new Set(fg.sync('**/*.md', { cwd: DOCS }))

type Lang = 'ru' | 'en'

interface SeoPage {
  pageData: PageData
  url: string
  image: string
}

function isEnglish(relativePath: string): boolean {
  return relativePath === 'en' || relativePath.startsWith('en/')
}

function isHome(relativePath: string): boolean {
  return relativePath === 'index.md' || relativePath === 'en/index.md'
}

export function pageUrl(relativePath: string): string {
  const path = normalize(relativePath)
  return path ? SITE_HOST + path : SITE_HOST
}

function sitePath(relativePath: string): string {
  const path = normalize(relativePath)
  return path ? `/${path}` : '/'
}

function samePath(left: string, right: string): boolean {
  const strip = (value: string) => value.replace(/^\/+/, '').replace(/\/+$/, '')
  return strip(left) === strip(right)
}

export function pageDescription(pageData: PageData): string {
  if (pageData.description) return pageData.description
  return isEnglish(pageData.relativePath) ? EN_DESCRIPTION : RU_DESCRIPTION
}

function pairPath(relativePath: string): string | undefined {
  if (relativePath.startsWith('en/')) {
    const ru = relativePath.slice(3)
    return pages.has(ru) ? ru : undefined
  }
  const en = `en/${relativePath}`
  return pages.has(en) ? en : undefined
}

function authorName(author: Author, lang: Lang): string | undefined {
  if (typeof author.name === 'string') return author.name
  return author.name[lang] || author.name.ru || author.name.en || Object.values(author.name)[0]
}

function sameAs(component: ComponentData): string[] {
  const urls: string[] = []
  if (typeof component.repository === 'string') urls.push(component.repository)
  else if (Array.isArray(component.repository)) urls.push(...component.repository)
  if (component.modstore) urls.push(component.modstore)
  const author = component.author
  if (author) {
    if (author.github) urls.push(author.github)
    if (author.modxpro) urls.push(author.modxpro)
    if (author.website) urls.push(author.website)
    if (author.modstore) urls.push(author.modstore)
  }
  return [...new Set(urls.filter(url => /^https?:\/\//.test(url)))]
}

function softwareApplication(component: ComponentData, url: string, lang: Lang): Record<string, unknown> {
  const about: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    name: component.title,
    url,
  }
  const category = component.categories?.find(key => key)
  if (category) about.applicationCategory = categoryLabel(category, lang)
  const links = sameAs(component)
  if (links.length) about.sameAs = links
  const author = component.author
  const name = author ? authorName(author, lang) : undefined
  if (author && name) {
    const person: Record<string, unknown> = { '@type': 'Person', name }
    const personUrl = author.website || author.modxpro || author.github
    if (personUrl) person.url = personUrl
    about.author = person
  }
  return about
}

function breadcrumbList(pageData: PageData): Record<string, unknown> | undefined {
  const current = sitePath(pageData.relativePath)
  const items: Array<{ text: string, link: string }> = []
  for (const item of pageData.breadcrumbs ?? []) {
    if (!item.text || !item.link) continue
    items.push({ text: item.text, link: item.link })
  }
  const last = items.at(-1)
  if (!last || !samePath(last.link, current)) {
    const text = pageData.frontmatter.title || pageData.title
    if (typeof text === 'string' && text) items.push({ text, link: current })
  }
  if (!items.length) return
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.text,
      item: item.link.startsWith('http') ? item.link : SITE_HOST + item.link.replace(/^\/+/, ''),
    })),
  }
}

function jsonLd({ pageData, url, image }: SeoPage): HeadConfig {
  const lang: Lang = isEnglish(pageData.relativePath) ? 'en' : 'ru'
  const home = lang === 'en' ? `${SITE_HOST}en/` : SITE_HOST
  const websiteId = `${home}#website`
  const siteName = lang === 'en' ? EN_NAME : RU_NAME
  const siteDescription = lang === 'en' ? EN_DESCRIPTION : RU_DESCRIPTION
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteName,
      url: home,
      description: siteDescription,
      inLanguage: lang,
      publisher: {
        '@type': 'Organization',
        name: siteName,
        url: home,
      },
    },
  ]

  if (!isHome(pageData.relativePath)) {
    const article: Record<string, unknown> = {
      '@type': 'TechArticle',
      headline: pageData.title,
      description: pageDescription(pageData),
      url,
      inLanguage: lang,
      image,
      isPartOf: { '@id': websiteId },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    }
    if (pageData.lastUpdated && pageData.frontmatter.lastUpdated !== false) {
      article.dateModified = new Date(pageData.lastUpdated).toISOString()
    }
    const component = pageData.component
    if (component && pageData.relativePath === component.path) {
      article.about = softwareApplication(component, url, lang)
    }
    graph.push(article)
    const crumbs = breadcrumbList(pageData)
    if (crumbs) graph.push(crumbs)
  }

  const payload = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c')

  return ['script', { type: 'application/ld+json' }, payload]
}

export function buildSeoHead(page: SeoPage): HeadConfig[] {
  const { pageData, url } = page
  const lang: Lang = isEnglish(pageData.relativePath) ? 'en' : 'ru'
  const head: HeadConfig[] = [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:locale', content: lang === 'en' ? 'en_US' : 'ru_RU' }],
  ]

  const pair = pairPath(pageData.relativePath)
  if (pair) {
    const ru = lang === 'en' ? pair : pageData.relativePath
    const en = lang === 'en' ? pageData.relativePath : pair
    head.push(
      ['meta', { property: 'og:locale:alternate', content: lang === 'en' ? 'ru_RU' : 'en_US' }],
      ['link', { rel: 'alternate', hreflang: 'ru', href: pageUrl(ru) }],
      ['link', { rel: 'alternate', hreflang: 'en', href: pageUrl(en) }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: pageUrl(ru) }],
    )
  }

  head.push(jsonLd(page))
  return head
}
