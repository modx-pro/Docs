# События

mFilter использует системные события MODX для своей работы и предоставляет одно собственное событие — `OnMFilterInit` — для расширения сторонними компонентами.

## Обзор

### События MODX, на которые подписан плагин mFilter

| Событие | Зачем |
|---------|-------|
| [`OnHandleRequest`](#onhandlerequest) | Парсинг SEO URL фильтра, sendForward на ресурс категории, обработка не-canonical URL |
| [`OnLoadWebDocument`](#onloadwebdocument) | Подключение CSS/JS из `mfilter.frontend_assets` |
| [`OnDocFormSave`](#ondocformsave) | Переиндексация TV и facet-индекса ресурса, инвалидация кэша страницы, перестройка router cache при смене URI |
| [`OnCacheUpdate`](#oncacheupdate) | Очистка router cache mFilter |
| [`OnResourceDelete`](#onresourcedelete) | Удаление TV-индекса и facet-индекса ресурса, перестройка router cache |
| [`msOnAfterImport`](#msonafterimport) | Полная пересборка facet-индекса после CSV-импорта MS3 |

### Кастомное событие mFilter

| Событие | Когда |
|---------|-------|
| [`OnMFilterInit`](#onmfilterinit) | После инициализации сервиса `mfilter`. Точка расширения для регистрации кастомных типов фильтров и источников данных |

## OnMFilterInit

Срабатывает один раз при первом обращении к сервису `mfilter` (`$modx->services->get('mfilter')`).

::: tip
Это **единственная** точка для регистрации кастомных `FilterType` и `Source`. Делать это «на лету» из других мест нельзя — реестры собираются один раз при инициализации.
:::

### Параметры события

| Параметр | Тип | Описание |
|----------|-----|----------|
| `mfilter` | `MFilter\MFilter` | Экземпляр главного класса |

### Регистрация кастомного типа фильтра

```php
<?php
// Плагин на OnMFilterInit

if ($modx->event->name !== 'OnMFilterInit') {
    return;
}

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Конструктор FilterType всегда принимает (modX, MFilter)
$mfilter->getFilterTypesRegistry()->register(
    'mytype',
    new MyNamespace\MyFilterType($modx, $mfilter)
);
```

Тип фильтра должен реализовывать `MFilter\Handlers\FilterTypes\FilterTypeInterface` или наследовать `AbstractFilterType`. Подробнее: [Свой тип фильтра](/components/mfilter/cookbook/custom-filter-type).

### Регистрация источника данных

```php
<?php
if ($modx->event->name !== 'OnMFilterInit') {
    return;
}

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// register() принимает один аргумент — экземпляр источника.
// Имя источника берётся из самого Source (метод getName()).
$mfilter->getSourceRegistry()->register(
    new MyNamespace\MyProductsSource($modx, $mfilter)
);
```

Источник должен реализовывать `MFilter\Handlers\Sources\SourceInterface` или наследовать `AbstractSource`. Подробнее: [Внешние фильтры](/components/mfilter/cookbook/external-filters).

## OnHandleRequest

Точка входа для роутинга SEO URL. Срабатывает в начале обработки HTTP-запроса.

### Что делает плагин

1. Пропускает запросы из менеджера (`context = mgr`)
2. Защита от двойной обработки после `sendForward` (флаг `mfilter.routed`)
3. Заранее ставит дефолтные плейсхолдеры — чтобы шаблон не падал на нефильтрованных страницах
4. Парсит `REQUEST_URI` через `UrlRouter::process()`
5. Если URL распознан как фильтрованный:
   - Проверяет canonical: URL должен заканчиваться `/`. При несоответствии — поведение из настройки `mfilter.non_canonical_url_handling`:
     - `404` *(по умолчанию)* — отдать 404
     - `301` — редирект на canonical
     - `off` — ничего не делать
   - Заполняет плейсхолдеры из распарсенных данных
   - Строит SEO-данные через `SeoBuilder`
   - Вызывает `sendForward()` на целевой ресурс

### Плейсхолдеры после роутинга

| Плейсхолдер | Описание |
|-------------|----------|
| `mfilter.filters` | Массив активных фильтров (`['color' => ['red'], ...]`) |
| `mfilter.activeFilters` | Алиас `mfilter.filters` |
| `mfilter.sort` | Сортировка в формате `field-dir` (`price-asc`) |
| `mfilter.sortBy` | Поле сортировки |
| `mfilter.sortDir` | Направление сортировки (`asc` / `desc`) |
| `mfilter.page` | Номер текущей страницы |
| `mfilter.limit` | Лимит элементов на странице |
| `mfilter.defaultLimit` | Дефолтный лимит из настроек |
| `mfilter.tpl` | ID активного шаблона представления (`tpl1`...) |
| `mfilter.base_uri` | URI базовой категории без фильтров |
| `mfilter.filter_uri` | URI с фильтрами (без базовой части) |
| `mfilter.tech` | Массив технических параметров (sort, limit, page, tpl) |
| `mfilter.seo.h1` | Сгенерированный H1 |
| `mfilter.seo.title` | Сгенерированный title |
| `mfilter.seo.description` | Сгенерированный meta description |
| `mfilter.seo.text` | SEO-текст с плейсхолдерами и склонениями |
| `mfilter.seo.canonical` | Canonical URL |
| `mfilter.seo.noindex` | Флаг noindex (bool) |

::: warning
На нефильтрованных страницах все SEO-плейсхолдеры пусты, `mfilter.filters` — пустой массив. Это нормально — шаблон должен это учитывать (например, через `{if $_pls['mfilter.filters']}`).
:::

## OnLoadWebDocument

Подключает CSS/JS на фронтенде.

### Что делает плагин

1. Проверяет `mfilter.register_frontend` — если `false`, выходит
2. Вызывает `$mfilter->registerFrontend($contextKey)` — добавляет в `<head>` файлы из `mfilter.frontend_assets`

### Отключение / кастомизация

См. [Системные настройки → Фронтенд](/components/mfilter/settings#фронтенд).

## OnDocFormSave

Срабатывает при сохранении ресурса через админку MODX.

### Параметры события

| Параметр | Тип | Описание |
|----------|-----|----------|
| `resource` | `modResource` | Сохранённый ресурс |

### Что делает плагин

1. **Переиндексация TV** — если `mfilter.tv_index_on_save = true`, вызывает `tvIndexer->indexResource($resourceId)`. Обновляет `mfl_tv_index` для нового набора TV-значений ресурса
2. **Пересборка facet-индекса для товара** — `FacetIndexBuilder::buildForProducts([$resourceId])`. Стоит 5–20 мс на товар, поддерживает индекс актуальным после правок через админку
3. Проверяет, является ли ресурс фильтр-страницей (через `FilterSetManager::getFilterSetIdForResource`)
4. Если да:
   - Инвалидирует кэш страницы (`invalidatePageCache`)
   - При смене URI — перестраивает router cache (`rebuildRouterCache`)

### Что НЕ покрывается

Прямой `$resource->save()` без процессора **не запускает** `OnDocFormSave` — изменения видит только recurring-задача [`mfl_sync_facet_index`](/components/mfilter/interface/scheduler#mfl-sync-facet-index) в течение 5 минут (если `editedon` обновлён). Подробнее: [Cookbook: Синхронизация индекса фасетов](/components/mfilter/cookbook/facet-index-sync).

## OnCacheUpdate

Срабатывает при очистке кэша MODX (через UI или `$modx->cacheManager->refresh()`).

### Что делает плагин

Вызывает `$mfilter->getUrlRouter()->clearCache()` — чистит router cache.

::: tip
Промежуточный кэш `MflCache` (suggestions, filtered IDs) этим событием **не очищается** — он самоинвалидируется по TTL и при сохранении товаров. Полная очистка — кнопка «Очистить кэш» на вкладке Обслуживание.
:::

## OnResourceDelete

Срабатывает при удалении ресурса.

### Параметры события

| Параметр | Тип | Описание |
|----------|-----|----------|
| `resource` | `modResource` | Удаляемый ресурс |

### Что делает плагин

1. Удаляет TV-индекс ресурса (`tvIndexer->removeResource($resourceId)`)
2. Удаляет строки facet-индекса для товара (`FacetIndexBuilder::removeProducts([$resourceId])`)
3. Если ресурс был привязан к FilterSet — перестраивает router cache

### Что НЕ покрывается

- Hard-DELETE через прямой SQL не триггерит событие — для таких случаев запустите ручной rebuild
- Привязки к FilterSet (`mfl_filter_set_resources`) остаются как orphan — на работу не влияет, очистка планируется в follow-up

## msOnAfterImport

Срабатывает после завершения штатного CSV-импорта MS3 (`MiniShop3\Utils\ImportCSV::process()`).

### Параметры события

| Параметр | Тип | Описание |
|----------|-----|----------|
| `stats` | array | `['total', 'created', 'updated', 'errors', 'skipped']` — счётчики импорта. Списка ID **не передаёт** |

### Что делает плагин

Поскольку список затронутых ID событие не предоставляет, плагин запускает **полную пересборку** индекса фасетов:

- Если установлен Scheduler — ставит `mfl_rebuild_facet_index` в очередь (фоновая сборка)
- Если Scheduler нет — синхронно вызывает `FacetIndexBuilder::buildAll()`

### Когда стоит писать свой обработчик

Если у вас кастомный импортёр (не MS3 ImportCSV), и вы знаете список затронутых ID — лучше точечно вызывать `buildForProducts($ids)` вместо `buildAll`. Это на порядок быстрее на больших каталогах. См. [Cookbook: Синхронизация индекса фасетов](/components/mfilter/cookbook/facet-index-sync#свой-плагин-на-событие-завершения-импорта).

## Создание собственного плагина

### Базовый шаблон для расширения mFilter

```php
<?php
/**
 * My mFilter Extension
 *
 * Events: OnMFilterInit
 */

if ($modx->event->name !== 'OnMFilterInit') {
    return;
}

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Регистрация кастомного типа фильтра
// $mfilter->getFilterTypesRegistry()->register('mytype', new MyType($modx, $mfilter));

// Регистрация источника данных
// $mfilter->getSourceRegistry()->register(new MySource($modx, $mfilter));
```

### Регистрация плагина

1. Создайте файл в `core/components/mypackage/elements/plugins/`
2. Зарегистрируйте плагин в MODX (через builder или вручную через UI)
3. Привяжите к событию `OnMFilterInit`

## Реальные паттерны расширения

В mFilter **нет системы хуков** (`addHook`, `beforeApply`, `afterApply` и т.п.) — расширение строится на стандартном механизме плагинов MODX и точках расширения сервисов (FilterType, Source). Ниже — рабочие паттерны.

### Логирование применения фильтров

Перехватываем через стандартный плагин на собственное событие или на `OnHandleRequest`:

```php
<?php
// Плагин на OnHandleRequest, выполняется ПОСЛЕ mFilter (приоритет ниже)

if ($modx->event->name !== 'OnHandleRequest') {
    return;
}

$filters = $modx->getPlaceholder('mfilter.filters');
if (empty($filters)) {
    return;
}

$modx->log(
    modX::LOG_LEVEL_ERROR,
    '[mFilterLog] URL: ' . ($_SERVER['REQUEST_URI'] ?? '') .
    ' | Filters: ' . json_encode($filters)
);
```

### Кастомизация выдачи фильтра

Вместо несуществующих `addHook('beforeApply', ...)` используйте свой `FilterType`, унаследованный от стандартного:

```php
<?php
// MyPriceFilterType.php

namespace MyPackage\FilterTypes;

use MFilter\Handlers\FilterTypes\NumberFilterType;

class MyPriceFilterType extends NumberFilterType
{
    public function buildQuery($query, string $filterKey, array $values, array $config)
    {
        // Ограничить максимальную цену
        if (isset($values[1]) && (float) $values[1] > 1000000) {
            $values[1] = 1000000;
        }
        return parent::buildQuery($query, $filterKey, $values, $config);
    }
}
```

Регистрация — через `OnMFilterInit`, перебивая стандартный `'number'`:

```php
$mfilter->getFilterTypesRegistry()->register(
    'number',
    new \MyPackage\FilterTypes\MyPriceFilterType($modx, $mfilter)
);
```

### Триггер на изменение каталога

Чтобы пересобрать индекс фасетов после массовой операции — вызывайте API напрямую из своего кода:

```php
<?php
// После своего bulk-импорта

$mfilter = $modx->services->get('mfilter');
$builder = $mfilter->getFacetIndexBuilder();

// Точечно — только затронутые товары
$builder->buildForProducts([123, 456, 789]);

// Или полностью (для очень больших импортов)
$stats = $builder->buildAll();
```

См. [FacetIndexBuilder](/components/mfilter/development/services#facetindexbuilder).
