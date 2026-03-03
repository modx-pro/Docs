/**
 * Sync component frontmatter `logo` with current logo from Modstore page (`og:image`).
 * Usage: node scripts/sync-component-logos.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function normalizeUrl(url) {
  return String(url || '')
    .trim()
    .replace(/^http:\/\//i, 'https://')
    .replace(/\/$/, '')
}

function isModstorePackageLink(url) {
  return /^https?:\/\/modstore\.pro\/packages\//i.test(String(url || '').trim())
}

function extractFrontmatterRange(content) {
  const match = content.match(/^---\n[\s\S]*?\n---\n?/m)
  if (!match) return null
  return {
    start: match.index,
    end: (match.index ?? 0) + match[0].length,
    block: match[0],
  }
}

function replaceOrInsertLogo(frontmatterBlock, logoUrl) {
  const nextLine = `logo: ${logoUrl}`
  if (/^logo:\s*.+$/m.test(frontmatterBlock)) {
    return frontmatterBlock.replace(/^logo:\s*.+$/m, nextLine)
  }
  if (/^description:\s*.+$/m.test(frontmatterBlock)) {
    return frontmatterBlock.replace(/^description:\s*.+$/m, (line) => `${line}\n${nextLine}`)
  }
  if (/^title:\s*.+$/m.test(frontmatterBlock)) {
    return frontmatterBlock.replace(/^title:\s*.+$/m, (line) => `${line}\n${nextLine}`)
  }
  return frontmatterBlock.replace(/^---\n/, `---\n${nextLine}\n`)
}

async function fetchModstoreOgImage(modstoreUrl) {
  try {
    const response = await fetch(modstoreUrl, {
      headers: { 'User-Agent': 'Docs-modxpro/1.0 (logo-sync)' },
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) return null
    const html = await response.text()

    const match =
      html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i)
    if (!match?.[1]) return null

    let imageUrl = match[1].trim()
    if (imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`
    } else if (imageUrl.startsWith('/')) {
      imageUrl = `https://modstore.pro${imageUrl}`
    }

    return normalizeUrl(imageUrl)
  } catch {
    return null
  }
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

  const modstoreToOg = new Map()
  const changed = []
  const unresolved = []

  const modstoreLinks = new Set()
  for (const file of files) {
    const content = readFileSync(join(ROOT, file), 'utf-8')
    const { data } = matter(content)
    if (isModstorePackageLink(data.modstore)) {
      modstoreLinks.add(normalizeUrl(data.modstore))
    }
  }

  for (const modstoreUrl of modstoreLinks) {
    const ogImage = await fetchModstoreOgImage(modstoreUrl)
    if (ogImage) {
      modstoreToOg.set(modstoreUrl, ogImage)
    } else {
      unresolved.push(modstoreUrl)
    }
  }

  for (const file of files) {
    const fullPath = join(ROOT, file)
    const content = readFileSync(fullPath, 'utf-8')
    const { data } = matter(content)
    const modstoreUrl = normalizeUrl(data.modstore)
    if (!isModstorePackageLink(modstoreUrl)) continue

    const ogImage = modstoreToOg.get(modstoreUrl)
    if (!ogImage) continue

    const currentLogo = normalizeUrl(data.logo)
    if (currentLogo === ogImage) continue

    const range = extractFrontmatterRange(content)
    if (!range) continue
    const updatedFrontmatter = replaceOrInsertLogo(range.block, ogImage)
    if (updatedFrontmatter === range.block) continue

    const updated = content.slice(0, range.start) + updatedFrontmatter + content.slice(range.end)
    writeFileSync(fullPath, updated)
    changed.push({ file, from: currentLogo, to: ogImage })
  }

  console.log(`Updated logo in ${changed.length} files`)
  if (unresolved.length) {
    console.log(`Failed to resolve og:image for ${unresolved.length} modstore pages`)
    for (const url of unresolved) {
      console.log(`- ${url}`)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
