---
title: "fieldset"
description: "Nested field group with flat keys in section data"
---

# Field fieldset

Version: **Pro**.

<!-- ![fieldset](/components/pagebuilder/screenshots/fields/fieldset.jpg) -->

## Why this type

A group label in the inspector. The group has no key of its own in the section data. Nested fields keep their own names.

## When to use

- SEO title and description in one group
- Overlay settings separate from content
- CMP readability for 15+ fields

## Tips

A subtitle without nested fields is [heading](heading). In the chunk use the flat key `seo_title`, not `seo.title`.

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

## Section data {#output-in-section-data}

The `seo` key in the schema is not stored in the section data. Nested fields are flat keys:

```json
{
  "seo_title": "SEO title"
}
```

- Keep nested field names unique within the section. Saving does not reject a duplicate. The CMP only requires a non-empty `name`.

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
