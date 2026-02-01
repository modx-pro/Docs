# Models and database

Tables and models of mFilter.

## Tables

| Table | Model | Description |
|-------|-------|-------------|
| `mfl_filter_sets` | MflFilterSet | Filter sets |
| `mfl_filter_set_resources` | MflFilterSetResource | Filter set to resource bindings |
| `mfl_slugs` | MflSlug | Filter value slugs |
| `mfl_patterns` | MflPattern | URL patterns |
| `mfl_seo_templates` | MflSeoTemplate | SEO templates |
| `mfl_word_forms` | MflWordForm | Word forms |
| `mfl_page_configs` | MflPageConfig | Page configurations |
| `mfl_cache` | MflCache | Result cache |

## MflFilterSet

Filter sets.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Set ID |
| `name` | varchar(255) | Name |
| `description` | text | Description |
| `filters` | json | Filter configuration |
| `settings` | json | Additional settings |
| `active` | tinyint(1) | Active |
| `rank` | int | Sort order |
| `createdon` | datetime | Creation date |
| `updatedon` | datetime | Update date |

### filters structure

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Vendor",
        "enabled": true,
        "rank": 1
    },
    "color": {
        "type": "default",
        "source": "option",
        "field": "color",
        "label": "Color",
        "enabled": true,
        "rank": 2
    },
    "price": {
        "type": "number",
        "source": "field",
        "field": "Data.price",
        "label": "Price",
        "enabled": true,
        "rank": 3
    }
}
```

### Example

```php
// Get set
$filterSet = $modx->getObject(MflFilterSet::class, ['id' => 1]);

// Get filters
$filters = $filterSet->get('filters');
if (is_string($filters)) {
    $filters = json_decode($filters, true);
}

// Create set
$filterSet = $modx->newObject(MflFilterSet::class);
$filterSet->fromArray([
    'name' => 'Catalog',
    'filters' => json_encode([...]),
    'active' => true
]);
$filterSet->save();
```

## MflFilterSetResource

Filter set to resource bindings.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Binding ID |
| `filter_set_id` | int | Filter set ID |
| `resource_id` | int | Resource ID |
| `include_children` | tinyint(1) | Include children |

### Example

```php
// Bind set to resource
$binding = $modx->newObject(MflFilterSetResource::class);
$binding->fromArray([
    'filter_set_id' => 1,
    'resource_id' => 5,
    'include_children' => true
]);
$binding->save();

// Find set for resource
$filterSetService = $mfilter->getFilterSetService();
$filterSet = $filterSetService->getForResource($resourceId);
```

## MflSlug

Slugs (SEO aliases) of filter values.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | ID |
| `key` | varchar(100) | Filter key |
| `value` | varchar(255) | Original value |
| `slug` | varchar(255) | SEO slug |
| `createdon` | datetime | Creation date |

### Example

```php
// Find slug
$slugObj = $modx->getObject(MflSlug::class, [
    'key' => 'vendor',
    'value' => 'Apple Inc.'
]);

$slug = $slugObj->get('slug'); // 'apple-inc'

// Create slug
$slugObj = $modx->newObject(MflSlug::class);
$slugObj->fromArray([
    'key' => 'color',
    'value' => 'Red',
    'slug' => 'red'
]);
$slugObj->save();
```

## MflPattern

URL patterns for recognizing filters.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | ID |
| `pattern` | varchar(255) | Regular expression |
| `filter_key` | varchar(100) | Filter key |
| `description` | text | Description |
| `active` | tinyint(1) | Active |
| `rank` | int | Priority |

### Example

```php
// Pattern for price
$pattern = $modx->newObject(MflPattern::class);
$pattern->fromArray([
    'pattern' => 'price_(\d+)-(\d+)',
    'filter_key' => 'price',
    'description' => 'Price range',
    'active' => true
]);
$pattern->save();
```

## MflSeoTemplate

SEO templates for metadata generation.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | ID |
| `name` | varchar(255) | Name |
| `title` | text | Title template |
| `h1` | text | H1 template |
| `description` | text | Description template |
| `text` | text | Text template |
| `conditions` | json | Application conditions |
| `active` | tinyint(1) | Active |
| `rank` | int | Priority |

### conditions structure

```json
{
    "filters": {
        "vendor": ["apple"],
        "color": ["*"]
    },
    "resources": [5, 10, 15]
}
```

### Example

```php
$template = $modx->newObject(MflSeoTemplate::class);
$template->fromArray([
    'name' => 'Apple products',
    'title' => '{$filters.vendor} — buy in Moscow | {$resource.pagetitle}',
    'h1' => '{$filters.vendor}',
    'description' => 'Buy {$filters.vendor} in online store...',
    'conditions' => json_encode([
        'filters' => ['vendor' => ['apple']]
    ]),
    'active' => true
]);
$template->save();
```

## MflWordForm

Word forms for declension.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | ID |
| `word` | varchar(255) | Word (nominative) |
| `genitive` | varchar(255) | Genitive |
| `dative` | varchar(255) | Dative |
| `accusative` | varchar(255) | Accusative |
| `instrumental` | varchar(255) | Instrumental |
| `prepositional` | varchar(255) | Prepositional |
| `plural` | varchar(255) | Plural |

### Example

```php
$wordForm = $modx->newObject(MflWordForm::class);
$wordForm->fromArray([
    'word' => 'phone',
    'genitive' => 'phone',
    'dative' => 'phone',
    'accusative' => 'phone',
    'instrumental' => 'phone',
    'prepositional' => 'phone',
    'plural' => 'phones'
]);
$wordForm->save();
```

## MflPageConfig

Page configurations (legacy, for backward compatibility).

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | ID |
| `resource_id` | int | Resource ID |
| `filters` | json | Filter configuration |
| `settings` | json | Settings |
| `createdon` | datetime | Creation date |
| `updatedon` | datetime | Update date |

## MflCache

Filtering result cache.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | ID |
| `cache_key` | varchar(64) | Cache key (MD5) |
| `resource_id` | int | Resource ID |
| `data` | mediumtext | Cached data |
| `expires` | datetime | Expiration time |
| `createdon` | datetime | Creation date |

## Migrations

All tables are created automatically when the component is installed.

### Manual table creation

```php
$manager = $modx->getManager();

// Create table
$manager->createObjectContainer(MflFilterSet::class);
$manager->createObjectContainer(MflSlug::class);
// ...

// Add index
$manager->addIndex(MflSlug::class, 'key_slug');
```

## Indexes

| Table | Index | Fields |
|-------|-------|--------|
| `mfl_slugs` | `key_slug` | key, slug |
| `mfl_slugs` | `key_value` | key, value |
| `mfl_filter_set_resources` | `resource_id` | resource_id |
| `mfl_cache` | `cache_key` | cache_key |
| `mfl_cache` | `expires` | expires |
