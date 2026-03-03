/**
 * Generate og:image PNGs for component pages (issue #736).
 * Run before build: pnpm run generate:og
 */
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'
import { createElement } from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'docs', 'public', 'og')
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
    .replace(/&nbsp;/g, '\u00A0')
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
  try {
    const svg = readFileSync(LOGO_PATH, 'utf-8')
    const resvg = new Resvg(svg)
    const png = resvg.render().asPng()
    const base64 = Buffer.from(png).toString('base64')
    cachedLocalLogoDataUrl = `data:image/png;base64,${base64}`
    return cachedLocalLogoDataUrl
  } catch {
    return null
  }
}

function normalizeMimeType(contentType) {
  if (!contentType || typeof contentType !== 'string') return 'image/png'
  const base = contentType.split(';')[0].trim().toLowerCase()
  if (base === 'image/jpeg' || base === 'image/jpg') return 'image/jpeg'
  if (base === 'image/png' || base === 'image/gif') return base
  // Satori does not support WebP; treat as unsupported and caller will use fallback
  if (base === 'image/webp') return null
  return 'image/png'
}

async function fetchLogoDataUrl(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt))
      const res = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        headers: { 'User-Agent': 'Docs-modxpro/1.0 (og-image-generator)' },
      })
      if (!res.ok) continue
      const buf = await res.arrayBuffer()
      const base64 = Buffer.from(buf).toString('base64')
      const type = normalizeMimeType(res.headers.get('content-type'))
      if (type === null) return null
      return `data:${type};base64,${base64}`
    } catch {
      // retry on next iteration
    }
  }
  return null
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
  const resvg = new Resvg(svg)
  const png = resvg.render().asPng()
  return png
}

async function main() {
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
    const { data, content: body } = matter(content)
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

  mkdirSync(OUT_DIR, { recursive: true })
  const fonts = loadFonts()

  for (const [, item] of bySlug) {
    const logoDataUrl = item.logo ? await fetchLogoDataUrl(item.logo) : null
    const el = buildSatoriElement({
      title: item.title,
      subtitle: item.description,
      logoDataUrl,
    })
    const png = await generatePng(el, fonts)
    const outPath = join(OUT_DIR, `${item.slug}.png`)
    writeFileSync(outPath, png)
    console.log('Generated:', outPath)
  }

  const defaultEl = buildSatoriElement({
    title: DEFAULT_TITLE,
    logoDataUrl: null,
    isDefault: true,
  })
  const defaultPng = await generatePng(defaultEl, fonts)
  const defaultPath = join(ROOT, 'docs', 'public', 'og-default.png')
  writeFileSync(defaultPath, defaultPng)
  console.log('Generated:', defaultPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
