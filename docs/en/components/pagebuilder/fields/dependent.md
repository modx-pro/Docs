---
title: "dependent"
description: "showWhen block marker: not written to section data"
---

# Field dependent

Layer: **Pro**.

<!-- ![dependent](/components/pagebuilder/screenshots/fields/dependent.png) -->

## Why this type

Type hidden in inspector fieldVisibility false. Documents conditional field group. Neighbors controlled by showWhen on other fields.

## When to use

- JSON note that fields below depend on toggle
- CMP organization for complex branches
- Pairs with yesno toggle and hidden url fields

## Tips

Condition lives on visible fields via showWhen. Decorative title without logic is [heading](heading).

## Similar types

- [heading](heading) visible subheading (Free)
- [toggle](toggle) common showWhen trigger (Free)

## Schema

```json
{
  "name": "_dep",
  "type": "dependent",
  "label": "Dependent fields",
  "tab": "Content",
  "width": 100
}
```

## Value

Not stored.

## Section data {#output-in-section-data}

Not stored in the section data.

## Chunk example

Not used in the chunk.

## Notes

The type itself is not rendered in the inspector (`fieldVisibility` returns false). Sibling fields control visibility via `showWhen`.

## Common properties

The value is **not** stored in the section data.

| Key | Role | CMP |
| --- | --- | --- |
| `tab` | Group in the inspector | yes |
| `width` | Label width, 25–100 (%) | yes |
| `label` | Subtitle / marker text | yes |

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
