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

**Merging multiple lists:**

::: code-group
```modx
[[!ms3FavoritesIds? &list=`default` &toPlaceholder=`ids_default`]]
[[!ms3FavoritesIds? &list=`gifts` &toPlaceholder=`ids_gifts`]]
[[!ms3fMergeIds? &ids1=`[[+ids_default]]` &ids2=`[[+ids_gifts]]` &toPlaceholder=`all_ids`]]
[[!+all_ids:notempty=`[[!msProducts?
  &parents=`0`
  &resources=`[[+all_ids]]`
  &sortby=`FIELD(msProduct.id, [[+all_ids]])`
  &tpl=`tplFavoritesItem`
]]`]]
```

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
:::

::: tip Snippet ms3fMergeIds
For merging lists in MODX you need a simple snippet `ms3fMergeIds`: accepts `ids1`, `ids2`, `toPlaceholder`, merges IDs, removes duplicates, writes to placeholder. Or use the [PHP helper](#php-helper-for-getting-ids) in a custom snippet.
:::

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

On /wishlist/ (chunk tplFavoritesPage) you have:

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
window.ms3fConfig.onAdd = function(id, list) { /* ... */ };
window.ms3fConfig.onRemove = function(id, list) { /* ... */ };
window.ms3fConfig.showToast = false;  // disable default toast
window.ms3fConfig.debug = true;       // log to console
```

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

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `ms3Favorites is undefined` | favorites.js not loaded or loaded before lexicon | Check JS path and script order |
| Counter not updating | `updateCounter()` not called | Ensure `save()` runs after add/remove |
| Buttons not working in modal (mxQuickView) | Content loaded via AJAX | ms3Favorites listens to `mxqv:loaded`. Check load order |
| Empty list after login | Sync failed | Check console for fetch errors |
| Share not working | Logged-in only | `create_share` requires `user_id` |
| Debug mode | Log to console | `window.ms3fConfig = { debug: true }` before loading `favorites.js` |
