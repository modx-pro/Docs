import { createRequire } from 'module'
import fenomGrammar from './fenom.tmLanguage.json'

const require = createRequire(import.meta.url)
const modxGrammar = require('modx-tmlanguage/modx.tmLanguage.json')

const modx = {
  id: 'modx',
  scopeName: 'text.html.modx',
  aliases: ['modx'],
  grammar: modxGrammar,
}

const fenom = {
  id: 'fenom',
  scopeName: 'text.html.fenom',
  aliases: ['fenom'],
  grammar: fenomGrammar,
}

export default [
  modx,
  fenom,
]
