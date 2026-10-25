---
title: PageBuilderResource
description: PageBuilderResource snippet — sections from another resource
---

# PageBuilderResource snippet

Same PHP as [PageBuilder](PageBuilder). The source resource is the `resource_id` parameter.

## Purpose

- Hero or FAQ from a child page on the home page.
- Shared block on several resources without duplicating sections in each document.

## Where to call

Any template or chunk that needs published sections from **another** resource. Uncached call.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `resource_id` | `0` | Source ID. `0` = current resource. If the resource is missing: the HTML path returns an empty string, and `return_values=1` returns JSON `{ "plainText": "", "sections": [] }` |
| `section_types` | empty | Section key filter |
| `return_values` | `0` | JSON instead of HTML (same as PageBuilder) |
| `use_cache` | `1` | HTML cache |
| `load_css` | from setting | Frontend CSS |
| `wrap_page` | like `load_css` | `pb-page` wrapper |

Snippet properties list only `resource_id` and `section_types`. There is no required mark on `resource_id`, only text in the description. Other parameters work like PageBuilder. `0` means the current resource, and a call without arguments does not fail.

## Example: FAQ from “About” on the home page

::: code-group

```modx
[[!PageBuilderResource?
  &resource_id=`15`
  &section_types=`faq`
]]
```

```fenom
{'!PageBuilderResource' | snippet : [
  'resource_id' => 15,
  'section_types' => 'faq'
]}
```

:::

## Permissions and publish state

- Source must have a **published** PageBuilder snapshot.
- Site visitor needs **view** policy on the source resource.
- Source draft is not visible on the site.

## See also

- [PageBuilder](PageBuilder)
- [Frontend output](../frontend)
