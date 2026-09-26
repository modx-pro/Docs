/**
 * Spell check of the docs (Russian and English). Fragments in parts are skipped (see cspell.json ignorePaths).
 * Component names and authors are added to the dictionary from the repo itself,
 * so a new component does not need a manual entry in cspell.json.
 * Usage:
 *   node scripts/spellcheck.mjs
 *   node scripts/spellcheck.mjs docs/components/fetchit
 *   node scripts/spellcheck.mjs --changed
 *   node scripts/spellcheck.mjs --show-suggestions
 * --changed checks Markdown changed since the branch forked from the base:
 * origin/$GITHUB_BASE_REF in CI, $SPELLCHECK_BASE or origin/master locally.
 * Other options go to cspell as --flag or --flag=value.
 * Exit 0 if OK, 1 on unknown words, bad arguments, no matching files or a failed git/cspell run.
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
const CSPELL = join(ROOT, 'node_modules/cspell/bin.mjs')

/** Same as ignorePaths in cspell.json: cspell would drop these files anyway. */
const isSkipped = (file) => /(^|\/)parts\//.test(file)

function fail(message) {
  console.error(message)
  process.exit(1)
}

const args = process.argv.slice(2)
const changedOnly = args.includes('--changed')
const cspellFlags = args.filter((a) => a.startsWith('--') && a !== '--changed')
const pathArgs = args.filter((a) => !a.startsWith('--'))

const shortFlag = args.find((a) => /^-[^-]/.test(a))
if (shortFlag) {
  fail(`Unsupported option ${shortFlag}: pass cspell options as --flag or --flag=value.`)
}
if (changedOnly && pathArgs.length) {
  fail('--changed takes no paths: it checks the files changed against the base branch.')
}

function changedMarkdownFiles() {
  const base = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : process.env.SPELLCHECK_BASE || 'origin/master'
  let out = ''
  try {
    out = execFileSync(
      'git',
      ['-c', 'core.quotePath=false', 'diff', '--name-only', '--diff-filter=ACMRT', `${base}...HEAD`, '--', 'docs'],
      { cwd: ROOT, encoding: 'utf8' }
    )
  } catch (err) {
    fail(`git diff failed for ${base}: ${err.message}`)
  }
  return out
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.endsWith('.md') && existsSync(join(ROOT, l)))
}

function pathFiles() {
  const patterns = pathArgs.map((p) => {
    const abs = resolve(ROOT, p)
    return relative(ROOT, extname(abs) === '.md' ? abs : join(abs, '**/*.md')).replace(/\\/g, '/')
  })
  return fg.sync(patterns, { cwd: ROOT })
}

/** Component slugs and title words; authors' ids, name words and handles (last URL segment). */
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

let targets = ['docs/**/*.md']
if (changedOnly || pathArgs.length) {
  const files = changedOnly ? changedMarkdownFiles() : pathFiles()
  const skipped = files.filter(isSkipped)
  targets = files.filter((f) => !isSkipped(f))
  if (skipped.length) {
    console.log(`Skipped (parts are not checked): ${skipped.join(', ')}`)
  }
  if (targets.length === 0) {
    if (changedOnly) {
      console.log('No changed markdown files to check.')
      process.exit(0)
    }
    fail(`No markdown files to check in: ${pathArgs.join(', ')}`)
  }
}

if (!existsSync(CSPELL)) {
  fail('cspell is not installed: run pnpm install.')
}

const words = projectWords()
const dir = mkdtempSync(join(tmpdir(), 'docs-cspell-'))
let status = 1
try {
  const config = join(dir, 'cspell.json')
  writeFileSync(config, JSON.stringify({
    version: '0.2',
    import: [join(ROOT, 'cspell.json')],
    words,
  }))

  // explicit files go through a list, so their names are not read as globs;
  // cspell resolves list entries against the list's own folder, hence absolute paths
  const fileArgs = targets[0].includes('*') ? targets : ['--file-list', join(dir, 'files.txt')]
  if (fileArgs[0] === '--file-list') {
    writeFileSync(fileArgs[1], targets.map((f) => join(ROOT, f)).join('\n'))
  }

  const result = spawnSync(
    process.execPath,
    [CSPELL, '--no-progress', '--config', config, ...cspellFlags, ...fileArgs],
    { cwd: ROOT, stdio: 'inherit' }
  )
  if (result.error) {
    console.error('Failed to run cspell:', result.error.message)
  } else if (result.status === null) {
    console.error('cspell was terminated by signal', result.signal)
  } else {
    status = result.status
  }
} finally {
  rmSync(dir, { recursive: true, force: true })
}
process.exit(status)
