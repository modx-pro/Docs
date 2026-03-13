# sfMenu

The most capable and powerful snippet. If you know [pdoMenu](/en/components/pdotools/snippets/pdomenu), it will not feel complicated. The menu is built with a custom class; a lot is taken from pdoMenu, including almost all class support.

::: warning
Output differs from pdoMenu: the formed link is in `[[+url]]`, and its label in `[[+name]]`.
:::

You can pass empty chunks and inspect the available placeholders.

The menu can be built taking into account the number of results on the page. For that you can use on-the-fly counting or values from the database (updated when products change or manually).

There are many parameters to control the menu; if you run into problems, contact modstore support and we will sort it out.

## Main snippet parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **&rules** | | Comma-separated rule ids whose links should appear in the menu (prefix with minus to exclude) |
| **&parents** | | Comma-separated page ids that rules are attached to (minus to exclude) |
| **&urls** | | Or separately, ids of generated links from the URL table (minus to exclude) |
| **&fast** | 1 | New fast menu mode; faster than the old one. Disabled if countChildren=1 |
| **&countChildren** | 0 | Count resources (products) that will be on the page before building the menu; for large menus prefer DB-stored counts |
| **&mincount** | 0 | Minimum number of resources for a link to be included. In fast mode you can pass condition via **where** `{"total:>=":1}` |
| **&sortcount** | 0 | Sort by resource count; takes precedence over sortby. In fast mode you can also pass total in sortby |
| **&relative** | 0 | Experimental: rebuild menu from the current SEO page. When enabled, turns on double, nesting, hideSubMenus and turns off groupbyrule |
| **&onlyrelative** | 0 | Show menu only on SEO pages |
| **&nesting** | 0 | Virtual nesting of links inside links, building the tree more precisely |
| **&hideSubMenus** | 0 | Hide inactive menu branches; use together with nesting |
| **&double** | 0 | Duplicate links when nesting, since links can belong to several rules (multi-category) |
| **&sortby** | count | Sort; default by page view count |
| **&sortdir** | DESC | Sort direction; default descending |
| **&level** | 0 | Maximum level to limit links. Level = number of fields the link is made of. 0 = no limit |
| **&minlevel** | 0 | Minimum level to limit links. 0 = no limit |
| **&limit** | 0 | Limit on how many links to select. With countChildren the number on the page may be lower (links are selected first, then some dropped by other conditions). In fast mode that does not happen |
| **&offset** | 0 | Offset to use with limit |
| **&scheme** | | Scheme for building resource URLs. Can be "full", "abs", "http", "https", "-1" or empty |
| **&context** | | By default not set. Set if you have issues building URLs for links |
| **&cache** | 1 | Cache; on by default so links are not collected from DB every time. Counts are cached too |
| **&cacheTime** | 3600 | Cache TTL in seconds; default 1 hour |
| **&groupbyrule** | 0 | Group by rule (uses separate wrapper chunk in &tplGroup) |
| **&groupsort** | level | Sort groups by number of fields in the rule |
| **&groupdir** | ASC | Group sort direction |
| **&userank** | 0 | Use rule priorities for sorting groups |
| **&showHidden** | 1 | Show hidden menu items. Turn off if you manually control which URL table entries appear in the menu |
| **&count_where** | | Extra condition for resource count; used only when countChildren is on |
| **&fastMode** | 0 | Passed to pdoTools for chunk processing |
| **&where** | | Extra JSON condition. You can filter by sfUrls, sfDictionary, sfUrlWord (e.g. limit menu to links related to "blue" color) |
| **&toPlaceholder** | | If set, snippet saves all data to a placeholder with this name instead of outputting |

## Available chunks

Almost the same as pdoMenu chunks.

| Chunk | Description |
| --- | --- |
| **&tpl** | Standard chunk for one link. Default: `@INLINE <li{$classes}><a href="{$url}">{$name}{if $total?} ({$total}){/if}</a>{$wrapper}</li>` |
| **&tplOuter** | Menu wrapper. Default: `@INLINE <ul{$classes}>{$wrapper}</ul>` |
| **&tplGroup** | Wrapper when grouping by rule. Default: `@INLINE <div><h4>{$name}</h4>{$wrapper}</div>` |
| **&tplHere** | Current document chunk |
| **&tplInner** | Inner wrapper; if empty, tplOuter is used |
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
