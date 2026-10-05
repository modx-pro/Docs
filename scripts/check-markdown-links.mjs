/**
 * Check markdown links and images resolve (internal paths + optional external HTTP).
 * Usage:
 *   node scripts/check-markdown-links.mjs
 *   node scripts/check-markdown-links.mjs docs/components/indexnow
 *   node scripts/check-markdown-links.mjs --external
 *   node scripts/check-markdown-links.mjs --changed
 * Links are taken from the markdown-it parse, so code blocks, inline code and HTML comments
 * are skipped and reference-style links ([text][id] + [id]: url) are checked too.
 * --changed checks Markdown changed against the base branch and takes no paths.
 * Exit 0 if OK, 1 if broken, on unknown options or on a path that matches no Markdown.
 */
import { execFileSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { dirname, extname, join, normalize, relative, resolve } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS = join(ROOT, 'docs')

const args = process.argv.slice(2)
const checkExternal = args.includes('--external')
const changedOnly = args.includes('--changed')
const pathArgs = args.filter((a) => !a.startsWith('--'))

const unknown = args.filter((a) => a.startsWith('-') && !['--external', '--changed'].includes(a))
if (unknown.length) {
  console.error(`Unknown option: ${unknown.join(', ')}`)
  process.exit(1)
}
if (changedOnly && pathArgs.length) {
  console.error('--changed takes no paths: it checks the files changed against the base branch.')
  process.exit(1)
}

const FRONTMATTER_URL_KEYS = ['logo', 'modstore', 'repository', 'modx']

/** Package Manager service URL: 404 in browsers, valid as provider endpoint. */
const EXTERNAL_SKIP = [
  /^https?:\/\/(en\.)?modstore\.pro\/extras\/?$/i,
  /^https?:\/\/yandex\.com\/indexnow\/?$/i,
]

const EXTERNAL_OK = new Set([200, 201, 202, 204, 301, 302, 303, 307, 308, 401, 403, 405])

function changedMarkdownFiles() {
  const base = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : process.env.LINK_CHECK_BASE || 'origin/master'
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
    .filter((l) => l.endsWith('.md') && existsSync(join(ROOT, l)))
}

function collectFiles() {
  if (changedOnly) {
    return changedMarkdownFiles().map((p) => join(ROOT, p))
  }
  if (pathArgs.length === 0) {
    return fg.sync(['docs/**/*.md'], {
      cwd: ROOT,
      absolute: true,
      ignore: ['**/node_modules/**', '**/plop-templates/**'],
    })
  }
  const files = new Set()
  for (const p of pathArgs) {
    const abs = resolve(ROOT, p)
    // convertPathToPattern: forward slashes on Windows, glob characters in names escaped
    const pattern = fg.convertPathToPattern(abs) + (extname(abs) === '.md' ? '' : '/**/*.md')
    const found = fg.sync(pattern, {
      absolute: true,
      ignore: ['**/node_modules/**', '**/plop-templates/**'],
    })
    if (found.length === 0) {
      console.error(`No markdown files in: ${p}`)
      process.exit(1)
    }
    found.forEach((f) => files.add(normalize(f)))
  }
  return [...files]
}

function stripHashAndQuery(url) {
  return url.replace(/[#?].*$/, '')
}

const PUBLIC = join(DOCS, 'public')

function resolveInternalTarget(fromFile, href) {
  const raw = stripHashAndQuery(href)
  if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:')) {
    return null
  }

  let candidate
  if (raw.startsWith('/')) {
    candidate = join(DOCS, raw.replace(/^\//, ''))
  } else {
    candidate = resolve(dirname(fromFile), raw)
  }

  candidate = normalize(candidate)
  const found = existingTarget(candidate)
  if (found) {
    return found
  }

  // Site-root URLs for files in docs/public (VitePress srcDir is docs).
  if (raw.startsWith('/')) {
    const pub = existingTarget(normalize(join(PUBLIC, raw.replace(/^\//, ''))))
    if (pub) {
      return pub
    }
  }

  return false
}

function existingTarget(candidate) {
  if (existsSync(candidate) && !candidate.endsWith('/')) {
    return candidate
  }

  const asMd = candidate.endsWith('.md') ? candidate : `${candidate}.md`
  if (existsSync(asMd)) {
    return asMd
  }

  const asIndex = join(candidate, 'index.md')
  if (existsSync(asIndex)) {
    return asIndex
  }

  return false
}

// html: true turns comments and raw HTML into their own tokens instead of text;
// normalizeLink is off so hrefs stay as written (no percent-encoding of Cyrillic paths)
const md = new MarkdownIt({ html: true })
md.normalizeLink = (url) => url
md.validateLink = () => true

/** Links and images as markdown-it renders them: nothing from code, comments or raw HTML. */
function extractMarkdownLinks(content) {
  const links = []
  const walk = (tokens) => {
    for (const token of tokens) {
      if (token.type === 'link_open') {
        links.push({ href: token.attrGet('href') ?? '', image: false })
      } else if (token.type === 'image') {
        links.push({ href: token.attrGet('src') ?? '', image: true })
      }
      if (token.children) walk(token.children)
    }
  }
  walk(md.parse(content, {}))
  return links
}

async function checkHttp(url) {
  if (EXTERNAL_SKIP.some((re) => re.test(url))) {
    return { ok: true, skipped: true, status: 0 }
  }
  try {
    const head = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'user-agent': 'modx-pro-docs-link-check/1.0' },
    })
    if (EXTERNAL_OK.has(head.status)) {
      return { ok: true, status: head.status }
    }
    if (head.status === 405 || head.status === 501) {
      const get = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
        headers: { 'user-agent': 'modx-pro-docs-link-check/1.0' },
      })
      return { ok: EXTERNAL_OK.has(get.status), status: get.status }
    }
    return { ok: false, status: head.status }
  } catch (err) {
    return { ok: false, status: 0, error: err.message }
  }
}

const files = collectFiles()

if (files.length === 0) {
  console.log('OK: no markdown files to check.')
  process.exit(0)
}

const errors = []

for (const file of files) {
  const rel = relative(ROOT, file)
  const src = readFileSync(file, 'utf8')
  const { data, content } = matter(src)

  for (const link of extractMarkdownLinks(content)) {
    const href = link.href.trim()
    if (!href || href.startsWith('#')) {
      continue
    }

    if (/^https?:\/\//i.test(href)) {
      if (!checkExternal) {
        continue
      }
      const result = await checkHttp(href)
      if (!result.ok) {
        errors.push(`${rel}: ${href} (HTTP ${result.status || result.error || 'error'})`)
      }
      continue
    }

    const resolved = resolveInternalTarget(file, href)
    if (resolved === null) {
      continue
    }
    if (resolved === false) {
      errors.push(`${rel}: ${href}`)
    }
  }

  if (checkExternal) {
    for (const key of FRONTMATTER_URL_KEYS) {
      const value = data[key]
      const urls = Array.isArray(value) ? value : value ? [value] : []
      for (const url of urls) {
        if (typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
          continue
        }
        const result = await checkHttp(url)
        if (!result.ok) {
          errors.push(`${rel} frontmatter.${key}: ${url} (HTTP ${result.status || result.error || 'error'})`)
        }
      }
    }
  }
}

if (errors.length === 0) {
  console.log(
    `OK: markdown links${checkExternal ? ' (with external)' : ''}${changedOnly ? ' (changed files)' : ''} for ${files.length} file(s).`
  )
  process.exit(0)
}

console.error(`Broken links (${errors.length}):`)
errors.forEach((e) => console.error('  -', e))
process.exit(1)
