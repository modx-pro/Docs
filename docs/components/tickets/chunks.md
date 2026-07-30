---
title: Чанки
description: Стандартные чанки tpl.Tickets.*
---

# Чанки

При установке пакет создаёт чанки `tpl.Tickets.*` в namespace Tickets. Копируйте в тему и правьте копии, не оригиналы в ядре.

## Формы тикета

| Чанк | Сниппет / параметр |
| --- | --- |
| `tpl.Tickets.form.create` | `TicketForm`, `&tplFormCreate` |
| `tpl.Tickets.form.update` | `TicketForm`, `&tplFormUpdate` |
| `tpl.Tickets.form.preview` | `TicketForm`, `&tplPreview` |
| `tpl.Tickets.form.files` | `TicketForm`, `&tplFiles` |
| `tpl.Tickets.form.file` | строка файла, `&tplFile` |
| `tpl.Tickets.form.image` | строка изображения, `&tplImage` |

## Комментарии

| Чанк | Назначение |
| --- | --- |
| `tpl.Tickets.comment.wrapper` | обёртка ветки; `[[+total]]`, `[[+comments]]`, подписка на тему |
| `tpl.Tickets.comment.form` | форма авторизованного |
| `tpl.Tickets.comment.form.guest` | форма гостя |
| `tpl.Tickets.comment.form.files` | блок загрузки в комментарии |
| `tpl.Tickets.comment.one.auth` | один комментарий (вход выполнен) |
| `tpl.Tickets.comment.one.guest` | комментарий гостя |
| `tpl.Tickets.comment.one.deleted` | удалённый комментарий |
| `tpl.Tickets.comment.login` | требование авторизации |
| `tpl.Tickets.comment.list.row` | строка в `getComments` |
| `tpl.Tickets.comment.latest` | строка в `TicketLatest` (`action=comments`) |

В `comment.wrapper` счётчик `[[+total]]` берётся из `TicketThread`, не из pdoFetch.

## Списки и мета

| Чанк | Сниппет |
| --- | --- |
| `tpl.Tickets.list.row` | `getTickets`, `getStars` |
| `tpl.Tickets.sections.row` | `getTicketsSections` |
| `tpl.Tickets.sections.wrapper` | обёртка секций (если задаёте вручную) |
| `tpl.Tickets.ticket.latest` | `TicketLatest`, `action=tickets` |
| `tpl.Tickets.meta` | `TicketMeta` |
| `tpl.Tickets.meta.file` | файл в блоке мета |

Плейсхолдеры `list.row`: `pagetitle`, `introtext`, `date_ago`, `comments`, `comments_anchor` (`#first_unread` или `#comments`), `views`, рейтинг, звёзды.

## Почта

| Чанк | Когда |
| --- | --- |
| `tpl.Tickets.ticket.email.bcc` | новый тикет, BCC админам |
| `tpl.Tickets.ticket.email.subscription` | новый тикет, подписчик секции |
| `tpl.Tickets.comment.email.owner` | комментарий, автор тикета |
| `tpl.Tickets.comment.email.reply` | ответ на комментарий |
| `tpl.Tickets.comment.email.subscription` | подписчик ветки |
| `tpl.Tickets.comment.email.bcc` | BCC админам |
| `tpl.Tickets.comment.email.unpublished` | неопубликованный комментарий |
| `tpl.Tickets.author.email.subscription` | подписка на автора |

Параметры сниппетов `&tplCommentEmail*` и `&tplTicketEmail*` переопределяют чанки писем.

## Подписка на автора

| Чанк | Сниппет |
| --- | --- |
| `tpl.Tickets.author.subscribe` | `subscribeAuthor` |

Для `&tpl` допустимы `@INLINE` и `@FILE` (с 1.11.2).

## Вложенные чанки

В чанках списка и мета встречаются префиксы `<!--tickets_* ... -->` — условные подчанки Fenom/pdoTools (`tickets_can_vote`, `tickets_subscribed` и т.д.). Префикс задаёт `nestedChunkPrefix` в коде (`tickets_`).
