import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_URL = 'https://docs.modx.pro/'
export const META_TITLE = 'Docs MODX.PRO'
export const META_DESCRIPTION = 'META_DESCRIPTION'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
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
        docFooter: {
            prev: 'Previous page',
            next: 'Next page'
        },
        editLink: {
            pattern: 'https://github.com/modx-pro/Docs/edit/v2/docs/:path',
            text: 'Suggest changes to this page',
        },
    },
}
