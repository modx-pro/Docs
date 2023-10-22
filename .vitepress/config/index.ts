import type { DocsTheme } from '../theme/types'
import type { DocsPageData } from '../theme/plugins/component'
import { type HeadConfig, defineConfigWithTheme } from 'vitepress'
import { config as en, searchLocale as searchLocaleEn } from './en'
import { config as root, searchLocale as searchLocaleRu } from './ru'
import languages from '../theme/syntaxes'
import { addPlugins } from '../theme/plugins/markdown'
import { components, prepareData } from '../theme/plugins/component'
import { slugify } from 'transliteration'
import { fileURLToPath, URL } from 'node:url'
import { modhost, modstore, modxpro, telegram } from '../../docs/icons'
import { coreMembers } from '../../docs/authors'
import { normalize } from 'vitepress/dist/client/shared'

const SITE_HOST = 'https://docs.modx.pro/'
const SITE_TITLE = 'docs.modx.pro'
const SITE_TITLE_SEPARATOR = ' / '

export default defineConfigWithTheme<DocsTheme.Config>({
  lastUpdated: true,
  cleanUrls: true,

  title: SITE_TITLE,
  titleTemplate: ':title' + SITE_TITLE_SEPARATOR + SITE_TITLE,
  srcDir: './docs',

  markdown: {
    // @ts-expect-error
    languages,
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
    container: {
      tipLabel: 'Подсказка',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      infoLabel: 'Информация',
      detailsLabel: 'Подробнее',
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

    [
      'script',
      {},
      `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(24242593, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:false,
        trackHash:true,
      });`,
    ],
  ],

  themeConfig: {
    titleSeparator: SITE_TITLE_SEPARATOR,
    i18nRouting: true,

    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
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
      {
        icon: { svg: telegram },
        link: 'https://t.me/ru_modx',
      },
      { icon: 'github', link: 'https://github.com/modx-pro/Docs' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          ...searchLocaleRu,
          ...searchLocaleEn,
        },
        miniSearch: {
          options: {
            // @ts-expect-error
            fields: ['title', 'titles', 'text', 'isComponentIndex'],
            storeFields: ['title', 'titles', 'isComponentIndex'],
            extractField(document, fieldName) {
              if (fieldName === 'isComponentIndex') {
                return /(?<=(\/en)?)\/components\/(\w*)\/?(#\w+)?$/.test(document.id)
              }

              return document[fieldName]
            },
          },
          searchOptions: {
            boostDocument(documentId, term, storedFields) {
              if (storedFields?.isComponentIndex) return 2.0
              return 1.0
            },
          },
        },
      },
    },

    components,
  },

  locales: {
    ...root,
    ...en,
  },

  transformPageData(pageData, { siteConfig }) {
    return prepareData(pageData, siteConfig)
  },

  transformHead({ pageData }: { pageData: DocsPageData }) {
    const title = pageData.title + SITE_TITLE_SEPARATOR + SITE_TITLE
    const image = pageData?.component?.logo || SITE_HOST + 'og-default.png'
    const type = pageData.component ? 'article' : 'website'
    const url = SITE_HOST + normalize(pageData.relativePath)
    const author = pageData?.component?.author?.modxpro
        || pageData?.component?.author?.github
        || coreMembers.at(0)?.links?.find(item => item.link.startsWith('https://modx.pro/'))?.link

    const output: HeadConfig[] = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:type', content: type }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],

      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { property: 'twitter:domain', content: 'docs.modx.pro' }],
      ['meta', { property: 'twitter:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:image', content: image }],
    ]

    if (pageData.description) {
      output.push(
        ['meta', { property: 'og:description', content: pageData.description }],
        ['meta', { name: 'twitter:description', content: pageData.description }],
      )
    }

    if (pageData.component && author) {
      output.push(
        ['meta', { property: 'article:author', content: author }],
      )
    }

    return output
  },

  vite: {
    resolve: {
      alias: [
        'VPSidebar',
        'VPDocFooter',
        'VPNavBarTranslations',
        'VPNavScreenTranslations',
        'VPLocalSearchBox',
        'VPNavBar',
      ].map(componentName => ({
        find: new RegExp(`^.*\/${componentName}\.vue$`),
        replacement: fileURLToPath(
          new URL(`../theme/components/${componentName.replace(/^VP/, 'Docs')}.vue`, import.meta.url)
        )
      })),
    },
  },

  sitemap: {
    hostname: SITE_HOST,
  },
})
