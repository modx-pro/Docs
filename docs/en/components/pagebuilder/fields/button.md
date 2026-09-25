---
title: "button"
description: "CTA object: label, url, and target"
---

# Field button

Version: **Free**.

<!-- ![button](/components/pagebuilder/screenshots/fields/button.jpg) -->

## Why this type

One field holds the three parts of a link: label, URL, and where it opens (`label`, `url`, `target`). The URL can keep UTM placeholders. The chunk turns that object into an `<a>` tag.

## When to use

- Primary hero or CTA button
- Secondary link with target _blank
- Label plus link without two fields

## Tips

URL-only fits [url](url). Multiple buttons use repeater with nested button or text+url.

## Similar types

- [url](url) for bare href
- [text](text) + [url](url) for split layout control

## Schema

```json
{
  "name": "cta",
  "type": "button",
  "label": "Button",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ label, url, target }`.

## Section data {#output-in-section-data}

Key `cta` in the section data:

```json
{
  "cta": {
    "label": "Learn more",
    "url": "https://example.com",
    "target": "_blank"
  }
}
```

## Chunk example

::: code-group

```modx
<a class="pb-button" href="[[+cta.url]]" target="[[+cta.target]]">[[+cta.label]]</a>
```

```fenom
<a class="pb-button" href="{$cta.url|pb_href|escape}" target="{$cta.target|escape}">{$cta.label|pb_text}</a>
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

- Also: UTM placeholders in `url`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
