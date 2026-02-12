# pdoMenu

Menu generation snippet. Can replace Wayfinder and allows more flexible parameter specification.

For example, can build a menu from multiple parents at once, showing them together or as separate branches.

Significant speed gain only on first run, after that Wayfinder is not far behind, thanks to proper caching.

## Parameters

Default pdoMenu accepts [general pdoTools parameters][1] and some of its own:

| Name                | Default         | Description                                                                                                                                                                                                                                                                       |
|-------------------------|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&parents**            | Current resource       | List of parent ids for search, comma-separated. If you set **&parents=`0`** - the search is not limited. If a parent ID starts with a minus, it and its children are excluded from the results.                                                                            |
| **&level**              | `0` (unlimited) | Depth of the menu.                                                                                                                                                                                                                                                    |
| **&resources**          |                      | List of resources to output in results, comma-separated. If resource id starts with minus, resource is excluded from selection.                                                                                                                                              |
| **&templates**          |                      | List of template ids to filter results, comma-separated. If template id starts with minus, resources with it are excluded from selection.                                                                                                                                          |
| **&where**              |                      | JSON-encoded array of extra conditions.                                                                                                                                                                                                               |
| **&displayStart**       | `0`                  | Include top-level menu nodes. Useful when specifying more than one «parents».                                                                                                                                                                                              |
| **&context**            |                      | Limit results by resource context.                                                                                                                                                                                                                                     |
| **&showHidden**         | `0`                  | Show resources hidden in menu.                                                                                                                                                                                                                                            |
| **&showUnpublished**    | `0`                  | Show unpublished resources.                                                                                                                                                                                                                                           |
| **&previewUnpublished** | `0`                  | Enable preview of unpublished resources, if the user has permission.                                                                                                                                                                                          |
| **&hideSubMenus**       | `0`                  | Hide inactive menu branches.                                                                                                                                                                                                                                                |
| **&select**             |                      | Comma-separated list of fields to select. You can specify JSON array string, e.g. **&select=`{"modResource":"id,pagetitle,content"}`**                                                                                                                                 |
| **&sortby**             | `menuindex`          | Any resource field for sort, including TV, if it is listed in the parameter **&includeTVs**, e.g. **&sortby=`{"tvname":"ASC","pagetitle":"DESC"}`**. You can specify JSON array string. For random sort specify **&sortby=`RAND()`** |
| **&sortdir**            | `ASC`                | Sort direction: descending or ascending. If you leave &sortby and &sortdir empty, sorting follows resource order in **&resources**.                                                                                                     |
| **&limit**              | `0`                  | Max number of results.                                                                                                                                                                                                                                    |
| **&offset**             | `0`                  | Number of results to skip. Must be used together with explicit **&limit**.                                                                                                                                                                                      |
| **&checkPermissions**   |                      | Specify which permissions to check for user when outputting resources, e.g. **&checkPermissions=`list`**.                                                                                                                                                           |
| **&countChildren**      | `0`                  | Exact count of child resources per category and output to placeholder `[[+children]]`. Makes extra database queries, so disabled by default.                                                                                                      |
| **&toPlaceholder**      |                      | If not empty, snippet saves data to placeholder with this name instead of outputting.                                                                                                                                                                                 |
| **&plPrefix**           | `wf.`                | Prefix for pagination placeholders.                                                                                                                                                                                                                                        |
| **&showLog**            | `0`                  | Show extra snippet debug info. Only for users logged in to the "mgr" context.                                                                                                                                                                           |
| **&fastMode**           | `0`                  | Fast chunk processing mode. All unprocessed tags (conditions, snippets, etc.) will be stripped.                                                                                                                                                                             |
| **&cache**              | `0`                  | Snippet result caching.                                                                                                                                                                                                                                       |
| **&cacheTime**          | `3600`               | Cache lifetime in seconds.                                                                                                                                                                                                                                           |
| **&scheme**             | `-1`                 | URL scheme, passed to modX::makeUrl(), see [possible values here](https://docs.modx.com/current/en/extending-modx/modx-class/reference/modx.makeurl). Special type `uri` substitutes the resource uri value without calling the function.            |
| **&useWeblinkUrl**      | `1`                  | Generate URL considering resource class.                                                                                                                                                                                                                                   |
| **&rowIdPrefix**        |                      | Prefix for id="" when setting identifier in chunk.                                                                                                                                                                                                                           |
| **&hereId**             |                      | Id of current resource for the generated menu. Only needed if the script detects it incorrectly, e.g. when outputting menu from chunk of another snippet.                                                                                                                 |
| **&includeTVs**         |                      | List of TV parameters for selection, comma-separated. For example **&includeTVs=`action,time`** yields placeholders `[[+action]]` and `[[+time]]`.                                                                                                                                        |
| **&prepareTVs**         |                      | List of TV names that use media source files, that need full paths generated. If set **&prepareTVs=`1`**, all TVs listed in **&includeTVs** will be prepared.                                                                                 |
| **&processTVs**         |                      | List of TV names to process and output per Manager settings. If set **&processTVs=`1`**, all TVs listed in **&includeTVs** will be processed. Slows execution.                                                                |
| **&tvPrefix**           |                      | Prefix for TV placeholders.                                                                                                                                                                                                                                                     |

### Parameters templates

These parameters set chunks that contain templates for menu generation.

| Name                | Description                                                                                                                                                                                                                     |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&tplOuter**           | Chunk for the whole menu block. Default: `@INLINE <ul [[+classes]]>[[+wrapper]]</ul>`                                                                                                                                 |
| **&tpl**                | Chunk for each menu item. If not set, resource fields will be printed to screen. Default: `@INLINE <li [[+classes]]><a href="[[+link]]" [[+attributes]]>[[+menutitle]]</a>[[+wrapper]]</li>`        |
| **&tplHere**            | Chunk for the current menu item.                                                                                                                                                                                        |
| **&tplStart**           | Chunk for the root item, when is enabled **&displayStart**. Default: `@INLINE <h2 [[+classes]]>[[+menutitle]]</h2>[[+wrapper]]`                                                                       |
| **&tplParentRow**       | Chunk for a parent with children, that does not match `&tplCategoryFolder`. For example: `@INLINE <li class="submenu_wrap [[+classnames]]"><a href="[[+link]]" [[+attributes]]>[[+menutitle]]</a>[[+wrapper]]</li>` |
| **&tplParentRowHere**   | Chunk for the current document when it has children.                                                                                                                                                               |
| **&tplParentRowActive** | Chunk for parents with children in the active menu branch.                                                                                                                                                                 |
| **&tplCategoryFolder**  | Special chunk for category. Category is a parent with children that has empty template or `rel="category"` in `link_attributes` field.                                                             |
| **&tplInner**           | Chunk for the whole submenu block. If empty - will use **&tplOuter**. For example: `@INLINE <ul class="submenu [[+classnames]]">[[+wrapper]]</ul>`                                                         |
| **&tplInnerRow**        | Chunk for submenu item. For example: `@INLINE <li class="submenu_item [[+classnames]]"><a href="[[+link]]" [[+attributes]]>[[+menutitle]]</a>[[+wrapper]]</li>`                                                         |
| **&tplInnerHere**       | Chunk for active submenu item.                                                                                                                                                                                    |

### CSS class parameters

These parameters set placeholder values `[[+classnames]]` and `[[+classes]]` for various menu elements. Placeholder `[[+classnames]]` outputs only the class name without **class=""** attribute, unlike `[[+classes]]`.

| Name          | Description                                                                             |
|-------------------|--------------------------------------------------------------------------------------|
| **&firstClass**   | Class for first menu item. Default: **first**                               |
| **&lastClass**    | Class for last menu item. Default: **last**                                 |
| **&hereClass**    | Class for active menu item. Default: **active**                            |
| **&parentClass**  | Menu category class.                                                                |
| **&rowClass**     | Menu item class.                                                                   |
| **&outerClass**   | Menu block wrapper class.                                                            |
| **&innerClass**   | Submenu block wrapper class.                                                 |
| **&levelClass**   | Menu level class. For example if you specify «level», then you get «level1», «level2», etc. |
| **&selfClass**    | Current resource class in menu.                                                       |
| **&webLinkClass** | Web link resource class.                                                                |

## Examples

Regular menu output from site root in one level:

```modx
[[pdoMenu?
  &parents=`0`
  &level=`1`
]]
```

Output with exclusion of certain parents and user permission check:

```modx
[[pdoMenu?
  &parents=`-10,-15`
  &level=`2`
  &checkPermissions=`load,list,view`
]]
```

Output menu from two parents with root nodes shown:

```modx
[[pdoMenu?
  &parents=`10,15`
  &displayStart=`1`
]]
```

Output two levels of resources with nested count:

```modx
[[pdoMenu?
  &parents=`0`
  &level=`2`
  &tplInner=`@INLINE [[+wrapper]]`
  &tplParentRow=`@INLINE <li [[+classes]]><a href="[[+link]]" [[+attributes]]>[[+menutitle]]</a> ([[+children]])</li>[[+wrapper]]`
  &countChildren=`1`
]]
```

[1]: /en/components/pdotools/general-properties
