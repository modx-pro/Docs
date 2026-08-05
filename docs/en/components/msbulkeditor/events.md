---
title: MODX events
description: msbeOn* plugins — apply, fields, export extension
---

# MODX events

On apply, msBulkEditor fires system events. Register them in a plugin.

| Event | When | Useful properties |
| --- | --- | --- |
| `msbeOnBulkOperationStarted` | Apply start | `operationId`, … |
| `msbeOnBulkOperationCompleted` | Successful finish | `operationId`, `success`, `skipped`, `error` |
| `msbeOnBulkOperationFailed` | Exception during apply | `operationId`, error message |
| `msbeOnFieldApplied` | After a successful field apply | `operationId`, `productId`, `field`, `oldValue`, `newValue`, `status` |
| `msbeOnExportColumns` | Before writing the export header | `columns`, `format`, `selection` |
| `msbeOnExportBuildRow` | Before writing each export row | `productId`, `row`, `columns`, `format`, `selection` |

Example: after `msbeOnBulkOperationCompleted`, clear Fenom cache or send a notification.

## Extending export with a plugin

A plugin can add a column and fill it per row. Return updated `columns` / `row` via `$modx->event->returnedValues`.

```php
<?php
/** @var modX $modx */
switch ($modx->event->name) {
    case 'msbeOnExportColumns':
        $columns = $modx->event->params['columns'] ?? [];
        if (!is_array($columns)) {
            $columns = [];
        }
        $columns[] = 'plugin:warehouse_code';
        $modx->event->returnedValues = ['columns' => array_values(array_unique($columns))];
        break;

    case 'msbeOnExportBuildRow':
        $row = $modx->event->params['row'] ?? [];
        if (!is_array($row)) {
            $row = [];
        }
        $productId = (int) ($modx->event->params['productId'] ?? 0);
        $row['plugin:warehouse_code'] = 'WH-' . $productId;
        $modx->event->returnedValues = ['row' => $row];
        break;
}
```

Column keys should match the field catalog (`tv:name`, `option:key`, `msbe:option:key`) or use a `plugin:` prefix for virtual columns.

## Reacting to a single field change

After apply, each item with status `applied` fires `msbeOnFieldApplied`. It also runs for inline edit (one product).

```php
<?php
/** @var modX $modx */
if ($modx->event->name !== 'msbeOnFieldApplied') {
    return;
}

$productId = (int) ($modx->event->params['productId'] ?? 0);
$field = (string) ($modx->event->params['field'] ?? '');

if ($field === 'pagetitle' && $productId > 0) {
    $modx->cacheManager->refreshResource($productId);
}
```

## Connector

Base URL: `{site}/assets/components/msbulkeditor/connector.php`.

Auth: manager session (`mgr`) + `HTTP_MODAUTH` header = `user->getUserToken('mgr')` + route permission.

Main actions: `mgr/products/list`, `preview`, `apply`, `rollback`, `mgr/history/*`, `mgr/export/run`, `mgr/import/parse`, `mgr/import/run`, `mgr/bindings/check`, `mgr/bindings/apply`.

Response shape:

```json
{
  "success": true,
  "message": "",
  "object": { }
}
```

Errors: `"success": false`, `"message": "msbulkeditor_*"` — lexicon key.

Take modAuth from an open msBulkEditor page (`window.msBulkEditorConfig.modAuth`). Do not put the token in public scripts.

## Database

| Table | Purpose |
| --- | --- |
| `msbe_operations` | Operation header (type, status, counters) |
| `msbe_operation_items` | Per-product snapshots for rollback |
| `msbe_presets` | Saved presets |

See also: [System settings](settings), [History](interface/history).
