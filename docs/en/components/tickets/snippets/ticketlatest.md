# TicketLatest

Outputs the feed of latest created and/or commented tickets.

The snippet is called uncached.

## Parameters

| Name             | Default                 | Description                                                                                                                                 |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **&action**          | `Comments`           | Snippet mode. Available: Comments or Tickets.                                                                                               |
| **&cacheKey**        |                      | Snippet cache key. If empty, result caching is disabled.                                                                                    |
| **&cacheTime**       | `1800`                | Cache lifetime.                                                                                                                             |
| **&depth**           | `10`                  | Search depth of child resources from each parent.                                                                                           |
| **&fastMode**        | `0`                   | If enabled, only raw DB values are inserted into the result chunk; all unprocessed MODX tags (filters, snippet calls, etc.) are stripped.   |
| **&includeContent**  | `0`                   | Include the content field of resources.                                                                                                     |
| **&includeTVs**      |                      | Comma-separated list of TV names to select. E.g. "action,time" yields placeholders `[[+action]]` and `[[+time]]`.                            |
| **&limit**           | `10`                  | Maximum number of results.                                                                                                                  |
| **&offset**          | `0`                   | Number of results to skip from the start.                                                                                                   |
| **&outputSeparator** |                      | Optional string to separate results.                                                                                                        |
| **&parents**         |                      | Comma-separated list of parent IDs to search in. Default: current parent. Use 0 for no limit.                                               |
| **&resources**       |                      | Comma-separated list of resource IDs to include. If an ID is prefixed with minus, that resource is excluded.                               |
| **&showDeleted**     | `0`                   | Include deleted resources.                                                                                                                  |
| **&showHidden**      | `1`                   | Include resources hidden from the menu.                                                                                                     |
| **&showLog**         | `0`                   | Show extra debug info. Only for users logged in to the "mgr" context.                                                                       |
| **&showUnpublished** | `0`                   | Include unpublished resources.                                                                                                              |
| **&sortby**          | `createdon`          | Sort field.                                                                                                                                 |
| **&sortdir**         | `DESC`                | Sort direction.                                                                                                                             |
| **&toPlaceholder**   |                      | If set, the snippet saves all data to this placeholder instead of outputting to the page.                                                   |
| **&tpl**             | `tpl.Tickets.comment.latest` | Chunk for each result row.                                                                                                            |
| **&tvPrefix**        |                      | Prefix for TV placeholders, e.g. "tv.". Default: empty.                                                                                     |
| **&user**            |                      | Filter to items created by this user only.                                                                                                  |
| **&where**           |                      | JSON-encoded string with extra conditions for the query.                                                                                     |

<!--@include: ../parts/tip-general-properties.md-->

## Examples

- Output latest tickets

    ```modx
    [[!TicketLatest?
      &limit=`5`
      &fastMode=`1`
      &action=`tickets`
      &tpl=`tpl.Tickets.ticket.latest`
    ]]
    ```

- Output latest comments

    ```modx
    [[!TicketLatest?
      &limit=`5`
      &fastMode=`1`
      &action=`comments`
      &tpl=`tpl.Tickets.comment.latest`
    ]]
    ```
