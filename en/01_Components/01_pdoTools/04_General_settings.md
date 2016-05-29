General parameters for snippets based on pdoTools / pdoFetch.

### Sample resource parameters
These parameters define the derived objects.

Name | Description | On default
---|---|---
**&class** | Class of a derived object | modResource
**&parents** | List of parents to search the result, separated by commas. If you put 0, the sample is not limited. If parent id begins with a hyphen, it and its children are eliminated from the sample. If you have to limit the sample by **&depth** parameter in resource root, you should use **&parents=`+0`** | Current resource
**&depth** | Search depth of child resources from its parent | 10
**&resources** | List of resources to search the results, separated by commas. If resource id begins with a hyphen, this resource is eliminated from the sample. |
**&templates** | List of templates to filter the results, separated by commas. If template id begins with a hyphen, resources with it are eliminated from the sample. |
**&context** | Sample limitation by the resource context |
**&where** | Extra parameter array of the sample coded in JSON |
**&showHidden** | Show resources hidden in menu | 0
**&showUnpublished** | Show unpublished resources | 0
**&showDeleted** | Show deleted resources | 0
**&hideContainers** | Exclude container resources, that is, resources with «isfolder = 1». | 0
**&hideUnsearchable** | Exclude the resources hidden from the search |
**&select** | List of fields for sample, separated by commas. JSON can be indicated with the array, e.g. **{"modResource":"id,pagetitle,content"}**. |
**&leftJoin** | Analog SQL of left join |
**&rightJoin** | Analog SQL of right join |
**&innerJoin** | Analog SQL of inner join |
**&sortby** | Any resource field for sorting, it includes TV parameter, if it is indicated in **&includeTVs** parameter. JSON line can be indicated with array for several fields. Indicate «**RAND()**» for random sorting | pagetitle
**&sortdir** | Sorting direction: descending or ascending | ASC
**&groupby** | Indicate the field by which results are grouped |
**&having** | It is used to limit the sample of grouping lines by condition for the whole group, specified in **&groupby** |
**&limit** | Limitation of sample results. «0» can be used | 0
**&offset** | Result skip from the beginning | 0
**&first** | Number of the first iteration in output results | 1
**&last** | Number of the last iteration in output results | Automatic formula evaluation (total + first — 1)
**&loadModels** | List of components, which models should be downloaded for query building, they should be separated by commas, e.g. **&loadModels=`ms2gallery,msearch2`**. |
**&tvFilters** | List of TV filters with delimiter AND and OR. Delimiter, indicated in **&tvFiltersOrDelimiter** is a logic condition OR and its conditions are grouped in the first place. You can define the list of values in each group, separated by **&tvFiltersAndDelimiter**. Search of values can be held in any specific TV, if it is («**myTV==value**») or any («**value**»). E.g. **&tvFilters=\`filter2==one,filter1==bar%&#124;&#124;filter1==foo\`**. Pay attention: filtration uses LIKE and “%” is metacharacter. Search is on values that physically located in the database, i.e. values from TV settings don’t get here on default |
**&tvFiltersAndDelimiter** | Delimiter for conditions AND in **&tvFilters**. | ","
**&tvFiltersOrDelimiter** | Delimiter for conditions OR in **&tvFilters**. | "||"
**&sortbyTV** | Additional field by which all the results should be sorted. It can be indicated directly in **&sortby** |
**&sortdirTV** | Sorting direction on extra fiend indicated in &sortby. It can be indicated directly in **&sortby** |
**&checkPermissions** | Indicate which permissions should be checked at the output of objects |
**&disableConditions** | It disables specific class modResource sample parameters |

### Template parameters
These parameters set up chunks which contain templates for output generation, i.e. they  are changed with the overview.

Name | Description
---|---
**&tpl** | Chunk name for resource registration. If it not indicated, ‘field content of the source will be printed to the screen |
**&tplFirst** | Chunk name for the first resource in the results |
**&tplLast** | Chunk name for the last resource in the results |
**&tplOdd** | Chunk name for every second resource |
**&tpl_N** | Chunk name for N-resource, e.g. **&tpl_4=`tpl4th`** will set up template for 4th resource |
**&tpl_nN** | Chunk name for N-resource, e.g. **&tpl_n4=`tplEvery4th`** will be applied for every 4th resource |
**&tplCondition** | Resource field from which the value for selecting chunk will be obtained by the condition in **&conditionalTpls**. |
**&tplOperator** | Optional operator for comparison of resource field in **&tplCondition** with array of values and chunks in **&conditionalTpls**. |
**&conditionalTpls** | JSON line with array which in keys has something which **&tplCondition** will be compared with, and values – chunks which will be used to output if the comparison is successful. Comparison operator is indicated in **&tplOperator**. Arrays without keys can be used for «**isempty**» operators |
**&outputSeparator** | Optional line for separation of the results |


### Results parameters
These parameters define additionally what data and in what way it will be output.

Name | Description | On default
---|---|---
**&return** | It defines the way of result output. Chunks – gauging, data – output value fields, sql – output of SQL-demand, ids – symbols separated by commas | chunks
**&fastMode** | Fast more of chunk processing. All raw tags (conditions, snippets and so on) will be cut. | 0
**&nestedChunkPrefix** | Prefix for “fast placeholders”, included by **&fastMode** parameter | pdotools_
**&idx** | You can indicate the initial number of iteration for result output |
**&totalVar** | Name of placeholders for saving the total number of results | total
**&includeContent** | Include the field «*content*» to the output | 0
**&includeTVs** | List of TV parameters for the output, separated by commas. E.g.: «**action,time**» will yield placeholders `[[+action]]` and `[[+time]]`. |
**&includeTVList** | Alias **&includeTVs** |
**&prepareTVs** | List of TV parameters that need to be processed before the output | «1» means preparation for all TV included in **&includeTVs**
**&processTVs** | List of TV parameters that need to be processed before the output. If it is set in «1», all TV mentioned in «**&includeTVs**» will be processed |
**&tvPrefix** | Prefix for TV parameters | tv.
**&prepareSnippet** | Indicate the snippet that accepts data before the output in chunk and can vary or add them | 1
**&decodeJSON** | Dissemble fields like JSON instead of outputting in line |
**&scheme** | Scheme of forming url is passed to modX::makeUrl() | -1 (concerning site_url)
**&useWeblinkUrl** | Ensure the link subject to resource class |
**&toSeparatePlaceholders** | If you indicate a word in this parameter, ALL the results will be specified in different placeholders that begin with this word and end with the serial number of the line from zero. E.g. indicating «myPl», you get placeholders `[[+myPl0]]`, `[[+myPl1]]` and so on |
**&additionalPlaceholders** | Install additional placeholders |
**&cache_key** | Cache key | Value of system setting *cache_resource_key* for resources (on default resource) or default
**&cache_handler** | Cache handler | Value of system setting *cache_resource_handler* or xPDOFileCache
**&cache Time** | Cache time | Value of system setting *cache_resource_expires* or 0 (eternal)

### Fenom Parser parameters
These parameters define settings for the fenom parser.

Name | Description | On default
---|---|---
**&fenomModifiers** | Comma separated list of snippets that could be used as [fenom modifier](https://github.com/fenom-template/fenom/blob/master/docs/en/syntax.md#modifiers) |

### How to call chunks
All chunks can have one of these prefixes:

* **@INLINE** or **@CODE**. Code after this prefix will be used as template.
```
[[!pdoResources?
	&tpl=`@INLINE <li>[[+pagetitle]]</li>`
]]
```
*Snippets, other chunks and output filters cannot be indicated in INLINE chunks, because parser MODX handle them in the first place, and snippet will not get what you wanted.*

* **@FILE**. File content Is used instead of chunk from the database. Track to the file is indicated by system setting **pdotools_elements_path**.
Name of the file have extension `.tpl` or `.html`.
```
[[!pdoResources?
	&tpl=`@FILE fileBasedRow.tpl`
]]
```

* **@TEMPLATE**. Identifier or name of template is indicated. If it is empty – its own template will be used for every resource.
```
[[!pdoResources?
	&tpl=`@TEMPLATE 10`
]]
```

* **@CHUNK**. Similarly to the indication of chunk names.
```
[[!pdoResources?
	&tpl=`@CHUNK tpl.Resource.row`
]]
[[!pdoResources?
	&tpl=`tpl.Resource.row`
]]
```
