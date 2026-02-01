---
title: Scheduler
description: Integration with Scheduler for background tasks
---
# Scheduler integration

MiniShop3 integrates with the [Scheduler](https://modstore.pro/packages/utilities/scheduler) component for background task execution. Scheduler lets you defer resource-heavy operations and run them asynchronously.

## Requirements

- **Scheduler 1.8.0+** — for recurring task support
- Older versions work but without automatic task restart

## Enabling integration

Integration is off by default. To enable:

1. Install the Scheduler component
2. Configure a cron job for Scheduler (see Scheduler docs)
3. Enable setting `ms3_use_scheduler`:

```php
$modx->setOption('ms3_use_scheduler', true);
```

Or in the manager: **System → System Settings → minishop3 → ms3_use_scheduler**

## Built-in tasks

MiniShop3 registers these tasks on install:

### ms3_cleanup_tokens

Cleans up expired customer auth tokens.

| Parameter | Value |
|----------|--------|
| **Type** | Recurring |
| **Interval** | 1 week |
| **File** | `elements/tasks/cleanupTokens.php` |

Removes rows from `ms3_customer_tokens` where the token has expired. Prevents stale data buildup.

### ms3_cleanup_drafts

Cleans up old order drafts.

| Parameter | Value |
|----------|--------|
| **Type** | Recurring |
| **Interval** | 1 day |
| **File** | `elements/tasks/cleanupDrafts.php` |

Deletes orders with "Draft" status older than the period set in `ms3_delete_drafts_after`.

**Period setting:**

```php
// Delete drafts older than 2 weeks
$modx->setOption('ms3_delete_drafts_after', '-2 weeks');

// Delete drafts older than 1 month
$modx->setOption('ms3_delete_drafts_after', '-1 month');

// Disable auto-delete (empty value)
$modx->setOption('ms3_delete_drafts_after', '');
```

::: tip Value format
The setting accepts any value valid for PHP `strtotime()`: `-1 day`, `-2 weeks`, `-1 month`, `-1 year`, etc.
:::

### ms3_csv_import

Background product import from CSV.

| Parameter | Value |
|----------|--------|
| **Type** | One-time |
| **Interval** | — |
| **File** | `elements/tasks/csvImport.php` |

Used for large CSV imports. When the sync import limit (`ms3_import_sync_limit`) is exceeded, the job is queued in Scheduler automatically.

**Script properties:**

```php
$scriptProperties = [
    'file' => 'path/to/file.csv',  // Path to CSV
    'mapping' => [...],             // Column mapping
    'options' => [...],             // Import options
];
```

### ms3_send_notification

Deferred notification sending.

| Parameter | Value |
|----------|--------|
| **Type** | One-time |
| **Interval** | — |
| **File** | `elements/tasks/sendNotification.php` |

Sends notifications asynchronously so the main request is not blocked. Useful for slow channels (Telegram, SMS).

**Script properties:**

```php
$scriptProperties = [
    'notification_class' => 'MiniShop3\Notifications\Order\StatusChangedNotification',
    'order_id' => 123,
    'channel' => 'telegram',
    'recipient_type' => 'manager',  // customer or manager
    'recipient' => [...],
    'notification_data' => [...],
];
```

## Monitoring tasks

### Via manager

Go to **Extras → Scheduler** to view:

- Registered tasks
- Scheduled runs
- Execution history

### Via API

```php
/** @var \Scheduler $scheduler */
$scheduler = $modx->services->get('scheduler');

// Get task
$task = $scheduler->getTask('minishop3', 'ms3_cleanup_tokens');

// Get last run
$lastRun = $task->getLastRun();
if ($lastRun) {
    echo "Status: " . $lastRun->get('status');
    echo "Completed: " . $lastRun->get('completed');
}
```

## Running tasks manually

### Via manager

1. Go to **Extras → Scheduler → Tasks**
2. Find the task (namespace: minishop3)
3. Click **Schedule Run**

### Via PHP

```php
/** @var \Scheduler $scheduler */
$scheduler = $modx->services->get('scheduler');

// Get task
$task = $scheduler->getTask('minishop3', 'ms3_cleanup_tokens');

// Schedule run
$task->schedule('+1 minute');

// Or run immediately (synchronous)
$task->runNow();
```

## Creating custom tasks

### Registering a task

```php
/** @var \Scheduler $scheduler */
$scheduler = $modx->services->get('scheduler');

// Create task
$task = $modx->newObject('sTask');
$task->fromArray([
    'class_key' => 'sFileTask',
    'namespace' => 'mypackage',
    'reference' => 'my_custom_task',
    'content' => 'elements/tasks/myTask.php',  // Relative to core/components/mypackage/
    'description' => 'My custom MiniShop3 task',
    'recurring' => true,
    'interval' => '+1 hour',
]);
$task->save();

// Schedule first run
$task->schedule('+1 minute');
```

### Task file

```php
<?php
/**
 * @var modX $modx
 * @var sFileTask $task
 * @var sTaskRun $run
 * @var array $scriptProperties
 */

// Get MiniShop3 service
$ms3 = $modx->services->get('ms3');

// Your logic
try {
    // ... run task ...

    $modx->log(modX::LOG_LEVEL_INFO, "[myTask] Completed successfully");
    return true;
} catch (\Exception $e) {
    $run->addError($e->getMessage());
    return false;
}
```

## Related settings

| Setting | Default | Description |
|-----------|--------------|-------------|
| `ms3_use_scheduler` | `false` | Enable Scheduler integration |
| `ms3_delete_drafts_after` | | Draft retention period (strtotime format) |
| `ms3_import_sync_limit` | `300` | Sync import row limit |

## Troubleshooting

### Tasks not running

1. **Check cron:** Scheduler needs cron configured
2. **Check permissions:** Task files must be readable by the web server
3. **Check logs:** Scheduler logs to MODX Error Log

### Recurring tasks not restarting

- Requires Scheduler 1.8.0 or higher
- Check the `recurring` field in task settings

### Task errors

Task logs are available in:

- MODX Error Log (`core/cache/logs/error.log`)
- Scheduler → Task Runs → select run → View Errors
