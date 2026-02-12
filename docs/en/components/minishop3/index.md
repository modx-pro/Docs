---
title: MiniShop3
description: Modern e-commerce component for MODX 3
logo: https://modstore.pro/assets/extras/minishop3/logo-lg.png
author: biz87
repository: https://github.com/modx-pro/MiniShop3

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'Differences from miniShop2', link: 'differences-from-ms2' },
  { text: 'System settings', link: 'settings' },
  {
    text: 'Snippets',
    link: 'snippets/',
    items: [
      { text: 'msProducts', link: 'snippets/msproducts' },
      { text: 'msCart', link: 'snippets/mscart' },
      { text: 'msOrder', link: 'snippets/msorder' },
      { text: 'msGetOrder', link: 'snippets/msgetorder' },
      { text: 'msGallery', link: 'snippets/msgallery' },
      { text: 'msOptions', link: 'snippets/msoptions' },
      { text: 'msProductOptions', link: 'snippets/msproductoptions' },
      { text: 'msCustomer', link: 'snippets/mscustomer' },
      { text: 'msOrderTotal', link: 'snippets/msordertotal' },
    ],
  },
  {
    text: 'Manager interface',
    items: [
      { text: 'Category', link: 'interface/category' },
      { text: 'Product', link: 'interface/product' },
      { text: 'Gallery', link: 'interface/gallery' },
      {
        text: 'Settings',
        link: 'interface/settings',
        items: [
          { text: 'Deliveries', link: 'interface/settings/deliveries' },
          { text: 'Payments', link: 'interface/settings/payments' },
          { text: 'Vendors', link: 'interface/settings/vendors' },
          { text: 'Links', link: 'interface/settings/links' },
          { text: 'Options', link: 'interface/settings/options' },
        ],
      },
      {
        text: 'Utilities',
        link: 'interface/utilities',
        items: [
          { text: 'Gallery', link: 'interface/utilities/gallery' },
          { text: 'Import', link: 'interface/utilities/import' },
          { text: 'Product fields', link: 'interface/utilities/product-fields' },
          { text: 'TV fields', link: 'interface/utilities/extra-fields' },
          { text: 'Grid columns', link: 'interface/utilities/grid-columns' },
          { text: 'Model fields', link: 'interface/utilities/model-fields' },
        ],
      },
    ],
  },
  {
    text: 'Frontend interface',
    items: [
      { text: 'Catalog', link: 'frontend/catalog' },
      { text: 'Product page', link: 'frontend/product' },
      { text: 'Cart', link: 'frontend/cart' },
      { text: 'Checkout', link: 'frontend/order' },
      { text: 'Thank you for your order', link: 'frontend/thanks' },
      {
        text: 'Customer account',
        items: [
          { text: 'Customer profile', link: 'frontend/customer-profile' },
          { text: 'Shipping addresses', link: 'frontend/customer-addresses' },
          { text: 'Order history', link: 'frontend/customer-orders' },
        ],
      },
    ],
  },
  {
    text: 'Development',
    items: [
      {
        text: 'Events',
        link: 'development/events',
        items: [
          { text: 'Plugin guide', link: 'development/events/plugins-guide' },
          { text: 'Cart', link: 'development/events/cart' },
          { text: 'Order', link: 'development/events/order' },
          { text: 'Order model', link: 'development/events/order-model' },
          { text: 'Order item', link: 'development/events/order-product' },
          { text: 'Cost', link: 'development/events/cost' },
          { text: 'Status', link: 'development/events/status' },
          { text: 'Customer', link: 'development/events/customer' },
          { text: 'Product', link: 'development/events/product' },
          { text: 'Vendor', link: 'development/events/vendor' },
          { text: 'Notifications', link: 'development/events/notifications' },
          { text: 'Import', link: 'development/events/import' },
          { text: 'Manager', link: 'development/events/manager' },
        ],
      },
      { text: 'REST API', link: 'development/api' },
      { text: 'API Router', link: 'development/routing' },
      { text: 'JavaScript API', link: 'development/javascript' },
      { text: 'Frontend JavaScript', link: 'development/frontend-js' },
      { text: 'Scheduler', link: 'development/scheduler' },
      { text: 'Models and database schema', link: 'development/models' },
      { text: 'Service layer', link: 'development/services' },
    ],
  },
]
---
# MiniShop3

Modern e-commerce component for MODX 3, completely rewritten to leverage new platform capabilities.

## Key features

### For MODX 3

MiniShop3 is designed specifically for MODX Revolution 3.x and takes full advantage of the new version:

- **PHP 8.1+** — modern syntax, typing, attributes
- **Namespaces** — all classes live in the `MiniShop3\` namespace
- **PSR-4 autoloading** — via Composer
- **Phinx migrations** — database schema versioning

### Improved architecture

- **REST API** — full-featured API for headless integrations
- **Service Container** — dependencies via MODX DI container
- **Vue 3 + PrimeVue** — modern Manager UI via [VueTools](/en/components/vuetools/)
- **Modern frontend** — no jQuery, native JavaScript

### Compatibility

MiniShop3 maintains backward compatibility with miniShop2 at the level of:

- Snippet names (`msProducts`, `msCart`, `msOrder`, etc.)
- Chunk and placeholder structure
- Snippet parameters

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### MODX dependencies

- **pdoTools 3.x** — for snippets and the Fenom template engine
- **[VueTools](/en/components/vuetools/)** — Vue 3 and PrimeVue for the Manager interface
- **[Scheduler](/en/components/scheduler/)** *(optional)* — for background tasks (import, notifications, cleanup)

::: warning VueTools
MiniShop3 uses Vue 3 for the modern Manager interface. The **[VueTools](/en/components/vuetools/)** package must be installed before or together with MiniShop3. If the package is missing, a message with installation instructions will be shown.
:::

### Composer libraries

MiniShop3 uses the following PHP libraries (included in the package):

| Library | Version | Purpose |
|---------|---------|---------|
| [nikic/fast-route](https://github.com/nikic/FastRoute) | ^1.3 | REST API routing |
| [rakit/validation](https://github.com/rakit/validation) | ^1.4 | Form and API data validation |
| [intervention/image](https://image.intervention.io/) | ^3.0 | Image processing (resize, watermarks) |
| [robmorgan/phinx](https://phinx.org/) | ^0.16 | Database migrations |
| [ramsey/uuid](https://uuid.ramsey.dev/) | ^4.7 | UUID generation for tokens |

## Installation

### Method 1: Via package manager (recommended)

Standard installation via the MODX package manager with repositories enabled:

1. Go to **Extras → Installer**
2. Click **Download Extras**
3. Install **[VueTools](/en/components/vuetools/)** (if not already installed)
4. Find **MiniShop3** in the list of available packages
5. Click **Download** and then **Install**

The package is available in [modx.com](https://modx.com/extras/) and [modstore.pro](https://modstore.pro/) repositories.

### Method 2: Upload transport package

If repositories are unavailable or you need a specific version:

1. Download the transport package from the [GitHub releases](https://github.com/modx-pro/MiniShop3/releases) page
2. Upload the `.transport.zip` file to `/core/packages/` of your site
3. Go to **Extras → Installer**
4. Click **Search locally for packages**
5. Find MiniShop3 in the list and click **Install**

### Method 3: Installation from source (for developers)

This method is for developers who need the latest changes:

::: tip Prerequisites
Before installing MiniShop3, make sure the **[VueTools](/en/components/vuetools/)** package is installed on the site. It provides Vue 3 and PrimeVue via import maps.
:::

```bash
# Clone the repository
git clone https://github.com/modx-pro/MiniShop3.git
cd MiniShop3

# Install PHP dependencies
composer install

# Build Vue widgets (requires Node.js 18+)
cd vueManager
npm install
npm run build
cd ..

# Build and install the component
# Open _build/build.php in the browser or run:
php _build/build.php
```

After installation, go to **Extras → MiniShop3** to configure the store.

A detailed initial setup guide is on the [Quick start](quick-start) page.

## Component structure

### Core (core/components/minishop3/)

```
core/components/minishop3/
├── bootstrap.php           # Component initialization
├── config/
│   ├── routes/             # REST API routes
│   ├── mgr/                # Manager configuration
│   ├── combos/             # Manager comboboxes
│   ├── filters/            # Grid filters
│   └── ms3.services.d/     # Custom services
├── controllers/            # Manager page controllers
├── elements/
│   ├── snippets/           # Snippets (msProducts, msCart, msOrder...)
│   ├── chunks/             # Chunks (Fenom templates)
│   ├── plugins/            # MODX plugins
│   ├── tasks/              # Scheduler tasks
│   └── templates/          # Email templates
├── lexicon/                # Lexicon files (en, ru)
├── migrations/             # Phinx migrations
├── schema/                 # xPDO database schema
├── seeds/                  # Database seeds
├── src/
│   ├── Controllers/        # Business logic (Cart, Order, Customer)
│   ├── Model/              # xPDO models
│   ├── Processors/         # AJAX processors
│   ├── Services/           # Services (Format, AuthManager...)
│   ├── Notifications/      # Notification system
│   ├── Router/             # API router
│   ├── Middleware/         # API middleware
│   ├── Utils/              # Utilities (ImportCSV...)
│   ├── MiniShop3.php       # Main component class
│   └── ServiceRegistry.php # Service registry
└── vendor/                 # Composer dependencies
```

### Frontend (assets/components/minishop3/)

```
assets/components/minishop3/
├── api.php                 # REST API entry point
├── connector.php           # Manager AJAX connector
├── js/
│   ├── mgr/                # Manager JavaScript (ExtJS)
│   └── web/                # Site JavaScript (native JS)
├── css/
│   ├── mgr/                # Manager styles
│   └── web/                # Site styles
├── img/                    # Images
├── payment/                # Payment system handlers
└── plugins/                # JavaScript plugins
```
