---
title: ms3Favorites
description: Wishlists for MiniShop3 and other resources — browser storage, DB sync
logo: https://modstore.pro/assets/extras/ms3favorites/logo.png
author: ibochkarev

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  {
    text: 'Snippets',
    link: 'snippets',
    items: [
      { text: 'ms3Favorites', link: 'snippets/ms3Favorites' },
      { text: 'ms3FavoritesBtn', link: 'snippets/ms3FavoritesBtn' },
      { text: 'ms3FavoritesCounter', link: 'snippets/ms3FavoritesCounter' },
      { text: 'ms3FavoritesIds', link: 'snippets/ms3FavoritesIds' },
      { text: 'ms3FavoritesPage', link: 'snippets/ms3FavoritesPage' },
      { text: 'ms3FavoritesLists', link: 'snippets/ms3FavoritesLists' },
      { text: 'ms3FavoritesPopularity', link: 'snippets/ms3FavoritesPopularity' },
      { text: 'ms3FavoritesShare', link: 'snippets/ms3FavoritesShare' },
      { text: 'ms3fLexiconScript', link: 'snippets/ms3fLexiconScript' },
    ],
  },
  { text: 'Frontend setup', link: 'frontend' },
  { text: 'Integration and customization', link: 'integration' },
]
---
# ms3Favorites

ms3Favorites adds wishlists for [MiniShop3](/en/components/minishop3/) products and other resource types (`resources`, `articles`, `pages`, `custom`). Users save products for later. The list is stored in the browser (`localStorage` or `cookie`), with optional DB sync for logged-in users and guests (when `guest_db_enabled`).

## Features

- **Wishlist block** — output by list of IDs (AJAX via connector or server-side snippet)
- **Browser storage** — `localStorage` (default) or `cookie`, no registration
- **DB sync** — for logged-in users: on login, data from localStorage is moved to the DB
- **Guests in DB** — when `guest_db_enabled`, guest list is stored by session_id
- **Multiple lists** — `default`, `gifts`, `plans`, etc. (up to `max_lists`)
- **List sharing** — public link `/wishlist/share?token=xxx`, copy someone else’s list
- **Page /wishlist/** — server output with pdoPage or JS mode
- **Cart integration** — “Add all to cart”, “Add selected”
- **Popularity** — “In N users’ wishlists”
- **Resource types** — `products`, `resources`, `articles`, `pages`, `custom`
- **Localization** — MODX Lexicon (ru, en), frontend snippet `ms3fLexiconScript`
- **Customization** — Fenom chunks, BEM classes (prefix `ms3f`), CSS variables

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — products and categories
- **[pdoTools](/en/components/pdotools/) 3.0.0+** — for snippets (pdoPage, Fenom)

## Installation

See [Quick start](quick-start) for requirements and ModStore steps.

### Via ModStore

1. [Connect ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3** and **pdoTools** are installed
4. Find **ms3Favorites**, click **Download**, then **Install**
5. **Settings → Clear cache**

Package is available at [modstore.pro](https://modstore.pro/).

### After installation

Load lexicon, CSS and JS on the site, add the button on the product card and output the wishlist block.

See: [Quick start](quick-start) and [Frontend setup](frontend).

## Terms

| Term | Description |
|------|-------------|
| **Wishlist** | List of favorite products (default list is `default`) |
| **Sync** | Moving the list from localStorage to the DB when the user logs in |
| **Sharing** | Public link to a list by token |
| **Popularity** | Number of users who added the resource to their wishlist |
