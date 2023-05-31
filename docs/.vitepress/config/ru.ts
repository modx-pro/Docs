import type { DefaultTheme, LocaleConfig } from 'vitepress'
import type { DocsTheme } from '../theme/types'
import { generateSidebar } from '../theme/plugins/sidebar'
import { components } from '../theme/plugins/component'

export const META_URL = 'https://docs.modx.pro/'
export const META_TITLE = 'Docs MODX.PRO'
export const META_DESCRIPTION = 'META_DESCRIPTION'

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
      ['meta', { property: 'og:url', content: META_URL }],
      ['meta', { property: 'og:description', content: META_DESCRIPTION }],
      ['meta', { property: 'twitter:url', content: META_URL }],
      ['meta', { property: 'twitter:title', content: META_TITLE }],
      ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
    ],

    themeConfig: {
      nav: [
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
          text: 'О проекте',
          link: '/guide/about',
          activeMatch: '/guide/',
        },
      ],

      sidebar: {
        '/components/': generateSidebar({
          root: ['docs/components/*.md', 'docs/components/*/index.md'],
          ignore: ['docs/components/index.md'],
        }),
        '/system/': getSystemSidebar(),
        '/faq/': getFaqSidebar(),
        '/guide/': getGuideSidebar(),
      },

      outlineTitle: 'На этой странице',
      returnToTopLabel: 'Наверх',
      sidebarMenuLabel: 'Меню',
      darkModeSwitchLabel: 'Тема',
      lastUpdatedText: 'Последнее обновление',
      langMenuLabel: 'Изменить язык',
      teamSectionTitle: 'Команда',

      sponsor: {
        message: 'Данный сервис является Open-Source проектом и его поддержка и развитие зависит от пожертвований.',
        linkText: 'Поддержать проект!',
      },

      docFooter: {
        prev: 'Предыдущая страница',
        next: 'Следующая страница',
      },
      editLink: {
        pattern: 'https://github.com/modx-pro/Docs/edit/vitepress/docs/:path',
        text: 'Предложить изменения на этой странице',
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
          link: 'system/utilities/teleport/',
          collapsed: true,
          items: [
            {
              text: 'Использование',
              link: 'system/utilities/teleport/usage',
            },
            {
              text: 'Расширение',
              items: [
                { text: 'Шаблоны Извлечения', link: 'system/utilities/teleport/extension/extract-templates' },
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

function getFaqSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Ace',
      collapsed: false,
      items: [
        { text: 'MODX Ace Material Theme', link: '/faq/ace/modx-ace-material-theme' },
      ],
    },
    {
      text: 'TinyMCE Rich Text Editor',
      collapsed: false,
      items: [
        { text: 'Добавление кастомных кнопок', link: '/faq/tinymce-rte/add-custom-buttons' },
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
        { text: 'Начало работы', link: '/guide/howto' },
        { text: 'Разметка markdown', link: '/guide/md' },
        { text: 'Возможности Vitepress', link: '/guide/vitepress' },
        { text: 'Виджеты с Frontmatter', link: '/guide/frontmatter' },
      ],
    },
  ]
}
