# getStars

Список тикетов или комментариев, добавленных текущим пользователем в избранное (`TicketStar`).

Обёртка над `getTickets` или `getComments`: передаёт `where` с ID избранного и пробрасывает остальные параметры целевого сниппета.

**Вызывайте некэшированным.**

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&class** | `Ticket` | `Ticket` — избранные тикеты; `TicketComment` — избранные комментарии |
| **&user** | ID текущего | ID пользователя, чьи звёзды читать |
| **&tpl** | | Чанк строки; для тикетов по умолчанию `tpl.Tickets.list.row` |
| **&parents** | `0` | При `class=Ticket` передаётся в `getTickets` |

Остальные параметры `getTickets` / `getComments` (`limit`, `sortby`, `includeTVs` и т.д.) работают как у целевого сниппета.

## Примеры

### Избранные тикеты

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

### Избранные комментарии

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
