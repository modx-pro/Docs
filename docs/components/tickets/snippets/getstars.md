# getStars

Список тикетов или комментариев, добавленных текущим пользователем в избранное (`TicketStar`).

Обёртка над `getTickets` или `getComments`: формирует `where` с ID избранного.

Если избранного нет, сниппет возвращает пустую строку.

**Вызывайте некэшированным.**

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&class** | `Ticket` | `Ticket` — избранные тикеты, `TicketComment` — избранные комментарии |
| **&user** | ID текущего | ID пользователя, чьи звёзды выводят |
| **&tpl** | | Чанк строки, для тикетов по умолчанию `tpl.Tickets.list.row` |
| **&parents** | `0` | При `class=Ticket` передаётся в `getTickets` |

Остальные параметры `getTickets` и `getComments` (`limit`, `sortby`, `includeTVs`) действуют как в целевом сниппете.

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
