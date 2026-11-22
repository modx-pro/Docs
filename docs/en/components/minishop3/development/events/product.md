---
title: Product events (catalog)
---
# Product events (catalog)

Modifying product price, weight and fields on catalog output.

::: info Feature
These events support a **plugin chain** — each plugin can read the previous result from `$modx->eventData` and pass its own result to the next one.
:::

## msOnGetProductPrice

Fired when getting product price. Lets you modify the price on the fly.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | `array` | Product data. By default this is `toArray()` of the `msProductData` object (core fields: `price`, `article`, `weight`, `stock`, `vendor_id`, `tags`, `color`, `size`, and others), or an extended row when the caller passed its own `$data` (for example `ms3_products.php` passes the whole listing row, including its own fields) |
| `price` | `float` | Current price |

### Modifying data (with chain support)

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        // The price may already have been changed by another plugin
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];
        $data = $scriptProperties['data'];

        // 15% off for category 5
        if ($data['parent'] == 5) {
            $price = $price * 0.85;
        }

        // Hand it on to the plugins that run after this one
        $modx->eventData['msOnGetProductPrice']['price'] = $price;

        // Return the result
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
        $data = $scriptProperties['data'];

        // VIP discount
        if ($modx->user->isMember('VIP')) {
            $price = $price * 0.8; // -20%
        }

        // Wholesale price when the extra field wholesale_price exists
        if ($modx->user->isMember('Wholesale')) {
            $wholesalePrice = $data['wholesale_price'] ?? 0;
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

        // Rate out of the cache, or from an API
        $rate = $modx->cacheManager->get('usd_rate') ?? 90;

        // Convert a product priced in dollars when the extra field currency exists
        $data = $scriptProperties['data'];
        if (($data['currency'] ?? null) === 'USD') {
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
| --- | --- | --- |
| `data` | `array` | Product data. By default `toArray()` of the `msProductData` object, or an extended row when the caller passed its own `$data` |
| `weight` | `float` | Current weight |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductWeight':
        $weight = $modx->eventData['msOnGetProductWeight']['weight']
            ?? $scriptProperties['weight'];
        $data = $scriptProperties['data'];

        // Add the packaging weight (500 g)
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
        $data = $scriptProperties['data'];

        // Dimensions when the extra fields length, width and height exist
        $length = $data['length'] ?? 0;
        $width = $data['width'] ?? 0;
        $height = $data['height'] ?? 0;

        // Volumetric weight: the 5000 divisor is the courier standard
        if ($length > 0 && $width > 0 && $height > 0) {
            $volumeWeight = ($length * $width * $height) / 5000;

            // Whichever weight is larger wins
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

::: danger Added fields never reach the public Web API
Right after the event, `ProductCatalogService` runs the result through `whitelistPublicPayload()` and keeps only the keys of two static lists — `RESOURCE_FIELDS` and `DATA_FIELDS` (twelve names: `article`, `price`, `old_price`, `stock`, `weight`, `image`, `thumb`, `vendor_id`, `made_in`, `new`, `popular`, `favorite`).

So everything a plugin adds to `data` is visible in Fenom snippets and chunks, but is stripped from the `GET /api/v1/products` and `GET /api/v1/products/{id}` responses. On a server-rendered site the example works; on a headless storefront it silently does not.

The allowlist is static: columns created by the [Extra fields](/en/components/minishop3/interface/utilities/extra-fields) utility do not pass either. To expose a field of your own you need your own endpoint or catalogue controller.
:::

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | `array` | Product data. By default `toArray()` of the `msProductData` object, or an extended row when the caller passed its own `$data` |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];

        // Add the computed fields
        $data['discount_percent'] = 0;
        if ($data['old_price'] > 0 && $data['price'] > 0) {
            $data['discount_percent'] = round(
                (($data['old_price'] - $data['price']) / $data['old_price']) * 100
            );
        }

        // Add the availability status
        $stock = $data['stock'] ?? 0;
        if ($stock <= 0) {
            $data['availability'] = 'out_of_stock';
            $data['availability_text'] = 'Out of stock';
        } elseif ($stock < 5) {
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

::: info The review model in the example is yours
MiniShop3 has no `msProductReview` class: in the example it stands for your own review model, or any other source of related data. Substitute the real class of your extra.
:::

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];

        // Add the review count
        $reviewCount = $modx->getCount('msProductReview', [
            'product_id' => $data['id'],
            'published' => 1,
        ]);
        $data['review_count'] = $reviewCount;

        // Add the average rating
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

        // 1. Discount by category
        $categoryDiscounts = [
            5 => 10,  // Category 5 — 10% off
            10 => 15, // Category 10 — 15% off
        ];
        if (isset($categoryDiscounts[$data['parent']])) {
            $discount = $categoryDiscounts[$data['parent']];
            $price = $price * (1 - $discount / 100);
            $discounts['category'] = $discount;
        }

        // 2. Discount for signed-in customers
        if ($modx->user->isAuthenticated()) {
            $price = $price * 0.95; // -5%
            $discounts['member'] = 5;
        }

        // 3. VIP discount
        if ($modx->user->isMember('VIP')) {
            $price = $price * 0.9; // -10%
            $discounts['vip'] = 10;
        }

        // Keep the discount breakdown for msOnGetProductFields
        $modx->eventData['discounts'] = $discounts;
        $modx->eventData['msOnGetProductPrice']['price'] = $price;

        $values = &$modx->event->returnedValues;
        $values['price'] = round($price, 2);
        break;

    case 'msOnGetProductFields':
        $data = $modx->eventData['msOnGetProductFields']['data']
            ?? $scriptProperties['data'];

        // Add the discount breakdown
        $discounts = $modx->eventData['discounts'] ?? [];
        if (!empty($discounts)) {
            $data['applied_discounts'] = $discounts;
            $data['total_discount'] = array_sum($discounts);
        }

        // Add the badges
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

## msOnGetPublicSeo

Fired in `PublicSeoService` after the SEO set and the TV overlay map (`ms3_public_seo_tv_map`) are assembled, just before the final whitelist. Works for both products and categories. On list and tree requests `include_seo=0` by default; on get it is `1`.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `seo` | `array` | The current SEO whitelist |
| `payload` | `array` | The catalog row (product or category) |
| `og_type` | `string` | `product`, or `website` for a category |

### Modifying

A plugin returns a patch in `$modx->event->returnedValues['seo']`. Unknown keys are dropped by the whitelist. `og.title` / `og.description` copy `title` / `description` unless the patch sets them explicitly in `seo.og`.

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetPublicSeo':
        $seo = $scriptProperties['seo'];
        $payload = $scriptProperties['payload'];
        $ogType = $scriptProperties['og_type'];

        if ($ogType === 'product' && !empty($payload['vendor'])) {
            $seo['description'] = trim(($seo['description'] ?? '') . ' — ' . $payload['vendor']);
        }

        $values = &$modx->event->returnedValues;
        $values['seo'] = $seo;
        break;
}
```
