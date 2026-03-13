---
title: Import events
---
# Import events

Events for managing product import from CSV files.

::: info Context
These events are fired when importing products via the manager import utility. They let you modify data, skip rows or run extra logic.
:::

## msOnBeforeImport

Fired **before** import starts. Lets you validate parameters or cancel import.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | `string` | Path to import file |
| `params` | `array` (by reference) | Import parameters |

**params structure:**

```php
[
    'file' => 'path/to/file.csv',
    'fields' => 'pagetitle,price,parent', // or mapping
    'mapping' => [0 => 'pagetitle', 1 => 'price', ...],
    'update' => true,           // allow update
    'key' => 'article',         // field for duplicate lookup
    'skip_header' => true,      // skip header row
    'is_debug' => false,        // debug mode
    'delimiter' => ';',         // delimiter
    'keys' => ['pagetitle', 'price', ...], // final field list
    'tv_enabled' => false,     // has TV fields
    'option_enabled' => false, // has options
]
```

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeImport':
        $file = $scriptProperties['file'];
        $params = &$scriptProperties['params'];

        // Check file size
        if (filesize($file) > 10 * 1024 * 1024) { // 10MB
            $modx->event->output('File is too large');
            return 'cancel';
        }

        // Check business hours
        $hour = (int)date('G');
        if ($hour >= 10 && $hour < 18) {
            $modx->event->output('Import is disabled during business hours');
            return 'cancel';
        }
        break;
}
```

### Modifying parameters

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeImport':
        $params = &$scriptProperties['params'];

        // Add default value for field
        $params['default_vendor'] = 1;

        // Change duplicate key
        if (empty($params['key'])) {
            $params['key'] = 'article';
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Starting import: %s, fields: %d',
            basename($params['file']),
            count($params['keys'])
        ));
        break;
}
```

---

## msOnAfterImport

Fired **after** import completes. Lets you run post-processing or send notifications.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `stats` | `array` | Import statistics |

**stats structure:**

```php
[
    'total' => 150,    // total rows
    'created' => 120,  // products created
    'updated' => 25,   // products updated
    'errors' => 3,     // errors
    'skipped' => 2,    // skipped
]
```

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterImport':
        $stats = $scriptProperties['stats'];

        // Log results
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Completed: total %d, created %d, updated %d, errors %d',
            $stats['total'],
            $stats['created'],
            $stats['updated'],
            $stats['errors']
        ));

        // Notify admin
        if ($stats['errors'] > 0) {
            $message = "Import completed with errors!\n\n";
            $message .= "Created: {$stats['created']}\n";
            $message .= "Updated: {$stats['updated']}\n";
            $message .= "Errors: {$stats['errors']}\n";

            // mail($adminEmail, 'Import report', $message);
        }
        break;
}
```

---

## msOnImportRow

Fired when processing **each row** of the CSV. Lets you modify data or skip the row.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `row` | `int` | Current row number |
| `csv` | `array` | Raw CSV row data |
| `data` | `array` (by reference) | Data for create/update |
| `tvData` | `array` (by reference) | TV field data |
| `optionData` | `array` (by reference) | Product option data |
| `gallery` | `array` (by reference) | Gallery image paths |

### Skipping a row

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $row = $scriptProperties['row'];

        // Skip products without price
        if (empty($data['price']) || $data['price'] <= 0) {
            $modx->log(modX::LOG_LEVEL_WARN, sprintf(
                '[Import] Row %d skipped: no price',
                $row
            ));
            return 'cancel';
        }

        // Skip certain categories
        $excludedParents = [10, 15, 20];
        if (in_array($data['parent'], $excludedParents)) {
            return 'cancel';
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $csv = $scriptProperties['csv'];
        $tvData = &$scriptProperties['tvData'];
        $optionData = &$scriptProperties['optionData'];

        // Generate alias from title
        if (empty($data['alias'])) {
            $data['alias'] = $modx->filterPathSegment($data['pagetitle']);
        }

        // Set default values
        if (empty($data['template'])) {
            $data['template'] = 5; // product template
        }

        // Auto-calculate old price
        if (!empty($data['price']) && empty($data['old_price'])) {
            $data['old_price'] = round($data['price'] * 1.2, 2);
        }

        // Add TV from data
        if (!empty($data['brand'])) {
            $tvData['product_brand'] = $data['brand'];
            unset($data['brand']);
        }

        // Add options
        if (!empty($csv[10])) { // column 10 = color
            $optionData['color'] = $csv[10];
        }
        break;
}
```

### Gallery handling

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $gallery = &$scriptProperties['gallery'];

        // Add images from external source
        if (!empty($data['external_images'])) {
            $images = explode(',', $data['external_images']);
            foreach ($images as $imageUrl) {
                $localPath = $this->downloadImage(trim($imageUrl));
                if ($localPath) {
                    $gallery[] = $localPath;
                }
            }
            unset($data['external_images']);
        }

        // Auto main image from SKU
        if (!empty($data['article']) && empty($gallery)) {
            $imagePath = "assets/images/products/{$data['article']}.jpg";
            if (file_exists(MODX_BASE_PATH . $imagePath)) {
                $gallery[] = $imagePath;
            }
        }
        break;
}
```

### Validation and data cleanup

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $row = $scriptProperties['row'];

        // Price cleanup and validation
        if (!empty($data['price'])) {
            $data['price'] = preg_replace('/[^\d.,]/', '', $data['price']);
            $data['price'] = str_replace(',', '.', $data['price']);
            $data['price'] = (float)$data['price'];
        }

        // Article validation
        if (!empty($data['article'])) {
            $data['article'] = mb_strtoupper(trim($data['article']));

            if (!preg_match('/^[A-Z0-9\-]+$/', $data['article'])) {
                $modx->log(modX::LOG_LEVEL_ERROR, sprintf(
                    '[Import] Row %d: invalid article "%s"',
                    $row,
                    $data['article']
                ));
                return 'cancel';
            }
        }

        // Strip HTML from title
        $data['pagetitle'] = strip_tags($data['pagetitle']);
        $data['pagetitle'] = html_entity_decode($data['pagetitle'], ENT_QUOTES, 'UTF-8');

        // Limit description length
        if (!empty($data['description']) && mb_strlen($data['description']) > 500) {
            $data['description'] = mb_substr($data['description'], 0, 497) . '...';
        }
        break;
}
```

---

## Full example: extended import

```php
<?php
/**
 * Plugin: Extended product import
 * Events: msOnBeforeImport, msOnImportRow, msOnAfterImport
 */

switch ($modx->event->name) {

    case 'msOnBeforeImport':
        $params = &$scriptProperties['params'];

        $modx->eventData['import_start'] = microtime(true);
        $modx->eventData['import_log'] = [];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Starting import: %s',
            basename($params['file'])
        ));
        break;

    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $tvData = &$scriptProperties['tvData'];
        $optionData = &$scriptProperties['optionData'];
        $gallery = &$scriptProperties['gallery'];
        $row = $scriptProperties['row'];

        // 1. Generate alias
        if (empty($data['alias'])) {
            $data['alias'] = $modx->filterPathSegment($data['pagetitle']);
            if (!empty($data['article'])) {
                $data['alias'] .= '-' . mb_strtolower($data['article']);
            }
        }

        // 2. Process prices
        foreach (['price', 'old_price', 'wholesale_price'] as $priceField) {
            if (isset($data[$priceField])) {
                $data[$priceField] = (float)str_replace([' ', ','], ['', '.'], $data[$priceField]);
            }
        }

        // 3. Calculate discount
        if ($data['price'] > 0 && $data['old_price'] > $data['price']) {
            $discount = round((($data['old_price'] - $data['price']) / $data['old_price']) * 100);
            $tvData['discount_percent'] = $discount;
        }

        // 4. Auto stock status
        if (isset($data['remains'])) {
            $remains = (int)$data['remains'];
            $data['remains'] = $remains;
            if ($remains <= 0) {
                $data['published'] = 0;
            }
        }

        // 5. Options from CSV
        if (!empty($data['specifications'])) {
            // Format: "Color:Red;Size:XL;Material:Cotton"
            $specs = explode(';', $data['specifications']);
            foreach ($specs as $spec) {
                $parts = explode(':', $spec, 2);
                if (count($parts) === 2) {
                    $key = mb_strtolower(trim($parts[0]));
                    $key = preg_replace('/[^a-zа-яё0-9_]/u', '_', $key);
                    $optionData[$key] = trim($parts[1]);
                }
            }
            unset($data['specifications']);
        }

        // 6. Log
        $modx->eventData['import_log'][] = sprintf(
            'Row %d: %s (price: %s)',
            $row,
            $data['pagetitle'],
            $data['price'] ?? 'N/A'
        );
        break;

    case 'msOnAfterImport':
        $stats = $scriptProperties['stats'];
        $startTime = $modx->eventData['import_start'] ?? microtime(true);
        $duration = round(microtime(true) - $startTime, 2);

        $report = [
            'duration' => $duration . ' sec',
            'total' => $stats['total'],
            'created' => $stats['created'],
            'updated' => $stats['updated'],
            'errors' => $stats['errors'],
            'skipped' => $stats['skipped'],
        ];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Completed in %s sec. Created: %d, updated: %d, errors: %d',
            $duration,
            $stats['created'],
            $stats['updated'],
            $stats['errors']
        ));

        $reportFile = MODX_CORE_PATH . 'cache/import_reports/' . date('Y-m-d_H-i-s') . '.json';
        if (!is_dir(dirname($reportFile))) {
            mkdir(dirname($reportFile), 0755, true);
        }
        file_put_contents($reportFile, json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        $modx->cacheManager->refresh();

        if ($stats['errors'] > 0) {
            $adminEmail = $modx->getOption('emailsender');
            // mail($adminEmail, 'Import completed with errors', json_encode($report));
        }
        break;
}
```
