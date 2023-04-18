import type { LocaleConfig } from 'vitepress'
import type { DocSearchProps } from 'vitepress/types/docsearch'
import type { DocsThemeConfig } from '../theme'
import ruMenu from './ruMenu'

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

export const config: LocaleConfig<DocsThemeConfig> = {
  root: {
    label: 'Russian',
    lang: 'ru',
    title: 'Docs MODX.pro',
    description: META_DESCRIPTION,
    head: [
      ['meta', { property: 'og:url', content: META_URL }],
      ['meta', { property: 'og:description', content: META_DESCRIPTION }],
      ['meta', { property: 'twitter:url', content: META_URL }],
      ['meta', { property: 'twitter:title', content: META_TITLE }],
      ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
    ],

    themeConfig: {
      sidebar: ruMenu,
      outlineTitle: 'На этой странице',
      returnToTopLabel: 'Наверх',
      sidebarMenuLabel: 'Меню',
      darkModeSwitchLabel: 'Тема',
      lastUpdatedText: 'Последнее обновление',
      ecosystemLabel: 'Другие продукты',
      docFooter: {
        prev: 'Предыдущая страница',
        next: 'Следующая страница'
      },
      editLink: {
        pattern: 'https://github.com/modx-pro/Docs/edit/v2/docs/:path',
        text: 'Предложить изменения на этой странице',
      },
    },
  }
}
