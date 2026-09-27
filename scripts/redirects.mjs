/**
 * Redirects from old URLs: .vitepress/config/rewrites.json is the only source.
 * Usage:
 *   node scripts/redirects.mjs check   validate the list (CI)
 *   node scripts/redirects.mjs nginx   validate, then write .vitepress/dist/redirects.nginx.conf
 *                                      (runs after vitepress build, so a broken list fails the build)
 * The nginx file holds `location = /old { return 301 /new; }` blocks for the server context.
 * It works only once the site's server block includes it, and nginx picks up a changed list on reload.
 * check fails when a target page is missing (a target with a trailing slash needs <path>/index.md),
 * a source is itself a page or a file in docs/public, a target is another redirect, a source repeats
 * (also with/without a trailing slash) or a URL is not a plain path. Case must match exactly, as on Linux.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'docs')
const PUBLIC = join(DOCS, 'public')
const SOURCE = join(ROOT, '.vitepress/config/rewrites.json')
const OUT = join(ROOT, '.vitepress/dist/redirects.nginx.conf')
const OUT_URL = '/redirects.nginx.conf'

const mode = process.argv[2]
if (!['check', 'nginx'].includes(mode) || process.argv.length > 3) {
  console.error('Usage: node scripts/redirects.mjs check|nginx')
  process.exit(1)
}

const trimSlash = (url) => url.replace(/\/+$/, '') || '/'

/**
 * Plain URL path: nginx merges `//` and resolves `.`/`..` before matching, so such a location
 * would never fire; spaces, quotes, `;`, `{`, `$` would break the config.
 */
function isPlainPath(url) {
  if (!url.startsWith('/')) return false
  const segments = url.slice(1).split('/')
  return segments.every((s, i) =>
    (s === '' && i === segments.length - 1) || (/^[A-Za-z0-9._~,-]+$/.test(s) && s !== '.' && s !== '..'))
}

/** existsSync is case-insensitive on Windows and macOS; match every segment exactly, as nginx on Linux does. */
function exists(base, relPath) {
  let dir = base
  for (const segment of relPath.split('/').filter(Boolean)) {
    let names
    try {
      names = readdirSync(dir)
    } catch {
      return false
    }
    if (!names.includes(segment)) return false
    dir = join(dir, segment)
  }
  return existsSync(dir)
}

/** With cleanUrls, /a serves a.md or a/index.md, but /a/ serves only a/index.md. */
function isPage(url) {
  const path = trimSlash(url).replace(/^\//, '')
  if (path === '') return exists(DOCS, 'index.md')
  if (exists(DOCS, `${path}/index.md`)) return true
  return !url.endsWith('/') && exists(DOCS, `${path}.md`)
}

/** A source must not shadow a real URL: a page, its .html file or a file from docs/public. */
function isTaken(url) {
  const path = trimSlash(url).replace(/^\//, '')
  if (isPage(trimSlash(url))) return true
  if (path.endsWith('.html') && isPage(`/${path.slice(0, -'.html'.length)}`)) return true
  return path !== '' && exists(PUBLIC, path)
}

function load() {
  let raw
  let data
  try {
    raw = readFileSync(SOURCE, 'utf8')
    data = JSON.parse(raw)
  } catch (err) {
    console.error(`${SOURCE}: ${err.message}`)
    process.exit(1)
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    console.error(`${SOURCE}: expected an object {"/old": "/new"}`)
    process.exit(1)
  }
  // JSON.parse keeps the last of repeated keys silently, so count them in the text
  const seen = new Set()
  const repeated = []
  for (const [, key] of raw.matchAll(/[{,]\s*("(?:[^"\\]|\\.)*")\s*:/g)) {
    const value = JSON.parse(key)
    if (seen.has(value)) repeated.push(value)
    seen.add(value)
  }
  return { entries: Object.entries(data), repeated }
}

function validate({ entries, repeated }) {
  const errors = repeated.map((from) => `${from}: listed more than once`)
  const sources = new Map()
  for (const [from, to] of entries) {
    if (typeof to !== 'string') {
      errors.push(`${from}: target is not a string`)
      continue
    }
    for (const url of [from, to]) {
      if (!isPlainPath(url)) errors.push(`${from}: not a plain URL path ${JSON.stringify(url)}`)
    }
    const key = trimSlash(from)
    if (sources.has(key)) errors.push(`${from}: duplicates ${sources.get(key)}`)
    sources.set(key, from)
    if (trimSlash(from) === trimSlash(to)) errors.push(`${from}: redirects to itself`)
    if (isTaken(from)) errors.push(`${from}: is an existing page or file`)
    if (!isPage(to)) errors.push(`${from}: target ${to} is not a page`)
  }
  for (const [from, to] of entries) {
    if (typeof to === 'string' && sources.has(trimSlash(to)) && trimSlash(from) !== trimSlash(to)) {
      errors.push(`${from}: target ${to} is itself redirected`)
    }
  }
  return errors
}

const list = load()
const errors = validate(list)
if (errors.length) {
  console.error(`Redirect errors (${errors.length}) in .vitepress/config/rewrites.json:`)
  errors.forEach((e) => console.error('  -', e))
  process.exit(1)
}

if (mode === 'check') {
  console.log(`OK: ${list.entries.length} redirects.`)
  process.exit(0)
}

if (!existsSync(dirname(OUT))) {
  console.error(`${dirname(OUT)} not found: run vitepress build first.`)
  process.exit(1)
}

// both /old and /old/ redirect: links to the old site came with and without the slash;
// $is_args$args keeps the query string (utm tags and the like)
const lines = [
  '# Generated by scripts/redirects.mjs from .vitepress/config/rewrites.json, do not edit.',
  `location = ${OUT_URL} { return 404; }`,
]
for (const [from, to] of list.entries) {
  const bare = trimSlash(from)
  for (const url of new Set([bare, bare === '/' ? '/' : `${bare}/`])) {
    lines.push(`location = ${url} { return 301 ${to}$is_args$args; }`)
  }
}
writeFileSync(OUT, lines.join('\n') + '\n')
console.log(`Wrote ${list.entries.length} redirects to ${OUT}.`)
