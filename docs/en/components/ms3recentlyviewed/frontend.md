---
title: Frontend integration
---
# Frontend integration

Lexicon, styles and scripts setup is described in [Quick start](/en/components/ms3recentlyviewed/quick-start). Below: connector, customization and chunks.

## Integration check: empty stats in admin

Stats and history in admin come from the `ms3recentlyviewed_items` table. Records are written when sync is enabled — for **logged-in** and **anonymous** (guest) users. Anonymous users are identified by session; guest tracking is controlled by `ms3recentlyviewed.track_anonymous`. Bot views are not stored when **`ms3recentlyviewed.block_bots`** is on; detection method: **`ms3recentlyviewed.block_bots_detector`** — **`crawler_detect`** (jaybizzle/crawler-detect in vendor) or **`regex`** as fallback.

**Checklist:** lexicon and viewed.js are loaded on every product page; product page has `data-viewed-product-id` on `<body>` or `window.ms3rvCurrentProductId`; `ms3recentlyviewed.sync_enabled` = Yes; for logged-in users — user is authenticated in **web** context (not only in manager). The `fromDB` option works only for users logged in on the frontend (web context).

### `viewedIds` placeholder (cookie)

Plugin **ms3recentlyviewedViewedIdsPlaceholder** (event **OnWebPageInit**, priority **-5**): if **`ms3recentlyviewed.storage_type` = `cookie`** and limit &gt; 0, the **`viewedIds`** placeholder is filled from the `ms3_recently_viewed` cookie. The name is **reserved** — do not override. Fenom: `{$_modx->getPlaceholder('viewedIds')}`.

## Connector (AJAX)

**URL:** `assets/components/ms3recentlyviewed/connector.php`
**Method:** POST.

Actions:

- **Render viewed list** — parameters `ids` (required), optionally `limit`, `tpl`, `emptyTpl`
- **Similar** — `action=similar`, `ids`, optionally `limit`, `tpl`, `depth`
- **For logged-in users** — `action=track` + `product_id`, `action=sync` + `ids`, `action=get` (fetch from DB)

**Response:** HTML of the list; empty string when no products. If `window.MODX_ASSETS_URL` or `window.MODX_BASE_URL` is set, the JS builds the connector URL itself.

The connector uses shared helpers for sanitization: IDs are parsed as integers (limit 100), chunk names only allow valid characters. No personal data is sent in requests.

## Chunks

| Chunk | Purpose |
|-------|---------|
| tplViewedItem | Product card in “Recently viewed” list |
| tplViewedEmpty | Empty state (block can be hidden when no products) |
| tplSimilarItem | Card in “Similar” block (optional) |

Chunks can be overridden (Fenom or MODX); `tpl` and `emptyTpl` are available in the snippet and in JS `render()` calls.

## Styles and BEM

Classes use the **ms3rv** prefix (BEM): `ms3rv__list`, `ms3rv__item`, etc. Styles: `assets/components/ms3recentlyviewed/css/viewed.css`. Default cards use Bootstrap (`ms3-product-card`, `product-image-wrapper`); include Bootstrap and catalog styles if needed.

On mobile — horizontal scroll for the list (`.ms3rv__list`).

## CSS variables

Override in your theme (`:root` or block container):

| Variable | Description |
|----------|--------------|
| `--ms3rv-bg` | Card background |
| `--ms3rv-border` | Border |
| `--ms3rv-radius` | Border radius |
| `--ms3rv-color` | Text color |
| `--ms3rv-price-color` | Price color |

Example:

```css
:root {
  --ms3rv-bg: #fff;
  --ms3rv-border: #eee;
  --ms3rv-radius: 0.5rem;
  --ms3rv-color: #333;
  --ms3rv-price-color: #111;
}
```

## Passing product ID manually

Optional: button with `data-viewed-toggle` and `data-id` to add a product to the list on click (e.g. from catalog grid without opening the product page).
