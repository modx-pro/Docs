The snippet pdoNeighbors displays the previous and the next resources.

It can display several neighbors at once, check their status (unpublished, published), and allows you to specify sorting.

You can display the previous / next resources based on «menuindex», publication date or other resource field.

## Options

Accepts all options of [pdoTools][1] (except chunks templates) and some of its own:

Parameter			| Default		| Description
--------------------|-------------------|----------------------------------------------------------------------------------
**&id**				| The current document	| The resource ID, of which are displayed the neighbors.
**&tplPrev**		| see below			| Chunk reference to the previous document.
**&tplUp**			| see below			| Chunk reference to the parent document.
**&tplNext**		| see below			| Chunk reference to the following document.
**&tplWrapper**		| see below			| Chunk-wrapper for wrapping results. Uses placeholders: `[[+left]]`, `[[+top]]`, `[[+right]]` and `[[+log]]`. It does not work in conjunction with **&toSeparatePlaceholders**.
**&toPlaceholder**	|  					| If not empty, the snippet will save all data to the placeholder specified, instead of displaying the output with the snippet call.
**&showLog**		| 0					| Display log information of the snippet. Only authorized in the context «mgr».
**&loop**		| 1					| 0/1: Hide/show neighbours first/last entry if at the end of list
### Template Chunks

Template			| Default
----------------|--------------------------------------------------------------------------------------
**&tplPrev**	| `@INLINE <span class="link-prev"><a href="/[[+uri]]">&larr; [[+menutitle]]</a></span>`
**&tplUp**		| `@INLINE <span class="link-up">&uarr; <a href="/[[+uri]]">[[+menutitle]]</a></span>`
**&tplNext**	| `@INLINE <span class="link-next"><a href="/[[+uri]]">[[+menutitle]] &rarr;</a></span>`
**&tplWrapper**	| `@INLINE <div class="neighbors">[[+prev]][[+up]][[+next]]</div>`

## Examples
Default snippet displays the neighbors as they are in the resource tree, that is, based on  «menuindex»:
```
[[pdoNeighbors]]
```

By default, the neighbors are selected from the current document, but you can specify a different id:
```
[[pdoNeighbors?
	&id=`55`
]]
```

The snippet is perfect for displaying links to adjacent news items (it is best to sort by date of publication):
```
[[pdoNeighbors?
	&sortby=`publishedon`
	&sortdir=`asc`
]]
```

[![](https://file.modx.pro/files/0/b/0/0b0f9549bbf2d026243a71c5908f4f26s.jpg)](https://file.modx.pro/files/0/b/0/0b0f9549bbf2d026243a71c5908f4f26.png)

[1]: /en/01_Components/01_pdoTools/04_General_settings.md
