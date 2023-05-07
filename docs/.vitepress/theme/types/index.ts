import type { DefaultTheme } from 'vitepress'
import type { ComponentData } from '../plugins/component'

export interface DocsThemeConfig extends DefaultTheme.Config {
  titleSeparator?: string

  components?: Array<ComponentData>
}
