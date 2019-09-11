Snippet implements the second part of the component - filtration of the found results. 

It has a huge amount of settings and works using its own filtration class that you can expand. 
You can organize filtration on any positions if you have a little knowledge PHP and use your imagination. 

[![](https://file.modx.pro/files/3/a/5/3a53929e0b22f4c3849b9ab6dca71b20s.jpg)](https://file.modx.pro/files/3/a/5/3a53929e0b22f4c3849b9ab6dca71b20.png)

## Parameters

 Name					    | By default					| Description
----------------------------|-------------------------------|--------------------------------------------------------
**&paginator**				| pdoPage						| Snippet for page limits navigation, [pdoPage][1] by defaults.  You can specify set of parameters: **&paginator=`pdoPage@myParams`**.
**&element**				| mSearch2						| Snippet caused for the output, [mSearch2][2] by defaults. You can specify set of parameters: **&element=`mSearch2@myParams`**. 
**&sort**					| 								| Resource field list for the sorting. Specified in the format «table\|field:direction». You can specify a few fields with a comma, for example: «resource\|publishedon:desc,ms\|price:asc».
**&filters**				| resource\|parent:parents		| List of resource filters with a comma, specified in the format «table\|field:method». 
**&aliases**				| 								| Pseudonyms list for filter which are supposed to be used in the filter URL with a comma. Specified in the format «table\|field==pseudonym". For example: "resource\|parent==category".
**&showEmptyFilters**		| true							| To show filters with one value only. 
**&resources**				| 								| Resource list fot the output, with a comma. This list will be processed by other parameters, such as **&parents**, **&showDeleted**, **&showHidden** and **&showUnpublished**.
**&parents**				| 								| List of categories with a comma for the output restriction. 
**&depth**					| 10							| Search depth of the resources from every parent. 
**&tplOuter**				| tpl.mFilter2.outer			| Design chunk for the whole block of filters and results.  
**&tplFilter.outer.default**| tpl.mFilter2.filter.outer		| Standard design chunk for one filter group. 
**&tplFilter.row.default**	| tpl.mFilter2.filter.checkbox	| Standard design chunk for one filter group. Displays as checkbox by default.
**&showHidden**				| true							| To show resources hidden in the menu. 
**&showDeleted**			| false							| To show remote resources. 
**&showUnpublished**		| false							| To show unpublished products. 
**&hideContainers**			| false							| To hide resources-containters.
**&showLog**				| false							| To show additional information about snippet work. For the authorized in «mgr» context only. 
**&suggestions**			| true							| This parameter includes the presumptive amount of result shown near every filter. Deactivate it if you are not satisfied with filter's speed.
**&suggestionsMaxFilters**	| 200							| Maximal amount of filters operations (not the actual filters), for which tentative results work. If more operations are required - **suggestions** are deactivated.
**&suggestionsMaxResults**	| 1000							| Maximal amount of resources, for which tentative results work. If there are more resources, **suggestions** will be deactivated. 
**&suggestionsRadio**		| 								| List of filters with a comma, for which one choice of the value is possible only, for example radio and select elements. Predictions of these filter groups are not summable. For example: «resource\|class_key,ms\|new»
**&suggestionsSliders**		| true							| Activates the work of tentative results with sliders, thus increasing total filtration number. 
**&toPlaceholders**			| 								| If it is not empty, mFilter2 will keep all the data in placeholders: `[[+filters]]`, `[[+results]]` and `[[+total]]` with the prefix specified in the parameter. For example, if you indicate  **&toPlaceholders=\`my.\`**, you will get: `[[+my.filters]]`, `[[+my.results]]` and `[[+my.total]]`
**&toSeparatePlaceholders**	| 								| Works the same way as **&toPlaceholders**, but **filters** also goes to separate placeholders. For example, if you indicate **&toSeparatePlaceholders=\`my.\`** and **&filters=\`tv\|test,resource\|pagetitle\`** you will get placeholders `[[+my.results]]`, `[[+my.total]]`, `[[+my.tv|test]]` and `[[+my.resource|pagetitle]]`.
**&filter_delimeter**		| \|							| The delimeter of table code name and filter field. 
**&method_delimeter**		| :								| The delimeter of filter full name and its processing method. 
**&values_delimeter**		| ,								| The delimeter of filter values in an address line of a website. 
**&tpls**					| 								| Chunks list for lines design with a comma. You can switch them using reference in $_REQUEST of **&tpl** parameter. 0 - is a chunk by default and then in sequence. For example: **&tpls=\`default,chunk1,chunk2\`**, for the product output by the chunk "chunk1", `$_REQUEST[tpl] = 1` should be sent in the request. 
**&forceSearch**			| false							| Binding search for the output. If search query is not there, nothing will output. 
**&fields**					| 								| Indexed fields list of the resource with a comma, where you should search. Also you can specify weight for every field with a comma: **&fields=`pagetitle:5,content:3,comment:1,tv_mytvname:2`**. System setting `mse2_index_fields` is used by default.
**&onlyIndex**				| false							| To activate search mode on words index only and disactivate additional results found by the simple search via LIKE.
**&showSearchLog**			| false							| To show detailed information on given points of resource when activating **&showLog**.
**&sortAliases**			| 								| JSON array with class pseudonyms for sorting. See below for details. 
**&filterOptions**			| 								| JSON string with variables for javascript filter. See below for details.
**&ajaxMode**   			| default						| Ajax mode of pagination:`default`, `scroll` or `button`. Works the same way as [pdoPage][1] does, but without using **&ajaxHistory** parameter.


## Working principles
When starting for the first time on page, snippet gets necessary filtration resources, which can be specified in two ways:

* Explicit reference of the parameters, such as **&parents**, **&resources**, **&showHidden**, etc. They will be referred to the snippet specified in **&element**, and it will return appropriate id.
* Search by mSearch2 algoritm, if there is something in `$_REQUEST[&queryVar]`. In this case found id will also be tested by the mentioned parameters. 

Then snippet inspects filter settings and generates data for them. After that snippet saves the settings in session (for ajax queries) and outputs designed chunks. 

Then you click on filters. Scripts catch their modificatioin, send a request to the server and update contents of the pages. 
Everything is fully automated, you only should specify correct parameters and set up chunks.

## Scripts and styles
In working with mFilter2, scripts and styles, specified in system settings, are registered. 

* **mse2_frontend_js** - standard javascript, `/assets/components/msearch2/js/web/default.js` by default 
* **mse2_frontend_css** - standard css styles, `/assets/components/msearch2/css/web/default.css` by default

If you want to make some changes in standard files, you should rename them and specify new values in system settings, othertwise all your changes will be overwritten in regular updating.

You can also change standard filter variables if you specify them as JSON string in **&filterOptions** parameter:
```
[[!mFilter2?
	&parents=`0`
	...
	&filterOptions=`{
		"pagination": "#mse2_pagination",
		"selected_values_delimeter": ", "
	}`
]]
```
They will replace `mSearch2.options` object variable of javascript filter on the frontend.

For example, you can disactivate automatic form sending with filters on change:
```
&filterOptions=`{"autoLoad":0}`
```
Then "Send" button shows up in the form by default, and you should press it.

### Features
* All the filter elements are supposed to be in one block with `#mse2_mfilter` in order to work properly.  That is the way it is prescribed in standard chunck **tpl.mFilter2.outer**.
* Script works through Ajax, keeping the parameters in address line through HistoryAPI. That means you always have direct working link to filters status.
* Script uses [jQueryUI.slider][3], which is connected automatically if needed, for implementing digital sliders
* All the design is targeted at [Bootstrap 3][4] by default. 
* Standard complete set is intended to work with minimal `[[!mFilter2]]` invocation and installed Bootstrap 3.
If something goes wrong after changing the chunk - look carefully what exactly you have changed. 

[![](https://file.modx.pro/files/5/6/8/568f372891fb70d76941280929399efds.jpg)](https://file.modx.pro/files/5/6/8/568f372891fb70d76941280929399efd.png)

## Chunks and design
mFilter2 has one basic chunk, where all the its work results output, with basic placeholders: `[[+filters]]` and `[[+results]]`.

Two snippets are responsible for the results: [pdoPage][1] by default, which runs [mSearch2][2] for the output of lines with documents. 
You can also specify other snippets, for example getPage and msProducts:
```
[[!mFilter2?
	&paginator=`getPage`
	&element=`mSearch2`
]]
```

You can specify 2 proper chunks for every filter:

* **&tplFilter.outer.table\|field**=`tpl.mFilter2.filter.outer` - chunk-wrapper where strings with filters (placeholder `[[+rows]]`) are inserted. 
* **&tplFilter.row.table\|field**=`tpl.mFilter2.filter.checkbox` - chunk for design of one filter parameter, checkbox by default. There is also a chunk for numbers in complete set - you should specify it on your own. 

For example, **sliders cause** for product price:
```
[[!mFilter2?
	&class=`msProduct`
	&element=`msProducts`
	&parents=`0`
	&filters=`
		ms|price:number
	`
	&tplFilter.outer.ms|price=`tpl.mFilter2.filter.slider`
	&tplFilter.row.ms|price=`tpl.mFilter2.filter.number`
]]
```

And this is the output of parents' documents in **element select**: 
```
[[!mFilter2?
	&parents=`0`
	&filters=`
		resource|parent:parents
	`
	&tplFilter.outer.resource|parent=`tpl.mFilter2.filter.select`
	&tplFilter.row.resource|parent=`tpl.mFilter2.filter.option`
	&suggestionsRadio=`resource|parent`
]]
```
Specifying select field in **&suggestionsRadio** activates proper prediction work with the filter.
Select block allows to choose one value only, so nearby values are not supposed to have pluses in front of predictions. 

Thus, you can specify proper design chunks for every filter parameter. If they are not specified, the standard ones will be used. 

## Filters 
Filter structure is specified with the help of **&filters** parameter in `code_name_tables/field:filter` format. You can specify an unlimited amount of filters with a comma at once.

 Relation of real tables and code names:

* **resource** (modResource) - resource fields selection, such as `pagetitle`, `longtitle`, etc.
* **tv** (modTemplateVar) - TV parameters selection.
* **ms** (msProductData) - product fields selection miniShop2, such as `price`, `article`, `weight`, etc.
* **msoption** (msProductOption) - product options selection miniShop2, such as `size`, `color`, `tags`, etc.
* **msvendor** (msVendor) - Selection of producer properties of a product, such as `title`, `country`, `phone`, etc.

If you do not specify table code name, 'resource' will be used. And if you do not specify filter, `default` will be used. 

You can specify a few filters for one field. for example for separate filtration on year and month. 

The example of filters in the work:
```
[[!mFilter2?
	&filters=`
		parent:grandparents,
		createdon:year,
		createdon:month,
		tv|radio:boolean,
		createdby:fullname
	`
]]
```
[![](https://file.modx.pro/files/9/6/3/963d4bc1be1657cdfd657d8fe0ce1e9as.jpg)](https://file.modx.pro/files/9/6/3/963d4bc1be1657cdfd657d8fe0ce1e9a.png)

A few standard filtration methods goes with mFilter2 in the set, which allow to output as appropriate. 

### default
Regular standard filter aimed at checkbox output. It is applicable to all the fields, for which the filter is not specified. 

### number
Filter for numbers from min to max. It is highly recommended to specify proper chuncks while using the filter, for output to be designed by sliders. 
```
[[!mFilter2?
	&filters=`
		template:number
	`
	&tplFilter.outer.resource|template=`tpl.mFilter2.filter.slider`
	&tplFilter.row.resource|template=`tpl.mFilter2.filter.number`
]]
```
[![](https://file.modx.pro/files/5/7/5/57553cb66b79e1c93391a0ec58bc5f74s.jpg)](https://file.modx.pro/files/5/7/5/57553cb66b79e1c93391a0ec58bc5f74.png)

### boolean
Filter for output of the yes/no parameters. For example, if a resource was published or not, if it is hidden from the menu or not, if it is searchable or not.
If you don’t use filter `boolean` for such fields, you’ll get 0 or 1 for values. If you do, you’ll get “yes” or “no”.
```
[[!mFilter2?
	&filters=`
		isfolder:boolean
	`
]]
```
[![](https://file.modx.pro/files/b/c/0/bc022499933ae06b101e290e9b784a16s.jpg)](https://file.modx.pro/files/b/c/0/bc022499933ae06b101e290e9b784a16.png)

### parents, categories and grandparents
The following three filters can be applied only to *parent* field of a resource.

Parents shows the names of two parents with a separator. It is on by default.
```
[[!mFilter2?
	&filters=`
		parent:parents
	`
]]
```
[![](https://file.modx.pro/files/5/b/3/5b39cd5c3019e80fa4d66819f9a2d252s.jpg)](https://file.modx.pro/files/5/b/3/5b39cd5c3019e80fa4d66819f9a2d252.png)

Categories shows the name of one direct parent.

```
[[!mFilter2?
	&filters=`
		parent:categories
	`
]]
```
[![](https://file.modx.pro/files/3/9/0/3907a5749b8d5dd5d7b38965eacd9326s.jpg)](https://file.modx.pro/files/3/9/0/3907a5749b8d5dd5d7b38965eacd9326.png)

Grandparents shows the names of grandparents and is suited for big catalogues. If there is no ‘grandparent’, the name of a direct parent will be shown.
```
[[!mFilter2?
	&filters=`
		parent:grandparents
	`
]]
```
[![](https://file.modx.pro/files/5/5/e/55e5e69063b9580d534b50a03c1acb4fs.jpg)](https://file.modx.pro/files/5/5/e/55e5e69063b9580d534b50a03c1acb4f.png)

### vendors
Filter for showing names of manufacturers of products miniShop2. It can be applied only to `vendor` field of `ms` table.
```
[[!mFilter2?
	&where=`{"class_key":"msProduct"}`
	&filters=`
		ms|vendor:vendors
	`
]]
```
[![](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559as.jpg)](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559a.png)

### fullname
This filter shows the user’s full name. It can be applied to any field that contains the user’s id.
```
[[!mFilter2?
	&filters=`
		createdby:fullname
	`
]]
```
[![](https://file.modx.pro/files/f/c/a/fca1f4f3dc12e0bb19ae0d4388f03e4ds.jpg)](https://file.modx.pro/files/f/c/a/fca1f4f3dc12e0bb19ae0d4388f03e4d.png)

### year
This filter is applied to fields with dates and shows the year. For example, with its help news can be filtrated by the year of their creation.
```
[[!mFilter2?
	&filters=`
		createdon:year
	`
]]
```
[![](https://file.modx.pro/files/c/1/3/c13c234629cde60be2122e85ee18483as.jpg)](https://file.modx.pro/files/c/1/3/c13c234629cde60be2122e85ee18483a.png)

### month
This filter is applied to fields with dates and shows the name of the month, which is taken from the dictionary of the component.

### day
This filter is applied to fields with dates and shows the day.

## Filters’ pseudonyms
In the latest versions of the addon there is a special system of pseudonyms for filters, which makes their usage more convenient.

You can prescribe a list of replacement of long filter names with shorter and easier ones. For example:
```
[[!mFilter2?
	&parents=`0`
	&element=`msProducts`
	&aliases=`
		ms|price==price,
		resource|parent==parent,
	`
	&filters=`
		ms|price:number,
		parent:parents,
		parent:categories,
	`
	&class=`msProduct`
	&tplFilter.outer.price=`tpl.mFilter2.filter.slider`
	&tplFilter.row.price=`tpl.mFilter2.filter.number`
]]
```


As a result, urls are going to go like this:
> site.com/mfilter2?**price**=102,750&**parent**=10,12,15

Please note that if you indicate pseudonyms, it’ll influence your indication of the templates’ parameters.
That is, if you indicate a pseudonym for `ms|price`, you will have to write the chunk as `&tplFilter.row.price` rather than `&tplFilter.row.ms|price`.


```
&filters=`
	resource|parent:categories,
	resource|parent:grandparents,
`
```
If some field is indicated more than once, its name will be written as field-filter and go like
```
parent-categories and parent-grandparents
```

Therefore, pseudonyms should be like this:
```
&aliases=`
	resource|parent-categories==categories,
	resource|parent-grandparents==grandparents,
`
```

Chunks will be indicated according to pseudonyms:
```
&tplFilter.row.categories=`tpl.mFilter2.filter.checkbox1`
&tplFilter.row.grandparents=`tpl.mFilter2.filter.checkbox2`
```
## Preliminary results
Preliminary results are those little figures near every filter that show how much results you’ll get if you click it.
[![](https://file.modx.pro/files/6/3/9/639c9da527e3b25fa8c9b00ae64c59c0s.jpg)](https://file.modx.pro/files/6/3/9/639c9da527e3b25fa8c9b00ae64c59c0.png)

After every click this number is recalculated for **all filters**, with account of the current state.
In order to do this the script checks each variant and counts the number of results in case of its activation.

This means that you can have several decades (hundreds, thousands) of extra filtrations. Why are they important?

* The users know at once what they’ll get with a certain click and, therefore, where they should click.
* It bans those filter combinations that will give no result. The users will not see the “no results found” caption.

This function is undoubtedly profitable but hard to work with.
It’s dependent on the number of results that are being filtrated as well as on the filter parameters. Because of this it’s just impossible for it to work always fast.

That is why you can deactivate it for big catalogues with adjustable parameters **&suggestionsMaxFilters** and **&suggestionsMaxResults**.
You can also completely deactivate it with the general parameter
```
&suggestions=`0`
```

If you activate this option, you will get the highest speed possible but there’ll be no figures near the filter.

## Sorting the results
mFilter2 can sort into more than one field of a table at once.

The introduction of **&sort** parameter and the work of **&filters** are very alike:
```
&sort=`
	resource|publishedon:asc,
	resource|createdby:desc
`
```
The thing to know here is: pseudonyms of databases may differ in accordance with the output snippet being used. For example, in mSearch2 resources join under pseudonym **modResource**, whereas in msProducts – under pseudonym **msProduct**.

That is why when working with [msProducts][5] you should do this:
```
&sort=`
	ms_product|publishedon:asc,
	ms_product|createdby:desc,
	ms|price:asc,
	ms_vendor|name:desc
`
```

In [class of filters][6] it is method **getSortFields()** that is responsible for this logic. You can change it like every other.

The following correspondences for pseudonyms of tables are given by default:

* **ms** &rarr; Data
* **ms_product** &rarr; msProduct
* **ms_vendor** &rarr; Vendor
* **tv** &rarr; TV
* **resource** &rarr; modResource

This is what snippet will get after processing parameters from the latter example:
```
`msProduct`.`publishedon` ASC, `msProduct`.`createdby` DESC, `Data`.`price` ASC, `Vendor`.`name` DESC
```

As you see, **&sort** is clearly dependent on two things: what snippet chooses data and how tables are joined in it. 
This means that when you have any sorting mistakes, you should check the work log and the system log.

If you need more pseudonyms, you can add them with parameter **&sortAliases**.
For instance, in order to filtrate tickets:
```
[[!mFilter2?
	&parents=`0`
	&class=`Ticket`
	&element=`getTickets`
	&sortAliases=`{"ticket":"Ticket"}`
	&sort=`ticket|createdon:desc,ticket|pagetitle:asc`
	&showLog=`1`
]]
```

Another instance is sorting by the option of a product miniShop2:
```
[[!mFilter2?
	&parents=`0`
	&element=`msProducts`
	&leftJoin=`{
		"Test1": {
			"class": "msProductOption",
			"on": "Test1.key = 'test1' and Test1.product_id = msProduct.id"
		}
	}`
	&sortAliases=`{"test1":"Test1"}`
	&aliases=`test1|value==test1`
	&sort=`test1:desc`
]]
```
We add option **test1**, then add a pseudonym for this table and sort by the value of the added option.

Link for sorting in chunk `tpl.mFilter2.outer` in this case should be like this:
```
<a href="#" class="sort [[+mse2_sort:is=``:then=`active`]]"
    data-sort="test1" 
    data-dir="[[+mse2_sort:is=``:then=`desc`]]" 
    data-default="desc">Test1 <span></span></a>
```
Note that naming the pseudonym in **&aliases** gives us the opportunity to sort by `test1` instead of `test1|value`.

If you need to sort by more than one option, you will have to add all of them to the  selection under their unique pseudonyms and write corresponding links.

## Javascript
The work of all filters is provided by script default.js, which is given.
Its address is written in system setting **mse2_frontend_js**. If you want to change anything, just rename the file and write its new name in the setting in order to prevent its rewriting in case of an update.

All methods are situated in one object **mSearch2**. You can send a form programmatically like this:
```
mSearch2.submit();
```
Values can be reset like this:
```
mSearch2.reset();
```

If you update the filters, event **mse2_load** will happen:

```
$(document).on('mse2_load', function(e, data) {
	console.log(e, data);
});
```
You can use this event for the extra processing of the filter values.


## Lexicons
Filters are coded with the help of lexicon records.
If you implement a new filter and it appears as a long and confusing caption in English, you should add it to dictionary mSearch2.


[![](https://file.modx.pro/files/5/5/2/552180f6bee53f13c033fb188c622f04s.jpg)](https://file.modx.pro/files/5/5/2/552180f6bee53f13c033fb188c622f04.png)
[![](https://file.modx.pro/files/e/b/b/ebbc79941c98e61692f47d1e8046c721s.jpg)](https://file.modx.pro/files/e/b/b/ebbc79941c98e61692f47d1e8046c721.png)



[1]: /ru/01_Компоненты/01_pdoTools/01_Сниппеты/03_pdoPage.md
[2]: /ru/01_Компоненты/03_mSearch2/01_Сниппеты/01_mSearch2.md
[3]: http://jqueryui.com/slider/
[4]: http://getbootstrap.com/
[5]: /ru/01_Компоненты/02_miniShop2/02_Сниппеты/01_msProducts.md
[6]: /ru/01_Компоненты/03_mSearch2/03_Расширение/01_Методы_фильтрации.md


