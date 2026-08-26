---
title: Разработчик
description: Определение секций, модель данных, расширения и JS API PageBuilder
---

# Разработчик

Страница для тех, кто добавляет свои секции, расширяет Pro или вызывает connector из своего кода.

## Определение секции {#opredelenie-sekcii}

### Секции в коде (Free)

| Артефакт | Путь / имя |
| --- | --- |
| JSON | `core/components/pagebuilder/sections/{key}.json` |
| Chunk | `core/components/pagebuilder/elements/chunks/pagebuilder_{key}.tpl` |
| BEM-блок | `pb-{key}` |

Минимальный JSON:

```json
{
  "key": "promo",
  "version": 1,
  "label": "Promo",
  "category": "conversion",
  "chunk": "pagebuilder_promo",
  "fields": [
    {"name": "title", "type": "text", "label": "Title", "required": true}
  ]
}
```

Секции с `category: dev` или ключом с `_` не попадают в production-каталог.

### Pro-секции

JSON: `pagebuilderpro/sections/`. Chunk: `pagebuilderpro_{key}`. По умолчанию `"requires": ["pro"]`. Commerce: `"requires": ["pro", "minishop3"]`.

### UI-типы в CMP

Таблица `pb_section_types`. Processors `mgr/sectiontype/*`. Определения из кода пакета при upgrade **не** перезаписываются.

### Доступность и requires

```json
"availability": {
  "templates": [4, 7],
  "parents": [10],
  "resources": [100],
  "contexts": ["web", "en"]
}
```

```json
"requires": ["pro", "minishop3"]
```

Проверка: `SectionRequirementChecker` и событие `pbOnCheckSectionRequirement`.

Регистрация из plugin:

```php
<?php
switch ($modx->event->name) {
    case 'pbOnRegisterSectionDefinitions':
        /** @var \PageBuilder\Section\SectionRegistry $registry */
        $registry = $modx->event->params['registry'];
        $registry->registerFromFile($modx->getOption('core_path') . 'components/mypackage/sections/custom.json');
        break;
}
```

Chunk стройте по [дизайн-системе](design-system): оболочка `pb-section`, escape текста, partial `pagebuilder_partial_image`.

## Модель данных {#model-dannyh}

### Таблицы

| Таблица | Назначение |
| --- | --- |
| `pb_pages` | Отдельная запись: черновик и опубликованный JSON по `resource_id` |
| `pb_section_types` | UI-определения типов (`definition_json`) |
| `pb_data_tables` / `pb_data_table_rows` | Табличные данные ресурса |
| `pb_utm_params` | Реестр UTM в CMP |
| `pb_collections` / `pb_collection_tabs` | Collections |
| `pb_basket_items` | Индекс глобальной корзины |

Pro: `pb_library_items`, `pb_revisions`, `pb_section_events`.

### JSON документа

Формат документа страницы:

```json
{
  "schemaVersion": 1,
  "sections": [
    {
      "id": "uuid",
      "type": "hero",
      "enabled": true,
      "data": { "title": "Hello" },
      "settings": { "contexts": ["web"] }
    }
  ],
  "trash": []
}
```

`revision` задаёт оптимистичную блокировку: клиент передаёт текущий номер, сервер сравнивает. При расхождении ответ `revision_conflict`.

### Кеш рендера

Раздел кеша: `pagebuilder/{resourceId}`. Сбрасывается при publish и unpublish. Кеш не используется при проверке видимости по UTM во время запроса, при `use_cache=0` и при ошибках рендера.

### PHP-сервис

```php
/** @var \PageBuilder\Service\PageBuilderService $pb */
$pb = $modx->services->get('pagebuilder');
$page = $pb->pages()->load($resourceId);
```

## Расширения Pro

Plugin на `pbOnRegisterFeatureProviders` регистрирует свой `FeatureProvider` рядом с `ProFeatureProvider`.

События boot, save и render: [Менеджер и события](integration#sobytiya).

## JavaScript API

| Файл | Назначение |
| --- | --- |
| `pagebuilder-api.js` | `PageBuilderApi`: POST к connector из своего UI менеджера |
| `pb-fetch-lite.js` | Минимальный POST без Vue |

```js
import { PageBuilderApi } from '/assets/components/pagebuilder/js/pagebuilder-api.js'

const api = new PageBuilderApi({
  baseUrl: '/assets/components/pagebuilder/connector.php',
  modAuth: MODx.siteId,
})
await api.post('mgr/catalog/list', { resource_id: 42 })
```

Для агентов и массовой записи секций используйте [Agent API](agent-api).

## Таблицы данных ресурса {#resource-data-tables}

Процессоры:

| Processor | Назначение |
| --- | --- |
| `mgr/datatable/list` | Таблицы ресурса |
| `mgr/datatable/rows/list` | Строки: `search`, `page`, `limit`, `filters` |
| `mgr/datatable/rows/save` / `remove` | Создание, изменение и удаление строк |

Фильтры JSON: `{ "price": { "op": "gte", "value": "10" } }`. Операторы: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`.

Вкладка «Таблицы» или тип вкладки `table` в [Collections](cmp#collections). На сайте выводят строки через сниппет `PageBuilderTableRows`.

## Инспектор

Поля `data` берутся из JSON типа. Settings: `contexts`, `utm`, в Pro ещё `conditions`. В полях url и button работают плейсхолдеры `{{utm:key}}`. Подробнее: [обзор полей](fields/overview).

## Связанные страницы

- [Agent API](agent-api)
- [PageBuilder Pro](pro)
- [CMP](cmp)
- [Дизайн-система](design-system)
