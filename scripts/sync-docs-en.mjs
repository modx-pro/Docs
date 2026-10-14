/**
 * Copy missing Russian doc files to docs/en/ with a TODO placeholder.
 * Run from repo root: node scripts/sync-docs-en.mjs
 * Only some pages or folders: node scripts/sync-docs-en.mjs docs/components/fetchit docs/guide/cspell.md
 * (Russian paths inside docs/; a path that matches no Russian page is an error).
 * After running, translate the content of the created files.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join, relative, resolve } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS = join(ROOT, 'docs')
const DOCS_EN = join(ROOT, 'docs', 'en')

const allRu = fg.sync('**/*.md', { cwd: DOCS, ignore: ['en/**'] })
const args = process.argv.slice(2)

// each argument is a Russian page or folder inside docs/; "docs" itself means all pages
const scopes = args.map((arg) => {
  const rel = relative(DOCS, resolve(ROOT, arg)).replace(/\\/g, '/').replace(/\/$/, '')
  if (rel.startsWith('..') || /^[a-z]:/i.test(rel)) {
    console.error(`Not inside docs/: ${arg}`)
    process.exit(1)
  }
  if (rel === 'en' || rel.startsWith('en/')) {
    console.error(`Pass the Russian page, not the English one: ${arg}`)
    process.exit(1)
  }
  const matches = (file) => rel === '' || file === rel || file.startsWith(rel + '/')
  if (!allRu.some(matches)) {
    console.error(`No Russian pages match: ${arg}`)
    process.exit(1)
  }
  return matches
})

const ruFiles = scopes.length ? allRu.filter((file) => scopes.some((matches) => matches(file))) : allRu
const enFiles = new Set(fg.sync('**/*.md', { cwd: DOCS_EN }))

const missing = ruFiles.filter((p) => !enFiles.has(p))
if (missing.length === 0) {
  console.log(scopes.length
    ? 'Nothing to copy: the given pages already have English counterparts.'
    : 'No missing files. docs/en is in sync with docs/.')
  process.exit(0)
}

console.log(`Copying ${missing.length} missing file(s) to docs/en/...`)

for (const relPath of missing) {
  const srcPath = join(DOCS, relPath)
  const destPath = join(DOCS_EN, relPath)
  if (!existsSync(srcPath)) {
    console.warn('Skip (source missing):', relPath)
    continue
  }
  const raw = readFileSync(srcPath, 'utf-8')
  const { data, content } = matter(raw)
  const banner = `<!-- TODO: translate from docs/${relPath} -->\n\n`
  const newContent = banner + content
  const out = matter.stringify(newContent, data, { lineWidth: -1 })
  mkdirSync(dirname(destPath), { recursive: true })
  writeFileSync(destPath, out, 'utf-8')
  console.log('  ', relPath)
}

console.log('Done. Translate the copied files and remove the TODO comments.')
