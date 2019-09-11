
Snippet for the output of the autocompletion search form.


Should be summoned uncached due to the specifics of working in Ajax.


## Parameters

 Name			    | By default		    | Description
--------------------|-----------------------|--------------------------------------------------------
**&pageId**			|  						| Id of the page on which the search request will be sent. By default it’s the current page. 
**&tplForm**		| tpl.mSearch2.form		| Chunk with an HTML form for output, must contain «class="msearch2"» in tag «\<form\>».
**&tpl**			| tpl.mSearch2.ac		| Chunk for the coding standards of each result 
**&element**		| mSearch2				| Snippet that will be summoned for work output. Bu default - [mSearch2][1].
**&limit**			| 5						| Limit of the results selection 
**&autocomplete**	| results				| Autocompletion settings. Possible variants: «results» - search through the site (snippet associated with **&element** will be summoned for the output), «queries» - search through the query table, «0» - deactivate autocompletion.
**&queryVar**		| query					| Name of the variable for receiving search query from «$_REQUEST». By default - «query».
**&minQuery**		| 3						| Minimal length of a query. 
**&fields**			| 						| List of the indexed fields of the resource, with commas, to look through. You can also indicate each field’s weight, with commas: **&fields=`pagetitle:5,content:3,comment:1,tv_mytvname:2`**. By default system setting `mse2_index_fields`is used.
**&onlyIndex**		| false					| Activate search only by words’ index and deactivate extra results that can be found through simple search with LIKE.

## Autocompletion
The main function of the snippet is to realize autocompletions to queries. There are 2 regimes: 

#### results
Search is made by a standard algorithm, through a lexical index with corrections.
After that id of pages found are sent to the snippet associated with **&element**. It gives the results.

You can write any parameters into that snippet in order for it to give you suitable results, for example, documents from a certain container, product category, etc.

That is, search gives you all pages found and then you use the snippet to restrict what pages to show. This regime doesn’t ‘complete’ your query in any way, it just gives you ready-made results.
That’s why when you choose a point from the list, you go there immediately.

[![](https://file.modx.pro/files/0/2/d/02d12e8588b9920752fddecef35ba99cs.jpg)](https://file.modx.pro/files/0/2/d/02d12e8588b9920752fddecef35ba99c.png)

#### queries
This regime presupposes some real query completion. It searches through [query history][4], which is shown in your control system.

That is, it shows you suitable queries that were already made by other users. Queries with no results will not be shown.

If you choose a query from the list, it’ll be put in the form, which will be sent immediately.  [![](https://file.modx.pro/files/1/b/3/1b3240ec2c205bae779d771826bb789ds.jpg)](https://file.modx.pro/files/1/b/3/1b3240ec2c205bae779d771826bb789d.png)

## Scripts and styles
The snippet uses scripts and styles which are given in the system settings:

* **mse2_frontend_js** - standard javascript, by default `/assets/components/msearch2/js/web/default.js`
* **mse2_frontend_css** - standard css coding styles, by default `/assets/components/msearch2/css/web/default.css`

In order to work properly scripts should know what parameters were given when the snippet was summoned. For this reason important settings like **&minQuery**, **&queryVar** and **&autocomplete** should be registered for every page.

If you want to change standard files in any way, they should be renamed and their new values should be written into the system settings. Otherwise all of your changes will be lost after a regular update.

To execute all the functions of autocompletions [jQueryUI.autocomplete][3] is used. 
If it isn’t on your site yet, mSearchForm will download it.
Autocomplete will be automatically applied to every form on the page that has «class="msearch2"».

## Examples
Normal call for the snippet: 
```
[[!mSearchForm]]
```

mSearchForm sends all parameters received to the snippet associated with **&element**, which means that you can write values like this: 
```
[[!mSearchForm?
	&element=`pdoResources`
	&includeTVs=`image,file`
]]

[[!mSearchForm?
	&element=`msProducts`
	&includeThumbs=`120x90`
	&where=`{"Data.price:>":0}`
]]

```

[1]: /en/01_Components/03_mSearch2/01_Snippets/01_mSearch2.md
[2]: /en/01_Components/03_mSearch2/01_Snippets/02_mFilter2.md
[3]: http://jqueryui.com/autocomplete/
[4]: /en/01_Components/03_mSearch2/02_Management/03_Queries.md



