# TicketLatest

Лента последних тикетов или комментариев с опциональным кэшем.

**Вызывайте некэшированным.**

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&action** | `comments` | Режим: `comments` или `tickets`. Указывайте строчными буквами, иначе выборка пойдёт по тикетам, а `&tpl` останется чанком для комментариев |
| **&cacheKey** | | Имя кэша. Пустое значение отключает кэширование |
| **&cacheTime** | `1800` | Время кэширования в секундах |
| **&depth** | `10` | Глубина поиска от каждого родителя |
| **&fastMode** | `0` | В чанк попадают только значения из БД. Сниппет вырезает необработанные теги MODX |
| **&includeContent** | `0` | Выбирать поле `content` ресурсов |
| **&includeTVs** | | Список ТВ через запятую |
| **&limit** | `10` | Лимит выборки |
| **&offset** | `0` | Пропуск результатов с начала |
| **&outputSeparator** | перенос строки | Разделитель между строками |
| **&parents** | | ID родителей. Ограничения по умолчанию нет, фильтр включается только при значении больше `0` |
| **&resources** | | ID ресурсов. Префикс `-` исключает ресурс |
| **&showDeleted** | `0` | Показывать удалённые ресурсы |
| **&showHidden** | `1` | Показывать ресурсы, скрытые в меню |
| **&showLog** | `0` | Отладочный лог для сессии `mgr` |
| **&showUnpublished** | `0` | Показывать неопубликованные ресурсы |
| **&sortby** | `createdon` | Поле сортировки |
| **&sortdir** | `DESC` | Направление сортировки |
| **&toPlaceholder** | | Сохранить вывод в плейсхолдер |
| **&tpl** | `tpl.Tickets.comment.latest` | Чанк строки. При `action=tickets` и неизменённом значении сниппет подменяет его на `tpl.Tickets.ticket.latest` |
| **&tvPrefix** | | Префикс плейсхолдеров ТВ |
| **&user** | | Фильтр по ID автора |
| **&where** | | Дополнительные условия в JSON |

<!--@include: ../parts/tip-general-properties.md-->

## Примеры

### Последние тикеты

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

### Последние комментарии

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
