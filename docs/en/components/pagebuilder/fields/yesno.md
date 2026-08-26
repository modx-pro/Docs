---
title: "yesno"
description: "Boolean yes/no in classic MODX TV style"
---

# Field yesno

Version: **Free**.

<!-- ![yesno](/components/pagebuilder/screenshots/fields/yesno.png) -->

## Why this type

Familiar UX for MODX editors. Boolean in the section data. Compact than radio for simple yes/no.

## When to use

- "Published", "Show on homepage"
- showWhen with value true or false
- Legacy schemas that used yesno TVs

## Tips

Switch UI use [toggle](toggle). Multiple labeled options need [select](select), not yesno.

## Similar types

- [toggle](toggle) for PrimeVue switch
- [checkbox](checkbox) for a single unnamed flag

## Schema

```json
{
  "name": "visible",
  "type": "yesno",
  "label": "Show",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Boolean.

## Section data {#output-in-section-data}

Key `visible` in the section data:

```json
{
  "visible": true
}
```

## Chunk example

```fenom
{if $visible}<div class="block">…</div>{/if}
```

## Notes

Aliases: `boolean`, `listyesno`, `list_yes_no`.

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
