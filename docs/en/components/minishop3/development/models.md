---
title: Models and database schema
description: xPDO models and database structure
---
# Models and database schema

MiniShop3 uses xPDO ORM for database access. All models live in the `MiniShop3\Model` namespace.

## xPDO models

### Core classes

```php
use MiniShop3\Model\msProduct;
use MiniShop3\Model\msProductData;
use MiniShop3\Model\msOrder;
use MiniShop3\Model\msCustomer;

// Get product
$product = $modx->getObject(msProduct::class, $id);

// Get product data
$data = $product->getOne('Data');

// Get order with address
$order = $modx->getObject(msOrder::class, $id);
$address = $order->getOne('Address');

// Get customer
$customer = $modx->getObject(msCustomer::class, ['email' => $email]);
```

### Model relations

```php
// Product → Product data (1:1)
$product->getOne('Data');

// Product → Options (1:N)
$product->getMany('Options');

// Product → Gallery files (1:N)
$data->getMany('Files');

// Order → Order products (1:N)
$order->getMany('Products');

// Order → Customer (N:1)
$order->getOne('msCustomer');

// Customer → Addresses (1:N)
$customer->getMany('Addresses');
```

## Schema file

The database schema is defined in an XML file:

```
core/components/minishop3/schema/minishop3.mysql.schema.xml
```

Main schema attributes:

- **package**: `MiniShop3\Model`
- **baseClass**: `xPDO\Om\xPDOObject`
- **platform**: `mysql`
- **version**: `3.0`

## Database tables

### Products

| Model | Table | Description |
|--------|---------|-------------|
| `msProduct` | `site_content` | Product (extends modResource) |
| `msProductData` | `ms3_products` | Product data (price, article, weight) |
| `msProductFile` | `ms3_product_files` | Product gallery files |
| `msProductOption` | `ms3_product_options` | Product option values |
| `msLink` | `ms3_links` | Product link types |
| `msProductLink` | `ms3_product_links` | Product-to-product links |

#### msProductData — main fields

| Field | Type | Description |
|------|-----|-------------|
| `id` | int | ID (matches resource ID) |
| `article` | varchar(50) | Article/SKU |
| `price` | decimal(12,2) | Price |
| `old_price` | decimal(12,2) | Old price |
| `stock` | decimal(13,3) | Stock quantity |
| `weight` | decimal(13,3) | Weight |
| `image` | varchar(255) | Main image |
| `thumb` | varchar(255) | Thumbnail |
| `vendor_id` | int | Vendor ID |
| `made_in` | varchar(100) | Country of origin |
| `new` | tinyint(1) | "New" flag |
| `popular` | tinyint(1) | "Popular" flag |
| `favorite` | tinyint(1) | "Favorite" flag |
| `tags` | json | Tags |
| `color` | json | Colors |
| `size` | json | Sizes |

### Categories

| Model | Table | Description |
|--------|---------|-------------|
| `msCategory` | `site_content` | Category (extends modResource) |
| `msCategoryMember` | `ms3_product_categories` | Product–category relation |
| `msCategoryOption` | `ms3_category_options` | Category options |

### Orders

| Model | Table | Description |
|--------|---------|-------------|
| `msOrder` | `ms3_orders` | Order |
| `msOrderAddress` | `ms3_order_addresses` | Order delivery address |
| `msOrderProduct` | `ms3_order_products` | Order line items |
| `msOrderLog` | `ms3_order_logs` | Order change history |
| `msOrderStatus` | `ms3_order_statuses` | Order statuses |

#### msOrder — main fields

| Field | Type | Description |
|------|-----|-------------|
| `id` | int | Order ID |
| `user_id` | int | MODX user ID |
| `customer_id` | int | msCustomer ID |
| `token` | varchar(128) | Session token |
| `uuid` | char(36) | Order UUID |
| `num` | varchar(20) | Order number |
| `cost` | decimal(12,2) | Total cost |
| `cart_cost` | decimal(12,2) | Products cost |
| `delivery_cost` | decimal(12,2) | Delivery cost |
| `weight` | decimal(13,3) | Total weight |
| `status_id` | int | Status ID |
| `delivery_id` | int | Delivery method ID |
| `payment_id` | int | Payment method ID |
| `context` | varchar(100) | MODX context |
| `order_comment` | text | Order comment |
| `createdon` | datetime | Created at |
| `updatedon` | datetime | Updated at |

### Customers (NEW in MiniShop3)

| Model | Table | Description |
|--------|---------|-------------|
| `msCustomer` | `ms3_customers` | Store customer |
| `msCustomerAddress` | `ms3_customer_addresses` | Saved customer addresses |
| `msCustomerToken` | `ms3_customer_tokens` | Auth tokens |

#### msCustomer — main fields

| Field | Type | Description |
|------|-----|-------------|
| `id` | int | Customer ID |
| `user_id` | int | Linked modUser ID (optional) |
| `first_name` | varchar(191) | First name |
| `last_name` | varchar(191) | Last name |
| `phone` | varchar(50) | Phone |
| `email` | varchar(191) | Email |
| `password` | varchar(255) | Password hash |
| `is_active` | tinyint(1) | Active |
| `is_blocked` | tinyint(1) | Blocked |
| `email_verified_at` | datetime | Email verification date |
| `orders_count` | int | Order count |
| `total_spent` | decimal(12,2) | Total order sum |
| `last_order_at` | datetime | Last order date |
| `privacy_accepted_at` | datetime | Privacy policy acceptance date |

::: tip Difference from miniShop2
In miniShop2 customer = modUser. In MiniShop3 customer is a separate entity msCustomer, which can optionally be linked to modUser.
:::

### Delivery and payment

| Model | Table | Description |
|--------|---------|-------------|
| `msDelivery` | `ms3_deliveries` | Delivery methods |
| `msPayment` | `ms3_payments` | Payment methods |
| `msDeliveryMember` | `ms3_delivery_payments` | Delivery–payment link |

### Vendors

| Model | Table | Description |
|--------|---------|-------------|
| `msVendor` | `ms3_vendors` | Product vendors |

### Options

| Model | Table | Description |
|--------|---------|-------------|
| `msOption` | `ms3_options` | Option catalog |

### Field configuration (NEW in MiniShop3)

| Model | Table | Description |
|--------|---------|-------------|
| `msModelField` | `ms3_model_fields` | Model field settings |
| `msModelFieldSection` | `ms3_model_field_sections` | Field sections |
| `msProductField` | `ms3_product_fields` | Product fields (legacy) |
| `msPageSection` | `ms3_page_sections` | Page sections (legacy) |
| `msExtraField` | `ms3_extra_fields` | Extra fields |

### Notifications

| Model | Table | Description |
|--------|---------|-------------|
| `msNotificationConfig` | `ms3_notification_configs` | Notification configuration |

## Working with models

### Creating an order

```php
use MiniShop3\Model\msOrder;
use MiniShop3\Model\msOrderProduct;
use MiniShop3\Model\msOrderAddress;

// Create order
$order = $modx->newObject(msOrder::class);
$order->fromArray([
    'customer_id' => $customerId,
    'user_id' => $modx->user->get('id') ?: 0,
    'status_id' => $modx->getOption('ms3_status_new'),
    'delivery_id' => $deliveryId,
    'payment_id' => $paymentId,
    'context' => $modx->context->key,
]);
$order->save();

// Add product to order
$orderProduct = $modx->newObject(msOrderProduct::class);
$orderProduct->fromArray([
    'order_id' => $order->get('id'),
    'product_id' => $productId,
    'name' => $productName,
    'price' => $price,
    'count' => $count,
    'cost' => $price * $count,
    'options' => json_encode($options),
]);
$orderProduct->save();
```

### Working with customer

```php
use MiniShop3\Model\msCustomer;
use MiniShop3\Model\msCustomerAddress;

// Find or create customer
$customer = $modx->getObject(msCustomer::class, ['email' => $email]);
if (!$customer) {
    $customer = $modx->newObject(msCustomer::class);
    $customer->fromArray([
        'email' => $email,
        'first_name' => $firstName,
        'phone' => $phone,
    ]);
    $customer->save();
}

// Add address
$address = $modx->newObject(msCustomerAddress::class);
$address->fromArray([
    'customer_id' => $customer->get('id'),
    'city' => $city,
    'street' => $street,
    'building' => $building,
]);
$address->save();

// Get all customer addresses
$addresses = $customer->getMany('Addresses');
```

### Iterating records

```php
use MiniShop3\Model\msOrder;

// Correct: getIterator() — lazy loading
foreach ($modx->getIterator(msOrder::class, ['status_id' => 2]) as $order) {
    // Process order
}

// Incorrect: getCollection() loads everything into memory
// $orders = $modx->getCollection(msOrder::class, $criteria);
```

## Model architecture

### Difference from miniShop2

miniShop2 used "fat models" — model classes contained a lot of business logic: validation, calculations, notifications, etc.

In MiniShop3 business logic lives in the **service layer** (`src/Services/`, `src/Controllers/`):

```
miniShop2:
┌─────────────────────────────────┐
│           msOrder               │
│  - validation                   │
│  - cost calculation             │
│  - status change                │
│  - notifications                │
│  - database access              │
└─────────────────────────────────┘

MiniShop3:
┌─────────────────┐     ┌─────────────────────┐
│    msOrder      │◄────│  OrderController    │
│  - database     │     │  - business logic   │
│  - relations    │     └─────────────────────┘
│  - service      │     ┌─────────────────────┐
│    calls        │◄────│  NotificationManager│
└─────────────────┘     │  - notifications    │
                        └─────────────────────┘
```

### Pragmatic approach

::: info Compromise with MODX architecture
In modern approaches (Clean Architecture, DDD) models should only handle database access and not know about the service layer, repositories, or controllers.

However, MODX architecture commonly puts business logic in models (`modResource`, `modUser`, etc.). Since some MiniShop3 models extend MODX classes (`msProduct extends modResource`, `msCategory extends modResource`), they must follow similar patterns.

Therefore MiniShop3 models reference services for business logic — a pragmatic compromise for MODX ecosystem compatibility.
:::

### Example: calling a service from a model

```php
// src/Model/msProductData.php
class msProductData extends xPDOSimpleObject
{
    public function getPrice(array $data = []): float
    {
        // Delegate to formatting service
        $ms3 = $this->xpdo->services->get('ms3');
        return $ms3->format->price($this->get('price'));
    }
}
```

## Regenerating models

::: warning Models are maintained manually
In MiniShop3 models are NOT auto-generated from the XML schema via `buildModel()`. They are created and maintained manually in `src/Model/`.

This allows:

- Custom methods in models
- Full PHP 8 type hints
- Full control over model code

**Important:** Do not run `buildModel()` — it will overwrite custom model methods.
:::

### Model file structure

```
src/Model/
├── msProduct.php           # Main model class
├── mysql/
│   └── msProduct.php       # MySQL-specific mapping
```

### Example model

```php
<?php
namespace MiniShop3\Model;

use MODX\Revolution\modResource;

class msProduct extends modResource
{
    // Custom model methods
    public function getPrice(): float
    {
        $data = $this->getOne('Data');
        return $data ? (float)$data->get('price') : 0.0;
    }
}
```

### Example mapping

```php
<?php
namespace MiniShop3\Model\mysql;

class msProduct extends \MiniShop3\Model\msProduct
{
    public static $metaMap = [
        'package' => 'MiniShop3\\Model\\',
        'version' => '3.0',
        'extends' => 'MODX\\Revolution\\modResource',
        'fields' => [
            'class_key' => 'MiniShop3\\Model\\msProduct',
        ],
        // ... other metadata
    ];
}
```

## Phinx migrations

Schema changes are applied via Phinx migrations:

```
core/components/minishop3/migrations/
├── 20240101000000_create_customers_table.php
├── 20240102000000_add_customer_fields.php
└── ...
```

### Running migrations

```bash
cd /path/to/modx
php vendor/bin/phinx migrate -c core/components/minishop3/phinx.php
```

### Example migration

```php
<?php
use Phinx\Migration\AbstractMigration;

class CreateCustomersTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('ms3_customers', [
            'engine' => 'InnoDB',
            'collation' => 'utf8mb4_unicode_ci',
        ]);

        $table
            ->addColumn('email', 'string', ['limit' => 191])
            ->addColumn('first_name', 'string', ['limit' => 191, 'null' => true])
            ->addColumn('phone', 'string', ['limit' => 50, 'null' => true])
            ->addIndex(['email'], ['unique' => true])
            ->create();
    }
}
```

## Relation diagram

```
┌─────────────┐       ┌─────────────────┐
│  msProduct  │──1:1──│  msProductData  │
│ (modResource)│       │  (ms3_products) │
└──────┬──────┘       └────────┬────────┘
       │                       │
       │ 1:N                   │ 1:N
       ▼                       ▼
┌──────────────┐       ┌────────────────┐
│msProductOption│       │ msProductFile  │
└──────────────┘       └────────────────┘

┌─────────────┐       ┌─────────────────┐
│   msOrder   │──1:1──│ msOrderAddress  │
└──────┬──────┘       └─────────────────┘
       │
       ├──1:N──▶ msOrderProduct
       │
       ├──N:1──▶ msCustomer ──1:N──▶ msCustomerAddress
       │
       ├──N:1──▶ msDelivery
       │
       └──N:1──▶ msPayment
```
