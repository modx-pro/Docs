---
title: Frontend integration
---
# Frontend integration

Lexicon, styles and scripts: [Quick start](/en/components/ms3recentlyviewed/quick-start).

## Integration check: empty stats in admin

Stats and history in admin come from `ms3recentlyviewed_items`. Records are written when sync is enabled, for **logged-in** and **anonymous** (guest) users.

- Guests are identified by session. Guest tracking: `ms3recentlyviewed.track_anonymous`.
- Bot views are not stored when **`ms3recentlyviewed.block_bots`** is on.
- Detection: **`ms3recentlyviewed.block_bots_detector`** — **`crawler_detect`** (jaybizzle/crawler-detect in `vendor`) or **`regex`**.

**Checklist:**

- Lexicon and `viewed.js` on every product page
- Product page has `data-viewed-product-id` on `<body>` or `window.ms3rvCurrentProductId`
- `ms3recentlyviewed.sync_enabled` = Yes
- Logged-in users authenticated in the **web** context (not only in the manager)

`fromDB` works only for users logged in on the frontend (web context).

### `viewedIds` placeholder (cookie)

Plugin **ms3recentlyviewedViewedIdsPlaceholder** (event **OnWebPageInit**, priority **-5**) always sets **`viewedIds`**. With **`storage_type` = `cookie`** the value comes from the `ms3_recently_viewed` cookie. Otherwise the placeholder is an empty string and can overwrite a value set earlier. The name is **reserved**. Fenom: `{$_modx->getPlaceholder('viewedIds')}`.

## Connector (AJAX)

**URL:** `assets/components/ms3recentlyviewed/connector.php`  
**Method:** POST.

Actions:

- **Render viewed list** — optional `ids`, `limit`, `tpl`, `emptyTpl`, `includeThumbs`. Empty `ids` is not an error: the snippet returns `emptyTpl`.
- **Similar** — `action=similar`, `ids`, optionally `limit`, `tpl`, `depth`
- **`track`** + `product_id` — writes a view for guests (session) and logged-in users when sync is on
- **`sync`** + `ids`, **`get`** — web-authenticated users only

**Response:** HTML of the list. Empty string when no products. If `window.MODX_ASSETS_URL` or `window.MODX_BASE_URL` is set, the JS builds the connector URL itself.

IDs are parsed as integers (cap 100). POST `tpl` / `emptyTpl` (list and similar) go through `ms3rv_sanitize_chunk_name`. Only `[a-zA-Z0-9_-]` is allowed. `@FILE` and paths are stripped. Empty name → default chunk. Snippet properties in the template still use `ms3rv_resolve_chunk_name` (`trim`, `@FILE` allowed). If the snippet returns empty, the fallback reads `showUnpublished` / `showDeleted` from POST. Both are off by default.

## Chunks

| Chunk | Purpose |
|-------|---------|
| tplViewedItem | Product card in “Recently viewed” list |
| tplViewedEmpty | Empty state |
| tplViewedOuter | Optional wrapper. Placeholders: `output`, `hydrate`, `tpl`, `emptyTpl`, `limit`, `includeThumbs` |
| tplSimilarItem | Card in “Similar” block |
| tplMs3rvLexiconScript | Optional wrapper for `ms3rvLexiconScript`. The snippet can emit the script tag itself |

Override chunks (Fenom or MODX). `tpl` and `emptyTpl` are available in the snippet and in JS `render()` calls.

## Styles and BEM

Classes use the **ms3rv** prefix (BEM): `ms3rv__list`, `ms3rv__item`, etc. File: `assets/components/ms3recentlyviewed/css/viewed.css`.

Default cards use Bootstrap (`ms3-product-card`, `product-image-wrapper`). Include Bootstrap and catalog styles if needed.

Horizontal scroll applies only to `.ms3rv-slider__wrapper .ms3rv__list`. A plain `.ms3rv__list` is a wrapping Bootstrap row.

There are no `--ms3rv-*` CSS variables on the storefront. `--ms3rv-accent*` exists only in the manager stylesheet.

## Passing product ID manually

Optionally add a button with `data-viewed-toggle` and `data-id`. A click adds the product to the list, for example from a catalog grid without opening the product page.
