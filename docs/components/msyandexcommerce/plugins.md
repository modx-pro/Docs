---
title: Плагины доставки
description: Событие ms2ycpOnDeliveryOptions и примеры плагинов
---

# Плагины сайта

Тарифы и сроки на сайте меняет плагин на `ms2ycpOnDeliveryOptions`. Пакет не зашивает Москву, область и СДЭК.

Контракт события и поля option: [delivery](delivery). Подставьте свои id `msDelivery`.

Во всех примерах `price` в копейках. `350` в этом поле = 3,50 ₽.

## Как повесить

1. Обновите пакет, чтобы resolver создал событие `ms2ycpOnDeliveryOptions`.
2. Создайте плагин, код из примера.
3. На вкладке событий отметьте только `ms2ycpOnDeliveryOptions`.
4. Проверьте `POST /api/v1/checkout/delivery/options` с адресом в теле.

```json
{
  "items": [{ "offer_id": 10, "count": 1 }],
  "address": { "city": "Москва", "region": "Москва" }
}
```

## 1. Москва / область / самовывоз

Courier: один id на город, другой на область. Pickup не меняется.

```php
<?php
/** @var modX $modx */

$params = $modx->event->params;
$address = is_array($params['address'] ?? null) ? $params['address'] : [];
$options = is_array($params['options'] ?? null) ? $params['options'] : [];

$city = mb_strtolower(trim((string) ($address['city'] ?? '')));
$region = mb_strtolower(trim((string) ($address['region'] ?? '')));

$idMoscow = 5;  // msDelivery: курьер Москва
$idRegion = 8;  // msDelivery: курьер область
$idPickup = 12; // msDelivery: самовывоз

$inMoscow = ($city === 'москва' || $region === 'москва');
$courierId = $inMoscow ? $idMoscow : $idRegion;

$out = [];
foreach ($options as $row) {
    if (!is_array($row)) {
        continue;
    }
    if (($row['type'] ?? '') === 'courier') {
        $row['id'] = (string) $courierId;
        $delivery = $modx->getObject('msDelivery', ['id' => $courierId, 'active' => 1]);
        if ($delivery) {
            $row['title'] = (string) $delivery->get('name');
        }
    }
    if (($row['type'] ?? '') === 'pickup') {
        $row['id'] = (string) $idPickup;
    }
    $out[] = $row;
}

$modx->event->returnedValues['options'] = $out;
```

## 2. Заменить список целиком

Плагин отдаёт свой набор. Слоты пакета не используются.

```php
<?php
/** @var modX $modx */

$params = $modx->event->params;
$address = is_array($params['address'] ?? null) ? $params['address'] : [];
$city = mb_strtolower(trim((string) ($address['city'] ?? '')));

$dates = [
    'date_from' => date('Y-m-d', strtotime('+1 day')),
    'date_to' => date('Y-m-d', strtotime('+3 days')),
];

$options = [[
    'id' => '5',
    'type' => 'courier',
    'title' => 'Курьер по Москве',
    'price' => 35000,
    'currency' => 'RUB',
    'date_from' => $dates['date_from'],
    'date_to' => $dates['date_to'],
]];

if ($city !== 'москва') {
    $options = [[
        'id' => '8',
        'type' => 'courier',
        'title' => 'Курьер по области',
        'price' => 59000,
        'currency' => 'RUB',
        'date_from' => date('Y-m-d', strtotime('+2 days')),
        'date_to' => date('Y-m-d', strtotime('+5 days')),
    ]];
}

$options[] = [
    'id' => '12',
    'type' => 'pickup',
    'title' => 'Самовывоз',
    'price' => 0,
    'currency' => 'RUB',
    'date_from' => $dates['date_from'],
    'date_to' => $dates['date_to'],
];

$modx->event->returnedValues['options'] = $options;
```

## 3. Только даты

Слоты и цены пакета оставляете. Окно дат, например «не раньше чем через 2 дня».

```php
<?php
/** @var modX $modx */

$options = $modx->event->params['options'] ?? [];
if (!is_array($options)) {
    return;
}

$from = date('Y-m-d', strtotime('+2 days'));
$to = date('Y-m-d', strtotime('+5 days'));

foreach ($options as &$row) {
    if (!is_array($row)) {
        continue;
    }
    $row['date_from'] = $from;
    $row['date_to'] = $to;
}
unset($row);

$modx->event->returnedValues['options'] = $options;
```

## 4. Убрать самовывоз вне города

```php
<?php
/** @var modX $modx */

$params = $modx->event->params;
$address = is_array($params['address'] ?? null) ? $params['address'] : [];
$options = is_array($params['options'] ?? null) ? $params['options'] : [];
$city = mb_strtolower(trim((string) ($address['city'] ?? '')));

if ($city !== 'москва') {
    $options = array_values(array_filter($options, static function ($row) {
        return is_array($row) && ($row['type'] ?? '') !== 'pickup';
    }));
}

$modx->event->returnedValues['options'] = $options;
```

Если после фильтра список пуст, пакет вернёт слоты по умолчанию (пустой возврат отбрасывается). Оставьте хотя бы один option с `id`.

## 5. Цена из полей msDelivery

Нужен, если вы сменили `id` в плагине и хотите пересчитать `price`. Пакет уже считает ту же формулу для слотов по умолчанию.

```php
<?php
/** @var modX $modx */

$params = $modx->event->params;
$options = is_array($params['options'] ?? null) ? $params['options'] : [];
$cartCost = (float) ($params['cart_cost'] ?? 0);
$weight = (float) ($params['weight'] ?? 0);

foreach ($options as &$row) {
    if (!is_array($row) || !isset($row['id'])) {
        continue;
    }
    $delivery = $modx->getObject('msDelivery', [
        'id' => (int) $row['id'],
        'active' => 1,
    ]);
    if (!$delivery) {
        continue;
    }
    $free = (float) $delivery->get('free_delivery_amount');
    if ($free > 0 && $cartCost >= $free) {
        $cost = 0.0;
    } else {
        $price = $delivery->get('price');
        if (is_string($price) && substr($price, -1) === '%') {
            $cost = $cartCost / 100 * (float) str_replace('%', '', $price);
        } else {
            $cost = (float) $price;
        }
        $cost += (float) $delivery->get('weight_price') * $weight;
    }
    $row['price'] = (int) round($cost * 100);
    $row['title'] = (string) $delivery->get('name');
}
unset($row);

$modx->event->returnedValues['options'] = $options;
```

## 6. Заглушка заказа для getCost()

Пакет `getCost()` не вызывает. Класс доставки часто ждёт объект с `get()`. На create тот же приём: `Ms2OrderBagStub`.

```php
<?php
/** @var modX $modx */

use MsYandexCommerce\Services\Ms2OrderBagStub;

$params = $modx->event->params;
$address = is_array($params['address'] ?? null) ? $params['address'] : [];
$options = is_array($params['options'] ?? null) ? $params['options'] : [];
$cartCost = (float) ($params['cart_cost'] ?? 0);
$weight = (float) ($params['weight'] ?? 0);

$orderStub = new Ms2OrderBagStub(array_merge($address, [
    'cost' => $cartCost,
    'cart_cost' => $cartCost,
    'weight' => $weight,
]));

foreach ($options as &$row) {
    if (!is_array($row) || !isset($row['id'])) {
        continue;
    }
    $delivery = $modx->getObject('msDelivery', [
        'id' => (int) $row['id'],
        'active' => 1,
    ]);
    if (!$delivery) {
        continue;
    }

    // Свой класс доставки: $handler = $delivery->loadHandler() или new YourClass($modx).
    // Если handler->getCost($orderStub, $delivery, $cartCost) существует — вызовите его.
    // ms_CDEK2 в пакет не входит. Сессию СДЭК и API считаете здесь сами.

    if (method_exists($delivery, 'getCost')) {
        $cost = (float) $delivery->getCost($orderStub, $delivery, $cartCost);
        $row['price'] = (int) round($cost * 100);
    }
}
unset($row);

$modx->event->returnedValues['options'] = $options;
```

`getCost` у объекта `msDelivery` в стандартном MS2 может отсутствовать. Тогда грузите handler класса из поля `class` у доставки. Код СДЭКа в пакет не копируем.

## 7. СДЭК: только каркас

Вызовов `ms_CDEK2` нет. Плагин выбирает ваш `msDelivery` СДЭК и оставляет место под расчёт из сессии или API магазина.

```php
<?php
/** @var modX $modx */

$params = $modx->event->params;
$address = is_array($params['address'] ?? null) ? $params['address'] : [];
$items = is_array($params['items'] ?? null) ? $params['items'] : [];
$cartCost = (float) ($params['cart_cost'] ?? 0);
$weight = (float) ($params['weight'] ?? 0);

$idCdekCourier = 20;
$idCdekPickup = 21;

// $quote = your_cdek_quote($address, $items, $weight);
// Ожидаемый смысл: price (рубли), date_from, date_to.
$quote = [
    'price' => 0.0,
    'date_from' => date('Y-m-d', strtotime('+2 days')),
    'date_to' => date('Y-m-d', strtotime('+6 days')),
];

$modx->event->returnedValues['options'] = [
    [
        'id' => (string) $idCdekCourier,
        'type' => 'courier',
        'title' => 'СДЭК курьер',
        'price' => (int) round($quote['price'] * 100),
        'currency' => 'RUB',
        'date_from' => $quote['date_from'],
        'date_to' => $quote['date_to'],
    ],
    [
        'id' => (string) $idCdekPickup,
        'type' => 'pickup',
        'title' => 'СДЭК ПВЗ',
        'price' => 0,
        'currency' => 'RUB',
        'date_from' => $quote['date_from'],
        'date_to' => $quote['date_to'],
    ],
];
```

Пункты выдачи для `GET /pickup_points` пакет берёт из `msyandexcommerce_pickup_points_json`, не из этого события.

## Частые ошибки

| Что сделали | Что будет |
|-------------|-----------|
| `price` в рублях (`350`) | Яндекс увидит 3,50 ₽ |
| Вернули `[]` | Пакет оставит слоты по умолчанию |
| Строка без `id` | Строка выкинется |
| Не отметили событие у плагина | Доезжают только слоты из настроек |
| Ждёте `$ms2->order` | Его нет. Собирайте stub сами |
