---
title: "multiselect"
description: "Array of values from static options with PrimeVue MultiSelect"
---

# Field multiselect

Version: **Free**.

<!-- ![multiselect](/components/pagebuilder/screenshots/fields/multiselect.jpg) -->

## Why this type

Several values from a fixed `options` list, with search in the dropdown. The option list works the same way as [select](select).

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

::: code-group

```modx
{foreach $roles as $role}
  <span class="role">{$role}</span>
{/foreach}
```

```fenom
{foreach $roles as $role}
  <span class="role">{$role|pb_text}</span>
{/foreach}
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
- [Manager and events](../integration)
