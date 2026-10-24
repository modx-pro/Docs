---
title: Политики и права
description: TicketUserPolicy, TicketVipPolicy, TicketSectionPolicy
---

# Политики и права

Компонент Tickets создаёт три политики доступа. Ключи проверяют на фронтенде (формы, AJAX) и в mgr: какие ключи действуют только в mgr, помечено в таблице. С фронтенда тикет сохраняют без проверки `ticket_save`.

## Политики

| Политика | Кому | Назначение |
| --- | --- | --- |
| **TicketUserPolicy** | группа пользователей сайта | тикеты и комментарии на фронтенде |
| **TicketVipPolicy** | привилегированные пользователи | как TicketUserPolicy + просмотр закрытых тикетов |
| **TicketSectionPolicy** | ресурс секции тикетов | разрешение создавать тикеты в этой секции |

Базовая настройка группы: [Настройка прав пользователей](setup-permissions).

### TicketSectionPolicy

Назначают на **ресурс секции** (вкладка «Доступ» или политика ресурса). Основной ключ:

| Ключ | Описание |
| --- | --- |
| `section_add_children` | Создавать тикеты в секции |

`TicketForm` и процессор `web/section/getlist` показывают только секции с этим правом. Параметра сниппета для смены проверки нет.

### TicketUserPolicy и TicketVipPolicy

Назначаются группе в контексте `web`. Отличие VIP: ключ `ticket_view_private`, которого нет в `TicketUserPolicy`.

## Ключи TicketUserPolicy / TicketVipPolicy

| Ключ | Описание |
| --- | --- |
| `ticket_save` | Создавать и редактировать свой тикет (mgr) |
| `ticket_delete` | Удалять свой тикет |
| `ticket_publish` | Публиковать и снимать с публикации свой тикет (mgr) |
| `ticket_view_private` | Просматривать закрытые тикеты (только VIP) |
| `ticket_vote` | Голосовать за тикет |
| `ticket_star` | Добавлять тикет в избранное |
| `ticket_file_upload` | Загружать файлы к тикету |
| `ticket_file_delete` | Удалять свои файлы тикета |
| `section_unsubscribe` | Отписывать пользователей от секции (mgr) |
| `comment_save` | Создавать и редактировать комментарий |
| `comment_delete` | Удалять и восстанавливать комментарий (mgr) |
| `comment_remove` | Удалять комментарий без восстановления, с потомками (mgr) |
| `comment_publish` | Публиковать и снимать с публикации комментарий (mgr) |
| `comment_file_upload` | Загружать файлы в комментарий |
| `comment_vote` | Голосовать за комментарий |
| `comment_star` | Добавлять комментарий в избранное |
| `thread_close` | Закрывать и открывать ветку (mgr) |
| `thread_delete` | Удалять и восстанавливать ветку (mgr) |
| `thread_remove` | Удалять ветку окончательно со всеми комментариями (mgr) |

Право `edit_document` в MODX по-прежнему позволяет редактировать чужие тикеты в mgr.

## Закрытые тикеты

Закрытый тикет отмечают флагами `private` и `privateweb`. Без `ticket_view_private` пользователя перенаправляют на ресурс из `tickets.private_ticket_page`.

## Подписки

- На **секцию** — чекбокс в `tpl.Tickets.comment.wrapper`, AJAX `section/subscribe`
- На **автора** — сниппет [subscribeAuthor](/components/tickets/snippets/subscribeauthor), AJAX `author/subscribe`

Оба действия требуют авторизации на фронтенде.
