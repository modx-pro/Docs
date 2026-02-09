# Extending the component

mSearch can index not only MODX resources but any objects — comments, products, users, etc. This is done via adapters.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Indexer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ Resource    │  │ Comment     │  │ Product     │ │
│  │ Adapter     │  │ Adapter     │  │ Adapter     │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────┐
│              Index tables                           │
│  mse_words (resource, field, word, class_key)       │
│  mse_intro (resource, intro, class_key)             │
└─────────────────────────────────────────────────────┘
```

Each adapter:

- Declares which object classes it supports
- Defines indexed fields and their weights
- Extracts text from object fields
- Provides a batch of objects for indexing

## ContentAdapterInterface

```php
<?php

namespace MSearch\Adapters;

interface ContentAdapterInterface
{
    /**
     * Whether this adapter supports the given class
     */
    public function supports(string $className): bool;

    /**
     * Indexable fields with weights
     * @return array<string, int> [field => weight]
     */
    public function getIndexableFields(): array;

    /**
     * Extract text from an object field
     */
    public function extractContent(object $object, string $field): string;

    /**
     * Objects for batch indexing
     * @return iterable<object>
     */
    public function getObjects(array $criteria, int $limit, int $offset): iterable;

    /**
     * Total count of objects
     */
    public function getTotal(array $criteria = []): int;

    /**
     * Adapter priority (higher = checked first)
     */
    public function getPriority(): int;
}
```

## AbstractAdapter

Extend `AbstractAdapter` for convenience:

```php
<?php

namespace MSearch\Adapters;

abstract class AbstractAdapter implements ContentAdapterInterface
{
    protected \MODX\Revolution\modX $modx;
    protected \MSearch\MSearch $msearch;

    public function __construct(\MODX\Revolution\modX $modx, \MSearch\MSearch $msearch)
    {
        $this->modx = $modx;
        $this->msearch = $msearch;
    }

    /**
     * Strip HTML and normalize spaces
     */
    protected function cleanText(string $text): string
    {
        $text = strip_tags($text);
        $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
        $text = preg_replace('/\s+/', ' ', $text);
        return trim($text);
    }

    /**
     * Recursively extract text from JSON (MIGX etc.)
     */
    protected function flattenJson(mixed $data): string
    {
        if (is_string($data)) {
            $decoded = json_decode($data, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $this->flattenJson($decoded);
            }
            return $data;
        }

        if (is_array($data)) {
            $texts = [];
            foreach ($data as $value) {
                $texts[] = $this->flattenJson($value);
            }
            return implode(' ', array_filter($texts));
        }

        return '';
    }

    public function getPriority(): int
    {
        return 0;
    }
}
```

## mseOnRegisterAdapters event

Register adapters on `mseOnRegisterAdapters`, which runs when the Indexer is initialized.

**Event parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `indexer` | `Indexer` | Indexer instance |

## Example: Comment adapter

Assume you have a component with comments (model `TicketComment`) and want to index them.

### Step 1: Adapter class

File: `core/components/tickets/src/Adapters/TicketCommentAdapter.php`

```php
<?php

namespace Tickets\Adapters;

use MSearch\Adapters\AbstractAdapter;

class TicketCommentAdapter extends AbstractAdapter
{
    public function supports(string $className): bool
    {
        return is_a($className, 'TicketComment', true);
    }

    public function getIndexableFields(): array
    {
        return [
            'text' => 1,
            'name' => 2,
            'email' => 1,
        ];
    }

    public function extractContent(object $object, string $field): string
    {
        $value = $object->get($field);

        if ($field === 'text') {
            return $this->cleanText($value ?? '');
        }

        return $value ?? '';
    }

    public function getObjects(array $criteria, int $limit, int $offset): iterable
    {
        $c = $this->modx->newQuery('TicketComment');
        $c->where([
            'published' => true,
            'deleted' => false,
        ]);
        $c->sortby('id', 'ASC');
        $c->limit($limit, $offset);

        return $this->modx->getIterator('TicketComment', $c);
    }

    public function getTotal(array $criteria = []): int
    {
        return $this->modx->getCount('TicketComment', [
            'published' => true,
            'deleted' => false,
        ]);
    }

    public function getPriority(): int
    {
        return 10;
    }
}
```

### Step 2: Plugin to register adapter

**Plugin:** `TicketsMSearchAdapter`
**Events:** `mseOnRegisterAdapters`

```php
<?php
/**
 * Register comment adapter in mSearch
 *
 * @event mseOnRegisterAdapters
 */

switch ($modx->event->name) {
    case 'mseOnRegisterAdapters':
        /** @var \MSearch\Services\Indexer\Indexer $indexer */
        $indexer = $modx->event->params['indexer'];

        /** @var \MSearch\MSearch $msearch */
        $msearch = $modx->services->get('msearch');

        if (!is_dir(MODX_CORE_PATH . 'components/tickets/')) {
            return;
        }

        $indexer->addAdapter(
            new \Tickets\Adapters\TicketCommentAdapter($modx, $msearch)
        );
        break;
}
```

### Step 3: Auto-index on save

**Plugin:** `TicketsAutoIndex`
**Events:** `OnTicketCommentSave`, `OnTicketCommentRemove`

```php
<?php
/**
 * Auto-index comments
 *
 * @event OnTicketCommentSave
 * @event OnTicketCommentRemove
 */

if (!$modx->services->has('msearch')) {
    return;
}

/** @var \MSearch\MSearch $msearch */
$msearch = $modx->services->get('msearch');

switch ($modx->event->name) {
    case 'OnTicketCommentSave':
        /** @var TicketComment $comment */
        $comment = $modx->event->params['object'];

        if ($comment->get('published') && !$comment->get('deleted')) {
            $msearch->index($comment->get('id'));
        } else {
            $msearch->removeFromIndex($comment->get('id'));
        }
        break;

    case 'OnTicketCommentRemove':
        /** @var TicketComment $comment */
        $comment = $modx->event->params['object'];
        $msearch->removeFromIndex($comment->get('id'));
        break;
}
```

## Example: miniShop2 product adapter

```php
<?php

namespace MiniShop2\Adapters;

use MSearch\Adapters\AbstractAdapter;

class msProductAdapter extends AbstractAdapter
{
    public function supports(string $className): bool
    {
        return is_a($className, 'msProduct', true);
    }

    public function getIndexableFields(): array
    {
        return [
            'pagetitle' => 5,
            'longtitle' => 3,
            'description' => 2,
            'introtext' => 2,
            'content' => 1,
            'article' => 4,
            'vendor_name' => 2,
        ];
    }

    public function extractContent(object $object, string $field): string
    {
        if ($field === 'vendor_name') {
            $vendorId = $object->get('vendor');
            if ($vendorId) {
                $vendor = $this->modx->getObject('msVendor', $vendorId);
                return $vendor ? $vendor->get('name') : '';
            }
            return '';
        }

        if ($field === 'article') {
            $data = $object->getOne('Data');
            return $data ? $data->get('article') ?? '' : '';
        }

        return $this->cleanText($object->get($field) ?? '');
    }

    public function getObjects(array $criteria, int $limit, int $offset): iterable
    {
        $c = $this->modx->newQuery('msProduct');
        $c->where([
            'published' => true,
            'deleted' => false,
            'searchable' => true,
            'class_key' => 'msProduct',
        ]);
        $c->limit($limit, $offset);

        return $this->modx->getIterator('msProduct', $c);
    }

    public function getTotal(array $criteria = []): int
    {
        return $this->modx->getCount('msProduct', [
            'published' => true,
            'deleted' => false,
            'searchable' => true,
            'class_key' => 'msProduct',
        ]);
    }

    public function getPriority(): int
    {
        return 20;
    }
}
```

## Programmatic usage

### Indexing

```php
<?php
$msearch = $modx->services->get('msearch');

// Index one object
$msearch->index($objectId);

// Batch indexing
$result = $msearch->indexBatch([
    'limit' => 100,
    'offset' => 0,
]);
// ['indexed' => 95, 'offset' => 100, 'total' => 500, 'done' => false]

// Remove from index
$msearch->removeFromIndex($objectId);

// Clear index
$msearch->clearIndex();
```

### Search

```php
<?php
$msearch = $modx->services->get('msearch');

$results = $msearch->search('search query', [
    'limit' => 20,
    'offset' => 0,
]);

$results->getTotal();
$results->getIds();
$results->toArray();
$results->isEmpty();

foreach ($results as $id => $weight) {
    $resource = $modx->getObject('modResource', $id);
}
```

### Highlighting

```php
<?php
$msearch = $modx->services->get('msearch');

$highlighted = $msearch->highlight($text, $query, [
    'tagOpen' => '<mark>',
    'tagClose' => '</mark>',
    'ellipsisLength' => 200,
]);
```

## Adapter priority

Adapters are checked by priority (highest first). The first adapter whose `supports()` returns `true` is used.

```
msProductAdapter (priority: 20)     ← checked first
TicketCommentAdapter (priority: 10)
ResourceAdapter (priority: 0)       ← checked last
```

## class_key field

The index stores `class_key` for each entry, so you can:

- Index different object types in the same tables
- Filter results by type when needed
