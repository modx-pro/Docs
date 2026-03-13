/**
 * Replace TODO placeholder in docs/en files with a short English notice.
 * Run after sync-docs-en.mjs for files that are not yet fully translated.
 * Usage: node scripts/placeholder-en-docs.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS_EN = join(ROOT, 'docs', 'en')

const enFiles = fg.sync('**/*.md', { cwd: DOCS_EN })
let count = 0

for (const relPath of enFiles) {
  const path = join(DOCS_EN, relPath)
  const raw = readFileSync(path, 'utf-8')
  if (!raw.includes('TODO: translate from docs/')) continue

  const { data, content } = matter(raw)
  const ruLink = '/' + relPath.replace(/\/index\.md$/, '/').replace(/\.md$/, '/')
  const newContent = [
    '# ' + (data?.title || relPath),
    '',
    'This page is not yet fully translated.',
    '',
    'See the [Russian documentation](' + ruLink + ') for full content.',
    '',
  ].join('\n')
  const out = matter.stringify(newContent, data, { lineWidth: -1 })
  writeFileSync(path, out, 'utf-8')
  count++
  console.log('  ', relPath)
}

console.log('Done. Replaced', count, 'placeholder(s).')
