import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '../../docs')
const MIN = 120
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

function clipWords(text: string): string {
  const slice = text.slice(0, MAX + 1)
  const space = slice.lastIndexOf(' ')
  let cut = (space > 40 ? text.slice(0, space) : text.slice(0, MAX)).replace(/[,:;]\s*$/, '').trimEnd()
  const bits = cut.split(' ')
  while (bits.length > 4 && bits[bits.length - 1].length <= 2) bits.pop()
  cut = bits.join(' ')
  return cut
}

export function clipSnippet(text: string): string {
  const value = text.replace(/\s+/g, ' ').trim()
  if (value.length <= MAX) return value
  const parts = value.split(/(?<=[.!?])\s+/)
  let out = ''
  for (const part of parts) {
    const next = out ? `${out} ${part}` : part
    if (next.length > MAX) {
      if (out) return out
      return clipWords(part)
    }
    out = next
  }
  return out
}

function words(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function proseBlocks(content: string): string[] {
  const lines = content.split(/\r?\n/)
  let inFence = false
  let inComment = false
  const blocks: string[] = []
  let buf: string[] = []

  const flush = () => {
    if (!buf.length) return
    const text = plain(buf.join(' '))
    if (text) blocks.push(text)
    buf = []
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('```')) {
      inFence = !inFence
      flush()
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
      flush()
      continue
    }
    if (
      trimmed.startsWith('#')
      || trimmed.startsWith(':::')
      || trimmed.startsWith('|')
      || trimmed.startsWith('<')
      || trimmed.startsWith('{')
    ) {
      flush()
      continue
    }
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      flush()
      const item = plain(trimmed.replace(/^([-*+]|\d+\.)\s+/, ''))
      if (item) blocks.push(item)
      continue
    }
    buf.push(trimmed.replace(/^>\s?/, ''))
  }
  flush()
  return blocks
}

function merge(base: string, extra: string): string {
  const left = base.trim()
  const right = extra.trim()
  if (!left) return right
  if (!right) return left
  const leftFold = left.toLowerCase()
  const rightFold = right.toLowerCase()
  if (leftFold.includes(rightFold)) return left
  if (rightFold.includes(leftFold)) return right
  return `${left.replace(/[.!?…]+$/, '')}. ${right}`
}

export function pageProse(relativePath: string): string {
  const file = join(DOCS, relativePath)
  if (!existsSync(file)) return ''
  const { content } = matter(readFileSync(file, 'utf8'))
  let text = ''
  for (const block of proseBlocks(content)) {
    text = merge(text, block)
    if (text.length >= MAX) break
  }
  return clipSnippet(text)
}

function usable(text: string | undefined, title: string): string {
  if (!text) return ''
  const value = text.trim()
  if (!value || words(value) <= 1) return ''
  if (value.toLowerCase() === title.trim().toLowerCase()) return ''
  return value
}

export function snippetDescription(
  title: string,
  own: string | undefined,
  prose: string,
  componentDescription?: string,
): string {
  let text = usable(own, title)
  if (text.length < MIN) text = merge(text, prose)
  const component = usable(componentDescription, title)
  if (text.length < MIN && component) text = merge(text, component)
  return clipSnippet(text)
}
