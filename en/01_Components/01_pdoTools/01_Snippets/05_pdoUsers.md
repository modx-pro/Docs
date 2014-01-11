Snippet for the listing of site users, based on the pdoTools library.
 
Users can select specific groups and roles to display or omit. By and large there are no other add-ons with comparable functionality.

## Options ##

* __&Tpl__ - Name of the chunk tpl for formatting the output. If not specified, the content of the user fields will be printed to the screen.
* __&ReturnIds__ - Returns a string with a list of user ids instead of formatted results.
* __&ShowLog__ - Show more information about running the snippet. Only displayed for logged-in users with the "mgr" context authorization.
* __&FastMode__ - Quick mode for processing chunks. All MODX tags (output modifiers, snippets, etc.) are removed.
* __&Sortby__ - Any resource field for sorting, including TVs if the includeTVs option  is specified. JSON string can be specified with an array of several fields. To randomly select sorting use "RAND ()"
* __&Sortdir__ - Sort Direction: Ascending or Descending.
* __&Limit__ - Limit the number of returned results. Can be used to "0".
* __&Offset__ - Skipping results from the beginning.
* __&OutputSeparator__ - Optional string to separate the results.
* __&ToPlaceholder__ - If not empty, the snippet will save all data placeholder with the same name, not the screen instead of displaying.
* __&Groups__ - List of user groups, separated by commas. You can use the names and id. If the value begins with dash it means users belonging to this group will be skipped.
* __&Roles__ - List of user roles, separated by commas. You can use the names and id. If the value begins with a dash, then users with this role will be skipped.
* __&Users__ - List for output, separated by commas. You can use usernames and id. If the value begins with a dash, that user will be excluded from the results.
* __&Where__ - Array of additional selection parameters encoded in JSON format.
* __&ShowInactive__ - pdotools_prop_showInactive
* __&ShowBlocked__ - pdotools_prop_showBlocked
* __&Idx__ - You can specify the starting iteration number of the output.
* __&First__ - the first iteration number of output.
* __&Last__ - number of the last iteration of the results. By default, it will be calculated automatically by the formula (total + first__ - 1).
* __&TplFirst__ - Name chunk tpl for the first item in the results.
* __&TplLast__ - Name for the chunk tpl of the last item in the results.
* __&TplOdd__ - Name for the chunk tpl of every odd-numbered item.
* __&TplWrapper__ - Chunk tpl for wrapping all results. Accepts one placeholder: [[+output]]. Does not work in conjunction with the "toSeparatePlaceholders" property.
* __&WrapIfEmpty__ - Includes output chunk wrapper (tplWrapper) even if there are no results.
* __&TotalVar__ - Name of placeholder to store the total number of results.
* __&TplCondition__ - Field resource from which the value is obtained for selecting chunk by condition "conditionalTpls".
* __&TplOperator__ - Optional operator for comparison of user field in "tplCondition" with an array of chunks and in "conditionalTpls".
* __&ConditionalTpls__ - JSON string array in which the key is something with which to be compared "tplCondition", and values are chunk tpls that will be used for output if the comparison is successful. Comparison operator specified in "tplOperator". For operators of type "isempty" you can use an array without keys.
* __&Select__ - List of fields to retrieve, separated by commas. You can specify a JSON string array, eg {"modUser": "id, username, email"}.
* __&ToSeparatePlaceholders__ - If you specify a prefix in this parameter, all of the results will be displayed with different placeholders starting with the prefix and the ending line number from zero. For example, specifying a "myPl", you get placeholders [[+myPl0]], [[+myPl1]], etc.

## Examples ##

Used without parameters, the snippet lists all users:

    [[!PdoUsers]] 

Members of usergroup Authors:

    [[!PdoUsers?
        &Groups = `Authors`
        &Tpl = `tpl.Authors.author`
        &Sortdir = `asc`
    ]] 

 You can combine it with getPage:
     
    [[!GetPage?
        &Element = `pdoUsers`
        &Groups = `Authors`
        &Tpl = `tpl.Authors.author`
        &Sortdir = `asc`
    ]]

Inline tpl:

    [[!PdoUsers?
         &Roles = `Member`
         &Tpl = `@ INLINE  Name - [[+fullname]], ID - [[+ id]] </ p>`
         &Sortby = `id`
         &Sortdir = `asc`
    ]]


## Demo ##

[Authors and friends](http://store.simpledream.ru/friends.html) of the Simple Dream repository.

