# TicketLatest

Feed of latest tickets or comments with optional cache.

**Call uncached.**

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&action** | `comments` | Mode: `comments` or `tickets` (case insensitive) |
| **&cacheKey** | | Cache key; empty disables caching |
| **&cacheTime** | `1800` | Cache lifetime in seconds |
| **&depth** | `10` | Search depth from each parent |
| **&fastMode** | `0` | DB values only; strips unprocessed MODX tags |
| **&includeContent** | `0` | Include resource `content` |
| **&includeTVs** | | Comma-separated TV names |
| **&limit** | `10` | Result limit |
| **&offset** | `0` | Skip results from the start |
| **&outputSeparator** | | Separator between rows |
| **&parents** | | Parent IDs; `0` removes parent limit |
| **&resources** | | Resource IDs; prefix `-` to exclude |
| **&showDeleted** | `0` | Include deleted resources |
| **&showHidden** | `1` | Include resources hidden in menu |
| **&showLog** | `0` | Debug log for `mgr` session |
| **&showUnpublished** | `0` | Include unpublished resources |
| **&sortby** | `createdon` | Sort field |
| **&sortdir** | `DESC` | Sort direction |
| **&toPlaceholder** | | Store output in a placeholder |
| **&tpl** | `tpl.Tickets.comment.latest` | Row chunk |
| **&tvPrefix** | | TV placeholder prefix |
| **&user** | | Filter by author user ID |
| **&where** | | Extra JSON conditions |

<!--@include: ../parts/tip-general-properties.md-->

## Examples

### Latest tickets

::: code-group

```fenom
{'!TicketLatest' | snippet : [
  'limit' => 5,
  'fastMode' => 1,
  'action' => 'tickets',
  'tpl' => 'tpl.Tickets.ticket.latest',
]}
```

```modx
[[!TicketLatest?
  &limit=`5`
  &fastMode=`1`
  &action=`tickets`
  &tpl=`tpl.Tickets.ticket.latest`
]]
```

:::

### Latest comments

::: code-group

```fenom
{'!TicketLatest' | snippet : [
  'limit' => 5,
  'fastMode' => 1,
  'action' => 'comments',
  'tpl' => 'tpl.Tickets.comment.latest',
]}
```

```modx
[[!TicketLatest?
  &limit=`5`
  &fastMode=`1`
  &action=`comments`
  &tpl=`tpl.Tickets.comment.latest`
]]
```

:::
