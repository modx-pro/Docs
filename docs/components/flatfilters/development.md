# Разработка
:::danger
НЕ ВНОСИТЕ ПРАВКИ В ФАЙЛЫ КОМПОНЕНТА. ДЕАЙТЕ КОПИИ И ПРАВЬТЕ ИХ. КОПИИ НЕ РАЗМЕЩАЙТЕ В ПАПКАХ КОМПОНЕНТА.
:::
## Новый тип конфигурации

Каждый тип конфигурации фильтров должен уметь индексировать и фильтровать. Если вам нужно фильтровать данные из созданной вами же таблицы, то вы должны создать два класса, один из которых будет
реализовывать интерфейс **core/components/flatfilters/handlers/filtering/filteringinterface.class.php**, а второй - **core/components/flatfilters/handlers/indexing/indexinginterface.class.php**.

:::tip
В некоторых случаях достаточно будет расширить один из стандартных классов.
:::

Рассмотрим реальный пример. Есть товары и статистика продаж по ним. Статистика представляет собой таблицу, где каждая запись содержит дату и количество продаж конкретного товара в эту дату. 
Фильтровать нужно по датам продаж, суммируя количество продаж по каждому товару в этот период. 
:::tip
Все создаваемые файлы будут лежать в `core/elements/flatfilters`
:::
### Индексатор
Создадим класс индексации статистики. Поскольку статистика продаж привязана к товарам, а товары это ресурсы, расширим класс индексации ресурсов.
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
### Фильтратор
Создаём класс фильтрации, который будет расширять класс фильтрации ресурсов. Можно было бы использовать класс фильтрации ресурсов "как есть", но требуется сортировка по количеству продаж.
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
        /* получаем список id для отображения на странице */
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
Это код из реального проекта, у вас скорее всего не будет ни класса **CustomServices\Product**, ни файла автозагрузки, поэтому прошу вас бездумно не копировать примеры кода.
:::

### Пути
Теперь нужно дать знать компоненту о новом типе конфигурации. Для этого создадим копию файла **types.inc.php** и добавим в него новую запись:
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
После чего укажем путь к новому файлу в системной настройке **ff_path_to_types**.


### Плагин
А ещё нам нужно, чтобы при создании конфигурации мы могли выбирать поля из нашей таблицы. В этом нам поможет плагин: 
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


## Замена JavaScript модулей
Заменить слайдер или datepicker, можно переписав соответствующий класс и изменив конфигурацию в файле `assets/components/flatfilters/js/web/flatfilters.inc.js`. 
Также не забудьте указать путь к новой конфигурации в системной настройке `ff_js_config_path`.
