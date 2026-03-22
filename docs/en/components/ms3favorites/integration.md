---
title: Integration and customization
---
# Integration and customization

Advanced setup and appearance customization.

## Resource types (resource_type)

By default MiniShop3 products are used (`resource_type=products`). Also supported: `resources`, `articles`, `pages`, `custom`. Type is set in `ms3fLexiconScript` and can be overridden per element via `data-resource-type`.

**Default type (global):**

::: code-group
```modx
[[!ms3fLexiconScript? &resource_type=`products`]]
```

```fenom
{'ms3fLexiconScript' | snippet : ['resource_type' => 'products']}
```
:::

**Multiple types on one page:**

::: code-group
```modx
<button type="button" data-favorites-toggle data-id="[[+id]]" data-resource-type="products">...</button>
<button type="button" data-favorites-toggle data-id="[[+id]]" data-resource-type="articles">...</button>
```

```fenom
<button type="button" data-favorites-toggle data-id="{$id}" data-resource-type="products">...</button>
<button type="button" data-favorites-toggle data-id="{$id}" data-resource-type="articles">...</button>
```
:::

## Remove mode mode="list"

For a catalog where removing from favorites should hide the whole product card:

1. Wrap the list container in an element with `data-favorites-mode="list"`.
2. Wrap each card in an element with class `.ms3f-parent`.

::: code-group
```modx
<div data-favorites-mode="list" class="products-grid">
  [[!msProducts?
    &parents=`0`
    &tpl=`tplProduct`
  ]]
</div>
```

```fenom
<div data-favorites-mode="list" class="products-grid">
  {'msProducts' | snippet : ['parents' => 0, 'tpl' => 'tplProduct']}
</div>
```
:::

In chunk `tplProduct`: `<div class="ms3f-parent product-card">...<button data-favorites-toggle data-id="[[+id]]">...</button>...</div>`

## Item notes

When `ms3favorites.comments_enabled`, cards show a textarea for notes. Attribute `[data-favorites-comment]` with `data-product-id`, `data-list`. Max 500 characters. Save via action `update_comment` or `ms3Favorites.updateComment(productId, list, comment)`.

## Output via msProducts directly

For full control over filtering and sorting use [ms3FavoritesIds](snippets/ms3FavoritesIds) and [ms3Favorites](snippets/ms3Favorites):

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
[[!msProducts?
  &parents=`0`
  &resources=`[[+favorites_ids]]`
  &sortby=`FIELD(msProduct.id, [[+favorites_ids]])`
  &sortdir=`ASC`
  &tpl=`tplFavoritesItem`
  &limit=`20`
]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
{set $ids = $_modx->getPlaceholder('favorites_ids')}
{'msProducts' | snippet : ['parents' => 0, 'resources' => $ids, 'sortby' => 'FIELD(msProduct.id, ' ~ $ids ~ ')', 'sortdir' => 'ASC', 'tpl' => 'tplFavoritesItem', 'limit' => 20]}
```
:::

**With pdoPage pagination:**

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &resources=`[[+favorites_ids]]`
  &sortby=`FIELD(msProduct.id, [[+favorites_ids]])`
  &limit=`12`
  &tpl=`tplFavoritesItem`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
{set $ids = $_modx->getPlaceholder('favorites_ids')}
{'pdoPage' | snippet : ['element' => 'msProducts', 'parents' => 0, 'resources' => $ids, 'sortby' => 'FIELD(msProduct.id, ' ~ $ids ~ ')', 'limit' => 12, 'tpl' => 'tplFavoritesItem', 'totalVar' => 'page.total', 'pageNavVar' => 'page.nav']}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```
:::

::: warning Preserving order
Always use `FIELD()` for sorting to keep the order in which items were added.
:::

**Comparison:**

| Parameter | ms3Favorites | msProducts directly |
|-----------|-------------|---------------------|
| Simplicity | ✅ Ready solution | ⚠️ Requires preparing IDs |
| Item order | ✅ Automatic | ⚠️ Need FIELD() |
| Filtering | ❌ Basic | ✅ Full (&where, &tvFilters) |
| TV fields | ⚠️ Via msProducts inside | ✅ Full control |
| Pagination | ✅ pdoPage | ✅ pdoPage |
| For guests | ✅ JS render | ❌ Logged-in only |

### Catalog: pdoPage + msProducts, counter and button per row {#catalog-pdopage-row}

Typical setup (like classic favorites extras docs): a **normal product catalog** with pagination, a **favorites button per row** (list `default`), and a **global counter** for that list. This is **not** the `/wishlist/` page (`ms3FavoritesPage`). Load `ms3fLexiconScript`, CSS and JS ([Quick start](quick-start)).

Use [ms3FavoritesCounter](snippets/ms3FavoritesCounter) with `&list` and `&resource_type`: chunk `tplMs3fCounter` already includes `data-favorites-count`, so the value updates on add/remove.

**Fenom** — the package ships chunk **`tplCatalogRowMs3f`** (copy and edit markup if needed):

::: code-group
```modx
<p>Favorites [[!ms3FavoritesCounter? &list=`default` &resource_type=`products`]]</p>
<div id="ms3f-catalog-pdopage">
  <div class="rows">
    [[!pdoPage?
      &element=`msProducts`
      &parents=`0`
      &limit=`10`
      &tpl=`tplCatalogRowMs3f`
      &ajaxMode=`default`
      &totalVar=`page.total`
      &pageNavVar=`page.nav`
    ]]
  </div>
  <nav class="pagination" aria-label="Pages">[[!+page.nav]]</nav>
</div>
```

```fenom
<p>Favorites {'!ms3FavoritesCounter' | snippet : ['list' => 'default', 'resource_type' => 'products']}</p>
<div id="ms3f-catalog-pdopage">
  <div class="rows">
    {'!pdoPage' | snippet : [
      'element' => 'msProducts',
      'parents' => 0,
      'limit' => 10,
      'tpl' => 'tplCatalogRowMs3f',
      'ajaxMode' => 'default',
      'totalVar' => 'page.total',
      'pageNavVar' => 'page.nav'
    ]}
  </div>
  <nav class="pagination" aria-label="Pages">{$_modx->getPlaceholder('page.nav')}</nav>
</div>
```
:::

In **MODX** without Fenom in the row chunk, use `@INLINE` with `ms3FavoritesBtn` — see the component repo **docs/QUICK-START.md**.

::: tip AJAX pagination (ajaxMode)
After the next catalog page loads, call **`window.ms3Favorites.updateButtonStates()`** from your pdoPage callback (depends on pdoTools version) or disable AJAX and use full page reloads.
:::

**Filtering with msProducts** (discounted, in stock, by brand):

::: code-group
```modx
[[!ms3FavoritesIds? &list=`default` &toPlaceholder=`favorites_ids`]]
[[!msProducts?
  &resources=`[[+favorites_ids]]`
  &where=`{"old_price:>":0}`
  &includeTVs=`brand`
  &tvFilters=`brand==Apple`
  &sortby=`FIELD(msProduct.id, [[+favorites_ids]])`
]]
```

```fenom
{set $ids = ms3f_get_ids_for_current_user($modx, 'default')}
{'msProducts' | snippet : [
  'resources' => implode(',', $ids),
  'where' => '{"old_price:>":0}',
  'includeTVs' => 'brand',
  'tvFilters' => 'brand==Apple',
  'sortby' => 'FIELD(msProduct.id, ' ~ implode(',', $ids) ~ ')'
]}
```
:::

**Merging multiple lists** (union of IDs, unique):

```fenom
{set $defaultIds = ms3f_get_ids_for_current_user($modx, 'default')}
{set $giftIds = ms3f_get_ids_for_current_user($modx, 'gifts')}
{set $allIds = array_unique(array_merge($defaultIds, $giftIds))}
{if count($allIds) > 0}
{'msProducts' | snippet : [
  'resources' => implode(',', $allIds),
  'parents' => 0,
  'sortby' => 'FIELD(msProduct.id, ' ~ implode(',', $allIds) ~ ')',
  'tpl' => 'tplFavoritesItem'
]}
{/if}
```

::: tip MODX templates
There is no built-in `ms3fMergeIds` snippet. Either use Fenom as above, or a tiny custom snippet that loads `helpers.php`, calls `ms3f_get_ids_for_current_user()` for each list, merges arrays, and sets a placeholder for `msProducts`.
:::

## Pagination with pdoPage + ms3Favorites

::: tip Not inside `ms3FavoritesPage`
Snippet **[ms3FavoritesPage](snippets/ms3FavoritesPage)** does **not** call pdoPage. Use the pattern below (or `msProducts` + pdoPage) on a **dedicated** resource or block. The `/wishlist/` page from `ms3FavoritesPage` always fills the list via **`favorites.js`**.
:::

For server-side HTML from **ms3Favorites** (not msProducts), wrap it in [pdoPage](/en/components/pdotools/snippets/pdopage):

::: code-group
```modx
[[!pdoPage?
  &element=`ms3Favorites`
  &ids=`[[+favorites_ids]]`
  &list=`default`
  &limit=`12`
  &tpl=`tplFavoritesItem`
  &emptyTpl=`tplFavoritesEmpty`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```
```fenom
{'pdoPage' | snippet : [
  'element' => 'ms3Favorites',
  'ids' => $favoritesIdsCsv,
  'list' => 'default',
  'limit' => 12,
  'tpl' => 'tplFavoritesItem',
  'emptyTpl' => 'tplFavoritesEmpty',
  'totalVar' => 'page.total',
  'pageNavVar' => 'page.nav'
]}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```
:::

`favorites_ids` must come from [ms3FavoritesIds](snippets/ms3FavoritesIds) or helpers (logged-in / guest DB). Guests with data only in localStorage still need the JS `render()` flow.

## ms3FavoritesLists — parameters

Snippet [ms3FavoritesLists](snippets/ms3FavoritesLists) outputs the current user’s named lists with counts (like MyFavorites.lists). For guests with an empty DB row set, cookie `ms3_favorites` is used when storage is **cookie**.

| Property | Description | Default |
|----------|-------------|---------|
| **user** | MODX user ID; `0` = current user or guest (session / cookie) | 0 |
| **resource_type** | `products`, `resources`, … | products |
| **withItems** | `1` — pass comma IDs in `[[+ms3f_ids]]`; `0` — name + count only | 1 |
| **limit** | Max lists; `0` = no limit | 0 |
| **offset** | Skip from start | 0 |
| **sortby** | `name` or `count` | name |
| **sortdir** | `ASC` / `DESC` | ASC |
| **tpl** | Row chunk | tplMs3fListsRow |
| **tplWrapper** | Wrapper chunk (e.g. `<ul>`); empty = no wrapper | — |

Row placeholders: `[[+ms3f_list_name]]`, `[[+ms3f_list_title]]`, `[[+ms3f_list_url]]`, `[[+ms3f_count]]`, `[[+ms3f_ids]]` (if `withItems=1`). URLs use `ms3favorites.list_page`.

## Multiple lists

Presets: **default**, **gifts**, **plans**. Limit — `ms3favorites.max_lists` (default 10).

**Button with list:**

```html
<button data-favorites-toggle data-id="123" data-list="gifts">To gifts</button>
```

**List selector dropdown** — chunk `tplFavoritesListSelector` or snippet [ms3FavoritesLists](snippets/ms3FavoritesLists). List page links use **ms3favorites.list_page** (default `wishlist/`):

::: code-group
```modx
[[!$tplFavoritesListSelector]]
<button data-favorites-toggle data-id="[[+id]]">Add</button>
```

```fenom
{'tplFavoritesListSelector' | chunk}
<button data-favorites-toggle data-id="{$id}">Add</button>
```
:::

**JS API:**

```javascript
ms3Favorites.add(123, 'gifts');           // Add to gifts
ms3Favorites.remove(456, 'plans');        // Remove from plans
ms3Favorites.getList('default');          // default list IDs
ms3Favorites.getAllLists();               // { default:[], gifts:[], plans:[] }
ms3Favorites.switchList('gifts');         // Switch active list
ms3Favorites.render('#container', { list: 'gifts' });
```

## List sharing

**Share button** (logged-in only):

```html
<button type="button" data-favorites-share data-list="default">Share list</button>
```

**View page:** create a resource with alias `wishlist/share` (or child `share` under `/wishlist/`). **Important:** use a separate template for share — otherwise an invalid token will not show “List not found”. Snippet [ms3FavoritesShare](snippets/ms3FavoritesShare):

::: code-group
```modx
[[!ms3FavoritesShare]]
```

```fenom
{'!ms3FavoritesShare' | snippet}
```
:::

Share URL: `/wishlist/share?token=xxx`

**Connector API:**
- `create_share` — POST list=default → `{ success, token }` (logged-in only)
- `get_share` — POST token=xxx → `{ success, ids, list_name }`
- `copy_share` — POST token=xxx, target_list=default → `{ success, ids }` (guests get ids for localStorage)

## Cart integration

On /wishlist/ (**chunk `tplFavoritesPage`**): cards are loaded by **`favorites.js`** (`render()` into the page container). The following controls are available once items are shown:

- **Add all to cart** — `[data-favorites-add-all]`, adds all items in the current list
- **Add selected** — `[data-favorites-add-selected]`, adds only checked items
- **Checkbox** — `[data-favorites-cart-checkbox]` on each card (tplFavoritesPageItem)
- **Select all** — `[data-favorites-select-all]`

**JS API:**

```javascript
ms3Favorites.addToCart([1, 2, 3]);  // Add products 1, 2, 3
ms3Favorites.addSelectedToCart();   // Add selected (by checkbox)
```

**Connector action=add_to_cart:** POST `ids` (comma-separated) or `product_id` (single). Response: `{ success, added, message }`. Uses MiniShop3 `ms3->cart->add()`.

**Clear list** — `[data-favorites-clear]`. Calls action `clear` and clears the current list in DB or localStorage.

## Callbacks and events

**DOM events:**

```javascript
document.addEventListener('ms3f:added', function(e) {
  console.log('Added:', e.detail.id, e.detail.list);
});
document.addEventListener('ms3f:removed', function(e) {
  console.log('Removed:', e.detail.id, e.detail.list);
});
```

**Callback via ms3fConfig** (set before loading favorites.js):

```javascript
window.ms3fConfig = window.ms3fConfig || {};
window.ms3fConfig.onAdd = function (id, list, resourceType) { /* ... */ };
window.ms3fConfig.onRemove = function (id, list, resourceType) { /* ... */ };
window.ms3fConfig.notify = function (variant, text) {
  return false; // return true to skip ms3Message and iziToast
};
window.ms3fConfig.showToast = false;  // disable built-in toast chain entirely
window.ms3fConfig.debug = true;       // console logs with prefix [ms3Favorites]
```

With `debug: true` you will see sync, render, and connector steps — useful if the wishlist page stays empty (check for **page init** / **render** vs only **DOMContentLoaded**).

## Notifications (iziToast, MiniShop3, custom)

Toast flow (after add/remove):

1. **`window.ms3fConfig.notify(variant, text)`** — if it returns **`true`**, nothing else runs (use for Notyf, Toastr, etc.).
2. Else **`window.ms3Message.show`** (MiniShop3 frontend JS).
3. Else global **`window.iziToast`**.
4. Else **one-time** load of `iziToast.min.css` / `.js` from `ms3fConfig.iziToastBaseUrl` (default `assets/components/ms3favorites/vendor/izitoast/`).

`ms3fLexiconScript` merges into existing `window.ms3fConfig` with `Object.assign`, so you can define `notify` **before** the snippet output, or in an inline script **after** the snippet but **before** `favorites.js`.

The legacy `ms3favorites.use_minishop3_toast` setting is not used by the package.

| `notify` argument | Meaning |
|-------------------|---------|
| `variant` | Usually `success`, `info`, `warning`, `error` |
| `text` | Message string |
| **Return** | Only **`true`** means “handled, stop chain” |

## Placeholder ms3f.total

Server-side count of items in favorites. Set by snippets [ms3FavoritesPage](snippets/ms3FavoritesPage) and [ms3Favorites](snippets/ms3Favorites).

**Example — menu link only when list is not empty:**

::: code-group
```modx
[[+ms3f.total:gt=`0`:then=`<a href="/wishlist/">Favorites ([[+ms3f.total]])</a>`]]
```

```fenom
{if $_modx->getPlaceholder('ms3f.total') > 0}
  <a href="/wishlist/">Favorites ({$_modx->getPlaceholder('ms3f.total')})</a>
{/if}
```
:::

## PHP helper for getting IDs

For custom logic (msProducts, custom filters) use:

```php
require_once $modx->getOption('core_path') . 'components/ms3favorites/include/helpers.php';

// Logged-in and guests (when guest_db_enabled) — from DB
$ids = ms3f_get_ids_for_current_user($modx, 'default', 'products', 'added_at_desc');
$modx->setPlaceholder('favorites_ids', implode(',', $ids));

// Guests with no DB — from cookie (when storage_type=cookie)
$ids = ms3f_get_ids_from_cookie($modx, 'default', 'products');
```

**ms3f_get_ids_for_current_user** — params: `listName`, `resourceType`, `sortBy` (`added_at_desc` | `added_at_asc`).

**ms3f_get_ids_from_cookie** — for guests when DB is empty and storage is cookie. Params: `listName`, `resourceType`.

## mxQuickView and mFilter

**mxQuickView:** the script listens for `mxqv:loaded` and `mxqv:open` and calls `updateButtonStates()` so buttons inside the modal work without extra code.

**mFilter:** a `MutationObserver` watches `[data-mfilter-results]`, `.mfilter-results`, or `[data-mfilter-id]`. For a custom container set **`window.ms3fConfig.mfilterContainer`** (selector string) before `favorites.js`.

## Popularity (“In N wishlists”)

Snippet [ms3FavoritesPopularity](snippets/ms3FavoritesPopularity) or connector action **`get_popularity`** (POST `ids`, `resource_type`) — see the snippet page for examples.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `ms3Favorites is undefined` | favorites.js not loaded or loaded before lexicon | Check JS path and order: **ms3fLexiconScript → CSS → favorites.js** |
| Lexicon keys on screen | ms3fLexiconScript missing or escaped | Output snippet as raw HTML in Fenom if needed |
| Counter not updating | Stale UI after custom AJAX | Call `ms3Favorites.updateCounter()` after your logic |
| Wrong tab counts on /wishlist/ | `getAllLists()` without type merged all `resource_type` | Page sets `data-resource-type`; tab script uses `getAllLists(pageResourceType)` (current builds) |
| Buttons broken after mFilter refresh | Wrong observer target | Set `ms3fConfig.mfilterContainer` to your results wrapper |
| Buttons broken in mxQuickView modal | Script order | Load mxQuickView before favorites.js; confirm `mxqv:loaded` fires |
| Empty list after login | sync failed | Check Network tab for `connector.php` errors |
| Removed on /wishlist/ but still in DB | Old merge overwrote empty local with server | Current builds use **authoritative** sync + **`flushToServer()`** on explicit add/remove/clear; first page load still merges without authoritative (new device) |
| No toasts | Chain failed | Console: `[ms3Favorites] Toast`; set `iziToastBaseUrl` or preload iziToast / MS3 |
| Share not working | Guest / not logged in | `create_share` needs a logged-in user |
| Debug | Verbose logs | `window.ms3fConfig = { debug: true }` before `favorites.js` |
