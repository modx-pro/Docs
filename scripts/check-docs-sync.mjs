/**
 * Check that for every Russian doc file (docs/..., excluding docs/en/)
 * there is a corresponding English file at docs/en/<same path>.
 * Usage: node scripts/check-docs-sync.mjs
 * Exit code: 0 if in sync, 1 if missing files in EN.
 */
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS = join(ROOT, 'docs')
const DOCS_EN = join(ROOT, 'docs', 'en')

const ruFiles = fg.sync('**/*.md', { cwd: DOCS, ignore: ['en/**'] })
const enFiles = new Set(fg.sync('**/*.md', { cwd: DOCS_EN }))

const missing = ruFiles.filter((p) => !enFiles.has(p))

if (missing.length === 0) {
  console.log('OK: docs/en is in sync with docs/ (all', ruFiles.length, 'files have EN counterparts).')
  process.exit(0)
}

console.error('Missing in docs/en (' + missing.length + ' file(s)):')
missing.forEach((p) => console.error('  -', p))
console.error('\nRun: node scripts/sync-docs-en.mjs to copy RU files to docs/en, then translate.')
process.exit(1)
