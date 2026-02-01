# pdoArchive

Snippet outputs site document archive grouped by year, month and day.

[![](https://file.modx.pro/files/d/e/f/def118c83e28abc62f41e094f9f337f6s.jpg)](https://file.modx.pro/files/d/e/f/def118c83e28abc62f41e094f9f337f6.png)

## Chunks

- **tpl** - Name chunk for displaying resource. If not set, resource fields will be printed to screen.

```modx
@INLINE <li>[[+date]] <a href="[[+link]]">[[+menutitle]]</a></li>
```

- **tplYear** - Chunk for year output

```modx
@INLINE <h3>[[+year]] <sup>([[+count]])</sup></h3><ul>[[+wrapper]]</ul>
```

- **tplMonth** - Chunk for month output

```modx
@INLINE <li><h4>[[+month_name]] <sup>([[+count]])</sup></h4><ul>[[+wrapper]]</ul></li>
```

- **tplDay** - Chunk for day output

```modx
@INLINE <li><h5>[[+day]] <sup>([[+count]])</sup></h5><ul>[[+wrapper]]</ul></li>
```

- **tplWrapper** - Wrapper chunk for all results. Accepts one placeholder: `[[+output]]`.

*To hide year, month or day output, pass empty strings for those chunks.*

## Parameters

Snippet **accepts** [general pdoTools parameters][1].

| Parameter            | Default | Description                                                                                                                                                                                                                                 |
|---------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **tplWrapper**      |              | Wrapper chunk for all results. Accepts one placeholder: `[[+output]]`.                                                                                                                                              |
| **wrapIfEmpty**     |              | Enables wrapper chunk output (tplWrapper) even when no results.                                                                                                                                                                     |
| **dateField**       | `createdon`  | Resource field for date: createdon, publishedon or editedon.                                                                                                                                                          |
| **dateFormat**      | `%H:%M`      | Date format for strftime()()                                                                                                                                                                                                       |
| **showLog**         |              | Show extra snippet debug info. Only for users logged in to the context "mgr".                                                                                                                                     |
| **sortby**          | `createdon`  | Any resource field for sort, including TV if listed in "includeTVs". JSON for multiple fields. Use "RAND()" for random.                                       |
| **sortbyTV**        |              | Sort by TV param. If not in &includeTVs, it is added automatically.                                                                                                                                           |
| **sortbyTVType**    |              | TV sort type: string, integer, decimal or datetime. If empty, TV is sorted by its type.                                                      |
| **sortdir**         | `DESC`       | Sort direction: descending or ascending.                                                                                                                                                                                     |
| **sortdirTV**       | `ASC`        | TV sort direction: descending or ascending. If not set, equals parameter &sortdir.                                                                                                                               |
| **limit**           |              | Max number of results. You can use "0".                                                                                                                                                                      |
| **offset**          |              | Number of results to skip.                                                                                                                                                                                                           |
| **depth**           | `10`         | Depth of child resources from the parent.                                                                                                                                                                                            |
| **outputSeparator** | `\n`         | Optional string to separate results.                                                                                                                                                                                 |
| **toPlaceholder**   |              | If set, the snippet stores all data in a placeholder with this name instead of outputting.                                                                                                                                          |
| **parents**         |              | Comma-separated list of parent IDs for the search. By default the search is limited to the current parent. Use 0 for no limit. If a parent ID starts with minus, it and its children are excluded. |
| **includeContent**  |              | Include "content" field.                                                                                                                                                                                                       |
| **includeTVs**      |              | List of TVs to include, via comma. For example: "action,time" yields placeholders `[[+action]]` and `[[+time]]`.                                                                                                                 |
| **prepareTVs**      | `1`          | TVs to prepare before output. Default "1" = all TVs from &includeTVs.                                                                            |
| **processTVs**      |              | TVs to process before output. "1" = all from &includeTVs. Empty by default.                                                                 |
| **tvPrefix**        | `tv.`        | Prefix for TV placeholders.                                                                                                                                                                                                               |
| **where**           |              | JSON-encoded array of extra conditions.                                                                                                                                                                         |
| **showUnpublished** |              | Include unpublished resources.                                                                                                                                                                                                     |
| **showDeleted**     |              | Include deleted resources.                                                                                                                                                                                                            |
| **showHidden**      | `1`          | Include resources hidden from menu.                                                                                                                                                                                                      |
| **hideContainers**  |              | Exclude containers (resources with isfolder = 1).                                                                                                                                                                           |
| **context**         |              | Limit results by resource context.                                                                                                                                                                                               |
| **totalVar**        | `total`      | Placeholder name for total result count.                                                                                                                                                                           |
| **resources**       |              | Comma-separated list of resource IDs to include. Prefix with minus to exclude from results.                                                                                                       |
| **select**          |              | Comma-separated list of fields to select. JSON array allowed, e.g. {"modResource":"id,pagetitle,content"}.                                                                                                        |
| **scheme**          |              | Link scheme: "uri" for fast uri substitution or param for modX::makeUrl().                                                                                                                     |
| **useWeblinkUrl**   | `1`          | Generate link based on resource class.                                                                                                                                                                                             |

## Examples

Basic call:

```modx
[[!pdoArchive?
  &parents=`0`
]]
```

Via pdoPage:

```modx
[[!pdoPage?
  &element=`pdoArchive`
  &parents=`0`
]]

[[!+page.nav]]
```

Ticket output example (as in page header image):

```modx
[[!pdoPage?
  &element=`pdoArchive`
  &parents=`0`
  &limit=`1000`
  &maxLimit=`1000`
  &scheme=`uri`
  &sortby=`publishedon`
  &dateField=`publishedon`
  &where=`{"class_key":"Ticket"}`
  &tplYear=``
  &tplMonth=`@INLINE <h4>{$month_name} {$year} <sup>({$count})</sup></h4><ul>{$wrapper}</ul>`
  &tpl=`@INLINE <li>{$date} <a href="{$link}">{$menutitle}</a> / <small>{$section}</small></li>`
  &leftJoin=`{
    "Parent": {
      "class": "modResource"
    }
  }`
  &select=`{
    "modResource": "*",
    "Parent":"Parent.pagetitle as section"
  }`
]]
```

[1]: /en/components/pdotools/general-properties
