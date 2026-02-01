---
title: frontTabs
description: Output a tabbed block on the site page
logo: https://modstore.pro/assets/extras/fronttabs/logo-lg.png
author: justenj
modstore: https://modstore.pro/packages/other/fronttabs
repository: https://github.com/justenj/frontTabs
---
# frontTabs

Component for creating a tabbed block on the frontend.

Create TVs in the frontTabs category (or another of your choice) and output them as a tabbed block.

## Snippet parameters

| Name | Description |
|------|-------------|
| `&activeClass` | CSS class for the active tab. |
| `&category` | TV category name for the tab block. |
| `&rememberTab` | Remember active tab per page. |
| `&resource` | Resource ID. Default: current resource. |
| `&toPlaceholder` | If set, output goes to this placeholder instead of the page. |
| `&tpl` | Chunk for each tab's content. All `modTemplateVar` fields available. |
| `&tplHeader` | Chunk for each tab switch. All `modTemplateVar` fields available. |
| `&tplWrapper` | Wrapper chunk. Placeholders: `[[+header]]` and `[[+body]]`. |

## System settings

| Name | Description |
|------|-------------|
| `[[++ft_frontend_css]]` | Path to the CSS file. Clear to load your own via the template. |
| `[[++ft_frontend_js]]` | Path to the JS file. Clear to load your own via the template. |

Create and configure TVs before use.

## Examples

Custom chunk per TV: use `tpl_{tv_key}`. Example for TV `img`:

```modx
[[frontTabs? &tpl_img=`ft_tab_img`]]
```

Tab memory: when `rememberTab` is 1, the active tab is restored after reload. The component uses a cookie; each page can have its own active tab (e.g. product A — "Comments", product B — "Gallery").

```modx
[[frontTabs? &rememberTab=`1`]]
```

The component ships with default scripts and styles (like miniShop2). You can override them in the component system settings. Default chunks use Bootstrap 3.

## Selectors

For correct behavior when customizing chunks, use the default selectors or customize default.js:

- `#frontTabs .ft-tab` — tab button.
- `#frontTabs .ft-content` — tab content.

## Placeholder TVs

For tabs that don't need a real TV (e.g. snippet output like gallery or comments), create a hidden TV. Example: product gallery — create hidden TV **gallery**, then:

```modx
[[frontTabs? &tpl_gallery=`ft_gallery_tpl`]]
```

Chunk ft_gallery_tpl:

```modx
<div class="ft-content row">
  <div class="col-lg-12">
    [[msGallery? &tplOuter=`@INLINE [[+rows]]`]]
  </div>
</div>
```
