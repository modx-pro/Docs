A small snippet that lets you accelerate the website loading by the removal of its secondary elements to ajax requests.

* You can call AjaxSnippet on any page of the website indicating name of the necessary snippet and parameters.
* Snippet yields an empty block with preload to current line and register ajax query.
* After loading the page the request is sent to the server and the response is placed in the prepared block.
* Request can be sent immediately after page is loaded, or on demand after clicking on link.

## Snippet parameters
Name				| Default values	| Placeholders
--------------------|-------------------|-----------------------------------------------------------
**&snippet**		| pdoResources		| Snippet name you want to run through Ajax.
**&propertySet**	| 					| If you wish to use snippet settings (property set) - specify its name.
**&wrapper**		| 					| Chunk wrapper. Must contain an element with `id="[[+key]]"`.
**&as_mode**		| onload			| How to load snippet output content: immediately after download (onload) page or by clicking on the link trigger (onclick)?
**&as_trigger**		| 					| Link text-trigger mode onclick. On default – entry from the dictionary as_trigger.
**&as_target**		| 					| CSS selector element, which is loaded in the response from the server. By default, the content will be placed into the chunk wrapper.

All other/extra parameters you define in AjaxSnippet will be applied to the `&snippet`. **Snippet can be called uncached.**

## Examples
Delayed loading of resources by pdoResources:
```
[[AjaxSnippet?
	&snippet=`pdoResources`
	&parents=`0`
	&tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
	&as_mode=`onload`
]]
```

The same as above, but you need to click on the link to request the content:
```
[[AjaxSnippet?
	&snippet=`pdoResources`
	&parents=`0`
	&tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
	&as_mode=`onclick`
	&as_trigger=`Click me!`
]]
```

History of a page changes is loading [on the documentation site][1] through AjaxSnippet.

[1]: http://docs.modx.pro
