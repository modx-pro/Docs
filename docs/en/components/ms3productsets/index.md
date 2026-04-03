---
title: ms3ProductSets
description: Dynamic product recommendations for MiniShop3 — manual links, auto rules, manager templates
logo: https://modstore.pro/assets/extras/ms3productsets/logo.png
author: ibochkarev

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Set types', link: 'types' },
  {
    text: 'Snippets',
    link: 'snippets',
    items: [
      { text: 'ms3ProductSets', link: 'snippets/ms3ProductSets' },
      { text: 'mspsLexiconScript', link: 'snippets/mspsLexiconScript' },
    ],
  },
  { text: 'Frontend setup', link: 'frontend' },
  { text: 'Integration and customization', link: 'integration' },
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

ms3ProductSets adds recommendation blocks to [MiniShop3](/en/components/minishop3/): “Frequently bought together”, “Similar”, “VIP sets”, cart suggestions and more. **Manual** links are used first (TVs on the product and/or manager templates); when empty, **auto** logic runs by set type (category, orders, system settings for VIP).

## Features

- **Set types** — `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `auto_sales`, `vip`, `auto`, plus synonyms (`also-bought`, `cross-sell`, `custom` → treated as `auto`); logic and fallback in [set types](/en/components/ms3productsets/types)
- **Manual mode** — `ms3_product_sets` table, `ms3productsets_*` TVs, bulk **template** apply to categories in the manager
- **Auto mode** — picks by category, similar products, order stats (`auto_sales`), VIP fallback from `ms3productsets.vip_set_*`; disabled when **`auto_recommendation=0`** ([system settings](/en/components/ms3productsets/settings))
- **Site output** — **`ms3ProductSets`** snippet; optional AJAX via **`get_set`** and **`window.ms3ProductSets.render()`** ([API](/en/components/ms3productsets/api), [integration](/en/components/ms3productsets/integration))
- **Cache** — TTL from **`ms3productsets.cache_lifetime`**; **`0`** disables cache ([system settings](/en/components/ms3productsets/settings))
- **Cart** — buttons with **`data-add-to-cart`**, “add whole set” (**`data-add-set`**) via **`productsets.js`** and **`add_to_cart`** on the connector
- **Manager UI** — **Components → Product sets** (VueTools + PrimeVue): templates, apply to categories, unbind ([manager guide](/en/components/ms3productsets/admin), [interface](/en/components/ms3productsets/interface))
- **Plugins** — sync TVs to the DB on product save, clean links when a resource is deleted ([architecture](/en/components/ms3productsets/architecture))
- **Localization** — component lexicon; on the frontend use **`mspsLexiconScript`** (`window.mspsLexicon`, `window.mspsConfig`)

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — products and categories
- **[pdoTools](/en/components/pdotools/) 3.0.0+**
- **VueTools** — “Product sets” manager page

## Installation

See [Quick start](/en/components/ms3productsets/quick-start) for requirements and ModStore steps.

### Via ModStore

1. [Connect ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3**, **pdoTools** and **VueTools** are installed
4. Find **ms3ProductSets**, click **Download**, then **Install**
5. **Settings → Clear cache**

Package is available at [modstore.pro](https://modstore.pro/).

### After installation

Load **`mspsLexiconScript`**, **`productsets.css`** and **`productsets.js`**, add **`ms3ProductSets`** to the product or landing template. Adjust limits and cache in [system settings](/en/components/ms3productsets/settings) (namespace **`ms3productsets`**) if needed.

See: [Quick start](/en/components/ms3productsets/quick-start) and [Frontend setup](/en/components/ms3productsets/frontend).

## Terms

| Term | Description |
|------|-------------|
| **Set** | Recommended product list for a context (`resource_id`, type, category) |
| **Set type** | Logic mode: `buy_together`, `similar`, `vip`, etc. |
| **Manual links** | Rows in **`ms3_product_sets`** (and/or TV values) defined by a manager |
| **Set template** | Row in **`ms3_product_set_templates`** for bulk apply to categories |
| **Auto recommendations** | ID selection without manual links (category, orders, catalog) |
| **VIP set** | Type **`vip`**; without manual links, fallback from **`vip_set_{set_id}`** setting |
