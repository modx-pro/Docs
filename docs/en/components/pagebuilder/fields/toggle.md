---
title: "toggle"
description: "Boolean via PrimeVue switch in the inspector"
---

# Field toggle

Version: **Free**.

<!-- ![toggle](/components/pagebuilder/screenshots/fields/toggle.jpg) -->

## Why this type

An on/off switch, without radio buttons or a checkbox. The data is yes or no, the same as [yesno](yesno). It fits a mode that editors switch often.

## When to use

- Enable overlay, autoplay, section dark mode
- showWhen on a neighbor boolean
- Quick flag without "Yes/No" copy

## Tips

Classic MODX yes/no use [yesno](yesno). Value is still boolean, not a string.

## Similar types

- [yesno](yesno) for familiar yes/no
- [checkbox](checkbox) when the option needs an explicit label

## Schema

```json
{
  "name": "enabled",
  "type": "toggle",
  "label": "Enabled",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Boolean.

## Section data {#output-in-section-data}

Key `enabled` in the section data:

```json
{
  "enabled": true
}
```

## Chunk example

::: code-group

```modx
<div class="block is-enabled">…</div>
```

```fenom
{if $enabled}<div class="block is-enabled">…</div>{/if}
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
