---
title: ms3ProductSets
description: Dynamic product sets for MiniShop3
logo: https://modstore.pro/assets/extras/ms3productsets/logo.png
author: ibochkarev

items: [
  {
    text: 'Getting started',
    link: 'quick-start',
    items: [
      { text: 'Quick start', link: 'quick-start' },
      { text: 'System settings', link: 'settings' },
      { text: 'Set types', link: 'types' },
    ],
  },
  {
    text: 'Site integration',
    link: 'integration',
    items: [
      { text: 'Integration', link: 'integration' },
      { text: 'Frontend setup', link: 'frontend' },
      { text: 'Snippets overview', link: 'snippets' },
      { text: 'Snippet ms3ProductSets', link: 'snippets/ms3ProductSets' },
      { text: 'Snippet mspsLexiconScript', link: 'snippets/mspsLexiconScript' },
    ],
  },
  {
    text: 'Manager interface',
    link: 'interface',
    items: [
      { text: 'Interface overview', link: 'interface' },
      { text: 'Product sets', link: 'interface/templates' },
      { text: 'Manager guide', link: 'admin' },
      { text: 'Permissions', link: 'permissions' },
    ],
  },
  {
    text: 'For developers',
    link: 'api',
    items: [
      { text: 'Contracts and parameters (API)', link: 'api' },
      { text: 'Flows and scenarios', link: 'flows' },
      { text: 'Architecture', link: 'architecture' },
    ],
  },
]
---
# ms3ProductSets

`ms3ProductSets` adds recommendation blocks to MiniShop3: "Frequently bought together", "Similar", "VIP sets", cart suggestions and other scenarios.

## Who reads what

- **Manager:** [Quick start](quick-start) → [Set types](types) → [Manager guide](admin).
- **Developer:** [Integration](integration) → [API](api) → [Architecture](architecture).

## Features

- Outputs sets by type: `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `auto_sales`, `vip`, `auto`.
- Two modes:
  - **Manual:** product links from TV and templates in the manager
  - **Auto:** fallback by category or order statistics
- Bulk apply templates to categories.
- Frontend JS API for AJAX render and add-to-cart.

## Requirements

- MODX Revolution 3+
- PHP 8.1+
- MiniShop3
- pdoTools 3.x
- VueTools (for manager page)

## System settings

Settings `ms3productsets.cache_lifetime` and `ms3productsets.auto_recommendation` **apply** when the snippet is called and on AJAX `get_set` (connector runs the snippet via runSnippet). See [System settings](settings).
