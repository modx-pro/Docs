The product display snippet.

[![](https://file.modx.pro/files/9/7/2/9725aed7accaed426b7324135baf4b19s.jpg)](https://file.modx.pro/files/9/7/2/9725aed7accaed426b7324135baf4b19.png)

## Parameters

Parameter           | By default    | Description
--------------------|---------------|---------------------------------------------
**tpl**             | tpl.msProducts.row    | Chunk for a result formatting
**limit**           | 10  | Sample result limit
**offset**          |     | Skip results from the beginning of the sample
**depth**           | 10  | Depth of searching goods of every parent.
**sortby**          | id  | Sample sorting. To sort by item fields the prefix "Data" should be added, for example: "&sortby=`Data.price`"
**sortbyOptions**   |     | Indicates how and by what options to sort among listed in &sortby. Passed by a line, for example, "optionkey:integer,optionkey2:datetime"
**sortdir**         | ASC | Sorting direction
**toPlaceholder**   |     | If filled, snippet will store all data in placeholder with this name, instead of displaying.
**toSeparatePlaceholders**|     | If a word is indicated in this parameter, ALL results will be in different placeholders, beginning with this word and end in sequence number of the line, from zero. For example, if "myPl" is in the parameter, the placeholders will be [[+myPl0]], [[+myPl1]] etc.
**parents**         |     | The category list separated by commas for result searching. The sample is limited by default to current parent. If 0 is indicated- the sample is not limited.
**resources**       |     | The list of goods separated by commas for result display. If goods id begins with minus it is excluded from sample.
**includeContent**  |     | To select"content" field of goods.
**includeTVs**      |     | The list of TV sample parameters separated by commas. For example: "action,time" is given by placeholders [[+action]] and [[+time]].
**includeThumbs**   |     | The list of sample preview dimensions separated by commas. For example: "120x90,360x240" are given by placeholders [[+120x90]] and [[+360x240]]. The pictures should be pre-generated in item gallery.
**optionFilters**   |     | Goods option filters. Transmitted by JSON line, for example, {"optionkey:>":10}
**where**           |     | JSON-coded line with additional sample conditions.
**link**            |     | Goods link Id, which is automatically assigned in settings when new link is created.
**master**          |     | Master item Id. If both "master" and "slave" are indicated the sampling will follow master.
**slave**           |     | Id of affiliated item. If "master" is set this option will be ignored.
**tvPrefix**        |     | A prefix for TV placeholders, for example "tv." Empty by default.
**outputSeparator** | \n  | Optional line for results separation.
**returnIds**       |     | To return goods id line, instead of formatted chunks.
**showUnpublished** |     | To display non-published goods.
**showDeleted**     |     | To display deleted goods.
**showHidden**      | 1   | To display goods, hidden in menu.
**showZeroPrice**   | 1   | To display goods with zero price.
**wrapIfEmpty**     | 1   | Switch on the display of wrapper chunk (tplWrapper) even if there are no results.
**showLog**         |     | To show additional information of snippet operation. For authorized in context "mgr" only.

*Another [pdoTools general parameters][1]* may be used

## Features
msProducts snippet, as all snippets of miniShop2, works using [pdoTools][2].
Because of this all its main parameters coincide with [pdoResources][3], but some peculiarities exist.

### Multicategory support
The MS2 item is physically in single category. However, it may «virtually» exist in several sections.
This is taken into account through msProducts.

[![](https://file.modx.pro/files/7/2/f/72f87345aac1e801f316dd722b52c827s.jpg)](https://file.modx.pro/files/7/2/f/72f87345aac1e801f316dd722b52c827.png)

### Picture deriving
Snippet can select pictures from the item gallery through the **&includeThumbs** parameter. Simply list preview separated by commas:
```
[[!msProducts?
    &parents=`0`
    &includeThumbs=`120x90,360x270`
]]
```
and you will obtain`[[+120x90]]` and `[[+360x270]]` in chunk.


### Link filtering
You may display `&link` parameter and required`&master` or `&slave`,thus selecting linked goods:
```
[[!msProducts?
    &parents=`0`
    &link=`1`
    &master=`15`
]]
```
This call will obtain all goods connected by link 1 with master item 15.

### Work with options 
msProducts automatically switches on and transfers all goods options in kind of `[[+key_options]] placeholder`.

The special parameter **&optionFilters** connects the necessary tables and complements the **&where** parameter, thus permitting to filter goods by their options.
```
[[!msProducts?
    &parents=`0`
    &optionFilters=`{"core_count:>":4}`
]]
```
This call displays all goods with `core_count` option if it exceeds 4.

The parameter **&sortbyOptions** is used for sorting. The required characteristics and their type are indicated in it , separated by commas.
```
&sortbyOptions=`core_count:number`
&sortby=`{"pagetitle":"ASC", "core_count":"DESC"}`
```
Sorting order is indicated as in **&sort** parameter.

## Aliases
msProducts snippet immediately attaches several linked item tables allowing you to receive data from them without unnecessary inquiries.

This is the main class. The rest are listed below:

- **msProduct** - the main class of a sample, descendant of`modResource`.
- **Data** - Class of `msProductData`. The price, vendor code and other item characteristics are here.
- **Vendor** - Class of item manufacturer`msVendor`. Its name, country, logo, etc. are here.

### Placeholders
If you simply do not indicate formatting chunk then all available placeholders may be seen:
```
<pre>
[[!msProducts?
    &parents=`0`
    &tpl=``
]]
</pre>
```

## Examples
Display all goods of 15 category:
```
[[!msProducts?
    &parents=`15`
]]
```

Display with page layout:
```
[[!pdoPage?
    &element=`msProducts`
    &parents=`15`
]]
[[!+page.nav]]
```

Display all goods more expensive than 1000 rubles:
```
[[!pdoPage?
    &element=`msProducts`
    &parents=`0`
    &where=`{"Data.price:>":1000}`
]]
[[!+page.nav]]
```

Display Sony products:
```
[[!pdoPage?
    &element=`msProducts`
    &parents=`0`
    &where=`{"Vendor.name":"Sony"}`
]]
[[!+page.nav]]
```

Sorting by vendor code:
```
[[!pdoPage?
    &element=`msProducts`
    &parents=`0`
    &sortby=`Data.article`
    &sortdir=`asc`
]]
[[!+page.nav]]
```

[1]: /en/01_Components/01_pdoTools/04_General_parameters.md
[2]: /en/01_Components/01_pdoTools/
[3]: /en/01_Components/01_pdoTools/01_Snippets/01_pdoResources.md
