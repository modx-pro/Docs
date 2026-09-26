/**
 * Files and lines changed since the branch forked from the base, for the --changed checks.
 * Base: origin/$GITHUB_BASE_REF in CI, $CHECK_BASE (or the older $SPELLCHECK_BASE) or origin/master locally.
 */
import { execFileSync } from 'child_process'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

export const BASE = process.env.GITHUB_BASE_REF
  ? `origin/${process.env.GITHUB_BASE_REF}`
  : process.env.CHECK_BASE || process.env.SPELLCHECK_BASE || 'origin/master'

function gitDiff(diffArgs) {
  try {
    return execFileSync(
      'git',
      ['-c', 'core.quotePath=false', 'diff', ...diffArgs, `${BASE}...HEAD`, '--', 'docs'],
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
    )
  } catch (err) {
    console.error(`git diff failed for ${BASE}: ${err.message}`)
    process.exit(1)
  }
}

/** Changed Markdown files under docs/ that still exist; filter is a git --diff-filter value. */
export function changedMarkdownFiles(filter = 'ACMRT') {
  return gitDiff(['--name-only', `--diff-filter=${filter}`])
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.endsWith('.md') && existsSync(join(ROOT, l)))
}

/** Added and modified line numbers of every changed file, from the zero-context diff. */
export function changedLines() {
  const lines = new Map()
  let current = null
  for (const row of gitDiff(['-U0', '--no-color', '--no-ext-diff', '--diff-filter=ACMRT']).split('\n')) {
    if (row.startsWith('+++ ')) {
      current = row.startsWith('+++ b/') ? row.slice(6).trimEnd() : null
      if (current) lines.set(current, new Set())
      continue
    }
    const hunk = current && row.match(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/)
    if (hunk) {
      const start = Number(hunk[1])
      const count = hunk[2] === undefined ? 1 : Number(hunk[2])
      for (let n = start; n < start + count; n++) lines.get(current).add(n)
    }
  }
  return lines
}
