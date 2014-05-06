Snippet generation menu. Can replace Wayfinder, and allows more flexibility to specify properties.

For example, can build menus from several parents, showing them both together and as separate branches.

A substantial increase in speed, although only on first page view if the Wayfinder menu is cached. 

Options
-------

* __&showLog__ - Show more information about running the snippet. Only visible to users with permission for context "mgr".
* __&checkPermissions__ - Specify whether permissions should be checked in the processing of the resources. Comma-separated list of permissions to check for, ex. load,list,view.
* __&fastMode__ - Quick mode processing chunks. All raw tags (output modifiers, snippets, etc.) are removed.
* __&level__ - Depth of generated menu.
* __&parents__ - List parents, separated by commas, to search for results. By default, the result is limited to the current parent. If set to 0 - unlimited. If the parent id starts with a hyphen, it and its children are excluded from the result.
* __&displayStart__ - Enable display of the parent. Useful when you specify more than one "parents".
* __&resources__ - resource list, separated by commas, to be displayed in the results. If the resource id starts with a hyphen, this resource is excluded from the result.
* __&templates__ - Templates list, separated by commas, to filter results. If the  template ID begins with a hyphen, resources associated with it are excluded from the result.
* __&context__ - limit the result to resources in this context.
* __&cache__ - Caching performance snippet.
* __&cacheTime__ - expiration time of the cache, in seconds.
* __&phPrefix__ - Prefix for placeholders, default is empty.
* __&showHidden__ - Show resources hidden in the menu.
* __&showUnpublished__ - Show unpublished resources.
* __&showDeleted__ - Show deleted resources.
* __&previewUnpublished__ - Enable display of unpublished documents, if the user has permission to do so.
* __&hideSubMenus__ - Hide inactive submenu branches .
* __&useWeblinkUrl__ - Generate URL based on the resource class.
* __&sortdir__ - Sort Direction: Ascending or Descending.
* __&sortby__ - Any resource field for sorting, including TV option if it is specified in the parameter "includeTVs". JSON string can be specified with an array of several fields. To randomly select sorting use "RAND ()"
* __&limit__ - Limit the number of results. Can be set to "0" for no limit.
* __&offset__ - Skipping results from the beginning.
* __&rowIdPrefix__ - Prefix id = "" to be placed in the chunk identifier.
* __&firstClass__ - Class for the first menu item.
* __&lastClass__ - Class last menu item.
* __&hereClass__ - Class for active menu item and its parents.
* __&parentClass__ - Class for items with children.
* __&rowClass__ - Class for single menu row.
* __&outerClass__ - Class wrapper menu.
* __&innerClass__ - Class internal links menu.
* __&levelClass__ - Class-level menu. For example, if you select "level", will be "level1", "level2" etc.
* __&selfClass__ - Class of the current document in the menu.
* __&webLinkClass__ - Class for weblink resources.
* __&tplOuter__ - Chunk wrap the whole block menu.
* __&tpl__ - Name chunk for processing resource. If not specified, the content of the resource fields will be printed to the screen.
* __&tplParentRow__ - Chunk design container with children.
* __&tplParentRowHere__ - Chunk for current parent item.
* __&tplHere__ - Chunk for current resource
* __&tplInner__ - Chunk wrapper internal menu items. If empty - will use "tplInner".
* __&tplInnerRow__ - Chunk for submenu rows.
* __&tplInnerHere__ - Chunk for submenu current item.
* __&tplParentRowActive__ - Chunk design active category.
* __&tplCategoryFolder__ - Special chunk design category. Category__ - this document isfolder = 1 and zero or template or attribute "rel = category".
* __&tplStart__ - Chunk for the parent resource, provided that "displayStart" is also used.
* __&hereId__ - Id document generated for the current menu item. Must be specified only when the script itself it incorrectly identifies, for example when the menu screen is another chunk of the snippet.
* __&where__ - Array of additional selection properties encoded in JSON.
* __&select__ - List of fields to retrieve, separated by commas. You can specify a JSON string array, eg {"modResource": "id, pagetitle, content"}.
* __&scheme__ - Scheme of generated url, passed to modX :: makeUrl ().
* __&toPlaceholder__ - If not empty, the snippet will save all data to a placeholder with the same name, instead of displaying the generated menu. 

Examples
--------

A simple top-level menu:

    [[PdoMenu?
        &parents = `0`
        &level = `1`
    ]]


Output with the exception of certain parents:

    [[PdoMenu?
        &parents = `-10, -15`
        &level = `2`
    ]]


Menu generated from two parents, showing the parents:

    [[PdoMenu?
        &parents = `10,15`
        &displayStart = `1`
    ]]
