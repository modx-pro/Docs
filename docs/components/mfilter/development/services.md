# Сервисы

## Как получить сервис

Через фасад `MFilter`: у каждого сервиса свой геттер. Сервис создаётся при первом обращении, дальше до конца запроса геттер возвращает тот же объект.

```php
/** @var \MFilter\MFilter $mfilter */
$mfilter = $modx->services->get('mfilter');

$filter = $mfilter->getFilter();
$slugManager = $mfilter->getSlugManager();
$urlRouter = $mfilter->getUrlRouter();
```

## Полный список сервисов

| Сервис | Класс | Геттер | Описание |
|--------|-------|--------|----------|
| Filter | `Services\Filter\Filter` | `getFilter()` | Применение фильтров, выборка результатов |
| FilterConfig | `Services\Filter\FilterConfig` | `getFilterConfig()` | Устарел, используйте `FilterSetManager` |
| FilterSetManager | `Services\FilterSet\FilterSetManager` | `getFilterSetManager()` | Управление наборами фильтров |
| RequestIdsRegistry | `Services\Filter\RequestIdsRegistry` | `getRequestIdsRegistry()` | Большие списки ID в таблице: `JOIN` вместо `IN(...)` |
| SlugManager | `Services\Slug\SlugManager` | `getSlugManager()` | SEO-алиасы значений фильтров |
| SlugParser | `Services\Slug\SlugParser` | `getSlugParser()` | Разбор SEO-сегментов адреса |
| SlugGenerator | `Services\Slug\SlugGenerator` | `getSlugGenerator()` | Генерация алиасов из значений |
| UrlRouter | `Services\Router\UrlRouter` | `getUrlRouter()` | SEO-адрес → ID ресурса |
| UrlBuilder | `Services\Router\UrlBuilder` | `getUrlBuilder()` | Сборка SEO-адреса |
| SeoBuilder | `Services\Seo\SeoBuilder` | `getSeoBuilder()` | Генерация title/h1/description |
| SeoPageManager | `Services\Seo\SeoPageManager` | `getSeoPageManager()` | [Индивидуальные SEO-записи](../interface/seo-pages) комбинаций фильтров: `find(int $resourceId, array $filters, ?string $culture = null): ?array` |
| TemplateParser | `Services\Seo\TemplateParser` | `getTemplateParser()` | Разбор плейсхолдеров SEO-шаблонов |
| WordFormsManager | `Services\Seo\WordFormsManager` | `getWordFormsManager()` | Словоформы для склонений |
| TvIndexer | `Services\Tv\TvIndexer` | `getTvIndexer()` | Денормализованный индекс TV-значений |
| FacetIndexBuilder | `Services\Facet\FacetIndexBuilder` | `getFacetIndexBuilder()` | Сборка индекса фасетов из источников (1.4.0+) |
| FacetIndexReader | `Services\Facet\FacetIndexReader` | `getFacetIndexReader()` | Чтение индекса фасетов для типов фильтров (1.4.0+) |
| ElementRunner | `Services\Element\ElementRunner` | `getElementRunner()` | Запуск element/paginator-сниппетов |
| WarmupManager | `Services\Warmup\WarmupManager` | `getWarmupManager()` | Прогрев baseIds для вызовов с `&element` *(устарел с 1.4.0)* |
| WarmupKeyBuilder | `Services\Warmup\WarmupKeyBuilder` | — | Построение ключей кэша для прогрева |
| SnippetCallParser | `Services\Warmup\SnippetCallParser` | — | Разбор вызова сниппета, вставленного в форму прогрева |
| Profiler | `Services\Profiler` | — *(статический)* | Профилирование запросов |
| FilterHandler | `Handlers\FilterHandler` | `getFilterHandler()` | Обработка фильтров, используется внутри `Filter` |
| SourceHandler | `Handlers\SourceHandler` | `getSourceHandler()` | Не используется: значения фильтров берут типы фильтров |
| FilterTypesRegistry | `Handlers\FilterTypesRegistry` | `getFilterTypesRegistry()` | Реестр типов фильтров |
| SourceRegistry | `Handlers\Sources\SourceRegistry` | `getSourceRegistry()` | Реестр источников данных |

::: tip
`getMSearch()` возвращает экземпляр компонента mSearch, если он установлен, иначе `null`.
:::

## Filter

### Сигнатуры

```php
$filter = $mfilter->getFilter();

// Полная фильтрация с пагинацией и сортировкой
$result = $filter->apply(int $resourceId, array $filters, array $options = []): array;

// Фильтрация внешнего списка ID (так работает сниппет mFilter в режиме с &element)
$ids = $filter->applyToIds(int $resourceId, array $ids, array $filters, array $options = []): array;

// Расчёт фильтров и значений для страницы
$filters = $filter->getFilters(int $resourceId, array $options = []): array;

// То же, но для внешнего списка ID
$filters = $filter->getFiltersForIds(int $resourceId, array $ids, array $options = []): array;

// Счётчики значений с учётом активных фильтров
$suggestions = $filter->getSuggestions(int $resourceId, array $appliedFilters, array $options = []): array;
$suggestions = $filter->getSuggestionsForIds(int $resourceId, array $allIds, array $appliedFilters, array $options = []): array;

// ID опубликованных ресурсов раздела с той же областью, что у apply():
// подразделы на $depth уровней и дополнительные категории MiniShop3
$ids = $filter->getResourceIds(int $resourceId, int $depth = 10): array;
```

### Структура результата `apply()`

```php
[
    'success' => true,
    'items' => [
        ['id' => 12, 'pagetitle' => '...', 'price' => 19990, ...],
        // ...
    ],
    'meta' => [
        'total' => 1234,
        'limit' => 24,
        'offset' => 0,
        'page' => 1,
        'totalPages' => 52,
        'sortBy' => 'price',
        'sortDir' => 'ASC',
    ],
    'filters' => [/* применённые фильтры */],
]
```

Строка `items` содержит `id`, `pagetitle`, `longtitle`, `description`, `introtext`, `uri`, `alias`. С MiniShop3 добавляются `price`, `old_price`, `thumb`, `vendor`, `vendor_id` (оба — id производителя) и `article`. TV и опций товара в строке нет.

### Параметры `$options`

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `limit` | `mfilter.default_limit` (20) | Размер страницы |
| `offset` | 0 | Смещение |
| `sortBy` | `menuindex` | Поле сортировки |
| `sortDir` | `ASC` | Направление |
| `parents` | `[$resourceId]` | Корневые ресурсы для обхода |
| `depth` | 10 | Глубина обхода |
| `page` | из `offset` и `limit` | Номер страницы в `meta.page` |
| `skip` | 0 | Сколько товаров вызов пропускает в начале, как `&offset` сниппета. Влияет только на `totalPages`: само смещение передавайте в `offset` |
| `where` | `[]` | Дополнительные условия xPDO. Ключ `Data.*` подключает `msProductData` |

::: warning Ключи `where` идут в SQL как есть
Значения экранируются, а ключи — нет. Не передавайте в `where` ввод посетителя.

Без условия `['class_key' => 'MiniShop3\\Model\\msProduct']` в `items` попадают и разделы каталога.
:::

### Пример

```php
$filter = $mfilter->getFilter();

$result = $filter->apply(5, [
    'vendor_id' => ['12'],
    'price' => ['10000', '50000'], // [min, max] для number-фильтра
], [
    'sortBy' => 'price',
    'sortDir' => 'ASC',
    'limit' => 24,
    'offset' => 0,
]);

echo "Найдено: {$result['meta']['total']}\n";
foreach ($result['items'] as $item) {
    echo "{$item['pagetitle']}\n";
}
```

## FilterHandler

Прослойка между `Filter` и xPDO/SQL. Нужна своей AJAX- или headless-обвязке, которая вызывает отдельные шаги без обёртки `Filter::apply()`.

```php
$handler = $mfilter->getFilterHandler();

// Применить фильтры к существующему xPDOQuery
$query = $handler->buildQuery($query, $filters, $configs);

// Узнать, какие таблицы были присоединены при последнем buildQuery
// (нужно для последующих манипуляций с запросом)
$joined = $handler->getJoinedTables(): array;

// Получить значения фильтров для отрисовки формы
$data = $handler->getFiltersData(int $resourceId, array $context = []): array;

// Счётчики значений с учётом активных фильтров
$counts = $handler->getSuggestions(int $resourceId, array $appliedFilters, array $context = []): array;

// ID отфильтрованных товаров (без пагинации, без сортировки)
$ids = $handler->getFilteredIds(int $resourceId, array $filters): array;

// Количество отфильтрованных товаров
$total = $handler->getFilteredCount(int $resourceId, array $filters): int;

// Конфигурация набора и конкретного фильтра
$pageConfig = $handler->getPageConfig(int $resourceId): ?PageConfigData;
$filterConfig = $handler->getFilterConfig(int $resourceId, string $filterKey): ?array;

// Убирает служебные параметры адреса (page, sort, limit, view, ajax), скаляры оборачивает в массив
$normalized = $handler->normalizeParams(array $params, int $resourceId = 0): array;

// Склеивает ключ|min + ключ|max и ключ|from + ключ|to в [от, до]
$normalizedFilters = $handler->normalizeFilters(array $filters): array;
```

`getFilteredIds()` и `getFilteredCount()` считают только товары, лежащие прямо в странице, — без подразделов и дополнительных категорий MiniShop3. Для каталога с подразделами берите `apply()` и `meta.total`.

## SlugManager

Ищет и создаёт SEO-алиасы значений фильтров. Найденное кэширует в памяти до конца запроса.

### Сигнатуры

```php
$slugManager = $mfilter->getSlugManager();

// Главный метод: получить slug или создать, если ещё нет
$slug = $slugManager->getOrCreate(
    string $filterKey,
    string $value,
    string $source,                  // 'option', 'product', 'tv', 'resource', 'vendor'
    ?string $cultureKey = null,
    ?string $label = null            // подпись числового значения: алиас строится из неё
): string;

// Найти существующий slug по значению
$slug = $slugManager->findSlug(string $filterKey, string $value, ?string $cultureKey = null): ?string;

// Найти значение по slug
$value = $slugManager->findValue(string $filterKey, string $slug, ?string $cultureKey = null): ?string;

// Ключ фильтра и значение по алиасу (без привязки к filterKey)
$record = $slugManager->findBySlug(string $slug, ?string $cultureKey = null): ?array;
// ['filter_key' => 'color', 'value' => 'чёрный']

// Проверить существование
$exists = $slugManager->hasSlug(string $filterKey, string $slug, ?string $cultureKey = null): bool;

// Загрузить в память заранее — меньше запросов в циклах
$slugManager->preloadForFilters(array $filterKeys, ?string $cultureKey = null): void;

// Сохранить вручную (алиасы, отредактированные вручную, не перезаписываются)
$slugManager->save(string $filterKey, string $value, string $slug, string $source, ?string $cultureKey = null, bool $respectCustom = true): bool;

// Сбросить кэш в памяти
$slugManager->clearCache(): void;
```

### Пример

```php
$slugManager = $mfilter->getSlugManager();

// Стандартный путь
$slug = $slugManager->getOrCreate('color', 'чёрный', 'option', 'ru');
// 'chernyj'

// Обратный поиск (так SlugParser разбирает адрес)
$value = $slugManager->findValue('color', 'chernyj', 'ru');
// 'чёрный'

// У производителя значение — id, алиас строится из названия
$value = $slugManager->findValue('vendor', 'apple', 'ru');
// '12'
```

## SlugParser

Разбирает SEO-сегменты адреса (`vendor_id--apple`, `price--1000--5000`, `sort--price-asc`) в массив фильтров и технических параметров. Его вызывает `UrlRouter`, но пользоваться им можно и напрямую.

```php
$parser = $mfilter->getSlugParser();

// Парсинг части адреса после раздела. Раздел parse() не отрезает —
// полный адрес разбирайте через UrlRouter::process()
$result = $parser->parse('color--chernyj/sort--price-asc');
// [
//   'filters' => ['color' => ['чёрный']],
//   'tech' => ['sort' => ['field' => 'price', 'dir' => 'asc']],
//   'unrecognized' => [],
// ]

// Парсинг одного сегмента
$segment = $parser->parseSegment('vendor_id--apple', $strict = true);

// Распознавание и парсинг технических параметров (sort/page/limit/view)
$tech = $parser->parseTechParam('sort--price-asc');
$isTech = $parser->isTechParam('sort--price-asc'): bool;

// Поиск базового ресурса по URI (с учётом базы каталога)
$base = $parser->findBaseResource('catalog/electronics/'): ?array;
// ['resource_id' => 12, 'base_uri' => 'catalog/electronics', 'filter_uri' => '']

$parser->clearCache(): void;
```

## UrlBuilder

Собирает SEO-адрес из активных фильтров.

```php
$urlBuilder = $mfilter->getUrlBuilder();

$urlBuilder->setBaseUri('/catalog/electronics/');

// Простой URL. Передаются значения фильтров, алиасы mFilter подставит сам.
// У производителя значение — id: 'vendor' => ['12']
$url = $urlBuilder->build([
    'color' => ['чёрный'],
], [
    'sort' => 'price-asc',
    'page' => 2,
]);
// '/catalog/electronics/color--chernyj/sort--price-asc/page--2/'

// Канонический адрес: без номера страницы, абсолютный
$canonical = $urlBuilder->buildCanonical($filters);
```

## UrlRouter

Определяет по SEO-адресу ID ресурса и фильтры.

```php
$router = $mfilter->getUrlRouter();

// Парсинг входящего URI
$result = $router->process('/catalog/electronics/color--chernyj/');
// [
//   'resource_id' => 12,
//   'filters' => ['color' => ['чёрный']],
//   'tech' => [],
//   'base_uri' => 'catalog/electronics',
//   'filter_uri' => 'color--chernyj',
// ]
// null — не адрес фильтра: запрос обрабатывает MODX (страница или 404)

// Сброс кэша роутера
$router->clearCache();
```

## SeoBuilder

Собирает SEO-данные страницы по SEO-шаблонам из `mfl_seo_templates`.

```php
$seoBuilder = $mfilter->getSeoBuilder();

$seo = $seoBuilder->build($resourceId, $filters);
// [
//   'h1' => 'Apple iPhone в Москве',
//   'title' => 'Apple iPhone — купить в Москве | Каталог',
//   'description' => 'Купить Apple iPhone...',
//   'text' => '...',
//   'canonical' => 'https://example.com/catalog/vendor_id--apple/',
//   'noindex' => false,
// ]
```

## TemplateParser

Разбирает SEO-шаблоны (`mfl_seo_templates`). Понимает плейсхолдеры `{$ключ}`, условия `{if $ключ}…{else}…{/if}` и модификаторы через точку — падежи из словоформ и текстовые. Это не Fenom: модификаторы через `|` не работают. Синтаксис — в [SEO шаблонах](../interface/seo-templates).

Контекст для страницы каталога собирает `SeoBuilder`: поля ресурса, его TV, значения фильтров с `_first` и `_count`, `site_name`.

```php
$parser = $mfilter->getTemplateParser();

// Подставить значения в шаблон
$h1 = $parser->parse('Купить {$vendor}{if $color} {$color.gen} цвета{/if}', [
    'vendor' => 'Apple',
    'color' => 'чёрный',
]);
// 'Купить Apple чёрного цвета' — если «чёрный» есть в словоформах

// Синтаксические ошибки: незакрытый {if}, лишние символы в плейсхолдере
$errors = $parser->validate($templateString);

// Ключи плейсхолдеров — без модификаторов и того, что после точки
$keys = $parser->extractPlaceholders('{$pagetitle} {$color.gen}');
// ['pagetitle', 'color']
```

## WordFormsManager

Склоняет значения в SEO-текстах. Формы хранятся в таблице `mfl_word_forms`: шесть падежей единственного и шесть множественного числа. Сгенерировать их может [Morpher API](/components/mfilter/settings#slovoformy).

```php
$wm = $mfilter->getWordFormsManager();

// Получить все формы для слова
$forms = $wm->get('телефон'): ?array;
// ['nom' => 'телефон', 'gen' => 'телефона', 'dat' => 'телефону', ...]

// Генерация через Morpher API при $useApi = true.
// Без API или при сбое сервиса — само слово строчными во всех падежах
$forms = $wm->generate('Apple', $useApi = false): ?array;

// Сохранить вручную. Передавайте все двенадцать форм: незаданные
// заменяются исходным словом, в том числе у уже сохранённой записи
$wm->save('телефон', [
    'nom' => 'телефон', 'gen' => 'телефона', 'dat' => 'телефону',
    'acc' => 'телефон', 'ins' => 'телефоном', 'pre' => 'телефоне',
    'nom_plural' => 'телефоны', 'gen_plural' => 'телефонов', 'dat_plural' => 'телефонам',
    'acc_plural' => 'телефоны', 'ins_plural' => 'телефонами', 'pre_plural' => 'телефонах',
]): bool;

// Генерация для всех значений из mfl_slugs
$stats = $wm->generateAll($useApi = false): array;
// ['generated' => 142, 'skipped' => 8, 'errors' => 0]

// Загрузить в память заранее — меньше запросов в циклах
$wm->preload(): void;
$wm->clearCache(): void;
```

## FilterSetManager

Управляет наборами фильтров и их привязками к ресурсам. Сохранение набора из кода — в [Моделях](models#mflfilterset).

```php
$mgr = $mfilter->getFilterSetManager();

// Получить набор для ресурса (с учётом наследования)
$set = $mgr->getForResource(int $resourceId): ?array;

// Только ID набора (быстрее)
$id = $mgr->getFilterSetIdForResource(int $resourceId): ?int;

// Все активные наборы
$all = $mgr->getAll(bool $activeOnly = true): array;
```

## TvIndexer

Ведёт таблицу `mfl_tv_index`. При `mfilter.tv_index_on_save = true` вызывается сам при сохранении ресурса с TV.

```php
$indexer = $mfilter->getTvIndexer();

// Переиндексировать TV для конкретного ресурса
$rows = $indexer->indexResource(int $resourceId, ?array $tvNames = null): int;

// Полная переиндексация (можно ограничить списком TV и списком родителей)
$stats = $indexer->indexAll(?array $tvNames = null, ?array $parentIds = null): array;

// Удалить TV-индекс ресурса
$indexer->removeResource(int $resourceId): int;

// Очистить индекс по TV
$indexer->clearIndexForTvs(array $tvNames): int;

// Очистить весь индекс
$indexer->clearAll(): bool;

// Парсинг параметров элементов TV (listbox/checkbox/radio)
$options = $indexer->parseTvOptions(string $elements, string $type = ''): array;

// Статистика
$stats = $indexer->getStats(): array;
```

## FacetIndexBuilder

Собирает индекс фасетов (`mfl_facet_index_text` / `mfl_facet_index_num`) из источников.

```php
$builder = $mfilter->getFacetIndexBuilder();

// Полная пересборка (TRUNCATE + INSERT...SELECT по каждому ключу)
$stats = $builder->buildAll(?callable $progress = null): array;
// ['filters' => 8, 'text_rows' => 450320, 'num_rows' => 12845, 'duration_ms' => 8432]

// Пересборка только указанных ключей (вызывается при сохранении набора)
$stats = $builder->rebuildKeys(['color', 'size']);

// Пересборка только для указанных товаров
$stats = $builder->buildForProducts([123, 456, 789]);

// Удалить из индекса (при удалении товаров)
$builder->removeProducts([123, 456]);

// Синхронизация по editedon — только изменённые товары (так работает задача mfl_sync_facet_index)
// Без аргумента — берёт last_sync_at из MflCache.
$stats = $builder->syncByEditedon();
// ['synced' => N, 'removed' => N, 'until' => ts, 'chunks' => N, 'duration_ms' => N]

// Нужно ли индексировать ресурс с этим class_key.
// С MiniShop3 — только msProduct, без него — всегда true.
$builder->shouldIndexClassKey($resource->get('class_key'));
```

### Одна пересборка за раз

Пока идёт другая пересборка индекса, `buildAll()` и `syncByEditedon()` ничего не делают и возвращают `['locked' => true]` с нулевой статистикой. Причина: пересборка начинается с очистки таблиц, и вторая выбросила бы всё, что успела записать первая.

```php
$stats = $builder->buildAll();
if (!empty($stats['locked'])) {
    // Индекс занят — повторить позже
}
```

Тот же признак возвращают `TvIndexer::indexAll()` и `SlugManager::generateForAllConfigs()`.

Проверить заранее, идёт ли пересборка в любом процессе, — `$mfilter->getLock()->isBusy(\MFilter\Services\NamedLock::FACET_INDEX)`; для индекса TV и алиасов — `TV_INDEX` и `SLUGS`.

Точечные методы — `rebuildKeys()`, `buildForProducts()`, `removeProducts()` — не блокируются: запускать их во время пересборки безопасно. Они удаляют и вставляют строки только по своим ключам или товарам, а повторную вставку той же строки отсекает первичный ключ `(filter_key, filter_value, product_id)`.

### Отслеживание прогресса

```php
$builder->buildAll(function ($filterKey, $rowsInserted) use ($modx) {
    $modx->log(modX::LOG_LEVEL_ERROR, "Indexed {$rowsInserted} rows for {$filterKey}");
});
```

### Использование в своих импортёрах

```php
// После импорта — пересборка только изменённых товаров
$updatedIds = [/* ID изменённых товаров */];
if (!empty($updatedIds)) {
    $builder->buildForProducts($updatedIds);
}
```

Подробнее: [Синхронизация индекса фасетов](/components/mfilter/cookbook/facet-index-sync).

## FacetIndexReader

Читает индекс фасетов. Через него тип фильтра решает, брать значения из индекса или старым путём — из источника.

```php
$reader = $mfilter->getFacetIndexReader();

// Есть ли ключ в индексе (кэшируется на время запроса)
$reader->hasIndexedTextKey('color'): bool;
$reader->hasIndexedNumKey('price'): bool;

// Текстовые значения со счётчиками, $productIds ограничивает выборку
$values = $reader->getTextValues('color', $productIds);
// [['value' => 'красный', 'count' => 124], ...]

// Несколько ключей одним запросом с GROUP BY
$batch = $reader->batchGetTextValues(['color', 'size', 'made_in'], $productIds);
// ['color' => [...], 'size' => [...], 'made_in' => [...]]

// Min/max для числового фильтра
$range = $reader->getNumRange('price', $productIds);
// ['min' => 1990.0, 'max' => 89990.0, 'count' => 1234]

// Сбросить кэш списка ключей (его вызывает FacetIndexBuilder после пересборки)
$reader->clearKeyCache(): void;
```

`$productIds = null` — весь каталог. Пустой массив `[]` — ни одного товара: значения придут пустыми, диапазон — нулевым.

### Использование в своём типе фильтра

Пример рассчитан на тип, унаследованный от `DefaultFilterType`: `buildFacetIndexQuery()` — его защищённый метод. У `AbstractFilterType` этого метода нет, и вызов упадёт с ошибкой «Call to undefined method».

```php
public function buildQuery($query, string $filterKey, array $values, array $config)
{
    $reader = $this->mfilter->getFacetIndexReader();

    if ($reader->hasIndexedTextKey($filterKey)) {
        return $this->buildFacetIndexQuery($query, $filterKey, $values, $config);
    }

    // Иначе — старый путь через JOIN к источнику
}
```

Подробнее: [Свой тип фильтра](/components/mfilter/cookbook/custom-filter-type).

## RequestIdsRegistry

Складывает большой список ID в таблицу `mfl_request_ids`, чтобы запрос делал `JOIN` вместо `IN(...)` на десятки тысяч ID.

```php
$registry = $mfilter->getRequestIdsRegistry();

// Стоит ли регистрировать этот список?
// (для коротких списков INSERT обходится дороже, чем выигрыш от JOIN)
if ($registry->isUseful($productIds)) {
    $runId = $registry->register($productIds);

    // Фрагмент SQL для JOIN
    $joinSql = $registry->joinSql($runId, 'o', 'product_id');
    $sql = "SELECT ... FROM source o {$joinSql} WHERE ...";
}

// Удалить устаревшие строки (это делает Scheduler-задача mfl_cleanup_request_ids)
$deleted = $registry->pruneStale(): int;
```

В конце запроса деструктор удаляет все зарегистрированные строки.

## ElementRunner

Запускает внешние сниппеты (msProducts, pdoResources) из mFilter.

```php
$runner = $mfilter->getElementRunner();

// Получить список ID через сниппет из &element
$ids = $runner->getIds(string $element, array $params): array;

// Запустить paginator (отрисовка страницы)
$html = $runner->runPaginator(string $paginator, string $element, array $pageIds, array $params): string;
```

## WarmupManager

::: warning Устарел с 1.4.0
Используется только для прогрева baseIds на страницах, где `mFilter` вызван с `&element`, — при первой загрузке и при AJAX. Основная фильтрация теперь идёт через индекс фасетов.
:::

```php
$wm = $mfilter->getWarmupManager();

// Прогреть все активные конфигурации
$result = $wm->warmAll(bool $warmSuggestions = false): array;
// ['total' => 5, 'warmed' => 5, 'failed' => 0, 'duration_ms' => 1830]

// Поставить в очередь Scheduler; false — Scheduler не установлен
$runId = $wm->schedule(bool $warmSuggestions = false): int|false;

// Создать конфигурацию при первом вызове mFilter
$wm->autoCreateConfig(int $resourceId, string $element, array $params): void;

// Получить baseIds из кэша (их читает сниппет mFilter)
$ids = $wm->getCachedBaseIds(int $resourceId, string $cacheKeyHash): ?array;
```

## Реестры

### FilterTypesRegistry

Реестр типов фильтров (`default`, `number`, `vendors`, `colors`, `boolean`, `parents`, `ms3_categories`, `date`, `month`, `year`, `day`).

```php
$registry = $mfilter->getFilterTypesRegistry();

// Получить тип
$type = $registry->getForKey('color', $config); // FilterTypeInterface

// Зарегистрировать свой тип (только из OnMFilterInit!)
$registry->register('mytype', new MyFilterType($modx, $mfilter));

// Заменить встроенный тип — зарегистрировать свой под тем же именем
$registry->register('vendors', new MyVendorsFilterType($modx, $mfilter));

// Убрать тип из реестра
$registry->unregister('mytype');

// Проверить существование
$registry->has('mytype'): bool;
```

Встроенный тип не снимайте через `unregister()`: ключи вроде `price` по-прежнему определяются как `number`, и запрос с таким фильтром упадёт с ошибкой.

### SourceRegistry

Реестр источников данных: `resource`, `tv`, `product`, `option`. Из него берётся список источников в редакторе набора фильтров.

Сейчас регистрация источника только добавляет его в этот выпадающий список. Данные фильтру берёт тип фильтра, а не источник: фильтр с незнакомым источником тип `default` ищет среди полей ресурса. Нестандартную таблицу подключают [своим типом фильтра](../cookbook/custom-filter-type).

Регистрируйте источник на событии [`OnMFilterInit`](events#onmfilterinit).

```php
$registry = $mfilter->getSourceRegistry();

// Регистрация (только из OnMFilterInit). Ключ источника — значение getId()
$registry->register(new MyProductsSource($modx, $mfilter));

// Получить
$source = $registry->get('myproducts'); // SourceInterface или null
```

## Конфигурация

```php
$mfilter = $modx->services->get('mfilter');

$config = $mfilter->config;

// Пути и URL
$config['corePath'];   // core/components/mfilter/
$config['assetsPath']; // assets/components/mfilter/
$config['assetsUrl'];  // /assets/components/mfilter/
$config['cssUrl'];     // /assets/components/mfilter/css/
$config['jsUrl'];      // /assets/components/mfilter/js/
$config['cachePath'];  // core/cache/mfilter/
$config['apiUrl'];     // /assets/components/mfilter/api.php
```

## Profiler

Замеряет время операций. Все методы статические, экземпляр не нужен. Включается системной настройкой `mfilter.debug_profiler` или вызовом `Profiler::enable()` из своего кода.

```php
use MFilter\Services\Profiler;

// Включить/выключить
Profiler::enable();
Profiler::disable();
Profiler::isEnabled(): bool;

// Замер участка кода
Profiler::start('myOperation');
// ... код ...
$ms = Profiler::stop('myOperation'): float; // длительность в мс

// Записать готовое значение (если уже посчитали где-то ещё)
Profiler::record('externalCall', $milliseconds);

// Получить результаты
$results = Profiler::getResults(): array;
// [
//   'total_ms' => 120.4,
//   'operations' => [
//     'myOperation' => ['total_ms' => 45.2, 'count' => 3, 'avg_ms' => 15.07, 'min_ms' => 12.1, 'max_ms' => 18.3],
//   ],
// ]
// При выключенном профайлере — []

// Краткая сводка для журнала
echo Profiler::getSummary();

// Сброс (например, между AJAX-запросами в долгоживущем CLI-процессе)
Profiler::reset();
```

Где искать замеры:

- **AJAX** — ключ `_profiler` ответа: `total_ms` и `operations` по каждой операции. Сервер включает профайлер по параметру `debug=1` в запросе; его отправляет форма `mFilterForm`, когда включена настройка.
- **Первая загрузка страницы** — `<script>window.__mfilterProfiler=...</script>` в конце вывода, для отладки в браузере.

## Методы фасада

```php
// Полная очистка кэша mFilter (MflCache и кэш роутера)
$mfilter->clearCache();

// Перестроить кэш роутера (filter_pages.cache.php)
$mfilter->rebuildRouterCache();

// Сбросить кэш одной страницы
$mfilter->invalidatePageCache(int $resourceId);

// С ID — то же, что invalidatePageCache(); без ID — весь кэш в базе, без файлов в core/cache/mfilter/
$mfilter->getFilter()->clearCache(int $resourceId = 0);

// Зарегистрировать CSS/JS на фронтенде
$mfilter->registerFrontend(string $contextKey);

// Установлен ли Scheduler
$mfilter->hasScheduler(): bool;

// Поставить задачу mFilter в очередь Scheduler без дублей; false — нет Scheduler или задачи
$runId = $mfilter->scheduleTaskOnce(string $reference, string $when = '+0 seconds', array $data = []): int|false;

// Индекс TV, алиасы и очистка кэша — первая половина кнопки «Переиндексация».
// Индекс фасетов не собирает: для него getFacetIndexBuilder()->buildAll()
$result = $mfilter->reindex(array $options = []): array; // index_tv — по умолчанию true
// ['tv_resources' => 1200, 'tv_values' => 5400, 'slugs_created' => 37, 'slugs_skipped' => 812,
//  'filter_sets_processed' => 4, 'cache_cleared' => true]
// Если идёт другая пересборка — 'locked' => true, и работа остановлена
```

Ставьте задачи mFilter только через `scheduleTaskOnce()`: `$task->schedule()` у повторяющейся задачи запускает вторую цепочку. Имена задач и поведение при повторном вызове — в [Scheduler-задачах](../interface/scheduler#zapusk-iz-koda).

## Расширение

Глобально подменить сервис нельзя: фасад создаёт сервисы через `new`, а ни контейнера зависимостей, ни файла настроек для подмены нет. Остаётся два пути:

- **свой тип фильтра** — регистрируется на событии `OnMFilterInit`, пример ниже;
- **наследник встроенного сервиса** (`Filter`, `SlugManager`…) — переопределите нужные методы и вызывайте свой класс **напрямую** из своего кода.

```php
// Плагин на OnMFilterInit
if ($modx->event->name !== 'OnMFilterInit') return;

/** @var \MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Свой тип фильтра
$mfilter->getFilterTypesRegistry()->register('mytype', new MyFilterType($modx, $mfilter));
```

Свой источник данных фильтр не подключит — см. [SourceRegistry](#sourceregistry).

Подробнее: [События](events), [Свой тип фильтра](/components/mfilter/cookbook/custom-filter-type), [Внешние фильтры](/components/mfilter/cookbook/external-filters).
