/**
 * Spell check of the docs (Russian and English). Fragments in parts are skipped (see cspell.json ignorePaths).
 * Component names and authors are added to the dictionary from the repo itself,
 * so a new component does not need a manual entry in cspell.json.
 * Usage:
 *   node scripts/spellcheck.mjs
 *   node scripts/spellcheck.mjs docs/components/fetchit
 *   node scripts/spellcheck.mjs --changed
 *   node scripts/spellcheck.mjs --show-suggestions
 * --changed checks Markdown changed since the branch forked from the base
 * (origin/$GITHUB_BASE_REF in CI, $CHECK_BASE or origin/master locally)
 * and reports only words on changed lines: old issues elsewhere in a touched file don't fail it.
 * Other options go to cspell as --flag or --flag=value.
 * Exit 0 if OK, 1 on unknown words, bad arguments, no matching files or a failed git/cspell run.
 */
import { spawnSync } from 'child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { basename, dirname, extname, join, relative, resolve } from 'path'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { ROOT, changedLines, changedMarkdownFiles } from './lib/git-changed.mjs'

const CSPELL = join(ROOT, 'node_modules/cspell/bin.mjs')

/** Same as ignorePaths in cspell.json: cspell would drop these files anyway. */
const isSkipped = (file) => /(^|\/)parts\//.test(file)

function fail(message) {
  console.error(message)
  process.exit(1)
}

/** A broken cspell.json must fail even when there is nothing to check. */
function checkConfig() {
  let config
  try {
    config = JSON.parse(readFileSync(join(ROOT, 'cspell.json'), 'utf8'))
  } catch (err) {
    fail(`cspell.json is not valid JSON: ${err.message}`)
  }
  for (const pattern of config.ignoreRegExpList ?? []) {
    const regex = String(pattern).match(/^\/(.*)\/([a-z]*)$/s)
    try {
      if (regex) new RegExp(regex[1], regex[2])
    } catch (err) {
      fail(`cspell.json ignoreRegExpList: ${err.message}`)
    }
  }
}
checkConfig()

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
// options that change the output or stop the run early: --changed parses the default output of a full run
const formatFlag = cspellFlags.find((a) =>
  /^--(reporter|no-summary|no-issues|silent|unique|color|fail-fast|issue-template|words-only|legacy)\b/.test(a))
if (changedOnly && formatFlag) {
  fail(`${formatFlag} can't be used with --changed: it parses the default output of a full cspell run.`)
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

/**
 * cspell prints issues to stdout as `file:line:col - Unknown word (...)` and the summary to stderr:
 * `CSpell: Files checked: N[ (C from cache)][, skipped: S], Issues found: M in K files[ with E errors].`
 * Keeps issues on changed lines; returns 1 on such issues or when the run can't be trusted:
 * cspell exits 1 on its own failures too (bad option, broken import), so the summary is required,
 * every target file must be checked, no errors reported, and the issues parsed must match M.
 */
function reportChangedLines(stdout, stderr, lines, fileCount) {
  const summary = stderr.match(
    /CSpell: Files checked: (\d+)(?: \((\d+) from cache\))?(?:, skipped: (\d+))?, Issues found: (\d+) in \d+ files?(?: with (\d+) errors?)?\./)
  for (const row of stderr.split(/\r?\n/)) {
    if (row.trim() && !row.startsWith('CSpell:')) console.error(row)
  }
  if (!summary) {
    console.error('cspell did not report a summary: it failed before checking the files.')
    return 1
  }
  const [line, checked, , skipped = '0', found, errors = '0'] = summary
  if (Number(errors) > 0) {
    console.error(line)
    console.error('cspell reported errors: the check is not reliable.')
    return 1
  }
  if (Number(skipped) > 0 || Number(checked) !== fileCount) {
    console.error(line)
    console.error(`cspell checked ${checked} of ${fileCount} files (skipped: ${skipped}): the check is not complete.`)
    return 1
  }

  let kept = 0
  let parsed = 0
  const files = new Set()
  for (const row of stdout.split(/\r?\n/)) {
    const issue = row.match(/^(.+?):(\d+):\d+\s+- /)
    if (!issue) {
      if (row.trim()) console.log(row)
      continue
    }
    parsed++
    const file = relative(ROOT, resolve(ROOT, issue[1])).replace(/\\/g, '/')
    if (!lines.has(file)) {
      // a path that doesn't match git's would silently count every issue as unchanged
      console.error(row)
      console.error(`cspell reported ${file}, which is not among the changed files: paths don't match.`)
      return 1
    }
    if (lines.get(file).has(Number(issue[2]))) {
      console.log(row)
      kept++
      files.add(file)
    }
  }
  if (parsed !== Number(found)) {
    console.error(line)
    console.error(`Parsed ${parsed} of ${found} cspell issues: output format not recognised.`)
    return 1
  }
  const ignored = parsed - kept
  const note = ignored ? ` (${ignored} on unchanged lines not counted)` : ''
  console.log(`Checked ${fileCount} files, changed lines: ${kept} issues in ${files.size} files${note}.`)
  return kept ? 1 : 0
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
      console.log('No changed markdown files to check (cspell.json OK).')
      process.exit(0)
    }
    fail(`No markdown files to check in: ${pathArgs.join(', ')}`)
  }
}

if (!existsSync(CSPELL)) {
  fail('cspell is not installed: run pnpm install.')
}

const words = projectWords()
const lines = changedOnly ? changedLines() : null
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
    [CSPELL, '--no-progress', ...(lines ? ['--no-color'] : []), '--config', config, ...cspellFlags, ...fileArgs],
    { cwd: ROOT, stdio: lines ? ['inherit', 'pipe', 'pipe'] : 'inherit', encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
  )
  if (result.error) {
    console.error('Failed to run cspell:', result.error.message)
  } else if (result.status === null) {
    console.error('cspell was terminated by signal', result.signal)
  } else if (lines && result.status <= 1) {
    // 1 is both "issues found" and a failure of cspell itself: the summary tells them apart
    status = reportChangedLines(result.stdout, result.stderr, lines, targets.length)
  } else {
    if (lines) {
      process.stdout.write(result.stdout)
      process.stderr.write(result.stderr)
    }
    status = result.status
  }
} finally {
  rmSync(dir, { recursive: true, force: true })
}
process.exit(status)
