# Custom filter type

Creating a custom filter type.

## Task

Create a filter that is not among the built-in types.

## Example: Rating filter

We will create a "Rating" filter with star count selection.

### 1. Create the type class

```php
<?php
// core/components/mysite/src/FilterTypes/RatingFilterType.php

namespace MySite\FilterTypes;

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
        $values = $this->normalizeValue($value);
        $field = $this->getFieldName($config);

        if (isset($values['min'])) {
            // Rating >= selected
            $query->where(["{$field}:>=" => (int)$values['min']]);
        } else {
            // Exact rating value
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
        for ($i = 5; $i >= 1; $i--) {
            $values[] = [
                'value' => (string)$i,
                'label' => str_repeat('★', $i) . str_repeat('☆', 5 - $i),
                'count' => 0 // Filled via suggestions
            ];
        }

        return [
            'values' => $values,
            'min' => 1,
            'max' => 5
        ];
    }

    /**
     * Get SQL for count (suggestions)
     */
    public function getSuggestionsQuery(
        string $key,
        array $config,
        array $context
    ): ?string {
        $field = $this->getFieldName($config);

        return "SELECT {$field} as value, COUNT(*) as count
                FROM {table}
                WHERE {$field} IS NOT NULL
                GROUP BY {$field}";
    }

    /**
     * Get field name
     */
    protected function getFieldName(array $config): string
    {
        return $config['field'] ?? 'Data.rating';
    }
}
```

### 2. Register the type

Create a plugin on event `OnMFilterInit`:

```php
<?php
/**
 * Plugin: MySiteFilterTypes
 * Events: OnMFilterInit
 */

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Autoload (if not via Composer)
require_once MODX_CORE_PATH . 'components/mysite/src/FilterTypes/RatingFilterType.php';

// Register type
$mfilter->getFilterTypeRegistry()->register(
    'rating',
    new \MySite\FilterTypes\RatingFilterType($modx)
);
```

### 3. Use in filter set

In the admin, create a filter with type `rating`:

```json
{
    "rating": {
        "type": "rating",
        "source": "resource",
        "field": "Data.rating",
        "label": "Rating"
    }
}
```

### 4. Create template (optional)

```html
{* @FILE chunks/mfilter/filter.rating.tpl *}

<div class="mfilter-rating">
    {foreach $values as $item}
        <label class="mfilter-rating__item {$item.selected ? 'mfilter-rating__item--selected' : ''}">
            <input type="radio"
                   name="{$key}[min]"
                   value="{$item.value}"
                   {$item.selected ? 'checked' : ''}>
            <span class="mfilter-rating__stars">{$item.label}</span>
            <span class="mfilter-rating__text">and above</span>
            <span class="mfilter-rating__count">({$item.count})</span>
        </label>
    {/foreach}
</div>
```

```css
.mfilter-rating__stars {
    color: #ffc107;
    font-size: 1.2em;
}

.mfilter-rating__item--selected .mfilter-rating__stars {
    text-shadow: 0 0 5px rgba(255, 193, 7, 0.5);
}
```

## Example: Stock availability filter

### Class

```php
<?php
namespace MySite\FilterTypes;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class StockFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $values = $this->normalizeValue($value);

        $conditions = [];

        if (in_array('instock', $values)) {
            $conditions[] = 'Data.count > 0';
        }

        if (in_array('preorder', $values)) {
            $conditions[] = '(Data.count = 0 AND Data.available = 1)';
        }

        if (in_array('outofstock', $values)) {
            $conditions[] = '(Data.count = 0 AND Data.available = 0)';
        }

        if ($conditions) {
            $query->where('(' . implode(' OR ', $conditions) . ')');
        }
    }

    public function getValues(string $key, array $config, array $context): array
    {
        return [
            'values' => [
                ['value' => 'instock', 'label' => 'In stock', 'count' => 0],
                ['value' => 'preorder', 'label' => 'Pre-order', 'count' => 0],
                ['value' => 'outofstock', 'label' => 'Out of stock', 'count' => 0],
            ]
        ];
    }
}
```

## Example: Tags filter (many-to-many)

### Class

```php
<?php
namespace MySite\FilterTypes;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class TagsFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $tagIds = array_map('intval', $this->normalizeValue($value));

        // JOIN with relation table
        $query->innerJoin(
            'ProductTags',
            'Tags',
            'Tags.product_id = msProduct.id'
        );

        $query->where(['Tags.tag_id:IN' => $tagIds]);
        $query->groupby('msProduct.id');
    }

    public function getValues(string $key, array $config, array $context): array
    {
        // Get all tags
        $tags = $this->modx->getCollection('Tag', [
            'active' => true
        ]);

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

    public function getSuggestionsQuery(string $key, array $config, array $context): ?string
    {
        return "SELECT Tags.tag_id as value, COUNT(DISTINCT Tags.product_id) as count
                FROM modx_product_tags Tags
                INNER JOIN {table} ON {table}.id = Tags.product_id
                GROUP BY Tags.tag_id";
    }
}
```

## Example: Geo filter

### Class

```php
<?php
namespace MySite\FilterTypes;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class GeoFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $values = $this->normalizeValue($value);

        if (isset($values['lat'], $values['lng'], $values['radius'])) {
            $lat = (float)$values['lat'];
            $lng = (float)$values['lng'];
            $radius = (float)$values['radius']; // km

            // Haversine formula for radius search
            $query->where("
                (6371 * acos(
                    cos(radians({$lat}))
                    * cos(radians(Data.latitude))
                    * cos(radians(Data.longitude) - radians({$lng}))
                    + sin(radians({$lat}))
                    * sin(radians(Data.latitude))
                )) <= {$radius}
            ");
        }
    }

    public function getValues(string $key, array $config, array $context): array
    {
        return [
            'type' => 'geo',
            'defaultRadius' => 10
        ];
    }
}
```

## Registration via config

Alternative: config file:

```php
<?php
// core/components/mfilter/config/filter_types.php

return [
    'rating' => \MySite\FilterTypes\RatingFilterType::class,
    'stock' => \MySite\FilterTypes\StockFilterType::class,
    'tags' => \MySite\FilterTypes\TagsFilterType::class,
    'geo' => \MySite\FilterTypes\GeoFilterType::class,
];
```

## Tips

1. **Extend AbstractFilterType** — it provides useful methods
2. **Implement getSuggestionsQuery()** — for correct counts
3. **Validate input** — do not trust user input
4. **Add indexes** — for fields you filter by
5. **Test performance** — complex JOINs can slow queries
