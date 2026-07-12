# subscribeAuthor

Outputs a form to subscribe to an author. Subscription is only available to logged-in users.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&createdby** | `0` | Required author user ID |
| **&tpl** | `tpl.Tickets.author.subscribe` | Subscription form chunk |
| **&TicketsInit** | `0` | Set `1` to load Tickets frontend scripts on custom pages |

## Examples

### In a ticket list chunk

`tpl.Tickets.list.row` already has a `createdby` placeholder:

::: code-group

```fenom
{'!subscribeAuthor' | snippet : ['createdby' => $createdby]}
```

```modx
[[!subscribeAuthor? &createdby=`[[+createdby]]`]]
```

:::

### Author profile page

When `author.id` is available, enable Tickets frontend scripts:

::: code-group

```fenom
{'!subscribeAuthor' | snippet : [
  'createdby' => $author.id,
  'TicketsInit' => 1,
]}
```

```modx
[[!subscribeAuthor? &createdby=`[[+author.id]]` &TicketsInit=`1`]]
```

:::
