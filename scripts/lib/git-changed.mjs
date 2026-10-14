/**
 * Files and lines changed since the branch forked from the base, for the --changed checks.
 * Only the given pathspecs are diffed: docs/ by default.
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

function gitDiff(diffArgs, paths) {
  try {
    return execFileSync(
      'git',
      // explicit prefixes: a local diff.noprefix would otherwise change the +++ headers
      ['-c', 'core.quotePath=false', 'diff', '--src-prefix=a/', '--dst-prefix=b/', ...diffArgs, `${BASE}...HEAD`, '--', ...paths],
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
    )
  } catch (err) {
    console.error(`git diff failed for ${BASE}: ${err.message}`)
    process.exit(1)
  }
}

/** Changed files among the pathspecs (existing ones only); filter is a git --diff-filter value. */
export function changedFiles(paths = ['docs'], filter = 'ACMRT') {
  return gitDiff(['--name-only', `--diff-filter=${filter}`], paths)
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && existsSync(join(ROOT, l)))
}

/** Changed Markdown files under the pathspecs that still exist. */
export function changedMarkdownFiles(filter = 'ACMRT', paths = ['docs']) {
  return changedFiles(paths, filter).filter((l) => l.endsWith('.md'))
}

/**
 * Added and modified line numbers of every changed file, from the zero-context diff.
 * A pure deletion marks the lines on both sides of the cut: removing a blank line
 * or a list item there can break the markup of its neighbours.
 */
export function changedLines(paths = ['docs']) {
  const lines = new Map()
  let current = null
  for (const row of gitDiff(['-U0', '--no-color', '--no-ext-diff', '--diff-filter=ACMRT'], paths).split('\n')) {
    if (row.startsWith('+++ ')) {
      current = row.startsWith('+++ b/') ? row.slice(6).trimEnd() : null
      if (current) lines.set(current, new Set())
      continue
    }
    const hunk = current && row.match(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/)
    if (hunk) {
      const start = Number(hunk[1])
      const count = hunk[2] === undefined ? 1 : Number(hunk[2])
      if (count === 0) {
        lines.get(current).add(start).add(start + 1)
      }
      for (let n = start; n < start + count; n++) lines.get(current).add(n)
    }
  }
  return lines
}
