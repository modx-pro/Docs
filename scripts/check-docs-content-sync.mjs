/**
 * Content/volume diff for selected paths: EN must be within a ratio of RU (lines and/or words).
 * Catches point edits in RU that were not ported to EN (e.g. new paragraphs, expanded examples).
 *
 * Usage: node scripts/check-docs-content-sync.mjs [--threshold=0.7] [--paths=prefix1,prefix2]
 *   threshold: min EN/RU line ratio (default 0.7)
 *   paths: comma-separated path prefixes under docs/ (default: all top-level sections: components, faq, guide, public, system)
 * Exit code: 0 if no volume drift, 1 if EN is noticeably shorter than RU on selected paths.
 */
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS = join(ROOT, 'docs')
const DOCS_EN = join(ROOT, 'docs', 'en')

const args = process.argv.slice(2)
const getArg = (name, def) => {
  const a = args.find((x) => x.startsWith(`${name}=`))
  return a ? a.slice(name.length + 1) : def
}

const LINE_RATIO_THRESHOLD = Number(getArg('--threshold', '0.7'))

/** When --paths is not set, use all top-level dirs under docs/ (except en) as prefixes. */
function getDefaultPathPrefixes() {
  const entries = readdirSync(DOCS, { withFileTypes: true })
  return entries.filter((d) => d.isDirectory() && d.name !== 'en').map((d) => d.name)
}

const PATH_PREFIXES_STR = getArg('--paths', null)
const PATH_PREFIXES = PATH_PREFIXES_STR
  ? PATH_PREFIXES_STR.split(',').map((p) => p.trim()).filter(Boolean)
  : getDefaultPathPrefixes()

/** Line count (excluding empty lines in block). */
function lineCount(filePath) {
  const content = readFileSync(filePath, 'utf8')
  return content.split('\n').filter((line) => line.trim().length > 0).length
}

/** Word count (rough: split on whitespace). */
function wordCount(filePath) {
  const content = readFileSync(filePath, 'utf8')
  return content.split(/\s+/).filter((w) => w.length > 0).length
}

/** Check if path matches any of the configured prefixes. */
function matchesPaths(relPath) {
  return PATH_PREFIXES.some((prefix) => relPath === prefix || relPath.startsWith(prefix + '/'))
}

const ruFiles = fg.sync('**/*.md', { cwd: DOCS, ignore: ['en/**'] })
const drift = []

for (const rel of ruFiles) {
  if (!matchesPaths(rel)) continue

  const enPath = join(DOCS_EN, rel)
  if (!existsSync(enPath)) continue

  const ruPath = join(DOCS, rel)
  let ruLines, enLines, ruWords, enWords
  try {
    ruLines = lineCount(ruPath)
    enLines = lineCount(enPath)
    ruWords = wordCount(ruPath)
    enWords = wordCount(enPath)
  } catch (e) {
    drift.push({ path: rel, error: e.message })
    continue
  }

  const lineRatio = ruLines > 0 ? enLines / ruLines : 1
  const wordRatio = ruWords > 0 ? enWords / ruWords : 1
  const minRatio = Math.min(lineRatio, wordRatio)

  if (minRatio < LINE_RATIO_THRESHOLD) {
    drift.push({
      path: rel,
      ruLines,
      enLines,
      ruWords,
      enWords,
      lineRatio: Math.round(lineRatio * 100) / 100,
      wordRatio: Math.round(wordRatio * 100) / 100,
    })
  }
}

if (drift.length === 0) {
  console.log(
    `OK: EN content volume in sync with RU for selected paths (threshold=${LINE_RATIO_THRESHOLD}).`
  )
  process.exit(0)
}

console.error(
  `Content/volume drift (EN < ${LINE_RATIO_THRESHOLD * 100}% of RU on selected paths):`
)
for (const d of drift) {
  if (d.error) {
    console.error('  -', d.path, ':', d.error)
  } else {
    console.error(
      '  -',
      d.path,
      `| RU: ${d.ruLines} lines, ${d.ruWords} words | EN: ${d.enLines} lines, ${d.enWords} words | lineRatio=${d.lineRatio}, wordRatio=${d.wordRatio}`
    )
  }
}
console.error('\nConsider syncing EN content from RU for the listed files.')
process.exit(1)
