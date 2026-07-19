---
title: Chunks
description: Default tpl.Tickets.* chunks
---

# Chunks

Install creates `tpl.Tickets.*` chunks. Copy to your theme and edit copies, not core originals.

## Ticket forms

| Chunk | Snippet / param |
| --- | --- |
| `tpl.Tickets.form.create` | `TicketForm`, `&tplFormCreate` |
| `tpl.Tickets.form.update` | `TicketForm`, `&tplFormUpdate` |
| `tpl.Tickets.form.preview` | `TicketForm`, `&tplPreview` |
| `tpl.Tickets.form.files` | `TicketForm`, `&tplFiles` |
| `tpl.Tickets.form.file` | file row, `&tplFile` |
| `tpl.Tickets.form.image` | image row, `&tplImage` |

## Comments

| Chunk | Purpose |
| --- | --- |
| `tpl.Tickets.comment.wrapper` | thread wrapper; `[[+total]]`, `[[+comments]]`, subscribe |
| `tpl.Tickets.comment.form` | logged-in form |
| `tpl.Tickets.comment.form.guest` | guest form |
| `tpl.Tickets.comment.form.files` | upload block |
| `tpl.Tickets.comment.one.auth` | single comment (logged in) |
| `tpl.Tickets.comment.one.guest` | guest comment |
| `tpl.Tickets.comment.one.deleted` | deleted comment |
| `tpl.Tickets.comment.login` | login required |
| `tpl.Tickets.comment.list.row` | `getComments` row |
| `tpl.Tickets.comment.latest` | `TicketLatest`, `action=comments` |

`[[+total]]` in the wrapper comes from `TicketThread`, not pdoFetch.

## Lists and meta

| Chunk | Snippet |
| --- | --- |
| `tpl.Tickets.list.row` | `getTickets`, `getStars` |
| `tpl.Tickets.sections.row` | `getTicketsSections` |
| `tpl.Tickets.sections.wrapper` | sections wrapper (manual) |
| `tpl.Tickets.ticket.latest` | `TicketLatest`, `action=tickets` |
| `tpl.Tickets.meta` | `TicketMeta` |
| `tpl.Tickets.meta.file` | file in meta block |

`list.row` placeholders include `comments_anchor` (`#first_unread` or `#comments`).

## Email

| Chunk | When |
| --- | --- |
| `tpl.Tickets.ticket.email.bcc` | new ticket, admin BCC |
| `tpl.Tickets.ticket.email.subscription` | new ticket, section subscriber |
| `tpl.Tickets.comment.email.owner` | comment, ticket author |
| `tpl.Tickets.comment.email.reply` | reply to comment |
| `tpl.Tickets.comment.email.subscription` | thread subscriber |
| `tpl.Tickets.comment.email.bcc` | admin BCC |
| `tpl.Tickets.comment.email.unpublished` | unpublished comment |
| `tpl.Tickets.author.email.subscription` | author subscription |

Snippet params `&tplCommentEmail*` and `&tplTicketEmail*` override these.

## Author subscribe

| Chunk | Snippet |
| --- | --- |
| `tpl.Tickets.author.subscribe` | `subscribeAuthor` |

`&tpl` supports `@INLINE` and `@FILE` (since 1.11.2).

## Nested chunks

List/meta chunks use `<!--tickets_* ... -->` conditional subchunks (`tickets_can_vote`, `tickets_subscribed`, etc.). Prefix is set in code (`tickets_`).
