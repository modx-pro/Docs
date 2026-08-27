---
title: Панель управления PageBuilder
description: Blocks, UTM, Collections и глобальная корзина в панели управления PageBuilder
---

# Панель управления PageBuilder

**Компоненты → PageBuilder** (`SectionTypesManager.vue`). Право **pagebuilder_manage_types** нужно для вкладки Blocks. Остальные вкладки панели управления доступны по стандартным правам менеджера.

Четыре вкладки на уровне сайта, не одного ресурса:

| Вкладка | Слой | Назначение |
| --- | --- | --- |
| **Blocks** | Free | UI-конструктор типов секций (`pb_section_types`) |
| **UTM** | Free | Глобальный реестр UTM-параметров (`pb_utm_params`) |
| **Collections** | Free | Наборы вкладок на форме ресурса по шаблону (`pb_collections`) |
| **Basket** | Pro | Глобальная корзина удалённых секций и строк таблиц |

![Панель управления PageBuilder](/components/pagebuilder/screenshots/mgr-cmp-index.png)

## Blocks

CRUD типов секций без деплоя PHP. Встроенные JSON из `core/components/pagebuilder/sections/*.json` можно править, скрывать и восстанавливать в каталоге через панель управления.

| Действие | Что происходит |
| --- | --- |
| Переопределить | Запись в `pb_section_types`, флаг `overridesCode`. На runtime побеждает БД |
| Скрыть | Тип не виден в каталоге на ресурсе, в панели управления остаётся с badge «Скрыт» |
| Удалить (code-тип) | Tombstone `removedCode` в БД. JSON в пакете не удаляется |
| Восстановить | Включите «Показывать скрытые» → **Восстановить** |

При обновлении дополнения строки `pb_section_types` **не перезаписываются**: побеждает БД. Секции на уже опубликованных страницах продолжают рендериться.

Connector `mgr/sectiontype/remove` принимает POST-параметр `lifecycle`: `hide`, `remove`, `restore` (не путать с `action` connector).

Подробнее про JSON-схему: [Разработчик → Определение секции](developer#opredelenie-sekcii).

<!-- ![Типы секций в панели управления](/components/pagebuilder/screenshots/mgr-cmp-section-types.png) -->

## UTM

Параметры для плейсхолдеров <code v-pre>{{utm:key}}</code> и значений по умолчанию. Правила **видимости** секций задаются в инспекторе ресурса (`settings.utm`), не на этой вкладке.

На фронте сессия UTM: [PageBuilderUtmSession](snippets/PageBuilderUtmSession) до `PageBuilder`. Ссылки: [Сниппеты](snippets/).

## Collections

Collection привязывается к `template_ids` (пустой список означает все шаблоны). При `pagebuilder_collections_enabled = 1` старые вкладки `resource_tab_enabled` и `resource_tables_tab_enabled` заменяются динамическим набором из панели управления.

### Типы вкладок (`tab_type`)

| Тип | Поведение на ресурсе |
| --- | --- |
| `sections` | Вкладка «Секции» (Vue `pagebuilder-resource`) |
| `table` | Табличные данные ресурса (`table_key` опционален) |
| `resources` | Дочерние ресурсы |
| `empty` | Заглушка (`config.message`) |
| `modx_collections` | Интеграция с MODX Collections (`pagebuilder_collections_modx_bridge_enabled`) |
| `iframe` | URL во `<iframe>` |

CRUD коллекций и разрешение вкладок для шаблона: `mgr/collection/list`, `save`, `remove`, `resolve`.

Настройки: [Системные настройки → Collections](settings#collections-cmp).

## Корзина (Pro) {#basket-pro}

Флаг `basket`. Корзина на странице в черновике ресурса остаётся в Free.

Индекс секций из `draft.trash[]` и строк таблиц при удалении. Синхронизация при `pbOnAfterSave`. При `OnEmptyTrash` ресурса записи индекса для этого `resource_id` удаляются.

| Действие | Назначение |
| --- | --- |
| `mgr/basket/list` | Список (`item_type`, pagination) |
| `mgr/basket/restore` | Вернуть секцию или строку таблицы |
| `mgr/basket/purge` | Удалить запись из индекса |
| `mgr/basket/restoreall` / `purgeall` | Массовые операции по массиву `ids` |

| Где | Что делает |
| --- | --- |
| Редактор ресурса → **Корзина** | На странице: восстановление и окончательное удаление в черновике (Free) |
| Панель управления → **Корзина** | Между ресурсами: список, восстановление в исходный ресурс, окончательное удаление (Pro) |

Восстановление из панели управления вставляет секцию на позицию `settings._trashIndex`, как в корзине на странице.

## Связанные страницы

- [Рабочий процесс](workflow)
- [PageBuilder Pro](pro)
- [Менеджер и события](integration)
