---
title: PageBuilderResource
description: PageBuilderResource snippet — sections from another resource
---

# PageBuilderResource snippet

Same PHP as [PageBuilder](PageBuilder), but **`resource_id` is required** in snippet properties. A clear name for “sections from another page”.

## Purpose

- Hero or FAQ from a child page on the home page.
- Shared block on several resources without duplicating sections in each document.

## Where to call

Any template or chunk that needs published sections from **another** resource. Uncached call.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `resource_id` | `0` | Source ID. **Required** > 0, otherwise empty output |
| `section_types` | empty | Section key filter |
| `return_values` | `0` | JSON instead of HTML (same as PageBuilder) |
| `use_cache` | `1` | HTML cache |
| `load_css` | from setting | Frontend CSS |
| `wrap_page` | like `load_css` | `pb-page` wrapper |

Snippet properties for **PageBuilderResource** list only `resource_id` and `section_types`. Other params behave like PageBuilder.

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
