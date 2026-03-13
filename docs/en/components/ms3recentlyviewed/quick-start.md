---
title: Quick start
---
# Quick start

Step-by-step setup of the “Recently viewed” block on a MiniShop3 site.

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MiniShop3 | installed |
| pdoTools | 3.0.0+ |
| Fenom | required for snippets and chunks |

## Step 1: Installation

1. Go to **Extras → Installer**
2. Find **ms3RecentlyViewed** in the list of available packages
3. Click **Download** then **Install**

## Step 2: Lexicon, styles and script

In the template (or shared head/footer), load **first** the lexicon, then CSS and JS.

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

Without ms3rvLexiconScript the script falls back to Russian strings; for a multilingual site the lexicon is required.

## Step 3: Product page — pass ID for tracking

The list is filled **automatically** when a product page is opened. Pass the current resource ID in one of these ways.

**Attribute on `<body>` (recommended):**

::: code-group

```fenom
<body data-viewed-product-id="{$_modx->resource.id}">
```

```modx
<body data-viewed-product-id="[[*id]]">
```

:::

**JS variable (before viewed.js):**

::: code-group

```fenom
<script>window.ms3rvCurrentProductId = {$_modx->resource.id};</script>
```

```modx
<script>window.ms3rvCurrentProductId = [[*id]];</script>
```

:::

## Step 4: “Recently viewed” block

Container and render call (same for Fenom and MODX):

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

The script will request the list from the connector and output HTML. When there are no items the block is hidden.

## Step 5: Viewed count (optional)

Where you want to show the number of viewed items (icon, header):

```html
<span data-viewed-count style="display: none;">0</span>
```

The value is set on load (1–99 or “99+”); when 0 the element is hidden.

## Step 6: “Similar to viewed” block (optional)

Below recently viewed you can output products from the same categories. Server output — snippet **ms3recentlyviewedSimilar** with parameter `ids` (list of viewed IDs). For AJAX-rendered list pass the same `ids` to the connector with `action=similar`.

::: code-group

```fenom
{'ms3recentlyviewedSimilar' | snippet : [
  'ids' => $viewedIds,
  'limit' => 8,
  'tpl' => 'tplViewedItem'
]}
```

```modx
[[!ms3recentlyviewedSimilar?
  &ids=`[[+viewedIds]]`
  &limit=`8`
  &tpl=`tplViewedItem`
]]
```

:::

See: [Snippet ms3recentlyviewedSimilar](snippets/ms3recentlyviewedSimilar), [Frontend setup](frontend).

## Next steps

- [System settings](settings) — limit, storage type, DB sync
- [Snippets](snippets/) — parameters for ms3recentlyviewed, ms3recentlyviewedSimilar, ms3rvLexiconScript
- [Manager interface](interface/) — dashboard and view history
- [Frontend setup](frontend) — custom chunks and styles
