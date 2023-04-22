import type { DefaultTheme } from 'vitepress'

declare interface DocsEcosystem {
  text: string,
  link: string,
  logo: string,
}

export interface DocsThemeConfig extends DefaultTheme.Config {
  ecosystemLabel?: string,
  ecosystem?: Array<DocsEcosystem>,
}
