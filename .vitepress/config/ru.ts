import type { DefaultTheme, LocaleConfig } from 'vitepress'
import type { DocsTheme } from '../theme/types'
import { generateSidebar, generateFaqSidebar } from '../theme/plugins/sidebar'
import { components } from '../theme/plugins/component'
import 'dotenv/config'

export const SITE_NAME = 'Документация компонентов MODX и не только'
export const META_DESCRIPTION = 'Простой и удобный Open-Source проект от сообщества и для сообщества, где вы можете найти и изучить документацию всех популярных компонентов MODX, а разработчики – легко описать свои'

export const searchLocale: Record<string, Partial<Omit<DefaultTheme.LocalSearchOptions, 'locales'>>> = {
  root: {
    translations: {
      button: {
        buttonText: 'Поиск',
        buttonAriaLabel: 'Поиск'
      },
      modal: {
        resetButtonTitle: 'Сбросить',
        backButtonTitle: 'Закрыть',
        noResultsText: 'Нет результатов по запросу',
        footer: {
          selectText: 'для выбора',
          selectKeyAriaLabel: 'enter',
          navigateText: 'для навигации',
          navigateUpKeyAriaLabel: 'стрелка вверх',
          navigateDownKeyAriaLabel: 'стрелка вниз',
          closeText: 'закрыть',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
}

export const config: LocaleConfig<DocsTheme.Config> = {
  root: {
    label: 'Русский',
    lang: 'ru',
    description: META_DESCRIPTION,

    head: [
      ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ],

    themeConfig: {
      nav: getNav(),

      sidebar: {
        '/components/': generateSidebar({
          root: ['docs/components/*.md', 'docs/components/*/index.md'],
          ignore: ['docs/components/index.md'],
        }),
        '/system/': getSystemSidebar(),
        '/faq/': generateFaqSidebar(),
        '/guide/': getGuideSidebar(),
      },

      outline: {
        label: 'На этой странице',
        level: 'deep',
      },

      returnToTopLabel: 'Наверх',
      sidebarMenuLabel: 'Меню',
      darkModeSwitchLabel: 'Тема',
      langMenuLabel: 'Изменить язык',
      teamSectionTitle: 'Команда',

      lastUpdated: {
        text: 'Последнее обновление',
      },

      sponsor: {
        message: 'Данный сервис является Open-Source проектом и его поддержка и развитие зависит от пожертвований.',
        linkText: 'Поддержать проект!',
        link: process.env.SPONSOR_LINK,
      },

      docFooter: {
        prev: 'Предыдущая страница',
        next: 'Следующая страница',
      },
      editLink: {
        pattern: 'https://github.com/modx-pro/Docs/edit/master/docs/:path',
        text: 'Предложить изменения на этой странице',
      },

      notFound: {
        title: 'Страница не найдена',
        quote: `
          <p>Похоже, что вы перешли по неверной или устаревшей ссылке.</p>
          <p>Информация, которую вы искали, где-то здесь. Вы можете воспользоваться поиском.</p>
          <br>
          <p>Этот сайт автоматически генерируется из файлов, расположенных на GitHub, поэтому адреса могут иногда меняться.</p>
        `,
        linkText: 'Вернуться на главную',
        linkLabel: 'Вернуться на главную',
      },

      components: components.filter(component => component.path.startsWith('components/')),
    },
  }
}

function getSystemSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Основы',
      collapsed: false,
      items: [
        {
          text: 'Синтаксис тегов',
          link: '/system/basics/tag-syntax',
        },
        {
          text: 'Фильтры ввода',
          link: '/system/basics/input-filters',
        },
        {
          text: 'Фильтры вывода',
          link: '/system/basics/output-filters',
        },
        {
          text: 'Модификаторы вывода',
          link: '/system/basics/modifiers/',
          items: [
            { text: 'Условные модификаторы', link: '/system/basics/modifiers/conditional' },
            { text: 'Модификаторы для работы со строками', link: '/system/basics/modifiers/string' },
            { text: 'Создание пользовательского модификатора', link: '/system/basics/modifiers/custom' },
            { text: 'UserInfo', link: '/system/basics/modifiers/userinfo' },
          ],
        },
      ]
    },
    {
      text: 'Утилиты',
      collapsed: false,
      items: [
        {
          text: 'Teleport',
          link: '/system/utilities/teleport/',
          collapsed: true,
          items: [
            {
              text: 'Использование',
              link: '/system/utilities/teleport/usage',
            },
            {
              text: 'Расширение',
              items: [
                { text: 'Шаблоны Извлечения', link: '/system/utilities/teleport/extension/extract-templates' },
              ],
            },
          ],
        },
      ],
    },
    {
      text: 'Что такое xPDO?',
      link: '/system/xpdo/',
      collapsed: false,
      items: [
        {
          text: 'Класс xPDO',
          link: '/system/xpdo/xpdo-class',
        },
      ],
    },
  ]
}

function getGuideSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Введение',
      items: [
        { text: 'О проекте', link: '/guide/about' },
        { text: 'Начало работы', link: '/guide/getting-started' },
        { text: 'Разметка markdown', link: '/guide/markdown' },
        { text: 'Возможности VitePress', link: '/guide/vitepress' },
        { text: 'Frontmatter', link: '/guide/frontmatter' },
      ],
    },
  ]
}

function getNav(): DefaultTheme.NavItem[] {
  const guideItems: (DefaultTheme.NavItemWithLink | DefaultTheme.NavItemChildren)[] = [
    { text: 'О проекте', link: '/guide/about' },
    { text: 'Начало работы', link: '/guide/getting-started' },
    { text: 'Разметка markdown', link: '/guide/markdown' },
    { text: 'Возможности VitePress', link: '/guide/vitepress' },
    { text: 'Frontmatter', link: '/guide/frontmatter' },
  ]

  if (process.env.SPONSOR_LINK) {
    guideItems.push({
      items: [
        { text: '❤️ Поддержать проект', link: process.env.SPONSOR_LINK }
      ],
    })
  }

  return [
    {
      text: 'Компоненты',
      link: '/components/',
      activeMatch: '/components/',
    },
    {
      text: 'Система',
      link: '/system/basics/tag-syntax',
      activeMatch: '/system/',
    },
    {
      text: 'Готовые решения',
      link: '/faq/',
      activeMatch: '/faq/',
    },
    {
      text: 'Введение',
      activeMatch: '/guide/',
      items: guideItems,
    },
  ]
}
