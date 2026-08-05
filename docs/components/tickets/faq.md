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

По умолчанию сниппет **некэшированный**. Если вызываете кэшированным, включите `tickets_clear_cache_on_comment_save`, иначе список комментариев устареет.

## Письма не приходят

1. Проверьте `tickets_mail_from` или системный `emailsender`
2. Уровень BCC: `tickets_mail_bcc_level` (`0` — выкл., `2` — тикеты и комментарии)
3. Очередь: при `tickets_mail_queue=1` добавьте в cron `core/components/tickets/cron/mail_queue.php`

## Неопубликованный или закрытый тикет

- Неопубликованный: редирект на `tickets_unpublished_ticket_page`
- Закрытый (`private`): без `ticket_view_private` — `tickets_private_ticket_page`

## Плоский список комментариев

`&tree=`0`` и пагинация `&limit=` / `&offset=`. Дерево ответов отключается, вложенность в DOM не строится.

## Несколько веток на одной странице

Разные `&thread=`; каждая в `<div class="comments-thread" id="...">`. Панель `.comments-tpanel` использует классы, не id (1.14).

## Jevix и тег cut

Контент тикетов фильтруется Jevix (если не `disable_jevix`). Тег `<cut/>` делит аннотацию и полный текст. Лимит до cut: `tickets_ticket_max_cut`. Аннотация: `tickets_auto_introtext`.

## Файлы и изображения

Источник по умолчанию: `tickets_source_default` или «Tickets Files» из установки. Лимит вложений: `tickets_max_files_upload` (`0` — без лимита). Описание картинки в mgr: процессор `ticket/file/desc` (1.14).

## PHP и удаление пакета

- Пакет 1.14.x рассчитан на PHP 8+; в changelog — правки под 8.2
- Uninstall 1.14 очищает CRC, таблицы, меню (см. changelog #172)

## FormIt не срабатывает

Нужен установленный FormIt. Параметры `&validate`, `&customValidators` передаются в `Tickets::saveTicket()` / сохранение комментария. Разметка ошибок: [TicketFormit](ticketformit).

## Счётчик комментариев в списке неверный

С 1.14 счётчик тикета считается по `TicketThread.resource`, не только по имени `resource-{id}`. В чанке используйте `[[+comments_anchor]]`.
