/**
 * Markdown lint with .markdownlint.jsonc; files from .markdownlintignore (parts) are skipped.
 * Usage:
 *   node scripts/markdownlint.mjs
 *   node scripts/markdownlint.mjs docs/components/fetchit
 *   node scripts/markdownlint.mjs --changed
 * --changed lints Markdown changed since the branch forked from the base
 * (origin/$GITHUB_BASE_REF in CI, $CHECK_BASE or origin/master locally)
 * and reports only issues on changed lines: old issues elsewhere in a touched file don't fail it.
 * Fixing: pnpm run lint:fix.
 * Exit 0 if OK, 1 on issues, bad arguments, no matching files or a failed git/markdownlint run.
 */
import { spawnSync } from 'child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { extname, join, relative, resolve } from 'path'
import fg from 'fast-glob'
import { ROOT, changedLines, changedMarkdownFiles } from './lib/git-changed.mjs'

const MARKDOWNLINT = join(ROOT, 'node_modules/markdownlint-cli/markdownlint.js')

/** Same as .markdownlintignore: markdownlint would drop these files anyway. */
const isSkipped = (file) => /(^|\/)parts\//.test(file)

function fail(message) {
  console.error(message)
  process.exit(1)
}

const args = process.argv.slice(2)
const changedOnly = args.includes('--changed')
const unknown = args.find((a) => a.startsWith('-') && a !== '--changed')
if (unknown) {
  fail(`Unsupported option ${unknown}: use --changed or paths; pnpm run lint:fix fixes issues.`)
}
const pathArgs = args.filter((a) => !a.startsWith('-'))
if (changedOnly && pathArgs.length) {
  fail('--changed takes no paths: it lints the files changed against the base branch.')
}

let targets = ['**/*.md']
if (changedOnly || pathArgs.length) {
  const files = changedOnly
    ? changedMarkdownFiles()
    : fg.sync(pathArgs.map((p) => {
        const abs = resolve(ROOT, p)
        return relative(ROOT, extname(abs) === '.md' ? abs : join(abs, '**/*.md')).replace(/\\/g, '/')
      }), { cwd: ROOT })
  const skipped = files.filter(isSkipped)
  targets = files.filter((f) => !isSkipped(f))
  if (skipped.length) {
    console.log(`Skipped (parts are not linted): ${skipped.join(', ')}`)
  }
  if (targets.length === 0) {
    if (changedOnly) {
      console.log('No changed markdown files to lint.')
      process.exit(0)
    }
    fail(`No markdown files to lint in: ${pathArgs.join(', ')}`)
  }
}

if (!existsSync(MARKDOWNLINT)) {
  fail('markdownlint-cli is not installed: run pnpm install.')
}

const lines = changedOnly ? changedLines() : null
const dir = mkdtempSync(join(tmpdir(), 'docs-markdownlint-'))
let status = 1
try {
  const report = join(dir, 'report.json')
  const result = spawnSync(
    process.execPath,
    [MARKDOWNLINT, '--json', '--output', report, ...targets],
    { cwd: ROOT, stdio: 'inherit' }
  )
  if (result.error) {
    console.error('Failed to run markdownlint:', result.error.message)
  } else if (result.status === null) {
    console.error('markdownlint was terminated by signal', result.signal)
  } else if (result.status > 1 || !existsSync(report)) {
    status = result.status || 1
  } else {
    const text = readFileSync(report, 'utf8').trim()
    const issues = text ? JSON.parse(text) : []
    let ignored = 0
    const shown = []
    for (const issue of issues) {
      const file = issue.fileName.replace(/\\/g, '/')
      if (lines && !lines.get(file)?.has(issue.lineNumber)) {
        ignored++
        continue
      }
      const column = issue.errorRange ? `:${issue.errorRange[0]}` : ''
      const detail = issue.errorDetail ? ` [${issue.errorDetail}]` : ''
      const context = issue.errorContext ? ` [Context: "${issue.errorContext}"]` : ''
      shown.push(`${file}:${issue.lineNumber}${column} ${issue.ruleNames.join('/')} ${issue.ruleDescription}${detail}${context}`)
    }
    shown.forEach((row) => console.log(row))
    const scope = lines ? 'changed lines: ' : ''
    const note = ignored ? ` (${ignored} on unchanged lines not counted)` : ''
    console.log(`Linted ${changedOnly || pathArgs.length ? targets.length : 'all'} files, ${scope}${shown.length} issues${note}.`)
    status = shown.length ? 1 : 0
  }
} finally {
  rmSync(dir, { recursive: true, force: true })
}
process.exit(status)
