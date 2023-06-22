import type { DocsTheme } from '../theme/types'
import { createContentLoader, defineConfigWithTheme } from 'vitepress'
import { config as en, searchLocale as searchLocaleEn } from './en'
import { config as root, searchLocale as searchLocaleRu } from './ru'
import languages from '../theme/syntaxes'
import { addPlugins } from '../theme/plugins/markdown'
import { components, prepareData } from '../theme/plugins/component'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { slugify } from 'transliteration'
import { fileURLToPath, URL } from 'node:url'
import { modhost, modstore, modxpro, telegram } from '../../icons'

const SITE_TITLE = 'docs.modx.pro'
const SITE_TITLE_SEPARATOR = ' / '

export default defineConfigWithTheme<DocsTheme.Config>({
  lastUpdated: true,
  cleanUrls: true,

  title: SITE_TITLE,
  titleTemplate: ':title' + SITE_TITLE_SEPARATOR + SITE_TITLE,

  markdown: {
    // @ts-expect-error
    languages,
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },

    anchor: {
      slugify(str) {
        str = str.trim()
            .replace(/^\d*/g, '') // Удаление чисел из начала строки
            .replace(/[^a-zA-Zа-яА-ЯЁё0-9\-\s]/g, '') // Удаление ненужных символов
            .replace(/\s\-\s/, '-').replace(/\-+/g, '-') // Избавление от повторяющихся символов
            .replace(/^(.{25}[^\s]*).*/, '$1') // Ограничение количества символов

        return encodeURIComponent(slugify(str, { lowercase: true }))
      }
    },

    config (md) {
      addPlugins(md)
    },
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap' }],

    ['link', { rel: 'icon', href: '/favicon.ico?v=2', sizes: 'any' }],
    ['link', { rel: 'icon', href: '/icon.svg?v=2', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=2' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
  ],

  themeConfig: {
    titleSeparator: SITE_TITLE_SEPARATOR,
    i18nRouting: true,

    logo: {
      light: 'logo.svg',
      dark: 'logo-dark.svg',
    },

    socialLinks: [
      {
        icon: { svg: modhost },
        link: 'https://modhost.pro',
      },
      {
        icon: { svg: modstore },
        link: 'https://modstore.pro',
      },
      {
        icon: { svg: modxpro },
        link: 'https://modx.pro',
      },
      { icon: 'github', link: 'https://github.com/modx-pro/Docs' },
      {
        icon: { svg: telegram },
        link: 'https://t.me/ru_modx',
      },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          ...searchLocaleRu,
          ...searchLocaleEn,
        },
      },
    },

    components,
  },

  locales: {
    ...root,
    ...en,
  },

  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://docs.modx.pro/' })
    const pages = await createContentLoader('**/*.md').load()
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))

    sitemap.pipe(writeStream)
    pages.forEach((page) => sitemap.write(page))
    sitemap.end()

    await new Promise((r) => writeStream.on('finish', r))
  },

  transformPageData(pageData, { siteConfig }) {
    return prepareData(pageData, siteConfig)
  },

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/components/DocsSidebar.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPDocFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/components/DocsDocFooter.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBarTranslations\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/components/DocsNavBarTranslations.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavScreenTranslations\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/components/DocsNavScreenTranslations.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPLocalSearchBox\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/components/DocsLocalSearchBox.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/components/DocsNavBar.vue', import.meta.url)
          )
        },
      ],
    },
  },
})
