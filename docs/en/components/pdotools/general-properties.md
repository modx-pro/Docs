# General parameters

Parameters shared by pdoTools/pdoFetch-based snippets.

## Resource selection parameters

These define which objects are selected.

| Name | Default | Description |
| --- | --- | --- |
| **&class** | `modResource` | Object class |
| **&parents** | Current resource | Comma-separated parent IDs. Use 0 for no limit. Minus prefix excludes parent and children |
| **&depth** | `10` | Depth of child resources |
| **&resources** | | Comma-separated resource IDs. Minus prefix excludes |
| **&templates** | | Comma-separated template IDs for filtering. Minus prefix excludes |
| **&context** | | Limit by resource context |
| **&where** | | JSON array of extra conditions |
| **&showHidden** | `0` | Show menu-hidden resources |
| **&showUnpublished** | `0` | Show unpublished |
| **&showDeleted** | `0` | Show deleted |
| **&hideContainers** | `0` | Exclude containers (isfolder=1) |
| **&hideUnsearchable** | | Exclude search-hidden resources |
| **&select** | | Comma-separated fields or JSON e.g. `{"modResource":"id,pagetitle,content"}` |
| **&leftJoin**, **&rightJoin**, **&innerJoin** | | SQL join analogs |
| **&joinSequence** | `innerJoin,leftJoin,rightJoin` | Join order |
| **&sortby** | `pagetitle` | Sort field; TV if in &includeTVs; JSON for multi; RAND() for random |
| **&sortdir** | `ASC` | Sort direction |
| **&groupby** | | Group by field |
| **&having** | | HAVING clause for grouped rows |
| **&limit** | `0` | Result limit |
| **&offset** | `0` | Skip count |
| **&first** | `1` | First iteration index |
| **&last** | total + first - 1 | Last iteration index |
| **&loadModels** | | Comma-separated component models to load, e.g. ms2gallery,msearch2 |
| **&tvFilters** | | TV filters with AND/OR. OR delimiter in &tvFiltersOrDelimiter. Example: filter2==one,filter1==bar%\|\|filter1==foo. Uses LIKE; % is wildcard. Search in DB values only, not TV defaults |
| **&tvFiltersAndDelimiter** | `,` | AND delimiter |
| **&tvFiltersOrDelimiter** | `\|\|` | OR delimiter |
| **&sortbyTV**, **&sortdirTV**, **&sortbyTVType** | | TV sort; type: string, integer, decimal, datetime |
| **&checkPermissions** | | Permissions to check |
| **&disableConditions** | | Disable modResource-specific conditions |
| **&fenomModifiers** | | Comma-separated modifier snippets for Fenom. See [section][1] |

## Template parameters

Chunks for output layout.

| Name | Description |
| --- | --- |
| **&tpl** | Chunk for resource row |
| **&tplFirst** | Chunk for first row |
| **&tplLast** | Chunk for last row |
| **&tplOdd** | Chunk for even rows (odd = uneven; applies to even) |
| **&tpl_N** | Chunk for Nth row, e.g. tpl_4 |
| **&tpl_nN** | Chunk for every Nth row, e.g. tpl_n4 |
| **&tplCondition** | Field for conditional chunk selection |
| **&tplOperator** | Comparison operator |
| **&conditionalTpls** | JSON: keys = compare values, values = chunk names |
| **&outputSeparator** | Separator between results |

## Output parameters

| Name | Default | Description |
| --- | --- | --- |
| **&return** | `chunks` | Output mode (see below) |
| **&fastMode** | `0` | Strip unprocessed tags |
| **&nestedChunkPrefix** | `pdotools_` | Prefix for fast placeholders |
| **&idx** | | Start iteration index |
| **&totalVar** | `total` | Placeholder for total count |
| **&includeContent** | `0` | Include content field |
| **&includeTVs** | | Comma-separated TVs |
| **&prepareTVs** | `1` | Prepare TV paths; 1 = all from &includeTVs |
| **&processTVs** | | Process TVs per manager settings; 1 = all; slows |
| **&tvPrefix** | `tv.` in pdoResources | TV prefix |
| **&prepareSnippet** | `1` | Snippet to process data before chunk |
| **&decodeJSON** | | Decode JSON fields |
| **&scheme** | `-1` | URL scheme; see [modX::makeUrl][0]; `uri` = raw uri |
| **&useWeblinkUrl** | | Generate URL by resource class |
| **&toSeparatePlaceholders** | | Output each result to placeholder myPl0, myPl1... |
| **&additionalPlaceholders** | | Extra placeholders |
| **&cache_key**, **&cache_handler**, **&cacheTime** | | Cache options |

## Chunk call types

- **@INLINE** or **@CODE** - template is the string after prefix. MODX parses `[[+]]` before snippet; use <span v-pre>{{+}}</span> so pdoTools handles it.
- **@FILE** - load from file. Path in **pdotools_elements_path**. Extensions .tpl, .html.
- **@TEMPLATE** - use template by id or name. Empty = resource's own template.
- **@CHUNK** - chunk from DB; same as plain name.

See [parser section][1].

## Return values

**&return** options: **chunks** (default), **sql** (raw SQL for debug), **data** (array; use pdoFetch::run() directly), **ids** (comma IDs), **json**, **serialize**.

::: warning
Only **pdoResources** (and pdoPage) and **pdoUsers** support all &return values. **pdoMenu** and **pdoCrumbs** support chunks and data. Others mainly chunks.
:::

[0]: https://docs.modx.com/current/en/extending-modx/modx-class/reference/modx.makeurl
[1]: /en/components/pdotools/parser
