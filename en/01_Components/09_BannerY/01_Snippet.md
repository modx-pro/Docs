Component to manage the banners on the site.
Create a banner ad space, then bind to one another, and output on the site in the right places.

It is also able to consider clicks and keep their statistics.

## Parameters
Name						| Description
----------------------------|---------------------------------------------------
**&positions**				| Comma separated list of ads positions.
**&showLog**				| If true, snippet will add detailed log of query for managers.
**&fastMode**				| Fast chunks processing. If true, MODX parser will not be used and unprocessed tags will be cut.
**&limit**					| If set to non-zero, will only show X number of items.
**&offset**					| An offset of items returned by the criteria to skip.
**&sortby**					| Return results in specified order. It can be any field of byAd, "RAND()" or "idx" - index of ad in position.
**&sortdir**				| Order of the results
**&outputSeparator**		| An optional string to separate each tpl instance.
**&where Массив**			| A JSON-style expression of criteria to build any additional where clauses from.
**&showInactive**			| Show an inactive items.
**&tpl**					| Name of a chunk serving as a item template. If not provided, properties are dumped to output for each item.
**&tplFirst**				| Name of a chunk serving as item template for the first item.
**&tplLast**				| Name of a chunk serving as item template for the last item.
**&tplOdd**					| Name of a chunk serving as item template for items with an odd idx value (see idx property).
**&tplWrapper**				| Name of a chunk serving as a wrapper template for the output. This does not work with toSeparatePlaceholders.
**&wrapIfEmpty**			| If true, will output the wrapper specified in &tplWrapper even if the output is empty.
**&toPlaceholder**			| If set, will assign the result to this placeholder instead of outputting it directly.
**&toSeparatePlaceholders**	| If set, will assign EACH result to a separate placeholder named by this param suffixed with a sequential number (starting from 0).

## Examples
Before use it is necessary to create a banner and a position previously. See in section Interface

```
[[!BannerY? &position=`2`]]
```