# Модели и база данных

Все таблицы и xPDO-модели mFilter. Для актуальности версии: 1.4.0+.

::: tip Соглашения
- Префикс таблиц — `mfl_`. Полное имя зависит от `table_prefix` MODX (`{prefix}_mfl_*`).
- Поля даты-времени называются `created_at` / `updated_at` (тип `datetime`).
- Поля сортировки — `sort_order` или `priority` (вместо зарезервированного MySQL 8 слова `rank`).
- JSON-данные хранятся в полях типа `text` с phptype `json` — xPDO сам делает сериализацию.
:::

## Полный список таблиц

| Таблица | Модель | Назначение |
|---------|--------|------------|
| `mfl_filter_sets` | MflFilterSet | Наборы фильтров |
| `mfl_filter_set_resources` | MflFilterSetResource | Привязки наборов к ресурсам |
| `mfl_slugs` | MflSlug | SEO-алиасы значений фильтров |
| `mfl_patterns` | MflPattern | Паттерны URL-сегментов |
| `mfl_seo_templates` | MflSeoTemplate | Шаблоны title/h1/description |
| `mfl_word_forms` | MflWordForm | Словоформы для склонения значений |
| `mfl_tv_index` | MflTvIndex | Денормализованный индекс TV-значений |
| `mfl_facet_index_text` | MflFacetIndexText | Индекс текстовых значений фильтров (1.4.0+) |
| `mfl_facet_index_num` | MflFacetIndexNum | Индекс числовых значений фильтров (1.4.0+) |
| `mfl_cache` | MflCache | Кэш промежуточных результатов |
| `mfl_request_runs` | MflRequestRun | Регистрация runs больших списков ID (1.4.0+) |
| `mfl_request_ids` | MflRequestIds | Списки ID для JOIN-замены IN(...) (1.4.0+) |
| `mfl_warmup_configs` | MflWarmupConfig | Конфигурации прогрева кэша *(legacy с 1.4.0)* |
| `mfl_warmup_config_resources` | MflWarmupConfigResource | Привязки конфигураций прогрева к страницам *(legacy)* |

---

## Конфигурация фильтров

### MflFilterSet

Набор фильтров. Один FilterSet привязывается к категориям через `MflFilterSetResource`.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | ID набора |
| `name` | varchar(255) | Название |
| `description` | text NULL | Описание |
| `filters` | text (JSON) | Конфигурация фильтров |
| `inherit` | tinyint(1) default 1 | Наследовать привязку на дочерние ресурсы |
| `sort_order` | int default 0 | Порядок сортировки в админке |
| `active` | tinyint(1) default 1 | Активен |
| `created_at` | datetime NULL | — |
| `updated_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), `idx_active`(`active`), `idx_sort_order`(`sort_order`).

**Структура `filters` (JSON):**

```json
{
  "vendor_id": {
    "type": "vendors",
    "source": "product",
    "label": "Производитель",
    "enabled": true
  },
  "color": {
    "type": "default",
    "source": "option",
    "field": "color",
    "label": "Цвет",
    "enabled": true
  },
  "price": {
    "type": "number",
    "source": "product",
    "field": "price",
    "label": "Цена",
    "enabled": true
  }
}
```

Доступные значения `type`: `default`, `number`, `boolean`, `vendors`, `colors`, `parents`, `date`, `month`, `year`, `day` + любые зарегистрированные через [`OnMFilterInit`](events).

Доступные значения `source`: `product` (msProductData), `option` (msProductOption), `tv`, `resource` (modResource поле). См. [Свой тип фильтра](/components/mfilter/cookbook/custom-filter-type).

**Пример работы:**

```php
use MFilter\Model\MflFilterSet;

// Получить набор
$filterSet = $modx->getObject(MflFilterSet::class, 1);
$filters = $filterSet->get('filters'); // уже массив (xPDO json)

// Создать набор
$filterSet = $modx->newObject(MflFilterSet::class);
$filterSet->fromArray([
    'name' => 'Каталог',
    'filters' => ['color' => ['type' => 'default', 'source' => 'option', 'field' => 'color']],
    'active' => 1,
]);
$filterSet->save();
```

### MflFilterSetResource

Привязка набора к ресурсу. Один ресурс может быть привязан только к одному набору (uk_resource).

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | ID привязки |
| `filter_set_id` | int unsigned | ID набора |
| `resource_id` | int unsigned | ID ресурса |
| `created_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_resource`(`resource_id`), `idx_filter_set`(`filter_set_id`).

::: tip
Распространение на дочерние ресурсы реализуется не отдельной таблицей, а флагом `inherit` на самом FilterSet — при поиске набора для ресурса сервис идёт вверх по дереву.
:::

```php
use MFilter\Model\MflFilterSetResource;

$binding = $modx->newObject(MflFilterSetResource::class);
$binding->fromArray(['filter_set_id' => 1, 'resource_id' => 5]);
$binding->save();

// Найти набор для ресурса
$filterSet = $mfilter->getFilterSetManager()->getForResource($resourceId);
```

---

## SEO

### MflSlug

SEO-алиас значения фильтра. Уникальность по `(filter_key, value, culture_key)` и `(filter_key, slug, culture_key)`.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `filter_key` | varchar(100) | Ключ фильтра (`color`, `vendor_id`, ...) |
| `value` | varchar(255) | Оригинальное значение |
| `slug` | varchar(255) | SEO-алиас |
| `source` | varchar(50) | Источник: `option`, `product`, `tv`, `resource`, `vendor`, `segment_builder` |
| `culture_key` | varchar(20) NULL | Языковой ключ |
| `is_custom` | tinyint(1) default 0 | Slug отредактирован вручную (не пересоздавать автоматически) |
| `active` | tinyint(1) default 1 | — |
| `created_at` | datetime NULL | — |
| `updated_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_filter_value_culture`(`filter_key, value, culture_key`), UNIQUE `uk_filter_slug_culture`(`filter_key, slug, culture_key`), `idx_slug`(`slug`), `idx_source`(`source`), `idx_culture`(`culture_key`).

```php
use MFilter\Model\MflSlug;

// Найти slug
$slugObj = $modx->getObject(MflSlug::class, [
    'filter_key' => 'vendor_id',
    'value' => 'Apple Inc.',
]);
$slug = $slugObj->get('slug'); // 'apple-inc'

// Создать (используйте SlugManager — он гарантирует уникальность)
$slug = $mfilter->getSlugManager()->getOrCreate('color', 'Красный', 'option', 'ru');
```

### MflPattern

Паттерн URL-сегмента — определяет, как `{key}_{value}` парсится из URL.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `filter_key` | varchar(100) | Ключ фильтра |
| `url_pattern` | varchar(255) | Шаблон URL-сегмента (`dvigatel--{value}`, `{value}`...) |
| `hide_key` | tinyint(1) default 0 | Сегмент содержит только значение, без префикса ключа |
| `parse_regex` | varchar(255) NULL | Регулярка для парсинга. При пустом — генерируется автоматически из `url_pattern` |
| `parse_type` | varchar(50) default `default` | Тип парсинга (`default`, `range`...) |
| `priority` | int default 100 | Приоритет применения паттерна (меньше = раньше) |
| `active` | tinyint(1) default 1 | — |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_filter_key`(`filter_key`), `idx_priority`(`priority`).

::: tip
Поле `parse_regex` пустое в большинстве случаев — auto-generation из `url_pattern` появилась в 1.3.3 и закрывает 99% сценариев. Указывайте вручную только для нестандартных URL.
:::

### MflSeoTemplate

SEO-шаблоны для генерации title/h1/description на фильтрованных страницах.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `name` | varchar(255) | Название (для админа) |
| `page_id` | int unsigned NULL | ID конкретного ресурса. NULL = шаблон применяется ко всем |
| `filter_keys` | text (JSON) | Массив ключей фильтров, к которым применим шаблон |
| `h1_template` | varchar(500) NULL | Шаблон H1 |
| `title_template` | varchar(500) NULL | Шаблон title |
| `description_template` | text NULL | Шаблон meta description |
| `sort_order` | int default 0 | Приоритет (меньше = раньше) |
| `active` | tinyint(1) default 1 | — |
| `culture_key` | varchar(20) NULL | Языковой ключ |
| `created_at` | datetime NULL | — |
| `updated_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), `idx_page`(`page_id`), `idx_sort_order`(`sort_order`), `idx_culture`(`culture_key`).

**Структура `filter_keys`:**

```json
["vendor_id", "color"]
```

Шаблон срабатывает, если активные фильтры **полностью совпадают** с этим набором ключей. Подробнее: [SEO шаблоны](/components/mfilter/interface/seo-templates).

### MflWordForm

Словоформы для склонения значений в SEO-текстах. Все 12 падежных форм + дополнительные «направительные» формы.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `filter_key` | varchar(100) | Ключ фильтра |
| `value` | varchar(255) | Оригинальное значение |
| `nom` | varchar(255) NULL | Именительный (кто? что?) |
| `gen` | varchar(255) NULL | Родительный (кого? чего?) |
| `dat` | varchar(255) NULL | Дательный (кому? чему?) |
| `acc` | varchar(255) NULL | Винительный (кого? что?) |
| `ins` | varchar(255) NULL | Творительный (кем? чем?) |
| `pre` | varchar(255) NULL | Предложный (о ком? о чём?) |
| `nom_pl` ... `pre_pl` | varchar(255) NULL | Те же 6 форм во множественном числе |
| `where_form` | varchar(255) NULL | Форма «где?» (в Москве) |
| `to_form` | varchar(255) NULL | Форма «куда?» (в Москву) |
| `from_form` | varchar(255) NULL | Форма «откуда?» (из Москвы) |
| `culture_key` | varchar(20) NULL | Языковой ключ |
| `is_auto` | tinyint(1) default 0 | Сгенерировано автоматически (через morpher.ru) |
| `created_at` | datetime NULL | — |
| `updated_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_filter_value_culture`(`filter_key, value, culture_key`), `idx_filter`(`filter_key`), `idx_culture`(`culture_key`).

Подробнее: [Словоформы](/components/mfilter/interface/word-forms).

---

## Индексы

### MflTvIndex

Денормализованный индекс TV-значений. Заменяет JOIN к `modTemplateVarResource` при подсчёте suggestion'ов для TV-фильтров.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `resource_id` | int unsigned | ID ресурса |
| `tv_id` | int unsigned | ID TV |
| `tv_name` | varchar(100) | Имя TV (денормализовано для скорости) |
| `value` | varchar(255) | Значение TV |
| `label` | varchar(255) NULL | Человекочитаемая метка (для TV типа listbox) |
| `created_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_resource_tv_value`(`resource_id, tv_id, value`), `idx_tv_value`(`tv_id, value`), `idx_tv_name_value`(`tv_name, value`), `idx_resource`(`resource_id`).

Заполняется автоматически на `OnDocFormSave` (если `mfilter.tv_index_on_save = true`) и при ручной переиндексации.

### MflFacetIndexText

Денормализованный индекс текстовых значений фильтров (бренды, цвета, размеры, made_in и т.п.). С версии 1.4.0.

| Поле | Тип | Описание |
|------|-----|----------|
| `filter_key` | varchar(64) | Ключ фильтра (`color`, `made_in`, ...) |
| `filter_value` | varchar(255) | Значение фильтра (как в источнике) |
| `product_id` | int unsigned | ID товара |

**Индексы:** PRIMARY (`filter_key, filter_value, product_id`) — covering, обеспечивает уникальность и быстрые scan'ы по leftmost-prefix; `idx_product`(`product_id`) — для DELETE при пересборке для конкретных товаров.

::: warning
Не используйте `getCollection`/`getObject` напрямую — таблица может содержать миллионы строк. Только через [`FacetIndexReader`](services#facetindexreader).
:::

### MflFacetIndexNum

Аналогично `MflFacetIndexText`, но для числовых фильтров (price, weight, height...).

| Поле | Тип | Описание |
|------|-----|----------|
| `filter_key` | varchar(64) | Ключ фильтра |
| `filter_value` | decimal(20,4) | Числовое значение |
| `product_id` | int unsigned | ID товара |

**Индексы:** PRIMARY(`filter_key, filter_value, product_id`), `idx_product`(`product_id`).

```php
$range = $mfilter->getFacetIndexReader()->getNumRange('price', $productIds);
// ['min' => 1990.0, 'max' => 89990.0, 'count' => 1234]
```

---

## Кэш и runtime-таблицы

### MflCache

Кэш промежуточных результатов фильтрации (suggestions, filtered IDs, base IDs прогрева).

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `cache_key` | varchar(255) | Ключ (формат: `{prefix}_{resourceId}_{hash}`) |
| `cache_value` | mediumtext | Сериализованные данные (JSON) |
| `created_at` | datetime NULL | — |
| `expires_at` | datetime | Время истечения |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_cache_key`(`cache_key`), `idx_expires`(`expires_at`).

Подробнее: [Кэширование](/components/mfilter/cache).

### MflRequestRun

Регистрация одного «запроса с большим списком ID». Используется `RequestIdsRegistry` для замены `WHERE id IN (30000)` на JOIN.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | bigint unsigned PK auto_increment | run_id, выдаётся атомарно |
| `created_at` | int unsigned default 0 | UNIX timestamp создания |

**Индексы:** PRIMARY(`id`), `idx_created_at`(`created_at`).

### MflRequestIds

Сами списки ID, привязанные к run_id из `MflRequestRun`. Composite PK без отдельного `id`.

| Поле | Тип | Описание |
|------|-----|----------|
| `run_id` | bigint unsigned PK | FK на `MflRequestRun.id` |
| `product_id` | int unsigned PK | ID товара |
| `created_at` | int unsigned default 0 | UNIX timestamp (для cleanup-задачи) |

**Индексы:** PRIMARY(`run_id, product_id`), `idx_created_at`(`created_at`).

**Жизненный цикл:**
1. Деструктор `RequestIdsRegistry` удаляет run и его строки в конце запроса
2. Shutdown handler — на случай fatal-error
3. Cron-задача `mfl_cleanup_request_ids` каждые 10 минут — страховка от `kill -9`

См. [`RequestIdsRegistry`](services#requestidsregistry).

---

## Прогрев (legacy)

::: warning Legacy с версии 1.4.0
Эти таблицы используются только для прогрева baseIds в AJAX-режиме. После полной стабилизации индекса фасетов они будут удалены.
:::

### MflWarmupConfig

Конфигурация прогрева — один сниппет (`element` + `params`), результаты которого сохраняются в кэш.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `name` | varchar(255) | Название |
| `element` | varchar(100) | Имя сниппета (`msProducts`, `pdoResources`...) |
| `snippet_call` | text NULL | Полный вызов сниппета (для отладки) |
| `params` | text (JSON) | Параметры вызова |
| `cache_key_hash` | varchar(32) | MD5 от `element + params` (уникальность) |
| `active` | tinyint(1) default 1 | — |
| `auto_created` | tinyint(1) default 0 | Создан автоматически из реального вызова mFilter |
| `last_warmup_at` | datetime NULL | Время последнего прогрева |
| `last_duration_ms` | int NULL | Длительность последнего прогрева |
| `last_product_count` | int NULL | Количество найденных товаров |
| `created_at` | datetime NULL | — |
| `updated_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_cache_key_hash`(`cache_key_hash`), `idx_active`(`active`).

### MflWarmupConfigResource

Привязка конфигурации прогрева к страницам каталога.

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | int unsigned PK | — |
| `config_id` | int unsigned | FK на `MflWarmupConfig.id` |
| `resource_id` | int unsigned | ID ресурса |
| `created_at` | datetime NULL | — |

**Индексы:** PRIMARY(`id`), UNIQUE `uk_config_resource`(`config_id, resource_id`), `idx_config`(`config_id`).

---

## Миграции

При установке/обновлении пакета все таблицы создаются автоматически через резолвер `_build/resolvers/resolve.tables.php`.

### Программное создание таблиц

```php
$manager = $modx->getManager();

// Создать конкретную таблицу
$manager->createObjectContainer(\MFilter\Model\MflFilterSet::class);

// Добавить индекс вручную (если меняли metaMap)
$manager->addIndex(\MFilter\Model\MflSlug::class, 'idx_slug');
```

### Изменения схемы между версиями

| Версия | Что изменилось |
|--------|----------------|
| **1.4.0** | Добавлены `mfl_facet_index_text`, `mfl_facet_index_num`, `mfl_request_runs`, `mfl_request_ids` |
| **1.2.0** | Добавлены `mfl_warmup_configs`, `mfl_warmup_config_resources` |
| **1.1.0** | Удалена `mfl_page_configs` (заменена на `mfl_filter_sets` + `mfl_filter_set_resources`); поля `rank/createdon` переименованы в `sort_order/created_at` для совместимости с MySQL 8 |
