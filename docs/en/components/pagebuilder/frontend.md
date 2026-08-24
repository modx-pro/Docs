---
title: Frontend output
description: Template, CSS, section Fenom chunks, cache, and draft preview
---
# Frontend output

## Template

<!-- ![Page with sections on the site](/components/pagebuilder/screenshots/fe-page-sections.png) -->

Place the `PageBuilder` snippet in the template or content field. Use an uncached call:

::: code-group

```modx
[[!PageBuilder]]
```

```fenom
{'!PageBuilder' | snippet}
```

:::

Published sections render through Fenom chunks in `core/components/pagebuilder/elements/chunks/`. Chunk names match section keys (`pagebuilder_section_hero`, etc.).

## CSS

By default the snippet registers:

- `pagebuilder-sections.css` — base Free section styles
- with Pro and interactive sections — `pagebuilder-sections.js` (tabs, carousel)

Disable globally: `pagebuilder_load_frontend_css = 0`. Per call: `&load_css=`0``.

Page wrapper `<div class="pb-page">` is controlled by `wrap_page` (defaults to the same as `load_css`).

## HTML cache

`use_cache=1` (default) caches final HTML in MODX. After publishing sections, clear site cache or call with `use_cache=0` temporarily.

Events `pbOnBeforeRenderDocument` and `pbOnBeforeRenderSection` run only on **cache miss**.

## Section filter

Parameter `section_types` limits output to listed keys:

::: code-group

```modx
[[!PageBuilder? &section_types=`hero,cta`]]
```

```fenom
{'!PageBuilder' | snippet : ['section_types' => 'hero,cta']}
```

:::

Useful for partial blocks in different template areas.

## JSON instead of HTML

`return_values=1` returns JSON with extracted field values (`plainText`, `sections` structure). For headless or custom templating. Fires `pbOnGetValues`.

## Section visibility

Section JSON may include `settings.contexts` and `settings.utm`. Context comes from the current MODX context. UTM from `$_SESSION['utm']` after `PageBuilderUtmSession`.

The section is skipped when rules do not match.

## Draft preview

The public site shows **published** content only. View drafts in the manager (Preview button) or via:

`{assets_url}components/pagebuilder/preview.php`

Token is signed with `pagebuilder_preview_secret`. The iframe loads template CSS (`pagebuilder_preview_include_template_css`) and URLs from `pagebuilder_preview_css_urls`.

<!-- ![Draft preview](/components/pagebuilder/screenshots/mgr-section-preview.png) -->

## Customize chunks

1. Copy the section chunk to your theme category.
2. Edit Fenom markup, keep the name or override mapping in a plugin on `pbOnBeforeRenderSection`.

`SectionRenderPipeline::replaceSection()` lets you replace a section in a plugin before chunk render.

## Related pages

- [Snippets](snippets)
- [Section catalog](sections/)
- [Render events](integration#frontend-render)
