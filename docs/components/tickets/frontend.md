---
title: Фронтенд и AJAX
description: action.php, TicketsConfig, события JS
---

# Фронтенд и AJAX

Сниппеты `TicketForm`, `TicketComments`, `TicketMeta` подключают CSS/JS из настроек `tickets_frontend_css` и `tickets_frontend_js`.

## Endpoint

Запросы уходят в `assets/components/tickets/action.php` (в JS: `TicketsConfig.actionUrl`).

Основные `action`:

| action | Назначение |
| --- | --- |
| `ticket/save` | сохранение тикета с фронтенда |
| `ticket/preview` | предпросмотр |
| `ticket/delete` / `ticket/undelete` | удаление и восстановление |
| `ticket/vote` | голос за тикет |
| `ticket/star` | избранное тикета |
| `comment/save` | новый комментарий |
| `comment/preview` | предпросмотр комментария |
| `comment/vote` | голос за комментарий |
| `comment/star` | избранное комментария |
| `comment/getlist` | подгрузка списка |
| `section/subscribe` | подписка на секцию |
| `author/subscribe` | подписка на автора |

Параметры сниппета ветки комментариев передаются через `TicketThread.properties` и сессию `TicketForm`.

## TicketsConfig

Задаётся при инициализации сниппетов. Важные поля:

| Поле | Источник |
| --- | --- |
| `actionUrl` | путь к `action.php` |
| `enable_editor` | `tickets_enable_editor` |
| `editor.ticket` / `editor.comment` | `tickets_editor_config.*` |
| `formBefore` | `TicketComments` `&formBefore` |
| `thread_depth` | `TicketComments` `&depth` |
| `thread_tree` | `TicketComments` `&tree` |
| `source` | загрузка файлов в комментарии (`&allowFiles`) |

## События jQuery (1.14+)

Перед отправкой формы можно отменить или изменить данные:

| Событие | Когда |
| --- | --- |
| `tickets_before_ticket_preview` | предпросмотр тикета |
| `tickets_before_ticket_save` | сохранение тикета |
| `tickets_before_comment_preview` | предпросмотр комментария |
| `tickets_before_comment_save` | отправка комментария |

```javascript
$(document).on('tickets_before_comment_save', function (e, form, button) {
  // return false — отменить отправку
});
```

## Якоря и непрочитанные

С 1.14.0 счётчик в `tpl.Tickets.list.row` может вести на `#first_unread`. При загрузке страницы JS прокручивает к `#first_unread` или `#comments`, если hash в URL совпадает.

## Плагин Tickets

| Событие | Поведение |
| --- | --- |
| `OnSiteRefresh` | сброс кэша `default/tickets` |
| `OnPageNotFound` | редирект по URI секции на тикет (FURL + шаблон URI раздела) |
| `OnLoadWebDocument` | учёт просмотров; cookie гостя при `tickets_count_guests` |
| `OnWebPagePrerender` | замена экранированных `[` `{` в HTML |

## subscribeAuthor на произвольной странице

Передайте `&TicketsInit=`1``, чтобы подключить JS Tickets без `TicketComments` на странице. См. [subscribeAuthor](snippets/subscribeauthor).
