import { LanguageInput } from 'shiki'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const modx = require('./modx.tmLanguage.json')
const fenomGrammar = require('./fenom.tmLanguage.json')
const smartyGrammar = require('@modix/smarty-tmlanguage/smarty.tmLanguage.json')

const fenom = {
  ...fenomGrammar,
  aliases: ['fenom']
}

const smarty = {
  ...smartyGrammar,
  aliases: ['smarty']
}

export default [
  modx,
  fenom,
  smarty,
] as LanguageInput[]
