---
title: msProducts snippet events
---
# msProducts snippet events

Events for integrating third-party packages (ms3Variants, msBrands, etc.) into the msProducts snippet without modifying MiniShop3 core code.

::: tip usePackages parameter
To enable a package's data loading, pass its name in the snippet parameter:
```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants,msBrands'
]}
```
Plugins check for their package in this parameter and load data only when needed.
:::

## msOnProductsLoad

Fired after the product list is loaded from the database, before processing. Intended for **bulk loading** of extra data in a single query — avoids N+1.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `rows` | `array` (reference) | Product rows, can be modified |
| `productIds` | `array` | Array of product IDs `[1, 2, 3, ...]` |
| `usePackages` | `array` | Requested packages `['ms3Variants', 'msBrands']` |
| `scriptProperties` | `array` | All snippet call parameters |

### Basic example

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductsLoad':
        // Check if our package was requested
        $usePackages = $scriptProperties['usePackages'] ?? [];
        if (!in_array('myPackage', $usePackages)) {
            return;
        }

        // Load data for ALL products in one query
        $productIds = $scriptProperties['productIds'];

        // Your data loading logic
        $myData = loadDataForProducts($productIds);

        // Store in eventData for use in msOnProductPrepare
        $modx->eventData['myPackage'] = [
            'dataMap' => $myData,
        ];
        break;
}
```

### Example: loading product variants (ms3Variants)

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductsLoad':
        // Check if our package was requested
        $usePackages = $scriptProperties['usePackages'] ?? [];
        if (!in_array('ms3Variants', $usePackages)) {
            return;
        }

        // Check if package is installed
        if (!$modx->services->has('ms3variants')) {
            return;
        }

        // Load variants for ALL products in one query
        $productIds = $scriptProperties['productIds'];
        $variantService = $modx->services->get('ms3variants_variant_service');

        // Store in eventData for msOnProductPrepare
        $modx->eventData['ms3variants'] = [
            'variantsMap' => $variantService->getVariantsForProducts($productIds, ['active' => true]),
        ];
        break;
}
```

---

## msOnProductPrepare

Fired when preparing each product for output. Used to attach data loaded in `msOnProductsLoad` to the current product.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `array` (reference) | Product data, can be modified |
| `productId` | `int` | Product ID |
| `idx` | `int` | Index of the product in the result set |

### Basic example

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductPrepare':
        // No data — package was not requested or not installed
        $myData = $modx->eventData['myPackage']['dataMap'] ?? null;
        if ($myData === null) {
            return;
        }

        $productId = $scriptProperties['productId'];
        $row = &$scriptProperties['row'];

        // Attach data to product
        if (isset($myData[$productId])) {
            $row['my_field'] = $myData[$productId];
        }
        break;
}
```

### Example: attaching variants (ms3Variants)

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductPrepare':
        // No data — package was not requested
        $variantsMap = $modx->eventData['ms3variants']['variantsMap'] ?? null;
        if ($variantsMap === null) {
            return;
        }

        $productId = $scriptProperties['productId'];
        $row = &$scriptProperties['row'];

        if (isset($variantsMap[$productId])) {
            $row['variants'] = $variantsMap[$productId];
            $row['variants_count'] = count($variantsMap[$productId]);
            $row['variants_json'] = json_encode($variantsMap[$productId]);
            $row['has_variants'] = true;
        } else {
            $row['variants'] = [];
            $row['variants_count'] = 0;
            $row['variants_json'] = '[]';
            $row['has_variants'] = false;
        }
        break;
}
```

---

## Full integration plugin example

Plugin that adds a "New" badge to products created in the last 7 days.

```php
<?php
/**
 * Plugin: Product badges
 * Events: msOnProductsLoad, msOnProductPrepare
 */

switch ($modx->event->name) {

    case 'msOnProductsLoad':
        // Check parameter
        $usePackages = $scriptProperties['usePackages'] ?? [];
        if (!in_array('msBadges', $usePackages)) {
            return;
        }

        $rows = $scriptProperties['rows'];
        $weekAgo = strtotime('-7 days');

        // Mark products created in the last 7 days
        $newProducts = [];
        foreach ($rows as $row) {
            if (strtotime($row['createdon']) > $weekAgo) {
                $newProducts[$row['id']] = true;
            }
        }

        // Store for msOnProductPrepare
        $modx->eventData['msBadges'] = [
            'newProducts' => $newProducts,
        ];
        break;

    case 'msOnProductPrepare':
        $badgesData = $modx->eventData['msBadges'] ?? null;
        if ($badgesData === null) {
            return;
        }

        $productId = $scriptProperties['productId'];
        $row = &$scriptProperties['row'];

        $badges = [];

        // "New" badge
        if (!empty($badgesData['newProducts'][$productId])) {
            $badges[] = [
                'type' => 'new',
                'label' => 'New',
                'color' => '#28a745',
            ];
        }

        // "Sale" badge (if old_price exists)
        if (!empty($row['old_price']) && $row['old_price'] > $row['price']) {
            $discount = round((($row['old_price'] - $row['price']) / $row['old_price']) * 100);
            $badges[] = [
                'type' => 'sale',
                'label' => "-{$discount}%",
                'color' => '#dc3545',
            ];
        }

        $row['badges'] = $badges;
        $row['badges_json'] = json_encode($badges);
        $row['has_badges'] = !empty($badges);
        break;
}
```

### Using in template

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'msBadges',
    'tpl' => 'tpl.msProducts.badges'
]}
```

**Chunk tpl.msProducts.badges:**

```fenom
<div class="product-card">
    {if $has_badges}
        <div class="product-badges">
            {foreach $badges as $badge}
                <span class="badge" style="background: {$badge.color}">
                    {$badge.label}
                </span>
            {/foreach}
        </div>
    {/if}

    <h3>{$pagetitle}</h3>
    <div class="price">{$price} руб.</div>
</div>
```

---

## Passing data between events

Use `$modx->eventData` to pass data between events:

```php
// In msOnProductsLoad — store
$modx->eventData['myPackage'] = [
    'dataMap' => $loadedData,
    'settings' => $mySettings,
];

// In msOnProductPrepare — read
$dataMap = $modx->eventData['myPackage']['dataMap'] ?? null;
$settings = $modx->eventData['myPackage']['settings'] ?? [];
```

::: warning Data isolation
Use your package name as the key in `eventData` to avoid conflicts with other plugins.
:::

---

## Performance

Events are designed for optimal performance:

1. **msOnProductsLoad** — runs **once** to load data for all products
2. **msOnProductPrepare** — runs per product but only attaches already-loaded data

This avoids the N+1 query problem:

```
❌ Without bulk loading: 1 query for list + N queries for variants = O(N+1)
✅ With bulk loading:     1 query for list + 1 query for all variants = O(2)
```
