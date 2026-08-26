---
title: Snippets
description: PageBuilder, PageBuilderResource, sitemap, UTM, and table data
---
# Snippets

The package ships six snippets. Chunk and section namespace: `pagebuilder`.

## PageBuilder

Renders **published** resource sections as HTML (or JSON when `return_values` is set).

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `resource_id` | number | `0` | Resource ID. `0` = current |
| `section_types` | text | empty | Section keys comma-separated (`hero,gallery`). Empty = all |
| `return_values` | boolean | `0` | Return JSON with `plainText` and `sections` instead of HTML |
| `use_cache` | boolean | `1` | MODX cache for HTML. `0` for debugging |
| `load_css` | boolean | from `pagebuilder_load_frontend_css` | Register frontend CSS |
| `wrap_page` | boolean | same as `load_css` | Wrapper `<div class="pb-page">` |
| `qa_css` | boolean | `0` | QA styles for debugging |

::: code-group

```modx
[[!PageBuilder]]

[[!PageBuilder?
  &section_types=`hero,cta`
  &use_cache=`0`
]]
```

```fenom
{'!PageBuilder' | snippet}

{'!PageBuilder' | snippet : [
  'section_types' => 'hero,cta',
  'use_cache' => 0
]}
```

:::

With `return_values=1`, event `pbOnGetValues` fires.

## PageBuilderResource

Same render, but **`resource_id` is required**: sections from another resource (for example a block on the home page from a child page).

| Parameter | Type | Description |
| --- | --- | --- |
| `resource_id` | number | Source ID (required) |
| `section_types` | text | Optional key filter |

## PageBuilderSitemap

XML sitemap for resources with published PageBuilder sections.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `context` | text | empty | Filter by MODX context key |
| `priority` | text | `0.5` | URL priority |
| `changefreq` | text | `weekly` | changefreq value |

Place the snippet on a dedicated resource with a content type suitable for XML and reference the URL in `robots.txt`.

## PageBuilderUtmSession

Stores UTM query params in `$_SESSION['utm']`. Used for section visibility rules (`settings.utm` in document JSON).

Call uncached in the layout before `PageBuilder`:

::: code-group

```modx
[[!PageBuilderUtmSession]]
```

```fenom
{'!PageBuilderUtmSession' | snippet}
```

:::

## PageBuilderUtmUrl

Appends UTM from the PageBuilder registry to a URL.

| Parameter | Type | Description |
| --- | --- | --- |
| `url` | text | Target URL |
| `params` | text | JSON with extra query params |

## PageBuilderTableRows

Rows from a **resource data table** on a resource.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `resource_id` | number | `0` | Resource ID |
| `table_key` | text | — | Table key on the resource |
| `table_id` | number | `0` | Table ID instead of `table_key` |
| `limit` | number | `20` | Max rows |
| `return` | list | `json` | `json` or `chunk` |

Section `data_table` (Pro) uses built-in chunk `pagebuilder_data_table`. The snippet is for custom table output in a template or another chunk.
