import { defineConfig } from 'vitepress'
import { enConfig } from './en'
import { ruConfig } from './ru'

import fenomGrammar from './fenom.tmLanguage.json'
import modxGrammar from 'modx-tmlanguage/modx.tmLanguage.json'

const modx = {
  id: 'modx',
  scopeName: 'text.html.modx',
  grammar: modxGrammar,
  aliases: ['modx'],
}
const fenom = {
  id: 'fenom',
  scopeName: 'text.html.fenom',
  grammar: fenomGrammar,
  aliases: ['fenom'],
}

export default defineConfig({
  lastUpdated: true,
  markdown: {
    languages: [modx, fenom],
  },
  algolia: {
    apiKey: '6a767bbcca227a92559817e2382d8938',
    indexName: 'modx',
    appId: 'BCE7F5SAJ2',
  },
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap' }],
  ],
  themeConfig: {
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
  },
  locales: {
    root: {
      label: 'Russian',
      lang: 'ru',
      ...ruConfig,
    },
    en: {
      label: 'English',
      lang: 'en',
      ...enConfig,
    },
  },
})
