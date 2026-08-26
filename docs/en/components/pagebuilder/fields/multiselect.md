---
title: "multiselect"
description: "Array of values from static options with PrimeVue MultiSelect"
---

# Field multiselect

Layer: **Free**.

<!-- ![multiselect](/components/pagebuilder/screenshots/fields/multiselect.png) -->

## Why this type

Multiple static options with dropdown search. Same options array as select.

## When to use

- Several theme tags from fixed list
- Feature flags from enum without checkboxgroup
- Multivalue without xPDO

## Tips

Database list is [multicombo](multicombo) or [tablemulticombo](tablemulticombo). Short on-screen list keep [checkboxgroup](checkboxgroup).

## Similar types

- [select](select) for single static value
- [multicombo](multicombo) for optionsSource xPDO

## Schema

```json
{
  "name": "roles",
  "type": "multiselect",
  "label": "Roles",
  "options": [],
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of values.

## Section data {#output-in-section-data}

Key `roles` in the section data: array of values:

```json
{
  "roles": [
    "admin",
    "editor"
  ]
}
```

## Chunk example

```fenom
{foreach $roles as $role}
  <span class="role">{$role|escape}</span>
{/foreach}
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
