---
title: "url"
description: "URL string with basic format checks in the inspector"
---

# Field url

Version: **Free**.

<!-- ![url](/components/pagebuilder/screenshots/fields/url.png) -->

## Why this type

Dedicated type instead of text for links. Pro: `responsive` for per-breakpoint URLs. UTM placeholders pair well with button fields.

## When to use

- Button href, external asset, anchor link
- Card or partner logo link
- Fallback when a button object is not needed

## Tips

Label plus target fit [button](button) better. Internal MODX pages often use [relation](relation) or [resourcelist](resourcelist).

## Similar types

- [button](button) for label + url + target
- [slug](slug) for path segments, not full URLs

## Schema

```json
{
  "name": "link",
  "type": "url",
  "label": "Link",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

URL string.

## Section data {#output-in-section-data}

Key `link` in the section data:

```json
{
  "link": "https://example.com/page"
}
```

## Chunk example

```html
<a href="{$link|escape}">Learn more</a>
```

## Notes

Pro: `responsive`.

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

**Pro** (capability `responsive`): with `responsive: true`, the section data uses `desktop`, `tablet`, `mobile` keys instead of a scalar.

- Also: `showWhen`, UTM placeholders `\{\{utm:key\}\}` in the URL string.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
