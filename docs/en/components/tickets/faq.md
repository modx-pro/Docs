---
title: FAQ
description: Common Tickets questions
---

# FAQ

## Comments on a non-ticket page

`TicketComments` works on any `modDocument`. Set thread name and page URL:

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

## Cache and TicketComments

Call the snippet **uncached** by default. If cached, enable `tickets_clear_cache_on_comment_save` or the list goes stale.

## Mail not sent

1. Check `tickets_mail_from` or system `emailsender`
2. BCC level: `tickets_mail_bcc_level` (`0` off, `2` tickets + comments)
3. Queue: with `tickets_mail_queue=1`, add `core/components/tickets/cron/mail_queue.php` to cron

## Unpublished or private ticket

- Unpublished: redirect to `tickets_unpublished_ticket_page`
- Private: without `ticket_view_private` → `tickets_private_ticket_page`

## Flat comment list

`&tree=`0`` with `&limit=` / `&offset=`. No nested reply DOM.

## Multiple threads per page

Different `&thread=` values; each in `<div class="comments-thread" id="...">`. Panel uses `.comments-tpanel` classes, not duplicate ids (1.14).

## Jevix and cut tag

Ticket content is filtered by Jevix unless `disable_jevix`. `<cut/>` splits intro and body. Limit before cut: `tickets_ticket_max_cut`. Intro: `tickets_auto_introtext`.

## Files and images

Default source: `tickets_source_default` or install-time «Tickets Files». Attachment limit: `tickets_max_files_upload` (`0` = unlimited). Image description in mgr: `ticket/file/desc` (1.14).

## PHP and uninstall

- 1.14.x targets PHP 8+; changelog includes 8.2 fixes
- Uninstall 1.14 cleans CRC, tables, menu (changelog #172)

## FormIt not working

FormIt must be installed. Pass `&validate` and `&customValidators` to `TicketForm` / `TicketComments`. Markup: [TicketFormit](ticketformit).

## Wrong comment count in list

Since 1.14 counts use `TicketThread.resource`, not only `resource-{id}`. Use `[[+comments_anchor]]` in the chunk.
