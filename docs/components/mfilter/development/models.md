# Модели и база данных

Таблицы и модели mFilter.

## Таблицы

| Таблица | Модель | Описание |
|---------|--------|----------|
| `mfl_filter_sets` | MflFilterSet | Наборы фильтров |
| `mfl_filter_set_resources` | MflFilterSetResource | Привязки наборов к ресурсам |
| `mfl_slugs` | MflSlug | Слаги значений фильтров |
| `mfl_patterns` | MflPattern | Паттерны URL |
| `mfl_seo_templates` | MflSeoTemplate | SEO шаблоны |
| `mfl_word_forms` | MflWordForm | Словоформы |
| `mfl_page_configs` | MflPageConfig | Конфигурации страниц |
| `mfl_cache` | MflCache | Кэш результатов |

## MflFilterSet

Наборы фильтров.

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID набора |
| `name` | varchar(255) | Название |
| `description` | text | Описание |
| `filters` | json | Конфигурация фильтров |
| `settings` | json | Дополнительные настройки |
| `active` | tinyint(1) | Активен |
| `rank` | int | Порядок сортировки |
| `createdon` | datetime | Дата создания |
| `updatedon` | datetime | Дата обновления |

### Структура filters

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Производитель",
        "enabled": true,
        "rank": 1
    },
    "color": {
        "type": "default",
        "source": "option",
        "field": "color",
        "label": "Цвет",
        "enabled": true,
        "rank": 2
    },
    "price": {
        "type": "number",
        "source": "field",
        "field": "Data.price",
        "label": "Цена",
        "enabled": true,
        "rank": 3
    }
}
```

### Пример работы

```php
// Получить набор
$filterSet = $modx->getObject(MflFilterSet::class, ['id' => 1]);

// Получить фильтры
$filters = $filterSet->get('filters');
if (is_string($filters)) {
    $filters = json_decode($filters, true);
}

// Создать набор
$filterSet = $modx->newObject(MflFilterSet::class);
$filterSet->fromArray([
    'name' => 'Каталог',
    'filters' => json_encode([...]),
    'active' => true
]);
$filterSet->save();
```

## MflFilterSetResource

Привязки наборов фильтров к ресурсам.

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID привязки |
| `filter_set_id` | int | ID набора фильтров |
| `resource_id` | int | ID ресурса |
| `include_children` | tinyint(1) | Включить дочерние |

### Пример

```php
// Привязать набор к ресурсу
$binding = $modx->newObject(MflFilterSetResource::class);
$binding->fromArray([
    'filter_set_id' => 1,
    'resource_id' => 5,
    'include_children' => true
]);
$binding->save();

// Найти набор для ресурса
$filterSetService = $mfilter->getFilterSetService();
$filterSet = $filterSetService->getForResource($resourceId);
```

## MflSlug

Слаги (SEO-алиасы) значений фильтров.

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID |
| `key` | varchar(100) | Ключ фильтра |
| `value` | varchar(255) | Оригинальное значение |
| `slug` | varchar(255) | SEO-слаг |
| `createdon` | datetime | Дата создания |

### Пример

```php
// Найти слаг
$slugObj = $modx->getObject(MflSlug::class, [
    'key' => 'vendor',
    'value' => 'Apple Inc.'
]);

$slug = $slugObj->get('slug'); // 'apple-inc'

// Создать слаг
$slugObj = $modx->newObject(MflSlug::class);
$slugObj->fromArray([
    'key' => 'color',
    'value' => 'Красный',
    'slug' => 'krasnyj'
]);
$slugObj->save();
```

## MflPattern

Паттерны URL для распознавания фильтров.

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID |
| `pattern` | varchar(255) | Регулярное выражение |
| `filter_key` | varchar(100) | Ключ фильтра |
| `description` | text | Описание |
| `active` | tinyint(1) | Активен |
| `rank` | int | Приоритет |

### Пример

```php
// Паттерн для цены
$pattern = $modx->newObject(MflPattern::class);
$pattern->fromArray([
    'pattern' => 'price_(\d+)-(\d+)',
    'filter_key' => 'price',
    'description' => 'Диапазон цен',
    'active' => true
]);
$pattern->save();
```

## MflSeoTemplate

SEO шаблоны для генерации метаданных.

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID |
| `name` | varchar(255) | Название |
| `title` | text | Шаблон title |
| `h1` | text | Шаблон H1 |
| `description` | text | Шаблон description |
| `text` | text | Шаблон текста |
| `conditions` | json | Условия применения |
| `active` | tinyint(1) | Активен |
| `rank` | int | Приоритет |

### Структура conditions

```json
{
    "filters": {
        "vendor": ["apple"],
        "color": ["*"]
    },
    "resources": [5, 10, 15]
}
```

### Пример

```php
$template = $modx->newObject(MflSeoTemplate::class);
$template->fromArray([
    'name' => 'Apple products',
    'title' => '{$filters.vendor} — купить в Москве | {$resource.pagetitle}',
    'h1' => '{$filters.vendor}',
    'description' => 'Купить {$filters.vendor} в интернет-магазине...',
    'conditions' => json_encode([
        'filters' => ['vendor' => ['apple']]
    ]),
    'active' => true
]);
$template->save();
```

## MflWordForm

Словоформы для склонения.

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID |
| `word` | varchar(255) | Слово (именительный падеж) |
| `genitive` | varchar(255) | Родительный |
| `dative` | varchar(255) | Дательный |
| `accusative` | varchar(255) | Винительный |
| `instrumental` | varchar(255) | Творительный |
| `prepositional` | varchar(255) | Предложный |
| `plural` | varchar(255) | Множественное число |

### Пример

```php
$wordForm = $modx->newObject(MflWordForm::class);
$wordForm->fromArray([
    'word' => 'телефон',
    'genitive' => 'телефона',
    'dative' => 'телефону',
    'accusative' => 'телефон',
    'instrumental' => 'телефоном',
    'prepositional' => 'телефоне',
    'plural' => 'телефоны'
]);
$wordForm->save();
```

## MflPageConfig

Конфигурации страниц (legacy, для обратной совместимости).

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID |
| `resource_id` | int | ID ресурса |
| `filters` | json | Конфигурация фильтров |
| `settings` | json | Настройки |
| `createdon` | datetime | Дата создания |
| `updatedon` | datetime | Дата обновления |

## MflCache

Кэш результатов фильтрации.

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int | ID |
| `cache_key` | varchar(64) | Ключ кэша (MD5) |
| `resource_id` | int | ID ресурса |
| `data` | mediumtext | Закэшированные данные |
| `expires` | datetime | Время истечения |
| `createdon` | datetime | Дата создания |

## Миграции

При установке компонента автоматически создаются все таблицы.

### Ручное создание таблиц

```php
$manager = $modx->getManager();

// Создать таблицу
$manager->createObjectContainer(MflFilterSet::class);
$manager->createObjectContainer(MflSlug::class);
// ...

// Добавить индекс
$manager->addIndex(MflSlug::class, 'key_slug');
```

## Индексы

| Таблица | Индекс | Поля |
|---------|--------|------|
| `mfl_slugs` | `key_slug` | key, slug |
| `mfl_slugs` | `key_value` | key, value |
| `mfl_filter_set_resources` | `resource_id` | resource_id |
| `mfl_cache` | `cache_key` | cache_key |
| `mfl_cache` | `expires` | expires |
