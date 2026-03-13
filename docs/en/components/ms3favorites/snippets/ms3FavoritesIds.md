---
title: ms3FavoritesIds
---
# Snippet ms3FavoritesIds

Returns IDs of items in the favorites list. Data is taken from the DB by user_id or session_id (guests when guest_db is enabled). When DB is empty — from cookie.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **list** | List identifier | default |
| **resource_type** | Resource type: products, resources | products |
| **return** | `str` — comma-separated IDs; `data` — array | str |
| **toPlaceholder** | Placeholder name; if set — result to placeholder, otherwise output | — |
| **sortBy** | Sort: `added_at_desc`, `added_at_asc` | added_at_desc |

## Return value

- Empty list: string `-0` (for checks like `[[+name:is="-0":then=...]]`)
- Non-empty: comma-separated IDs or array (when `return=data`)

## Examples

**To placeholder:**

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
```
:::

**Check empty and output:**

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
  {'!ms3Favorites' | snippet : ['ids' => $idsStr, 'tpl' => 'tplFavoritesItem']}
{/if}
```
:::
