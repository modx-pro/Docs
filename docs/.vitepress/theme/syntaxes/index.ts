import fenomGrammar from './fenom.tmLanguage.json'
import modxGrammar from 'modx-tmlanguage/modx.tmLanguage.json'

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
