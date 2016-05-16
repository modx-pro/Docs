The snippet for search and displaying search results.

The component utilises [pdoTools][1], therefore  all the basic features are available: TV connection, tables, specify conditions &WHERE, &select, etc. By and large, this snippet is an adaptation of [pdoResources][2] with two differences:

* To display search results and adds a [[+weight]] placeholder to rank the results.
* Also adds a placeholder [[+intro]] to highlighted search keywords.

Snippet should respond to additional search requests, so its necessary to call the snippet uncached.

## Properties

Parameter 			| Default				| Description
--------------------|-----------------------|--------------------------------------------------------
**&tpl**			| tpl.mSearch2.row		| Chunk for each result. Can use `[[+weight]]` and `[[intro+]]` placeholders.
**&returnIds**		| false					| Only return a list of matching page IDs, separated by commas.
**&showLog**		| false					| Show additional information for the snippet call. Only authorized manager users will see the output.
**&limit**			| 10					| Limit total number of search results.
**&offset**			| 0						| An offset of items returned in the search results.
**&depth**			| 10					| Search depth of resources from each parent.
**&outputSeparator**| \n					| Optional string to separate the results.
**&toPlaceholder**	|  						| If set, will assign the result to this placeholder instead of outputting it directly.
**&parents**		|  						| The list of parent resources to limit the results, separated by commas.
**&includeTVs**		|  						| List of TVs to be available in search results, separated by commas. For example: `action, time` will placeholders `[[+action]]` and `[[+time]]`.
**&tvPrefix**		|  						| Prefix for TV placeholders, such as `tv.`.
**&where**			|  						| Additional parameters encoded in JSON.
**&showUnpublished**| false					| Show unpublished resources in search results.
**&showDeleted**	| false					| Show deleted resources in search results.
**&showHidden**		| true					| Show hidden resources in search results.
**&hideContainers**	| false					| Hide container resources from the search results.
**&introCutBefore**	| 50					| Specify the number of characters to display in the placeholder `[[+intro]]` before the first keyword match in the text.
**&introCutAfter**	| 250					| Specify the number of characters to display in the placeholder `[[+intro]]` after the first keyword match in the text.
**&htagOpen**		| &lt;b&gt;				| The opening tag for highlighting results in `[[+intro]]`.
**&htagClose**		| &lt;/b&gt;			| The closing tag for highlighting results in `[[+intro]]`.
**&parentsVar**		| parents				| Variable name for additional filtering of the parents. It can be transmitted through *$_REQUEST*.
**&queryVar**		| query					| The variable name for the search query from *$_REQUEST*.
**&tplWrapper**		|  						| Wrapper chunk, to wrap all search results. Available placeholders: `[[+output]]`, `[[+total]]`, `[[+query]]` and `[[+parents]]`.
**&wrapIfEmpty**	| false					| Includes conclusion chunk wrapper `&tplWrapper` even if there are no results.
**&forceSearch**	| true					| If set to true search results will be displayed even without any keyword input.
**&minQuery**		| 3						| Minimum length of the search query.
**&fields**			| 						| List of resource fields where to do the search, separated by commas. You can also specify a weight for each field, separated by commas: ```&fields=`pagetitle:5,content:3,longtitle:1` ``` . The default system setting mse2_index_fields.
**&onlyIndex**		| false					| Enable search by index only words, and turn off the additional results have been found through a simple search LIKE.

## Lexicons
The snippet displays errors, which can be set with the system lexicons.

* **mse2_err_no_results** &rarr; "matching results found".
* **mse2_err_min_query** &rarr; "search query is too short." Displays if search query is less than the value specified query **&minQuery**.
* **mse2_err_no_query** &rarr; "set to an empty search query".

There are other records that are used with chunks and snippets default.
[![](http://file.modx.pro/files/2/e/b/2eb17463d4da9ddaa25bb0f80f197d8cs.jpg)](http://file.modx.pro/files/2/e/b/2eb17463d4da9ddaa25bb0f80f197d8c.png)

## Search Form

To send a query to the snippet this simple form can be used:

```
<form action="/search.html" method="get">
	<input type="text" name="query" value="[[+mse2_query]]" />
	<button type="submit">Search!</button>
</form>
```

Please note that the request should be use the same name as specified in the parameter **&queryVar**, the default is *query*.

## Examples
If the form is specified an empty action, then it is sent to the current page:
```
<form action="" method="get">
	<input type="text" name="query" value="[[+mse2_query]]" />
	<button type="submit">Search!</button>
</form>

[[!mSearch2]]
```

You can use pagination from [pdoPage][3]. mSearch2 sets pdoTools automatically, so you already have pdoPage available.
```
<form action="" method="get">
	<input type="text" name="query" value="[[+mse2_query]]" />
	<button type="submit">Search!</button>
</form>

[[!pdoPage?
	&element=`mSearch2`
]]

[[!+page.nav]]
```
And, of course, the snippet can be invoked with [mSearchForm][4].

```
[[!mSearchForm]]

[[!pdoPage?
	&element=`mSearch2`
]]

[[!+page.nav]]
```


[1]: /ru/01_Компоненты/01_pdoTools
[2]: /ru/01_Компоненты/01_pdoTools/01_Сниппеты/01_pdoResources.md
[3]: /ru/01_Компоненты/01_pdoTools/01_Сниппеты/03_pdoPage.md
[4]: /ru/01_Компоненты/03_mSearch2/01_Сниппеты/03_mSearchForm.md
