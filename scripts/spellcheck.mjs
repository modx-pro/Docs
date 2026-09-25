/**
 * Spell check of Russian docs (docs/en is skipped, see cspell.json ignorePaths).
 * Component names and authors are added to the dictionary from the repo itself,
 * so a new component does not need a manual entry in cspell.json.
 * Usage:
 *   node scripts/spellcheck.mjs
 *   node scripts/spellcheck.mjs --changed
 *   node scripts/spellcheck.mjs --show-suggestions
 *   node scripts/spellcheck.mjs docs/components/fetchit
 * Exit 0 if OK, 1 if unknown words are found.
 */
import { execFileSync, spawnSync } from 'child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { basename, dirname, extname, join, relative, resolve } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const args = process.argv.slice(2)
const changedOnly = args.includes('--changed')
const cspellFlags = args.filter((a) => a.startsWith('--') && a !== '--changed')
const pathArgs = args.filter((a) => !a.startsWith('--'))

function changedMarkdownFiles() {
  const base = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : process.env.SPELLCHECK_BASE || 'origin/master'
  let out = ''
  try {
    out = execFileSync(
      'git',
      ['diff', '--name-only', '--diff-filter=ACMRT', `${base}...HEAD`, '--', 'docs'],
      { cwd: ROOT, encoding: 'utf8' }
    )
  } catch (err) {
    console.error('git diff failed for', base, err.message)
    process.exit(1)
  }
  return out
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.endsWith('.md') && !l.startsWith('docs/en/') && existsSync(join(ROOT, l)))
}

function targets() {
  if (changedOnly) {
    return changedMarkdownFiles()
  }
  if (pathArgs.length === 0) {
    return ['docs/**/*.md']
  }
  return pathArgs.map((p) => {
    const abs = resolve(ROOT, p)
    return relative(ROOT, extname(abs) === '.md' ? abs : join(abs, '**/*.md')).replace(/\\/g, '/')
  })
}

/** Component slugs and titles, authors' ids, names and profile handles. */
function projectWords() {
  const words = new Set()
  const add = (value) => {
    for (const word of String(value ?? '').split(/[^\p{L}\p{N}]+/u)) {
      if (word.length > 1 && !/^\d+$/.test(word)) words.add(word)
    }
  }

  const pages = fg.sync(['docs/components/*.md', 'docs/components/*/index.md'], { cwd: ROOT })
  for (const page of pages) {
    add(basename(page) === 'index.md' ? basename(dirname(page)) : basename(page, '.md'))
    add(matter(readFileSync(join(ROOT, page), 'utf8')).data.title)
  }

  const authors = JSON.parse(readFileSync(join(ROOT, 'docs/authors.json'), 'utf8'))
  for (const [id, author] of Object.entries(authors)) {
    add(id)
    for (const name of typeof author.name === 'object' ? Object.values(author.name) : [author.name]) {
      add(name)
    }
    for (const value of Object.values(author)) {
      if (typeof value === 'string' && /^https?:\/\//.test(value)) {
        add(value.replace(/\/+$/, '').split('/').pop())
      }
    }
  }

  return [...words].sort()
}

const files = targets()
if (files.length === 0) {
  console.log('No changed markdown files to check.')
  process.exit(0)
}

const dir = mkdtempSync(join(tmpdir(), 'docs-cspell-'))
const config = join(dir, 'cspell.json')
writeFileSync(config, JSON.stringify({
  version: '0.2',
  import: [join(ROOT, 'cspell.json')],
  words: projectWords(),
}))

const cspell = join(ROOT, 'node_modules/cspell/bin.mjs')
const result = spawnSync(
  process.execPath,
  [cspell, '--no-progress', '--config', config, ...cspellFlags, ...files],
  { cwd: ROOT, stdio: 'inherit' }
)
rmSync(dir, { recursive: true, force: true })
process.exit(result.status ?? 1)
