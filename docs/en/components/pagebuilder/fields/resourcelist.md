---
title: "resourcelist"
description: "relation alias with same picker modal and id pagetitle object"
---

# Field resourcelist

Version: **Free**.

<!-- ![resourcelist](/components/pagebuilder/screenshots/fields/resourcelist.png) -->

## Why this type

"Pick a page" semantics in CMP labels. Same behavior and data as relation. SearchAction and modal search built in.

## When to use

- page or blog_parent field in section
- When type name should read as page list to editors
- Legacy schemas with type resourcelist

## Tips

Functionally same as [relation](relation). Page array is [multirelation](multirelation).

## Similar types

- [relation](relation) same picker
- [multirelation](multirelation) for multiple pages

## Schema

```json
{
  "name": "page",
  "type": "resourcelist",
  "label": "Page",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Same as `relation`.

## Section data {#output-in-section-data}

Key `page` in the section data (picker stores only the selection):

```json
{
  "page": {
    "id": 42,
    "pagetitle": "About us"
  }
}
```

- Manager search may show `uri` and `context_key`, but data stores `id` and `pagetitle`.

## Chunk example

```fenom
{if $page.id}
  <span>{$page.pagetitle|escape}</span>
{/if}
```

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

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Manager and events](../integration)
