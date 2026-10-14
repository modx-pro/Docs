/**
 * Check markdown links and images resolve (internal paths + optional external HTTP).
 * Usage:
 *   node scripts/check-markdown-links.mjs
 *   node scripts/check-markdown-links.mjs docs/components/indexnow
 *   node scripts/check-markdown-links.mjs --external
 *   node scripts/check-markdown-links.mjs --changed
 *   node scripts/check-markdown-links.mjs --check-anchors
 *   node scripts/check-markdown-links.mjs --strict-anchors
 * Links are taken from the markdown-it parse, so code blocks, inline code and HTML comments
 * are skipped and reference-style links ([text][id] + [id]: url) are checked too.
 * --changed checks Markdown changed against the base branch and takes no paths.
 * --check-anchors warns when a fragment is not a heading slug, a custom id,
 * a repeated-heading suffix (-1, -2) or a settings-table row id.
 * --strict-anchors reports those misses as errors.
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
const checkAnchors = args.includes('--anchors') || args.includes('--check-anchors') || args.includes('--strict-anchors')
const strictAnchors = args.includes('--strict-anchors')
const pathArgs = args.filter((a) => !a.startsWith('--'))

const KNOWN_FLAGS = ['--external', '--changed', '--anchors', '--check-anchors', '--strict-anchors']
const unknown = args.filter((a) => a.startsWith('-') && !KNOWN_FLAGS.includes(a))
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

const anchorCache = new Map()
let anchorFns = null

function headingPlain(inline) {
  const children = inline?.children ?? []
  return children
    .filter(child => child.type !== 'html_inline' && child.type !== 'emoji')
    .map(child => child.content)
    .join('')
    .trim()
}

function splitCustomId(text) {
  const match = text.match(/\{#([A-Za-z0-9_.:-]+)\}\s*$/)
  if (!match) return { text, id: null }
  return { text: text.slice(0, match.index).trim(), id: match[1] }
}

function claimSlug(base, seen, userDefined) {
  if (!base) return null
  if (userDefined) {
    if (seen.has(base)) return null
    seen.add(base)
    return base
  }
  let slug = base
  let index = 1
  while (seen.has(slug)) {
    slug = `${base}-${index}`
    index += 1
  }
  seen.add(slug)
  return slug
}

function addAnchor(anchors, slug) {
  if (!slug) return
  anchors.add(slug)
  if (slug.includes('%')) {
    try {
      anchors.add(decodeURIComponent(slug))
    } catch {
      // keep the encoded slug
    }
  }
}

function inlineAt(tokens, index) {
  const next = tokens[index + 1]
  return next?.type === 'inline' ? next.content.trim() : ''
}

function collectTableAnchors(tokens, anchors) {
  const seen = new Set()
  let inHead = false
  let headerCells = []
  let headers = null
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === 'thead_open') {
      inHead = true
      headerCells = []
      continue
    }
    if (token.type === 'thead_close') {
      inHead = false
      headers = headerCells
      continue
    }
    if (inHead && token.type === 'th_open') {
      headerCells.push(inlineAt(tokens, i))
      continue
    }
    if (inHead || token.type !== 'tr_open' || !headers?.length) continue
    let cell = ''
    for (let j = i + 1; j < tokens.length; j++) {
      if (tokens[j].type === 'tr_close') break
      if (tokens[j].type === 'td_open') {
        cell = inlineAt(tokens, j)
        break
      }
    }
    addAnchor(anchors, anchorFns.uniqueSettingAnchor(headers[0], cell, seen))
  }
}

function extractPageAnchors(filePath) {
  if (anchorCache.has(filePath)) {
    return anchorCache.get(filePath)
  }
  if (!existsSync(filePath)) {
    return new Set()
  }

  const src = readFileSync(filePath, 'utf8')
  const { content } = matter(src)
  const anchors = new Set()
  const seen = new Set()
  const tokens = md.parse(content, {})

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'heading_open') continue
    const inline = tokens[i + 1]
    if (!inline || inline.type !== 'inline') continue
    const split = splitCustomId(headingPlain(inline))
    const id = split.id
      ? claimSlug(split.id, seen, true)
      : claimSlug(anchorFns.headingSlug(split.text), seen, false)
    addAnchor(anchors, id)
    const key = anchorFns.headingAnchor(split.text)
    if (!key) continue
    const legacy = anchorFns.legacyHeadingSlug(split.text)
    if (legacy && legacy !== key) addAnchor(anchors, legacy)
  }

  collectTableAnchors(tokens, anchors)
  anchorCache.set(filePath, anchors)
  return anchors
}

const files = collectFiles()

if (files.length === 0) {
  console.log('OK: no markdown files to check.')
  process.exit(0)
}

const errors = []
const warnings = []

if (checkAnchors) {
  anchorFns = await import('../.vitepress/theme/anchors.ts')
}

for (const file of files) {
  const rel = relative(ROOT, file)
  const src = readFileSync(file, 'utf8')
  const { data, content } = matter(src)

  for (const link of extractMarkdownLinks(content)) {
    const href = link.href.trim()
    if (!href) {
      continue
    }

    // Anchor validation when enabled
    const hashIdx = href.indexOf('#')
    if (checkAnchors && !link.image && hashIdx !== -1) {
      const rawHash = href.slice(hashIdx + 1).split('?')[0]
      if (rawHash) {
        let targetFile = file
        if (!href.startsWith('#')) {
          const resolved = resolveInternalTarget(file, href)
          if (resolved && resolved.endsWith('.md')) {
            targetFile = resolved
          } else {
            targetFile = null
          }
        }
        if (targetFile) {
          const anchors = extractPageAnchors(targetFile)
          let decoded = rawHash
          try {
            decoded = decodeURIComponent(rawHash)
          } catch {
            decoded = rawHash
          }
          const ok = anchors.has(rawHash) || anchors.has(decoded)
          if (!ok) {
            const msg = `${rel}: ${href} (anchor #${decoded} not found in ${relative(ROOT, targetFile)})`
            if (strictAnchors) {
              errors.push(msg)
            } else {
              warnings.push(msg)
            }
          }
        }
      }
    }

    if (href.startsWith('#')) {
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

if (warnings.length > 0) {
  console.warn(`Anchor warnings (${warnings.length}):`)
  warnings.slice(0, 50).forEach((w) => console.warn('  -', w))
  if (warnings.length > 50) {
    console.warn(`  ... and ${warnings.length - 50} more anchor warnings`)
  }
}

if (errors.length === 0) {
  console.log(
    `OK: markdown links${checkExternal ? ' (with external)' : ''}${changedOnly ? ' (changed files)' : ''}${checkAnchors ? ' (anchors checked)' : ''} for ${files.length} file(s).`
  )
  process.exit(0)
}

console.error(`Broken links (${errors.length}):`)
errors.forEach((e) => console.error('  -', e))
process.exit(1)
