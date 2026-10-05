---
title: "slug"
description: "Slug string, often auto-generated from sourceField"
---

# Field slug

Version: **Free**.

<!-- ![slug](/components/pagebuilder/screenshots/fields/slug.jpg) -->

## Why this type

A URL segment, not free text. `sourceField` copies a title on the first save. In Pro, per-screen values (`responsive`) are not applied to fields named alt, caption, or slug.

## When to use

- Section anchor, card slug, filter segment
- Catalog or landing path segment
- Tab or in-page navigation key

## Tips

Store full URLs in [url](url), not slug. Slug is excluded from the responsive map by default.

## Similar types

- [text](text) for the visible source title
- [url](url) for a complete link with protocol

## Schema

```json
{
  "name": "slug",
  "type": "slug",
  "label": "Slug",
  "sourceField": "title",
  "separator": "-",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Slug string.

## Section data {#output-in-section-data}

Key `slug` in the section data:

```json
{
  "slug": "section-title"
}
```

## Chunk example

::: code-group

```modx
<span class="slug">[[+slug]]</span>
```

```fenom
<span class="slug">{$slug|escape}</span>
```

:::

## Notes

Source: `sourceField`, `slugSource`, or alias `from`. Separator: `separator`.

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25–100 | Field width as % of the row (flex) | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

**Pro** (capability `responsive`): with `responsive: true`, the section data uses `desktop`, `tablet`, `mobile` keys instead of a scalar.

- Also: `sourceField` / `from`, `separator`. Responsive is disabled for field name `slug`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
