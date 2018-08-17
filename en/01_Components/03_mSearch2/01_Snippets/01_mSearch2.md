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
**&fields**			| 						| System settings redefinition of weight for indexed fields with comma: **&fields=`pagetitle:5,content:3,comment:1`**. `mse2_index_fields` is used by default. 
**&showSearchLog**	| false					| To show detailed information on given points of resource search when inserting **&showLog**.

[1]: /en/01_Components/01_pdoTools
[2]: /en/01_Components/01_pdoTools/01_Snippets/01_pdoResources.md
[3]: /en/01_Components/01_pdoTools/01_Snippets/03_pdoPage.md
[4]: /en/01_Components/03_mSearch2/01_Snippets/03_mSearchForm.md
[5]: /en/01_Components/02_miniShop2/02_Snippets/01_msProducts.md
