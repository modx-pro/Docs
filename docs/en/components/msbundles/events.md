---
title: Events
description: msOnBundle* system events for msBundles plugins
---

# Events

Use these when you write a plugin: block adding a bundle, adjust the price, or stop deleting a system set in the manager.

On install the package registers events in the **msBundles** group. Prefer constants from `MsBundles\Events\BundleEventNames`.

## Cart events

| Name | When |
| --- | --- |
| `msOnBeforeBundleAdd` | Before writing rows to the cart |
| `msOnBundleAdded` | After a successful add |
| `msOnBeforeBundleRemove` | Before removal by `bundle_hash` (API or cascade) |
| `msOnBundleRemoved` | After removal |
| `msOnBeforeBundleChange` | Before syncing group qty in the cart |
| `msOnBundleChanged` | After qty sync |
| `msOnBundlePriceCalculate` | After price calculation |
| `msOnBundleStockCheck` | After stock check |

Cancel before-events: return a non-empty string from the plugin or `$modx->event->output('Reason')`.

## Manager events (CRUD)

| Name | When |
| --- | --- |
| `msOnBeforeBundleSave` | Before create/update |
| `msOnBundleSaved` | After a successful save |
| `msOnBeforeBundleDelete` | Before deleting the bundle from the DB |
| `msOnBundleDeleted` | After DB delete |

`msOnBeforeBundleRemove` fires when removing from the cart. Deleting the bundle in the manager is `msOnBeforeBundleDelete`.

## Key parameters

### msOnBeforeBundleAdd / msOnBundleAdded

`bundle`, `quantity`, `price`, `stock` / `bundle_hash` (after add), `source` = `api`.

### msOnBeforeBundleRemove / msOnBundleRemoved

`bundle_hash`, `source` = `api` \| `cart_sync`. For `cart_sync` also `product_key`.

### msOnBeforeBundleChange / msOnBundleChanged

`bundle_hash`, `product_key`, `old_quantity`, `new_quantity`, `count`, `source` = `cart_sync`.

Override qty: `returnedValues['new_quantity']` — integer ≥ 1.

### msOnBundlePriceCalculate / msOnBundleStockCheck

`bundle`, `quantity`, `result`. Override: `returnedValues['result']` → price or stock DTO.

### msOnBeforeBundleSave / msOnBundleSaved

Save: `id`, `is_new`, `bundle`, `payload`, `products`. After save: `id`, `is_new`, `bundle` (detail array).

### msOnBeforeBundleDelete / msOnBundleDeleted

`id`, `bundle` (public array before delete).

## miniShop3 events (msBundles plugin)

The plugin listens to existing MS3 events:

| MS3 event | Purpose |
| --- | --- |
| `msOnBeforeChangeInCart` | Group qty sync → `msOnBeforeBundleChange` / `msOnBundleChanged` |
| `msOnBeforeRemoveFromCart` | Cascade remove → `msOnBeforeBundleRemove` / `msOnBundleRemoved` |
| `msOnGetCart` | Legacy rows: `is_lead` / `line_index` in memory for render |

On sync error or cancel: `$modx->event->output($message)` blocks the cart operation.

## Plugin examples

Cancel add:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeBundleAdd':
        $bundle = $modx->event->params['bundle'] ?? null;
        if ($bundle && $bundle->id === 99) {
            $modx->event->output('This bundle is temporarily unavailable.');
        }
        break;
}
```

Block manager delete:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeBundleDelete':
        $id = (int) ($modx->event->params['id'] ?? 0);
        if ($id === 1) {
            $modx->event->output('System bundle cannot be deleted.');
        }
        break;
}
```

Adjust price:

```php
<?php
use MsBundles\Domain\Dto\PriceResultDto;

switch ($modx->event->name) {
    case 'msOnBundlePriceCalculate':
        /** @var PriceResultDto $result */
        $result = $modx->event->params['result'];
        $modx->event->returnedValues = [
            'result' => new PriceResultDto(
                total: $result->total * 0.95,
                originalTotal: $result->originalTotal,
                savings: $result->originalTotal - ($result->total * 0.95),
                lines: $result->lines,
            ),
        ];
        break;
}
```
