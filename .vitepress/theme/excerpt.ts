import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '../../docs')
const MAX = 160

function decode(text: string): string {
  return text
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function plain(text: string): string {
  return decode(text)
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)]\[[^\]]*]/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]+/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function clip(text: string): string {
  if (text.length <= MAX) return text
  const slice = text.slice(0, MAX + 1)
  const sentence = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '))
  if (sentence > 40) return text.slice(0, sentence + 1)
  const space = slice.lastIndexOf(' ')
  return space > 40 ? text.slice(0, space) : text.slice(0, MAX)
}

function firstParagraph(content: string): string {
  const lines = content.split(/\r?\n/)
  let inFence = false
  let inComment = false
  const buf: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('```')) {
      inFence = !inFence
      if (buf.length) break
      continue
    }
    if (inFence) continue
    if (trimmed.startsWith('<!--')) {
      inComment = !trimmed.includes('-->')
      continue
    }
    if (inComment) {
      if (trimmed.includes('-->')) inComment = false
      continue
    }
    if (!trimmed) {
      if (buf.length) break
      continue
    }
    if (
      trimmed.startsWith('#')
      || trimmed.startsWith(':::')
      || trimmed.startsWith('|')
      || trimmed.startsWith('<')
      || trimmed.startsWith('{')
    ) continue
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      if (!buf.length) buf.push(trimmed.replace(/^([-*+]|\d+\.)\s+/, ''))
      break
    }
    buf.push(trimmed.replace(/^>\s?/, ''))
  }

  return buf.join(' ')
}

export function pageExcerpt(relativePath: string): string {
  const file = join(DOCS, relativePath)
  if (!existsSync(file)) return ''
  const { content } = matter(readFileSync(file, 'utf8'))
  return clip(plain(firstParagraph(content)))
}
