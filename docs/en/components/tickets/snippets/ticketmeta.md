# TicketMeta

Ticket meta on the page: author, dates, views, voting, favorites. Since 1.4.0 also works with regular MODX resources.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&tpl** | `tpl.Tickets.meta` | Meta block chunk |
| **&tplFile** | `tpl.Tickets.meta.file` | File row in the list |
| **&getUser** | `1` | Load author profile |
| **&getFiles** | `1` | Output uploaded files |
| **&unusedFiles** | `1` | Only files not linked in `content` |
| **&thread** | | Comment thread name for counters; default `resource-{id}` |
| **&id** | current resource | Resource ID when not on the ticket page |

`getSection` is not in snippet properties; the section is loaded in code when class is `Ticket`.

## Examples

### Default

::: code-group

```fenom
{'!TicketMeta' | snippet}
```

```modx
[[!TicketMeta]]
```

:::

### Placeholders without a chunk

::: code-group

```fenom
{'!TicketMeta' | snippet : ['tpl' => '']}
```

```modx
[[!TicketMeta? &tpl=``]]
```

:::

### Meta for another resource

::: code-group

```fenom
{'!TicketMeta' | snippet : ['id' => 42]}
```

```modx
[[!TicketMeta? &id=`42`]]
```

:::
