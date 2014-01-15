Snippet for the listing of site users, based on the pdoTools library.
 
Users can select specific groups and roles to display or omit. By and large there are no other add-ons with comparable functionality.

## Options
* __&tpl__ - Name of the chunk tpl for formatting the output. If not specified, the content of the user fields will be printed to the screen.
* __&returnIds__ - Returns a string with a list of user ids instead of formatted results.
* __&showLog__ - Show more information about running the snippet. Only displayed for logged-in users with the "mgr" context authorization.
* __&fastMode__ - Quick mode for processing chunks. All MODX tags (output modifiers, snippets, etc.) are removed.
* __&sortby__ - Any resource field for sorting, including TVs if the includeTVs option  is specified. JSON string can be specified with an array of several fields. To randomly select sorting use "RAND ()"
* __&sortdir__ - Sort Direction: Ascending or Descending.
* __&limit__ - Limit the number of returned results. Can be used to "0".
* __&offset__ - Skipping results from the beginning.
* __&outputSeparator__ - Optional string to separate the results.
* __&toPlaceholder__ - If not empty, the snippet will save all data placeholder with the same name, not the screen instead of displaying.
* __&groups__ - List of user groups, separated by commas. You can use the names and id. If the value begins with dash it means users belonging to this group will be skipped.
* __&roles__ - List of user roles, separated by commas. You can use the names and id. If the value begins with a dash, then users with this role will be skipped.
* __&users__ - List for output, separated by commas. You can use usernames and id. If the value begins with a dash, that user will be excluded from the results.
* __&where__ - Array of additional selection parameters encoded in JSON format.
* __&showInactive__ - pdotools_prop_showInactive
* __&showBlocked__ - pdotools_prop_showBlocked
* __&idx__ - You can specify the starting iteration number of the output.
* __&first__ - the first iteration number of output.
* __&last__ - number of the last iteration of the results. By default, it will be calculated automatically by the formula (total + first__ - 1).
* __&tplFirst__ - Name chunk tpl for the first item in the results.
* __&tplLast__ - Name for the chunk tpl of the last item in the results.
* __&tplOdd__ - Name for the chunk tpl of every odd-numbered item.
* __&tplWrapper__ - Chunk tpl for wrapping all results. Accepts one placeholder: [[+output]]. Does not work in conjunction with the "toSeparatePlaceholders" property.
* __&wrapIfEmpty__ - Includes output chunk wrapper (tplWrapper) even if there are no results.
* __&totalVar__ - Name of placeholder to store the total number of results.
* __&tplCondition__ - Field resource from which the value is obtained for selecting chunk by condition "conditionalTpls".
* __&tplOperator__ - Optional operator for comparison of user field in "tplCondition" with an array of chunks and in "conditionalTpls".
* __&conditionalTpls__ - JSON string array in which the key is something with which to be compared "tplCondition", and values are chunk tpls that will be used for output if the comparison is successful. Comparison operator specified in "tplOperator". For operators of type "isempty" you can use an array without keys.
* __&select__ - List of fields to retrieve, separated by commas. You can specify a JSON string array, eg {"modUser": "id, username, email"}.
* __&toSeparatePlaceholders__ - If you specify a prefix in this parameter, all of the results will be displayed with different placeholders starting with the prefix and the ending line number from zero. For example, specifying a "myPl", you get placeholders [[+myPl0]], [[+myPl1]], etc.

## Examples
Used without parameters, the snippet lists all users:
```
[[!pdoUsers]]
```

Members of usergroup Authors:
```
[[!pdoUsers?
	&groups=`Authors`
	&tpl=`tpl.Authors.author`
	&sortdir=`asc`
]]
```

You can combine it with pdoPage\getPage:
```
[[!pdoPage?
	&element=`pdoUsers`
	&groups=`Authors`
	&tpl=`tpl.Authors.author`
	&sortdir=`asc`
]]
```

Inline tpl:
```
[[!pdoUsers?
	 &roles=`Member`
	 &tpl=`@INLINE <p>Name - [[+fullname]], ID - [[+id]]</p>`
	 &sortby=`id`
	 &sortdir=`asc`
]]
```

## Demo
[Authors and friends](http://store.simpledream.ru/friends.html) of the Simple Dream repository.