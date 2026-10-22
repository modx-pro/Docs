/**
 * Compare Russian docs (docs/..., excluding docs/en/) with English counterparts
 * at docs/en/<same path>. English is optional: missing files are warnings, not failures.
 * Usage:
 *   node scripts/check-docs-sync.mjs
 *   node scripts/check-docs-sync.mjs --changed
 *   node scripts/check-docs-sync.mjs --strict
 * --changed looks only at Russian files changed since the branch forked from the base
 * (origin/$GITHUB_BASE_REF in CI, $CHECK_BASE or origin/master locally):
 * a new page without EN gets a warning; an edited page whose EN was not touched
 * also gets a warning.
 * Exit 1 only with --strict when EN files are missing, or if git diff fails;
 * warnings never fail without --strict.
 */
import { join } from 'path'
import fg from 'fast-glob'
import { ROOT, changedMarkdownFiles } from './lib/git-changed.mjs'

const DOCS = join(ROOT, 'docs')
const DOCS_EN = join(ROOT, 'docs', 'en')
const changedOnly = process.argv.includes('--changed')
const strict = process.argv.includes('--strict')

const enFiles = new Set(fg.sync('**/*.md', { cwd: DOCS_EN }))
const ruPath = (file) => file.replace(/^docs\//, '')
const isRu = (file) => !file.startsWith('docs/en/')

const warn = (file, message) => {
  console.log(process.env.GITHUB_ACTIONS ? `::warning file=${file}::${message}` : `Warning: ${message}`)
}

let ruFiles = fg.sync('**/*.md', { cwd: DOCS, ignore: ['en/**'] })
if (changedOnly) {
  const added = changedMarkdownFiles('ACR').filter(isRu).map(ruPath)
  const touched = new Set(changedMarkdownFiles().map((f) => f.replace(/^docs\/en\//, 'en/')))
  const edited = changedMarkdownFiles('M').filter(isRu).map(ruPath)
    .filter((p) => enFiles.has(p) && !touched.has(`en/${p}`))
  for (const p of edited) {
    warn(`docs/${p}`, `docs/${p} changed, docs/en/${p} did not: check whether the translation needs the same edit.`)
  }
  ruFiles = added
}

const missing = ruFiles.filter((p) => !enFiles.has(p))

if (missing.length === 0) {
  console.log(changedOnly
    ? `OK: all ${ruFiles.length} new Russian file(s) have EN counterparts (or none were added).`
    : `OK: docs/en is in sync with docs/ (all ${ruFiles.length} files have EN counterparts).`)
  process.exit(0)
}

for (const p of missing) {
  warn(
    `docs/${p}`,
    `No English counterpart at docs/en/${p} (EN is optional). Run: node scripts/sync-docs-en.mjs "docs/${p}" if you want a stub.`,
  )
}

const paths = changedOnly ? ' ' + missing.map((p) => JSON.stringify(`docs/${p}`)).join(' ') : ''
console.log(`Missing in docs/en: ${missing.length} file(s). EN is optional.${strict ? '' : ' Use --strict to fail.'}`)
if (!strict) {
  console.log(`Optional: node scripts/sync-docs-en.mjs${paths}`)
  process.exit(0)
}

console.error('Missing in docs/en (' + missing.length + ' file(s)):')
missing.forEach((p) => console.error('  -', p))
console.error(`\nRun: node scripts/sync-docs-en.mjs${paths} to copy RU files to docs/en, then translate.`)
process.exit(1)
