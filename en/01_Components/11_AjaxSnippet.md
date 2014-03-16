A small snippet that lets you accelerate the website loading by the removal of its secondary elements to ajax requests.

* You activate AjaxSnippet on any page of the website indicating name of the necessary snippet and parameters.
* Snippet yields an empty block with preload  to current line and register ajax query.
* After loading of a page this enquiry goes to the server and reply is put in the prepared block.
* Query can be sent at once after loading the page, or after clocking on link-trigger.

## Snippet parameters
Name					|	On default	|	Placeholders
--------------------|-------------------|-----------------------------------------------------------
**&snippet**		| pdoResources		| Snippet that needs to be loaded through Ajax.
**&propertySet**	| 					| If you want to use the parameter set of this snippet – indicate its name.
**&wrapper**		| 					| Chunk-cover. It is required to contain element id="`[[+key]]`".
**&as_mode**		| onload			| How to load a content: right after loading of page (onload) or after clicking on link-trigger (onclick)
**&as_trigger**		| 					| Line-trigger text for regime onclick. On default – entry from the dictionary as_trigger.
**&as_target**		| 					| CSS element sector, where the reply from the server will be loaded. On default, the reply will be put in the place of chunk-cover entry.

All what you indicate in AjaxSnippet will be transferred to the inquired snippet. **Snippet can be activated uncached.**

## Samples
Delayed loading of recourses by pdoResources:
```
[[AjaxSnippet?
	&snippet=`pdoResources`
	&parents=`0`
	&tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
	&as_mode=`onload`
]]
```

The same but to start loading you need to clock on the link:
```
[[AjaxSnippet?
	&snippet=`pdoResources`
	&parents=`0`
	&tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
	&as_mode=`onclick`
	&as_trigger=`Нажми меня!`
]]
```

History of a page overpatching can be loaded through AjaxSnippet [on the documentation site][1].

[1]: http://docs.modx.pro
