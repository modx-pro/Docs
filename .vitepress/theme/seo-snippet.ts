const BRAND = ' / docs.modx.pro'
const TITLE_MAX = 60

function words(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function sameText(left: string, right: string): boolean {
  return left.trim().toLowerCase() === right.trim().toLowerCase()
}

function firstClause(text: string): string {
  const sentence = text.split(/(?<=[.!?])\s/)[0] ?? text
  return sentence.replace(/[.!?…]+$/, '').trim()
}

function tidyPartial(cut: string, full: string): string {
  if (!cut || cut.length >= full.trim().length) return cut
  const bits = cut.split(' ')
  while (bits.length > 2) {
    const last = bits[bits.length - 1]
    const prev = bits[bits.length - 2]
    if (last.length <= 3) {
      bits.pop()
      continue
    }
    if (prev.length <= 3 && last.length <= 6) {
      bits.pop()
      continue
    }
    break
  }
  return bits.join(' ')
}

function clipExtra(pageTitle: string, extra: string): string {
  const room = TITLE_MAX - pageTitle.length - BRAND.length
  if (room < 4 || !extra) return ''
  const prefix = extra.startsWith(': ') ? ': ' : extra.startsWith(' ') ? ' ' : ''
  const clause = extra.slice(prefix.length)
  if (extra.length <= room) return extra
  const clauseRoom = room - prefix.length
  if (clauseRoom < 4) return ''
  const slice = clause.slice(0, clauseRoom + 1)
  const space = slice.lastIndexOf(' ')
  const cut = (space > 2 ? clause.slice(0, space) : clause.slice(0, clauseRoom)).trimEnd()
  const tidy = tidyPartial(cut, clause).replace(/[,:;]\s*$/, '').trim()
  if (!tidy || words(tidy) < 1) return ''
  return prefix + tidy
}

function withoutTitle(clause: string, title: string): string {
  if (!clause.toLowerCase().startsWith(title.toLowerCase())) return clause
  return clause.slice(title.length).replace(/^[\s:—–-]+/, '').trim()
}

function qualifier(label: string | undefined, description: string | undefined, title: string): string {
  const short = label?.trim() ?? ''
  if (short && !sameText(short, title)) {
    if (words(short) === 1) return short
    const clause = withoutTitle(firstClause(short), title)
    if (words(clause) > 1 && !sameText(clause, title)) return clause
  }
  const clause = description ? withoutTitle(firstClause(description), title) : ''
  if (!clause || sameText(clause, title) || words(clause) <= 1) return ''
  return clause
}

export function titleTemplateFor(
  pageTitle: string,
  componentTitle?: string,
  description?: string,
  label?: string,
): string | undefined {
  const title = pageTitle.trim()
  if (!title) return
  const component = componentTitle?.trim()
  const hasComponent = Boolean(component && title.toLowerCase().includes(component.toLowerCase()))
  const clause = qualifier(label, description, title)

  let extra = ''
  if (component && sameText(title, component) && clause) {
    extra = clipExtra(title, `: ${clause}`)
  } else if (component && !hasComponent) {
    extra = clipExtra(title, ` ${component}`)
  } else if (!component && clause && !title.includes(' / ') && (words(title) <= 1 || (title + BRAND).length < 50)) {
    extra = clipExtra(title, `: ${clause}`)
  }
  if (!extra) return
  return `:title${extra}${BRAND}`
}

export function documentTitle(pageTitle: string, titleTemplate?: string | boolean): string {
  if (typeof titleTemplate === 'string' && titleTemplate.includes(':title')) {
    return titleTemplate.replace(/:title/g, pageTitle)
  }
  return `${pageTitle}${BRAND}`
}
