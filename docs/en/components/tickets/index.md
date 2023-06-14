---
name: Tickets
description: Blog and comments system
logo: https://modstore.pro/assets/extras/tickets/logo-lg.jpg
author: bezumkin
modstore: https://modstore.pro/packages/users/tickets
repository: https://github.com/modx-pro/Tickets

items: [
  {
    text: 'Interface',
    items: [
      { text: 'Creating ticket section', link: 'interface/create-ticket-section' },
      { text: 'Creating the ticket', link: 'interface/create-ticket' },
      { text: 'Creating user group and setting of the access rights', link: 'interface/setup-permissions' },
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
    ],
  },
]
---
# Tickets

Blog and comments system.

- Unique pages in manager for sections and tickets.
- Ability to create and edit tickets on frontend.
- Awesome ajax comments.
- Ability to change your comment on frontend in limited time.
- Ability to edit, delete and remove comments in manager.
- Built-in security policies for work with tickets and comments.
- Smart tickets cache. When you update one page it is not clear the whole site cache.
- Advanced content sanitization by snippet Jevix.
- Built-in HTML editor [MarkItUp](http://markitup.jaysalvat.com/home/) for frontend.
- Email notices about replies to ticket and comment.
- pdoTools based snippets for get tickets, comments, sections and last events.
- Three languages: english, russian and ukraine.
- Ability to vote for tickets and comments, e.g. like\dislike.
- Ability to create comments without authorization.
