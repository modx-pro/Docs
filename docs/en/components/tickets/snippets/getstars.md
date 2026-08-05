# getStars

Lists tickets or comments starred by the current user (`TicketStar`).

Wrapper around `getTickets` or `getComments`: injects favorite IDs into `where` and passes other parameters through.

**Call uncached.**

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&class** | `Ticket` | `Ticket` for starred tickets; `TicketComment` for starred comments |
| **&user** | current user ID | Whose stars to read |
| **&tpl** | | Row chunk; tickets default to `tpl.Tickets.list.row` |
| **&parents** | `0` | For `class=Ticket`, passed to `getTickets` |

Other `getTickets` / `getComments` params (`limit`, `sortby`, `includeTVs`, etc.) work as in the target snippet.

## Examples

### Starred tickets

::: code-group

```fenom
{'!getStars' | snippet : [
  'class' => 'Ticket',
  'tpl' => 'tpl.Tickets.list.row',
  'limit' => 10,
]}
```

```modx
[[!getStars?
  &class=`Ticket`
  &tpl=`tpl.Tickets.list.row`
  &limit=`10`
]]
```

:::

### Starred comments

::: code-group

```fenom
{'!getStars' | snippet : [
  'class' => 'TicketComment',
  'tpl' => 'tpl.Tickets.comment.list.row',
]}
```

```modx
[[!getStars? &class=`TicketComment` &tpl=`tpl.Tickets.comment.list.row`]]
```

:::
