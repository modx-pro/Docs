Snippet for the resource gallery output. 

## Parameters
Parameter            | By default  | Description
--------------------|---------------|---------------------------------------------
**parents**         |               | List of categories for the search of results, with commas. By default the selection is limited by the current parent. If you put 0 there, the selection will not be limited.
**resources**       |               | List of resources for output in the results. If a good's id starts with a minus, it will not be shown in the selection.
**showLog**         |               | Show extra information about the work of the snippet. Obly for authorized users in "mgr" context.
**toPlaceholder**   |               | If it is not empty, the snippet will save all data into a placeholder with this name instead of putting them to the screen.
**tpl**             | tpl.ms2Gallery| Chunk for the whole gallery using [Fenom][1].
**limit**           |               | Limiting the selection of results
**offset**          |               | Omission of results from the beginning of the selection 
**where**           |               | A line coded in JSON, with extra searching conditions. For filtration by files you should use the "File" table's pseudonym. For example, &where=`{"File.name:LIKE":"%img%"}`.
**filetype**        |               | Type of files for selection. You can use "image" for indicating pictures and extending all other files. For example: "image,pdf,xls,doc".
**showInactive**    |               | Show inactive files. 
**sortby**          | rank          | Sorting the selection. 
**sortdir**         | ASC           | The direction of sorting. 
**frontend_css**    | [[+cssUrl]]web/default.css | If you want to use your own styles, show the direction to them here, or clean up the parameter and download them yourself through the site's template.
**frontend_js**     | [[+jsUrl]]web/default.js   | If you want to use your own scripts, show the direction to them here, or clean up the parameter and download them yourself through the site's template.
**tags**            |               | List of tags for files output, with commas. 
**tagsVar**         |               | If this parameter is not empty, the snippet will take "tags" value in $_REQUEST["indicatedname"]. For example, if you indicate "tag" here, the snippet will show only those files that suit in `$_REQUEST["tag"]`.
**getTags**         |               | Make additional requests so as to get a line with the file's tags? 
**tagsSeparator**   | ,             | If you switched on getting files' tags in the output, they will be divided through the line that you indicate in this parameter.

### Chunks
Before the version 2.0 there were 4 chunks in ms2Gallery: 
**tplRow** - chunk for one element of the selection (tpl.ms2Gallery.row).
**tplOuter** - the outer part of the output of the results of the snippet's work (tpl.ms2Gallery.outer).
**tplEmpty** - chunk that is shown if there are no results (tpl.ms2Gallery.empty).
**tplSingle** - chunk that is ised if there is only one file in the results. 

Now it is the one and only **tpl**, which gets the $files array and has to sort it out by itself: 
```
{if count($files) > 1}
    <!-- there are many files - we sort them out in cycle-->
    {foreach $files as $file}
        <a href="{$file.url}"><img src="{$file.small}"></a>
    {/foreach}
{elseif count($files) == 1}
    <!--there is only one picture, we print the whole data array-->
    {$file | print}
{else}
    There are no files, we shown this caption.
{/if}
```
All [previews generated for files][2] are turned on automatically under their pseudonyms. 

If you do not want to switch to the new format, just indicate your old chunks and an empty **&tpl**:
```
[[!ms2Gallery?
    &tplRow=`tpl.ms2Gallery.row`
    &tplOuter=`tpl.ms2Gallery.outer`
    &tplEmpty=`tpl.ms2Gallery.empty`
    &tplSingle=`tpl.ms2Gallery.single`
    &tpl=``
]]
```
Although it is definitely better to rewrite them to Fenom. You will work more comfortably and change them faster.

### Scripts and styles
Scripts and styles that you add are indicated by parameters **frontend_css** and **frontend_js**. 
By default they have a simple interface, and the basic picture can be changed by a click (for old chunks, before the 2.0 version).

For a new chunk of the 2.0 version there is also [Fotorama][3] if the picture container has `class="fotorama"`.
You can [set it according to the documentation][4] through `data-` attributes.

If you do not going to need scripts and styles, you can just leave these parameters empty:
```
[[!ms2Gallery?
    &frontend_css=``
    &frontend_js=``
]]
```

## Examples
Output of the gallery of the current resource's files
```
[[!ms2Gallery]]
```


Output of pictures from different resources in one gallery
```
[[!ms2Gallery?
    &parents=`0`
    &resources=`5,16,7`
]]
```


[1]: /ru/01_Компоненты/01_pdoTools/03_Парсер.md
[2]: /ru/01_Компоненты/18_ms2Gallery/02_Генерация_превью.md
[3]: http://fotorama.io/
[4]: http://fotorama.io/customize/
