---
title: UserAuthHash
description: User login via link (hash) without entering username and password
author: vgrish
modstore: https://modstore.pro/packages/users/userauthhash

items: [
  {
    text: 'Development',
    items: [
      { text: 'Events', link: 'development/events' },
      { text: 'Extensions', link: 'development/extensions' },
    ],
  },
]
---
# UserAuthHash

The component implements user login via a hash code.

You can try the package before buying at [modhost.pro][4].

## Features

- Login without username and password by visiting a link with a hash code.
- You can enable/disable hash login, set hash lifetime, and choose login contexts.

## Installation

- [Add our repository](https://modstore.pro/info/connection).
- Install **UserAuthHash**.

You can try the package at [modhost.pro][4]; these extras can be selected when creating a site.

## Description

UserAuthHash lets users log in without entering username and password by visiting the site with a hash code.

You can set the hash lifetime and choose login contexts.

## Snippet for generating auth hash `UserAuthHash`

### Parameters

| Parameter           | Default | Description                                                    |
|---------------------|---------|----------------------------------------------------------------|
| **user**            |         | User ID or email                                              |
| **loginContext**    |         | Contexts for login, comma-separated. E.g. &contexts=`web,ru,en` |
| **excludeContext**  |         | Contexts to exclude, comma-separated                          |
| **lifeTime**        | `1h`    | Auth hash lifetime. E.g. &lifeTime=`1h` — 1 hour              |

### Call example

::: code-group

```modx
<a href="[[++site_start]]?auth_hash=[[!UserAuthHash? &user=`2` &lifeTime=`1h`]]&msorder=1">Orders</a>
```

```fenom
{set $args = [
  'msorder' => 1,
  'auth_hash' => ('!UserAuthHash' | snippet:['user' => 2, 'lifeTime' => '1h'])
]}
<a href="{'site_start' | option | url : ['scheme' => 'full', 'xhtml_urls' => 0] : $args}">Orders</a>
```

```fenom [fenom (modifier)]
{set $args = [
  'msorder' => 1,
  'auth_hash' => (['user' => 'test@gmail.com', 'lifeTime' => '1h'] | getAuthHash)
]}
<a href="{'site_start' | option | url : ['scheme' => 'full', 'xhtml_urls' => 0] : $args}">Orders</a>
```

:::

## Note

Login does not work:

- For users with the `sudo` key.
- For blocked users.
- In the `mgr` context.

[4]: https://modhost.pro
