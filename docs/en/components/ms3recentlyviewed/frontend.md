---
title: Frontend integration
---
# Frontend integration

Lexicon, styles and scripts: [Quick start](/en/components/ms3recentlyviewed/quick-start).

## Integration check: empty stats in admin

Stats and history in admin come from `ms3recentlyviewed_items`. Rows are written when sync is enabled, for **logged-in** and **anonymous** (guest) users.

- Guests are identified by session. Guest tracking: `ms3recentlyviewed.track_anonymous`.
- Bot views are not stored when **`ms3recentlyviewed.block_bots`** is on.
- Detection: **`ms3recentlyviewed.block_bots_detector`** — **`crawler_detect`** (jaybizzle/crawler-detect in `vendor`) or **`regex`**.

**Checklist:**

- Lexicon and `viewed.js` on every product page
- Product page has `data-viewed-product-id` on `<body>` or `window.ms3rvCurrentProductId`
- `ms3recentlyviewed.sync_enabled` = Yes
- the user is authenticated in the **current** site context, not only in the manager

`fromDB`, `action=sync` and `action=get` use the current context. `web` is used only when the context is missing. `action=similar` switches to `ms3recentlyviewed.context` (default `web`).

### `viewedIds` placeholder (cookie)

Plugin **ms3recentlyviewedViewedIdsPlaceholder** (event **OnWebPageInit**, priority **-5**) always sets **`viewedIds`**. With **`storage_type` = `cookie`** the value comes from the `ms3_recently_viewed` cookie. Otherwise the placeholder is an empty string and can overwrite a value set earlier. The name is **reserved**. Fenom: `{$_modx->getPlaceholder('viewedIds')}`.

## Connector (AJAX)

**URL:** `assets/components/ms3recentlyviewed/connector.php`  
**Method:** POST.

Actions:

- **Render viewed list** — no `action`. Parameters `ids`, `limit`, `tpl`, `emptyTpl`, `includeThumbs`. Empty `ids` returns a wrapper with the `emptyTpl` HTML and `data-ms3rv-hydrate="viewed"`.
- **Similar** — `action=similar`, `ids`, optionally `limit`, `tpl`, `depth`. With no IDs the snippet returns an empty string.
- **`track`** + `product_id` — writes a view for guests (session) and logged-in users when sync is on
- **`sync`** + `ids`, **`get`** — a user authenticated in the current context. The response is JSON.

**List response:** HTML. If `window.MODX_ASSETS_URL` or `window.MODX_BASE_URL` is set, the JS builds the connector URL itself.

| Item | Rule |
|------|------|
| IDs | integers, cap 100 |
| POST `tpl` / `emptyTpl` (list and similar) | `ms3rv_sanitize_chunk_name`, only `[a-zA-Z0-9_-]` |
| `@FILE` and paths | stripped |
| Empty name | default chunk |
| Snippet properties in the template | `ms3rv_resolve_chunk_name` (`trim`, `@FILE` allowed) |
| Snippet returns empty | fallback reads `showUnpublished` / `showDeleted` from POST, both off by default |

## Chunks

| Chunk | Purpose |
|-------|---------|
| tplViewedItem | “Recently viewed” card. The shipped chunk hardcodes `priceCurrency` as `RUB`. Copy the chunk to set another currency |
| tplViewedEmpty | Empty state. Text comes from lexicon `ms3recentlyviewed_empty` |
| tplViewedOuter | Optional wrapper. Placeholders: `output`, `hydrate`, `tpl`, `emptyTpl`, `limit`, `includeThumbs` |
| tplSimilarItem | “Similar” card. The shipped chunk also hardcodes `priceCurrency` as `RUB` |
| tplMs3rvLexiconScript | Installed by the package and never read by the snippet. `ms3rvLexiconScript` builds the output itself |

You can replace the chunks (Fenom or MODX). `tpl` and `emptyTpl` are available in the snippet and in JS `render()` calls.

## Styles and BEM

Classes use the **ms3rv** prefix (BEM): `ms3rv__list`, `ms3rv__item`, etc. File: `assets/components/ms3recentlyviewed/css/viewed.css`.

Default cards use Bootstrap (`ms3-product-card`, `product-image-wrapper`). Include Bootstrap and catalog styles if needed.

Horizontal scroll applies only to `.ms3rv-slider__wrapper .ms3rv__list`. A plain `.ms3rv__list` is a wrapping Bootstrap row.

There are no `--ms3rv-*` CSS variables on the storefront. `--ms3rv-accent*` exists only in the manager stylesheet.

## Passing product ID manually

Optionally add a button with `data-viewed-toggle` and `data-id`. A click adds the product to the list, for example from a catalog grid without opening the product page.

After that click, an authenticated user refreshes `#ms3rv-fromdb-content` with `action=get`.

You can put starting IDs in `data-initial-ids` on the container. Shared render options are read from `window.ms3rvRenderOptions`: `tpl`, `emptyTpl`, `limit`, `similarLimit`.

Buttons `[data-slider-prev]` and `[data-slider-next]` inside `.ms3rv-slider` scroll `.ms3rv-slider__wrapper`.

`window.ms3RecentlyViewed` exposes `getAll`, `save`, `add`, `sync`, `getFromDB`, `render`, `renderSimilar`, `trackToDB`.
