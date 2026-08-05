---
title: Политики и права
description: TicketUserPolicy, TicketVipPolicy, TicketSectionPolicy
---

# Политики и права

Tickets ставит три политики доступа. Ключи проверяются на фронтенде (формы, AJAX) и в mgr.

## Политики

| Политика | Кому | Назначение |
| --- | --- | --- |
| **TicketUserPolicy** | группа пользователей сайта | тикеты и комментарии на фронтенде |
| **TicketVipPolicy** | привилегированные пользователи | как TicketUserPolicy + просмотр закрытых тикетов |
| **TicketSectionPolicy** | ресурс секции тикетов | разрешение создавать тикеты в этой секции |

Базовая настройка группы: [Настройка прав пользователей](setup-permissions).

### TicketSectionPolicy

Вешается на **ресурс секции** (вкладка «Доступ» или политика ресурса). Главный ключ:

| Ключ | Описание |
| --- | --- |
| `section_add_children` | Создавать тикеты в секции |

`TicketForm` и процессор `web/section/getlist` отсекают секции без этого права. Параметра сниппета для смены проверки нет.

### TicketUserPolicy и TicketVipPolicy

Назначаются группе в контексте `web`. Отличие VIP: ключ `ticket_view_private`.

## Ключи TicketUserPolicy / TicketVipPolicy

| Ключ | Описание |
| --- | --- |
| `ticket_save` | Создавать и редактировать свой тикет |
| `ticket_delete` | Удалять свой тикет |
| `ticket_publish` | Публиковать и снимать с публикации свой тикет |
| `ticket_view_private` | Просматривать закрытые тикеты (только VIP) |
| `ticket_vote` | Голосовать за тикет |
| `ticket_star` | Добавлять тикет в избранное |
| `ticket_file_upload` | Загружать файлы к тикету |
| `ticket_file_delete` | Удалять свои файлы тикета |
| `section_unsubscribe` | Отписывать пользователей от секции (mgr) |
| `comment_save` | Создавать и редактировать комментарий |
| `comment_delete` | Удалять и восстанавливать комментарий |
| `comment_remove` | Удалять комментарий без восстановления (с потомками) |
| `comment_publish` | Публиковать и снимать с публикации комментарий |
| `comment_file_upload` | Загружать файлы в комментарий |
| `comment_vote` | Голосовать за комментарий |
| `comment_star` | Добавлять комментарий в избранное |
| `thread_close` | Закрывать и открывать ветку |
| `thread_delete` | Удалять и восстанавливать ветку |
| `thread_remove` | Удалять ветку окончательно со всеми комментариями |

Права `edit_document` в MODX по-прежнему дают редактировать чужие тикеты в mgr.

## Закрытые тикеты

Флаги `private` / `privateweb` на тикете. Без `ticket_view_private` пользователь уходит на ресурс из `tickets_private_ticket_page`.

## Подписки

- На **секцию** — чекбокс в `tpl.Tickets.comment.wrapper`, AJAX `section/subscribe`
- На **автора** — сниппет [subscribeAuthor](/components/tickets/snippets/subscribeauthor), AJAX `author/subscribe`

Оба действия требуют авторизации на фронтенде.
