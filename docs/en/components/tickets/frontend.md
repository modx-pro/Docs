---
title: Frontend and AJAX
description: action.php, TicketsConfig, JS events
---

# Frontend and AJAX

`TicketForm`, `TicketComments`, and `TicketMeta` load CSS/JS from `tickets_frontend_css` and `tickets_frontend_js`.

## Endpoint

Requests go to `assets/components/tickets/action.php` (`TicketsConfig.actionUrl`).

Main `action` values:

| action | Purpose |
| --- | --- |
| `ticket/save` | save ticket from frontend |
| `ticket/preview` | preview |
| `ticket/delete` / `ticket/undelete` | delete/restore |
| `ticket/vote` | vote on ticket |
| `ticket/star` | star ticket |
| `comment/save` | new comment |
| `comment/preview` | preview comment |
| `comment/vote` | vote on comment |
| `comment/star` | star comment |
| `comment/getlist` | reload list |
| `section/subscribe` | section subscription |
| `author/subscribe` | author subscription |

Thread snippet properties are stored on `TicketThread.properties` and in `TicketForm` session.

## TicketsConfig

| Field | Source |
| --- | --- |
| `actionUrl` | path to `action.php` |
| `enable_editor` | `tickets_enable_editor` |
| `editor.ticket` / `editor.comment` | `tickets_editor_config.*` |
| `formBefore` | `TicketComments` `&formBefore` |
| `thread_depth` | `TicketComments` `&depth` |
| `thread_tree` | `TicketComments` `&tree` |
| `source` | comment file uploads (`&allowFiles`) |

## jQuery events (1.14+)

| Event | When |
| --- | --- |
| `tickets_before_ticket_preview` | ticket preview |
| `tickets_before_ticket_save` | ticket save |
| `tickets_before_comment_preview` | comment preview |
| `tickets_before_comment_save` | comment submit |

```javascript
$(document).on('tickets_before_comment_save', function (e, form, button) {
  // return false to cancel
});
```

## Anchors and unread

Since 1.14.0, `tpl.Tickets.list.row` may link to `#first_unread`. On load, JS scrolls to `#first_unread` or `#comments` when the hash matches.

## Tickets plugin

| Event | Behavior |
| --- | --- |
| `OnSiteRefresh` | clear `default/tickets` cache |
| `OnPageNotFound` | redirect section URI to ticket (FURL + section URI pattern) |
| `OnLoadWebDocument` | view counting; guest cookie if `tickets_count_guests` |
| `OnWebPagePrerender` | restore escaped `[` `{` in HTML |

## subscribeAuthor on custom pages

Pass `&TicketsInit=`1`` to load Tickets JS without `TicketComments` on the page. See [subscribeAuthor](snippets/subscribeauthor).
