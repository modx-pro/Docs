---
title: "Fields overview"
description: "Field schema in section JSON, inspector widgets, and data after save"
---

# Fields overview

Fields define what the editor fills in a section. The schema lives in type JSON (`core/components/pagebuilder/sections/{key}.json`) or is built in the control panel.

The [reference](types) lists 62 types (35 Free and 27 Pro). Types with a page have JSON **Configuration**, a **Section data** block, and a Fenom or HTML example. Chunk values come from `section.data`.

<!-- ![Section inspector](/components/pagebuilder/screenshots/mgr-section-inspector.jpg) -->

## Minimal field

```json
{
  "name": "title",
  "type": "text",
  "label": "Title",
  "required": true
}
```

| Property | Role |
| --- | --- |
| `name` | Key in section data |
| `type` | Widget and validation |
| `label` | Label in inspector |
| `required` | Required on **publish** (draft still saves) |
| `options` | Static list (select, radio, checkboxgroup, colorpalette) |
| `optionsSource` | Dynamic list from xPDO class |
| `searchAction` | Connector for relation picker, e.g. `mgr/ms3/products/search` |
| `showWhen` | Conditional visibility of a sibling field |
| `fields` | Nested schema for repeater, fieldset, jsongrid |

Full cycle on `richtext` example: [richtext.md](richtext).

## Common field properties

For fields with `name` that land in section data (not `heading` / `dependent`):

| Key | Type | Inspector | Panel |
| --- | --- | --- | --- |
| `tab` | string | Fields with the same `tab` group under a subheading | yes |
| `width` | 25–100 | Column width in % (flex row), default 100 | yes |
| `description` | string | Text under field label | yes |
| `default` | any | Initial value when section data is empty | yes |
| `active` | bool | `false` hides field in inspector | yes |
| `required` | bool | Empty value blocks publish (`SectionValidator`) | yes |

**Decorative types** (`heading`, `dependent`): not written to data. Support `tab`, `width`, `label`.

**Fieldset (Pro):** no own key in data. Nested `fields` flatten into section data. See [fieldset.md](fieldset).

Other schema keys (`showWhen`, `currency`, `mask`, `sourceField`, `columns`, `table_key`, …) are not stripped by the control panel: `sectionTypeForm.ts` keeps them in passthrough `extra`.

### Pro: responsive {#pro-responsive}

Enable `pagebuilder_responsive_editor_enabled` first. While it is off, the inspector has no button or Desktop / Tablet / Mobile tabs: one field. Saved breakpoint maps on the site work until the editor saves the field as a single value.

On types `text`, `textarea`, `url`, `number`, `currency`, `richtext`, `slug` with `responsive: true` (or an already saved breakpoint map), section data looks like:

```json
{
  "title": {
    "desktop": "Title",
    "tablet": "Title (tablet)",
    "mobile": "Title (mobile)"
  }
}
```

Names `alt`, `caption`, `slug` are excluded from responsive (`responsiveValues.ts`). If the field JSON has `"responsive": true`, per-breakpoint values stay on. You cannot collapse them into one string.

Screen thresholds come from `pagebuilder_responsive_breakpoints` (or `responsiveBreakpoints` on the section type). Default: desktop ≥1024, tablet ≥768, mobile ≥0; manager preview uses `previewWidth`. Output mode: `pagebuilder_responsive_apply`.

| Mode | Behavior |
| --- | --- |
| `manual` (default) | One value on site: `?pb_bp=` or `pagebuilder_default_breakpoint`. SEO-safe |
| `css` | All values in HTML in `<span class="pb-rv">…</span>`, switching via CSS media queries |

In chunks for responsive fields with `css` use Fenom modifier `pb_text` instead of `escape`:

```fenom
{$title|pb_text}
```

With `manual`, plain `{$title|escape}` is enough (value is already scalar). Settings: [System settings → Responsive](../settings#responsive-breakpoints).

### Meta example in JSON

```json
{
  "name": "title",
  "type": "text",
  "label": "Title",
  "tab": "Content",
  "width": 50,
  "description": "Hint under the field",
  "default": "",
  "active": true,
  "required": true
}
```

Live examples: section `_qa_field_matrix` (catalog: **QA: all field types**), "Meta parity" block.

## Repeater

```json
{
  "name": "items",
  "type": "repeater",
  "label": "Items",
  "fields": [
    { "name": "title", "type": "text", "label": "Title" }
  ]
}
```

Section data holds an array of objects. Each row has service `_rowId`. In chunk: `{foreach $items as $item}` and `{$item.title|escape}`. Row order in inspector: drag handle or arrows. Same drag on gallery, keyvalue, inline table, and related lists. Details: [repeater.md](repeater).

## showWhen

```json
{
  "name": "extra_url",
  "type": "url",
  "label": "Extra link",
  "showWhen": { "field": "show_extra", "value": true }
}
```

Field is visible when `showWhen.field` matches `showWhen.value`. Array in `value` means "any of". Code: `fieldVisibility.ts`. More examples: [types.md](types#composite-scenarios).

## optionsSource

Whitelist classes in `FieldOptionsService` (`modResource`, `modTemplate`, `modChunk`, …). Options list: connector `mgr/field/options`. Hook: `pbOnFieldValues`.

## Frontend and enrich

`SectionRenderer` passes `section.data` to the chunk as placeholders. Also in properties: `id`, `type`, `settings`. MODX tags do not walk a section array. The loop in the examples is Fenom. The MODX tab repeats that loop and does not use the `pb_text` filter: there is no MODX output filter with that name.

On draft save `SectionFieldEnricher` adds:

- **image / file / gallery**: media objects (`filename`, `extension`, `width`, `height`, `size`, `type`, …)
- **video**: `embed_url`, `provider`, `watch_url`. Flat `video_*` when `type=video` or field name contains `video`
- **map**: `embed_url`, `watch_url`. Flat `map_*`

In chunks for media use `{$photo.url}`, not a bare path string. See [image.md](image), [video.md](video).

## Next

- [Type reference](types)
- [Inspector](../integration)
