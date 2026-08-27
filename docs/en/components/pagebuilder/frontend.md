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

Published sections render through Fenom chunks in `core/components/pagebuilder/elements/chunks/`. The chunk name matches the `chunk` field in the type JSON: `pagebuilder_hero`, `pagebuilder_cta`; Pro uses `pagebuilderpro_{key}`.

## CSS

By default the snippet registers:

- `pagebuilder-sections.css` for base Free section styles
- `pagebuilder-sections.js` with Pro and interactive sections (tabs, carousel)

Disable globally: `pagebuilder_load_frontend_css = 0`. Per call: `&load_css=`0``.

Page wrapper `<div class="pb-page">` is controlled by `wrap_page` (defaults to the same as `load_css`).

Tokens, BEM, and Fenom shell: [Design system](design-system).

## HTML cache

`use_cache=1` (default) caches final HTML in MODX. After publishing sections, clear site cache or call with `use_cache=0` temporarily.

Events `pbOnBeforeRenderDocument` and `pbOnBeforeRenderSection` run only on cache miss (when HTML is not cached yet).

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

In section `settings` you can set:

- `contexts` — MODX context keys (current request context)
- `utm` — UTM rules from `$_SESSION['utm']` after [PageBuilderUtmSession](snippets/PageBuilderUtmSession)

With Pro and capability `conditions`, add `settings.conditions` (loggedIn, guest, context, GET params, and more). Checked via `SectionVisibility` and event `pbOnCheckSectionVisibility`.

The section is omitted from HTML when a rule fails.

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

- [PageBuilder snippet](snippets/PageBuilder)
- [Design system](design-system)
- [Section catalog](sections/)
- [Render events](integration#frontend-render)
