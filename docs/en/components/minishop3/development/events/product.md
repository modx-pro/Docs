---
title: Product events (catalog)
---
# Product events (catalog)

Events for modifying product price, weight and fields when output in the catalog.

::: info Feature
These events support a **plugin chain** — each plugin can read the previous result via `$modx->eventData` and pass its result to the next.
:::

## msOnGetProductPrice

Fired when getting product price. Lets you modify the price on the fly.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msProductData` | `msProductData` | Product data object |
| `data` | `array` | Extra product data |
| `price` | `float` | Current price |

### Modifying data (with chain support)

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];
        $data = $scriptProperties['data'];

        if ($data['parent'] == 5) {
            $price = $price * 0.85;
        }

        $modx->eventData['msOnGetProductPrice']['price'] = $price;

        $values = &$modx->event->returnedValues;
        $values['price'] = $price;
        break;
}
```

### Personal prices

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];
        $productData = $scriptProperties['msProductData'];

        if ($modx->user->isMember('VIP')) {
            $price = $price * 0.8; // -20%
        }

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

### Dynamic markup by currency rate

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];

        $rate = $modx->cacheManager->get('usd_rate') ?? 90;

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

Fired when getting product weight. Lets you modify weight on the fly.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msProductData` | `msProductData` | Product data object |
| `data` | `array` | Extra product data |
| `weight` | `float` | Current weight |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductWeight':
        $weight = $modx->eventData['msOnGetProductWeight']['weight']
            ?? $scriptProperties['weight'];
        $data = $scriptProperties['data'];

        $packagingWeight = 0.5;
        $weight = $weight + $packagingWeight;

        $modx->eventData['msOnGetProductWeight']['weight'] = $weight;
        $values = &$modx->event->returnedValues;
        $values['weight'] = $weight;
        break;
}
```

### Volumetric weight

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductWeight':
        $weight = $modx->eventData['msOnGetProductWeight']['weight']
            ?? $scriptProperties['weight'];
        $productData = $scriptProperties['msProductData'];

        $length = $productData->get('length') ?? 0;
        $width = $productData->get('width') ?? 0;
        $height = $productData->get('height') ?? 0;

        if ($length > 0 && $width > 0 && $height > 0) {
            $volumeWeight = ($length * $width * $height) / 5000;
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

Fired when getting product fields. Lets you add or modify any fields.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msProductData` | `msProductData` | Product data object |
| `data` | `array` | Product fields array |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];

        $data['discount_percent'] = 0;
        if ($data['old_price'] > 0 && $data['price'] > 0) {
            $data['discount_percent'] = round(
                (($data['old_price'] - $data['price']) / $data['old_price']) * 100
            );
        }

        $remains = $data['remains'] ?? 0;
        if ($remains <= 0) {
            $data['availability'] = 'out_of_stock';
            $data['availability_text'] = 'Out of stock';
        } elseif ($remains < 5) {
            $data['availability'] = 'low_stock';
            $data['availability_text'] = 'Low stock';
        } else {
            $data['availability'] = 'in_stock';
            $data['availability_text'] = 'In stock';
        }

        $modx->eventData['msOnGetProductFields']['data'] = $data;
        $values = &$modx->event->returnedValues;
        $values['data'] = $data;
        break;
}
```

### Adding related data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];
        $productData = $scriptProperties['msProductData'];

        $reviewCount = $modx->getCount('msProductReview', [
            'product_id' => $data['id'],
            'published' => 1,
        ]);
        $data['review_count'] = $reviewCount;

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

## Full example: discounts and promotions

```php
<?php
/**
 * Plugin: Discounts and promotions
 * Events: msOnGetProductPrice, msOnGetProductFields
 */

switch ($modx->event->name) {

    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];
        $data = $scriptProperties['data'];

        $discounts = [];

        $categoryDiscounts = [
            5 => 10,
            10 => 15,
        ];
        if (isset($categoryDiscounts[$data['parent']])) {
            $discount = $categoryDiscounts[$data['parent']];
            $price = $price * (1 - $discount / 100);
            $discounts['category'] = $discount;
        }

        if ($modx->user->isAuthenticated()) {
            $price = $price * 0.95;
            $discounts['member'] = 5;
        }

        if ($modx->user->isMember('VIP')) {
            $price = $price * 0.9;
            $discounts['vip'] = 10;
        }

        $modx->eventData['discounts'] = $discounts;
        $modx->eventData['msOnGetProductPrice']['price'] = $price;

        $values = &$modx->event->returnedValues;
        $values['price'] = round($price, 2);
        break;

    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];

        $discounts = $modx->eventData['discounts'] ?? [];
        if (!empty($discounts)) {
            $data['applied_discounts'] = $discounts;
            $data['total_discount'] = array_sum($discounts);
        }

        $badges = [];
        if ($data['new']) {
            $badges[] = ['type' => 'new', 'text' => 'New'];
        }
        if ($data['popular']) {
            $badges[] = ['type' => 'popular', 'text' => 'Bestseller'];
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
