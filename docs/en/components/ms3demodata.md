---
title: MS3 Demo Data
description: Demo data generator for MiniShop3 — vendors, categories, products, customers, orders
logo: https://modstore.pro/assets/extras/ms3demodata/logo.png
author: modx-pro
repository: https://github.com/modx-pro/ms3demodata
---
# MS3 Demo Data

Component for quick generation of MiniShop3 demo data: vendors, categories, products, customers, and orders. Useful for testing the store, client demos, and development.

## Features

- Generate vendors with realistic names
- Create category hierarchy with configurable depth
- Generate products with prices, SKUs, and descriptions
- Create demo customers (msCustomer)
- Generate orders with history over a given period
- Three preset data packages (S, M, L)
- Optional async execution via [Scheduler](/en/components/scheduler/)

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MiniShop3 | 1.0.0+ |

### Dependencies

| Package | Required | Purpose |
|---------|----------|---------|
| **MiniShop3** | Yes | Store data models |
| **Scheduler** | Optional | Async execution for large packages |
| **VueTools** | Yes | Vue 3 and PrimeVue for the UI |

### Composer libraries

| Library | Version | Purpose |
|---------|---------|---------|
| [fakerphp/faker](https://github.com/FakerPHP/Faker) | ^1.23 | Realistic data generation |

## Installation

### Via package manager

1. Go to **Extras → Installer**
2. Click **Download Extras**
3. Find **MS3 Demo Data** in the list
4. Click **Download** then **Install**

### From source (for developers)

```bash
git clone https://github.com/biz87/ms3DemoData.git
cd ms3demodata

# PHP dependencies
cd core/components/ms3demodata
composer install

# Vue widgets
cd ../../../vueManager
npm install
npm run build
```

## Usage

After installation the component is available in **Extras → MS3 Demo Data**.

### Interface

The component interface lets you:

1. **Select data package** — size of the generated set
2. **Set parent resource** — where to create categories
3. **Choose templates** — for categories and products
4. **Set file source** — Media Source for images
5. **Choose execution mode** — sync or via Scheduler
6. **Enable/disable customers and orders**

### Data packages

Three preset packages are available:

#### Small (S)

| Entity | Count |
|--------|-------|
| Vendors | 4 |
| Categories | 6 (2 root, depth up to 3) |
| Products | 100 |
| Customers | 20 |
| Orders | 50 (1–3 products, last 6 months) |

Good for quick testing and demos.

#### Medium (M)

| Entity | Count |
|--------|-------|
| Vendors | 20 |
| Categories | 20 (7 root, depth up to 3) |
| Products | 2,000 |
| Customers | 200 |
| Orders | 500 (1–5 products, over a year) |

Good for testing filter and search performance.

#### Large (L)

| Entity | Count |
|--------|-------|
| Vendors | 100 |
| Categories | 100 (33 root, depth up to 4) |
| Products | 200,000 |
| Customers | 5,000 |
| Orders | 20,000 (1–10 products, over 2 years) |

For load testing. **Using Scheduler is recommended**.

::: warning Large package
Generating the large package (L) synchronously can take a long time and cause timeouts. Use Scheduler for background generation.
:::

## Execution modes

### Synchronous

Generation runs immediately and the result is returned in the browser. Suitable for small and medium packages.

### Via Scheduler

The job is queued in Scheduler and runs in the background. Required for large packages. Requires the [Scheduler](/en/components/scheduler/) component to be installed.

## Generated data

### Vendors

- Company name
- Description
- Logo (from image pool)
- Email, phone, address

### Categories

- Hierarchical structure with configurable depth
- Names from a category dictionary
- Auto transliteration for alias
- Applied template

### Products

- Product name and description
- SKU
- Price (random in range)
- Random vendor
- Random category
- Applied template

### Customers

- Created as msCustomer records
- Name (locale-specific)
- Email and phone
- Delivery address

### Orders

- Random customer from created set
- Random products (count per package config)
- Random date in range
- Random order status
- Total cost calculated

## For developers

### Component structure

```
core/components/ms3demodata/
├── src/
│   ├── MS3DemoData.php              # Main facade
│   ├── Services/
│   │   └── DemoDataGenerator.php    # Generation coordinator
│   └── Generators/                  # Data generators
│       ├── AbstractGenerator.php    # Base class
│       ├── VendorGenerator.php
│       ├── CategoryGenerator.php
│       ├── ProductGenerator.php
│       ├── CustomerGenerator.php
│       └── OrderGenerator.php
├── config/packages/                 # Package configs
│   ├── small.php
│   ├── medium.php
│   └── large.php
├── elements/tasks/                  # Scheduler tasks
└── lexicon/{ru,en}/                 # Localization
```

### Programmatic run

```php
// Get service
$ms3demodata = $modx->services->get('ms3demodata');

// Create generator
$generator = new \MS3DemoData\Services\DemoDataGenerator($modx);

// Run generation
$result = $generator->run([
    'package' => 'S',           // S, M or L
    'parent_id' => 0,           // Parent resource ID
    'category_template' => 1,   # Category template ID
    'product_template' => 2,    # Product template ID
    'source_id' => 1,           # Media Source ID
    'generate_customers' => true,
    'generate_orders' => true,
]);

if ($result['success']) {
    echo $result['message'];
    // "Generation completed in 5.23 sec. Created: vendors — 4, categories — 6, products — 100, customers — 20, orders — 50"
}
```

### Custom generator

To add a new data type, create a class extending `AbstractGenerator`:

```php
namespace MS3DemoData\Generators;

class MyCustomGenerator extends AbstractGenerator
{
    protected function loadData(): void
    {
        $this->data = [
            'items' => ['Item 1', 'Item 2', 'Item 3'],
        ];
    }

    public function generate(): array
    {
        $ids = [];
        $count = $this->config['my_items']['count'] ?? 10;

        for ($i = 0; $i < $count; $i++) {
            $item = $this->modx->newObject('MyModel');
            $item->set('name', $this->faker->sentence(3));

            if ($item->save()) {
                $ids[] = $item->get('id');
                $this->created++;
            } else {
                $this->errors++;
            }
        }

        return $ids;
    }
}
```

### Package configuration

Package config files (`config/packages/*.php`) return an array of options:

```php
return [
    'code' => 'S',
    'name' => 'Small',

    'vendors' => [
        'count' => 4,
    ],

    'categories' => [
        'count' => 6,
        'root_count' => 2,
        'max_depth' => 3,
    ],

    'products' => [
        'count' => 100,
    ],

    'customers' => [
        'count' => 20,
    ],

    'orders' => [
        'count' => 50,
        'min_products' => 1,
        'max_products' => 3,
        'date_from' => '-6 months',
        'date_to' => 'now',
    ],
];
```

## Localization

The component supports Russian and English. Lexicon files are in `lexicon/{ru,en}/default.inc.php`.
