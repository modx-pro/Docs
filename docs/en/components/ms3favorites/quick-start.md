---
title: Quick start
---
# Quick start

Step-by-step integration of the wishlist with a MiniShop3 site.

**Snippet names:** `ms3FavoritesBtn`, `ms3FavoritesCounter`, `ms3FavoritesIds`, `ms3FavoritesLists`.

Fenom examples below assume [pdoTools](/en/components/pdotools/) **3.x**.

## Installation

### Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MiniShop3 | installed |
| pdoTools | 3.0.0+ |

### Via ModStore

1. [Connect ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3** and **pdoTools** are installed
4. Find **ms3Favorites**, click **Download**, then **Install**
5. **Settings → Clear cache**

Package is available at [modstore.pro](https://modstore.pro/).

### After installation

Load lexicon, CSS and JS on the site, add the button on the product card and output the wishlist block. Details below.

---

## Step 1: Lexicon, styles and script

In the template (or shared head/footer), load **first** the lexicon, then CSS and JS.

::: code-group

```fenom
{'ms3fLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | config}components/ms3favorites/css/favorites.css">
<script src="{'assets_url' | config}components/ms3favorites/js/favorites.js"></script>
```

```modx
[[!ms3fLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3favorites/css/favorites.css">
<script src="[[++assets_url]]components/ms3favorites/js/favorites.js"></script>
```
:::

::: tip Fenom and `auto_escape`
If the page goes blank after adding these lines, check the MODX log for `ms3fLexiconScript` errors. With Fenom **auto_escape** enabled, output the snippet as raw HTML, e.g. `{raw ('ms3fLexiconScript' | snippet)}` (exact syntax depends on your Fenom version).
:::

Without `ms3fLexiconScript`, lexicon keys may show instead of translated strings; the JS still works with built-in Russian fallbacks.

## Step 2: Add to Wishlist button

Add the button on the product card — snippet [ms3FavoritesBtn](snippets/ms3FavoritesBtn):

::: code-group

```modx
[[!ms3FavoritesBtn? &id=`[[*id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id]}
```
:::

In the product card chunk (e.g. inside msProducts output):

::: code-group

```modx
[[!ms3FavoritesBtn? &id=`[[+id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $id]}
```

:::

**Reload page after remove** (optional):

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]` &remove=`1`]]
```
```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id, 'remove' => 1]}
```
:::

**Wishlist-box layout** (`li.wishlist`, `box-icon`, `icon-heart`, tooltip) — chunk `tplMs3fBtnWishlistBox`:

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]` &tpl=`tplMs3fBtnWishlistBox`]]
```
```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id, 'tpl' => 'tplMs3fBtnWishlistBox']}
```
:::

**Remove a wrapper by ID prefix** (e.g. `#product-item-{id}`):

::: code-group
```modx
<div id="product-item-[[+id]]">
  ...
  [[!ms3FavoritesBtn? &id=`[[+id]]` &remove=`product-item`]]
</div>
```
```fenom
<div id="product-item-{$id}">
  ...
  {'!ms3FavoritesBtn' | snippet : ['id' => $id, 'remove' => 'product-item']}
</div>
```
:::

Snippet parameters: `list`, `tpl`, `remove`, `classes`, `resource_type`, `label` — see [ms3FavoritesBtn](snippets/ms3FavoritesBtn).

On click the product is added or removed from the list. A notification is shown automatically (iziToast / MiniShop3 `ms3Message` / your own `ms3fConfig.notify` — see [Integration](integration)).

## Step 3: Wishlist counter

**Client-side** (JS fills the value on load):

```html
<a href="/wishlist/">
  <span>Wishlist</span>
  <span data-favorites-count style="display: none;">0</span>
</a>
```

Limit the counter to one `resource_type` (e.g. only products): `<span data-favorites-count data-resource-type="products"></span>`.

**Server snippet** [ms3FavoritesCounter](snippets/ms3FavoritesCounter):

::: code-group

```modx
[[!ms3FavoritesCounter]]
```

```fenom
{'!ms3FavoritesCounter' | snippet}
```
:::

::: code-group
```modx
<a href="/wishlist/">Wishlist [[!ms3FavoritesCounter]]</a>
```
```fenom
<a href="/wishlist/">Wishlist {'!ms3FavoritesCounter' | snippet}</a>
```
:::

Total across all lists: `&list=all` / `['list' => 'all']`.

After load the script sets the counter to a number from 1 to 99, or to `99+` when there are more items. When the total is zero the element stays hidden.

## Step 4: Wishlist block

**Client-side render (JS):**

Use class `ms3f__list` for flex layout and horizontal scroll on small screens. The container is filled from **localStorage/cookie** via the connector:

```html
<div id="wishlist-list" class="ms3f__list"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.ms3Favorites) {
    window.ms3Favorites.render('#wishlist-list');
  }
});
</script>
```

Optional `render` options: `limit`, `tpl`, `emptyTpl`, `list`, `resource_type` — same names as for the [connector](frontend#connector-ajax).

**Server output:**

Get favorite IDs into a placeholder — snippet [ms3FavoritesIds](snippets/ms3FavoritesIds):

::: code-group

```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
[[!+favorites_ids:is=`-0`:then=`
  <p>[[%ms3favorites_empty]]</p>
`:else=`
  [[!ms3Favorites?
    &ids=`[[+favorites_ids]]`
    &tpl=`tplFavoritesItem`
    &emptyTpl=`tplFavoritesEmpty`
  ]]
`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
{set $idsStr = $_modx->getPlaceholder('favorites_ids')}
{if $idsStr == '-0'}
  <p>{$_modx->lexicon('ms3favorites_empty')}</p>
{else}
  {'!ms3Favorites' | snippet : [
    'ids' => $idsStr,
    'tpl' => 'tplFavoritesItem',
    'emptyTpl' => 'tplFavoritesEmpty'
  ]}
{/if}
```

:::

### List of named lists (tabs / menu)

Snippet [ms3FavoritesLists](snippets/ms3FavoritesLists) outputs the user’s lists with counts. Links use [System setting](settings) `ms3favorites.list_page` (default `wishlist/`).

::: code-group
```modx
[[!ms3FavoritesLists? &tplWrapper=`tplMs3fListsWrapper`]]
```
```fenom
{'!ms3FavoritesLists' | snippet : ['tplWrapper' => 'tplMs3fListsWrapper']}
```
:::

Without `tplWrapper` you get only rows from `tplMs3fListsRow`.

### Custom paginated favorites (pdoPage + msProducts)

Use this on a **separate** resource if you need a **custom** paginated layout. On `/wishlist/`, **`ms3FavoritesPage`** already uses **pdoPage** + **msProducts** when **`serverList=1`** (default) and **`resource_type=products`**. Flow: IDs → empty check → paged output and “Clear list”:

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`myf.ids`]]
[[!+myf.ids:is=`-0`:then=`
  <p>[[%ms3favorites_empty]]</p>
`:else=`
  [[!pdoPage?
    &element=`msProducts`
    &parents=`0`
    &limit=`12`
    &resources=`[[!+myf.ids]]`
    &sortby=`FIELD(msProduct.id, [[!+myf.ids]])`
  ]]
  <button type="button" class="btn btn-primary" data-favorites-clear>[[%ms3favorites_clear_list]]</button>
  [[!+page.nav]]
`]]
```
```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'myf.ids']}
{set $idsStr = $_modx->getPlaceholder('myf.ids')}
{if $idsStr == '-0'}
  <p>{$_modx->lexicon('ms3favorites_empty')}</p>
{else}
  {'pdoPage' | snippet : [
    'element' => 'msProducts',
    'parents' => 0,
    'limit' => 12,
    'resources' => $idsStr,
    'sortby' => 'FIELD(msProduct.id, ' ~ $idsStr ~ ')'
  ]}
  <button type="button" class="btn btn-primary" data-favorites-clear>{$_modx->lexicon('ms3favorites_clear_list')}</button>
  {$_modx->getPlaceholder('page.nav')}
{/if}
```
:::

### Catalog: pdoPage + msProducts, counter and row button

**Not** the favorites page: a normal **catalog** with pagination. Each row uses list `default` and includes the favorites control; the counter sits above the listing. Use package chunk **`tplCatalogRowMs3f`**. Full notes and AJAX — [Integration](integration#catalog-pdopage-row).

::: code-group
```modx
<p>Favorites [[!ms3FavoritesCounter? &list=`default` &resource_type=`products`]]</p>
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &limit=`10`
  &tpl=`tplCatalogRowMs3f`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```

```fenom
<p>Favorites {'!ms3FavoritesCounter' | snippet : ['list' => 'default', 'resource_type' => 'products']}</p>
{'!pdoPage' | snippet : [
  'element' => 'msProducts',
  'parents' => 0,
  'limit' => 10,
  'tpl' => 'tplCatalogRowMs3f',
  'totalVar' => 'page.total',
  'pageNavVar' => 'page.nav'
]}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```
:::

### Pagination: pdoPage + ms3Favorites

Same **ms3FavoritesIds** flow, but **pdoPage** wraps snippet **ms3Favorites** instead of **msProducts**. Parameters **`page`**, **`offset`**, **`totalVar`** on **ms3Favorites** work with **pdoPage**. Details — [Integration](integration).

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`myf.ids` &list=`default`]]
[[!+myf.ids:is=`-0`:then=`
  <p>[[%ms3favorites_empty]]</p>
`:else=`
  [[!pdoPage?
    &element=`ms3Favorites`
    &ids=`[[!+myf.ids]]`
    &list=`default`
    &limit=`12`
    &tpl=`tplFavoritesItem`
    &emptyTpl=`tplFavoritesEmpty`
    &totalVar=`page.total`
    &pageNavVar=`page.nav`
  ]]
  [[!+page.nav]]
`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'myf.ids', 'list' => 'default']}
{set $idsStr = $_modx->getPlaceholder('myf.ids')}
{if $idsStr == '-0'}
  <p>{'ms3favorites_empty' | lexicon}</p>
{else}
  {'!pdoPage' | snippet : [
    'element' => 'ms3Favorites',
    'ids' => $idsStr,
    'list' => 'default',
    'limit' => 12,
    'tpl' => 'tplFavoritesItem',
    'emptyTpl' => 'tplFavoritesEmpty',
    'totalVar' => 'page.total',
    'pageNavVar' => 'page.nav'
  ]}
  {$_modx->getPlaceholder('page.nav')}
{/if}
```
:::

## Step 5: /wishlist/ page

Create a resource with alias `wishlist`, a template that loads `ms3fLexiconScript`, `favorites.css`, and `favorites.js`. In the content:

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```

:::

**Default behavior:** with **`resource_type=products`** and **`serverList=1`** (default), product cards on `/wishlist/` are rendered **server-side** in the chunk (**pdoPage** + **msProducts**). With **`serverList=0`**, **`favorites.js`** fills the list (up to 100 items per tab). For other resource types the list is always **JS** after sync. See [Integration](integration#wishlist-serverlist) and [ms3FavoritesPage](snippets/ms3FavoritesPage).

For a **separate** paginated favorites page (custom template), use **ms3FavoritesIds → pdoPage → ms3Favorites** (or `msProducts`) — examples above and in [Integration](integration).

**Extended toolbar** (Catalog / Clear list / Share): pass `extendedToolbar` or use chunk alias `tplFavoritesPageDemo` — see [ms3FavoritesPage](snippets/ms3FavoritesPage).

## Styling (short)

Override [CSS variables](frontend#css-variables): `--ms3f-button-active`, `--ms3f-bg`, `--ms3f-border`, `--ms3f-color`, etc.

```css
:root {
  --ms3f-button-active: #e74c3c;
  --ms3f-bg: #fff;
  --ms3f-color: #333;
}
```

## Guest DB cleanup (cron)

To purge expired guest rows by `guest_ttl_days`, schedule:

```bash
php /path/to/site/core/components/ms3favorites/cli/cleanup_guests.php
```

The CLI script resolves MODX from `config.core.php` (walks up from `cli/`). If `guest_ttl_days = 0`, TTL cleanup is skipped.

## Next steps

- [System settings](settings) — limit, storage type, guests in DB
- [Snippets](snippets/) — parameters for ms3Favorites, ms3FavoritesBtn, ms3FavoritesIds, etc.
- [Frontend setup](frontend) — custom chunks and styles
- [Integration and customization](integration) — advanced scenarios, msProducts, cart integration
