---
title: "snippet"
description: "Object name of selected modSnippet for chunk call"
---

# Field snippet

Version: **Free**.

<!-- ![snippet](/components/pagebuilder/screenshots/fields/snippet.jpg) -->

## Why this type

The editor picks a snippet name. The site calls it dynamically, for example `[[!{$snippet.name}]]`. A chunk is included with [chunk](chunk), not with this field.

## When to use

- Section delegates render to snippet
- Editor picks from allowed snippets list
- Wrapper around legacy MODX snippet

## Tips

Partial template include is [chunk](chunk). Snippet params are separate fields or static in chunk.

## Similar types

- [chunk](chunk) for Fenom include
- [combo](combo) optionsSource modSnippet

## Schema

```json
{
  "name": "snippet",
  "type": "snippet",
  "label": "Snippet",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ name }`.

## Section data {#output-in-section-data}

Key `snippet` in the section data:

```json
{
  "snippet": {
    "name": "pbHero"
  }
}
```

## Chunk example

::: code-group

```modx
[[!snippetName]]
```

```fenom
{('!' ~ $snippet.name) | snippet}
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
