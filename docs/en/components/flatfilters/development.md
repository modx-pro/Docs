# Development

:::danger
DO NOT EDIT COMPONENT FILES. MAKE COPIES AND EDIT THOSE. DO NOT PUT COPIES INSIDE THE COMPONENT FOLDER.
:::

## New configuration type

Each config type must support indexing and filtering. To filter data from your own table, create two classes: one implementing **core/components/flatfilters/handlers/indexing/indexinginterface.class.php**, the other **core/components/flatfilters/handlers/filtering/filteringinterface.class.php**.

:::tip
Sometimes extending a standard class is enough.
:::

Example: products and sales statistics. Statistics table has date and sales count per product. Filter by date range and sum sales per product in that period.
:::tip
Created files go in `core/elements/flatfilters`.
:::

### Indexer

Create an indexing class. Since statistics are tied to products (resources), extend the resource indexing class. Override `getResourceData()` to add statistic fields. Register the class in a copy of **types.inc.php**.

### Filter class

Create a filtering class extending the resource filter. Override `getOutputIds()` if you need custom sorting (e.g. by sales). Register in **types.inc.php**.

:::warning
Examples use real project code (e.g. CustomServices\Product). Do not copy blindly; adapt to your project.
:::

### Paths

Copy **types.inc.php** and add your type, e.g.:

```php
'statistic' => [
    'indexing' => [
        'path' => 'elements/flatfilters/indexing/indexingstatistic.php',
        'className' => 'IndexingStatistic'
    ],
    'filtering' => [
        'path' => 'elements/flatfilters/filtering/filteringstatistic.php',
        'className' => 'FilteringStatistic'
    ]
]
```

Set **ff_path_to_types** to your copy.

### Plugin

To expose your table fields in the config UI, use a plugin on **ffOnGetFieldKeys** and merge your table keys into `$modx->event->returnedValues` for your type.

## Replacing JavaScript modules

To replace the slider or datepicker, override the corresponding class and update the config in `assets/components/flatfilters/js/web/flatfilters.inc.js`. Set **ff_js_config_path** to your config file if needed.
