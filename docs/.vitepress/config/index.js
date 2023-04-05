import { defineConfig } from 'vitepress'
import { config as en } from './en'
import { config as root } from './ru'
import languages from '../theme/syntaxes'
import { containerPlugin } from '../theme/plugins/containers'

export default defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  base: '/Docs/',

  markdown: {
    languages,

    config (md) {
      containerPlugin(md)
    },
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap' }],
  ],

  themeConfig: {
    i18nRouting: false,

    logo: {
      light: 'logo.svg',
      dark: 'logo-dark.svg',
    },

    ecosystem: [
      { text: 'modhost.pro', link: 'https://modhost.pro', logo: 'modhost.png' },
      { text: 'modstore.pro', link: 'https://modstore.pro', logo: 'modstore.svg' },
      { text: 'modx.pro', link: 'https://modx.pro', logo: 'modxpro.png' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/modx-pro/Docs' },
    ],

    algolia: {
      appId: 'BCE7F5SAJ2',
      apiKey: '6a767bbcca227a92559817e2382d8938',
      indexName: 'modx',
    },
  },

  locales: {
    ...root,
    ...en,
  },
})
