# Indexing

Tab for creating and managing the search index.

## Purpose

Building the index is resource-heavy, so it runs in batches via Ajax. On this tab you can create an index, watch progress, and clear it if needed.

## Interface

### Statistics

| Metric | Description |
|--------|-------------|
| Total resources | Total resources in the system |
| Indexed | Resources in the index |
| Words in index | Total word count |

### Controls

| Control | Description |
|---------|-------------|
| Batch size | Resources per request (1–500) |
| Create index | Start indexing |
| Clear index | Remove all index entries |

### Progress bar

Shows indexing progress in percent.

## How indexing works

1. **Data extraction** — resource fields are loaded from DB per `mse_index_fields`
2. **Splitting** — text split by regex from `mse_index_split_words`
3. **Filtering** — words shorter than `mse_index_min_word_length` are dropped
4. **Morphology** — base forms generated via phpMorphy for each word
5. **Save** — words and weights written to index table

## System settings

| Setting | Default | Description |
|---------|---------|-------------|
| `mse_index_fields` | `pagetitle:3,...` | Indexed fields with weights |
| `mse_index_min_word_length` | `3` | Minimum word length |
| `mse_index_split_words` | `#\s\|[,.:;!?...]#u` | Regex for splitting |
| `mse_use_scheduler` | `false` | Use Scheduler for deferred indexing |

## Field weights

`mse_index_fields` sets weight per field. Format:

```
field1:weight1,field2:weight2,...
```

Higher weight ranks matches in that field higher.

### Example configs

**Standard:**

```
pagetitle:3,longtitle:2,description:2,introtext:2,content:1
```

**With TV:**

```
pagetitle:3,content:1,tv_subtitle:2,tv_keywords:3
```

**MiniShop3 products:**

```
pagetitle:3,description:2,content:1,article:5,vendor_name:2
```

## When to reindex

The index updates automatically on resource save. Full reindex is needed:

- After first install
- After changing indexing settings
- After bulk content import

## Recommendations

| Batch size | Use case |
|------------|----------|
| 50 | Default for most servers |
| 10–20 | Weak servers or large documents |
| 100+ | Strong servers and fast hosting |

::: tip Optimal value
If you get timeout errors during indexing, reduce batch size.
:::

## Scheduler integration

mSearch supports deferred indexing via [Scheduler](/en/components/scheduler/), so indexing runs in the background and does not slow down saves.

### Enabling

1. Install **Scheduler**
2. Enable system setting `mse_use_scheduler`

### Behavior

On resource save:

| Without Scheduler | With Scheduler |
|------------------|----------------|
| Indexing runs immediately | Task added to queue |
| Slows save | Save is fast |
| Blocks interface | Indexing in background |

### Task mse_index_resource

The task is registered automatically when mSearch is installed (if Scheduler is already installed).

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `resource_id` | Resource ID to index |
| *(none)* | Full reindex of all resources |

### Manual full reindex

1. Go to **Extras → Scheduler**
2. Find task `mse_index_resource` (namespace: `msearch`)
3. Run the task with no parameters

::: tip Regular reindex
Use Scheduler to run reindex on a schedule, e.g. weekly.
:::

### Logging

The task logs progress to MODX log:

```
[mSearch indexResource task] Starting full reindex...
[mSearch indexResource task] Progress: 100/500 (indexed: 100)
...
[mSearch indexResource task] Full reindex completed. Total indexed: 500
```

### Fallback without Scheduler

If Scheduler is not installed or the task is missing, mSearch falls back to direct indexing.

## Events

| Event | Description |
|-------|-------------|
| `mseOnBeforeIndex` | Before indexing a resource. Can add fields. |
| `mseOnGetWorkFields` | Change list of fields to index |
| `mseOnAfterIndex` | After indexing a resource |

### Example: custom words

```php
<?php
switch ($modx->event->name) {
    case 'mseOnBeforeIndex':
        $msearch->fields['custom_field'] = 1;
        $resource->set('custom_field', 'Extra keywords');
        break;
}
```

### Example: MiniShop3 product options

```php
<?php
switch ($modx->event->name) {
    case 'mseOnBeforeIndex':
        if ($resource->get('class_key') !== 'msProduct') {
            return;
        }

        $options = $modx->getCollection('msProductOption', [
            'product_id' => $resource->get('id'),
        ]);

        foreach ($options as $option) {
            $key = 'option_' . $option->get('key');
            $msearch->fields[$key] = 1;
            $resource->set($key, $option->get('value'));
        }
        break;
}
```
