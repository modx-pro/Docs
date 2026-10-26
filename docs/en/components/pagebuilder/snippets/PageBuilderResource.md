---
title: PageBuilderResource
description: PageBuilderResource snippet — sections from another resource
---

# PageBuilderResource snippet

Outputs sections from another resource. Same PHP as [PageBuilder](PageBuilder). Set the source with `resource_id`.

## Purpose

- Hero or FAQ from a child page on the home page.
- Shared block on several resources without duplicating sections in each document.

## Where to call

Template or chunk. Uncached call.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `resource_id` | `0` | Source ID. `0` = current resource |
| `section_types` | empty | Section key filter |
| `return_values` | `0` | JSON instead of HTML (same as PageBuilder) |
| `use_cache` | `1` | HTML cache |
| `load_css` | from setting | Frontend CSS |
| `wrap_page` | like `load_css` | `pb-page` wrapper |

If no resource can be resolved, the response is an empty string, including when `return_values=1`. If the id exists but there is no PageBuilder record, `return_values=1` returns `{ "plainText": "", "sections": [] }`.

Snippet properties list only `resource_id` and `section_types`. There is no required mark on `resource_id`. Other parameters work like PageBuilder. A call without arguments does not fail.

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

- The HTML path returns only the **published** PageBuilder snapshot. The source draft is not visible on the site.
- The snippet does not check the **view** policy on the source resource.
- Limit access on the MODX resource or through [Public API](../public-api), where the **view** policy is checked.

## See also

- [PageBuilder](PageBuilder)
- [Frontend output](../frontend)
