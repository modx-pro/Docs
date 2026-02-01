# pdoResources

Snippet for resource lists. Advanced replacement for getResources: same features, fewer drawbacks.

Properly sorts TVs, joins tables, includes/excludes categories from contexts and more.

## Parameters

### Resource selection

Define which resources appear in output.

| Name | Default | Description |
| --- | --- | --- |
| **&parents** | Current resource | Comma-separated parent IDs. Use 0 for no limit. Minus prefix excludes |
| **&depth** | `10` | Child depth |
| **&resources** | | Comma-separated resource IDs. Minus excludes |
| **&context** | | Limit by context |
| **&where** | | JSON extra conditions |
| **&showHidden** | `1` | Show menu-hidden |
| **&showUnpublished** | `0` | Show unpublished |
| **&showDeleted** | `0` | Show deleted |
| **&hideContainers** | `0` | Exclude containers |
| **&select** | | Comma or JSON fields |
| **&sortby** | `pagetitle` | Sort field; TV if in &includeTVs; JSON for multi; RAND() |
| **&sortdir** | `DESC` | Sort direction |
| **&setTotal** | `0` | Disable total by default (since 2.11.0). pdoPage always enables it |
| **&limit** | `10` | Max results |
| **&offset** | `0` | Skip count; use with &limit |
| **&first** | `1` | First iteration index |
| **&last** | total + first - 1 | Last iteration index |
| **&loadModels** | | Comma component models e.g. ms2gallery,msearch2 |
| **&tvFilters** | | TV filters with AND/OR. Uses LIKE; % wildcard. Search in DB only |
| **&tvFiltersAndDelimiter** | `,` | AND delimiter |
| **&tvFiltersOrDelimiter** | `\|\|` | OR delimiter |

### Template parameters

Chunks for output layout.

| Name | Description |
| --- | --- |
| **&returnIds** | "1" returns comma IDs; templates ignored |
| **&tpl** | Chunk for resource row |
| **&tplFirst** | Chunk for first row |
| **&tplLast** | Chunk for last row |
| **&tplOdd** | Chunk for even rows |
| **&tplWrapper** | Wrapper chunk; [[+output]]. Incompatible with &toSeparatePlaceholders |
| **&wrapIfEmpty** | Output wrapper when no results |
| **&tplCondition** | Field for conditional chunk |
| **&tplOperator** | Comparison operator |
| **&conditionalTpls** | JSON: keys = compare values, values = chunks |
| **&outputSeparator** | Result separator |

### Output parameters

| Name | Default | Description |
| --- | --- | --- |
| **&fastMode** | `0` | Strip unprocessed tags |
| **&idx** | | Start iteration index |
| **&totalVar** | `total` | Placeholder for total; setTotal must be on |
| **&includeContent** | `0` | Include content field |
| **&includeTVs** | | Comma TVs; yields [[+tv.name]] |
| **&prepareTVs** | `1` | Prepare all &includeTVs |
| **&processTVs** | | Process TVs per manager; 1 = all; slows |
| **&tvPrefix** | `tv.` | TV prefix |
| **&useWeblinkUrl** | | Generate URL by class; adds [[+link]] |
| **&toPlaceholder** | | Output to placeholder |
| **&toSeparatePlaceholders** | | Output each to myPl0, myPl1... |
| **&showLog** | `0` | Debug info; mgr context only |

## Examples

Simple child list for resource 1:

```modx
[[pdoResources?
  &parents=`1`
  &depth=`0`
  &tpl=`ListRowTpl`
]]
```

With TV image:

```modx
[[pdoResources?
  &parents=`1`
  &depth=`0`
  &tpl=`ListRowTpl`
  &includeTVs=`image`
]]
```

Custom order by &resources:

```modx
[[pdoResources?
  &resources=`213,34,58,290`
  &sortby=``
  &sortdir=`ASC`
  &tpl=`ListRowTpl`
  &includeTVs=`image`
]]
```

In chunk **ListRowTpl** use `[[+tv.image]]` for image.

## Additional info

Common error when migrating from [getResources](https://docs.modx.com/current/en/extras/getresources): using **strtotime** for dates. Resource dates are stored as timestamp but modResource converts them; pdoTools works directly with DB, so chunk gets timestamp. Use **date** modifier:

```modx
[[+publishedon:date=`%d.%m.%Y`]]
or
[[+createdon:date=`%Y-%m-%d`]]
```

Same for dates in other pdoTools snippets.
