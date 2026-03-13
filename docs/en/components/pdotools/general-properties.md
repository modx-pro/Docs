# General parameters

Common parameters for snippets based on pdoTools/pdoFetch. They are shared by pdoResources, pdoPage, pdoMenu, pdoCrumbs and other pdoTools snippets. The tables below group parameters by purpose: resource selection, template (chunk) choice, and output format.

## Resource selection parameters

These parameters define which objects are selected.

| Name | Default | Description |
| --- | --- | --- |
| **&class** | `modResource` | Class of the objects to fetch |
| **&parents** | Current resource | Comma-separated parent IDs for the query. Use 0 for no limit. Prefix with minus to exclude that parent and its children |
| **&depth** | `10` | Depth of child resources from parent |
| **&resources** | | Comma-separated resource IDs to output. Prefix with minus to exclude a resource |
| **&templates** | | Comma-separated template IDs to filter by. Prefix with minus to exclude resources with that template |
| **&context** | | Limit selection by resource context |
| **&where** | | JSON-encoded array of extra query conditions |
| **&showHidden** | `0` | Include resources hidden from menu |
| **&showUnpublished** | `0` | Include unpublished resources |
| **&showDeleted** | `0` | Include deleted resources |
| **&hideContainers** | `0` | Do not output containers (resources with isfolder = 1) |
| **&hideUnsearchable** | | Exclude resources hidden from search |
| **&select** | | Comma-separated list of fields to select, or JSON e.g. `{"modResource":"id,pagetitle,content"}` |
| **&leftJoin**, **&rightJoin**, **&innerJoin** | | Analog of SQL left/right/inner join |
| **&joinSequence** | `innerJoin,leftJoin,rightJoin` | Order of joining tables, comma-separated |
| **&sortby** | `pagetitle` | Any resource field to sort by, including TV if in **&includeTVs**. JSON for multiple fields. Use `RAND()` for random order |
| **&sortdir** | `ASC` | Sort direction: ascending or descending |
| **&groupby** | | Field to group results by |
| **&having** | | Condition to filter grouped rows (used with **&groupby**) |
| **&limit** | `0` | Maximum number of results. Can be 0 |
| **&offset** | `0` | Number of results to skip from the start |
| **&first** | `1` | Index of first output iteration |
| **&last** | Auto: total + first - 1 | Index of last output iteration |
| **&loadModels** | | Comma-separated list of components whose models to load for the query, e.g. `ms2gallery,msearch2` |
| **&tvFilters** | | TV filters with AND and OR. OR delimiter is in **&tvFiltersOrDelimiter**; conditions are grouped by OR first. Use **&tvFiltersAndDelimiter** within a group. Example: `filter2==one,filter1==bar%||filter1==foo`. Uses LIKE; % is wildcard. Search is on values stored in DB, not TV default values |
| **&tvFiltersAndDelimiter** | `,` | Delimiter for AND conditions in **&tvFilters** |
| **&tvFiltersOrDelimiter** | `||` | Delimiter for OR conditions in **&tvFilters** |
| **&sortbyTV** | | Extra field to sort by; can also be set in **&sortby** |
| **&sortdirTV** | | Sort direction for the field in **&sortbyTV**; can be in **&sortby** |
| **&sortbyTVType** | | Type for TV sort: **string**, **integer**, **decimal**, **datetime**. If empty, TV is sorted by its type |
| **&checkPermissions** | | Which permissions to check for the user when outputting objects |
| **&disableConditions** | | Disable conditions specific to modResource |
| **&fenomModifiers** | | Comma-separated list of modifier snippets to register in Fenom. See [section][1] |

## Template parameters

These set the chunks (templates) used to generate output.

| Name | Description |
| --- | --- |
| **&tpl** | Chunk name for a resource row. If not set, resource fields are printed as-is |
| **&tplFirst** | Chunk for the first resource in the result |
| **&tplLast** | Chunk for the last resource |
| **&tplOdd** | Chunk for every even-position resource (name "odd" but applies to even) |
| **&tpl_N** | Chunk for the N-th resource, e.g. `&tpl_4=`tpl4th` for the 4th |
| **&tpl_nN** | Chunk for every N-th resource, e.g. `&tpl_n4=`tplEvery4th` for every 4th |
| **&tplCondition** | Resource field whose value is used to choose chunk via **&conditionalTpls** |
| **&tplOperator** | Optional operator for comparing **&tplCondition** with values in **&conditionalTpls** |
| **&conditionalTpls** | JSON object: keys = values to compare with **&tplCondition**, values = chunk names. For operators like *isempty* use an array without keys |
| **&outputSeparator** | Optional string to separate results |

## Output parameters

These control what data is output and how.

| Name | Default | Description |
| --- | --- | --- |
| **&return** | `chunks` | Output mode. See below |
| **&fastMode** | `0` | Fast chunk processing: all unprocessed tags (conditions, snippets, etc.) are stripped |
| **&nestedChunkPrefix** | `pdotools_` | Prefix for "fast placeholders" when using **&fastMode** |
| **&idx** | | Starting index for output iteration |
| **&totalVar** | `total` | Placeholder name for total result count |
| **&includeContent** | `0` | Include **content** field in selection |
| **&includeTVs** | | Comma-separated list of TV names to select, e.g. `action,time` gives placeholders `[[+action]]`, `[[+time]]` |
| **&includeTVList** | | Alias of **&includeTVs** |
| **&prepareTVs** | `1` | TVs (with media sources) to prepare with full paths. `1` = all from **&includeTVs** |
| **&processTVs** | | TVs to process and output per manager settings. `1` = all from **&includeTVs**. Slows output |
| **&tvPrefix** | `tv.` in pdoResources, empty in others | Prefix for TV placeholders |
| **&prepareSnippet** | `1` | Snippet that receives data before output to chunk and can change or add to it |
| **&decodeJSON** | | Parse JSON fields instead of outputting as string |
| **&scheme** | `-1` | URL scheme for `modX::makeUrl()`; see [docs][0]. Special value `uri` uses resource uri without calling the function |
| **&useWeblinkUrl** | | Generate URL according to resource class |
| **&toSeparatePlaceholders** | | If set, all results are put in separate placeholders named by this value + row index from 0, e.g. `myPl` → `[[+myPl0]]`, `[[+myPl1]]` |
| **&additionalPlaceholders** | | Set extra placeholders |
| **&cache_key** | resource or default | Cache key |
| **&cache_handler** | xPDOFileCache or setting | Cache handler |
| **&cacheTime** | 0 or setting | Cache TTL in seconds |

## Chunk call types

Chunks can use one of these prefixes:

**@INLINE** or **@CODE**. The template is the code after this prefix.

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@INLINE <li>[[+pagetitle]]</li>`
]]
```

In INLINE chunks you must not use snippets, other chunks or output filters in the usual MODX tags, because the parser processes them **first** and the snippet would get the wrong content.

::: v-pre
So for INLINE chunks use `{{+}}` instead of `[[+]]` — MODX leaves these as-is and pdoTools converts them. You can still use MODX tags when you need already-processed content in the chunk, for example:
:::

```modx
[[!pdoResources?
  &parents=`0`
  &tplFirst=`@INLINE Current page: [[*pagetitle]]`
  &tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]<p>`
]]
```

**@FILE**. Use file contents instead of a chunk from the database. Path is from system setting **pdotools_elements_path**. File extension must be `.tpl` or `.html`.

```modx
[[!pdoResources?
  &tpl=`@FILE fileBasedRow.tpl`
]]
```

**@TEMPLATE**. Template id or name. If empty, each resource uses its own template.

```modx
[[!pdoResources?
  &tpl=`@TEMPLATE 10`
]]
```

**@CHUNK**. Same as specifying a chunk name; kept for compatibility with third-party snippets.

```modx
[[!pdoResources?
  &tpl=`@CHUNK tpl.Resource.row`
]]

[[!pdoResources?
  &tpl=`tpl.Resource.row`
]]
```

More in the [pdoParser section][1].

## Return values

pdoTools can return data in different forms via **&return**. Mainly used by snippets internally, but you can set **&return** in **pdoResources**:

```modx
[[!pdoResources?
  &parents=`0`
  &return=`json`
]]
```

- **chunks** — formatted chunks (default).
- **sql** — prepared raw SQL, useful for debugging. Query is not executed, only printed.
- **data** — array of data. Due to MODX snippet behavior, use only when calling `pdoFetch::run()` from your own snippet; otherwise you get the string "Array".
- **ids** — comma-separated document ids. Useful as input for other snippets. **&returnIds** uses this.
- **json** — JSON string of the data array.
- **serialize** — serialized string. Can sometimes cause memory issues; prefer **json**.

::: warning
All **&return** values are supported only by **pdoResources** (pdoPage with pdoResources) and **pdoUsers**.

**pdoMenu** and **pdoCrumbs** support **chunks** and **data**.

Other snippets mostly support only **chunks**.
:::

[0]: https://docs.modx.com/current/en/extending-modx/modx-class/reference/modx.makeurl
[1]: /en/components/pdotools/parser
