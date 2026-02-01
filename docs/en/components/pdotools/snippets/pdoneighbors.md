# pdoNeighbors

pdoNeighbors outputs previous and next documents for a given resource.

Can output multiple neighbors, checks status (deleted, published) and supports custom sort.

You can get prev/next by menuindex, publish date or any other resource field.

## Parameters

Accepts all [pdoTools][1] params (except chunk templates) plus:

| Parameter        | Default           | Description |
|------------------|-------------------|-------------|
| **&id**          | Current document  | Resource ID for neighbor calculation. |
| **&loop**        | Yes               | Enable or disable loop output. |
| **&tplPrev**     | see below         | Chunk for previous document link. |
| **&tplUp**       | see below         | Chunk for parent document link. |
| **&tplNext**     | see below         | Chunk for next document link. |
| **&tplWrapper**  | see below         | Wrapper chunk. Placeholders: `[[+prev]]`, `[[+top]]`, `[[+next]]`, `[[+log]]`. Not used with **&toSeparatePlaceholders**. |
| **&toPlaceholder** |                  | If set, snippet stores data in placeholder instead of outputting. |
| **&showLog**     | `0`               | Show extra debug info. Only for users logged in to "mgr" context. |

### Templates

| Template       | Default                                                                           |
|----------------|-----------------------------------------------------------------------------------|
| **&tplPrev**   | `@INLINE <span class="link-prev"><a href="/[[+uri]]">&larr; [[+menutitle]]</a></span>` |
| **&tplUp**     | `@INLINE <span class="link-up">&uarr; <a href="/[[+uri]]">[[+menutitle]]</a></span>`   |
| **&tplNext**   | `@INLINE <span class="link-next"><a href="/[[+uri]]">[[+menutitle]] &rarr;</a></span>` |
| **&tplWrapper**| `@INLINE <div class="neighbors">[[+prev]][[+up]][[+next]]</div>`                   |

## Examples

By default neighbors follow resource tree (menuindex):

```modx
[[pdoNeighbors]]
```

Neighbors are from current document by default; you can pass another id:

```modx
[[pdoNeighbors?
  &id=`55`
]]
```

Good for neighboring news links (sort by publish date):

```modx
[[pdoNeighbors?
  &sortby=`publishedon`
  &sortdir=`asc`
]]
```

Neighboring products with thumbnail:

```fenom
{'!pdoNeighbors' | snippet: [
  'snippet' => 'msProducts',
  'sortby' => 'publishedon',
  'sortdir' => 'ASC',
  'leftJoin' => '{ "thumbs": { "class":"msProductData","alias":"thumbs", "on": "thumbs.id = modResource.id" }}',
  'select' => '{ "thumbs":"thumbs.thumb as small" }',
  'tplWrapper' => '@INLINE {$prev}',
  'tplPrev' => '@FILE chunks/product/item_prev.tpl',
]}
```

[![](https://file.modx.pro/files/0/b/0/0b0f9549bbf2d026243a71c5908f4f26s.jpg)](https://file.modx.pro/files/0/b/0/0b0f9549bbf2d026243a71c5908f4f26.png)

[1]: /en/components/pdotools/general-properties
