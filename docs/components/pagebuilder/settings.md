---
title: Системные настройки
description: "Ключи namespace pagebuilder: превью, вкладки, visibility, responsive, Public API, REST"
---
# Системные настройки

Namespace MODX: **pagebuilder**. Ключ в базе: `pagebuilder_<name>`.

В манифесте дополнения **28 ключей**. При установке или обновлении Phinx/resolver добавляет отсутствующие. Уже заданные значения не перезаписывает (`update.settings = false`).

Ключи, добавленные в 1.0.3+:

| Ключ | Раздел |
| --- | --- |
| `pagebuilder_inspector_visibility_enabled` | [Редактор](#редактор) |
| `pagebuilder_default_breakpoint` | [Responsive](#responsive) |
| `pagebuilder_responsive_breakpoints` | [Responsive](#responsive) |
| `pagebuilder_responsive_apply` | [Responsive](#responsive) |

Ключи, добавленные в 1.0.9–1.0.10:

| Ключ | Раздел |
| --- | --- |
| `pagebuilder_catalog_examples_enabled` | [Каталог](#каталог) |
| `pagebuilder_resource_view_mode` | [Редактор](#редактор) |
| `pagebuilder_responsive_editor_enabled` | [Responsive](#responsive) |

## Пути и превью

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_core_path` | text | `{core_path}components/pagebuilder/` | Путь к PHP core компонента |
| `pagebuilder_assets_url` | text | `{assets_url}components/pagebuilder/` | URL connector, preview, статики |
| `pagebuilder_preview_secret` | text | пусто → resolver | Секрет подписи токена превью черновика |
| `pagebuilder_load_frontend_css` | boolean | `1` | Подключать `pagebuilder-sections.css` при вызове сниппета `PageBuilder` |
| `pagebuilder_preview_include_template_css` | boolean | `1` | Подтягивать `<link rel="stylesheet">` шаблона ресурса в iframe превью |
| `pagebuilder_preview_css_urls` | textarea | пусто | Дополнительные CSS для превью (через запятую или с новой строки) |

Пустой `pagebuilder_preview_secret` при установке resolver заполняет случайным hex (`bin2hex(random_bytes(16))`). Если значение снова пустое во время работы, код берёт `site_uuid`. На рабочем сайте задайте отдельный секрет, если превью не должно опираться на предсказуемый UUID.

Порядок CSS в iframe превью (`preview.php`):

1. Stylesheet из шаблона ресурса, если `pagebuilder_preview_include_template_css = 1`
2. URL из `pagebuilder_preview_css_urls` (через запятую или с новой строки)
3. `pagebuilder-sections.css` и `pagebuilder-preview.css`

<!-- MEDIA: diagram | nice | Порядок подключения CSS в iframe preview.php: шаблон → preview_css_urls → pagebuilder-sections.css и pagebuilder-preview.css | Схема по тексту раздела «Пути и превью», без привязки к домену -->

Если тема подключает CSS только через Fenom или `@import` без `<link>`, добавьте файлы явно в `preview_css_urls`. Плейсхолдеры: `{assets_url}`, `{base_url}`, `{site_url}`.

## Вкладки на форме ресурса

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_resource_tab_enabled` | boolean | `0` | Вкладка «Секции» на форме ресурса |
| `pagebuilder_resource_tab_parents` | text | пусто | ID родителей через запятую. Пусто при включённой вкладке = все ресурсы |
| `pagebuilder_resource_tab_index` | number | `-1` | Позиция вкладки «Секции»: `0` первая и открыта при загрузке ресурса, `1` вторая, `-1` последняя |
| `pagebuilder_resource_tables_tab_enabled` | boolean | `0` | Вкладка «Таблицы» (табличные данные ресурса) |
| `pagebuilder_resource_tables_tab_index` | number | `-1` | Позиция вкладки «Таблицы» |

<!-- MEDIA: screenshot-admin | nice | Системные настройки, namespace pagebuilder: видны ключи pagebuilder_resource_tab_enabled, pagebuilder_resource_tab_parents, pagebuilder_resource_tab_index | Тестовый стенд, значения как в quick-start шаг 3 -->

## Collections (панель управления) {#collections-cmp}

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_collections_enabled` | boolean | `0` | Динамический набор вкладок из Collections. Нужна capability `collections` (Pro). Без неё вкладки нет |
| `pagebuilder_collections_modx_bridge_enabled` | boolean | `0` | Тип вкладки `modx_collections` |

Подробнее: [Панель управления → Collections](cmp#collections).

<!-- MEDIA: screenshot-admin | nice | CMP PageBuilder: настройка Collections, pagebuilder_collections_enabled и modx_collections | PageBuilder Pro, capability collections на стенде -->

## Табличные данные ресурса

Вкладка «Таблицы» на ресурсе (`pagebuilder_resource_tables_tab_enabled`) или тип вкладки `table` в Collections.

| Processor | Назначение |
| --- | --- |
| `mgr/datatable/list` | Таблицы ресурса |
| `mgr/datatable/rows/list` | Строки: `search`, `page`, `limit`, `filters` |
| `mgr/datatable/rows/save` / `remove` | CRUD строк |

Фильтры JSON по колонкам: `{ "price": { "op": "gte", "value": "10" } }`. Операторы: `eq`, `contains`, `in`, `gt`, `lt`, `gte`, `lte`, `between`, `empty`, `not_empty`.

На сайте: сниппет `PageBuilderTableRows`, секция [data_table](sections/data_table). Подробнее: [Разработчик](developer#resource-data-tables).

## Редактор {#редактор}

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_fake_enabled` | boolean | `0` | Кнопка **Fake** в инспекторе секции: заполняет поля детерминированными демо-данными (`mgr/section/fake`) |
| `pagebuilder_inspector_visibility_enabled` | boolean | `0` | Кнопка **Видимость** в инспекторе: диалог условий, контекстов, UTM и копии для контекста. По умолчанию выкл., редактор видит только поля контента |
| `pagebuilder_resource_view_mode` | text | `editorial` | Вид списка на вкладке **Секции**: `editorial` или `table`. Менеджер может переопределить тумблером (значение в `localStorage`) |

<!-- MEDIA: screenshot-admin | must | Инспектор секции: кнопки Fake и Видимость при pagebuilder_fake_enabled=1 и pagebuilder_inspector_visibility_enabled=1; кадр с тумблером editorial/table на вкладке Секции | Включить ключи на стенде, тестовая секция Hero -->

## Каталог {#каталог}

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_catalog_examples_enabled` | boolean | `1` | Вкладка **Примеры** в каталоге секций (Pro JSON-пресеты). Выключите, чтобы спрятать без удаления файлов пакета. Тумблер также в CMP **Типы секций** при capability `presets` (`mgr/config/save`) |

<!-- MEDIA: screenshot-admin | nice | Каталог секций на ресурсе: вкладка Примеры (Pro) или тумблер Examples в CMP Типы секций | pagebuilder_catalog_examples_enabled=1, Pro/presets на стенде -->

## Responsive breakpoints {#responsive}

Пороги экранов для полей с `responsive: true` и ширины iframe превью в менеджере.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_responsive_editor_enabled` | boolean | `0` | Кнопка и вкладки разных значений поля для desktop / tablet / mobile в инспекторе. По умолчанию выкл. На сайте сохранённые карты breakpoints работают, пока редактор не сохранит поле одним значением |
| `pagebuilder_default_breakpoint` | text | `desktop` | Ключ из JSON breakpoints при `responsive_apply=manual`, если нет `?pb_bp=` |
| `pagebuilder_responsive_breakpoints` | textarea | desktop / tablet / mobile JSON | Массив `{ key, minWidth, previewWidth, label }`. На типе секции можно переопределить `responsiveBreakpoints` |
| `pagebuilder_responsive_apply` | text | `manual` | `manual`: на сайте одно значение (SEO-безопасно). `css`: все значения в HTML + media queries. В чанках для таких полей: `{$title\|pb_text}` вместо `\|escape` |

Пример JSON по умолчанию:

```json
[
  { "key": "desktop", "minWidth": 1024, "previewWidth": 1280, "label": "Desktop" },
  { "key": "tablet", "minWidth": 768, "previewWidth": 768, "label": "Tablet" },
  { "key": "mobile", "minWidth": 0, "previewWidth": 390, "label": "Mobile" }
]
```

Подробнее про данные поля: [Обзор полей → responsive](fields/overview#pro-responsive).

<!-- MEDIA: screenshot-admin | nice | Инспектор поля с responsive: вкладки desktop / tablet / mobile при pagebuilder_responsive_editor_enabled=1 | Включить настройку и responsive-поле в типе секции на стенде -->

## Public API {#public-api}

JSON только для чтения: опубликованные секции для headless. Подробнее: [Public API](public-api).

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_public_api_enabled` | boolean | `0` | Включить `assets/components/pagebuilder/api.php` |
| `pagebuilder_public_api_key` | text | пусто | API-ключ. Пусто: запросы без ключа (только для разработки) |
| `pagebuilder_public_api_cors_origins` | textarea | `*` | Разрешённые CORS origins для браузера |

## REST API v1 {#rest-api}

Транспорт Pro только для чтения. Подробнее: [REST API v1](rest-api). Токены выпускают во вкладке CMP **API tokens**, не правкой JSON вручную.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_rest_api_enabled` | boolean | `0` | Включить `assets/components/pagebuilder/api/v1.php`. Нужен PageBuilder Pro |
| `pagebuilder_rest_token_pepper` | text | пусто | Pepper для SHA-256 хеша токена. Пусто = `site_id` |
| `pagebuilder_rest_tokens` | textarea | `[]` | JSON токенов без секретов (`prefix` и `hash`) |
| `pagebuilder_rest_throttle_per_minute` | number | `120` | Лимит запросов на prefix токена. `0` выключает лимит |

## Связь со сниппетом {#связь-со-сниппетом}

| Настройка | Параметр сниппета | Поведение |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `load_css` | Параметр переопределяет системную настройку |
| — | `wrap_page` | Обёртка `<div class="pb-page">` (по умолчанию как у `load_css`) |

Параметры `load_css` и `wrap_page` задаются только на вызове сниппета, в properties сниппета они не перечислены.
