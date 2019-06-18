Snippet to display a list of resources. It is an advanced replacement for getResources: it has all the features but without flaws .

Knows how to properly sort the TV settings , attach a table with the sample , include or exclude categories from different contexts , and much more .

## Properties
### Resource selection properties
These properties determine what resources will appear in the generated list.

Name					| Default									| Description
----------------------------|-----------------------------------------------|------------------------------------------------------------------------------------------
**&parents**				| Current resource								| Comma-separated list of parents, to find results . Set to 0 for unlimited, to +0 for the top level . If a parent id starts with a dash, it and its children are excluded from the query.
**&depth**					| 10											| Search depth of child resources from parent in the Resource Tree.
**&resources**				|  												| Comma-separated list of resources to add to the results. If the id of the resource starts with a hyphen , this resource is excluded from the query.
**&context**				|  												| Limit the resources from the given context.
**&where**					|  												| An array of additional selection parameters encoded JSON.
**&showHidden**				| 1												| Show resources that are hidden in the menu.
**&showUnpublished**		| 0												| Show unpublished resources.
**&showDeleted**			| 0												| Show resources that have been marked as deleted.
**&hideContainers**			| 0												| Exclude container resources, that is, resources with «isfolder = 1».
**&select**					| 0												| A comma-separated list of fields to retrieve. You can specify a JSON string array, for example **{"modResource":"id,pagetitle,content"}**.
**&sortby**					| pagetitle										| Any resource field for sorting, including TVs if the **&includeTVs** property is also set. You can specify a JSON string with an array of multiple fields, for example **{"tvname":"ASC", "pagetitle":"DESC"}**. To randomly sort use «RAND()».
**&sortdir**				| DESC											| Sort direction : Ascending or Descending.
**&limit**					| 10												| Limit the number of results . You can use «0» for no limit.
**&offset**					| 0												| Number of items to skip, from the beginning.
**&first**					| 1												| Number of the first item of the output results.
**&last**					| Automatic, by the formula (total + first - 1)	| Number of the last item of the results.
**&loadModels**				|  												| Comma-separated list of components whose model you need to download for building a query. Example: **&loadModels=\`ms2gallery,msearch2\`**.
**&tvFilters**				|  												| List of filters on TV , delimited AND and OR. Separator specified parameter ** &tvFiltersOrDelimiter ** represents the logical OR condition thereon and conditions grouped primarily. Within each group, you can specify a list of values, separated **&tvFiltersAndDelimiter**. Search values ​​can be performed in any particular TV, if it is provided «myTV == value», or in any «value». Sample call: **&tvFilters=\`filter2==one,filter1==bar%&#124;&#124;filter1==foo\`**. Please note: The filter uses the LIKE operator and the "%" symbol is a metacharacter. This will search for the values for the resources that are located in the site_tmplvar_contentvalues table, not from the default settings of the TV.
**&tvFiltersAndDelimiter**	| ","											| Separator for conditional AND property **&tvFilters**.
**&tvFiltersOrDelimiter**	| "\|\|"										| Separator for conditional OR property **&tvFilters**.

### Template Properties
These properties specify the chunks that contain the templates to format the generated output.

Name			| Description
--------------------|-------------------------------------------------------------------------------
**&returnIds**		| Set to "1" to return a string with a list of resource ids, instead of complete results. All of the templates are ignored.
**&tpl**			| Name chunk for formatting the individual items. If not specified, the contents of the resource fields will be printed to the screen.
**&tplFirst**		| Name of the chunk to format the first item in the results.
**&tplLast**		| Name of the chunk to format the last item in the results.
**&tplOdd**			| Name of the chunk to format every odd-numbered item in the results.
**&tplWrapper**		| Chunk - wrapper, to wrap all results. Accepts one placeholder:`[[+output]]`. It does not work in conjunction with **&toSeparatePlaceholders**.
**&wrapIfEmpty**	| Includes outer chunk wrapper *&tplWrapper** even if there are no results.
**&tplCondition**	| Defines a field of the resource to evaluate against keys defined in the **&conditionalTpls** property.
**&tplOperator**	| Optional operator for comparison of the resource field **&tplCondition** with an array of values and in **&conditionalTpls** chunks.
**&conditionalTpls** |A JSON object defining a map of field values and the associated tpl Chunks to use when the field defined by **&tplCondition** matches the value. The comparison operator is specified in **&tplOperator**. For operators such as *isempty* you can not use an array of keys.
**&outputSeparator** | Optional string to separate the results.

### Result Properties
These properties further define what data to fetch and how to display it.

Name					| Default														| Description
----------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------
**&fastMode**				| 0																	| Quick mode for processing chunks. All raw tags (output modifiers, snippets, etc.) are removed.
**&idx**					|  																	| The starting number of iterations of the output.
**&setTotal**				| 0																| Indicates if the total placeholder should be populated with a count of the results.
**&totalVar**				| total																| Name of the placeholder for storing the total number of results.
**&includeContent**			| 0																	|  Indicates if the «content» field of each resource should be returned in the results.
**&includeTVs**				|  																	|  Comma-separated list of Template Variable values that should be included in the placeholders available to each resource template . Example: «action,time» will produce the placeholders `[[+tv.action]]` and `[[+tv.time]]`.
**&prepareTVs**				| «1», prepares all TVs specified in **&includeTVs**	|  Comma-separated list of media source-dependant TV values to be prepared before output.
**&processTVs**				|  																	| Comma-separated list of TVs that should be processed according to their output options. If set to «1», all TV listed in **&includeTVs** will be processed.
**&tvPrefix**				| tv.															| Prefix TV property.
**&scheme**					| -1																| Type of URL scheme, passed to modX::makeUrl(). [See this][0] for a list of valid options.
**&useWeblinkUrl**			| 0																	| Generate link to the weblink resource, not to the destination URL. **NOTE:** To get this properly working, be sure to use `[[+link]]` instead of `[[~[[+id]]]]` eg. `<a href="[[+link]]">[[+pagetitle]]</a>`.
**&toPlaceholder**			|  																	| Save output to a placeholder with this name instead of displaying the output to the screen.
**&toSeparatePlaceholders**	|  																	| Each item will be displayed in a placeholder with a name starting with this value and ending with the sequential number starting from zero. For example, by specifying the property value «myPl», you'll get placeholders `[[+myPl0]]`, `[[+myPl1]]` & etc.
**&showLog**				| 0																	| Show additional debugging information on the processing of the snippet only to logged-in Manager users.

## Examples
A simple list of the children of resource #1:

```
[[pdoResources?
	&parents=`1`
	&depth=`0`
	&tpl=`ListRowTpl`
]]
```

To add a TV named  «image», then the call will be as follows:

```
[[pdoResources?
	&parents=`1`
	&depth=`0`
	&tpl=`ListRowTpl`
	&includeTVs=`image`
]]
```

The chunk **ListRowTpl** will now allow the placeholder `[[+tv.image]]`.

[0]: http://rtfm.modx.com/revolution/2.x/developing-in-modx/other-development-resources/class-reference/modx/modx.makeurl
