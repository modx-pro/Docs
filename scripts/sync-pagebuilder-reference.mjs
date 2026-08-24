#!/usr/bin/env node
/**
 * Sync PageBuilder field + section reference pages from the package into Docs.
 *
 * Usage: node scripts/sync-pagebuilder-reference.mjs [packagePath]
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CATEGORY_LABELS,
  SAMPLE_BY_FIELD_NAME,
  getSectionCopy,
  fieldLabel,
  fieldDescription,
} from './pagebuilder-section-meta.mjs'
import { getFieldEnrichment } from './pagebuilder-field-enrichment.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '..')
const packagePath = process.argv[2]
  || path.resolve(docsRoot, '../../Sites/project/Extras/msPageBuilder')

const ruFieldsDir = path.join(docsRoot, 'docs/components/pagebuilder/fields')
const ruSectionsDir = path.join(docsRoot, 'docs/components/pagebuilder/sections')
const enFieldsDir = path.join(docsRoot, 'docs/en/components/pagebuilder/fields')
const enSectionsDir = path.join(docsRoot, 'docs/en/components/pagebuilder/sections')

const pkgFieldsDir = path.join(packagePath, 'docs/fields')
const freeSectionsDir = path.join(packagePath, 'core/components/pagebuilder/sections')
const proSectionsDir = path.join(packagePath, 'PageBuilderPro/core/components/pagebuilderpro/sections')

const FIELD_SKIP = new Set(['types.md', 'overview.md'])
const SECTION_SKIP = new Set(['_qa_field_matrix.json'])
const PRESETS_DIR = 'presets'

const EN_HEADING = {
  '# Поле ': '# Field ',
  '## Компонент': '## Component',
  '## Настройка': '## Schema',
  '## Значение': '## Value',
  '## Вывод': '## Output',
  '## Вывод': '## Output in section.data',
  '## Пример': '## Chunk example',
  '## Вывод в section.data': '## Output in section.data',
  '## Пример в chunk': '## Chunk example',
  '## Примечание': '## Notes',
  '## Общие свойства': '## Common properties',
  '## Дальше': '## See also',
  'Слой: **Free**': 'Layer: **Free**',
  'Слой: **Pro**': 'Layer: **Pro**',
  '# Обзор полей': '# Fields overview',
  '# Справочник типов полей': '# Field types reference',
  '# Каталог секций': '# Section catalog',
  '## Free': '## Free',
  '## Pro': '## Pro',
  '## Минимальное поле': '## Minimal field',
  '## Общие свойства поля': '## Common field properties',
  '## Repeater': '## Repeater',
  '## showWhen': '## showWhen',
  '## optionsSource': '## optionsSource',
  '## Фронт и enrich': '## Frontend and enrich',
  '## Составные сценарии': '## Composite scenarios',
  '## Алиасы': '## Aliases',
  '## Требования (requires)': '## Requirements (requires)',
  '## UI каталога на ресурсе': '## Resource catalog UI',
  '## Responsive поля (Pro)': '## Responsive fields (Pro)',
  '## Файлы': '## Files',
  '## Поля': '## Fields',
  '## Chunk': '## Chunk',
  '## JSON': '## JSON',
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function rewriteFieldLinks(content, langPrefix) {
  const integration = '../integration'
  const settings = '../settings'

  return content
    .replace(/\]\(([a-zA-Z0-9_.-]+)\.md(#[^)]*)?\)/g, ']($1$2)')
    .replace(/\]\(\.\.\/manager\/pro\.md\)/g, `](${integration})`)
    .replace(/\]\(\.\.\/manager\/inspector\.md\)/g, `](${integration})`)
    .replace(/\]\(\.\.\/manager\/cmp\.md[^)]*\)/g, `](${integration})`)
    .replace(/\]\(\.\.\/getting-started\/configuration\.md[^)]*\)/g, `](${settings})`)
    .replace(/\]\(\.\.\/developer\/[^)]+\)/g, `](${integration})`)
}

function translateEn(content) {
  let out = content
  for (const [from, to] of Object.entries(EN_HEADING)) {
    out = out.split(from).join(to)
  }
  out = out
    .replace(/Подробнее: \[обзор полей\]\(overview#общие-свойства-поля\)/g, 'See [fields overview](overview#common-field-properties)')
    .replace(/\[обзор полей\]\(overview\.md#общие-свойства-поля\)/g, '[fields overview](overview#common-field-properties)')
    .replace(/\[обзор полей\]\(overview#общие-свойства-поля\)/g, '[fields overview](overview#common-field-properties)')
    .replace(/\[Справочник типов\]\(types\)/g, '[Field types reference](types)')
    .replace(/\[Обзор полей\]\(overview\)/g, '[Fields overview](overview)')
    .replace(/\[Инспектор\][^)]+\)/g, '[Manager and events](../integration)')
    .replace(/- \[Справочник типов\]\(types\.md\)/g, '- [Field types reference](types)')
    .replace(/- \[Обзор полей\]\(overview\.md\)/g, '- [Fields overview](overview)')
    .replace(/Инспектор:/g, 'Inspector:')
    .replace(/Страница \|/g, 'Page |')
    .replace(/\| Слой \|/g, '| Layer |')
    .replace(/\| type \| Слой \| Страница \|/g, '| type | Layer | Page |')
    .replace(/Поле показывается, если значение другого поля совпало с `value`/g, 'The field is visible when another field matches `value`')
    .replace(/Processor: `mgr\/field\/options`\. Хук: `pbOnFieldValues`\./g, 'Processor: `mgr/field/options`. Event: `pbOnFieldValues`.')
    .replace(/Вкладка \*\*Tables\*\* на ресурсе или tab type `table` в Collections\. Поле `embeddedTable` хранит `table_key` и настройки выборки\. См\. \[настройку таблиц\][^)]+\) и \[CMP\][^)]+\)\./g,
      'Use the resource **Tables** tab or Collections tab type `table`. Field `embeddedTable` stores `table_key` and query options. See [settings](../settings) and [integration](../integration).')
  return out
}

function extractTitle(body) {
  const m = body.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : 'PageBuilder'
}

function extractDescription(body, fallback, lang = 'ru') {
  const layer = body.match(/Слой:\s+\*\*(Free|Pro)\*\*/) || body.match(/Layer:\s+\*\*(Free|Pro)\*\*/)
  if (layer) {
    return lang === 'en'
      ? `PageBuilder field type (${layer[1]})`
      : `Тип поля PageBuilder (${layer[1]})`
  }
  if (body.includes('# Обзор полей') || body.includes('# Fields overview')) {
    return lang === 'en'
      ? 'Field schema in section JSON, inspector widgets, and section.data output'
      : 'Схема полей в JSON секции, виджеты инспектора и вывод в section.data'
  }
  if (body.includes('# Справочник типов') || body.includes('# Field types reference')) {
    return lang === 'en'
      ? 'All 50 PageBuilder inspector field types (Free and Pro)'
      : 'Все 50 типов полей инспектора PageBuilder (Free и Pro)'
  }
  return fallback
}

function fixTableSeparators(content) {
  return content.replace(/^\|[-:| ]+\|\s*$/gm, (line) => {
    const cols = line.split('|').filter((cell, i, arr) => i > 0 && i < arr.length - 1)
    if (!cols.length || !cols.every(cell => /^[-: ]+$/.test(cell))) {
      return line
    }
    return `| ${cols.map(() => '---').join(' | ')} |`
  })
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, fixTableSeparators(content))
}

function yamlScalar(value, { alwaysQuote = false } = {}) {
  const s = String(value ?? '')
  if (alwaysQuote || /[:#[\]{}&*,>|!@`'"\n]|^\s|\s$/.test(s)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
  }
  return s
}

function wrapFrontmatter(title, description, body, options = {}) {
  const content = options.skipTableFix ? body.trim() : fixTableSeparators(body.trim())
  const safeTitle = yamlScalar(title.replace(/^Поле /, '').replace(/^Field /, ''), { alwaysQuote: true })
  const safeDesc = yamlScalar(description, { alwaysQuote: true })
  return `---\ntitle: ${safeTitle}\ndescription: ${safeDesc}\n---\n\n${content}\n`
}

function fieldScreenshotStub(fieldKey) {
  return `\n\n<!-- ![${fieldKey}](/components/pagebuilder/screenshots/fields/${fieldKey}.png) -->\n`
}

function injectFieldEnrichmentBlocks(body, fieldKey, lang) {
  const copy = getFieldEnrichment(fieldKey, lang)
  if (!copy.benefits && !copy.use && !copy.tips && !copy.related) return body
  const schemaHeading = lang === 'en' ? '## Schema' : '## Настройка'
  if (!body.includes(schemaHeading)) return body

  let blocks = ''
  if (copy.benefits) {
    blocks += `\n\n## ${lang === 'en' ? 'Why this type' : 'Зачем этот тип'}\n\n${copy.benefits}`
  }
  if (copy.use) {
    blocks += `\n\n## ${lang === 'en' ? 'When to use' : 'Когда использовать'}\n\n${copy.use}`
  }
  if (copy.tips) {
    blocks += `\n\n## ${lang === 'en' ? 'Tips' : 'Советы'}\n\n${copy.tips}`
  }
  if (copy.related) {
    blocks += `\n\n## ${lang === 'en' ? 'Similar types' : 'Похожие типы'}\n\n${copy.related}`
  }

  return body.replace(schemaHeading, `${blocks}\n\n${schemaHeading}`)
}

function injectFieldScreenshotStub(body, fieldKey) {
  if (body.includes(`/screenshots/fields/${fieldKey}.png`)) return body
  const stub = fieldScreenshotStub(fieldKey)
  return body.replace(
    /^((?:# (?:Поле|Field) .+\n\n(?:Слой|Layer): \*\*(?:Free|Pro)\*\*\.)\n)/m,
    `$1${stub}`,
  )
}

function injectScreenshotCommentBefore(body, heading, commentLine) {
  if (body.includes(commentLine)) return body
  const idx = body.indexOf(heading)
  if (idx === -1) return body
  const before = body.slice(0, idx).replace(/\n+$/, '')
  return `${before}\n\n${commentLine}\n\n${body.slice(idx)}`
}

function stripFieldComponentSection(body) {
  return body.replace(/^## (Компонент|Component)\r?\n\r?\n[\s\S]*?(?=\r?\n##[^\n]*\r?\n)/m, '')
}

function fixVueMarkdown(body) {
  return body
    .replace(/\{\{utm:([^}]+)\}\}/g, '\\{\\{utm:$1\\}\\}')
    .replace(
      /\*\*Pro \(capability `responsive`\):\*\* `responsive: true` — в `section\.data` объект `\{ desktop, tablet, mobile \}` вместо скаляра\./g,
      '**Pro** (capability `responsive`): при `responsive: true` в `section.data` — ключи `desktop`, `tablet`, `mobile` вместо скаляра.',
    )
    .replace(
      /\*\*Pro \(capability `responsive`\):\*\* `responsive: true` — in `section\.data` object `\{ desktop, tablet, mobile \}` instead of a scalar\./g,
      '**Pro** (capability `responsive`): with `responsive: true`, `section.data` stores keys `desktop`, `tablet`, and `mobile` instead of a scalar.',
    )
}

function polishFieldDocs(body) {
  let out = stripFieldComponentSection(body)
  out = out.replace(
    /У каждого из 50 типов своя страница в \[справочнике\]\(types[^)]*\): компонент Vue, JSON \*\*Настройка\*\*/,
    'У каждого из 50 типов своя страница в [справочнике](types): JSON **Настройка**',
  )
  out = out.replace(
    /^Инспектор: `SectionInspectorFields\.vue` → `SectionFieldInput\.vue` и вложенные компоненты\. Алиасы типов нормализует `normalizeFieldType\(\)` в `fieldDefaults\.ts`\.\r?\n\r?\n/m,
    '',
  )
  out = fixVueMarkdown(out)
  return out.replace(/\n{3,}/g, '\n\n')
}

function syncFieldFile(filename, srcDir, destDir, lang) {
  const raw = fs.readFileSync(path.join(srcDir, filename), 'utf8')
  let body = rewriteFieldLinks(raw, lang === 'en' ? 'en' : '')
  body = normalizeFieldHeadings(body, 'ru')
  if (lang === 'en') {
    body = translateEn(body)
  }
  body = polishFieldDocs(body)

  const title = extractTitle(body)
  const base = filename.replace(/\.md$/, '')
  const outPath = path.join(destDir, `${base}.md`)
  body = injectFieldScreenshotStub(body, base)
  body = injectFieldEnrichmentBlocks(body, base, lang)

  const enrich = getFieldEnrichment(base, lang)
  const layerMatch = body.match(/(?:Слой|Layer):\s+\*\*(Free|Pro)\*\*/)
  const layerSuffix = layerMatch ? layerMatch[1] : 'Free'

  let fmTitle = title
  if (lang === 'en' && fmTitle.startsWith('Поле ')) {
    fmTitle = fmTitle.replace(/^Поле /, '')
  }

  const desc = enrich.description || (lang === 'en'
    ? `PageBuilder field type (${layerSuffix})`
    : `Тип поля PageBuilder (${layerSuffix})`)

  fs.writeFileSync(outPath, wrapFrontmatter(fmTitle, desc, body.replace(/^#[^\n]+\n+/, `# ${lang === 'en' && title.startsWith('Поле ') ? 'Field ' + title.slice(5) : title}\n\n`).replace(/\n{3,}/g, '\n\n')))
}

function listFieldFiles() {
  return fs.readdirSync(pkgFieldsDir)
    .filter(f => f.endsWith('.md') && !FIELD_SKIP.has(f))
    .sort()
}

function readSectionJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function listSectionDefinitions() {
  const items = []

  for (const file of fs.readdirSync(freeSectionsDir)) {
    if (!file.endsWith('.json') || SECTION_SKIP.has(file)) continue
    items.push({ json: readSectionJson(path.join(freeSectionsDir, file)), layer: 'Free', file })
  }

  if (fs.existsSync(proSectionsDir)) {
    for (const file of fs.readdirSync(proSectionsDir)) {
      if (!file.endsWith('.json')) continue
      if (file.includes(PRESETS_DIR)) continue
      items.push({ json: readSectionJson(path.join(proSectionsDir, file)), layer: 'Pro', file })
    }
  }

  return items.sort((a, b) => a.json.key.localeCompare(b.json.key))
}

function findChunkTpl(chunk) {
  const candidates = [
    path.join(packagePath, 'core/components/pagebuilder/elements/chunks', `${chunk}.tpl`),
    path.join(packagePath, 'PageBuilderPro/core/components/pagebuilderpro/elements/chunks', `${chunk}.tpl`),
    path.join(packagePath, 'PageBuilderPro/core/components/pagebuilderpro/elements/chunks', chunk.replace(/^pagebuilder_/, 'pagebuilderpro_') + '.tpl'),
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return fs.readFileSync(candidate, 'utf8').trim()
    }
  }
  return null
}

function sampleFieldValue(field) {
  if (field.name && Object.prototype.hasOwnProperty.call(SAMPLE_BY_FIELD_NAME, field.name)) {
    const preset = SAMPLE_BY_FIELD_NAME[field.name]
    if (preset !== null && preset !== undefined) {
      return preset
    }
  }

  const type = field.type
  switch (type) {
    case 'text':
      return field.name === 'title' ? 'Заголовок секции' : 'Текст'
    case 'textarea':
      return 'Многострочный текст'
    case 'richtext':
    case 'ace':
      return '<p>HTML контент</p>'
    case 'number':
    case 'currency':
      return 42
    case 'url':
      return 'https://example.com'
    case 'slug':
      return 'zagolovok-sekcii'
    case 'select':
    case 'radio':
      return field.options?.[0]?.value ?? 'value'
    case 'checkbox':
      return true
    case 'checkboxgroup':
      return field.options?.slice(0, 1).map(o => o.value) ?? ['a']
    case 'yesno':
    case 'toggle':
      return true
    case 'date':
      return '2026-01-15'
    case 'time':
      return '14:30'
    case 'datetime':
      return '2026-01-15T14:30:00'
    case 'color':
      return '#336699'
    case 'colorpalette':
      return field.options?.[0]?.value ?? '#336699'
    case 'file':
    case 'image':
      return {
        url: 'assets/images/example.jpg',
        id: 12,
        filename: 'example.jpg',
        extension: 'jpg',
        title: 'example.jpg',
        width: 1920,
        height: 1080,
        type: 'image',
      }
    case 'button':
      return { label: 'Подробнее', url: 'https://example.com', target: '_self' }
    case 'hidden':
      return 'hidden-value'
    case 'readonly':
      return 'Только чтение'
    case 'repeater': {
      const row = { _rowId: '00000000-0000-4000-8000-000000000001' }
      for (const sub of field.fields || []) {
        row[sub.name] = sampleFieldValue(sub)
      }
      return [row]
    }
    case 'editorjs':
      return { json: {}, html: '<p>Текст блока</p>' }
    case 'gallery':
      return [sampleFieldValue({ type: 'image', name: 'photo' })]
    case 'video':
      return {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        provider: 'youtube',
      }
    case 'map':
      return {
        lat: 55.751244,
        lng: 37.618423,
        embed_url: 'https://yandex.ru/map-widget/v1/...',
      }
    case 'relation':
    case 'multirelation':
      return type === 'multirelation' ? [101, 102] : 101
    case 'multiselect':
    case 'combo':
    case 'multicombo':
      return field.options?.slice(0, 2).map(o => o.value) ?? ['a']
    case 'embeddedTable':
      return { table_key: 'prices', limit: 10 }
    case 'keyvalue':
      return [{ key: 'sku', value: '001' }]
    case 'tag':
      return ['tag-a', 'tag-b']
    default:
      return null
  }
}

function buildSampleSectionData(fields) {
  const data = {}
  for (const field of fields) {
    if (!field.name || field.type === 'heading' || field.type === 'dependent') {
      continue
    }
    const value = sampleFieldValue(field)
    if (value !== null) {
      data[field.name] = value
    }
  }
  return data
}

function normalizeFieldHeadings(body, lang) {
  let out = body
  if (lang === 'en') {
    out = out
      .replace(/^## Output$/m, '## Output in section.data')
      .replace(/^## Example$/m, '## Chunk example')
  } else {
    out = out
      .replace(/^## Вывод$/m, '## Вывод в section.data')
      .replace(/^## Пример$/m, '## Пример в chunk')
  }
  return out
}

function enhanceTypesTables(body, lang) {
  const outputCol = lang === 'en' ? 'Output and example' : 'Вывод и пример'
  const outputLink = (slug) => lang === 'en'
    ? `[JSON and Fenom](${slug}#output-in-section-data)`
    : `[JSON и Fenom](${slug}#vyvod-v-section-data)`

  let out = body
    .replace(/\| type \| Слой \| Страница \|/g, `| type | Слой | Страница | ${outputCol} |`)
    .replace(/\| type \| Layer \| Page \|/g, `| type | Layer | Page | ${outputCol} |`)
    .replace(/(\| type \| Слой \| Страница \| Вывод и пример \|\n)\|[-:| ]+\|\s*\n/g, '$1| --- | --- | --- | --- |\n')
    .replace(/(\| type \| Layer \| Page \| Output and example \|\n)\|[-:| ]+\|\s*\n/g, '$1| --- | --- | --- | --- |\n')
    .replace(/\| `([a-zA-Z0-9_]+)` \| (Free|Pro) \| \[([a-zA-Z0-9_]+)\]\(\3\)( \|)?/g, (_m, type, layer, slug) => {
      return `| \`${type}\` | ${layer} | [${slug}](${slug}) | ${outputLink(slug)} |`
    })
  return out
}

function fieldTypeSlug(type) {
  const map = {
    embeddedTable: 'embeddedTable',
    editorjs: 'editorjs',
  }
  return map[type] || type
}

function buildFieldEditorSection(fields, lang) {
  const anchor = lang === 'en' ? '#output-in-section-data' : '#vyvod-v-section-data'
  const lines = []

  for (const field of fields) {
    if (field.type === 'heading' || !field.name) {
      continue
    }

    const label = fieldLabel(field, lang)
    const slug = fieldTypeSlug(field.type)
    const requiredWord = field.required
      ? (lang === 'en' ? 'Required.' : 'Обязательное.')
      : (lang === 'en' ? 'Optional.' : 'Необязательное.')
    const hint = fieldDescription(field, lang)
    const typeWord = lang === 'en' ? 'Type' : 'Тип'

    lines.push(`### ${label} (\`${field.name}\`)`)
    lines.push('')
    lines.push(`${typeWord} [${field.type}](../fields/${slug}${anchor}). ${requiredWord}${hint ? ` ${hint}` : ''}`)

    if (field.type === 'repeater' && field.fields?.length) {
      lines.push('')
      lines.push(lang === 'en' ? 'Each row:' : 'В каждой строке:')
      lines.push('')
      lines.push(lang === 'en'
        ? '| Field | Type | Label | Required |'
        : '| Поле | Тип | Подпись | Обязательно |')
      lines.push('| --- | --- | --- | --- |')
      for (const sub of field.fields) {
        const subSlug = fieldTypeSlug(sub.type)
        const subLabel = fieldLabel(sub, lang)
        const subReq = sub.required
          ? (lang === 'en' ? 'yes' : 'да')
          : (lang === 'en' ? 'no' : 'нет')
        lines.push(`| \`${sub.name}\` | [${sub.type}](../fields/${subSlug}${anchor}) | ${subLabel} | ${subReq} |`)
      }
    }

    if (field.type === 'table' && field.columns?.length) {
      lines.push('')
      lines.push(lang === 'en' ? 'Columns:' : 'Колонки:')
      lines.push('')
      lines.push(lang === 'en' ? '| Column | Type | Label |' : '| Колонка | Тип | Подпись |')
      lines.push('| --- | --- | --- |')
      for (const col of field.columns) {
        lines.push(`| \`${col.name}\` | ${col.type} | ${fieldLabel({ name: col.name, label: col.label, type: col.type }, lang)} |`)
      }
    }

    lines.push('')
  }

  return lines.join('\n').trimEnd()
}

function buildSectionPage(def, layer, lang) {
  const { key, label, category, chunk, fields = [], requires } = def
  const copy = getSectionCopy(key, lang, label)
  const req = Array.isArray(requires) ? requires.join(', ') : (layer === 'Pro' ? 'pro' : '—')
  const categoryLabel = CATEGORY_LABELS[lang][category] || category || '—'
  const sampleData = buildSampleSectionData(fields)
  const sampleJson = JSON.stringify(sampleData, null, 2)
  const chunkTpl = chunk ? findChunkTpl(chunk) : null
  const chunkBlock = chunkTpl
    ? `\n\`\`\`fenom\n${chunkTpl}\n\`\`\`\n`
    : (lang === 'en' ? '\nChunk template not found in the package.\n' : '\nChunk шаблон не найден в пакете.\n')
  const jsonPath = layer === 'Pro'
    ? `PageBuilderPro/core/components/pagebuilderpro/sections/${key}.json`
    : `core/components/pagebuilder/sections/${key}.json`
  const fieldsSection = buildFieldEditorSection(fields, lang)
  const screenshotStub = `\n\n<!-- ![${copy.title.replace(/]/g, '')}](/components/pagebuilder/screenshots/sections/${key}.png) -->\n`

  const normalizeBody = (text) => text.replace(/\n{3,}/g, '\n\n').trim()

  const benefitsBlock = copy.benefits
    ? `\n\n## ${lang === 'en' ? 'Why this section' : 'Зачем эта секция'}\n\n${copy.benefits}`
    : ''
  const composeBlock = copy.compose
    ? `\n\n## ${lang === 'en' ? 'Page examples' : 'Примеры страниц'}\n\n${copy.compose}`
    : ''
  const relatedBlock = copy.related
    ? `\n\n## ${lang === 'en' ? 'Similar sections' : 'Похожие секции'}\n\n${copy.related}`
    : ''

  if (lang === 'en') {
    const desc = (copy.description || copy.intro.split('\n')[0].replace(/\.$/, ''))
      + (layer === 'Pro' ? ` (${layer})` : '')
    const requiresNote = copy.requiresNote ? `\n\n::: info\n${copy.requiresNote}\n:::` : ''
    const useBlock = copy.use ? `\n\n## When to use\n\n${copy.use}` : ''
    const editorBlock = copy.editor ? `\n\n## Inspector tips\n\n${copy.editor}` : ''

    return wrapFrontmatter(
      copy.title,
      desc,
      normalizeBody(`# ${copy.title}

${copy.intro}${screenshotStub}${requiresNote}${benefitsBlock}${useBlock}${composeBlock}${editorBlock}${relatedBlock}

## Block parameters

| Parameter | Value |
| --- | --- |
| key | \`${key}\` |
| Layer | ${layer} |
| Category | ${categoryLabel}${category ? ` (\`${category}\`)` : ''} |
| Chunk | \`${chunk}\` |
| Requires | ${req} |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

${fieldsSection || 'No editable fields.'}

## Site output

${copy.output || 'Rendered via Fenom chunk on the frontend.'}

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

\`\`\`json
${sampleJson}
\`\`\`

## Chunk template

Fenom chunk \`${chunk}\`:
${chunkBlock}
## JSON definition

\`${jsonPath}\`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
`),
    )
  }

  const desc = (copy.description || copy.intro.split('\n')[0].replace(/\.$/, ''))
    + (layer === 'Pro' ? `. Слой ${layer}.` : '.')
  const requiresNote = copy.requiresNote ? `\n\n::: info\n${copy.requiresNote}\n:::` : ''
  const useBlock = copy.use ? `\n\n## Где применять\n\n${copy.use}` : ''
  const editorBlock = copy.editor ? `\n\n## Что заполнить\n\n${copy.editor}` : ''

  return wrapFrontmatter(
    copy.title,
    desc,
    normalizeBody(`# ${copy.title}

${copy.intro}${screenshotStub}${requiresNote}${benefitsBlock}${useBlock}${composeBlock}${editorBlock}${relatedBlock}

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | \`${key}\` |
| Слой | ${layer} |
| Категория | ${categoryLabel}${category ? ` (\`${category}\`)` : ''} |
| Chunk | \`${chunk}\` |
| Требования | ${req} |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

${fieldsSection || 'Нет редактируемых полей.'}

## Что видит посетитель

${copy.output || 'Секция рендерится Fenom-chunk на фронте.'}

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

\`\`\`json
${sampleJson}
\`\`\`

## Шаблон chunk

Fenom chunk \`${chunk}\`:
${chunkBlock}
## JSON-определение

\`${jsonPath}\`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
`),
  )
}

function buildSectionsIndex(definitions, lang) {
  const groups = {
    freeStarter: [],
    freeUtility: [],
    pro: [],
  }

  const freeStarter = new Set(['hero', 'richtext', 'gallery', 'faq', 'cta', 'spacer', 'stats', 'testimonials', 'contact'])
  const freeUtility = new Set(['image', 'cards'])

  for (const d of definitions) {
    const { key } = d.json
    if (freeStarter.has(key)) groups.freeStarter.push(d)
    else if (freeUtility.has(key)) groups.freeUtility.push(d)
    else groups.pro.push(d)
  }

  const row = (d, lang) => {
    const { key, label, category } = d.json
    const copy = getSectionCopy(key, lang, label)
    const req = d.layer === 'Pro'
      ? (Array.isArray(d.json.requires) ? d.json.requires.join(', ') : 'pro')
      : '—'
    const cat = CATEGORY_LABELS[lang][category] || category || '—'
    return lang === 'en'
      ? `| \`${key}\` | [${copy.title}](${key}) | ${cat} | ${req} |`
      : `| \`${key}\` | [${copy.title}](${key}) | ${cat} | ${req} |`
  }

  if (lang === 'en') {
    return wrapFrontmatter(
      'Section catalog',
      'Built-in PageBuilder section blocks (Free and Pro)',
      `# Section catalog

Built-in blocks for assembling pages in the MODX manager. Pick a section type, fill fields in the inspector, and reorder blocks on the resource.

Each section page lists **Why this section**, **When to use**, **Page examples** (typical section order), and **Similar sections** for comparison.

Section \`key\` is used in the PageBuilder snippet and document JSON. Register custom types via CMP (Pro) or a plugin on \`pbOnRegisterSectionDefinitions\`.

<!-- ![Section catalog in the manager](/components/pagebuilder/screenshots/mgr-section-catalog.png) -->

## Free — content and layout (9)

| key | Section | Category | requires |
| --- | --- | --- | --- |
${groups.freeStarter.map(d => row(d, lang)).join('\n')}

## Free — utility (2)

| key | Section | requires |
| --- | --- | --- |
${groups.freeUtility.map(d => {
    const copy = getSectionCopy(d.json.key, lang, d.json.label)
    return `| \`${d.json.key}\` | [${copy.title}](${d.json.key}) | — |`
  }).join('\n')}

## Pro

| key | Section | Category | requires |
| --- | --- | --- | --- |
${groups.pro.map(d => row(d, lang)).join('\n')}

Commerce sections need **miniShop3**. \`SectionRequirementChecker\` filters the catalog; override via \`pbOnCheckSectionRequirement\`.

Product sections (\`products_grid\`, \`product_spotlight\`, \`promo_banner\`) render via **msProducts**. Categories use **pdoResources** (\`msCategory\`).

## Related pages

- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
- [Manager and events](../integration)
`,
    )
  }

  return wrapFrontmatter(
    'Каталог секций',
    'Встроенные блоки секций PageBuilder Free и Pro',
    `# Каталог секций

Встроенные блоки для сборки страниц в менеджере MODX. Выберите тип секции, заполните поля в инспекторе и меняйте порядок блоков на ресурсе.

На странице каждой секции: **Зачем эта секция**, **Где применять**, **Примеры страниц** (типичный порядок блоков) и **Похожие секции** для выбора альтернативы.

Ключ секции (\`key\`) используется в сниппете PageBuilder и в JSON документа. Свои типы добавляют через CMP (Pro) или плагин на \`pbOnRegisterSectionDefinitions\`.

<!-- ![Каталог секций в менеджере](/components/pagebuilder/screenshots/mgr-section-catalog.png) -->

## Free — контент и layout (9)

| key | Секция | Категория | Требования |
| --- | --- | --- | --- |
${groups.freeStarter.map(d => row(d, lang)).join('\n')}

## Free — utility (2)

| key | Секция | Требования |
| --- | --- | --- |
${groups.freeUtility.map(d => {
    const copy = getSectionCopy(d.json.key, lang, d.json.label)
    return `| \`${d.json.key}\` | [${copy.title}](${d.json.key}) | — |`
  }).join('\n')}

## Pro

| key | Секция | Категория | Требования |
| --- | --- | --- | --- |
${groups.pro.map(d => row(d, lang)).join('\n')}

Commerce-секции требуют **miniShop3**. \`SectionRequirementChecker\` фильтрует каталог. Переопределение через \`pbOnCheckSectionRequirement\`.

Товарные секции (\`products_grid\`, \`product_spotlight\`, \`promo_banner\`) рендерятся через **msProducts**. Категории через **pdoResources** (\`msCategory\`).

## Связанные страницы

- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
- [Менеджер и события](../integration)
`,
  )
}

function syncOverviewAndTypes(lang) {
  for (const name of ['overview.md', 'types.md']) {
    const destDir = lang === 'en' ? enFieldsDir : ruFieldsDir
    let body = rewriteFieldLinks(fs.readFileSync(path.join(pkgFieldsDir, name), 'utf8'), lang === 'en' ? 'en' : '')
    body = body.replace(/\]\(([a-zA-Z0-9_.-]+)\.md(#[^)]*)?\)/g, ']($1$2)')
    body = normalizeFieldHeadings(body, 'ru')
    body = fixTableSeparators(body)
    if (name === 'types.md') {
      body = enhanceTypesTables(body, lang)
    }
    if (lang === 'en') {
      body = translateEn(body)
    }
    body = polishFieldDocs(body)

    if (name === 'overview.md') {
      body = injectScreenshotCommentBefore(
        body,
        lang === 'en' ? '## Minimal field' : '## Минимальное поле',
        lang === 'en'
          ? '<!-- ![Section inspector](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->'
          : '<!-- ![Инспектор секции](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->',
      )
    }
    if (name === 'types.md') {
      const typesIntro = lang === 'en'
        ? 'Each type has its own page: **Why this type**, **When to use**, **Tips**, **Similar types**, JSON **Schema**, output in `section.data`, Fenom example, **Common properties**.'
        : 'У каждого типа своя страница: **Зачем этот тип**, **Когда использовать**, **Советы**, **Похожие типы**, JSON **Настройка**, вывод в `section.data`, пример Fenom, **Общие свойства**.'
      body = body.replace(
        lang === 'en'
          ? /Each type has its own page:.*?\*\*Common properties\*\*\./s
          : /У каждого типа своя страница:.*?\*\*Общие свойства\*\*\./s,
        typesIntro,
      )
      body = injectScreenshotCommentBefore(
        body,
        '## Free',
        lang === 'en'
          ? '<!-- ![Field types in inspector](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->'
          : '<!-- ![Типы полей в инспекторе](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->',
      )
    }

    const title = extractTitle(body)
    const desc = lang === 'en'
      ? (name === 'overview.md' ? 'Field schema in section JSON, inspector widgets, and section.data output' : 'All 50 PageBuilder inspector field types (Free and Pro)')
      : (name === 'overview.md' ? 'Схема полей в JSON секции, виджеты инспектора и вывод в section.data' : 'Все 50 типов полей инспектора PageBuilder (Free и Pro)')

    const base = name.replace(/\.md$/, '')
    fs.writeFileSync(path.join(destDir, `${base}.md`), wrapFrontmatter(
      lang === 'en' ? (base === 'overview' ? 'Fields overview' : 'Field types reference') : (base === 'overview' ? 'Обзор полей' : 'Справочник типов'),
      desc,
      body,
      { skipTableFix: name === 'types.md' },
    ))
  }
}

function main() {
  if (!fs.existsSync(pkgFieldsDir)) {
    console.error('Package fields dir not found:', pkgFieldsDir)
    process.exit(1)
  }

  for (const dir of [ruFieldsDir, ruSectionsDir, enFieldsDir, enSectionsDir]) {
    ensureDir(dir)
  }

  syncOverviewAndTypes('ru')
  syncOverviewAndTypes('en')

  for (const file of listFieldFiles()) {
    syncFieldFile(file, pkgFieldsDir, ruFieldsDir, 'ru')
    syncFieldFile(file, pkgFieldsDir, enFieldsDir, 'en')
  }

  const definitions = listSectionDefinitions()

  for (const def of definitions) {
    const key = def.json.key
    fs.writeFileSync(path.join(ruSectionsDir, `${key}.md`), buildSectionPage(def.json, def.layer, 'ru'))
    fs.writeFileSync(path.join(enSectionsDir, `${key}.md`), buildSectionPage(def.json, def.layer, 'en'))
  }

  fs.writeFileSync(path.join(ruSectionsDir, 'index.md'), buildSectionsIndex(definitions, 'ru'))
  fs.writeFileSync(path.join(enSectionsDir, 'index.md'), buildSectionsIndex(definitions, 'en'))

  console.log(`Synced ${listFieldFiles().length} field pages × 2 langs`)
  console.log(`Synced ${definitions.length} section pages + index × 2 langs`)
}

main()
