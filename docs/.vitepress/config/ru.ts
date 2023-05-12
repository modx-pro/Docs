import type { LocaleConfig } from 'vitepress'
import type { DocSearchProps } from 'vitepress/types/docsearch'
import type { DocsTheme } from '../theme/types'
import { generateSidebar } from '../theme/plugins/sidebar'
import { components } from '../theme/plugins/component'

export const META_URL = 'https://docs.modx.pro/'
export const META_TITLE = 'Docs MODX.PRO'
export const META_DESCRIPTION = 'META_DESCRIPTION'

export const searchLocale: Record<string, Partial<DocSearchProps>> = {
  root: {
    placeholder: 'Введите поиск',
    translations: {
      button: {
        buttonText: 'Поиск',
        buttonAriaLabel: 'Поиск',
      },
      modal: {
        searchBox: {
          resetButtonTitle: 'Сбросить',
          resetButtonAriaLabel: 'Сбросить',
          cancelButtonText: 'Отмена',
          cancelButtonAriaLabel: 'Отмена',
        },
        startScreen: {
          recentSearchesTitle: 'Недавние',
          noRecentSearchesText: 'Нет недавних запросов',
          saveRecentSearchButtonTitle: 'Сохранить',
          removeRecentSearchButtonTitle: 'Удалить этот запрос из истории',
          favoriteSearchesTitle: 'Сохранить запрос',
          removeFavoriteSearchButtonTitle: 'Удалить этот запрос из сохранённых',
        },
        errorScreen: {
          titleText: 'Не удалось получить результаты',
          helpText: 'Проверьте подключение к интернету',
        },
        footer: {
          selectText: 'выбрать',
          navigateText: 'навигация',
          closeText: 'закрыть',
          searchByText: 'Поиск реализован',
        },
        noResultsScreen: {
          noResultsText: 'Нет результатов',
          suggestedQueryText: 'Попробуйте другие запросы',
          reportMissingResultsText: 'Считаете, что данный запрос должен вернуть результаты?',
          reportMissingResultsLinkText: 'Дайте нам знать',
        },
      },
    },
  },
}

export const config: LocaleConfig<DocsTheme.Config> = {
  root: {
    label: 'Russian',
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
          link: '/system/',
          activeMatch: '/system/',
        },
        {
          text: 'Готовые решения',
          link: '/faq/',
          activeMatch: '/faq/',
        },
        {
          text: 'О проекте',
          link: '/guide/',
          activeMatch: '/guide/',
        },
      ],

      sidebar: {
        '/components/': generateSidebar({
          root: ['docs/components/*.md', 'docs/components/*/index.md'],
          ignore: ['docs/components/index.md'],
        }),
        '/system/': generateSidebar({
          root: 'docs/system/*/index.md',
          collapsed: false,
        }),
        '/faq/': generateSidebar({
          root: 'docs/faq/*/index.md',
          collapsed: false,
        }),
        '/guide/': generateSidebar({
          root: 'docs/guide/index.md',
          collapsed: false,
        }),
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
