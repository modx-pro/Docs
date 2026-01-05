---
title: Отличия от miniShop2
---
# Отличия от miniShop2

Это руководство поможет разработчикам, знакомым с miniShop2, быстро освоить MiniShop3 и понять ключевые изменения.

## Системные требования

| Требование | miniShop2 | MiniShop3 |
|------------|-----------|-----------|
| MODX | 2.3+ | **3.0.0+** |
| PHP | 7.0+ | **8.1+** |
| MySQL | 5.5+ | 5.7+ / MariaDB 10.3+ |
| pdoTools | 2.x | **3.x** |

## Архитектура

### Пространства имён (Namespaces)

miniShop2 использовал классы без пространств имён. В MiniShop3 все классы организованы в namespace `MiniShop3\`:

```php
// miniShop2
$ms2 = $modx->getService('minishop2');
$product = $modx->getObject('msProduct', $id);
$order = $modx->getObject('msOrder', $id);

// MiniShop3
use MiniShop3\MiniShop3;
use MiniShop3\Model\msProduct;
use MiniShop3\Model\msOrder;

$ms3 = $modx->services->get('ms3');
$product = $modx->getObject(msProduct::class, $id);
$order = $modx->getObject(msOrder::class, $id);
```

### Service Container

MiniShop3 использует DI-контейнер MODX 3 для регистрации сервисов:

```php
// miniShop2
$ms2 = $modx->getService('minishop2');
$cart = $ms2->cart;
$order = $ms2->order;

// MiniShop3
$ms3 = $modx->services->get('ms3');
$cart = $modx->services->get('ms3_cart');
$order = $modx->services->get('ms3_order');
```

### Миграции базы данных

miniShop2 управлял схемой БД через xPDO схему и build-процесс. MiniShop3 использует **Phinx** для версионирования миграций:

```bash
# Запуск миграций
php vendor/bin/phinx migrate -c phinx.php
```

При установке компонента миграции выполняются автоматически.

## Системные настройки

Все системные настройки переименованы с `ms2_` на `ms3_`:

| miniShop2 | MiniShop3 |
|-----------|-----------|
| `ms2_template_product_default` | `ms3_template_product_default` |
| `ms2_template_category_default` | `ms3_template_category_default` |
| `ms2_category_grid_fields` | `ms3_category_grid_fields` |
| `ms2_product_extra_fields` | `ms3_product_extra_fields` |
| `ms2_frontend_js` | `ms3_frontend_assets` |
| `ms2_frontend_css` | (объединено в `ms3_frontend_assets`) |
| `ms2_price_format` | `ms3_price_format` |
| `ms2_weight_format` | `ms3_weight_format` |

### Новые настройки MiniShop3

MiniShop3 добавляет множество новых настроек:

**API и безопасность:**
- `ms3_cors_allowed_origins` — разрешённые домены для CORS
- `ms3_api_debug` — режим отладки API
- `ms3_rate_limit_max_attempts` — лимит запросов API
- `ms3_customer_token_ttl` — время жизни токена клиента

**Клиенты (новая сущность):**
- `ms3_customer_auto_register_on_order` — авторегистрация при заказе
- `ms3_customer_auto_login_after_register` — автовход после регистрации
- `ms3_customer_require_email_verification` — верификация email
- `ms3_customer_sync_enabled` — синхронизация с modUser

**Валюта:**
- `ms3_currency_symbol` — символ валюты (₽, $, €)
- `ms3_currency_position` — позиция символа (before/after)

## REST API

### Точка входа

```php
// miniShop2 — единый action.php
/assets/components/minishop2/action.php

// MiniShop3 — раздельные endpoint'ы
/assets/components/minishop3/connector.php  // Manager API
/assets/components/minishop3/api.php        // Web API (v1)
```

### Web API (новое в MiniShop3)

MiniShop3 предоставляет полноценный REST API для headless-интеграций:

```javascript
// Корзина
POST /api/v1/cart/add
POST /api/v1/cart/remove
POST /api/v1/cart/change
GET  /api/v1/cart/get
POST /api/v1/cart/clean

// Заказ
GET  /api/v1/order/get
POST /api/v1/order/add
POST /api/v1/order/submit
GET  /api/v1/order/cost

// Клиент
POST /api/v1/customer/token/get
GET  /api/v1/customer/addresses
```

### Авторизация API

```javascript
// miniShop2 — без авторизации
$.post('/assets/components/minishop2/action.php', {
    action: 'cart/add',
    id: 123
});

// MiniShop3 — токенная авторизация
const token = getCookie('MS3TOKEN');
fetch('/api/v1/cart/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-MS3-Token': token
    },
    body: JSON.stringify({ id: 123, count: 1 })
});
```

## JavaScript API

### Глобальный объект

```javascript
// miniShop2
miniShop2.Cart.add(123);
miniShop2.Order.submit();
miniShop2Config.actionUrl;

// MiniShop3
ms3.cart.add(123);
ms3.order.submit();
ms3Config.apiUrl;
```

### Callbacks → Hooks

```javascript
// miniShop2 — callbacks
miniShop2.Callbacks.add('Cart.add.response.success', 'my_callback', function(response) {
    console.log('Товар добавлен', response);
});

miniShop2.Callbacks.remove('Cart.add.response.success', 'my_callback');

// MiniShop3 — hooks
ms3.hooks.add('afterAddToCart', function({ response }) {
    console.log('Товар добавлен', response);
});

ms3.hooks.remove('afterAddToCart', 'my_hook');
```

### Список hooks MiniShop3

| miniShop2 Callback | MiniShop3 Hook |
|--------------------|----------------|
| `Cart.add.before` | `beforeAddToCart` |
| `Cart.add.response.success` | `afterAddToCart` |
| `Cart.remove.response.success` | `afterRemoveFromCart` |
| `Cart.change.response.success` | `afterChangeCart` |
| `Order.submit.before` | `beforeSubmitOrder` |
| `Order.submit.response.success` | `afterSubmitOrder` |

### Data-атрибуты

```html
<!-- miniShop2 -->
<form class="ms2_form" method="post">
    <button type="submit" name="ms2_action" value="cart/add">
        В корзину
    </button>
</form>

<!-- MiniShop3 — декларативный подход -->
<button type="button"
        data-ms-action="cart/add"
        data-id="123"
        data-count="1">
    В корзину
</button>
```

## События плагинов

Большинство событий сохранили свои имена, но изменились передаваемые параметры:

```php
// miniShop2
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $cart = $scriptProperties['cart'];  // Класс msCartHandler
        break;
}

// MiniShop3
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $cart = $scriptProperties['cart'];  // MiniShop3\Controllers\Cart\Cart
        break;
}
```

### Новые события MiniShop3

- `msOnCustomerCreate` — создание клиента
- `msOnCustomerUpdate` — обновление клиента
- `msOnCustomerLogin` — вход клиента
- `msOnBeforeAPIRequest` — перед API запросом
- `msOnAfterAPIRequest` — после API запроса

## Сниппеты

### Имена сниппетов (совместимость сохранена)

Все сниппеты сохранили свои имена:
- `msProducts`
- `msCart`
- `msOrder`
- `msGetOrder`
- `msGallery`
- `msOptions`
- `msProductOptions`

### Новые сниппеты

- `msCustomer` — личный кабинет клиента
- `msOrderTotal` — итоги заказа (замена msMiniCart)

### msMiniCart → msOrderTotal

```fenom
{* miniShop2 *}
{'!msMiniCart' | snippet}

{* MiniShop3 *}
{set $cart = '!msOrderTotal' | snippet}
<a href="{15 | url}"> {* ID страницы корзины *}
    {$cart.count} товаров на {$cart.cost} руб.
</a>
```

## Чанки

Имена чанков изменены для консистентности:

| miniShop2 | MiniShop3 |
|-----------|-----------|
| `tpl.msProducts.row` | `tpl.msProducts.row` (без изменений) |
| `tpl.msCart` | `tpl.msCart` (без изменений) |
| `tpl.msOrder` | `tpl.msOrder` (без изменений) |
| `tpl.msMiniCart` | `tpl.msOrderTotal` |
| — | `tpl.msCustomer.profile` (новый) |
| — | `tpl.msCustomer.orders` (новый) |

## Модель данных

### Новая сущность: msCustomer

MiniShop3 вводит отдельную сущность для клиентов магазина:

```php
// miniShop2 — клиент = modUser
$user = $modx->getObject('modUser', $userId);
$profile = $user->getOne('Profile');
$address = $profile->get('address');

// MiniShop3 — отдельная сущность msCustomer
use MiniShop3\Model\msCustomer;
use MiniShop3\Model\msCustomerAddress;

$customer = $modx->getObject(msCustomer::class, ['email' => $email]);
$addresses = $customer->getMany('Addresses');

// Связь с modUser (опционально)
$modUser = $customer->getOne('User');
```

### Адреса клиентов

```php
// miniShop2 — адрес в msOrderAddress (только для заказа)
$orderAddress = $order->getOne('Address');

// MiniShop3 — сохранённые адреса клиента
$addresses = $customer->getMany('Addresses');
foreach ($addresses as $address) {
    echo $address->get('city') . ', ' . $address->get('street');
}
```

## Миграция с miniShop2

### Шаг 1: Обновите MODX до версии 3.x

MiniShop3 работает только на MODX 3. Сначала выполните миграцию MODX.

### Шаг 2: Установите MiniShop3

Установите MiniShop3 через менеджер пакетов MODX или загрузите транспортный пакет с [GitHub](https://github.com/modx-pro/MiniShop3/releases).

### Шаг 3: Обновите системные настройки

Переименуйте настройки с `ms2_` на `ms3_` или создайте новые.

### Шаг 4: Обновите JavaScript

Замените вызовы `miniShop2` на `ms3`:

```javascript
// Было
miniShop2.Cart.add(id);

// Стало
ms3.cart.add(id);
```

### Шаг 5: Обновите плагины

Проверьте и обновите плагины, использующие события miniShop2.

### Шаг 6: Обновите шаблоны

Замените data-атрибуты и классы:

```html
<!-- Было -->
<form class="ms2_form">
    <button name="ms2_action" value="cart/add">

<!-- Стало -->
<button data-ms-action="cart/add" data-id="{$id}">
```

## Обратная совместимость

MiniShop3 сохраняет совместимость на уровне:

✅ **Совместимо:**
- Имена сниппетов
- Структура плейсхолдеров в чанках
- Основные параметры сниппетов
- Большинство событий плагинов

❌ **Несовместимо:**
- Системные настройки (ms2_ → ms3_)
- JavaScript API (miniShop2 → ms3)
- PHP классы (требуют namespaces)
- Точки входа API (action.php → api.php)
