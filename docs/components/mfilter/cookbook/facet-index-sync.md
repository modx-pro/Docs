# Синхронизация индекса фасетов

Денормализованный индекс фасетов (`mfl_facet_index_text`/`num`) — это копия данных из `msProductData`/`msProductOption`/`modTemplateVarResource`. Если данные товаров поменялись, а индекс не обновился — фильтры покажут устаревшие значения и неверные счётчики.

В большинстве сценариев синхронизация происходит автоматически. Эта страница — про то, как именно, и что делать в нестандартных случаях.

## Сценарии и покрытие

| Что произошло | Что обновляет индекс | Когда |
|---------------|----------------------|-------|
| Товар сохранён через админку MODX | Плагин mFilter (OnDocFormSave) | Сразу |
| Товар удалён через админку MODX | Плагин mFilter (OnResourceDelete) | Сразу |
| Импорт через MS3 ImportCSV | Плагин mFilter (msOnAfterImport) | После завершения CSV-импорта |
| Программное `$resource->save()` (без процессора) | Scheduler-задача `mfl_sync_facet_index` | В течение 5 минут (если editedon обновлён) |
| Прямой SQL `UPDATE ... SET ..., editedon=NOW()` | Scheduler-задача `mfl_sync_facet_index` | В течение 5 минут |
| Прямой SQL `UPDATE` без `editedon=NOW()` | Только ручной запуск | По требованию |
| Прямой SQL `DELETE FROM modx_site_content` | Только ручной запуск | По требованию |

## Автоматическая синхронизация

### Через события MODX (плагин mFilter)

При сохранении/удалении ресурса через админку или процессор плагин mFilter сам вызывает `FacetIndexBuilder::buildForProducts()` для затронутого товара. Стоимость — 5–20 мс на товар, незаметно для UX.

Покрывает:
- Сохранение товара через стандартную форму ресурса MODX
- Сохранение товара через MS3-админку (msProduct наследуется от modResource)
- Изменение TV через админку
- Удаление товара (включая отправку в корзину)

Не покрывает:
- Прямой `$resource->save()` без процессора — событие `OnDocFormSave` не срабатывает
- Любые операции в обход MODX

### Через recurring-задачу (mfl_sync_facet_index)

Если установлен Scheduler, регистрируется задача `mfl_sync_facet_index` с интервалом **+5 минут**. Каждый запуск:

1. Берёт `last_sync_at` из `mfl_cache`
2. Находит товары с `editedon > last_sync_at` в `msProductData` и `modResource`
3. Пересобирает индекс для этих товаров батчами по 5000 ID
4. Удаляет из индекса soft-deleted товары
5. Записывает новый `last_sync_at`

Покрывает любые правки, которые **обновляют `editedon`** — что делает большинство импортёров (1С, ms3 csv, кастомные скрипты на $modx API). На простаивающем сайте задача отрабатывает за миллисекунды, лога не пишет.

Подробнее: [Scheduler-задачи → mfl_sync_facet_index](/components/mfilter/interface/scheduler#mfl-sync-facet-index).

### Через msOnAfterImport (MS3 ImportCSV)

После завершения штатного CSV-импорта MS3 событие `msOnAfterImport` триггерит **полную пересборку** индекса (через Scheduler если установлен, иначе синхронно). Списка обновлённых ID событие не передаёт, поэтому делается `buildAll`.

Подходит для импортов 1k–100k строк. Для регулярного импорта 100k+ лучше явно вызывать `buildForProducts($ids)` из своего обработчика — см. ниже.

## Ручная синхронизация в кастомных импортёрах

Если вы пишете свой импортёр и знаете, какие именно ID товаров затрагиваете — пересоберите индекс точечно. Это **на порядок быстрее**, чем `buildAll()` на больших каталогах.

### После batch-импорта одной пачкой

```php
$mfilter = $modx->services->get('mfilter');
$builder = $mfilter->getFacetIndexBuilder();

$updatedIds = [];

foreach ($csvRows as $row) {
    /** @var \MODX\Revolution\modResource $resource */
    $resource = $modx->getObject(\MODX\Revolution\modResource::class, $row['id']);
    if (!$resource) continue;

    $resource->set('pagetitle', $row['name']);
    $resource->setTVValue('has_pack', $row['pack']);
    $resource->save();

    $updatedIds[] = $resource->get('id');
}

// Один вызов после всего импорта — индекс обновится одним батчем
if (!empty($updatedIds)) {
    $stats = $builder->buildForProducts($updatedIds);
    $modx->log(modX::LOG_LEVEL_ERROR, "[Importer] Facet index updated: {$stats['products']} products in {$stats['duration_ms']}ms");
}
```

### Если ID неизвестны (или их слишком много)

Запустите полную пересборку. На каталоге 30k это 5–10 секунд, на 200k — до 2 минут. Лучше — через Scheduler в фоне:

```php
// Через Scheduler (рекомендуется)
$scheduler = $modx->services->get('scheduler');
$task = $scheduler->getTask('mfilter', 'mfl_rebuild_facet_index');
if ($task) {
    $task->schedule('+0 seconds');
}

// Или синхронно (для маленьких каталогов / CLI скриптов)
$mfilter->getFacetIndexBuilder()->buildAll();
```

## Свой плагин на событие завершения импорта

Если у вашего импортёра есть собственное событие конца — повесьте на него плагин с инкрементальной пересборкой:

```php
<?php
/**
 * MyImportFacetSync — обновляет индекс mFilter после завершения нашего импорта.
 *
 * Events: myImporterAfterRun
 *
 * @var modX $modx
 * @var array $scriptProperties
 */

if ($modx->event->name !== 'myImporterAfterRun') {
    return;
}

if (!$modx->services->has('mfilter')) {
    return;
}

// $scriptProperties['updated_ids'] — массив id, который ваш импортёр передаёт в событие
$updatedIds = $scriptProperties['updated_ids'] ?? [];

if (empty($updatedIds)) {
    return;
}

try {
    /** @var \MFilter\MFilter $mfilter */
    $mfilter = $modx->services->get('mfilter');
    $stats = $mfilter->getFacetIndexBuilder()->buildForProducts($updatedIds);

    $modx->log(
        modX::LOG_LEVEL_ERROR,
        "[MyImportFacetSync] Refreshed facet index for {$stats['products']} products "
        . "({$stats['text_rows']} text + {$stats['num_rows']} num rows in {$stats['duration_ms']}ms)"
    );
} catch (\Exception $e) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[MyImportFacetSync] Error: ' . $e->getMessage());
}
```

Зарегистрируйте плагин на ваше событие через стандартный механизм MODX (через UI или builder).

## Для прямого SQL в обход MODX

Если ваш импортёр пишет напрямую через `INSERT/UPDATE` без `editedon=NOW()` — задача `mfl_sync_facet_index` **не увидит** изменений. Варианты:

1. **Лучший** — выставлять `editedon=UNIX_TIMESTAMP()` в своих UPDATE'ах. Тогда sync подхватит за 5 минут.
2. **Запускать rebuild явно** в конце своего CLI-скрипта:

```bash
# CLI runner, идущий в комплекте со Scheduler
php /path/to/scheduler-runner.php mfilter mfl_rebuild_facet_index
```

3. **Включить sanity-rebuild по расписанию** — задать `mfl_rebuild_facet_index` recurring (через UI Scheduler), например, раз в неделю в ночь. На случай, если что-то всё равно расходится.

## Контроль и диагностика

- **Время последней пересборки и количество строк** — на вкладке **Обслуживание** в карточке «Индекс фасетов»
- **`last_sync_at`** — в `mfl_cache` под ключом `facet_index.last_sync_at`. Если она «зависла» — значит, recurring sync не запускается (проверьте Scheduler cron)
- **Логи** — задачи пишут в лог MODX с префиксом `[mFilter] Facet index ...`

## См. также

- [Обслуживание → Индекс фасетов](/components/mfilter/interface/maintenance)
- [Scheduler-задачи](/components/mfilter/interface/scheduler)
- [События](/components/mfilter/development/events)
- [FacetIndexBuilder API](/components/mfilter/development/services#facetindexbuilder)
