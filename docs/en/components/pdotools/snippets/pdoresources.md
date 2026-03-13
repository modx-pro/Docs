# pdoResources

Snippet for outputting a list of resources. It is an advanced replacement for getResources: it has all the same capabilities but without its drawbacks.

It sorts TV parameters correctly, joins tables when selecting, includes and excludes categories from different contexts, and more.

## Parameters

### Resource selection parameters

These parameters define which resources appear in the generated list.

| Name | Default | Description |
| --- | --- | --- |
| **&parents** | Current resource | Comma-separated parent IDs for the query. Use 0 for no limit. Prefix with minus to exclude that parent and its children. |
| **&depth** | `10` | Depth of child resources from the parent. |
| **&resources** | | Comma-separated resource IDs to output. Prefix with minus to exclude a resource. |
| **&context** | | Limit selection by resource context. |
| **&where** | | JSON-encoded array of extra query conditions. |
| **&showHidden** | `1` | Include resources hidden from menu. |
| **&showUnpublished** | `0` | Include unpublished resources. |
| **&showDeleted** | `0` | Include deleted resources. |
| **&hideContainers** | `0` | Do not output containers (resources with isfolder = 1). |
| **&select** | | Comma-separated list of fields to select, or JSON e.g. `{"modResource":"id,pagetitle,content"}`. |
| **&sortby** | `pagetitle` | Any resource field to sort by, including TV if in **&includeTVs**. JSON for multiple fields, e.g. `{"tvname":"ASC", "pagetitle":"DESC"}`. Use `RAND()` for random order. |
| **&sortdir** | `DESC` | Sort direction: ascending or descending. |
| **&setTotal** | `0` | Disable total selection by default (since 2.11.0). Snippet **pdoPage** always enables it. |
| **&limit** | `10` | Maximum number of results. Can be 0. |
| **&offset** | `0` | Number of results to skip from the start. Use together with an explicit **&limit**. |
| **&first** | `1` | Index of first output iteration. |
| **&last** | Auto: total + first - 1 | Index of last output iteration. |
| **&loadModels** | | Comma-separated list of components whose models to load for the query, e.g. `ms2gallery,msearch2`. |
| **&tvFilters** | | TV filters with AND and OR. OR delimiter is in **&tvFiltersOrDelimiter**; conditions are grouped by OR first. Within a group use **&tvFiltersAndDelimiter**. Filter in a specific TV: `myTV==value`, or in any: `value`. Example: `filter2==one,filter1==bar%||filter1==foo`. Uses LIKE; % is wildcard. Search is on values stored in DB, not TV default values. |
| **&tvFiltersAndDelimiter** | `,` | Delimiter for AND conditions in **&tvFilters**. |
| **&tvFiltersOrDelimiter** | `\|\|` | Delimiter for OR conditions in **&tvFilters**. |

### Template parameters

These set the chunks (templates) used to generate output.

| Name | Description |
| --- | --- |
| **&returnIds** | Set to "1" to return a string of resource ids instead of formatted output. All template parameters are ignored. |
| **&tpl** | Chunk name for a resource row. If not set, resource fields are printed as-is. |
| **&tplFirst** | Chunk for the first resource in the result. |
| **&tplLast** | Chunk for the last resource in the result. |
| **&tplOdd** | Chunk for every even-position resource (name "odd" but applies to even). |
| **&tplWrapper** | Wrapper chunk for all results. Understands one placeholder: `[[+output]]`. Does not work with **&toSeparatePlaceholders**. |
| **&wrapIfEmpty** | Output the **&tplWrapper** chunk even when there are no results. |
| **&tplCondition** | Resource field whose value is used to choose chunk via **&conditionalTpls**. |
| **&tplOperator** | Optional operator for comparing **&tplCondition** with values in **&conditionalTpls**. |
| **&conditionalTpls** | JSON object: keys = values to compare with **&tplCondition**, values = chunk names. For operators like *isempty* use an array without keys. |
| **&outputSeparator** | Optional string to separate results. |

### Output parameters

These further define what data is output and how.

| Name | Default | Description |
| --- | --- | --- |
| **&fastMode** | `0` | Fast chunk processing: all unprocessed tags (conditions, snippets, etc.) are stripped. |
| **&idx** | | Starting index for output iteration. |
| **&totalVar** | `total` | Placeholder name for total result count. **setTotal** must be enabled. |
| **&includeContent** | `0` | Include **content** field in selection. |
| **&includeTVs** | | Comma-separated list of TV names to select, e.g. `action,time` gives placeholders `[[+tv.action]]`, `[[+tv.time]]`. |
| **&prepareTVs** | `1` (all from &includeTVs) | TVs to prepare (e.g. media sources with full paths). |
| **&processTVs** | | TVs to process and output per manager settings. `1` = all from **&includeTVs**. Slows output. |
| **&tvPrefix** | `tv.` | Prefix for TV placeholders. |
| **&useWeblinkUrl** | | Generate URL according to resource class; adds placeholder `[[+link]]`. |
| **&toPlaceholder** | | If set, all output is saved to a placeholder with this name instead of being printed. |
| **&toSeparatePlaceholders** | | If set, each result is put in a separate placeholder named by this value + row index from 0, e.g. `myPl` → `[[+myPl0]]`, `[[+myPl1]]`. |
| **&showLog** | `0` | Show extra debug info. Only for users authorized in context "mgr". |

## Examples

Simplest: list of child resources of document with id 1:

```modx
[[pdoResources?
  &parents=`1`
  &depth=`0`
  &tpl=`ListRowTpl`
]]
```

If you use an extra field **image**, add it like this:

```modx
[[pdoResources?
  &parents=`1`
  &depth=`0`
  &tpl=`ListRowTpl`
  &includeTVs=`image`
]]
```

To output resources in the same order as in **&resources**:

```modx
[[pdoResources?
  &resources=`213,34,58,290`
  &sortby=``
  &sortdir=`ASC`
  &tpl=`ListRowTpl`
  &includeTVs=`image`
]]
```

In chunk **ListRowTpl** the image field is available as `[[+tv.image]]`.

## Additional info

When migrating chunks from [getResources](https://docs.modx.com/current/en/extras/getresources), a common mistake is using the **strtotime** modifier to format dates.

Resource dates are already stored as timestamps but get converted to normal dates because of **modResource** object behavior. Then to format the date you convert them back to timestamp — an unnecessary double conversion.

pdoTools works directly with the database without creating those objects and converting values, so the chunk receives a timestamp that does not need extra processing. You can apply the **date** modifier directly:

```modx
[[+publishedon:date=`%d.%m.%Y`]]
or
[[+createdon:date=`%Y-%m-%d`]]
```

The same applies to date fields in other pdoTools snippets.
