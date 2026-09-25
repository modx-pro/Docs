import { createHash } from 'node:crypto'
import type { DocsTheme } from '../theme/types/index.ts'
import { type HeadConfig, defineConfigWithTheme } from 'vitepress'
import { config as en, searchLocale as searchLocaleEn } from './en.ts'
import { config as root, searchLocale as searchLocaleRu } from './ru.ts'
import languages from '../theme/syntaxes/index.ts'
import { darkTheme, lightTheme } from '../theme/syntaxes/themes.ts'
import { addPlugins } from '../theme/plugins/markdown.ts'
import { components, prepareData } from '../theme/plugins/component.ts'
import { headingSlug } from '../theme/anchors.ts'
import { fileURLToPath, URL } from 'node:url'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { modstore, modxpro, telegram } from '../../docs/icons.ts'
import { coreMembers } from '../../docs/authors.ts'
import { normalize } from '../theme/utils.ts'

const SITE_HOST = 'https://docs.modx.pro/'
const SITE_TITLE = 'docs.modx.pro'
const SITE_TITLE_SEPARATOR = ' / '

const OG_CACHE_VERSION = (
  process.env.GITHUB_SHA?.slice(0, 8)
  || process.env.CI_COMMIT_SHA?.slice(0, 8)
  || ''
)

function getComponentSlug(component: { path: string }): string {
  const base = component.path
    .replace(/^(?:docs\/)?(?:en\/)?components\//, '')
    .split('/')[0] ?? ''
  return base.replace(/\.md$/, '')
}

function getOgImageVersion(input: unknown): string {
  const payload = typeof input === 'string'
    ? input
    : (JSON.stringify(input) ?? String(input))
  return createHash('md5').update(payload).digest('hex').slice(0, 8)
}

// Runs before the app paints. Dev shell does not include config.head, so the
// same source is also injected via transformIndexHtml.
const readabilityLayoutScript = `(function () {
  try {
    var mode = localStorage.getItem('vitepress-nolebase-enhanced-readabilities-layout-switch-mode');
    var classes = {
      '1': 'VPNolebaseEnhancedReadabilitiesLayoutSwitchFullWidth',
      '4': 'VPNolebaseEnhancedReadabilitiesLayoutSwitchSidebarWidthAdjustableOnly',
      '5': 'VPNolebaseEnhancedReadabilitiesLayoutSwitchBothWidthAdjustable'
    };
    var cls = classes[mode];
    if (cls) document.documentElement.classList.add(cls);
    var wide = window.matchMedia('(min-width: 1440px)').matches;
    function pct(key, fallback) {
      var raw = localStorage.getItem(key);
      var n = raw == null ? fallback : parseInt(raw, 10);
      if (!wide || !n || isNaN(n)) return '100%';
      return Math.ceil(n / 100) + '%';
    }
    var root = document.documentElement;
    root.style.setProperty('--vp-nolebase-enhanced-readabilities-page-max-width', pct('vitepress-nolebase-enhanced-readabilities-page-layout-max-width', 10000));
    root.style.setProperty('--vp-nolebase-enhanced-readabilities-content-max-width', pct('vitepress-nolebase-enhanced-readabilities-content-layout-max-width', 8000));
  } catch (e) {}
})();`

export default withMermaid(
  defineConfigWithTheme<DocsTheme.Config>({
  lastUpdated: true,
  cleanUrls: true,

  mermaid: {
    securityLevel: 'loose',
    startOnLoad: false,
    // Mermaid 12 defaults to the ELK layout, the new look and narrower labels, keep the previous appearance
    layout: 'dagre',
    look: 'classic',
    theme: 'default',
    flowchart: {
      wrappingWidth: 200,
      minNodeWidth: 0,
    },
    state: {
      wrappingWidth: 200,
      minNodeWidth: 0,
    },
  },

  title: SITE_TITLE,
  titleTemplate: ':title' + SITE_TITLE_SEPARATOR + SITE_TITLE,
  srcDir: './docs',

  markdown: {
    languages,
    theme: {
      light: lightTheme,
      dark: darkTheme,
    },
    container: {
      tipLabel: 'Подсказка',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      infoLabel: 'Информация',
      detailsLabel: 'Подробнее',
    },
    anchor: {
      slugify: headingSlug,
    },
    config(md) {
      addPlugins(md)
    },
    image: {
      lazyLoading: true
    }
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap' }],

    ['link', { rel: 'icon', href: '/favicon.ico?v=2', sizes: 'any' }],
    ['link', { rel: 'icon', href: '/icon.svg?v=2', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=2' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],

    ['script', {}, readabilityLayoutScript],

    [
      'script',
      {},
      `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(103589705, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:false,
        trackHash:true,
      });`,
    ],
  ],

  themeConfig: {
    titleSeparator: SITE_TITLE_SEPARATOR,
    i18nRouting: true,

    logo: {
      light: '/logo.svg',
      dark: '/logo-dark.svg',
    },

    socialLinks: [
      {
        icon: { svg: modstore },
        link: 'https://modstore.pro',
      },
      {
        icon: { svg: modxpro },
        link: 'https://modx.pro',
      },
      {
        icon: { svg: telegram },
        link: 'https://t.me/ru_modx',
      },
      { icon: 'github', link: 'https://github.com/modx-pro/Docs' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          ...searchLocaleRu,
          ...searchLocaleEn,
        },
        detailedView: false,
        miniSearch: {
          options: {
            // @ts-expect-error
            fields: ['title', 'titles', 'text', 'isComponentIndex'],
            storeFields: ['title', 'titles', 'isComponentIndex'],
            extractField(document, fieldName) {
              if (fieldName === 'isComponentIndex') {
                return /(?<=(\/en)?)\/components\/(\w*)\/?(#\w+)?$/.test(document.id)
              }

              return document[fieldName]
            },
          },
          searchOptions: {
            boostDocument(documentId, term, storedFields) {
              if (storedFields?.isComponentIndex) return 2.0
              return 1.0
            },
          },
        },
      },
    },

    components,
  },

  locales: {
    ...root,
    ...en,
  },

  transformPageData(pageData, { siteConfig }) {
    return prepareData(pageData, siteConfig)
  },

  transformHead({ pageData }: { pageData }) {
    const title = pageData.title + SITE_TITLE_SEPARATOR + SITE_TITLE
    const image = pageData?.component
      ? SITE_HOST + 'og/' + getComponentSlug(pageData.component) + '.png?v=' + getOgImageVersion({
          v: OG_CACHE_VERSION,
          slug: getComponentSlug(pageData.component),
          title: pageData.component.title,
          description: pageData.component.description,
          logo: pageData.component.logo,
        })
      : SITE_HOST + 'og-default.png?v=' + getOgImageVersion({ v: OG_CACHE_VERSION, type: 'default' })
    const type = pageData.component ? 'article' : 'website'
    const url = SITE_HOST + normalize(pageData.relativePath)
    const author = pageData?.component?.author?.modxpro
      || pageData?.component?.author?.github
      || coreMembers.at(0)?.links?.find(item => item.link.startsWith('https://modx.pro/'))?.link

    const output: HeadConfig[] = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:type', content: type }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],

      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { property: 'twitter:domain', content: 'docs.modx.pro' }],
      ['meta', { property: 'twitter:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:image', content: image }],
    ]

    if (pageData.description) {
      output.push(
        ['meta', { property: 'og:description', content: pageData.description }],
        ['meta', { name: 'twitter:description', content: pageData.description }],
      )
    }

    if (pageData.component && author) {
      output.push(
        ['meta', { property: 'article:author', content: author }],
      )
    }

    return output
  },

  vite: {
    plugins: [
      {
        name: 'readability-layout-early',
        transformIndexHtml(html: string) {
          if (html.includes('layout-switch-mode')) return html
          return html.replace('<head>', `<head>\n    <script>${readabilityLayoutScript}</script>`)
        },
      },
    ],
    ssr: {
      noExternal: [
        'mermaid',
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui',
      ],
    },
    // mermaid → fastdom (CJS): without prebundle Vite ESM interop has no default export
    optimizeDeps: {
      include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'],
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        '@nolebase/ui',
      ],
    },
    resolve: {
      alias: [
        'VPSidebar',
        'VPDocFooter',
        'VPNavTranslations',
        'VPNavBar',
      ].map(componentName => ({
        find: new RegExp(`^.*\/${componentName}\.vue$`),
        replacement: fileURLToPath(
          new URL(`../theme/components/${componentName.replace(/^VP/, 'Docs')}.vue`, import.meta.url)
        )
      })),
    },
  },

  sitemap: {
    hostname: SITE_HOST,
  },
})
)
