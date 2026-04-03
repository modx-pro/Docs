---
title: Frontend setup
---
# Frontend setup

Details on loading lexicon, styles and scripts are in [Quick start](quick-start). Below: connector, customization and chunks.

## Integration check

For guests with no DB data, data comes from `localStorage/cookie`. For logged-in users and guests (when `guest_db_enabled`) — from DB by `user_id` or `session_id`.

**Pre-flight checklist**

- Lexicon and `favorites.js` load on every product page.
- The favorites button has `data-favorites-toggle` and `data-id`.
- For guest DB sync, set `ms3favorites.guest_db_enabled` to **Yes**.
- Logged-in visitors must use the **web** context so the session matches the storefront.

## Connector (AJAX) {#connector-ajax}

**URL:** `assets/components/ms3favorites/connector.php`

**Method:** POST.

Actions:

- **Output favorites list** — params `ids` (required), optional `limit`, `tpl`, `emptyTpl`, `list`, `resource_type`
- **sync** — sync lists to DB (JSON). POST `lists` (JSON) or `ids`
- **create_share** — create public link (JSON). POST `list`. Logged-in only
- **get_share** — get data by token (JSON). POST `token`
- **`copy_share`** — copy another user's list to yours (JSON). POST **`token=xxx`**, **`target_list=default`** → **`{ success, ids }`**. **Guests** receive **`ids`** for **localStorage**.
- **update_comment** — update item note (JSON). POST `product_id`, `list`, `comment`. When `comments_enabled`
- **add_to_cart** — add items to cart (JSON). POST `ids` or `product_id`
- **get_popularity** — id→count map (JSON). POST `ids`, `resource_type`
- **clear** — clear list (JSON). POST `list`, `resource_type`

**Response:** HTML for list; when no items — emptyTpl. For actions — JSON. If `window.MODX_ASSETS_URL` or `window.MODX_BASE_URL` is set, JS builds the connector URL.

## Chunks

| Chunk | Purpose |
|-------|---------|
| `tplFavoritesItem` | Product card in Favorites list |
| `tplFavoritesEmpty` | Empty state (no items) |
| `tplFavoritesPage` | `/wishlist/` page (tabs, toolbar; with `resource_type=products` and `serverList=1` — SSR **pdoPage** + **msProducts** in chunk; with `serverList=0` or other types — cards via `favorites.js`) |
| `tplFavoritesPageItem` | Item on `/wishlist/` (checkbox, note, remove button) |
| `tplFavoritesPageDemo` | Same file as `tplFavoritesPage`; use `&tpl=tplFavoritesPageDemo` or `&extendedToolbar=1` on the snippet to show the Catalog / Clear / Share panel |
| `tplFavoritesListSelector` | List selector dropdown (`default`, `gifts`, `plans`) |
| `tplFavoritesSharePage` | Share page (wrapper) |
| `tplMs3fBtn` | Add/remove from favorites button (snippet `ms3FavoritesBtn`) |
| `tplMs3fBtnWishlistBox` | Button template: `li.wishlist`, `box-icon`, `icon-heart`, `tooltip` |
| `tplMs3fCounter` | Favorites counter (snippet `ms3FavoritesCounter`) |
| `tplMs3fListsRow` | Favorites list row (snippet `ms3FavoritesLists`) |
| `tplMs3fListsWrapper` | Wrapper for list of lists (`[[+output]]`) |
| `tplMs3fLexiconScript` | Fenom lexicon chunk (used by snippet `ms3fLexiconScript`) |
| `tplCatalogRowMs3f` | **Catalog** row (not the wishlist page): `ms3FavoritesBtn` + title; for **pdoPage** + **msProducts** — see [Integration](integration#catalog-pdopage-row) |

## data attributes (/wishlist/ page)

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-favorites-add-all` | button | Add all items in current list to cart |
| `data-favorites-add-selected` | button | Add selected (by checkbox) to cart |
| `data-favorites-cart-checkbox` | input[checkbox] | Item selection for “Add selected” |
| `data-favorites-select-all` | input[checkbox] | Select/deselect all checkboxes |
| `data-favorites-clear` | button | Clear current list |
| `data-favorites-list-selector` | select | List selector dropdown (chunk tplFavoritesListSelector) |
| `data-favorites-comment` | textarea | Item note (when comments_enabled) |
| `data-favorites-toggle` | button | Add/remove button (attribute `data-id`) |
| `data-favorites-count` | span | Item count |
| `data-favorites-share` | button | “Share list” button (attribute `data-list`) |
| `data-favorites-page-container` | div | Wishlist page container |
| `data-server-empty` | div | `1` — server list empty (cookie/sync); set by **ms3FavoritesPage** |
| `data-ms3f-ssr-products` | div | `1` — SSR product list in **tplFavoritesPage**; “Clear” or removing last card may reload the page |
| `data-favorites-mode="list"` | div | Remove card on “Remove” click |

Chunks can be overridden (Fenom or MODX); `tpl` and `emptyTpl` are set in the snippet and in JS `render()`.

## Styles and BEM

Classes use **ms3f** prefix (BEM): `ms3f__list`, `ms3f__item`, etc. Styles: `assets/components/ms3favorites/css/favorites.css`. Default cards use Bootstrap (`ms3-product-card`, `product-image-wrapper`); include Bootstrap and catalog styles if needed.

On mobile — horizontal scroll for the list (`.ms3f__list`).

## CSS variables {#css-variables}

Override in your theme (`:root` or block container):

| Variable | Description |
|----------|-------------|
| `--ms3f-bg` | Card background |
| `--ms3f-border` | Border |
| `--ms3f-radius` | Border radius |
| `--ms3f-color` | Text color |
| `--ms3f-price-color` | Price color |
| `--ms3f-button-active` | Accent: active favorites control, primary `/wishlist/` buttons, focus outline, checkbox `accent-color` |

These variables are declared in `:root` at the top of `favorites.css` and affect list cards, the `/wishlist/` page (tabs, toolbar, inputs), and the favorites toggle. Some rules use a `#e74c3c` fallback when `--ms3f-button-active` is unset.

Example:

```css
:root {
  --ms3f-bg: #fff;
  --ms3f-border: #eee;
  --ms3f-radius: 0.5rem;
  --ms3f-color: #333;
  --ms3f-price-color: #e74c3c;
  --ms3f-button-active: #e74c3c;
}
```

## Notifications (toast)

There is no built-in DOM toast in the package. The chain is:

1. **`ms3fConfig.notify(variant, text)`** — if defined and returns **`true`**, the default chain is skipped (fully custom UI).
2. **`window.ms3Message.show`** (MiniShop3) — if available.
3. **iziToast** — if `iziToast` is already global; otherwise CSS/JS are loaded once from **`ms3fConfig.iziToastBaseUrl`** (set by `ms3fLexiconScript`).

Disable built-in notifications: **`ms3fConfig.showToast = false`** before `favorites.js`.

Customize appearance via the iziToast API after load, or via your own **`notify`** handler — not via component CSS variables.

## JavaScript API

Matches `assets/components/ms3favorites/js/favorites.js` (`window.ms3Favorites`).

```javascript
window.ms3Favorites = {
  // Lists and resource type (optional args fall back to page context / storage)
  getList(name?, resourceType?),
  getAllLists(resourceType?), // omit arg → merge lists across all byType entries (for /wishlist/ pass the page type)
  add(id, list?, resourceType?),
  remove(id, list?, resourceType?),
  clearList(list?, resourceType?), // clear list + related comments locally; the Clear button also POSTs action=clear
  switchList(name),

  render(selector, options), // selector: CSS string or DOM element with id (registered as #id); options: list, tpl, emptyTpl, limit, resource_type or resourceType
  updateCounter(),
  updateButtonStates(),

  sync(options?), // per type: POST action=sync with local lists, server response is written to storage; authoritative: true — client-wins merge flag (see flushToServer)
  flushToServer(), // wraps sync({ authoritative: true }) and dispatches ms3f:synced

  createShare(list?, resourceType?), // Promise → token | null (logged-in only)
  copyFromShare(token), // Promise → id array; target is the **current** list (call switchList first if needed)

  addToCart(ids), // Promise → number added to MiniShop3 cart
  addSelectedToCart(), // Promise — checked [data-favorites-cart-checkbox]
  updateComment(productId, list?, comment, resourceType?), // note length capped by COMMENT_MAX_LENGTH in code (500)

  // Extras
  getData(), // localStorage/cookie object (byType, _defaultType, …)
  save(data), // persist edits; refreshes counters, buttons, registered render targets
  getTotalCount(resourceType?), // omit arg → sum across all types and lists
  getComment(productId, listName?, resourceType?),
  getResourceTypeFromElement(el), // reads data-resource-type
  getAll(), // legacy: getList('default') with resource type from stored _defaultType
  toast(text, variant?),
  getConnectorUrl(),
  ensureCookie(), // used when wishlist has data-server-empty
};
```

## mxQuickView and mFilter integration

**mxQuickView:** ms3Favorites subscribes to `mxqv:loaded` and `mxqv:open`. After content loads in the modal, `updateButtonStates()` runs — favorites buttons work without extra setup.

**mFilter:** When a results container exists (`[data-mfilter-results]`, `.mfilter-results` or `[data-mfilter-id]`), `ms3Favorites` uses `MutationObserver` and calls `updateButtonStates()` on DOM updates. For a custom selector set `window.ms3fConfig.mfilterContainer` before loading `favorites.js`.
