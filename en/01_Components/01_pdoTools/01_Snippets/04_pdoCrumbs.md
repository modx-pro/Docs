Snippet for building breadcrumb-style navigation.

Good substitute for [BreadCrumb] [1] works with documents from any contexts and provides a number of options for selecting resources.

Snippet has a very high speed, due to selecting only the specified elements from the database per request .

## Properties

Accepts all of the properties of [pdoTools] [2] and some others:

Property			| Default			| Description
--------------------|-----------------------|--------------------------------------------------------------------------------------------
**&showLog**		| 0						| Show additional information on the work of the snippet . Only displayed to users logged in to the «mgr» context.
**&from**			| 0						| Id of the resource from which to begin to build the breadcrumbs . This is usually the root of the site, which is "0".
**&to**				|  						| Id of the resource with which end the breadcrumbs . By default, the id of the current page.
**&exclude**		|  						| Comma-separated list of resource IDs that should be excluded from the output.
**&toPlaceholder**	|  						| If not empty, the snippet will save all data to a placeholder with the same name , instead of displaying the output to the screen.
**&outputSeparator**| `&nbsp;&rarr;&nbsp;`	| The character to use as a separator between the crumbs.
**&tpl**			|  						| Name of chunk for formatting the output. If not specified, the contents of the resource fields will be printed to the screen.
**&tplCurrent**		|  						| Chunk for formatting the current resource's crumb in the navigation .
**&tplMax**			|  						| Chunk which is added to the end of the results, if there are more than **&limit** crumbs.
**&tplHome**		|  						| Chunk for formatting the link on the home page.
**&tplWrapper**		|  						| Chunk for formatting the wrapper, to wrap all results. Provides one placeholder: `[[+output]]`. It does not work in conjunction with **&toSeparatePlaceholders**.
**&wrapIfEmpty**	|  						| Output the chunk wrapper **&tplWrapper** even if there are no results.
**&showCurrent**	| 1						| Display the current document in the navigation.
**&showHome**		| 0						| Display a crumb for the home page.
**&showAtHome**		| 1						| Show breadcrumbs on the home page.
**&hideSingle**		| 0						| Do not display the result if it is only a single crumb.
**&direction**		| ltr					| The direction of navigation: from left to right «ltr» or right to left «rtl», such as for Arabic.

### Template Properties

Template		| Default
----------------|----------------------------------------------------
**&tpl**		| `@INLINE <a href="[[+link]]">[[+menutitle]]</a>`
**&tplCurrent**	| `@INLINE <span>[[+menutitle]]</span>`
**&tplMax**		| `@INLINE <span>&nbsp;...&nbsp;</span>`
**&tplHome**	|
**&tplWrapper**	| `@INLINE <div class="breadcrumbs">[[+output]]</div>`

## Examples
Generation of bread crumbs for the current page:

```
[[pdoCrumbs]]
```

Generation of a restricted number of items:

```
[[pdoCrumbs?
	&limit=`2`
]]
```

Snippet works well when called from pdoResources. For example, here is a chunk:

```
<h3>[[+pagetitle]]</h3>
<p>[[+introtext]]</p>
[[pdoCrumbs?
	&to=`[[+id]]`
	&showCurrent=`0`
]]
```

## Generating page headers

pdoCrumbs can be called inside another snippet, for example, to generate the header tag of your pages.

Snippet Title:

```
<?php
// We define variables
if (empty($separator)) {$separator = ' / ';}
if (empty($titlefield)) {$titlefield = 'longtitle';}
if (empty($parents_limit)) {$parents_limit = 3;}
if (empty($tplPages)) {$tplPages = 'No. [[+page]] of [[+pageCount]]';}

// Key and cache settings
$cacheKey = $modx->resource->getCacheKey() . '/title_' . sha1(serialize($_REQUEST));
$cacheOptions = array('cache_key' => 'resource');

if (!$title = $modx->cacheManager->get($cacheKey, $cacheOptions)) {
	// We learn the name of the page
	$title = !empty($modx->resource->$titlefield)
		? $modx->resource->$titlefield
		: $modx->resource->pagetitle;

	// Add a search query, if there is one
	if (!empty($_GET['query']) && strlen($_GET['query']) > 2) {
		// We need to use a placeholder to avoid
		$title .= ' «[[+mse2_query]]»';
	}

	// Adding pagination if indicated
	if (!empty($_GET['page'])) {
		$title .= $separator . str_replace('[[+page]]', intval($_GET['page']), $tplPages);
	}

	// Adding parents
	$crumbs = $modx->runSnippet('pdoCrumbs', array(
		'to' => $modx->resource->id,
		'limit' => $parents_limit,
		'outputSeparator' => $separator,
		'showHome' => 0,
		'showAtHome' => 0,
		'showCurrent' => 0,
		'direction' => 'rtl',
		'tpl' => '@INLINE [[+menutitle]]',
		'tplCurrent' => '@INLINE [[+menutitle]]',
		'tplWrapper' => '@INLINE [[+output]]',
		'tplMax' => ''
	));
	if (!empty($crumbs)) {
		$title = $title . $separator . $crumbs;
	}

	// By caching the results
	$modx->cacheManager->set($cacheKey, $title, 0, $cacheOptions);
}

// return title
return $title;
```

Call the snippet on the page

```
<title>[[Title]] / [[++site_name]] - my best website in the world</title>
```

## Demo
Working Example [generate breadcrumbs in the search results] [3] mSearch2.

[![](https://file.modx.pro/files/a/f/4/af4033fffb71ad040e3ff2f6c01d9bf5s.jpg)](https://file.modx.pro/files/a/f/4/af4033fffb71ad040e3ff2f6c01d9bf5.png)

Also the site [bezumkin.ru][4] uses dynamic titles.


[1]: http://rtfm.modx.com/extras/revo/breadcrumb
[2]: /en/components/pdotools/general-settings
[3]: http://bezumkin.ru/search?query=pdotools
[4]: http://bezumkin.ru/
