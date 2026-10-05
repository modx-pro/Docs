---
title: "fieldset"
description: "Nested field group with flat keys in section data"
---

# Field fieldset

Version: **Pro**.

<!-- ![fieldset](/components/pagebuilder/screenshots/fields/fieldset.jpg) -->

## Why this type

A group label in the inspector. The group has no key of its own in the section data: nested fields keep their own names, and those names must be unique in the section. It is in Pro, to split a long form.

## When to use

- SEO title description block in one group
- Overlay settings separate from content
- CMP readability for 15+ fields

## Tips

Heading only without nested is [heading](heading). Chunk uses flat keys seo_title not seo.title.

## Similar types

- [heading](heading) decorative divider (Free)
- [repeater](repeater) for object arrays (Free)

## Schema

```json
{
  "name": "seo",
  "type": "fieldset",
  "label": "SEO",
  "fields": [
    {
      "name": "seo_title",
      "type": "text",
      "label": "SEO title"
    }
  ]
}
```

## Value

Flat keys of nested fields in the section data.

## Section data {#output-in-section-data}

The `seo` key in the schema is not stored in the section data. Nested fields are flat keys:

```json
{
  "seo_title": "SEO title"
}
```

- Nested field names must be unique within the section.

## Chunk example

::: code-group

```modx
[[+seo_title]]
```

```fenom
{$seo_title|pb_text}
```

:::

## Common properties

`fieldset` has no own key in the section data. Nested fields are **flat** keys alongside other section fields.

| Key | Role |
| --- | --- |
| `label` | Group title (legend) |
| `fields` | Nested schema |
| `tab` / `width` | Inspector grouping |

Nested fields support the usual meta keys (`tab`, `width`, `default`, …).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
