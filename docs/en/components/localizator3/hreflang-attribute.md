---
title: hreflang attribute
description: 'getLocalizedCanonical snippet: canonical, alternate, and x-default'
---

# hreflang attribute

The **getLocalizedCanonical** snippet outputs `link rel="canonical"` for the current language and `link rel="alternate" hreflang="..."` for active languages. You do not need a custom markup snippet.

It adds `hreflang="x-default"` when a default-language URL is found. `localizator3_default_language` is compared to `cultureKey`, or to `key` when `cultureKey` is empty. Empty setting: current language URL.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **id** | current resource | Resource ID. Empty `null` and `''` use the current resource. Empty string if there is no resource |
| **tpl** | empty | Chunk. Placeholders: `links` (items with `url`, `hreflang`, `is_current`) and ready `output` |

Returns an empty string when:

- there is no current `localizator3_key`
- no URL was built

`canonical` and (with an empty setting) `x-default` appear only if the current key belongs to an active language with a non-empty URL.

Language order: `rank`, then `id`. In markup, `canonical` sits with the current language; `x-default` is last.

## Call in head

::: code-group

```fenom
{'!getLocalizedCanonical' | snippet : ['id' => $_modx->resource.id]}
```

```modx
[[!getLocalizedCanonical? &id=`[[*id]]`]]
```

:::

Sample output (order depends on rank):

```html
<link rel="canonical" href="https://site.example/page.html">
<link rel="alternate" hreflang="ru" href="https://site.example/page.html">
<link rel="alternate" hreflang="en" href="https://en.site.example/page.html">
<link rel="alternate" hreflang="x-default" href="https://site.example/page.html">
```

The `hreflang` value comes from the language `cultureKey`, otherwise from the key. URLs are built by `makeLocalizedUrl`.
