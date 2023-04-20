Plugin to layout the content of a big page into several subpages.


## Concept of operation
Plugin seeks for definite delimiters in content of the page, on default `<!-- pagebreak -->`. If it finds any, it divides the page according to them and generate link for the next ones.

When you click on such link MODX does not find a necessary page because it does not exist, it generates event *OnPageNotFound*.
Plugin responses to this event, finds required piece of content and outputs it.

Thus several "virtual" pages are resulted from one real page.

## Demonstration
Plugin activity can be seen on [demo-site][1].
[![](https://file.modx.pro/files/0/e/d/0ed53550272ad3c7d3860d18a0697762s.jpg)](https://file.modx.pro/files/0/e/d/0ed53550272ad3c7d3860d18a0697762.png)

## Facilities

* Operates with cached resources.
* Loads only when there r delimiters in content.
* Delivered with plugin PageBreak and TinyMCE (TypoMCE) to do automatic layout split of the text.
* Supports friendly urls
* Supports common documents and containers

## Chunks
Following chunks are used to format page-navigation:

Имя						| Описание											| Плейсхолдеры
------------------------|---------------------------------------------------|-----------------------------------
tpl.PageBreaker.begin	| Reference to the first page						| `[[+link]]` - reference to the page
tpl.PageBreaker.next	| Reference to the next page, it can be empty.		| `[[+link]]` - reference to the page
tpl.PageBreaker.prev	| Reference to the previous page, it can be empty.	| `[[+link]]` - reference to the page
tpl.PageBreaker.outer	| Block with all references.						| `[[+pb_link_prev]]`, `[[+pb_link_next]]`, `[[+pb_link_begin]]` - formatting the reference
						| 													| `[[+pb_page]]` - number of a current page
						| 													| `[[+pb_total]]` - general quantity


If you are on the first or last page, references to the next or previous pages will not be generated. This is done so that you can check such situations with output filters and substitute a reference to the beginning of the document. It was done this way with standard chunk outer:
```
<div class="pagebreaker">
		[[+pb_link_prev]]

		<span class="pb_page_current">[[+pb_page]]</span>
		[[%pb_page_from]]
		<span class="pb_page_total">[[+pb_total]]</span>

		[[+pb_link_next:default=`[[+pb_link_begin]]`]]
</div>
```

## Ajax
Plugin can operate in Ajax regime, it means to switch pages without restart.

* For this you need to activate system setting **pagebreaker_ajax**
* References to pages should have class `pb_link`. Check it if you changed standard chunks.
* Tag `[[*content]]` should be wrapped in element with **#pagebreaker_content** (**pagebreaker_ajax_selector** can be changed in the settings).

This way:
```
<div id="pagebreaker_content">
	[[*content]]
</div>
```

In Ajax regime plugin tried to operate through Javascript HistoryApi, so page address can switch with or without Ajax. There are no additional parameters in address line.

If page user has an old browser – hash should be enabled in url


[1]: http://demo.modx.pro/pagebreaker
