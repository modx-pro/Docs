---
title: Панель управления PageBuilder
description: "Blocks, UTM, Collections, Forms, Bundle, API tokens и корзина PageBuilder"
---

# Панель управления PageBuilder

**Компоненты → PageBuilder** (`SectionTypesManager.vue`). Право **pagebuilder_manage_types** нужно для вкладки Blocks. Остальные вкладки панели управления доступны по стандартным правам менеджера.

Вкладка **Blocks** есть в Free. Реестр UTM, Collections и остальные вкладки требуют PageBuilder Pro.

| Вкладка | Слой | Назначение |
| --- | --- | --- |
| **Blocks** | Free | UI-конструктор типов секций (`pb_section_types`) |
| **UTM** | Pro | Глобальный реестр UTM-параметров (`pb_utm_params`), capability `utm` |
| **Collections** | Pro | Наборы вкладок на форме ресурса по шаблону (`pb_collections`), capability `collections` |
| **Basket** | Pro | Глобальная корзина удалённых секций и строк таблиц |
| **Шаблоны страниц** | Pro | Скелеты пустых секций (`pb_page_templates`), capability `page-templates` |
| **Forms** | Pro | Схемы для [form_builder](sections/form_builder), capability `forms` |
| **Bundle** | Pro | Export и import UI-типов секций |
| **API tokens** | Pro | Bearer-токены [REST API v1](rest-api) |

![Панель управления PageBuilder](/components/pagebuilder/screenshots/mgr-cmp-index.png)

## Blocks

CRUD типов секций без деплоя PHP. Встроенные JSON из `core/components/pagebuilder/sections/*.json` можно править, скрывать и восстанавливать в каталоге через панель управления.

Фильтр по источнику (чипы, выбор сохраняется в браузере):

| Чип | Что показывает |
| --- | --- |
| **Все** | Пакетные и свои типы |
| **Из пакета** | Типы из JSON пакета (и их UI-override в БД) |
| **Мои** | Типы, созданные в панели управления |

Кнопка **Скрыть предустановленные** массово прячет типы из пакета (`published = 0` для UI-override и своих; для code-типов hide по-прежнему через lifecycle). Свои типы остаются. Секции на уже собранных страницах не меняются.

В карточке типа поле **Превью в каталоге**: загрузите скриншот вёрстки. В диалоге **+ Создать** на ресурсе он заменит схематичную картинку пакета.

При capability `presets` (Pro) на вкладке **Blocks** тумблер **Показывать примеры в каталоге** пишет `pagebuilder_catalog_examples_enabled` через `mgr/config/save`. То же значение задают в [системных настройках](settings#каталог).

| Действие | Что происходит |
| --- | --- |
| Переопределить | Запись в `pb_section_types`, флаг `overridesCode`. На runtime побеждает БД |
| Скрыть | Тип не виден в каталоге на ресурсе, в панели управления остаётся с badge «Скрыт» |
| Удалить (code-тип) | Tombstone `removedCode` в БД. JSON в пакете не удаляется |
| Восстановить | Включите «Показывать скрытые» → **Восстановить** |

При обновлении дополнения строки `pb_section_types` **не перезаписываются**: побеждает БД. Системные настройки пользователя тоже не сбрасываются (`update.settings = false`). Секции на уже опубликованных страницах продолжают рендериться.

Connector `mgr/sectiontype/remove` принимает POST-параметр `lifecycle`: `hide`, `remove`, `restore` (не путать с `action` connector). Для массового hide передаётся массив `keys`.

Подробнее про JSON-схему: [Разработчик → Определение секции](developer#opredelenie-sekcii).

<!-- ![Типы секций в панели управления](/components/pagebuilder/screenshots/mgr-cmp-section-types.png) -->

## UTM

Нужна capability `utm`. Параметры для плейсхолдеров <code v-pre>{{utm:key}}</code> и значений по умолчанию. Правила **видимости** секций задаются в диалоге **Видимость** инспектора ресурса (`settings.utm`), если включена `pagebuilder_inspector_visibility_enabled`. Не на этой вкладке. Уже опубликованные правила на сайте исполняет Free. <!-- markdownlint-disable-line MD033 -->

На фронте сессия UTM: [PageBuilderUtmSession](snippets/PageBuilderUtmSession) до `PageBuilder`. Ссылки: [Сниппеты](snippets/).

## Collections

Нужны PageBuilder Pro и capability `collections`. Без capability вкладки нет, даже если `pagebuilder_collections_enabled = 1`.

Collection привязывается к `template_ids` (пустой список означает все шаблоны). При включённой настройке старые вкладки `resource_tab_enabled` и `resource_tables_tab_enabled` заменяются динамическим набором из панели управления.

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
| `mgr/basket/purge` | Убрать секцию из `draft.trash` и строку индекса. `published_json` не меняется |
| `mgr/basket/restoreall` / `purgeall` | Массовые операции по массиву `ids` |

| Где | Что делает |
| --- | --- |
| Редактор ресурса → **Корзина** | На странице: восстановление и окончательное удаление в черновике (Free) |
| Панель управления → **Корзина** | Между ресурсами: список, восстановление в исходный ресурс, окончательное удаление (Pro) |

Восстановление из панели управления вставляет секцию на позицию `settings._trashIndex`, как в корзине на странице. После purge секция пропадает с сайта только когда на ресурсе нажмут **Сохранить**.

## Forms {#forms}

Capability `forms`. Во вкладке создаёте схему с ключом и полями. На странице секция [form_builder](sections/form_builder) выбирает этот ключ. Отправка идёт через FetchIt и сниппет `PageBuilderFormBuilder`.

Сервер проверяет CSRF и honeypot `nospam`. Письмо и webhook уходят синхронно после commit, в том же HTTP-запросе. Submissions в БД не хранятся. Файл в форме v1 не принимается. Процессоры: `mgr/form/*`.

## Bundle {#bundle}

Export UI-типов секций, dry-run и import одной транзакцией через `UiSectionTypeService`.

1. На исходном сайте откройте **Bundle** и выгрузите JSON.
2. На целевом сайте вставьте JSON и запустите dry-run.
3. План показывает `create`, `update` или `conflict`. Conflict не импортируется.
4. Import применяет create и update.

В бандл v1 не входят secrets, токены, содержимое страниц, строки таблиц, формы и datasources. Процессоры: `mgr/bundle/*`.

## API tokens {#api-tokens}

Capability `api`. Новому токену задают имя и scopes `pages.read` и `catalog.read`. Секрет показывают один раз. В системной настройке `pagebuilder_rest_tokens` остаются `prefix` и hash.

Отозванный токен отвечает `401`. Транспорт включается `pagebuilder_rest_api_enabled`. Маршруты: [REST API v1](rest-api). Процессоры: `mgr/resttoken/*`.

## Связанные страницы

- [Рабочий процесс](workflow)
- [PageBuilder Pro](pro)
- [Менеджер и события](integration)
