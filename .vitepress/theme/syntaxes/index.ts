import type { LanguageInput } from 'shiki'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const modxGrammar = require('@gulomov/modx-tmlanguage/modx.tmLanguage.json')
const fenomGrammar = require('@gulomov/fenom-tmlanguage/fenom.tmLanguage.json')
const smartyGrammar = require('@modix/smarty-tmlanguage/smarty.tmLanguage.json')

// Shiki loads languages lazily, so grammars that include HTML scopes must declare them
// as embedded languages, otherwise HTML inside modx/fenom blocks stays unhighlighted
const modx = {
  ...modxGrammar,
  embeddedLangs: ['html'],
}

const fenom = {
  ...fenomGrammar,
  aliases: ['fenom'],
  embeddedLangs: ['html-derivative'],
}

const smarty = {
  ...smartyGrammar,
  aliases: ['smarty']
}

// `// [!code ++]` and other code notations are not comments in MODX, Fenom or HTML,
// so Shiki does not see them. Mark them as line comments in these languages only.
const notation = {
  name: 'docs-code-notation',
  scopeName: 'docs.code-notation.injection',
  injectTo: ['text.html.modx', 'text.html.fenom', 'text.html.basic'],
  injectionSelector: 'L:text.html.modx -string -comment, L:text.html.fenom -string -comment, L:text.html.basic -string -comment',
  patterns: [
    {
      match: '//\\s*\\[!code\\s[^\\]]*\\].*$',
      name: 'comment.line.double-slash.notation',
    },
  ],
}

export default [
  'html',
  'html-derivative',
  modx,
  fenom,
  smarty,
  notation,
] as LanguageInput[]
