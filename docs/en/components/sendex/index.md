---
title: Sendex
description: Component for email newsletters. Written as a demo of MODX component development
logo: https://modstore.pro/assets/extras/sendex/logo-lg.jpg
author: modx-pro
modstore: https://modstore.pro/packages/alerts-mailing/sendex
repository: https://github.com/modx-pro/Sendex

items: [
  {
    text: 'Interface',
    items: [
      { text: 'Subscriptions', link: 'interface/subscriptions' },
      { text: 'Email queue', link: 'interface/queue' },
    ],
  },
]
---
# Sendex snippet

Component for email newsletters.

The snippet is simple: users can subscribe and unsubscribe.

If the user is logged in, one click is enough. If not, they must confirm their email.

If a logged-in user is already subscribed, an unsubscribe button is shown. Anonymous users can unsubscribe via the link in the email.

## Parameters

| Name               | Description                                                                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **&id**            | Newsletter ID.                                                                                                                                                                                              |
| **&showInactive**  | Show or hide inactive newsletters.                                                                                                                                                                          |
| **&msgClass**      | CSS class output in `[[+class]]` when `[[+message]]` is not empty. Use to hide the message block until needed.                                                                                                |
| **&tplActivate**   | Chunk for the subscription activation email.                                                                                                                                                                 |
| **&tplSubscribeAuth**  | Chunk for the subscribe form (logged-in users).                                                                                                                                                        |
| **&tplSubscribeGuest** | Chunk for the subscribe form (guests).                                                                                                                                                                  |
| **&tplUnsubscribe**    | Chunk for the unsubscribe form.                                                                                                                                                                          |

## Calling the snippet

Call the snippet **uncached**, because output depends on whether the user is logged in.
Create a newsletter first. See the Interface section.

```modx
[[!Sendex? &id=`1`]]
```

All user messages are output in `[[+message]]` in the form chunks.

## History

The component was written as a demo for paid courses on bezumkin.ru.
Course materials [are here](http://bezumkin.ru/training/course1/).

Source code [on GitHub](https://github.com/bezumkin/Sendex).

Sendex is currently being tested and stabilized.
