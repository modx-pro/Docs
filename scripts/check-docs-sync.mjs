/**
 * Check that for every Russian doc file (docs/..., excluding docs/en/)
 * there is a corresponding English file at docs/en/<same path>.
 * Usage:
 *   node scripts/check-docs-sync.mjs
 *   node scripts/check-docs-sync.mjs --changed
 * --changed looks only at Russian files changed since the branch forked from the base
 * (origin/$GITHUB_BASE_REF in CI, $CHECK_BASE or origin/master locally):
 * a new page without an English counterpart fails, an edited page whose
 * English counterpart was not touched gets a warning.
 * Exit code: 0 if in sync, 1 if missing files in EN.
 */
import { join } from 'path'
import fg from 'fast-glob'
import { ROOT, changedMarkdownFiles } from './lib/git-changed.mjs'

const DOCS = join(ROOT, 'docs')
const DOCS_EN = join(ROOT, 'docs', 'en')
const changedOnly = process.argv.includes('--changed')

const enFiles = new Set(fg.sync('**/*.md', { cwd: DOCS_EN }))
const ruPath = (file) => file.replace(/^docs\//, '')
const isRu = (file) => !file.startsWith('docs/en/')

let ruFiles = fg.sync('**/*.md', { cwd: DOCS, ignore: ['en/**'] })
if (changedOnly) {
  const added = changedMarkdownFiles('ACR').filter(isRu).map(ruPath)
  const touched = new Set(changedMarkdownFiles().map((f) => f.replace(/^docs\/en\//, 'en/')))
  const edited = changedMarkdownFiles('M').filter(isRu).map(ruPath)
    .filter((p) => enFiles.has(p) && !touched.has(`en/${p}`))
  for (const p of edited) {
    const message = `docs/${p} changed, docs/en/${p} did not: check whether the translation needs the same edit.`
    console.log(process.env.GITHUB_ACTIONS ? `::warning file=docs/${p}::${message}` : `Warning: ${message}`)
  }
  ruFiles = added
}

const missing = ruFiles.filter((p) => !enFiles.has(p))

if (missing.length === 0) {
  console.log(changedOnly
    ? `OK: all ${ruFiles.length} new Russian file(s) have EN counterparts.`
    : `OK: docs/en is in sync with docs/ (all ${ruFiles.length} files have EN counterparts).`)
  process.exit(0)
}

console.error('Missing in docs/en (' + missing.length + ' file(s)):')
missing.forEach((p) => console.error('  -', p))
const paths = changedOnly ? ' ' + missing.map((p) => `docs/${p}`).join(' ') : ''
console.error(`\nRun: node scripts/sync-docs-en.mjs${paths} to copy RU files to docs/en, then translate.`)
process.exit(1)
