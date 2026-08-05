---
title: Reactions
description: Universal reactions for MODX 3 — likes, GitHub-style sets, tops and trending on any object
author: ibochkarev
repository: https://github.com/Ibochkarev/Reactions
logo: https://modstore.pro/assets/extras/reactions/logo.png
categories: utilities

items: [
  {
    text: 'Getting started',
    link: 'quick-start',
    items: [
      { text: 'Quick start', link: 'quick-start' },
      { text: 'System settings', link: 'settings' },
    ],
  },
  {
    text: 'Snippets',
    link: 'snippets',
    items: [
      { text: 'Overview', link: 'snippets/index' },
      { text: 'Reactions', link: 'snippets/reactions' },
      { text: 'ReactionsCount', link: 'snippets/reactions-count' },
      { text: 'TopLiked', link: 'snippets/top-liked' },
      { text: 'TopRated', link: 'snippets/top-rated' },
      { text: 'Trending', link: 'snippets/trending' },
      { text: 'ReactionsSchema', link: 'integrations/seo' },
    ],
  },
  {
    text: 'Integrations',
    link: 'integrations/pdotools',
    items: [
      { text: 'pdoTools', link: 'integrations/pdotools' },
      { text: 'miniShop3', link: 'integrations/minishop3' },
      { text: 'Tickets', link: 'integrations/tickets' },
      { text: 'Collections', link: 'integrations/collections' },
      { text: 'SEO / Schema.org', link: 'integrations/seo' },
    ],
  },
  { text: 'JavaScript widget', link: 'js' },
  { text: 'REST API', link: 'api' },
  { text: 'CLI', link: 'cli' },
  { text: 'MODX events', link: 'events' },
  { text: 'Webhooks', link: 'webhooks' },
]
---

# Reactions

Universal reactions for [MODX Revolution 3](https://modx.com/). From a simple like/dislike pair to a GitHub-style set — on a resource, miniShop3 product, or any other object.

The component is headless: no manager UI. You configure it via system settings, REST API, and CLI.

Source: [Ibochkarev/Reactions](https://github.com/Ibochkarev/Reactions) (MIT).

## Features

- Three built-in sets: `updown`, `github`, `full` (24 types)
- Compact picker for `github` / `full` (`layout=auto`): chips + `+` button. `layout=bar` for the full strip
- Custom types and sets via CLI or admin API
- Reactions on any object (`class` / `class_key`, DB field `object_class`)
- Click again to remove. In an exclusive set another reaction replaces the previous one
- Identity strategies: `auth_only`, `ip`, `ip_cookie`, `session`
- Tops for day / week / month / year / all time. Trending with a Reddit-style score
- Rate limit, bot blocking, CSRF, Origin check
- MODX events, webhooks (Telegram, Discord, Slack), author notifications

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2–8.4 |
| Database | MySQL / MariaDB (InnoDB) |

## Installation

1. Install the **Reactions** transport package via Package Management.
2. The package creates tables, presets (`updown`, `github`, `full`), snippets, chunks, and system settings.
3. **Manage → Clear Cache**.

Build from source (needs Node.js and `npm`):

```bash
composer install
php _build/build.php
```

`build.php` builds the widget from `frontend/` into `assets/components/reactions/js/web/`.

## Short path

1. Load CSS/JS and call the **Reactions** snippet — [Quick start](quick-start).
2. Change the set or identity strategy if needed — [System settings](settings).
3. For the storefront: [miniShop3](integrations/minishop3), [pdoTools](integrations/pdotools), [SEO](integrations/seo).

## Built-in sets

| Key | Reactions | Mode |
| --- | --- | --- |
| `updown` | 👍 `like`, 👎 `dislike` | Mutually exclusive (`exclusive`) |
| `github` | 👍 👎 ❤️ 😂 😮 😢 😡 🎉 | Multiple reactions at once |
| `full` | `github` + 🚀👀🔥👏🤔🥳⭐🍺✨💯🙏💪😎😍😕🙌 | 24 types. Subset via `reactions_full_types` |

Custom types and sets: [CLI](cli) or [admin API](api#admin).

## Snippets

| Snippet | Purpose |
| --- | --- |
| [Reactions](snippets/reactions) | Buttons with counts (picker / bar) |
| [ReactionsCount](snippets/reactions-count) | Counts without buttons |
| [TopLiked](snippets/top-liked) | Top by likes |
| [TopRated](snippets/top-rated) | Top by rating (likes − dislikes) |
| [Trending](snippets/trending) | Hot items (Reddit-style formula) |
| [ReactionsSchema](integrations/seo) | JSON-LD `AggregateRating` |

## Permissions

| Policy | Description |
| --- | --- |
| `reactions_view` | View reaction data |
| `reactions_manage` | Types, sets, and bans via API |
| `reactions_stats` | Statistics |

## Quick links

| Need | Doc |
| --- | --- |
| Render the block on a page | [Quick start](quick-start) |
| `reactions_*` keys | [System settings](settings) |
| AJAX and styles | [JavaScript widget](js) |
| Endpoints and error codes | [REST API](api) |
| recount, ban, type | [CLI](cli) |
| Plugins | [Events](events) |
| Telegram / Discord / Slack | [Webhooks](webhooks) |
