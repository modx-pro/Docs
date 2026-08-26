---
title: "Fields overview"
description: "Field schema in section JSON, inspector widgets, and saved section data"
---

# Fields overview

Fields define what the editor fills in for a section. The schema lives in the section type JSON (`core/components/pagebuilder/sections/{key}.json`) or in CMP.

In the [reference](types) there are 50 types. Each has its own page: JSON **Schema**, a **Section data** block (how the field looks after save), and a Fenom or HTML example. In a chunk, values come from `section.data`.

<!-- ![Section inspector](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->

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
| `name` | Key in the section data |
| `type` | Widget and validation |
| `label` | Label in the inspector |
| `required` | Required on **publish** (draft still saves) |
| `options` | Static list (select, radio, checkboxgroup, colorpalette) |
| `optionsSource` | Dynamic list from an xPDO class |
| `searchAction` | Connector for relation picker, e.g. `mgr/ms3/products/search` |
| `showWhen` | Conditional visibility of a sibling field |
| `fields` | Nested schema for repeater, fieldset, jsongrid |

Full cycle on the `richtext` example: [richtext.md](richtext).

## Common field properties

For fields with `name` that are stored in the section data (not `heading` / `dependent`):

| Key | Type | Inspector | CMP |
| --- | --- | --- | --- |
| `tab` | string | Fields with the same `tab` are grouped under a subtitle | yes |
| `width` | 25–100 | Column width in % (flex row), default 100 | yes |
| `description` | string | Hint under the field label | yes |
| `default` | any | Initial value when `section.data` is empty | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Empty value blocks publish (`SectionValidator`) | yes |

**Decorative types** (`heading`, `dependent`): not written to data. `tab`, `width`, and `label` are available.

**Fieldset (Pro):** no own key in data. Nested `fields` become flat keys in the section data. See [fieldset.md](fieldset).

Other schema keys (`showWhen`, `currency`, `mask`, `sourceField`, `columns`, `table_key`, …) are not stripped by CMP: `sectionTypeForm.ts` keeps them in passthrough `extra`.

### Pro: responsive

On `text`, `textarea`, `url`, `number`, `currency`, `richtext`, and `slug` with `responsive: true` (or an already saved breakpoint map), `section.data` holds:

```json
{
  "title": {
    "desktop": "Title",
    "tablet": "Title (tablet)",
    "mobile": "Title (mobile)"
  }
}
```

Names `alt`, `caption`, and `slug` are excluded from responsive (`responsiveValues.ts`). On the frontend use `readResponsiveValue()` or capability `responsive`.

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

Live examples: section `_qa_field_matrix`, block "Meta parity".

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

In the section data this is an array of objects. Each row has a service `_rowId`. In a chunk: `{foreach $items as $item}` and `{$item.title|escape}`. Details: [repeater.md](repeater).

## showWhen

```json
{
  "name": "extra_url",
  "type": "url",
  "label": "Extra link",
  "showWhen": { "field": "show_extra", "value": true }
}
```

The field is visible when `showWhen.field` matches `showWhen.value`. An array in `value` means any of. Code: `fieldVisibility.ts`. More examples: [types.md](types#sostavnye-stsenarii).

## optionsSource

Class whitelist in `FieldOptionsService` (`modResource`, `modTemplate`, `modChunk`, …). Processor: `mgr/field/options`. Hook: `pbOnFieldValues`.

## Frontend and enrich

`SectionRenderer` passes `section.data` to the chunk as placeholders. Also in properties: `id`, `type`, `settings`.

On draft save, `SectionFieldEnricher` adds:

- **image / file / gallery**: media objects (`filename`, `extension`, `width`, `height`, `size`, `type`, …)
- **video**: `embed_url`, `provider`, `watch_url`. Flat `video_*` when `type=video` or the field name contains `video`
- **map**: `embed_url`, `watch_url`. Flat `map_*`

In a chunk for media use `{$photo.url}`, not a bare path string. See [image.md](image), [video.md](video).

## See also

- [Field types reference](types)
- [Inspector](../integration)
