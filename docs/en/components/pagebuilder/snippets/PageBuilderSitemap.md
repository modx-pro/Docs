---
title: PageBuilderSitemap
description: XML sitemap for resources with published PageBuilder sections
---

# PageBuilderSitemap snippet

Builds an XML **urlset** for MODX resources that have a published PageBuilder snapshot in `pb_pages` (`published_revision > 0`).

## Purpose

A dedicated sitemap URL for landings and pages built in PageBuilder without maintaining a manual ID list.

## Where to call

- A dedicated resource with content type or template suited for XML.
- Add the resource URL to `robots.txt`.

The MODX resource must be published and not deleted. Filter by context with the `context` parameter.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `context` | empty | MODX context key. Empty = all contexts |
| `priority` | `0.5` | `<priority>` value |
| `changefreq` | `weekly` | `<changefreq>` value |

## Call

::: code-group

```modx
[[!PageBuilderSitemap]]

[[!PageBuilderSitemap?
  &context=`web`
  &priority=`0.8`
  &changefreq=`daily`
]]
```

```fenom
{'!PageBuilderSitemap' | snippet}

{'!PageBuilderSitemap' | snippet : [
  'context' => 'web',
  'priority' => '0.8',
  'changefreq' => 'daily'
]}
```

:::

## Output format

Each URL includes:

- `<loc>` — full resource URL (`makeUrl`, `full` mode)
- `<lastmod>` — resource `editedon` in ISO 8601
- `<changefreq>` and `<priority>` from snippet parameters

If no pages match, an empty `<urlset>` is returned.

## Content-Type

Set `application/xml` on the resource, template, or web server rule. The snippet returns XML body only.

## See also

- [PageBuilder](PageBuilder)
- [Developer → Data model](../developer#data-model)
