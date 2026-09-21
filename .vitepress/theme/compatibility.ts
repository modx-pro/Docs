const LABELS: Record<string, string> = {
  modx2: 'MODX 2',
  modx3: 'MODX 3',
  vue2: 'Vue 2',
  vue3: 'Vue 3',
  minishop2: 'miniShop2',
  minishop3: 'miniShop3',
}

export function compatibilityLabel(key: string): string | undefined {
  const php = key.match(/^php(\d)(\d)$/)
  if (php) return `PHP ${php[1]}.${php[2]}`
  return LABELS[key]
}

export function normalizeCompatibility(value: unknown): string[] {
  const list = Array.isArray(value)
    ? value
    : (typeof value === 'string' ? [value] : [])
  const seen = new Set<string>()
  const out: string[] = []

  for (const item of list) {
    if (typeof item !== 'string') continue
    const key = item.trim().toLowerCase().replace(/\./g, '')
    if (!key || seen.has(key) || !compatibilityLabel(key)) continue
    seen.add(key)
    out.push(key)
  }

  return out
}

export function compatibilityLabels(values: string[] | undefined): string[] {
  if (!values?.length) return []
  return values.flatMap((key) => {
    const label = compatibilityLabel(key)
    return label ? [label] : []
  })
}
