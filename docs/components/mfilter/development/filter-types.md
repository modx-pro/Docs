# Типы фильтров

Создание собственных типов фильтрации.

## Встроенные типы

| Тип | Класс | Описание |
|-----|-------|----------|
| `default` | DefaultFilterType | Стандартный (checkbox/radio) |
| `number` | NumberFilterType | Числовой диапазон |
| `boolean` | BooleanFilterType | Да/Нет переключатель |
| `date` | DateFilterType | Диапазон дат |
| `day` | DayFilterType | Фильтр по дням |
| `month` | MonthFilterType | Фильтр по месяцам |
| `year` | YearFilterType | Фильтр по годам |
| `vendors` | VendorsFilterType | Производители MS3 |
| `parents` | ParentsFilterType | Родительские категории |
| `colors` | ColorsFilterType | Цвета с HEX-кодами |

## Создание своего типа

### 1. Создайте класс

```php
<?php
namespace MyNamespace;

use MODX\Revolution\modX;
use MFilter\Handlers\FilterTypes\AbstractFilterType;

class RatingFilterType extends AbstractFilterType
{
    /**
     * Применить фильтр к запросу
     */
    public function apply(
        \xPDOQuery $query,
        string $key,
        mixed $value,
        array $config
    ): void {
        // $value может быть:
        // - строкой: "5"
        // - массивом: ["4", "5"]
        // - объектом для диапазона: ["min" => 3, "max" => 5]

        $values = is_array($value) ? $value : [$value];

        if (isset($values['min']) || isset($values['max'])) {
            // Диапазон
            $field = $this->getFieldName($key, $config);

            if (isset($values['min'])) {
                $query->where(["{$field}:>=" => (int)$values['min']]);
            }
            if (isset($values['max'])) {
                $query->where(["{$field}:<=" => (int)$values['max']]);
            }
        } else {
            // Множественный выбор
            $field = $this->getFieldName($key, $config);
            $query->where(["{$field}:IN" => array_map('intval', $values)]);
        }
    }

    /**
     * Получить доступные значения для фильтра
     */
    public function getValues(
        string $key,
        array $config,
        array $context
    ): array {
        $values = [];

        // Генерируем значения 1-5 звёзд
        for ($i = 1; $i <= 5; $i++) {
            $values[] = [
                'value' => (string)$i,
                'label' => str_repeat('★', $i) . str_repeat('☆', 5 - $i),
                'count' => 0 // Будет обновлено через suggestions
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
     * Получить имя поля для запроса
     */
    protected function getFieldName(string $key, array $config): string
    {
        // Если указано явно в конфиге
        if (!empty($config['field'])) {
            return $config['field'];
        }

        // По умолчанию ищем в опциях MS3
        return "Option.{$key}";
    }
}
```

### 2. Зарегистрируйте тип

Создайте плагин на событие `OnMFilterInit`:

```php
<?php
/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

$mfilter->getFilterTypeRegistry()->register(
    'rating',
    new MyNamespace\RatingFilterType($modx)
);
```

### 3. Используйте в наборе фильтров

В админке создайте фильтр с типом `rating`:

```json
{
    "rating": {
        "type": "rating",
        "source": "option",
        "label": "Рейтинг"
    }
}
```

## Интерфейс FilterTypeInterface

```php
interface FilterTypeInterface
{
    /**
     * Применить фильтр к запросу
     */
    public function apply(
        \xPDOQuery $query,
        string $key,
        mixed $value,
        array $config
    ): void;

    /**
     * Получить доступные значения
     */
    public function getValues(
        string $key,
        array $config,
        array $context
    ): array;

    /**
     * Получить SQL для подсчёта (suggestions)
     */
    public function getSuggestionsQuery(
        string $key,
        array $config,
        array $context
    ): ?string;
}
```

## AbstractFilterType

Базовый класс с полезными методами:

```php
abstract class AbstractFilterType implements FilterTypeInterface
{
    protected modX $modx;

    /**
     * Получить значения из опций MS3
     */
    protected function getOptionValues(string $key, array $context): array;

    /**
     * Получить значения из TV
     */
    protected function getTVValues(string $key, array $context): array;

    /**
     * Получить значения из поля ресурса
     */
    protected function getFieldValues(string $key, array $context): array;

    /**
     * Нормализовать значение (привести к массиву)
     */
    protected function normalizeValue(mixed $value): array;

    /**
     * Построить условие IN для запроса
     */
    protected function buildInCondition(string $field, array $values): array;
}
```

## Примеры

### Фильтр по наличию

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
                ['value' => 'instock', 'label' => 'В наличии', 'count' => 0],
                ['value' => 'outofstock', 'label' => 'Под заказ', 'count' => 0],
            ]
        ];
    }
}
```

### Фильтр по тегам (many-to-many)

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

        // JOIN с таблицей связей
        $query->innerJoin('ProductTags', 'Tags', 'Tags.product_id = msProduct.id');
        $query->where(['Tags.tag_id:IN' => $tagIds]);
        $query->groupby('msProduct.id');
    }

    public function getValues(string $key, array $config, array $context): array
    {
        // Получить все теги из БД
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

### Фильтр по кастомной таблице

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

        // JOIN с таблицей остатков
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
        // Получить склады
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

## Регистрация через конфиг

Альтернативно можно зарегистрировать типы через файл конфигурации:

```php
<?php
// core/components/mfilter/config/filter_types.php

return [
    'rating' => MyNamespace\RatingFilterType::class,
    'instock' => MyNamespace\InStockFilterType::class,
    'tags' => MyNamespace\TagsFilterType::class,
];
```

## Советы

1. **Используйте индексы** — добавьте индексы на поля, по которым фильтруете
2. **Кэшируйте значения** — если getValues() делает тяжёлые запросы
3. **Проверяйте входные данные** — валидируйте и sanitize значения
4. **Учитывайте производительность** — избегайте N+1 запросов
