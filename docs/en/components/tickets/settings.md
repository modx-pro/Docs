---
title: System settings
description: tickets namespace keys in MODX
---

# System settings

Open **System Settings** and filter by namespace `tickets`. DB key format: `tickets_{name}`.

## Main (`tickets.main`)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `tickets_mgr_tree_icon_ticketssection` | text | `icon icon-comments-o` | Ticket section icon in the resource tree |
| `tickets_mgr_tree_icon_ticket` | text | `icon icon-comment-o` | Ticket icon in the resource tree |
| `tickets_date_format` | text | `%d.%m.%y <small>%H:%M</small>` | Date format on the frontend |
| `tickets_enable_editor` | boolean | `1` | MarkItUp editor for tickets and comments |
| `tickets_frontend_css` | text | `[[+cssUrl]]web/default.css` | Frontend CSS path; empty disables auto-load |
| `tickets_frontend_js` | text | `[[+jsUrl]]web/default.js` | Frontend JS path |
| `tickets_source_default` | media source | `0` | Default media source for ticket files |

## Ticket section (`tickets.section`)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `tickets_section_content_default` | textarea | empty | Content for new sections; package default lists child tickets |

## Ticket (`tickets.ticket`)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `tickets_editor_config.ticket` | textarea | MarkItUp JSON | Ticket editor toolbar |
| `tickets_default_template` | template | empty | Default template for new tickets (mgr and frontend) |
| `tickets_private_ticket_page` | number | `0` | Resource ID to redirect private ticket viewers |
| `tickets_unpublished_ticket_page` | number | `0` | Resource ID for unpublished ticket requests |
| `tickets_ticket_max_cut` | number | `1000` | Max text length without `<cut/>` |
| `tickets_count_guests` | boolean | `0` | Count guest page views (easy to inflate) |
| `tickets_auto_introtext` | boolean | `1` | Fill empty introtext from content before `<cut/>` |
| `tickets_max_files_upload` | number | `0` | Attachment limit per ticket; `0` means unlimited |

## Comment (`tickets.comment`)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `tickets_editor_config.comment` | textarea | MarkItUp JSON | Comment editor toolbar |
| `tickets_snippet_prepare_comment` | text | empty | Snippet to post-process comments instead of default |
| `tickets_comment_edit_time` | number | `600` | Seconds the author can edit a comment |
| `tickets_clear_cache_on_comment_save` | boolean | `0` | Clear ticket cache on comment actions; only if `TicketComments` is cached |

## Mail (`tickets.mail`)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `tickets_mail_from` | text | empty | From address; falls back to `emailsender` |
| `tickets_mail_from_name` | text | empty | From name; falls back to `site_name` |
| `tickets_mail_queue` | boolean | `0` | Mail queue; if `1`, add `core/components/tickets/cron/mail_queue.php` to cron |
| `tickets_mail_bcc` | text | `1` | Admin user IDs for BCC, comma-separated |
| `tickets_mail_bcc_level` | number | `2` | `0` off, `1` tickets only, `2` tickets and comments |
