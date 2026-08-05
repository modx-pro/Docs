---
title: Tickets
description: Component for creating and commenting user pages
logo: https://modstore.pro/assets/extras/tickets/logo-lg.jpg
author: bezumkin
modstore: https://modstore.pro/packages/users/tickets
repository: https://github.com/modx-pro/Tickets

items: [
  { text: 'Quick start', link: 'quick-start' },
  {
    text: 'Interface',
    items: [
      { text: 'Creating a ticket section', link: 'interface/create-ticket-section' },
      { text: 'Creating a ticket', link: 'interface/create-ticket' },
      { text: 'User permissions setup', link: 'interface/setup-permissions' },
      { text: 'Policies and permissions', link: 'interface/permissions' },
    ],
  },
  { text: 'System settings', link: 'settings' },
  { text: 'Chunks', link: 'chunks' },
  { text: 'Frontend and AJAX', link: 'frontend' },
  {
    text: 'Snippets',
    items: [
      { text: 'getTickets', link: 'snippets/gettickets' },
      { text: 'getTicketsSections', link: 'snippets/getticketssections' },
      { text: 'getComments', link: 'snippets/getcomments' },
      { text: 'getStars', link: 'snippets/getstars' },
      { text: 'TicketComments', link: 'snippets/ticketcomments' },
      { text: 'TicketForm', link: 'snippets/ticketform' },
      { text: 'TicketLatest', link: 'snippets/ticketlatest' },
      { text: 'TicketMeta', link: 'snippets/ticketmeta' },
      { text: 'subscribeAuthor', link: 'snippets/subscribeauthor' },
    ],
  },
  { text: 'TicketFormit', link: 'ticketformit' },
  { text: 'FAQ', link: 'faq' },
]
---
# Tickets

Component for user pages (tickets) and comments. Current package version: **1.14.0**.

## Features

- Ticket sections and tickets in the Manager with custom forms, tabs, and comment counters.
- Create and edit tickets on the frontend with permission checks.
- Ajax comments on tickets and any MODX resource.
- Multiple comment threads per page (`.comments-thread` wrapper).
- Flat comment list via `&tree=`0`` and `limit`/`offset` pagination.
- Rights to publish in a section (`section_add_children`) and to comment.
- Ticket cache, Jevix filtering on output, MarkItUp on the frontend.
- Email to authors, reply targets, and subscribers; BCC to admins.
- File uploads on tickets and comments; image description editing in mgr.
- Latest feed (`TicketLatest`) and favorites (`getStars`).

## Quick start

Step by step: [Quick start](quick-start).

1. [Ticket section](interface/create-ticket-section) and [permissions](interface/setup-permissions).
2. [System settings](settings) in namespace `tickets`.
3. Templates with `getTickets`, `TicketMeta`, `TicketComments`, or `TicketForm`.

## Dependencies

- [pdoTools](/en/components/pdotools/) for list snippets.
- [FormIt](https://docs.modx.com/current/en/extras/formit) optional for `&validate` in [TicketFormit](ticketformit).
- **PHP 8+** (1.14 includes 8.2 fixes).
