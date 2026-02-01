# getTickets

Outputs a list of created tickets.
**The snippet must be called uncached.**

## Parameters

| Name               | Default                 | Description                                                                                                                                                           |
|--------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&depth**        | `10`                    | Search depth from each parent.                                                                                                                                        |
| **&fastMode**     | `0`                     | If enabled, only raw DB values are passed to the result chunk. All unprocessed MODX tags (filters, snippet calls, etc.) are stripped.                                  |
| **&includeContent**| `0`                    | Include the "content" field of resources.                                                                                                                             |
| **&includeTVs**   |                         | Comma-separated list of TV names to include. E.g. "action,time" gives placeholders `[[+action]]` and `[[+time]]`.                                                     |
| **&limit**        | `10`                    | Maximum number of results.                                                                                                                                            |
| **&offset**      | `0`                     | Number of results to skip.                                                                                                                                             |
| **&outputSeparator**|                       | Optional string to separate results.                                                                                                                                  |
| **&parents**      |                         | Comma-separated list of parent IDs. By default the search is limited to the current parent. Use 0 for no limit.                                                       |
| **&resources**    |                         | Comma-separated list of resource IDs to include. Prefix an ID with a minus sign to exclude it.                                                                         |
| **&showDeleted** | `0`                     | Include deleted resources.                                                                                                                                            |
| **&showHidden**   | `1`                     | Include resources hidden in menu.                                                                                                                                      |
| **&showLog**      | `0`                     | Show extra snippet debug info. Only for users logged in to the "mgr" context.                                                                                         |
| **&showUnpublished**| `0`                   | Include unpublished resources.                                                                                                                                        |
| **&sortby**       | `createdon`             | Sort field.                                                                                                                                                           |
| **&sortdir**      | `DESC`                  | Sort direction.                                                                                                                                                       |
| **&toPlaceholder**|                         | If set, the snippet stores all data in a placeholder with this name instead of outputting.                                                                            |
| **&tpl**          | `tpl.Tickets.list.row`  | Chunk for each result row.                                                                                                                                            |
| **&tvPrefix**     |                         | Prefix for TV placeholders, e.g. "tv.". Empty by default.                                                                                                             |
| **&user**         |                         | Only items created by this user.                                                                                                                                      |
| **&where**        |                         | JSON-encoded string with extra conditions.                                                                                                                             |

<!--@include: ../parts/tip-general-properties.md-->

## Examples

Standard call.

```modx
[[!pdoPage?
  &element=`getTickets`
]]

[[!+page.nav]]
```
