# sfMenu

Powerful menu snippet. Similar to [pdoMenu](/en/components/pdotools/snippets/pdomenu). Own menu class; much taken from pdoMenu including class support.

::: warning
Output differs from pdoMenu: link in `[[+url]]`, name in `[[+name]]`.
:::

Pass empty chunks to check placeholders. Menu can show result counts (on-the-fly or from DB). Many params; contact modstore support if issues.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **&rules** | | Rule ids for menu (comma, minus to exclude) |
| **&parents** | | Page ids with rules |
| **&urls** | | URL table entry ids (minus to exclude) |
| **&fast** | 1 | Fast mode. Disabled if countChildren=1 |
| **&countChildren** | 0 | Count resources before menu; use DB for large menus |
| **&mincount** | 0 | Min resources for link. Fast: use **where** `{"total:>=":1}` |
| **&sortcount** | 0 | Sort by count; overrides sortby |
| **&relative** | 0 | Rebuild menu from current SEO page; enables double, nesting, hideSubMenus |
| **&onlyrelative** | 0 | Show menu only on SEO pages |
| **&nesting** | 0 | Virtual nesting, tree structure |
| **&hideSubMenus** | 0 | Hide inactive branches; use with nesting |
| **&double** | 0 | Duplicate links when nesting (multi-category) |
| **&sortby** | count | Sort; default by page views |
| **&sortdir** | DESC | Sort direction |
| **&level** | 0 | Max level (fields count); 0 = unlimited |
| **&minlevel** | 0 | Min level; 0 = unlimited |
| **&limit** | 0 | Link limit |
| **&offset** | 0 | Offset |
| **&scheme** | | Link scheme: full, abs, http, https, -1 |
| **&context** | | Context for link building |
| **&cache** | 1 | Cache links |
| **&cacheTime** | 3600 | Cache TTL (sec) |
| **&groupbyrule** | 0 | Group by rule; use tplGroup |
| **&groupsort** | level | Group sort |
| **&groupdir** | ASC | Group sort direction |
| **&userank** | 0 | Use rule priority for groups |
| **&showHidden** | 1 | Show hidden menu items |
| **&count_where** | | Extra count condition (countChildren only) |
| **&fastMode** | 0 | Passed to pdoTools |
| **&where** | | JSON condition (sfUrls, sfDictionary, sfUrlWord) |
| **&toPlaceholder** | | Output to placeholder |

## Chunks

| Chunk | Description |
| --- | --- |
| **&tpl** | Link chunk. Default: `@INLINE <li{$classes}><a href="{$url}">{$name}{if $total?} ({$total}){/if}</a>{$wrapper}</li>` |
| **&tplOuter** | Menu wrapper. Default: `@INLINE <ul{$classes}>{$wrapper}</ul>` |
| **&tplGroup** | Group wrapper. Default: `@INLINE <div><h4>{$name}</h4>{$wrapper}</div>` |
| **&tplHere** | Current doc chunk |
| **&tplInner** | Inner wrapper; if empty uses tplOuter |
| **&tplInnerRow** | Inner row wrapper |
| **&tplInnerHere** | Current inner row |
| **&tplParentRow** | Parent with children |
| **&tplParentRowActive** | Active parent with children |
| **&tplParentRowHere** | Current parent with children |

## CSS class params

| Param | Description |
| --- | --- |
| **&firstClass** | First item; default first |
| **&hereClass** | Active item; default active |
| **&innerClass** | Inner links |
| **&lastClass** | Last item; default last |
| **&levelClass** | Level class; e.g. level → level1, level2 |
| **&outerClass** | Menu wrapper |
| **&parentClass** | Parent/category |
| **&rowClass** | Row class |
| **&selfClass** | Current doc |

## Examples

1. Fast mode, DB counts, sort by total, mincount 5:

```modx
[[!sfMenu?
  &fast=`1`
  &sortby=`total`
  &sortdir=`DESC`
  &mincount=`5`
  &outerClass=`navigation`
  &innerClass=`inner`
  &levelClass=`level`
  &parentClass=`parent`
  &rowClass=`rows`
  &selfClass=`self`
]]
```

2. Grouped, countChildren, exclude empty:

```modx
[[!sfMenu?
  &countChildren=`1`
  &groupbyrule=`1`
  &sortby=`createdon`
  &sortdir=`ASC`
  &mincount=`1`
  &parents=`9`
  &tplGroup=`@INLINE <div class="col-sm-6"><h4>[[+name]] <small>[[+total]] links</small></h4>[[+wrapper]]</div>`
  &tplOuter=`@INLINE <ul[[+classes]]>[[+wrapper]]</ul>`
  &tpl=`@INLINE <li[[+classes]]><a href="[[+url]]">[[+name]]</a> <nobr><span>([[+total]])</span><small> - [[+count]] views</small></nobr>[[+wrapper]]</li>`
]]
```

3. Nesting, mincount 2:

```modx
[[!sfMenu?
  &countChildren=`1`
  &nesting=`1`
  &double=`0`
  &mincount=`2`
  &parents=`9`
]]
```
