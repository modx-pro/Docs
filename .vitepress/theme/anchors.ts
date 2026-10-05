import { slugify as transliterateSlug } from 'transliteration'

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_.:-]*$/

const ANCHOR_HEADERS = new Set([
  'ключ',
  'key',
  'настройка',
  'setting',
  'settings',
  'параметр',
  'parameter',
  'param',
  'имя',
  'name',
  'сниппет',
  'snippet',
  'событие',
  'event',
  'плейсхолдер',
  'placeholder',
])

export function plainLabel(value: string): string {
  return value.replace(/[`*_[\]()]/g, '').trim().toLowerCase()
}

export function isSettingColumn(header: string | undefined): boolean {
  if (!header) return false
  return ANCHOR_HEADERS.has(plainLabel(header))
}

export function settingKeyFromCell(cell: string | undefined): string | undefined {
  if (!cell) return
  const trimmed = cell.trim()
  const code = trimmed.match(/^`([^`]+)`$/)
  const link = trimmed.match(/^\[([^\]]+)\]\([^)\s]+\)$/)
  const raw = (code?.[1] ?? link?.[1] ?? trimmed).trim()
  if (!IDENTIFIER.test(raw)) return
  return raw
}

/**
 * Heading that is a single setting or snippet key.
 * The shared slugify drops `_` and `.` and then cuts at 25 characters,
 * so `ms3_order_product_options` never matches the key.
 */
export function headingAnchor(str: string): string | undefined {
  const trimmed = str.trim().replace(/^`+|`+$/g, '').trim()
  if (!IDENTIFIER.test(trimmed)) return
  if (!/[_.]/.test(trimmed)) return
  return trimmed
}

export function legacyHeadingSlug(str: string): string {
  const normalized = str.trim()
    .replace(/^\d*/g, '')
    .replace(/[^a-zA-Zа-яА-ЯЁё0-9\-\s]/g, '')
    .replace(/\s\-\s/, '-')
    .replace(/\-+/g, '-')
    .replace(/^(.{25}[^\s]*).*/, '$1')

  return encodeURIComponent(transliterateSlug(normalized, { lowercase: true }))
}

export function headingSlug(str: string): string {
  return headingAnchor(str) ?? legacyHeadingSlug(str)
}

export function uniqueSettingAnchor(
  header: string | undefined,
  cell: string | undefined,
  seen: Set<string>,
): string | undefined {
  if (!isSettingColumn(header)) return
  const key = settingKeyFromCell(cell)
  if (!key || seen.has(key)) return
  seen.add(key)
  return key
}
