---
title: "link"
description: "Object with label, url, and target. Pro layer."
---

# Field link

Version: **Pro** (`advanced-fields`).

A link object, not a single URL string. Keys: `label`, `url`, `target`. Default `target` is `_self`. The inspector chips can insert a UTM token into `url`.

## Schema

```json
{
  "name": "cta",
  "type": "link",
  "label": "Link"
}
```

## Section data {#output-in-section-data}

```json
{
  "cta": {
    "label": "Details",
    "url": "/about",
    "target": "_self"
  }
}
```

## Chunk example

```html
<a href="{$cta.url|escape}" target="{$cta.target|escape}">{$cta.label|escape}</a>
```

## Similar types

- [url](url) for one string
- [button](button) for the same object in Free
