---
title: FAQ
description: Типовые вопросы по Tickets
---

# FAQ

## Комментарии не на странице тикета

`TicketComments` работает с любым `modDocument`. Задайте имя ветки и URL:

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'thread' => 'news-' ~ $_modx->resource.id,
  'threadUrl' => $_modx->makeUrl($_modx->resource.id, '', '', 'full'),
]}
```

```modx
[[!TicketComments?
  &thread=`news-[[*id]]`
  &threadUrl=`[[++site_url]][[*uri]]`
]]
```

:::

## Кэш и TicketComments

По умолчанию сниппет **некэшированный**. Если вызываете кэшированным, включите `tickets.clear_cache_on_comment_save`, иначе список комментариев устареет.

## Письма не приходят

1. Проверьте `tickets.mail_from` или системный `emailsender`
2. Уровень BCC: `tickets.mail_bcc_level` (`0` — выкл., `2` — тикеты и комментарии)
3. Очередь: при `tickets.mail_queue` = `1` добавьте в cron `core/components/tickets/cron/mail_queue.php`

## Неопубликованный или закрытый тикет

- Неопубликованный: редирект на `tickets.unpublished_ticket_page`
- Закрытый (`private`): без `ticket_view_private` пользователь уходит на `tickets.private_ticket_page`

## Плоский список комментариев

`` &tree=`0` `` и пагинация `&limit` / `&offset`. Дерево ответов отключается, вложенность в DOM не строится.

## Несколько веток на одной странице

Для каждой ветки задают свой `&thread=`, каждую оборачивают в `<div class="comments-thread" id="...">`. Панель `.comments-tpanel` (с 1.14) опирается на классы, а не на id.

## Jevix и тег cut

Jevix фильтрует контент тикетов, если у тикета не включено свойство `disable_jevix`. Тег `<cut/>` делит аннотацию и полный текст. Лимит до cut: `tickets.ticket_max_cut`. Аннотация: `tickets.auto_introtext`.

## Файлы и изображения

Источник файлов: `tickets.source_default` (после установки — «Tickets Files»). Лимит вложений: `tickets.max_files_upload` (`0` — без лимита). Описание картинки задают на странице тикета в списке файлов. Процессор: `web/file/desc` (AJAX-действие `ticket/file/desc`, с 1.14).

## PHP и удаление пакета

- Пакет 1.14.x рассчитан на PHP 8+, в changelog описаны правки под 8.2
- При удалении пакета 1.14 очищаются CRC, таблицы и меню (см. changelog #172)

## FormIt не срабатывает

Нужен установленный FormIt. Параметры `&validate` и `&customValidators` передают в `Tickets::saveTicket()` и в сохранение комментария. Разметка ошибок: [TicketFormit](ticketformit).

## Счётчик комментариев в списке неверный

С 1.14 счётчик тикета считается по `TicketThread.resource`, не только по имени `resource-{id}`. В чанке используйте `[[+comments_anchor]]`.
