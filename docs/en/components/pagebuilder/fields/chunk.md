---
title: "chunk"
description: "Object name of selected modChunk for Fenom include"
---

# Field chunk

Version: **Free**.

<!-- ![chunk](/components/pagebuilder/screenshots/fields/chunk.jpg) -->

## Why this type

The editor picks a chunk by name instead of typing it. In Fenom you include it as `{include file="file:chunks/{$chunk.name}.tpl"}`. Use it when a section swaps in different markup fragments.

## When to use

- Editor picks variant chunk layout
- A/B partial swap in custom section
- Dev-curated allowed chunk list

## Tips

Snippet call is [snippet](snippet) type. Static chunk name can be [text](text) if list is closed.

## Similar types

- [snippet](snippet) for modSnippet name
- [combo](combo) optionsSource modChunk for id-style pick

## Schema

```json
{
  "name": "chunk",
  "type": "chunk",
  "label": "Chunk",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ name }`.

## Section data {#output-in-section-data}

Key `chunk` in the section data:

```json
{
  "chunk": {
    "name": "pbHero"
  }
}
```

## Chunk example

::: code-group

```modx
[[$chunkName]]
```

```fenom
{include file="file:chunks/{$chunk.name}.tpl"}
```

:::

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
- [Pro in manager](../integration)
