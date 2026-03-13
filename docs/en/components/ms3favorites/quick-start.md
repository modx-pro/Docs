---
title: Quick start
---
# Quick start

Step-by-step setup of the wishlist on a MiniShop3 site.

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
<link rel="stylesheet" href="{$_modx->getOption('assets_url')}components/ms3favorites/css/favorites.css">
<script src="{$_modx->getOption('assets_url')}components/ms3favorites/js/favorites.js"></script>
```

```modx
[[!ms3fLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3favorites/css/favorites.css">
<script src="[[++assets_url]]components/ms3favorites/js/favorites.js"></script>
```
:::

Without `ms3fLexiconScript` the script falls back to Russian strings; for a multilingual site the lexicon is required.

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

On click the product is added or removed from the list. A toast notification is shown automatically.

## Step 3: Wishlist counter

Where you need to show the number of items in the wishlist:

```html
<span data-favorites-count style="display: none;">0</span>
```

Or with the server snippet [ms3FavoritesCounter](snippets/ms3FavoritesCounter):

::: code-group

```modx
[[!ms3FavoritesCounter]]
```

```fenom
{'!ms3FavoritesCounter' | snippet}
```
:::

Total across all lists: `&list=all` / `['list' => 'all']`.

The value is set on load (1–99 or 99+); the element is hidden when zero.

## Step 4: Wishlist block

**Client-side render (JS):**

The container is filled via JavaScript from localStorage/cookie:

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

## Step 5: /wishlist/ page

Create a resource with alias `wishlist`, a template that loads ms3fLexiconScript, favorites.css and favorites.js. In the content:

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```

:::

**Pagination with pdoPage:**

For logged-in users — server output with paging:

::: code-group

```modx
[[!ms3FavoritesPage?
  &usePdoPage=`1`
  &limit=`12`
]]
```

```fenom
{'!ms3FavoritesPage' | snippet : [
  'usePdoPage' => 1,
  'limit' => 12
]}
```
:::

Guests with no DB data still use JS mode (data from localStorage).

## Next steps

- [System settings](settings) — limit, storage type, guests in DB
- [Snippets](snippets/) — parameters for ms3Favorites, ms3FavoritesBtn, ms3FavoritesIds, etc.
- [Frontend setup](frontend) — custom chunks and styles
- [Integration and customization](integration) — advanced scenarios, msProducts, cart integration
