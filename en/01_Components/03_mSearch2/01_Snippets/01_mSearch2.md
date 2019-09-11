Snippet for search and output. 

In the work [pdoTools][1] is used, so all basic options are available: TV connection, requirement reference in **&where**, **&select**, etc.
Basically this snippet represents modified [pdoResources][2] with two distinctions:

* It uses search and add placeholder `[[+weight]]` with points for output. 
* Also it adds placeholder `[[+intro]]` with mathces highlighted. 

Snippet is supposed to react to transferred request, so it is highly recommended to involve it uncaсhed. 

## Options

Name			    | By default			| Description
--------------------|-----------------------|--------------------------------------------------------
**&tpl**			| tpl.mSearch2.row		| Chunk layout for every outcome. Usual resource placeholders + `[[+weight]]` and `[[+intro]]`.
**&returnIds**		| false					| To return id list of proper pages with a comma. 
**&showLog**		| false					| To show extra information on snippet work. For the authorized in «mgr» context only. 
**&limit**			| 10					| Limit of the result selection. 
**&offset**			| 0						| Result offset from the beginning of selection. 
**&depth**			| 10					| In-depth search of resources for every parent. 
**&outputSeparator**| \n					| Optional string for separating results of work. 
**&toPlaceholder**	|  						| Unless it is empty, snippet will keep all data in placeholder with the name instead of displaying. 
**&parents**		|  						| List of categories with a comma for the output restriction. 
**&includeTVs**		|  						| TV options list for selection with a comma. For example: «action,time» will provide `[[+action]]` and `[[+time]]`.
**&tvPrefix**		|  						| Prefix for TV placeholders, for example «tv.».
**&where**			|  						| Additional selection options coded in JSON.
**&showUnpublished**| false					| To show unpublished products. 
**&showDeleted**	| false					| To show remote resources. 
**&showHidden**		| true					| To show resources hidden in menu. 
**&hideContainers**	| false					| To hide resources-containers. 
**&introCutBefore**	| 50					| Specify number of symbols for the output in placeholder `[[+intro]]` before the first coincidence in the text. 
**&introCutAfter**	| 250					| Specify number of symbols for the output in placeholder `[[+intro]]` after the first coincidence in the text. 
**&htagOpen**		| &lt;b&gt;				| Opening tag for highlighting of the found results in `[[+intro]]`.
**&htagClose**		| &lt;/b&gt;			| Closing tag for highlighting of the found results in `[[+intro]]`.
**&parentsVar**		| parents				| Variable name for extra filtration on parents. You can send it through *$_REQUEST*.
**&queryVar**		| query					| Variable name for getting search request from $_REQUEST.
**&tplWrapper**		|  						| Chunk-wrapper for wrapping all the results. Recognizes the placeholders:`[[+output]]`, `[[+total]]`, `[[+query]]` and `[[+parents]]`.
**&wrapIfEmpty**	| false					| Includes chunk-wrapper output **&tplWrapper** even though there are no results. 
**&forceSearch**	| true					| Binding search for output. If there is no one - no output. 
**&minQuery**		| 3						| Minimal length of the search query. 
**&fields**			| 						| System settings redefinition of weight for indexed fields with comma: **&fields=`pagetitle:5,content:3,comment:1,tv_mytvname:2`**. `mse2_index_fields` is used by default. 
**&showSearchLog**	| false					| To show detailed information on given points of resource search when inserting **&showLog**.

## Lexicons
Snippet may display search errors messages which change in system dictionaries. 

* **mse2_err_no_results** &rarr; "No results found".
* **mse2_err_min_query** &rarr; "Search query is too short". That means the query is less than the **&minQuery** value. 
* **mse2_err_no_query** &rarr; "Search query is empty".

There you can also find other records used in chunks and snippets by default. 
[![](https://file.modx.pro/files/2/e/b/2eb17463d4da9ddaa25bb0f80f197d8cs.jpg)](https://file.modx.pro/files/2/e/b/2eb17463d4da9ddaa25bb0f80f197d8c.png)

## Search form
Snippet must have search query in the array $_REQUEST for it to work. It can be sent by simplest form:
```
<form action="/search.html" method="get">
	<input type="text" name="query" value="[[+mse2_query]]" />
	<button type="submit">Искать!</button>
</form>
```

Note that the query should be referred under the same name as specified in the parameter **&queryVar**, *query* by default.

## Examples
If empty action is specified, it is transferred to the current page. 
```
<form action="" method="get">
	<input type="text" name="query" value="[[+mse2_query]]" />
	<button type="submit">Искать!</button>
</form>

[[!mSearch2]]
```

You can use pages breakdown via [pdoPage][3]. mSearch2 sets pdoTools automatically, so you have already got pdoPage. 
```
<form action="" method="get">
	<input type="text" name="query" value="[[+mse2_query]]" />
	<button type="submit">Искать!</button>
</form>

[[!pdoPage?
	&element=`mSearch2`
]]

[[!+page.nav]]
```

Snippet can be caused along with [mSearchForm][4]
```
[[!mSearchForm]]

[[!pdoPage?
	&element=`mSearch2`
]]

[[!+page.nav]]
```


You can also use **mSearch2** to search and output together with [msProducts][5]:
```
[[!pdoPage?
	&element=`msProducts`
	&parents=`0`
	&resources=`[[!mSearch2:default=`999999`?returnIds=`1`&limit=`0`]]`
	&sortby=`ids`
]]

[[!+page.nav]]
```
`returnIds` parameter specifies **msProducts** - found products list for the output. 
And the `default` filter substitutes misssing id when nothing is found, otherwise **msProducts** will output every row at a time. 

In that case you can use all the fields of the products in the chunk processing. 

[1]: /en/01_Components/01_pdoTools
[2]: /en/01_Components/01_pdoTools/01_Snippets/01_pdoResources.md
[3]: /en/01_Components/01_pdoTools/01_Snippets/03_pdoPage.md
[4]: /en/01_Components/03_mSearch2/01_Snippets/03_mSearchForm.md
[5]: /en/01_Components/02_miniShop2/02_Snippets/01_msProducts.md
