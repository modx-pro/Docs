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

const SITE_TITLE = 'docs.modx.pro'
const SITE_TITLE_SEPARATOR = ' / '

export default defineConfigWithTheme<DocsTheme.Config>({
  lastUpdated: true,
  cleanUrls: true,

  title: SITE_TITLE,
  titleTemplate: ':title' + SITE_TITLE_SEPARATOR + SITE_TITLE,

  markdown: {
    // @ts-ignore
    languages,
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
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

    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
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
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="enable-background:new 0 0 409.6 414" viewBox="0 0 409.6 414"><path d="M99.6 414h293c9.4 0 17-7.6 17-17V17c0-9.4-7.6-17-17-17h-293C88.1 0 77.7 6.9 73.4 17.6L0 196.2c-2.8 6.9-2.8 14.6 0 21.5l73.4 178.7c4.3 10.7 14.7 17.6 26.2 17.6z" style="fill:#4b8aca"/><path d="M314.1 70.3c-13.3 0-24 10.7-24 24v84.3H181.8V94.3c0-13.3-10.7-24-24-24s-24 10.7-24 24v220.1c0 13.3 10.7 24 24 24s24-10.7 24-24v-94.5h108.3v94.5c0 13.3 10.7 24 24 24s24-10.7 24-24V94.3c0-13.2-10.8-24-24-24z" style="fill:#fff"/></svg>',
        },
        link: 'https://modhost.pro',
      },
      {
        icon: {
          svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.32532 1.95984C9.04573 0.74492 10.3535 0 11.7659 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H11.7659C10.3535 32 9.04573 31.2551 8.32532 30.0402L1.20974 18.0402C0.463881 16.7823 0.463881 15.2177 1.20974 13.9598L8.32532 1.95984Z" fill="#1ABC9C"/><path d="M18.5574 24C17.531 24 16.5474 23.8379 15.6066 23.5138C14.6658 23.175 13.9082 22.7403 13.334 22.2099L14.342 19.5138C14.8918 19.9853 15.5394 20.3757 16.2847 20.6851C17.0423 20.9797 17.8059 21.1271 18.5757 21.1271C19.1622 21.1271 19.6326 21.0608 19.9869 20.9282C20.3535 20.7808 20.6223 20.582 20.7933 20.3315C20.9644 20.081 21.0499 19.7937 21.0499 19.4696C21.0499 19.0571 20.9155 18.733 20.6467 18.4972C20.3779 18.2468 20.0236 18.0479 19.5837 17.9006C19.1438 17.7385 18.6551 17.5912 18.1175 17.4586C17.5921 17.3112 17.0606 17.1344 16.523 16.9282C15.9976 16.7219 15.515 16.4567 15.0751 16.1326C14.6352 15.8085 14.2748 15.3812 13.9938 14.8508C13.725 14.3204 13.5906 13.6427 13.5906 12.8177C13.5906 11.9337 13.7861 11.1308 14.1771 10.4088C14.5803 9.67219 15.179 9.09024 15.9732 8.66298C16.7796 8.22099 17.7876 8 18.9972 8C19.8036 8 20.5978 8.11786 21.3798 8.35359C22.1618 8.57458 22.8521 8.91344 23.4508 9.37016L22.5344 12.0884C21.9357 11.6759 21.337 11.3738 20.7383 11.1823C20.1396 10.9761 19.5532 10.8729 18.9789 10.8729C18.4046 10.8729 17.9342 10.954 17.5677 11.116C17.2011 11.2781 16.9384 11.4917 16.7796 11.7569C16.6207 12.0074 16.5413 12.302 16.5413 12.6409C16.5413 13.0387 16.6757 13.3628 16.9445 13.6133C17.2133 13.849 17.5677 14.0405 18.0075 14.1878C18.4474 14.3352 18.93 14.4825 19.4554 14.6298C19.993 14.7772 20.5245 14.9466 21.0499 15.1381C21.5875 15.3296 22.0763 15.5875 22.5161 15.9116C22.956 16.2357 23.3103 16.663 23.5791 17.1934C23.8601 17.7238 24.0007 18.3941 24.0007 19.2044C24.0007 20.0737 23.799 20.8692 23.3958 21.5912C22.9926 22.3131 22.3878 22.895 21.5814 23.337C20.7872 23.779 19.7792 24 18.5574 24Z" fill="#FDFDFE"/></svg>',
        },
        link: 'https://modstore.pro',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 457.8 465.9"><path d="M0 210.9V0l105.5 89.2L210.9 0v210.9H0zm449.9-105.4c0 58.2-47.2 105.5-105.5 105.5S239 163.7 239 105.5 286.2 0 344.4 0s105.5 47.2 105.5 105.5zM0 255v210.9h113.2v-.3c47.5-4.1 84.9-49.6 84.9-105.2 0-55.5-37.4-101-84.9-105.2v-.2H0zm313.2 0H191.7l126.9 210.9h123.7L313.2 255zm129.2 34.5c-2.4 0-4.7-.4-6.7-1.1-2-.7-3.8-1.8-5.3-3.1-1.5-1.4-2.7-2.9-3.5-4.7-.8-1.8-1.2-3.8-1.2-6s.4-4.1 1.2-5.9c.8-1.8 2-3.4 3.5-4.7 1.5-1.4 3.3-2.4 5.3-3.1 2-.7 4.3-1.1 6.6-1.1 2.4 0 4.6.4 6.6 1.1 2 .7 3.8 1.8 5.3 3.1s2.7 2.9 3.5 4.7c.8 1.8 1.2 3.8 1.2 5.9s-.4 4.1-1.2 6c-.8 1.8-2 3.4-3.5 4.7-1.5 1.3-3.3 2.4-5.3 3.1-1.9.7-4.1 1.1-6.5 1.1zm-.1-4.7c1.6 0 3-.2 4.3-.7 1.3-.5 2.5-1.2 3.5-2.1 1-.9 1.7-2 2.3-3.2.6-1.2.8-2.6.8-4.1s-.3-2.8-.8-4.1c-.5-1.2-1.3-2.3-2.3-3.2-1-.9-2.1-1.7-3.5-2.2-1.3-.5-2.8-.7-4.3-.7s-3 .2-4.3.7c-1.3.5-2.4 1.2-3.5 2.2-1 .9-1.7 2-2.3 3.2-.5 1.2-.8 2.6-.8 4.1 0 1.5.3 2.8.8 4.1.6 1.2 1.3 2.3 2.3 3.3 1 .9 2.1 1.6 3.5 2.1 1.3.3 2.8.6 4.3.6z"/><path fill-rule="evenodd" d="M363.7 289.1v-29h12.8c2.7 0 5.1.4 7 1.2 2 .8 3.5 2 4.6 3.6 1.1 1.5 1.6 3.4 1.6 5.5s-.5 4-1.6 5.5-2.6 2.7-4.6 3.6c-2 .8-4.3 1.2-7 1.2h-7v8.4h-5.8zm18.2-14.4c-1.3 1-3.2 1.5-5.7 1.5h-6.7v-11.5h6.7c2.5 0 4.5.5 5.7 1.5 1.3 1 1.9 2.4 1.9 4.3.1 1.8-.6 3.2-1.9 4.2zm13.5 14.4v-29h12.8c2.7 0 5.1.4 7 1.2 2 .8 3.5 2 4.6 3.6 1.1 1.5 1.6 3.4 1.6 5.5s-.5 4-1.6 5.5-2.6 2.7-4.6 3.5c-.1.1-.3.1-.4.2l7.1 9.5h-6.2l-6.3-8.5h-8.2v8.4h-5.8zm18.2-14.4c-1.3 1-3.2 1.5-5.7 1.5h-6.7v-11.5h6.7c2.5 0 4.4.5 5.7 1.5 1.3 1 1.9 2.4 1.9 4.3.1 1.8-.6 3.2-1.9 4.2z" clip-rule="evenodd"/></svg>',
        },
        link: 'https://modx.pro',
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
      },
    },

    components,
  },

  locales: {
    ...root,
    ...en,
  },

  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'http://new-docs.modx.pro/' })
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
      ],
    },
  },
})
