---
title: PageBuilder
description: PageBuilder snippet — HTML of published resource sections
---

# PageBuilder snippet

Renders **published** resource sections as HTML. Drafts never appear on the site. Each section uses its Fenom chunk (`pagebuilder_{key}`).

## Purpose

Main PageBuilder output in the template or resource **Content** field.

## Where to call

- Template of a page built in the **Sections** tab.
- Content field when the template outputs `[[*content]]`.
- Do not use a cached call without `!` if sections change often.

## Requirements

- Installed **pagebuilder** (or **pagebuilderpro**) extra.
- **pdoTools** 3.0+ for Fenom in section chunks.
- Published section snapshot on the resource.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `resource_id` | `0` | Resource ID. `0` = current |
| `section_types` | empty | Comma-separated keys (`hero,gallery`). Empty = all published |
| `return_values` | `0` | `1` → JSON `{ plainText, sections }` instead of HTML |
| `use_cache` | `1` | MODX cache for HTML. `0` when debugging render events |
| `load_css` | from `pagebuilder_load_frontend_css` | Register `pagebuilder-sections.css` and related bundles |
| `wrap_page` | like `load_css` | Wrapper `<div class="pb-page">` |

`load_css` and `wrap_page` are not listed in snippet properties but are supported in code. See [System settings → Snippet relation](../settings#snippet-relation).

## Basic call

::: code-group

```modx
[[!PageBuilder]]
```

```fenom
{'!PageBuilder' | snippet}
```

:::

## Section type filter

Hero and CTA only:

::: code-group

```modx
[[!PageBuilder?
  &section_types=`hero,cta`
]]
```

```fenom
{'!PageBuilder' | snippet : [
  'section_types' => 'hero,cta'
]}
```

:::

## return_values

JSON for SEO plugins and headless hybrids. Same shape as `values` in [Public API](../public-api):

::: code-group

```modx
[[!PageBuilder? &return_values=`1`]]
```

```fenom
{'!PageBuilder' | snippet : ['return_values' => 1]}
```

:::

With `return_values=1`, event `pbOnGetValues` runs. CSS and `pb-page` wrapper are not registered.

## CSS and wrapper

With `load_css=1`, the snippet registers frontend CSS (see [Design system](../design-system)). Pro and commerce bundles load when capability `pro` is active.

Disable globally: `pagebuilder_load_frontend_css = 0`. Per call: `&load_css=`0``.

## HTML cache

MODX partition: `pagebuilder/{resourceId}`, key includes revision and type filter. Cleared on publish/unpublish.

Events `pbOnBeforeRenderDocument` and `pbOnBeforeRenderSection` run only on cache miss:

::: code-group

```modx
[[!PageBuilder? &use_cache=`0`]]
```

```fenom
{'!PageBuilder' | snippet : ['use_cache' => 0]}
```

:::

## Skipped sections

Sections with unmet `requires` (Pro, miniShop3) are omitted. Unknown types are logged and skipped.

## See also

- [PageBuilderResource](PageBuilderResource)
- [Frontend output](../frontend)
- [Public API](../public-api)
