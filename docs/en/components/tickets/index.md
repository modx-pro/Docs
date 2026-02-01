---
title: Tickets
description: Component for creating and commenting user pages
logo: https://modstore.pro/assets/extras/tickets/logo-lg.jpg
author: bezumkin
modstore: https://modstore.pro/packages/users/tickets
repository: https://github.com/modx-pro/Tickets

items: [
  {
    text: 'Interface',
    items: [
      { text: 'Creating a ticket section', link: 'interface/create-ticket-section' },
      { text: 'Creating a ticket', link: 'interface/create-ticket' },
      { text: 'User permissions setup', link: 'interface/setup-permissions' },
    ],
  },
  {
    text: 'Snippets',
    items: [
      { text: 'getTickets', link: 'snippets/gettickets' },
      { text: 'getTicketsSections', link: 'snippets/getticketssections' },
      { text: 'TicketComments', link: 'snippets/ticketcomments' },
      { text: 'TicketForm', link: 'snippets/ticketform' },
      { text: 'TicketLatest', link: 'snippets/ticketlatest' },
      { text: 'TicketMeta', link: 'snippets/ticketmeta' },
      { text: 'subscribeAuthor', link: 'snippets/subscribeauthor' },
    ],
  },
  { text: 'TicketFormit', link: 'ticketformit' },
]
---
# Tickets

Component for creating and commenting user pages.

## Main features

- Create dedicated ticket sections in the Manager with a custom interface.
- Create tickets in the Manager with dedicated panels and tabs.
- Create pages from the frontend.
- Edit pages from the frontend with permission checks.
- Ajax comments.
- Edit and delete comments from the Manager.
- Access rights for adding pages to a section and creating comments.
- Its own caching for tickets.
- Jevix filtering when outputting tickets.
- Automatic Jevix setup on package install; two parameter sets (tickets and comments).
- [MarkItUp](https://markitup.jaysalvat.com/home/) editor for tickets and comments.
- Email notifications to the ticket author and to users whose comments received a reply.
- Output of latest comments and tickets by section with optional caching.
- Ready-made chunks, snippet parameters documented; Russian and English.
