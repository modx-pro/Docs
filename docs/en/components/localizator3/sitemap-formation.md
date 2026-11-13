---
title: Sitemap
description: getLocalizedSitemap snippet for a multilingual sitemap
---

# Sitemap

The `getLocalizedSitemap` snippet builds an XML map from published, non-deleted resources and active languages. Response fields: `loc`, `lastmod`, `xhtml:link`, `x-default`.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **parents** | empty | Parent IDs, comma-separated. An empty list yields an empty `urlset`; `0` is allowed. Listed IDs are included, not only their children |
| **depth** | `10` | `getChildIds` depth for each parent. `0` and negative values add no children. Children come from the current context |
| **excludeIds** | empty | IDs to exclude, comma-separated |
| **scheme** | `0` | Passed to `makeLocalizedUrl` with `fullUrl` true. Path via `makeUrl` with `-1`. `1` and `2` replace the protocol |
| **onlyWithLocalization** | No | Only resources with a localization row. Links use languages from found rows, not every active language |

`loc` is taken from the alternate whose `cultureKey` equals `localizator3_default_language`. Empty key or no match uses the first alternate. Language order: `rank`, then `id`.

## Usage

::: code-group

```fenom
{'!getLocalizedSitemap' | snippet : [
  'parents' => '1',
  'depth' => 5,
]}
```

```modx
[[!getLocalizedSitemap?
  &parents=`1`
  &depth=`5`
]]
```

:::

Serve the result as an XML page or a resource with type `text/xml`. The type is set by the resource or the web server, not by the package.
