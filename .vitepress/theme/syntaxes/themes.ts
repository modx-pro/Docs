import type { ThemeRegistration, ThemeRegistrationRaw } from 'shiki'
import { bundledThemes } from 'shiki'

type TokenColors = NonNullable<ThemeRegistrationRaw['tokenColors']>

// The MODX grammar uses precise scopes (variable.other.*, punctuation.*) that these themes
// leave uncoloured, so give them the colours the themes used for the previous grammar
async function extendTheme(name: 'github-light' | 'one-dark-pro', tokenColors: TokenColors) {
  const theme = (await bundledThemes[name]()).default as ThemeRegistration

  return {
    ...theme,
    tokenColors: [...(theme.tokenColors ?? []), ...tokenColors],
  }
}

export const lightTheme = await extendTheme('github-light', [
  {
    scope: [
      'variable.other.placeholder.modx',
      'variable.other.resource.modx',
      'variable.other.setting.modx',
      'variable.other.lexicon.modx',
      'punctuation.definition.propertyset.modx',
    ],
    settings: { foreground: '#6f42c1' },
  },
  {
    scope: [
      'punctuation.definition.parameter.modx',
      'punctuation.separator.properties.modx',
    ],
    settings: { foreground: '#d73a49' },
  },
])

export const darkTheme = await extendTheme('one-dark-pro', [
  {
    scope: [
      'punctuation.definition.tag.begin.modx',
      'punctuation.definition.tag.end.modx',
      'support.type.placeholder.modx',
      'support.type.field.modx',
      'support.type.setting.modx',
      'support.type.chunk.modx',
      'support.type.link.modx',
      'support.type.lexicon.modx',
      'punctuation.separator.modifier.modx',
    ],
    settings: { foreground: '#56b6c2' },
  },
  {
    scope: [
      'punctuation.definition.parameter.modx',
      'punctuation.separator.properties.modx',
    ],
    settings: { foreground: '#c678dd' },
  },
])
