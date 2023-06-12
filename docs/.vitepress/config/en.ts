import type { DefaultTheme, LocaleConfig } from 'vitepress'
import type { DocsTheme } from '../theme/types'
import { generateSidebar } from '../theme/plugins/sidebar'
import { components } from '../theme/plugins/component'

export const META_URL = 'https://docs.modx.pro/'
export const META_TITLE = 'Docs MODX.PRO'
export const META_DESCRIPTION = 'META_DESCRIPTION'

export const searchLocale: Record<string, Partial<Omit<DefaultTheme.LocalSearchOptions, 'locales'>>> = {
  en: {
    translations: {
      button: {
        buttonText: 'Search',
        buttonAriaLabel: 'Search'
      },
      modal: {
        resetButtonTitle: 'Reset search',
        backButtonTitle: 'Close search',
        noResultsText: 'No results for',
        footer: {
          selectText: 'to select',
          selectKeyAriaLabel: 'enter',
          navigateText: 'to navigate',
          navigateUpKeyAriaLabel: 'up arrow',
          navigateDownKeyAriaLabel: 'down arrow',
          closeText: 'to close',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
}

export const config: LocaleConfig<DocsTheme.Config> = {
  en: {
    label: 'English',
    lang: 'en',
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
          text: 'Extras',
          link: '/en/components/',
          activeMatch: '/en/components/',
        },
        {
          text: 'Introduction',
          activeMatch: '/en/guide/',
          items: [
            { text: 'About', link: '/en/guide/about' },
            { text: 'Getting Started', link: '/en/guide/howto' },
            { text: 'Markdown', link: '/en/guide/md' },
            { text: 'VitePress Features', link: '/en/guide/vitepress' },
            { text: 'Frontmatter', link: '/en/guide/frontmatter' },
          ],
        },
      ],

      sidebar: {
        '/en/components/': generateSidebar({
          root: ['docs/en/components/*.md', 'docs/en/components/*/index.md'],
          ignore: ['docs/en/components/index.md'],
        }),
        '/en/guide/': getGuideSidebar(),
      },

      teamSectionTitle: 'Team',
      sponsor: {
        message: 'This service is free and open source, and its support and development depends on donations.',
        linkText: 'Become a sponsor!',
      },

      docFooter: {
        prev: 'Previous page',
        next: 'Next page',
      },
      editLink: {
        pattern: 'https://github.com/modx-pro/Docs/edit/vitepress/docs/:path',
        text: 'Suggest changes to this page',
      },

      components: components.filter(component => component.path.startsWith('en/components/')),
    },
  }
}

function getGuideSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      items: [
        { text: 'About', link: '/en/guide/about' },
        { text: 'Getting Started', link: '/en/guide/howto' },
        { text: 'Markdown', link: '/en/guide/md' },
        { text: 'VitePress Features', link: '/en/guide/vitepress' },
        { text: 'Frontmatter', link: '/en/guide/frontmatter' },
      ],
    },
  ]
}
