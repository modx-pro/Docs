import type { DefaultTheme } from 'vitepress'
import type { ComponentData } from '../plugins/component'

declare interface DocsEcosystem {
  text: string,
  link: string,
  logo: string,
}

export interface DocsThemeConfig extends DefaultTheme.Config {
  ecosystemLabel?: string
  ecosystem?: Array<DocsEcosystem>
  titleSeparator?: string

  components?: Array<ComponentData>
}
