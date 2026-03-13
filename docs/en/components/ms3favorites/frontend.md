---
title: Frontend setup
---
# Frontend setup

Details on loading lexicon, styles and scripts are in [Quick start](quick-start). Below: connector, customization and chunks.

## Integration check

For guests with no DB data, data comes from `localStorage/cookie`. For logged-in users and guests (when `guest_db_enabled`) — from DB by `user_id` or `session_id`.

**Checklist:** lexicon and `favorites.js` are loaded on every product page; button has `data-favorites-toggle` and `data-id`; `ms3favorites.guest_db_enabled` = Yes; for logged-in users — user is authenticated in **web** context.

## Connector (AJAX)

**URL:** `assets/components/ms3favorites/connector.php`

**Method:** POST.

Actions:

- **Output favorites list** — params `ids` (required), optional `limit`, `tpl`, `emptyTpl`, `list`, `resource_type`
- **sync** — sync lists to DB (JSON). POST `lists` (JSON) or `ids`
- **create_share** — create public link (JSON). POST `list`. Logged-in only
- **get_share** — get data by token (JSON). POST `token`
- **copy_share** — copy another user's list to yours (JSON). POST `token`, `target_list`
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
| `tplFavoritesPage` | `/wishlist/` page (wrapper with tabs, cart buttons) |
| `tplFavoritesPageItem` | Item on `/wishlist/` (checkbox, note, remove button) |
| `tplFavoritesPageDemo` | Demo: tabs + Catalog/Clear/Share buttons, `?list=` |
| `tplFavoritesListSelector` | List selector dropdown (`default`, `gifts`, `plans`) |
| `tplFavoritesSharePage` | Share page (wrapper) |
| `tplMs3fBtn` | Add/remove from favorites button (snippet `ms3FavoritesBtn`) |
| `tplMs3fBtnWishlistBox` | Button template: `li.wishlist`, `box-icon`, `icon-heart`, `tooltip` |
| `tplMs3fCounter` | Favorites counter (snippet `ms3FavoritesCounter`) |
| `tplMs3fListsRow` | Favorites list row (snippet `ms3FavoritesLists`) |
| `tplMs3fListsWrapper` | Wrapper for list of lists (`[[+output]]`) |
| `tplMs3fLexiconScript` | Fenom lexicon chunk (used by snippet `ms3fLexiconScript`) |

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
| `data-favorites-mode="list"` | div | Remove card on “Remove” click |

Chunks can be overridden (Fenom or MODX); `tpl` and `emptyTpl` are set in the snippet and in JS `render()`.

## Styles and BEM

Classes use **ms3f** prefix (BEM): `ms3f__list`, `ms3f__item`, etc. Styles: `assets/components/ms3favorites/css/favorites.css`. Default cards use Bootstrap (`ms3-product-card`, `product-image-wrapper`); include Bootstrap and catalog styles if needed.

On mobile — horizontal scroll for the list (`.ms3f__list`).

## CSS variables

Override in your theme (`:root` or block container):

| Variable | Description |
|----------|-------------|
| `--ms3f-bg` | Card background |
| `--ms3f-border` | Border |
| `--ms3f-radius` | Border radius |
| `--ms3f-color` | Text color |
| `--ms3f-price-color` | Price color |
| `--ms3f-button-active` | Active button color (item in list) |
| `--toast-bg` | Toast background |
| `--toast-color` | Toast text |
| `--toast-radius` | Toast radius |

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

## JavaScript API

```javascript
window.ms3Favorites = {
  getList(name),        // Get list IDs
  getAllLists(),        // All lists {default:[], gifts:[]}
  add(id, list),        // Add item to list
  remove(id, list),     // Remove from list
  switchList(name),     // Switch active list
  render(selector, options),  // options: list, tpl, emptyTpl, limit
  updateCounter(), updateButtonStates(),
  sync(),               // Sync (POST lists)
  createShare(list),    // Create share link → token (logged-in only)
  copyFromShare(token), // Copy another user's list (target_list optional)
  addToCart(ids),       // Add items to MiniShop3 cart
  addSelectedToCart(),  // Add selected (checkbox)
  updateComment(productId, list, comment),  // Save note (up to 500 chars)
  clear(list)           // Clear list (action=clear)
};
```

## mxQuickView and mFilter integration

**mxQuickView:** ms3Favorites subscribes to `mxqv:loaded` and `mxqv:open`. After content loads in the modal, `updateButtonStates()` runs — favorites buttons work without extra setup.

**mFilter:** When a results container exists (`[data-mfilter-results]`, `.mfilter-results` or `[data-mfilter-id]`), `ms3Favorites` uses `MutationObserver` and calls `updateButtonStates()` on DOM updates. For a custom selector set `window.ms3fConfig.mfilterContainer` before loading `favorites.js`.
