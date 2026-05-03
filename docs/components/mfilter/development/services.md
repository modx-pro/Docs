# Сервисы

PHP-сервисы mFilter, их API и точки расширения.

## Архитектура

mFilter использует service locator с lazy-loading. Главный класс `MFilter` — фасад с геттерами по каждому сервису. Сервисы создаются по первому обращению и переиспользуются в рамках запроса.

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
| FilterConfig | `Services\Filter\FilterConfig` | `getFilterConfig()` | Доступ к конфигурации фильтров страницы |
| FilterSetManager | `Services\FilterSet\FilterSetManager` | `getFilterSetManager()` | Управление наборами фильтров |
| RequestIdsRegistry | `Services\Filter\RequestIdsRegistry` | `getRequestIdsRegistry()` | Регистрация больших списков ID для JOIN-замены `IN(...)` |
| SlugManager | `Services\Slug\SlugManager` | `getSlugManager()` | SEO-алиасы значений фильтров |
| SlugParser | `Services\Slug\SlugParser` | `getSlugParser()` | Парсинг SEO-сегментов URL |
| SlugGenerator | `Services\Slug\SlugGenerator` | `getSlugGenerator()` | Генерация slug-строк из значений |
| UrlRouter | `Services\Router\UrlRouter` | `getUrlRouter()` | Роутинг URL → ID ресурса |
| UrlBuilder | `Services\Router\UrlBuilder` | `getUrlBuilder()` | Построение SEO URL |
| SeoBuilder | `Services\Seo\SeoBuilder` | `getSeoBuilder()` | Генерация title/h1/description |
| TemplateParser | `Services\Seo\TemplateParser` | `getTemplateParser()` | Парсинг плейсхолдеров SEO-шаблонов |
| WordFormsManager | `Services\Seo\WordFormsManager` | `getWordFormsManager()` | Словоформы для склонений |
| TvIndexer | `Services\Tv\TvIndexer` | `getTvIndexer()` | Денормализованный индекс TV-значений |
| FacetIndexBuilder | `Services\Facet\FacetIndexBuilder` | `getFacetIndexBuilder()` | Сборка индекса фасетов из источников (1.4.0+) |
| FacetIndexReader | `Services\Facet\FacetIndexReader` | `getFacetIndexReader()` | Чтение индекса фасетов в FilterType (1.4.0+) |
| ElementRunner | `Services\Element\ElementRunner` | `getElementRunner()` | Запуск element/paginator-сниппетов |
| WarmupManager | `Services\Warmup\WarmupManager` | `getWarmupManager()` | Прогрев baseIds для AJAX *(legacy с 1.4.0)* |
| WarmupKeyBuilder | `Services\Warmup\WarmupKeyBuilder` | — | Построение ключей кэша для прогрева |
| SnippetCallParser | `Services\Warmup\SnippetCallParser` | — | Парсинг вызовов сниппетов из шаблонов |
| Profiler | `Services\Profiler` | — *(статический)* | Профилирование запросов |
| FilterHandler | `Handlers\FilterHandler` | `getFilterHandler()` | Высокоуровневая обработка фильтров (используется внутри Filter) |
| SourceHandler | `Handlers\SourceHandler` | `getSourceHandler()` | Получение значений из источников (option/product/tv/resource) |
| FilterTypesRegistry | `Handlers\FilterTypesRegistry` | `getFilterTypesRegistry()` | Реестр типов фильтров |
| SourceRegistry | `Handlers\Sources\SourceRegistry` | `getSourceRegistry()` | Реестр источников данных |

::: tip
`getMSearch()` возвращает экземпляр компонента mSearch, если он установлен, иначе `null`. Удобно для опциональной интеграции.
:::

## Filter

Основной сервис фильтрации.

### Сигнатуры

```php
$filter = $mfilter->getFilter();

// Полная фильтрация с пагинацией и сортировкой
$result = $filter->apply(int $resourceId, array $filters, array $options = []): array;

// Фильтрация внешнего списка ID (используется в element/paginator-режиме mFilter сниппета)
$ids = $filter->applyToIds(int $resourceId, array $ids, array $filters, array $options = []): array;

// Расчёт фильтров и значений для страницы
$filters = $filter->getFilters(int $resourceId, array $options = []): array;

// То же, но для внешнего списка ID
$filters = $filter->getFiltersForIds(int $resourceId, array $ids, array $options = []): array;

// Cross-filter suggestions: counts с учётом активных фильтров
$suggestions = $filter->getSuggestions(int $resourceId, array $appliedFilters, array $options = []): array;
$suggestions = $filter->getSuggestionsForIds(int $resourceId, array $allIds, array $appliedFilters, array $options = []): array;
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

### Параметры `$options`

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `limit` | `mfilter.default_limit` (20) | Размер страницы |
| `offset` | 0 | Смещение |
| `sortBy` | `menuindex` | Поле сортировки |
| `sortDir` | `ASC` | Направление |
| `parents` | `[$resourceId]` | Корневые ресурсы для обхода |
| `depth` | 10 | Глубина обхода |

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

## SlugManager

SEO-алиасы значений фильтров. Кэширует значения в памяти на время запроса.

### Сигнатуры

```php
$slugManager = $mfilter->getSlugManager();

// Главный метод: получить slug или создать, если ещё нет
$slug = $slugManager->getOrCreate(
    string $filterKey,
    string $value,
    string $source,                  // 'option', 'product', 'tv', 'resource', 'vendor'
    ?string $cultureKey = null
): string;

// Найти существующий slug по значению
$slug = $slugManager->findSlug(string $filterKey, string $value, ?string $cultureKey = null): ?string;

// Найти значение по slug
$value = $slugManager->findValue(string $filterKey, string $slug, ?string $cultureKey = null): ?string;

// Полная запись по slug (без привязки к filterKey)
$record = $slugManager->findBySlug(string $slug, ?string $cultureKey = null): ?array;

// Проверить существование
$exists = $slugManager->hasSlug(string $filterKey, string $slug, ?string $cultureKey = null): bool;

// Прелоад в память (минимизация запросов в горячих циклах)
$slugManager->preloadForFilters(array $filterKeys, ?string $cultureKey = null): void;

// Сохранить вручную (с защитой от перезаписи кастомных)
$slugManager->save(string $filterKey, string $value, string $slug, string $source, ?string $cultureKey = null, bool $respectCustom = true): bool;

// Сброс in-memory кэша
$slugManager->clearCache(): void;
```

### Пример

```php
$slugManager = $mfilter->getSlugManager();

// Стандартный путь
$slug = $slugManager->getOrCreate('vendor_id', 'Apple Inc.', 'product', 'ru');
// 'apple-inc'

// Обратный лукап (используется в SlugParser при парсинге URL)
$value = $slugManager->findValue('vendor_id', 'apple-inc', 'ru');
// 'Apple Inc.'
```

## UrlBuilder

Построение SEO URL из набора активных фильтров.

```php
$urlBuilder = $mfilter->getUrlBuilder();

$urlBuilder->setBaseUri('/catalog/electronics/');

// Простой URL
$url = $urlBuilder->build([
    'vendor_id' => ['apple'],
    'color' => ['black'],
], [
    'sort' => 'price-asc',
    'page' => 2,
]);
// '/catalog/electronics/vendor_id--apple/color--black/sort--price-asc/page--2/'

// Canonical URL (без сортировки/пагинации)
$canonical = $urlBuilder->buildCanonical($filters);
```

## UrlRouter

Распознавание SEO URL → ID ресурса.

```php
$router = $mfilter->getUrlRouter();

// Парсинг входящего URI
$result = $router->process('/catalog/electronics/vendor_id--apple/');
// [
//   'resource_id' => 12,
//   'filters' => ['vendor_id' => ['Apple Inc.']],
//   'tech' => [...],
//   'base_uri' => 'catalog/electronics/',
//   'filter_uri' => 'vendor_id--apple/',
// ]

// Сброс кэша роутера
$router->clearCache();
```

## SeoBuilder

Генерация SEO-метаданных по шаблонам из `mfl_seo_templates`.

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

## FilterSetManager

Управление наборами фильтров и их привязками.

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

Заполнение и поддержка таблицы `mfl_tv_index`. Вызывается автоматически при сохранении ресурсов с TV (если `mfilter.tv_index_on_save = true`).

```php
$indexer = $mfilter->getTvIndexer();

// Переиндексировать TV для конкретного ресурса
$rows = $indexer->indexResource(int $resourceId, ?array $tvNames = null): int;

// Полная переиндексация (опционально по списку TV / списку родителей)
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

Сборка индекса фасетов (`mfl_facet_index_text` / `mfl_facet_index_num`) из источников.

```php
$builder = $mfilter->getFacetIndexBuilder();

// Полная пересборка (TRUNCATE + INSERT...SELECT по каждому ключу)
$stats = $builder->buildAll(?callable $progress = null): array;
// ['filters' => 8, 'text_rows' => 450320, 'num_rows' => 12845, 'duration_ms' => 8432]

// Пересборка только указанных ключей (вызывается при сохранении набора)
$stats = $builder->rebuildKeys(['color', 'size']);

// Инкрементальная пересборка для конкретных товаров
$stats = $builder->buildForProducts([123, 456, 789]);

// Удалить из индекса (при удалении товаров)
$builder->removeProducts([123, 456]);
```

### Прогресс-callback

```php
$builder->buildAll(function ($filterKey, $rowsInserted) use ($modx) {
    $modx->log(modX::LOG_LEVEL_ERROR, "Indexed {$rowsInserted} rows for {$filterKey}");
});
```

## FacetIndexReader

Чтение из индекса фасетов. Используется внутри `FilterType` для прозрачного переключения между индексом и старым путём.

```php
$reader = $mfilter->getFacetIndexReader();

// Проверка наличия ключа в индексе (per-request кэш)
$reader->hasIndexedTextKey('color'): bool;
$reader->hasIndexedNumKey('price'): bool;

// Текстовые значения с counts (с опциональным ограничением scope)
$values = $reader->getTextValues('color', $productIds);
// [['value' => 'красный', 'count' => 124], ...]

// Batch-чтение для нескольких ключей в одном GROUP BY
$batch = $reader->batchGetTextValues(['color', 'size', 'made_in'], $productIds);
// ['color' => [...], 'size' => [...], 'made_in' => [...]]

// Min/max для числового фильтра
$range = $reader->getNumRange('price', $productIds);
// ['min' => 1990.0, 'max' => 89990.0, 'count' => 1234]

// Сброс per-request кэша списка ключей (вызывается builder'ом после rebuild)
$reader->clearKeyCache(): void;
```

### Использование в кастомном FilterType

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

Регистрация больших списков ID в таблице `mfl_request_ids` для замены `IN(30000)` на `JOIN`.

```php
$registry = $mfilter->getRequestIdsRegistry();

// Стоит ли использовать registry для этого списка?
// (для маленьких списков накладные расходы INSERT'а перевешивают выигрыш JOIN)
if ($registry->isUseful($productIds)) {
    $runId = $registry->register($productIds);

    // Получить SQL-кусок для JOIN
    $joinSql = $registry->joinSql($runId, 'foreignAlias', 'product_id');
    $sql = "SELECT ... FROM source o {$joinSql} WHERE ...";
}

// Очистка stale-строк (вызывается cron-задачей mfl_cleanup_request_ids)
$deleted = $registry->pruneStale(): int;
```

Все строки автоматически удаляются деструктором по окончании запроса.

## ElementRunner

Запуск внешних сниппетов (msProducts, pdoResources) из mFilter.

```php
$runner = $mfilter->getElementRunner();

// Получить список ID через element-сниппет
$ids = $runner->getIds(string $element, array $params): array;

// Запустить paginator (пакетный рендеринг страницы)
$html = $runner->runPaginator(string $paginator, string $element, array $pageIds, array $params): string;
```

## WarmupManager

::: warning Legacy с 1.4.0
Используется только для прогрева baseIds в AJAX-режиме. Основная фильтрация теперь идёт через индекс фасетов.
:::

```php
$wm = $mfilter->getWarmupManager();

// Прогреть все активные конфигурации
$result = $wm->warmAll(bool $warmSuggestions = true): array;

// Поставить в очередь Scheduler
$runId = $wm->schedule(bool $warmSuggestions = true): ?int;

// Авто-создание конфигурации при первом вызове mFilter
$wm->autoCreateConfig(int $resourceId, string $element, array $params): void;

// Получить кэшированный baseIds (используется в mFilter сниппете)
$ids = $wm->getCachedBaseIds(int $resourceId, string $cacheKeyHash): ?array;
```

## Реестры

### FilterTypesRegistry

Реестр типов фильтров (`default`, `number`, `vendors`, `colors`, `boolean`, `parents`, `date`, `month`, `year`, `day`).

```php
$registry = $mfilter->getFilterTypesRegistry();

// Получить тип
$type = $registry->getForKey('color', $config); // FilterTypeInterface

// Зарегистрировать свой тип (только из OnMFilterInit!)
$registry->register('mytype', new MyFilterType($modx, $mfilter));

// Проверить существование
$registry->has('mytype'): bool;
```

### SourceRegistry

Реестр источников данных. Сторонние источники добавляются для нестандартных моделей (например, ваша таблица `myShop_items`).

```php
$registry = $mfilter->getSourceRegistry();

// Регистрация (только из OnMFilterInit, имя берётся из $source->getName())
$registry->register(new MyProductsSource($modx, $mfilter));

// Получить
$source = $registry->get('myproducts'); // SourceInterface
```

Регистрация делается на событии [`OnMFilterInit`](events#onmfilterinit). Подробнее: [Свой тип фильтра](/components/mfilter/cookbook/custom-filter-type), [Внешние фильтры](/components/mfilter/cookbook/external-filters).

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

## Хелперы фасада

```php
// Полная очистка кэша mFilter (MflCache + router cache)
$mfilter->clearCache();

// Перестроить router cache (filter_pages.cache.php)
$mfilter->rebuildRouterCache();

// Инвалидировать кэш конкретной страницы
$mfilter->invalidatePageCache(int $resourceId);

// Зарегистрировать CSS/JS на фронтенде
$mfilter->registerFrontend(string $contextKey);
```

## Расширение

В mFilter **нет container'а с DI-overrides** — сервисы создаются внутри фасада через `new`. Расширение сервисов делается на уровне типов фильтров и источников через `OnMFilterInit`:

```php
// Плагин на OnMFilterInit
if ($modx->event->name !== 'OnMFilterInit') return;

/** @var \MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// 1. Свой тип фильтра
$mfilter->getFilterTypesRegistry()->register('mytype', new MyFilterType($modx, $mfilter));

// 2. Свой источник данных
$mfilter->getSourceRegistry()->register(new MySource($modx, $mfilter));
```

Для подмены поведения встроенных сервисов (Filter, SlugManager, ...) — наследуйте класс и переопределите нужные методы, после чего вызывайте свой класс **напрямую** в своём коде. Глобальной подмены через config-файл нет.

Подробнее: [События](events), [Свой тип фильтра](/components/mfilter/cookbook/custom-filter-type), [Внешние фильтры](/components/mfilter/cookbook/external-filters).
