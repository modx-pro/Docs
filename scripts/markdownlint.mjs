/**
 * Markdown lint with .markdownlint.jsonc. markdownlint-cli skips the paths in .markdownlintignore;
 * parts/ files are also filtered out here, so they are reported as skipped.
 * Usage:
 *   node scripts/markdownlint.mjs
 *   node scripts/markdownlint.mjs docs/components/fetchit
 *   node scripts/markdownlint.mjs --changed
 * --changed lints Markdown in docs/ and README.md changed since the branch forked from the base
 * (origin/$GITHUB_BASE_REF in CI, $CHECK_BASE or origin/master locally)
 * and reports only issues on changed lines: old issues elsewhere in a touched file don't fail it.
 * With nothing to lint, the config is still checked, so a broken .markdownlint.jsonc fails.
 * Fixing: pnpm exec markdownlint --fix <path> (pnpm run lint:fix rewrites every file).
 * Exit 0 if OK, 1 on issues, bad arguments, no matching files or a failed git/markdownlint run.
 */
import { spawnSync } from 'child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { extname, join, relative, resolve } from 'path'
import fg from 'fast-glob'
import { ROOT, changedLines, changedMarkdownFiles } from './lib/git-changed.mjs'

const MARKDOWNLINT = join(ROOT, 'node_modules/markdownlint-cli/markdownlint.js')
const CONFIG = '.markdownlint.jsonc'
const CHANGED_PATHS = ['docs', 'README.md']
// long file lists are split: Windows limits a command line to ~32K characters
const BATCH = 200

/** The parts/ entry of .markdownlintignore: markdownlint would drop these files anyway. */
const isSkipped = (file) => /(^|\/)parts\//.test(file)

function fail(message) {
  console.error(message)
  process.exit(1)
}

const args = process.argv.slice(2)
const changedOnly = args.includes('--changed')
const unknown = args.find((a) => a.startsWith('-') && a !== '--changed')
if (unknown) {
  fail(`Unsupported option ${unknown}: use --changed or paths; pnpm exec markdownlint --fix <path> fixes issues.`)
}
const pathArgs = args.filter((a) => !a.startsWith('-'))
if (changedOnly && pathArgs.length) {
  fail('--changed takes no paths: it lints the files changed against the base branch.')
}
if (!existsSync(MARKDOWNLINT)) {
  fail('markdownlint-cli is not installed: run pnpm install.')
}

/** Runs markdownlint-cli on the files, returns its issues or exits with a message on failure. */
function lint(files) {
  const dir = mkdtempSync(join(tmpdir(), 'docs-markdownlint-'))
  let error = null
  let issues = []
  try {
    const report = join(dir, 'report.json')
    const result = spawnSync(
      process.execPath,
      [MARKDOWNLINT, '--config', CONFIG, '--json', '--output', report, ...files],
      { cwd: ROOT, stdio: 'inherit' }
    )
    if (result.error) {
      error = `Failed to run markdownlint: ${result.error.message}`
    } else if (result.status === null) {
      error = `markdownlint was terminated by signal ${result.signal}`
    } else if (result.status > 1 || !existsSync(report)) {
      error = `markdownlint failed (exit ${result.status}${existsSync(report) ? '' : ', no report written'})`
    } else {
      const text = readFileSync(report, 'utf8').trim()
      issues = text ? JSON.parse(text) : []
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
  if (error) fail(error)
  return issues
}

let targets = ['**/*.md']
if (changedOnly || pathArgs.length) {
  const files = changedOnly
    ? changedMarkdownFiles('ACMRT', CHANGED_PATHS)
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
    if (!changedOnly) {
      fail(`No markdown files to lint in: ${pathArgs.join(', ')}`)
    }
    // nothing to lint, but a PR may still change the config: make sure it loads
    lint(['README.md'])
    console.log('No changed markdown files to lint (config OK).')
    process.exit(0)
  }
}

const lines = changedOnly ? changedLines(CHANGED_PATHS) : null
const issues = []
for (let i = 0; i < targets.length; i += BATCH) {
  issues.push(...lint(targets.slice(i, i + BATCH)))
}

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
process.exit(shown.length ? 1 : 0)
