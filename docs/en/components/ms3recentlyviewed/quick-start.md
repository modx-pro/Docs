---
title: Quick start
---
# Quick start

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MiniShop3 | 1.0.0+ |
| pdoTools | 3.0.0+ |
| VueTools | 1.2.0+ for the manager (Import Map `vue` + `vuetools/theme`). If the keys are missing, the modules are removed and the alert `ms3rv_vuetools_required` is shown |
| Fenom | used by chunks via pdoTools; no hard `class_exists(Fenom)` check |

## Step 1: Installation

1. Go to **Extras → Installer**
2. Find **ms3RecentlyViewed** in the list of available packages
3. Click **Download** then **Install**. Manager UI needs **VueTools ≥ 1.2.0** even though it is not in package `requires`.

## Step 2: Lexicon, styles and script

In the template (or shared head/footer), load the lexicon **first**, then CSS and JS.

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3recentlyviewed/css/viewed.css">
<script src="{'assets_url' | option}components/ms3recentlyviewed/js/viewed.js"></script>
```

```modx
[[!ms3rvLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3recentlyviewed/css/viewed.css">
<script src="[[++assets_url]]components/ms3recentlyviewed/js/viewed.js"></script>
```

:::

Without `ms3rvLexiconScript` an empty list uses the Russian phrase “Вы ещё ничего не смотрели”. Storage stays `localStorage` and the JS limit falls back to 20. Cookie mode and a custom `max_items` need the snippet on every page.

## Step 3: Product page — pass ID for tracking

On the MiniShop3 product template (`ms3_template_product_default`) the plugin **ms3recentlyviewedSync** sets `window.ms3rvCurrentProductId`. On a custom product template set the ID yourself.

**Attribute on `<body>` (recommended):**

::: code-group

```fenom
<body data-viewed-product-id="{$_modx->resource.id}">
```

```modx
<body data-viewed-product-id="[[*id]]">
```

:::

**JS variable (before `viewed.js`):**

::: code-group

```fenom
<script>window.ms3rvCurrentProductId = {$_modx->resource.id};</script>
```

```modx
<script>window.ms3rvCurrentProductId = [[*id]];</script>
```

:::

## Step 4: “Recently viewed” block

### Choosing how to render

| Scenario | When to use |
|----------|-------------|
| **JS `render()`** | Default: **`localStorage`**, shared template. A normal GET cannot read `localStorage`. Without JS the list is empty. |
| **Snippet with `fromDB`** | User authenticated in the **current** context. `sync_enabled` controls writes, not this read. |
| **Snippet with `ids` + cookie** | Server HTML for guests. Set **`ms3recentlyviewed.storage_type`** = `cookie`. Plugin **ms3recentlyviewedViewedIdsPlaceholder** sets placeholder **`viewedIds`**. Pass `ids` from **`[[+viewedIds]]`** or `{$_modx->getPlaceholder('viewedIds')}` in Fenom. The name **`viewedIds` is reserved**. Do not override it. |

### Client-side (JS)

Same for Fenom and MODX:

```html
<div id="ms3-recently-viewed" class="ms3rv__list"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.ms3RecentlyViewed) {
    window.ms3RecentlyViewed.render('#ms3-recently-viewed');
  }
});
</script>
```

If the browser has no IDs, the container gets a paragraph with lexicon `ms3recentlyviewed_empty`. The container stays on the page. Only the ancestor `#ms3-recently-viewed-section` is hidden. `emptyTpl` is sent to the connector when IDs already exist.

A snippet with no IDs wraps `emptyTpl` in a `div` with `data-ms3rv-hydrate="viewed"`. On `DOMContentLoaded`, `viewed.js` fills the list from the browser.

Class **`row`** may be added to **`.ms3rv__list`** (Bootstrap). If **`#ms3-recently-viewed`** or **`[data-ms3rv-hydrate="viewed"]`** is in the DOM, the script calls `render` itself. Load `viewed.css` in the template. If the link is missing, JS injects the stylesheet.

### Server output: cookie and `viewedIds` placeholder

With **`storage_type` = `cookie`**, the plugin fills the placeholder:

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : [
  'ids' => $_modx->getPlaceholder('viewedIds'),
  'tpl' => 'tplViewedItem',
  'emptyTpl' => 'tplViewedEmpty'
]}
```

```modx
[[!ms3recentlyviewed?
  &ids=`[[+viewedIds]]`
  &tpl=`tplViewedItem`
  &emptyTpl=`tplViewedEmpty`
]]
```

:::

### Server output: from DB only (`fromDB`)

For a user authenticated in the current context you can omit `ids`:

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : ['fromDB' => true]}
```

```modx
[[!ms3recentlyviewed?
  &fromDB=`1`
]]
```

:::

## Step 5: Viewed count (optional)

In an icon or header:

```html
<span data-viewed-count style="display: none;">0</span>
```

The value is set on load (1–99 or “99+”). When 0 the element is hidden.

## Step 6: “Similar to viewed” block (optional)

Server output: snippet **ms3recentlyviewedSimilar** with `ids` (viewed IDs). For an AJAX-rendered list pass the same `ids` to the connector with `action=similar`.

::: code-group

```fenom
{'ms3recentlyviewedSimilar' | snippet : [
  'ids' => $_modx->getPlaceholder('viewedIds'),
  'limit' => 8,
  'depth' => 2,
  'tpl' => 'tplSimilarItem'
]}
```

```modx
[[!ms3recentlyviewedSimilar?
  &ids=`[[+viewedIds]]`
  &limit=`8`
  &depth=`2`
  &tpl=`tplSimilarItem`
]]
```

:::

With **`localStorage`** the **`viewedIds`** placeholder is empty. For similar products call `renderSimilar()` or pass `ids` from the page. JS defaults to 8 products, always drops the current product and does not send `depth`. The server then keeps depth 2. An empty list hides the container (`display: none`). See [Snippet ms3recentlyviewedSimilar](snippets/ms3recentlyviewedSimilar), [Frontend setup](frontend).

## Next steps

- [System settings](settings) — limit, storage type, DB sync
- [Snippets](snippets/) — parameters for `ms3recentlyviewed`, `ms3recentlyviewedSimilar`, `ms3rvLexiconScript`
- [Manager interface](interface/) — dashboard and view history
- [Frontend setup](frontend) — chunks and styles
