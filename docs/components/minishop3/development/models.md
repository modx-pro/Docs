---
title: Модели и схема БД
---
# Модели и схема базы данных

MiniShop3 использует xPDO ORM для работы с базой данных. Все модели находятся в namespace `MiniShop3\Model`.

## xPDO модели

### Основные классы

```php
use MiniShop3\Model\msProduct;
use MiniShop3\Model\msProductData;
use MiniShop3\Model\msOrder;
use MiniShop3\Model\msCustomer;

// Получение товара
$product = $modx->getObject(msProduct::class, $id);

// Получение данных товара
$data = $product->getOne('Data');

// Получение заказа с адресом
$order = $modx->getObject(msOrder::class, $id);
$address = $order->getOne('Address');

// Получение клиента
$customer = $modx->getObject(msCustomer::class, ['email' => $email]);
```

### Связи между моделями

```php
// Товар → Данные товара (1:1)
$product->getOne('Data');

// Товар → Опции (1:N)
$product->getMany('Options');

// Товар → Файлы галереи (1:N)
$data->getMany('Files');

// Заказ → Товары в заказе (1:N)
$order->getMany('Products');

// Заказ → Клиент (N:1)
$order->getOne('msCustomer');

// Клиент → Адреса (1:N)
$customer->getMany('Addresses');
```

## Schema-файл

Схема базы данных определена в XML-файле:

```
core/components/minishop3/schema/minishop3.mysql.schema.xml
```

Основные атрибуты схемы:

- **package**: `MiniShop3\Model`
- **baseClass**: `xPDO\Om\xPDOObject`
- **platform**: `mysql`
- **version**: `3.0`

## Таблицы базы данных

### Товары

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msProduct` | `site_content` | Товар (расширяет modResource) |
| `msProductData` | `ms3_products` | Данные товара (цена, артикул, вес) |
| `msProductFile` | `ms3_product_files` | Файлы галереи товара |
| `msProductOption` | `ms3_product_options` | Значения опций товара |
| `msLink` | `ms3_links` | Типы связей товаров |
| `msProductLink` | `ms3_product_links` | Связи между товарами |

#### msProductData — основные поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID (совпадает с ID ресурса) |
| `article` | varchar(50) | Артикул |
| `price` | decimal(12,2) | Цена |
| `old_price` | decimal(12,2) | Старая цена |
| `stock` | decimal(13,3) | Остаток на складе |
| `weight` | decimal(13,3) | Вес |
| `image` | varchar(255) | Основное изображение |
| `thumb` | varchar(255) | Превью изображения |
| `vendor_id` | int | ID производителя |
| `made_in` | varchar(100) | Страна производства |
| `new` | tinyint(1) | Флаг «Новинка» |
| `popular` | tinyint(1) | Флаг «Популярный» |
| `favorite` | tinyint(1) | Флаг «Избранное» |
| `tags` | json | Теги |
| `color` | json | Цвета |
| `size` | json | Размеры |

### Категории

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msCategory` | `site_content` | Категория (расширяет modResource) |
| `msCategoryMember` | `ms3_product_categories` | Связь товар-категория |
| `msCategoryOption` | `ms3_category_options` | Опции категории |

### Заказы

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msOrder` | `ms3_orders` | Заказ |
| `msOrderAddress` | `ms3_order_addresses` | Адрес доставки заказа |
| `msOrderProduct` | `ms3_order_products` | Товары в заказе |
| `msOrderLog` | `ms3_order_logs` | История изменений заказа |
| `msOrderStatus` | `ms3_order_statuses` | Статусы заказов |

#### msOrder — основные поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID заказа |
| `user_id` | int | ID пользователя MODX |
| `customer_id` | int | ID клиента msCustomer |
| `token` | varchar(128) | Токен сессии |
| `uuid` | char(36) | UUID заказа |
| `num` | varchar(20) | Номер заказа |
| `cost` | decimal(12,2) | Общая стоимость |
| `cart_cost` | decimal(12,2) | Стоимость товаров |
| `delivery_cost` | decimal(12,2) | Стоимость доставки |
| `weight` | decimal(13,3) | Общий вес |
| `status_id` | int | ID статуса |
| `delivery_id` | int | ID способа доставки |
| `payment_id` | int | ID способа оплаты |
| `context` | varchar(100) | Контекст MODX |
| `order_comment` | text | Комментарий к заказу |
| `createdon` | datetime | Дата создания |
| `updatedon` | datetime | Дата обновления |

### Клиенты (NEW в MiniShop3)

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msCustomer` | `ms3_customers` | Клиент магазина |
| `msCustomerAddress` | `ms3_customer_addresses` | Сохранённые адреса клиента |
| `msCustomerToken` | `ms3_customer_tokens` | Токены авторизации |

#### msCustomer — основные поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID клиента |
| `user_id` | int | ID связанного modUser (опционально) |
| `first_name` | varchar(191) | Имя |
| `last_name` | varchar(191) | Фамилия |
| `phone` | varchar(50) | Телефон |
| `email` | varchar(191) | Email |
| `password` | varchar(255) | Хэш пароля |
| `is_active` | tinyint(1) | Активен |
| `is_blocked` | tinyint(1) | Заблокирован |
| `email_verified_at` | datetime | Дата подтверждения email |
| `orders_count` | int | Количество заказов |
| `total_spent` | decimal(12,2) | Сумма всех заказов |
| `last_order_at` | datetime | Дата последнего заказа |
| `privacy_accepted_at` | datetime | Дата принятия политики |

::: tip Отличие от miniShop2
В miniShop2 клиент = modUser. В MiniShop3 клиент — отдельная сущность msCustomer, которая может быть связана с modUser опционально.
:::

### Доставка и оплата

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msDelivery` | `ms3_deliveries` | Способы доставки |
| `msPayment` | `ms3_payments` | Способы оплаты |
| `msDeliveryMember` | `ms3_delivery_payments` | Связь доставка-оплата |

### Производители

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msVendor` | `ms3_vendors` | Производители товаров |

### Опции

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msOption` | `ms3_options` | Справочник опций |

### Конфигурация полей (NEW в MiniShop3)

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msModelField` | `ms3_model_fields` | Настройки полей моделей |
| `msModelFieldSection` | `ms3_model_field_sections` | Секции полей |
| `msProductField` | `ms3_product_fields` | Поля товара (legacy) |
| `msPageSection` | `ms3_page_sections` | Секции страниц (legacy) |
| `msExtraField` | `ms3_extra_fields` | Дополнительные поля |

### Уведомления

| Модель | Таблица | Описание |
|--------|---------|----------|
| `msNotificationConfig` | `ms3_notification_configs` | Конфигурация уведомлений |

## Примеры работы с моделями

### Создание заказа

```php
use MiniShop3\Model\msOrder;
use MiniShop3\Model\msOrderProduct;
use MiniShop3\Model\msOrderAddress;

// Создание заказа
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

// Добавление товара в заказ
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

### Работа с клиентом

```php
use MiniShop3\Model\msCustomer;
use MiniShop3\Model\msCustomerAddress;

// Поиск или создание клиента
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

// Добавление адреса
$address = $modx->newObject(msCustomerAddress::class);
$address->fromArray([
    'customer_id' => $customer->get('id'),
    'city' => $city,
    'street' => $street,
    'building' => $building,
]);
$address->save();

// Получение всех адресов клиента
$addresses = $customer->getMany('Addresses');
```

### Итерация по записям

```php
use MiniShop3\Model\msOrder;

// Правильно: getIterator() — lazy loading
foreach ($modx->getIterator(msOrder::class, ['status_id' => 2]) as $order) {
    // Обработка заказа
}

// Неправильно: getCollection() загружает всё в память
// $orders = $modx->getCollection(msOrder::class, $criteria);
```

## Архитектура моделей

### Отличие от miniShop2

В miniShop2 использовались «толстые модели» (Fat Models) — классы моделей содержали большое количество бизнес-логики: валидацию, расчёты, отправку уведомлений и т.д.

В MiniShop3 бизнес-логика вынесена в **сервисный слой** (`src/Services/`, `src/Controllers/`):

```
miniShop2:
┌─────────────────────────────────┐
│           msOrder               │
│  - валидация                    │
│  - расчёт стоимости             │
│  - смена статуса                │
│  - отправка уведомлений         │
│  - работа с БД                  │
└─────────────────────────────────┘

MiniShop3:
┌─────────────────┐     ┌─────────────────────┐
│    msOrder      │◄────│  OrderController    │
│  - работа с БД  │     │  - бизнес-логика    │
│  - связи        │     └─────────────────────┘
│  - вызов        │     ┌─────────────────────┐
│    сервисов     │◄────│  NotificationManager│
└─────────────────┘     │  - уведомления      │
                        └─────────────────────┘
```

### Прагматичный подход

::: info Компромисс с архитектурой MODX
В современных концепциях (Clean Architecture, DDD) модели должны отвечать только за работу с базой данных и не знать о сервисном слое, репозиториях и контроллерах.

Однако архитектура MODX повсеместно использует бизнес-логику в моделях (`modResource`, `modUser` и др.). Поскольку некоторые модели MiniShop3 расширяют классы MODX (`msProduct extends modResource`, `msCategory extends modResource`), они обязаны следовать аналогичным паттернам.

Поэтому модели MiniShop3 содержат ссылки на сервисы для вызова методов бизнес-логики — это прагматичный компромисс для совместимости с экосистемой MODX.
:::

### Пример: вызов сервиса из модели

```php
// src/Model/msProductData.php
class msProductData extends xPDOSimpleObject
{
    public function getPrice(array $data = []): float
    {
        // Делегирование в сервис форматирования
        $ms3 = $this->xpdo->services->get('ms3');
        return $ms3->format->price($this->get('price'));
    }
}
```

## Регенерация моделей

::: warning Модели создаются вручную
В MiniShop3 модели НЕ генерируются автоматически из XML-схемы через `buildModel()`. Они создаются и поддерживаются вручную в директории `src/Model/`.

Это позволяет:

- Добавлять кастомные методы в модели
- Использовать полную типизацию PHP 8
- Иметь полный контроль над кодом моделей

**Важно:** Не запускайте `buildModel()` — это перезапишет кастомные методы моделей.
:::

### Структура файлов модели

```
src/Model/
├── msProduct.php           # Основной класс модели
├── mysql/
│   └── msProduct.php       # MySQL-специфичный маппинг
```

### Пример модели

```php
<?php
namespace MiniShop3\Model;

use MODX\Revolution\modResource;

class msProduct extends modResource
{
    // Кастомные методы модели
    public function getPrice(): float
    {
        $data = $this->getOne('Data');
        return $data ? (float)$data->get('price') : 0.0;
    }
}
```

### Пример маппинга

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
        // ... остальные метаданные
    ];
}
```

## Миграции Phinx

Изменения схемы БД выполняются через миграции Phinx:

```
core/components/minishop3/migrations/
├── 20240101000000_create_customers_table.php
├── 20240102000000_add_customer_fields.php
└── ...
```

### Запуск миграций

```bash
cd /path/to/modx
php vendor/bin/phinx migrate -c core/components/minishop3/phinx.php
```

### Пример миграции

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

## Диаграмма связей

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
