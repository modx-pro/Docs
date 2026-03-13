/**
 * Check that EN doc structure (headings) matches RU for the same paths.
 * Reports files where EN has fewer ## or ### sections — possible outdated translation.
 *
 * Usage: node scripts/check-docs-structure-sync.mjs
 * Exit code: 0 if no structure drift, 1 if EN is missing sections in one or more files.
 *
 * For content/volume diff on selected paths, see: scripts/check-docs-content-sync.mjs
 */
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS = join(ROOT, 'docs')
const DOCS_EN = join(ROOT, 'docs', 'en')

/** Extract heading lines (## or ###) and normalize for comparison (strip links, trim). */
function getHeadings(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const headings = []
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)$/)
    if (m) {
      const level = m[1].length
      const title = m[2].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim()
      headings.push({ level, title })
    }
  }
  return headings
}

/** Check if EN has at least the same section structure as RU (same count of ## and ###). */
function structureMatch(ruHeadings, enHeadings) {
  const ruCount = ruHeadings.length
  const enCount = enHeadings.length
  if (enCount >= ruCount) return { ok: true }
  const missing = ruCount - enCount
  return { ok: false, missing }
}

const ruFiles = fg.sync('**/*.md', { cwd: DOCS, ignore: ['en/**', '**/authors.json'] })
const drift = []

for (const rel of ruFiles) {
  const enPath = join(DOCS_EN, rel)
  if (!existsSync(enPath)) continue

  const ruPath = join(DOCS, rel)
  let ruHeadings, enHeadings
  try {
    ruHeadings = getHeadings(ruPath)
    enHeadings = getHeadings(enPath)
  } catch (e) {
    drift.push({ path: rel, error: e.message })
    continue
  }

  const result = structureMatch(ruHeadings, enHeadings)
  if (!result.ok) {
    drift.push({
      path: rel,
      ruSections: ruHeadings.length,
      enSections: enHeadings.length,
      missing: result.missing,
    })
  }
}

if (drift.length === 0) {
  console.log('OK: EN doc structure in sync with RU (section counts match).')
  process.exit(0)
}

console.error('Structure drift (EN has fewer sections than RU):')
for (const d of drift) {
  if (d.error) {
    console.error('  -', d.path, ':', d.error)
  } else {
    console.error('  -', d.path, `(RU: ${d.ruSections} sections, EN: ${d.enSections} sections, missing: ${d.missing})`)
  }
}
console.error('\nConsider syncing EN content from RU for the listed files.')
process.exit(1)
