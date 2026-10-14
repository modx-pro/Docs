/**
 * Generate og:image PNGs for component pages (issue #736).
 * Runs as part of `pnpm build`; alone: `pnpm run generate:og` (`-- --force` redraws every image
 * and downloads every logo again).
 *
 * Incremental: an image is redrawn only when its inputs change: title, description, logo bytes,
 * this file, fonts, the site logo or the satori / resvg / react versions. Images, logos and the
 * manifest live in .vitepress/cache/og; the images are copied to docs/public/og and
 * docs/public/og-default.png (not tracked in git) for VitePress to publish.
 *
 * Logos: anything that isn't http(s) is a file in docs/public, and a missing or broken one fails
 * the run. Remote logos are downloaded in parallel, checked by decoding them (an HTML error page
 * or a truncated file is a failed download, not a logo), kept for a week and then downloaded again,
 * so a logo replaced at the same URL shows up. A failed download is retried after a day; meanwhile
 * the image goes without that logo, which is reported at the end (as a warning annotation in CI).
 * WebP, which satori can't draw, is converted to PNG.
 */
import { createHash } from 'crypto'
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'fs'
import { availableParallelism } from 'os'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { createElement } from 'react'
import satori from 'satori'
import { Resvg, renderAsync } from '@resvg/resvg-js'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'docs', 'public')
const OUT_DIR = join(PUBLIC, 'og')
const DEFAULT_NAME = 'og-default.png'
const DEFAULT_OUT = join(PUBLIC, DEFAULT_NAME)
const CACHE = join(ROOT, '.vitepress', 'cache', 'og')
const CACHE_IMAGES = join(CACHE, 'images')
const CACHE_LOGOS = join(CACHE, 'logos')
const MANIFEST = join(CACHE, 'manifest.json')
const FETCH_CONCURRENCY = 8
const DAY = 24 * 60 * 60 * 1000
const RETRY_FAILED_AFTER = DAY
const REFRESH_LOGO_AFTER = 7 * DAY
const LOGO_PATH = join(ROOT, 'docs', 'public', 'logo.svg')
const WIDTH = 1200
const HEIGHT = 630
const SITE_LABEL = 'docs.modx.pro'
const DEFAULT_TITLE = 'MODX.PRO Docs'

function getTitleFromContent(content) {
  for (const line of content.split('\n')) {
    const i = line.indexOf('# ')
    if (i !== -1) return line.slice(i + 2).trim()
  }
  return undefined
}

function getComponentSlug(path) {
  const base = path.replace(/^docs(\/en)?\/components\//, '').split('/')[0]
  return base.replace(/\.md$/, '')
}

function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str
  return str
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
}

function loadFonts() {
  return [
    { name: 'Inter', path: 'Inter-Regular.ttf', weight: 400, style: 'normal' },
    { name: 'Inter', path: 'Inter-Bold.ttf', weight: 700, style: 'normal' },
  ].map(({ name, path, weight, style }) => ({
    name,
    data: readFileSync(join(__dirname, 'fonts', path)),
    weight,
    style,
  }))
}

let cachedLocalLogoDataUrl = null

function loadLocalLogoPng() {
  if (cachedLocalLogoDataUrl !== null) return cachedLocalLogoDataUrl
  const png = new Resvg(readFileSync(LOGO_PATH, 'utf-8')).render().asPng()
  cachedLocalLogoDataUrl = `data:image/png;base64,${Buffer.from(png).toString('base64')}`
  return cachedLocalLogoDataUrl
}

const sha = (data) => createHash('sha256').update(data).digest('hex')

/** GitHub Actions shows `::warning::` lines as annotations in the run summary. */
function warn(message) {
  console.warn(process.env.GITHUB_ACTIONS ? `::warning::${message}` : `Warning: ${message}`)
}

/** Write via a temporary file, so an interrupted run never leaves a truncated file behind. */
function writeFileAtomic(file, data) {
  writeFileSync(`${file}.tmp`, data)
  renameSync(`${file}.tmp`, file)
}

function isSvg(buf) {
  const head = buf.subarray(0, 512).toString('utf8').replace(/^﻿/, '').trimStart().toLowerCase()
  return head.startsWith('<svg') || (head.startsWith('<?xml') && head.includes('<svg'))
}

/**
 * Check that the bytes are an image satori can draw and return them as { type, data }:
 * PNG, JPEG and GIF as they are, WebP converted to PNG, SVG as it is.
 * Throws with the reason for anything else (an HTML page, a truncated or unknown file).
 */
async function prepareLogo(buf) {
  if (isSvg(buf)) {
    new Resvg(buf) // throws on SVG that doesn't parse
    return { type: 'image/svg+xml', data: buf }
  }
  let format
  try {
    // decoding every pixel catches truncated files, not only a broken header
    await sharp(buf).raw().toBuffer()
    format = (await sharp(buf).metadata()).format
  } catch (err) {
    throw new Error(`not an image: ${err.message}`)
  }
  if (format === 'jpeg' || format === 'png' || format === 'gif') return { type: `image/${format}`, data: buf }
  return { type: 'image/png', data: await sharp(buf).png().toBuffer() }
}

const toDataUrl = ({ type, data }) => `data:${type};base64,${data.toString('base64')}`

/** { buf } or { error } with the reason. Only server errors, rate limits and network errors are retried. */
async function downloadLogo(url) {
  let error
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 1000))
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        headers: { 'User-Agent': 'Docs-modxpro/1.0 (og-image-generator)' },
      })
      if (res.ok) return { buf: Buffer.from(await res.arrayBuffer()) }
      error = `HTTP ${res.status}`
      // other 4xx (404, 403, 410…) won't change on retry
      if (res.status < 500 && res.status !== 429) break
    } catch (err) {
      error = err.name === 'TimeoutError' ? 'no answer in 10 s' : err.message
      // a host that didn't answer in 10 s won't answer in the next 10 either
      if (err.name === 'TimeoutError') break
    }
  }
  return { error }
}

async function loadLocalLogo(url) {
  const file = join(PUBLIC, url.replace(/^\/+/, ''))
  if (!existsSync(file)) throw new Error(`Logo not found: ${url} (expected docs/public/${url.replace(/^\/+/, '')})`)
  try {
    return await prepareLogo(readFileSync(file))
  } catch (err) {
    throw new Error(`Logo ${url}: ${err.message}`)
  }
}

/**
 * Resolve every logo once: local files from docs/public, remote ones from the cache or downloaded
 * FETCH_CONCURRENCY at a time. Returns url -> { type, data } | null (no logo for now).
 * logoIndex (url -> { file, type, fetchedAt } | { failedAt, error }) is updated in place.
 */
async function resolveLogos(urls, logoIndex, force) {
  const result = new Map()
  const toFetch = []
  const now = Date.now()
  for (const url of urls) {
    if (!/^https?:\/\//i.test(url)) {
      result.set(url, await loadLocalLogo(url))
      continue
    }
    const entry = logoIndex[url]
    // entries without a type come from an older cache format and are downloaded again
    const cached = entry?.file && entry.type && existsSync(join(CACHE_LOGOS, entry.file))
    if (cached) result.set(url, { type: entry.type, data: readFileSync(join(CACHE_LOGOS, entry.file)) })
    if (!force && cached && now - entry.fetchedAt < REFRESH_LOGO_AFTER) continue
    if (!force && !cached && entry?.failedAt && now - entry.failedAt < RETRY_FAILED_AFTER) {
      warn(`Logo ${url} failed earlier (${entry.error}), next try after ${new Date(entry.failedAt + RETRY_FAILED_AFTER).toISOString()}`)
      result.set(url, null)
      continue
    }
    toFetch.push(url)
  }

  let next = 0
  const worker = async () => {
    while (next < toFetch.length) {
      const url = toFetch[next++]
      const got = await downloadLogo(url)
      let logo
      let error = got.error
      if (got.buf) {
        try {
          logo = await prepareLogo(got.buf)
        } catch (err) {
          error = err.message
        }
      }
      if (logo) {
        const file = sha(url)
        writeFileAtomic(join(CACHE_LOGOS, file), logo.data)
        logoIndex[url] = { file, type: logo.type, fetchedAt: Date.now() }
        result.set(url, logo)
      } else if (result.has(url)) {
        // a refresh failed: keep drawing the logo downloaded before, try again after a day
        warn(`Logo ${url} could not be refreshed (${error}), using the cached one`)
        logoIndex[url] = { ...logoIndex[url], fetchedAt: Date.now() - REFRESH_LOGO_AFTER + RETRY_FAILED_AFTER }
      } else {
        warn(`Logo ${url} failed (${error})`)
        logoIndex[url] = { failedAt: Date.now(), error }
        result.set(url, null)
      }
    }
  }
  await Promise.all(Array.from({ length: FETCH_CONCURRENCY }, worker))
  return result
}

function buildSatoriElement({ title, subtitle, logoDataUrl, isDefault = false }) {
  const logo = logoDataUrl ?? loadLocalLogoPng()
  const isComponentLogo = !!logoDataUrl
  const titleText = decodeHtmlEntities(title)
  const subtitleText = decodeHtmlEntities(subtitle ?? SITE_LABEL)
  const children = []
  if (logo) {
    children.push(createElement('img', {
      src: logo,
      width: isComponentLogo ? 200 : 200,
      height: isComponentLogo ? 150 : 42,
      style: { objectFit: 'contain' },
    }))
  }
  children.push(
    createElement('div', {
      style: {
        fontSize: isDefault ? 48 : 56,
        fontWeight: 700,
        color: '#1a1a2e',
        textAlign: 'center',
        maxWidth: 1000,
      },
    }, titleText),
    createElement('div', {
      style: { fontSize: 24, color: '#666666', textAlign: 'center', maxWidth: 1000 },
    }, subtitleText)
  )
  return createElement(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 48,
      },
    },
    createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        },
      },
      ...children
    )
  )
}

async function generatePng(satoriElement, fonts) {
  const svg = await satori(satoriElement, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  })
  // rasterized on the libuv thread pool (4 threads by default), so satori can lay out
  // the next image meanwhile
  return (await renderAsync(svg)).asPng()
}

/** A missing manifest is a first run; a broken one is worth a word before everything is redrawn. */
function readManifest() {
  let text
  try {
    text = readFileSync(MANIFEST, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') return {}
    throw err
  }
  try {
    return JSON.parse(text)
  } catch (err) {
    warn(`OG cache manifest is broken (${err.message}), redrawing every image`)
    return {}
  }
}

/** Versions of the packages that draw the image: an upgrade may change how it looks. */
function rendererVersions() {
  return ['satori', '@resvg/resvg-js', 'react']
    .map((name) => `${name}@${JSON.parse(readFileSync(join(ROOT, 'node_modules', name, 'package.json'), 'utf8')).version}`)
}

async function main() {
  const force = process.argv.includes('--force')
  const files = fg.sync([
    'docs/components/*.md',
    '!docs/components/index.md',
    'docs/components/*/index.md',
    'docs/en/components/*.md',
    '!docs/en/components/index.md',
    'docs/en/components/*/index.md',
  ], { cwd: ROOT })

  const bySlug = new Map()
  for (const file of files) {
    const fullPath = join(ROOT, file)
    const content = readFileSync(fullPath, 'utf-8')
    const { data } = matter(content)
    const title = data.title ?? getTitleFromContent(content) ?? file.split('/').pop()?.replace('.md', '') ?? 'Component'
    const slug = getComponentSlug(file)
    const existing = bySlug.get(slug)
    if (!existing) {
      bySlug.set(slug, {
        slug,
        title,
        logo: data.logo,
        description: data.description,
      })
    } else if (data.logo && !existing.logo) {
      existing.logo = data.logo
    }
  }

  for (const dir of [CACHE_IMAGES, CACHE_LOGOS, OUT_DIR]) mkdirSync(dir, { recursive: true })
  const manifest = readManifest()
  const images = force ? {} : (manifest.images ?? {})
  const logoIndex = manifest.logos ?? {}
  const fonts = loadFonts()
  // any change to this file (not only the template), the fonts, the site logo
  // or the renderer versions redraws everything
  const base = sha([
    readFileSync(fileURLToPath(import.meta.url)),
    ...fonts.map((f) => f.data),
    readFileSync(LOGO_PATH),
    ...rendererVersions(),
  ].map((b) => sha(b)).join())

  const logoUrls = new Set([...bySlug.values()].map((i) => i.logo).filter(Boolean))
  const logos = await resolveLogos(logoUrls, logoIndex, force)

  const items = [...bySlug.values()].map((item) => {
    const logo = item.logo ? logos.get(item.logo) : null
    return {
      name: `${item.slug}.png`,
      logoUrl: item.logo,
      element: () => buildSatoriElement({ title: item.title, subtitle: item.description, logoDataUrl: logo ? toDataUrl(logo) : null }),
      key: sha(JSON.stringify([base, item.title, item.description ?? null, logo ? sha(logo.data) : null])),
      missingLogo: item.logo && !logo,
    }
  })
  items.push({
    name: DEFAULT_NAME,
    element: () => buildSatoriElement({ title: DEFAULT_TITLE, logoDataUrl: null, isDefault: true }),
    key: sha(JSON.stringify([base, 'default'])),
  })

  const saveManifest = (nextImages) => writeFileAtomic(MANIFEST, JSON.stringify({ images: nextImages, logos: logoIndex }, null, 2))

  const stale = items.filter((item) => images[item.name] !== item.key || !existsSync(join(CACHE_IMAGES, item.name)))
  let next = 0
  try {
    await Promise.all(Array.from({ length: availableParallelism() }, async () => {
      while (next < stale.length) {
        const item = stale[next++]
        try {
          writeFileAtomic(join(CACHE_IMAGES, item.name), await generatePng(item.element(), fonts))
        } catch (err) {
          // a logo that decodes but breaks the renderer: download it again next time
          if (item.logoUrl && logoIndex[item.logoUrl]) delete logoIndex[item.logoUrl]
          throw new Error(`OG image ${item.name}${item.logoUrl ? ` (logo ${item.logoUrl})` : ''}: ${err.message}`, { cause: err })
        }
      }
    }))
  } catch (err) {
    saveManifest(images)
    throw err
  }

  const nextImages = {}
  for (const item of items) {
    nextImages[item.name] = item.key
    copyFileSync(join(CACHE_IMAGES, item.name), item.name === DEFAULT_NAME ? DEFAULT_OUT : join(OUT_DIR, item.name))
  }

  // images of removed components, logos no component uses any more
  for (const name of readdirSync(OUT_DIR)) {
    if (!(name in nextImages)) rmSync(join(OUT_DIR, name), { recursive: true, force: true })
  }
  for (const name of readdirSync(CACHE_IMAGES)) {
    if (!(name in nextImages)) rmSync(join(CACHE_IMAGES, name), { force: true })
  }
  for (const url of Object.keys(logoIndex)) {
    if (!logoUrls.has(url)) delete logoIndex[url]
  }
  const usedLogoFiles = new Set(Object.values(logoIndex).map((e) => e.file).filter(Boolean))
  for (const name of readdirSync(CACHE_LOGOS)) {
    if (!usedLogoFiles.has(name)) rmSync(join(CACHE_LOGOS, name), { force: true })
  }

  saveManifest(nextImages)
  const withoutLogo = items.filter((item) => item.missingLogo).map((item) => item.name.replace(/\.png$/, ''))
  if (withoutLogo.length) warn(`OG images without a component logo for now: ${withoutLogo.join(', ')}`)
  console.log(`OG images: ${items.length}, redrawn: ${stale.length}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
