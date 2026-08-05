---
title: Policies and permissions
description: TicketUserPolicy, TicketVipPolicy, TicketSectionPolicy
---

# Policies and permissions

Tickets ships three access policies. Keys are checked on the frontend (forms, AJAX) and in mgr.

## Policies

| Policy | For | Purpose |
| --- | --- | --- |
| **TicketUserPolicy** | site user group | tickets and comments on the frontend |
| **TicketVipPolicy** | privileged users | TicketUserPolicy + private ticket viewing |
| **TicketSectionPolicy** | ticket section resource | allow creating tickets in that section |

Basic group setup: [User permissions setup](setup-permissions).

### TicketSectionPolicy

Attach to the **section resource**. Main key:

| Key | Description |
| --- | --- |
| `section_add_children` | Create tickets in the section |

`TicketForm` and `web/section/getlist` hide sections without this permission. No snippet parameter overrides the check.

### TicketUserPolicy and TicketVipPolicy

Assigned to a group in `web`. VIP adds `ticket_view_private`.

## TicketUserPolicy / TicketVipPolicy keys

| Key | Description |
| --- | --- |
| `ticket_save` | Create and edit own ticket |
| `ticket_delete` | Delete own ticket |
| `ticket_publish` | Publish/unpublish own ticket |
| `ticket_view_private` | View private tickets (VIP only) |
| `ticket_vote` | Vote on ticket |
| `ticket_star` | Star ticket |
| `ticket_file_upload` | Upload ticket files |
| `ticket_file_delete` | Delete own ticket files |
| `section_unsubscribe` | Unsubscribe users from section (mgr) |
| `comment_save` | Create and edit comments |
| `comment_delete` | Delete/restore comment |
| `comment_remove` | Permanently remove comment and children |
| `comment_publish` | Publish/unpublish comment |
| `comment_file_upload` | Upload files on comments |
| `comment_vote` | Vote on comment |
| `comment_star` | Star comment |
| `thread_close` | Close/open thread |
| `thread_delete` | Delete/restore thread |
| `thread_remove` | Permanently remove thread and all comments |

MODX `edit_document` still allows editing others' tickets in mgr.

## Private tickets

`private` / `privateweb` on the ticket. Without `ticket_view_private`, redirect to `tickets_private_ticket_page`.

## Subscriptions

- **Section** — checkbox in `tpl.Tickets.comment.wrapper`, AJAX `section/subscribe`
- **Author** — [subscribeAuthor](/en/components/tickets/snippets/subscribeauthor), AJAX `author/subscribe`

Both require a logged-in frontend user.
