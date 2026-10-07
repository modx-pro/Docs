---
title: Vendor events
---
# Vendor events

Tracking operations on vendors (brands).

::: warning Vue settings vs processors
Vendor CRUD in the manager (**Extras → MiniShop3 → Vendors**) goes through `VendorsController` (Manager API) **without** `$modx->invokeEvent`. The events below fire only when the older processors `MiniShop3\Processors\Settings\Vendor\*` are called (`runProcessor`, the old connector). To intercept changes made in the Vue manager, add your own REST middleware after the save, or extend the controller in an add-on.
:::

## msOnBeforeVendorCreate

Fired **before** creating a vendor.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msVendor` | `msVendor` | Vendor object |
| `object` | `msVendor` | The same reference as `msVendor` (MS2-style alias) |
| `mode` | `string` | Mode: `new` |
| `data` | `array` | Vendor fields at call time (`$object->toArray()`) |
| `id` | `int` | Vendor ID (`0` — not created yet) |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeVendorCreate':
        /** @var \MiniShop3\Model\msVendor $vendor */
        $vendor = $scriptProperties['msVendor'];

        $existing = $modx->getObject(\MiniShop3\Model\msVendor::class, [
            'name' => $vendor->get('name'),
        ]);

        if ($existing) {
            $modx->event->output('A vendor with this name already exists');
            return;
        }
        break;
}
```

---

## msOnVendorCreate

Fired **after** creating a vendor.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msVendor` | `msVendor` | Created vendor object |
| `object` | `msVendor` | The same reference as `msVendor` (MS2-style alias) |
| `mode` | `string` | Mode: `new` |
| `id` | `int` | ID of the created vendor |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnVendorCreate':
        $vendor = $scriptProperties['msVendor'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Vendor] Created vendor: %s (ID: %d)',
            $vendor->get('name'),
            $vendor->get('id')
        ));

        // $page = $modx->newObject('modResource', [...]);
        break;
}
```

---

## msOnBeforeVendorUpdate

Fired **before** updating a vendor.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msVendor` | `msVendor` | Vendor object (fields already hold the NEW values — no snapshot of the old ones) |
| `object` | `msVendor` | The same reference as `msVendor` (MS2-style alias) |
| `mode` | `string` | Mode: `upd` |
| `data` | `array` | Vendor fields at call time — already the new values (`$object->toArray()`) |
| `id` | `int` | ID of the vendor being updated |

::: warning The previous field values are gone
By the time this event fires, `msVendor` already holds the new values — MODX applies them before `beforeSaveEvent` runs. The object has no `getPrevious()`-style method, so take the "before" snapshot earlier, for example in the controller ahead of `runProcessor`.
:::

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        // Reject an empty name
        if (trim((string) $vendor->get('name')) === '') {
            $modx->event->output('Vendor name cannot be empty');
            return;
        }
        break;
}
```

---

## msOnVendorUpdate

Fired **after** updating a vendor.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msVendor` | `msVendor` | Updated vendor object |
| `object` | `msVendor` | The same reference as `msVendor` (MS2-style alias) |
| `mode` | `string` | Mode: `upd` |
| `id` | `int` | ID of the updated vendor |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        $before = $modx->eventData['vendor_before'] ?? [];

        if ($before['name'] !== $vendor->get('name')) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Vendor] Renamed: %s → %s',
                $before['name'],
                $vendor->get('name')
            ));
        }
        break;
}
```

---

## msOnBeforeVendorDelete

Fired **before** deleting a vendor.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msVendor` | `msVendor` | Vendor object to delete |
| `object` | `msVendor` | The same reference as `msVendor` (MS2-style alias) |
| `id` | `int` | ID of the vendor being deleted |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeVendorDelete':
        $vendor = $scriptProperties['msVendor'];

        $productCount = $modx->getCount(\MiniShop3\Model\msProductData::class, [
            'vendor_id' => $vendor->get('id'),
        ]);

        if ($productCount > 0) {
            $modx->event->output(sprintf(
                'Cannot delete vendor: %d products are linked',
                $productCount
            ));
            return;
        }
        break;
}
```

---

## msOnVendorDelete

Fired **after** deleting a vendor.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msVendor` | `msVendor` | Deleted vendor object |
| `object` | `msVendor` | The same reference as `msVendor` (MS2-style alias) |
| `id` | `int` | ID of the deleted vendor |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnVendorDelete':
        $vendor = $scriptProperties['msVendor'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Vendor] Deleted vendor: %s (ID: %d)',
            $vendor->get('name'),
            $vendor->get('id')
        ));

        $modx->cacheManager->delete('vendors_list');
        break;
}
```

---

## Full example: catalog sync

```php
<?php
/**
 * Plugin: Vendor sync
 * Events: msOnVendorCreate, msOnVendorUpdate, msOnVendorDelete
 */

switch ($modx->event->name) {

    case 'msOnVendorCreate':
        $vendor = $scriptProperties['msVendor'];

        $brandsParent = $modx->getOption('brands_resource_id', null, 0);
        if ($brandsParent) {
            $page = $modx->newObject('modResource', [
                'pagetitle' => $vendor->get('name'),
                'alias' => $modx->filterPathSegment($vendor->get('name')),
                'parent' => $brandsParent,
                'template' => $modx->getOption('brands_template_id', null, 0),
                'published' => 1,
                'content' => $vendor->get('description'),
            ]);
            $page->setTVValue('vendor_id', $vendor->get('id'));
            $page->save();

            $vendor->set('resource_id', $page->get('id'));
            $vendor->save();
        }
        break;

    case 'msOnVendorUpdate':
        $vendor = $scriptProperties['msVendor'];

        $resourceId = $vendor->get('resource_id');
        if ($resourceId) {
            $page = $modx->getObject('modResource', $resourceId);
            if ($page) {
                $page->set('pagetitle', $vendor->get('name'));
                $page->set('content', $vendor->get('description'));
                $page->save();
            }
        }
        break;

    case 'msOnVendorDelete':
        $vendor = $scriptProperties['msVendor'];

        $resourceId = $vendor->get('resource_id');
        if ($resourceId) {
            $page = $modx->getObject('modResource', $resourceId);
            if ($page) {
                $page->remove();
            }
        }
        break;
}
```
