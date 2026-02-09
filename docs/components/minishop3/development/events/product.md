---
title: События товаров (каталог)
---
# События товаров (каталог)

События для модификации цены, веса и полей товаров при выводе в каталоге.

::: info Особенность
Эти события поддерживают **цепочку плагинов** — каждый плагин может прочитать результат предыдущего через `$modx->eventData` и передать свой результат следующему.
:::

## msOnGetProductPrice

Вызывается при получении цены товара. Позволяет модифицировать цену на лету.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msProductData` | `msProductData` | Объект данных товара |
| `data` | `array` | Дополнительные данные товара |
| `price` | `float` | Текущая цена |

### Модификация данных (с поддержкой цепочки)

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        // Получаем цену (может быть уже изменена другим плагином)
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];
        $data = $scriptProperties['data'];

        // Скидка 15% для категории 5
        if ($data['parent'] == 5) {
            $price = $price * 0.85;
        }

        // Сохраняем для следующих плагинов
        $modx->eventData['msOnGetProductPrice']['price'] = $price;

        // Возвращаем результат
        $values = &$modx->event->returnedValues;
        $values['price'] = $price;
        break;
}
```

### Персональные цены

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];
        $productData = $scriptProperties['msProductData'];

        // VIP-скидка
        if ($modx->user->isMember('VIP')) {
            $price = $price * 0.8; // -20%
        }

        // Оптовая цена для оптовиков
        if ($modx->user->isMember('Wholesale')) {
            $wholesalePrice = $productData->get('wholesale_price');
            if ($wholesalePrice > 0) {
                $price = $wholesalePrice;
            }
        }

        $modx->eventData['msOnGetProductPrice']['price'] = $price;
        $values = &$modx->event->returnedValues;
        $values['price'] = $price;
        break;
}
```

### Динамическая наценка по курсу валюты

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];

        // Получаем курс из кэша или API
        $rate = $modx->cacheManager->get('usd_rate') ?? 90;

        // Товар в долларах — конвертируем
        $productData = $scriptProperties['msProductData'];
        if ($productData->get('currency') === 'USD') {
            $price = $price * $rate;
        }

        $modx->eventData['msOnGetProductPrice']['price'] = $price;
        $values = &$modx->event->returnedValues;
        $values['price'] = round($price, 2);
        break;
}
```

---

## msOnGetProductWeight

Вызывается при получении веса товара. Позволяет модифицировать вес на лету.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msProductData` | `msProductData` | Объект данных товара |
| `data` | `array` | Дополнительные данные товара |
| `weight` | `float` | Текущий вес |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductWeight':
        $weight = $modx->eventData['msOnGetProductWeight']['weight']
            ?? $scriptProperties['weight'];
        $data = $scriptProperties['data'];

        // Добавляем вес упаковки (500г)
        $packagingWeight = 0.5;
        $weight = $weight + $packagingWeight;

        $modx->eventData['msOnGetProductWeight']['weight'] = $weight;
        $values = &$modx->event->returnedValues;
        $values['weight'] = $weight;
        break;
}
```

### Расчёт объёмного веса

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductWeight':
        $weight = $modx->eventData['msOnGetProductWeight']['weight']
            ?? $scriptProperties['weight'];
        $productData = $scriptProperties['msProductData'];

        // Получаем габариты
        $length = $productData->get('length') ?? 0;
        $width = $productData->get('width') ?? 0;
        $height = $productData->get('height') ?? 0;

        // Объёмный вес (делитель 5000 — стандарт для курьерских служб)
        if ($length > 0 && $width > 0 && $height > 0) {
            $volumeWeight = ($length * $width * $height) / 5000;

            // Используем больший из весов
            $weight = max($weight, $volumeWeight);
        }

        $modx->eventData['msOnGetProductWeight']['weight'] = $weight;
        $values = &$modx->event->returnedValues;
        $values['weight'] = $weight;
        break;
}
```

---

## msOnGetProductFields

Вызывается при получении полей товара. Позволяет добавить или модифицировать любые поля.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msProductData` | `msProductData` | Объект данных товара |
| `data` | `array` | Массив полей товара |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];

        // Добавить расчётные поля
        $data['discount_percent'] = 0;
        if ($data['old_price'] > 0 && $data['price'] > 0) {
            $data['discount_percent'] = round(
                (($data['old_price'] - $data['price']) / $data['old_price']) * 100
            );
        }

        // Добавить статус наличия
        $remains = $data['remains'] ?? 0;
        if ($remains <= 0) {
            $data['availability'] = 'out_of_stock';
            $data['availability_text'] = 'Нет в наличии';
        } elseif ($remains < 5) {
            $data['availability'] = 'low_stock';
            $data['availability_text'] = 'Заканчивается';
        } else {
            $data['availability'] = 'in_stock';
            $data['availability_text'] = 'В наличии';
        }

        $modx->eventData['msOnGetProductFields']['data'] = $data;
        $values = &$modx->event->returnedValues;
        $values['data'] = $data;
        break;
}
```

### Добавление связанных данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];
        $productData = $scriptProperties['msProductData'];

        // Добавить количество отзывов
        $reviewCount = $modx->getCount('msProductReview', [
            'product_id' => $data['id'],
            'published' => 1,
        ]);
        $data['review_count'] = $reviewCount;

        // Добавить средний рейтинг
        $c = $modx->newQuery('msProductReview');
        $c->where(['product_id' => $data['id'], 'published' => 1]);
        $c->select('AVG(rating) as avg_rating');
        if ($c->prepare() && $c->stmt->execute()) {
            $data['avg_rating'] = round($c->stmt->fetchColumn(), 1);
        }

        $modx->eventData['msOnGetProductFields']['data'] = $data;
        $values = &$modx->event->returnedValues;
        $values['data'] = $data;
        break;
}
```

---

## Полный пример: система скидок и акций

```php
<?php
/**
 * Плагин: Система скидок и акций
 * События: msOnGetProductPrice, msOnGetProductFields
 */

switch ($modx->event->name) {

    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];
        $data = $scriptProperties['data'];

        $discounts = [];

        // 1. Скидка по категории
        $categoryDiscounts = [
            5 => 10,  // Категория 5 — скидка 10%
            10 => 15, // Категория 10 — скидка 15%
        ];
        if (isset($categoryDiscounts[$data['parent']])) {
            $discount = $categoryDiscounts[$data['parent']];
            $price = $price * (1 - $discount / 100);
            $discounts['category'] = $discount;
        }

        // 2. Скидка для авторизованных
        if ($modx->user->isAuthenticated()) {
            $price = $price * 0.95; // -5%
            $discounts['member'] = 5;
        }

        // 3. VIP-скидка
        if ($modx->user->isMember('VIP')) {
            $price = $price * 0.9; // -10%
            $discounts['vip'] = 10;
        }

        // Сохраняем информацию о скидках для использования в msOnGetProductFields
        $modx->eventData['discounts'] = $discounts;
        $modx->eventData['msOnGetProductPrice']['price'] = $price;

        $values = &$modx->event->returnedValues;
        $values['price'] = round($price, 2);
        break;

    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];

        // Добавляем информацию о скидках
        $discounts = $modx->eventData['discounts'] ?? [];
        if (!empty($discounts)) {
            $data['applied_discounts'] = $discounts;
            $data['total_discount'] = array_sum($discounts);
        }

        // Добавляем бейджи
        $badges = [];
        if ($data['new']) {
            $badges[] = ['type' => 'new', 'text' => 'Новинка'];
        }
        if ($data['popular']) {
            $badges[] = ['type' => 'popular', 'text' => 'Хит'];
        }
        if (!empty($data['total_discount'])) {
            $badges[] = [
                'type' => 'sale',
                'text' => '-' . $data['total_discount'] . '%',
            ];
        }
        $data['badges'] = $badges;

        $modx->eventData['msOnGetProductFields']['data'] = $data;
        $values = &$modx->event->returnedValues;
        $values['data'] = $data;
        break;
}
```
