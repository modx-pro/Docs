---
title: События стоимости
---
# События стоимости

События для расчёта и модификации стоимости: корзины, доставки, оплаты.

## msOnBeforeGetCartCost

Вызывается **перед** расчётом стоимости корзины.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetCartCost':
        // Запретить расчёт для определённых пользователей
        if (!$modx->user->isMember('Customers')) {
            $modx->event->output('Расчёт недоступен');
            return;
        }
        break;
}
```

---

## msOnGetCartCost

Вызывается **после** расчёта стоимости корзины. Позволяет модифицировать итоговую сумму.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `cost` | `float` | Рассчитанная стоимость |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];

        $values = &$modx->event->returnedValues;

        // Скидка 10% для авторизованных пользователей
        if ($modx->user->isAuthenticated()) {
            $values['cost'] = $cost * 0.9;
        }
        break;
}
```

### Применение промокода

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];

        // Проверка промокода в сессии
        if (empty($_SESSION['ms3']['promocode'])) {
            return;
        }

        $promocode = $modx->getObject('msPromocode', [
            'code' => $_SESSION['ms3']['promocode'],
            'active' => 1,
        ]);

        if (!$promocode) {
            unset($_SESSION['ms3']['promocode']);
            return;
        }

        $discount = 0;
        $type = $promocode->get('type');
        $value = $promocode->get('value');

        switch ($type) {
            case 'percent':
                $discount = $cost * ($value / 100);
                break;
            case 'fixed':
                $discount = $value;
                break;
        }

        $values = &$modx->event->returnedValues;
        $values['cost'] = max(0, $cost - $discount);

        // Сохраняем информацию о скидке
        $modx->eventData['promocode'] = [
            'code' => $promocode->get('code'),
            'discount' => $discount,
        ];
        break;
}
```

---

## msOnBeforeGetDeliveryCost

Вызывается **перед** расчётом стоимости доставки.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `storageController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `orderController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetDeliveryCost':
        // Проверка, выбран ли способ доставки
        // Если нет — не считать стоимость доставки
        break;
}
```

---

## msOnGetDeliveryCost

Вызывается **после** расчёта стоимости доставки. Позволяет модифицировать стоимость.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `storageController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `orderController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cost` | `float` | Рассчитанная стоимость доставки |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $orderController = $scriptProperties['orderController'];

        // Получаем стоимость корзины
        $cartCostResponse = $orderController->getCartCost();
        $cartCost = $cartCostResponse['data']['cost'] ?? 0;

        $values = &$modx->event->returnedValues;

        // Бесплатная доставка при заказе от 5000
        if ($cartCost >= 5000) {
            $values['cost'] = 0;
            return;
        }

        // Скидка 50% на доставку при заказе от 3000
        if ($cartCost >= 3000) {
            $values['cost'] = $cost * 0.5;
            return;
        }
        break;
}
```

### Расчёт доставки по весу

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $cartController = $scriptProperties['cartController'];

        // Получаем статус корзины с весом
        $response = $cartController->status();
        $totalWeight = $response['data']['total_weight'] ?? 0;

        // Базовая ставка + доплата за вес
        $baseCost = 300;
        $weightCost = ceil($totalWeight / 1000) * 50; // 50 руб за каждый кг

        $values = &$modx->event->returnedValues;
        $values['cost'] = $baseCost + $weightCost;
        break;
}
```

### Расчёт по зоне доставки

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $orderController = $scriptProperties['orderController'];

        // Получаем данные заказа
        $response = $orderController->get();
        $order = $response['data']['order'] ?? [];
        $city = $order['address_city'] ?? '';

        // Зоны доставки
        $zones = [
            'Москва' => 0,
            'Санкт-Петербург' => 200,
            'Казань' => 350,
            'Новосибирск' => 500,
        ];

        $zoneCost = $zones[$city] ?? 700; // По умолчанию

        $values = &$modx->event->returnedValues;
        $values['cost'] = $cost + $zoneCost;
        break;
}
```

---

## msOnBeforeGetPaymentCost

Вызывается **перед** расчётом комиссии способа оплаты.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `storageController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `orderController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |

---

## msOnGetPaymentCost

Вызывается **после** расчёта комиссии способа оплаты. Позволяет модифицировать комиссию.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `storageController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `orderController` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `cost` | `float` | Рассчитанная комиссия |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetPaymentCost':
        $cost = $scriptProperties['cost'];

        $values = &$modx->event->returnedValues;

        // Отмена комиссии для постоянных клиентов
        if ($modx->user->isAuthenticated()) {
            $profile = $modx->user->getOne('Profile');
            $ordersCount = $modx->getCount(\MiniShop3\Model\msOrder::class, [
                'user_id' => $modx->user->get('id'),
                'status_id:>' => 1, // Исключаем черновики
            ]);

            if ($ordersCount >= 5) {
                $values['cost'] = 0; // Без комиссии
            }
        }
        break;
}
```

### Скидка на комиссию

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetPaymentCost':
        $cost = $scriptProperties['cost'];
        $orderController = $scriptProperties['orderController'];

        // Получаем стоимость корзины
        $cartCostResponse = $orderController->getCartCost();
        $cartCost = $cartCostResponse['data']['cost'] ?? 0;

        $values = &$modx->event->returnedValues;

        // При заказе от 10000 — без комиссии
        if ($cartCost >= 10000) {
            $values['cost'] = 0;
        }
        break;
}
```

---

## Полный пример: система скидок

Комплексный пример системы скидок с использованием нескольких событий:

```php
<?php
/**
 * Плагин: Система скидок
 * События: msOnGetCartCost, msOnGetDeliveryCost
 */

switch ($modx->event->name) {

    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];
        $values = &$modx->event->returnedValues;

        $discount = 0;
        $discountInfo = [];

        // 1. Скидка по промокоду
        if (!empty($_SESSION['ms3']['promocode'])) {
            $promocode = $modx->getObject('msPromocode', [
                'code' => $_SESSION['ms3']['promocode'],
                'active' => 1,
            ]);
            if ($promocode && $promocode->get('type') === 'percent') {
                $promoDiscount = $cost * ($promocode->get('value') / 100);
                $discount += $promoDiscount;
                $discountInfo['promocode'] = $promoDiscount;
            }
        }

        // 2. Скидка для VIP-клиентов
        if ($modx->user->isMember('VIP')) {
            $vipDiscount = $cost * 0.15;
            $discount += $vipDiscount;
            $discountInfo['vip'] = $vipDiscount;
        }

        // 3. Скидка за объём (от 10 товаров)
        $cart = $scriptProperties['cart'];
        $response = $cart->status();
        $totalCount = $response['data']['total_count'] ?? 0;
        if ($totalCount >= 10) {
            $volumeDiscount = $cost * 0.05;
            $discount += $volumeDiscount;
            $discountInfo['volume'] = $volumeDiscount;
        }

        // Применяем скидку
        $values['cost'] = max(0, $cost - $discount);

        // Сохраняем для отображения
        $modx->eventData['discounts'] = $discountInfo;
        $modx->eventData['total_discount'] = $discount;
        break;

    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $orderController = $scriptProperties['orderController'];

        // Бесплатная доставка при скидке от 1000
        $totalDiscount = $modx->eventData['total_discount'] ?? 0;
        if ($totalDiscount >= 1000) {
            $values = &$modx->event->returnedValues;
            $values['cost'] = 0;
        }
        break;
}
```
