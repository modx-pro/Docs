# TicketLatest

Лента последних тикетов или комментариев с опциональным кэшем.

**Вызывайте некэшированным.**

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **&action** | `comments` | Режим: `comments` или `tickets` (регистр не важен) |
| **&cacheKey** | | Имя кэша; пустое значение отключает кэширование |
| **&cacheTime** | `1800` | Время кэширования в секундах |
| **&depth** | `10` | Глубина поиска от каждого родителя |
| **&fastMode** | `0` | Только значения из БД; необработанные теги MODX вырезаются |
| **&includeContent** | `0` | Выбирать поле `content` ресурсов |
| **&includeTVs** | | Список TV через запятую |
| **&limit** | `10` | Лимит выборки |
| **&offset** | `0` | Пропуск результатов с начала |
| **&outputSeparator** | | Разделитель между строками |
| **&parents** | | ID родителей; `0` снимает ограничение по родителю |
| **&resources** | | ID ресурсов; префикс `-` исключает ресурс |
| **&showDeleted** | `0` | Показывать удалённые ресурсы |
| **&showHidden** | `1` | Показывать ресурсы, скрытые в меню |
| **&showLog** | `0` | Отладочный лог для сессии `mgr` |
| **&showUnpublished** | `0` | Показывать неопубликованные ресурсы |
| **&sortby** | `createdon` | Поле сортировки |
| **&sortdir** | `DESC` | Направление сортировки |
| **&toPlaceholder** | | Сохранить вывод в плейсхолдер |
| **&tpl** | `tpl.Tickets.comment.latest` | Чанк строки |
| **&tvPrefix** | | Префикс плейсхолдеров TV |
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
