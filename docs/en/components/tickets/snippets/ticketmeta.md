# TicketMeta

Outputs information about the current ticket and allows voting for the ticket on its page.

::: tip
Since version 1.4.0 the snippet can be used with any MODX resources.
:::

## Snippet call parameters

| Name        | Default       | Description                                                                 |
| ----------- | ------------- | --------------------------------------------------------------------------- |
| **&getSection** | `1`        | Make an extra DB query to fetch the parent section?                         |
| **&getUser**    | `1`        | Make an extra DB query to fetch the author profile?                         |
| **&tpl**        | `tpl.Tickets.meta` | Chunk for ticket info display.                                        |

## Call examples

- Standard snippet call

```modx
[[!TicketMeta]]
```

- To see all available standard placeholders

```modx
[[!TicketMeta? &tpl=``]]
```
