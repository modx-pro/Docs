# Filter types

Creating custom filter types.

## Built-in types

| Type | Class | Description |
|------|-------|-------------|
| `default` | DefaultFilterType | Standard (checkbox/radio) |
| `number` | NumberFilterType | Numeric range |
| `boolean` | BooleanFilterType | Yes/No toggle |
| `date` | DateFilterType | Date range |
| `day` | DayFilterType | Day filter |
| `month` | MonthFilterType | Month filter |
| `year` | YearFilterType | Year filter |
| `vendors` | VendorsFilterType | MS3 vendors |
| `parents` | ParentsFilterType | Parent categories |
| `colors` | ColorsFilterType | Colors with HEX codes |

## Creating a custom type

### 1. Create the class

```php
<?php
namespace MyNamespace;

use MODX\Revolution\modX;
use MFilter\Handlers\FilterTypes\AbstractFilterType;

class RatingFilterType extends AbstractFilterType
{
    /**
     * Apply filter to query
     */
    public function apply(
        \xPDOQuery $query,
        string $key,
        mixed $value,
        array $config
    ): void {
        // $value can be:
        // - string: "5"
        // - array: ["4", "5"]
        // - object for range: ["min" => 3, "max" => 5]

        $values = is_array($value) ? $value : [$value];

        if (isset($values['min']) || isset($values['max'])) {
            // Range
            $field = $this->getFieldName($key, $config);

            if (isset($values['min'])) {
                $query->where(["{$field}:>=" => (int)$values['min']]);
            }
            if (isset($values['max'])) {
                $query->where(["{$field}:<=" => (int)$values['max']]);
            }
        } else {
            // Multiple selection
            $field = $this->getFieldName($key, $config);
            $query->where(["{$field}:IN" => array_map('intval', $values)]);
        }
    }

    /**
     * Get available values for filter
     */
    public function getValues(
        string $key,
        array $config,
        array $context
    ): array {
        $values = [];

        // Generate 1–5 star values
        for ($i = 1; $i <= 5; $i++) {
            $values[] = [
                'value' => (string)$i,
                'label' => str_repeat('★', $i) . str_repeat('☆', 5 - $i),
                'count' => 0 // Updated via suggestions
            ];
        }

        return [
            'values' => $values,
            'min' => 1,
            'max' => 5,
            'step' => 1
        ];
    }

    /**
     * Get field name for query
     */
    protected function getFieldName(string $key, array $config): string
    {
        // If explicitly set in config
        if (!empty($config['field'])) {
            return $config['field'];
        }

        // Default: look in MS3 options
        return "Option.{$key}";
    }
}
```

### 2. Register the type

Create a plugin on event `OnMFilterInit`:

```php
<?php
/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

$mfilter->getFilterTypeRegistry()->register(
    'rating',
    new MyNamespace\RatingFilterType($modx)
);
```

### 3. Use in filter set

In the admin, create a filter with type `rating`:

```json
{
    "rating": {
        "type": "rating",
        "source": "option",
        "label": "Rating"
    }
}
```

## FilterTypeInterface

```php
interface FilterTypeInterface
{
    /**
     * Apply filter to query
     */
    public function apply(
        \xPDOQuery $query,
        string $key,
        mixed $value,
        array $config
    ): void;

    /**
     * Get available values
     */
    public function getValues(
        string $key,
        array $config,
        array $context
    ): array;

    /**
     * Get SQL for count (suggestions)
     */
    public function getSuggestionsQuery(
        string $key,
        array $config,
        array $context
    ): ?string;
}
```

## AbstractFilterType

Base class with helper methods:

```php
abstract class AbstractFilterType implements FilterTypeInterface
{
    protected modX $modx;

    /**
     * Get values from MS3 options
     */
    protected function getOptionValues(string $key, array $context): array;

    /**
     * Get values from TV
     */
    protected function getTVValues(string $key, array $context): array;

    /**
     * Get values from resource field
     */
    protected function getFieldValues(string $key, array $context): array;

    /**
     * Normalize value (to array)
     */
    protected function normalizeValue(mixed $value): array;

    /**
     * Build IN condition for query
     */
    protected function buildInCondition(string $field, array $values): array;
}
```

## Examples

### In-stock filter

```php
<?php
namespace MyNamespace;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class InStockFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $values = $this->normalizeValue($value);

        if (in_array('instock', $values)) {
            $query->where(['Data.count:>' => 0]);
        }
        if (in_array('outofstock', $values)) {
            $query->where(['Data.count' => 0]);
        }
    }

    public function getValues(string $key, array $config, array $context): array
    {
        return [
            'values' => [
                ['value' => 'instock', 'label' => 'In stock', 'count' => 0],
                ['value' => 'outofstock', 'label' => 'Pre-order', 'count' => 0],
            ]
        ];
    }
}
```

### Tags filter (many-to-many)

```php
<?php
namespace MyNamespace;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class TagsFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $values = $this->normalizeValue($value);
        $tagIds = array_map('intval', $values);

        // JOIN with relation table
        $query->innerJoin('ProductTags', 'Tags', 'Tags.product_id = msProduct.id');
        $query->where(['Tags.tag_id:IN' => $tagIds]);
        $query->groupby('msProduct.id');
    }

    public function getValues(string $key, array $config, array $context): array
    {
        // Get all tags from DB
        $tags = $this->modx->getCollection('Tag', ['active' => true]);

        $values = [];
        foreach ($tags as $tag) {
            $values[] = [
                'value' => (string)$tag->get('id'),
                'label' => $tag->get('name'),
                'count' => 0
            ];
        }

        return ['values' => $values];
    }
}
```

### Custom table filter

```php
<?php
namespace MyNamespace;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class WarehouseFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $values = $this->normalizeValue($value);
        $warehouseIds = array_map('intval', $values);

        // JOIN with stock table
        $query->innerJoin(
            'ProductStock',
            'Stock',
            'Stock.product_id = msProduct.id AND Stock.count > 0'
        );
        $query->where(['Stock.warehouse_id:IN' => $warehouseIds]);
        $query->groupby('msProduct.id');
    }

    public function getValues(string $key, array $config, array $context): array
    {
        // Get warehouses
        $warehouses = $this->modx->getCollection('Warehouse', [
            'active' => true
        ]);

        $values = [];
        foreach ($warehouses as $wh) {
            $values[] = [
                'value' => (string)$wh->get('id'),
                'label' => $wh->get('name'),
                'count' => 0
            ];
        }

        return ['values' => $values];
    }
}
```

## Registration via config

Alternatively, register types via config file:

```php
<?php
// core/components/mfilter/config/filter_types.php

return [
    'rating' => MyNamespace\RatingFilterType::class,
    'instock' => MyNamespace\InStockFilterType::class,
    'tags' => MyNamespace\TagsFilterType::class,
];
```

## Tips

1. **Use indexes** — add indexes on fields you filter by
2. **Cache values** — if getValues() does heavy queries
3. **Validate input** — validate and sanitize values
4. **Consider performance** — avoid N+1 queries
