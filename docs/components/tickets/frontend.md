---
title: Фронтенд и AJAX
description: action.php, TicketsConfig, события JS
---

# Фронтенд и AJAX

Сниппеты подключают CSS и JS из `[[++tickets.frontend_css]]` и `[[++tickets.frontend_js]]` через `Tickets::initialize()`. Так делают `TicketForm`, `TicketComments`, `TicketMeta`, `getTickets`, `getComments`, `getTicketsSections`, `TicketLatest` и `subscribeAuthor` с `` &TicketsInit=`1` ``.

`getStars` компонент не инициализирует напрямую. Он вызывает `getTickets`, который это делает.

## Endpoint

Запросы уходят в `assets/components/tickets/action.php`. В JS это `TicketsConfig.actionUrl`. Вызовы процессоров админки идут в отдельный `assets/components/tickets/connector.php`.

Основные `action`:

| action | Назначение |
| --- | --- |
| `ticket/save` | сохранение тикета с фронтенда |
| `ticket/draft` | сохранение тикета черновиком (режим сохранения формы) |
| `ticket/publish` | сохранение и публикация тикета (режим сохранения формы) |
| `ticket/update` | обновление тикета (режим сохранения формы) |
| `ticket/preview` | предпросмотр |
| `ticket/delete` / `ticket/undelete` | удаление и восстановление |
| `ticket/vote` | голос за тикет |
| `ticket/star` | избранное тикета |
| `comment/save` | новый комментарий |
| `comment/preview` | предпросмотр комментария |
| `comment/get` | один комментарий по id |
| `comment/getlist` | подгрузка списка |
| `comment/subscribe` | подписка на ветку комментариев |
| `comment/vote` | голос за комментарий |
| `comment/star` | избранное комментария |
| `section/subscribe` | подписка на секцию |
| `author/subscribe` | подписка на автора |

Файлы тикета и комментария:

| action | Назначение |
| --- | --- |
| `ticket/file/upload` | загрузка файла к тикету |
| `ticket/file/delete` | удаление файла |
| `ticket/file/sort` | порядок файлов |
| `ticket/file/desc` | описание изображения (задаётся на странице тикета) |
| `comment/file/upload` | загрузка файла к комментарию |

Параметры сниппета ветки комментариев передаются через `TicketThread.properties` и сессию `TicketForm`.

## TicketsConfig

Сниппеты заполняют его при инициализации:

| Поле | Источник |
| --- | --- |
| `actionUrl` | путь к `action.php` |
| `enable_editor` | `tickets.enable_editor` |
| `editor.ticket` / `editor.comment` | `tickets.editor_config.*` |
| `formBefore` | `TicketComments` `&formBefore` |
| `thread_depth` | `TicketComments` `&depth` |
| `thread_tree` | `TicketComments` `&tree` |
| `source` | лимиты источника при `&allowFiles` у `TicketComments` и `TicketForm` |

## События jQuery (1.14+)

Обработчик вызывается до предпросмотра или отправки. Результат обработчика отправку не отменяет. В обработчик приходит форма. Кнопка вторым аргументом не передаётся.

| Событие | Когда |
| --- | --- |
| `tickets_before_ticket_preview` | предпросмотр тикета |
| `tickets_before_ticket_save` | сохранение тикета |
| `tickets_before_comment_preview` | предпросмотр комментария |
| `tickets_before_comment_save` | отправка комментария |

```javascript
$(document).on('tickets_before_comment_save', function (e, form) {
  form.elements.content.value = form.elements.content.value.trim();
});
```

После ответа сервера, когда запрос уже ушёл:

| Событие | Когда |
| --- | --- |
| `tickets_ticket_preview` | ответ предпросмотра тикета |
| `tickets_ticket_save` | ответ сохранения тикета |
| `tickets_ticket_delete` | ответ удаления тикета |
| `tickets_ticket_undelete` | ответ восстановления тикета |
| `tickets_comment_preview` | ответ предпросмотра комментария |
| `tickets_comment_save` | ответ сохранения комментария |

## Якоря и непрочитанные

С 1.14.0 счётчик в `tpl.Tickets.list.row` может вести на `#first_unread`. При загрузке страницы JS прокручивает к этому якорю или к `#comments`, если hash в URL совпадает.

## Плагин Tickets

| Событие | Поведение |
| --- | --- |
| `OnSiteRefresh` | сброс кэша `default/tickets` |
| `OnDocFormSave` | сброс кэша `tickets/latest.tickets` только при создании нового тикета |
| `OnPageNotFound` | редирект по URI секции на опубликованный тикет (FURL и шаблон URI раздела). Неопубликованный тикет подменяется страницей `tickets.unpublished_ticket_page` с кодом 403, если id не `0` |
| `OnLoadWebDocument` | cookie гостя и `visitedon` профиля (учёт просмотров тут не идёт) |
| `OnWebPageComplete` | учёт просмотров тикета, включая гостей при `tickets.count_guests` |
| `OnUserSave` | для нового пользователя создаёт пустой профиль автора, если его ещё нет |
| `OnEmptyTrash` | удаляет ветки комментариев очищенных ресурсов |
| `OnResourceDuplicate` | перегенерация URI копии тикета |
| `OnWebPagePrerender` | замена экранированных `[` `{` в HTML |

## События компонента

Подключайте обработчики к системным событиям service `Tickets` (**Системные настройки** → системные события). Полный список:

- комментарии: `OnBeforeCommentSave` / `OnCommentSave`, `On*CommentPublish`, `On*CommentUnpublish`, `On*CommentDelete`, `On*CommentUndelete`, `On*CommentRemove`;
- ветки: `On*TicketThreadClose`, `On*TicketThreadOpen`, `On*TicketThreadDelete`, `On*TicketThreadUndelete`, `On*TicketThreadRemove`;
- голоса: `OnBeforeTicketVote` / `OnTicketVote`, `OnBeforeCommentVote` / `OnCommentVote`;
- звёзды: `On*TicketStar`, `On*TicketUnStar`, `On*CommentStar`, `On*CommentUnStar` (`*` это `OnBefore` и без него).

## subscribeAuthor на произвольной странице

Передайте `` &TicketsInit=`1` ``, чтобы подключить JS Tickets без `TicketComments` на странице. См. [subscribeAuthor](snippets/subscribeauthor).
