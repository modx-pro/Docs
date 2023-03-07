import type { LocaleSpecificConfig } from 'vitepress'
import type { DocsThemeConfig } from '../theme/types'
import { ruMenu } from "./ruMenu";

export const META_URL = 'https://docs.modx.pro/'
export const META_TITLE = 'Docs MODX.PRO'
export const META_DESCRIPTION = 'META_DESCRIPTION'

export const ruConfig: LocaleSpecificConfig<DocsThemeConfig> = {
    title: 'Docs MODX.pro',
    description: META_DESCRIPTION,
    head: [
        ['meta', { property: 'og:url', content: META_URL }],
        ['meta', { property: 'og:description', content: META_DESCRIPTION }],
        ['meta', { property: 'twitter:url', content: META_URL }],
        ['meta', { property: 'twitter:title', content: META_TITLE }],
        ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap' }],
    ],

    themeConfig: {
        sidebar: [...ruMenu],
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
