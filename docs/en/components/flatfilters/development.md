# Development

:::danger
DO NOT EDIT COMPONENT FILES. MAKE COPIES AND EDIT THOSE. DO NOT PUT COPIES INSIDE THE COMPONENT FOLDER.
:::

## New configuration type

Each filter configuration type must support indexing and filtering. To filter data from your own table, create two classes: one implementing **core/components/flatfilters/handlers/filtering/filteringinterface.class.php**, and the other **core/components/flatfilters/handlers/indexing/indexinginterface.class.php**.

:::tip
In some cases extending one of the standard classes is enough.
:::

Real-world example: products and sales statistics. Statistics is a table where each row has a date and the number of sales for a product on that date. Filter by sales date range, summing sales per product in that period.
:::tip
All created files go in `core/elements/flatfilters`.
:::

### Indexer

Create a statistics indexing class. Since sales statistics are tied to products (resources), extend the resource indexing class.

```php:line-numbers
<?php

require_once dirname(__FILE__, 4) . '/components/flatfilters/handlers/indexing/indexingresources.class.php';

class IndexingStatistic extends IndexingResources
{
    protected function initialize(): void
    {
        parent::initialize();
        $this->modx->addPackage('salesstatistics', MODX_CORE_PATH . 'components/salesstatistics/model/');
    }
    public function getResourceData($resource)
    {
        $resourceData = $resource->toArray();
        $result = $this->getStatisticFields($resourceData['id']);
        if(empty($result)){
            return false;
        }
        return array_merge($resourceData, $result);
    }
    protected function getStatisticFields($rid){
        $q = $this->modx->newQuery('SalesStatisticsItem');
        $q->select('SalesStatisticsItem.market as market, SalesStatisticsItem.date as date');
        $q->where(['SalesStatisticsItem.product_id' => $rid]);
        $output = [];
        $tstart = microtime(true);
        if ($q->prepare() && $q->stmt->execute()) {
            $this->modx->queryTime += microtime(true) - $tstart;
            $this->modx->executedQueries++;
            if(!$result = $q->stmt->fetchAll(PDO::FETCH_ASSOC)){
                return $output;
            }

            $output = [
                'date' => []
            ];

            foreach($result as $item){
                if(!in_array($item['date'], $output['date'])){
                    $output['date'][] =  $item['date'];
                }
            }

        }
        return $output;
    }
}
```

### Filter class

Create a filtering class extending the resource filter. The resource filter could be used as-is, but we need sorting by sales count.

```php:line-numbers
<?php

use CustomServices\Product;

require_once dirname(__FILE__, 4) . '/vendor/autoload.php';

require_once dirname(__FILE__, 4) . '/components/flatfilters/handlers/filtering/filteringresources.class.php';

class FilteringStatistic extends FilteringResources
{

    protected function getOutputIds($rids)
    {
        $productService = new Product($this->modx);

        if ($statistics = $productService->getStatistic(explode(',', $rids))) {
            $rids = implode(',', array_keys($statistics));
        }

        $sql = $this->getOutputSQL($rids);
        $sql .= 'ORDER BY FIELD(Resource.id,  ' . $rids . ')';
        $sql .= " LIMIT {$this->limit} OFFSET {$this->offset}";
        /* get list of ids for the current page */
        if ($statement = $this->execute($sql)) {
            $rids = $statement->fetchAll(PDO::FETCH_COLUMN);
            $rids = implode(',', $rids);
        }

        return $rids;
    }
}
```

:::warning

```php:line-numbers
<?php

use CustomServices\Product;

require_once dirname(__FILE__, 4) . '/vendor/autoload.php';
```

This is code from a real project; you likely will not have the **CustomServices\Product** class or that autoload file. Do not copy the examples blindly.
:::

### Paths

Tell the component about the new configuration type. Create a copy of **types.inc.php** and add a new entry:

```php:line-numbers
<?php

return [
    'resources' => [
        'indexing' => [
            'path' => 'components/flatfilters/handlers/indexing/indexingresources.class.php',
            'className' => 'IndexingResources'
        ],
        'filtering' => [
            'path' => 'components/flatfilters/handlers/filtering/filteringresources.class.php',
            'className' => 'FilteringResources'
        ]
    ],
    'products' => [
        'indexing' => [
            'path' => 'components/flatfilters/handlers/indexing/indexingproducts.class.php',
            'className' => 'IndexingProducts'
        ],
        'filtering' => [
            'path' => 'components/flatfilters/handlers/filtering/filteringproducts.class.php',
            'className' => 'FilteringProducts'
        ]
    ],
    'customers' => [
        'indexing' => [
            'path' => 'components/flatfilters/handlers/indexing/indexingcustomers.class.php',
            'className' => 'IndexingCustomers'
        ],
        'filtering' => [
            'path' => 'components/flatfilters/handlers/filtering/filteringcustomers.class.php',
            'className' => 'FilteringCustomers'
        ]
    ],
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
];
```

Then set the path to this file in system setting **ff_path_to_types**.

### Plugin

We also need to be able to choose fields from our table when creating a configuration. Use a plugin:

```php:line-numbers
<?php

switch ($modx->event->name) {
    case 'ffOnGetFieldKeys':
        if ($type === 'statistic') {
            $modx->event->returnedValues = array_merge(
                $FlatFilters->getTableKeys('site_content'),
                $FlatFilters->getTableKeys('ms2_products'),
                $FlatFilters->getTableKeys('salesstatistics_items')
            );
        }
        break;
}
```

## Replacing JavaScript modules

To replace the slider or datepicker, override the corresponding class and update the config in `assets/components/flatfilters/js/web/flatfilters.inc.js`. Also set the path to your new config in system setting `ff_js_config_path`.
