import authors from './authors.json'
import type { DocsTheme } from '../.vitepress/theme/types'
import { modxpro } from './icons'

export interface Author {
  name: string | Record<string, string>
  github: string
  avatar: string
  modstore?: string
  modxpro?: string
  website?: string
}

const authorsList: Record<string, Author> = {}

for (const [key, value] of Object.entries(authors)) {
  const data: Partial<Author> = typeof value === 'object' && value !== null ? value : {}

  authorsList[key] = {
    ...data,
    name: typeof value === 'string' ? value : value.name,
    github: `https://github.com/${key}`,
    avatar: `https://github.com/${key}.png`,
  }
}

export const coreMembers: DocsTheme.TeamMember[] = [
  {
    avatar: 'https://github.com/GulomovCreative.png',
    name: {
      ru: 'Баха Волков',
      en: 'Gulomov Bakhtovar',
    },
    org: 'codesolution.io',
    orgLink: 'https://codesolution.io',
    links: [
      { icon: 'github', link: 'https://github.com/GulomovCreative' },
      { icon:
        { svg: modxpro },
        link: 'https://modx.pro/users/gulomovcreative',
      },
    ],
  },
  {
    avatar: 'https://github.com/Ibochkarev.png',
    name: {
      ru: 'Иван Бочкарёв',
      en: 'Ivan Bochkarev',
    },
    org: 'MODX RSC',
    orgLink: 'https://github.com/modx-pro',
    links: [
      { icon: 'github', link: 'https://github.com/Ibochkarev' },
      { icon:
        { svg: modxpro },
        link: 'https://modx.pro/users/ibochkarev',
      },
    ],
  },
  {
    avatar: 'https://github.com/biz87.png',
    name: {
      ru: 'Николай Савин',
      en: 'Nikolay Savin',
    },
    org: 'MODX RSC',
    orgLink: 'https://github.com/modx-pro',
    links: [
      { icon: 'github', link: 'https://github.com/biz87' },
      { icon:
        { svg: modxpro },
        link: 'https://modx.pro/users/biz87',
      },
    ],
  },
  {
    avatar: 'https://github.com/bezumkin.png',
    name: {
      ru: 'Василий Наумкин',
      en: 'Vasiliy Naumkin',
    },
    org: 'bezumkin.ru',
    orgLink: 'https://bezumkin.ru/',
    links: [
      { icon: 'github', link: 'https://github.com/bezumkin' },
      { icon:
        { svg: modxpro },
        link: 'https://modx.pro/users/bezumkin',
      },
    ],
  },
]

export { authorsList as authors }
