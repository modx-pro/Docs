---
title: События стоимости
---
# События стоимости

Расчёт и изменение стоимости корзины, доставки и оплаты.

::: danger Все восемь событий — только витрина и Web API
События стоимости поднимает `OrderCostCalculator`, и он обслуживает только оформление заказа покупателем. Пересчёт суммы в карточке заказа в админке — правка состава, смена доставки или оплаты, финализация — идёт через `ManagerOrderCostRecalculator`, где нет ни одного вызова события.

Следствие: скидка, навешенная плагином на `msOnGetCartCost` или `msOnGetOrderCost`, в заказе, который менеджер собрал руками, не применится. Если скидка должна действовать на обоих путях, её логику выносят в сервис и зовут из плагина событий **и** из своего кода админки.
:::

::: warning Контроллер корзины приходит под двумя разными именами
В событиях корзины и итога заказа параметр называется `cart`, а в событиях доставки и оплаты — `cartController`. Это историческая непоследовательность ядра: плагин, скопированный от `msOnGetCartCost` к `msOnGetDeliveryCost`, получит `null` вместо контроллера. Сверяйтесь с таблицей параметров нужного события.
:::

## msOnBeforeGetCartCost

Вызывается **перед** расчётом стоимости корзины.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Сервис-калькулятор стоимости |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` \| `null` | Черновик заказа (может быть `null`, если корзина пуста) |

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
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Сервис-калькулятор стоимости |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` \| `null` | Черновик заказа |
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
// Код скидки лежит в properties черновика — положите его туда своим
// обработчиком, когда покупатель вводит код в форме оформления.
$codes = [
    'SALE10'   => ['type' => 'percent', 'value' => 10],
    'MINUS500' => ['type' => 'fixed', 'value' => 500],
];

switch ($modx->event->name) {
    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];
        /** @var \MiniShop3\Model\msOrder|null $draft */
        $draft = $scriptProperties['draft'] ?? null;

        $properties = $draft ? ($draft->get('properties') ?: []) : [];
        $code = (string)($properties['promocode'] ?? '');

        if ($code === '' || !isset($codes[$code])) {
            return;
        }

        $promo = $codes[$code];
        $discount = $promo['type'] === 'percent'
            ? $cost * ($promo['value'] / 100)
            : $promo['value'];

        $values = &$modx->event->returnedValues;
        $values['cost'] = max(0, $cost - $discount);

        // Информация о скидке — для следующих событий расчёта
        $modx->eventData['promocode'] = [
            'code' => $code,
            'discount' => $discount,
        ];
        break;
}
```

::: tip Для настоящих промокодов есть готовый компонент
Пример выше намеренно держит коды в самом плагине. Полноценные промокоды с правилами, лимитами и учётом применений даёт [ms3PromoCode](https://modstore.pro/packages/ecommerce/ms3promocode): у него своя модель `ms3PromoCode\Model\msPromoCode` с полями `discount_type` и `discount_value` и свои сервисы расчёта. Повторять его логику в плагине не нужно.
:::

---

## msOnBeforeGetDeliveryCost

Вызывается **перед** расчётом стоимости доставки.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Сервис-калькулятор стоимости |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` | Черновик заказа |

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
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Сервис-калькулятор стоимости |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` | Черновик заказа |
| `cost` | `float` | Рассчитанная стоимость доставки |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $cartController = $scriptProperties['cartController'];

        // Получаем стоимость корзины
        $response = $cartController->status();
        $cartCost = $response['data']['total_cost'] ?? 0;

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
        $draft = $scriptProperties['draft'];

        // Получаем адрес заказа
        $address = $draft->getOne('Address');
        $city = $address ? $address->get('city') : '';

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
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Сервис-калькулятор стоимости |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` | Черновик заказа |

---

## msOnGetPaymentCost

Вызывается **после** расчёта комиссии способа оплаты. Позволяет модифицировать комиссию.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Сервис-калькулятор стоимости |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` | Черновик заказа |
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
        $cartController = $scriptProperties['cartController'];

        // Получаем стоимость корзины
        $response = $cartController->status();
        $cartCost = $response['data']['total_cost'] ?? 0;

        $values = &$modx->event->returnedValues;

        // При заказе от 10000 — без комиссии
        if ($cartCost >= 10000) {
            $values['cost'] = 0;
        }
        break;
}
```

---

## msOnBeforeGetOrderCost

Вызывается **перед** сборкой итога заказа в `OrderCostCalculator`: после события ядро считает стоимость корзины, доставки и оплаты и собирает из них разбивку.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Калькулятор |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` \| `null` | Черновик |
| `with_cart` | `bool` | Всегда `true` в текущем вызове |
| `only_cost` | `bool` | Режим «только сумма» (без побочных эффектов UI) |

Прерывание операции: `$modx->event->output('...')` — калькулятор вернёт ошибку.

---

## msOnGetOrderCost

Вызывается **после** сборки разбивки итога. Через `returnedValues` можно подменить любую из четырёх сумм — ядро заново соберёт итоговый `cost`.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Калькулятор |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` \| `null` | Черновик |
| `with_cart` | `bool` | Флаг расчёта с корзиной |
| `only_cost` | `bool` | Режим «только сумма» |
| `cost` | `float` | Итог до правок плагина |
| `cart_cost` | `float` | Сумма товаров |
| `delivery_cost` | `float` | Доставка |
| `payment_cost` | `float` | Комиссия оплаты |

### Модификация итога

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetOrderCost':
        $values = &$modx->event->returnedValues;
        $cartCost = (float) $scriptProperties['cart_cost'];
        $deliveryCost = (float) $scriptProperties['delivery_cost'];
        $paymentCost = (float) $scriptProperties['payment_cost'];

        // Фиксированная скидка на весь заказ (не только на корзину)
        if ($cartCost >= 5000) {
            $values['cart_cost'] = max(0, $cartCost - 500);
        }

        // Бесплатная доставка при крупном заказе
        if (($values['cart_cost'] ?? $cartCost) >= 3000) {
            $values['delivery_cost'] = 0;
        }

        break;
}
```

::: warning `cost` в returnedValues не действует
Ядро **всегда** пересобирает итоговый `cost` из `cart_cost`/`delivery_cost`/`payment_cost` после события — любое `$values['cost'] = ...`, выставленное плагином, молча отбрасывается. Чтобы повлиять на итог, меняйте `cart_cost`/`delivery_cost`/`payment_cost`, как показано выше.
:::

::: tip Частичное событие или итоговое
Для скидки только на товары удобнее `msOnGetCartCost`. Для правила «пересчитать всё сразу» (корзина + доставка + оплата) используйте `msOnGetOrderCost`.
:::

---

## Полный пример: система скидок

```php
<?php
/**
 * Плагин: Система скидок
 * События: msOnGetCartCost, msOnGetDeliveryCost
 */

$codes = [
    'SALE10' => ['type' => 'percent', 'value' => 10],
];

switch ($modx->event->name) {

    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];
        $values = &$modx->event->returnedValues;

        $discount = 0;
        $discountInfo = [];

        // 1. Скидка по коду из properties черновика
        $draft = $scriptProperties['draft'] ?? null;
        $properties = $draft ? ($draft->get('properties') ?: []) : [];
        $code = (string)($properties['promocode'] ?? '');

        if ($code !== '' && isset($codes[$code]) && $codes[$code]['type'] === 'percent') {
            $promoDiscount = $cost * ($codes[$code]['value'] / 100);
            $discount += $promoDiscount;
            $discountInfo['promocode'] = $promoDiscount;
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

        // Бесплатная доставка при скидке от 1000
        $totalDiscount = $modx->eventData['total_discount'] ?? 0;
        if ($totalDiscount >= 1000) {
            $values = &$modx->event->returnedValues;
            $values['cost'] = 0;
        }
        break;
}
```
