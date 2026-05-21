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

### Choosing how to render

| Scenario | When to use |
|----------|-------------|
| **JS `render()`** | Default: **`localStorage`**, shared template. The server on a normal GET **cannot** read localStorage — without JS the list is empty. |
| **Snippet with `fromDB`** | Logged-in user in the **web** context and DB sync on — IDs come from the server table. |
| **Snippet with `ids` + cookie** | You need **server** HTML for guests: set **`ms3recentlyviewed.storage_type` = `cookie`**, plugin **ms3recentlyviewedViewedIdsPlaceholder** sets placeholder **`viewedIds`**, pass `ids` from **`[[+viewedIds]]`** or `{$_modx->getPlaceholder('viewedIds')}` in Fenom. The name **`viewedIds` is reserved** — do not override it. |

### Client-side (JS)

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

**Current package conveniences:** class **`row`** may be **added automatically** to **`.ms3rv__list`** (Bootstrap); if **`#ms3-recently-viewed`** and **`#ms3-similar`** exist, the script may **auto-call render** on `DOMContentLoaded`. Still load `viewed.css` in the template; if missing, JS may inject styles.

### Server output: cookie and `viewedIds` placeholder

With **`storage_type` = `cookie`**, the plugin fills the placeholder; server-side “Recently viewed” list:

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

For **logged-in** users (**web** context, sync on) you can omit `ids`:

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

With **localStorage** only, “Similar” is easier via **JS** `renderSimilar()` or passing `ids` from the front; placeholder **`viewedIds`** is **empty** when `storage_type` = `localStorage`. See: [Snippet ms3recentlyviewedSimilar](snippets/ms3recentlyviewedSimilar), [Frontend setup](frontend).

## Next steps

- [System settings](settings) — limit, storage type, DB sync
- [Snippets](snippets/) — parameters for ms3recentlyviewed, ms3recentlyviewedSimilar, ms3rvLexiconScript
- [Manager interface](interface/) — dashboard and view history
- [Frontend setup](frontend) — custom chunks and styles
