---
title: "radio"
description: "Single value from options shown as radio buttons"
---

# Field radio

Version: **Free**.

<!-- ![radio](/components/pagebuilder/screenshots/fields/radio.png) -->

## Why this type

All choices visible without opening a dropdown. Same static options model as select. Best for two to five exclusive values.

## When to use

- Alignment left / center / right
- Background type image / color / video
- Small labeled choice sets

## Tips

Long lists belong in [select](select). Simple on/off is faster with [yesno](yesno) or [toggle](toggle).

## Similar types

- [select](select) for long static lists
- [checkboxgroup](checkboxgroup) for multiple flags

## Schema

```json
{
  "name": "align",
  "type": "radio",
  "label": "Alignment",
  "options": [
    {
      "label": "Left",
      "value": "left"
    },
    {
      "label": "Center",
      "value": "center"
    }
  ],
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Selected option `value` string.

## Section data {#output-in-section-data}

Key `align` in the section data: selected option `value` string:

```json
{
  "align": "lg"
}
```

## Chunk example

```html
<div class="align-{$align|escape}">
  …
</div>
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
