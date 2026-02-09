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
