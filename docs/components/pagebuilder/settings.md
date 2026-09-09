---
title: Системные настройки
description: "Ключи namespace pagebuilder: пути, превью, вкладки ресурса и Collections"
---
# Системные настройки

Namespace MODX: **pagebuilder**. Ключ в базе: `pagebuilder_<name>`.

В манифесте дополнения **21 ключ**. При установке или обновлении Phinx/resolver добавляет отсутствующие. Уже заданные значения не перезаписывает (`update.settings = false`). Таблица версий миграций: `{table_prefix}pb_migrations`.

Для dev без переустановки transport (CLI, не runtime сайта):

```bash
cd core/components/pagebuilder && composer install --no-dev
php scripts/migrate.php
```

Phinx и его `vendor/` нужны только установщику и `migrate.php`. На запросах сайта компонент их не подключает. Устаревший алиас: `php scripts/sync-system-settings.php` вызывает `migrate.php`.

## Пути и превью

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_core_path` | text | `{core_path}components/pagebuilder/` | Путь к PHP core компонента |
| `pagebuilder_assets_url` | text | `{assets_url}components/pagebuilder/` | URL connector, preview, статики |
| `pagebuilder_preview_secret` | text | из resolver / `site_uuid` | Секрет подписи токена превью черновика |
| `pagebuilder_load_frontend_css` | boolean | `1` | Подключать `pagebuilder-sections.css` при вызове сниппета `PageBuilder` |
| `pagebuilder_preview_include_template_css` | boolean | `1` | Подтягивать `<link rel="stylesheet">` шаблона ресурса в iframe превью |
| `pagebuilder_preview_css_urls` | textarea | пусто | Дополнительные CSS для превью (через запятую), плейсхолдеры `{assets_url}` и др. |

Пустой `pagebuilder_preview_secret` подставляет `site_uuid`. На production задайте отдельный секрет, если превью в менеджере не должно опираться на предсказуемый UUID.

Порядок CSS в iframe превью (`preview.php`):

1. Stylesheet из шаблона ресурса, если `pagebuilder_preview_include_template_css = 1`
2. URL из `pagebuilder_preview_css_urls` (через запятую или с новой строки)
3. `pagebuilder-sections.css` и `pagebuilder-preview.css`

Если тема подключает CSS только через Fenom или `@import` без `<link>`, добавьте файлы явно в `preview_css_urls`. Плейсхолдеры: `{assets_url}`, `{base_url}`, `{site_url}`.

## Вкладки на форме ресурса

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_resource_tab_enabled` | boolean | `0` | Вкладка «Секции» на форме ресурса |
| `pagebuilder_resource_tab_parents` | text | пусто | ID родителей через запятую. Пусто при включённой вкладке = все ресурсы |
| `pagebuilder_resource_tab_index` | number | `-1` | Позиция вкладки «Секции»: `0` первая, `1` вторая, `-1` последняя |
| `pagebuilder_resource_tables_tab_enabled` | boolean | `0` | Вкладка «Таблицы» (табличные данные ресурса) |
| `pagebuilder_resource_tables_tab_index` | number | `-1` | Позиция вкладки «Таблицы» |

## Collections (панель управления) {#collections-cmp}

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_collections_enabled` | boolean | `0` | Динамический набор вкладок из Collections в панели управления |
| `pagebuilder_collections_modx_bridge_enabled` | boolean | `0` | Тип вкладки `modx_collections` |

Включайте только если используете Collections и настроили конфигурацию вкладок в панели управления PageBuilder. Подробнее: [Панель управления → Collections](cmp#collections).

## Табличные данные ресурса

Вкладка «Таблицы» на ресурсе (`pagebuilder_resource_tables_tab_enabled`) или тип вкладки `table` в Collections.

| Processor | Назначение |
| --- | --- |
| `mgr/datatable/list` | Таблицы ресурса |
| `mgr/datatable/rows/list` | Строки: `search`, `page`, `limit`, `filters` |
| `mgr/datatable/rows/save` / `remove` | CRUD строк |

Фильтры JSON по колонкам: `{ "price": { "op": "gte", "value": "10" } }`. Операторы: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`.

На сайте: сниппет `PageBuilderTableRows`, секция [data_table](sections/data_table). Подробнее: [Разработчик](developer#resource-data-tables).

## Редактор

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_fake_enabled` | boolean | `0` | Кнопка **Fake** в инспекторе секции: заполняет поля детерминированными демо-данными (`mgr/section/fake`) |
| `pagebuilder_inspector_visibility_enabled` | boolean | `0` | Кнопка **Видимость** в инспекторе: диалог условий, контекстов, UTM и копии для контекста. По умолчанию выкл., редактор видит только поля контента |

## Responsive breakpoints {#responsive}

Пороги экранов для полей с `responsive: true` и ширины iframe превью в менеджере.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
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

## Public API {#public-api}

Read-only JSON для headless-фронта. Подробнее: [Public API](public-api).

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_public_api_enabled` | boolean | `0` | Включить `assets/components/pagebuilder/api.php` |
| `pagebuilder_public_api_key` | text | пусто | API-ключ. Пусто: запросы без ключа (только для dev) |
| `pagebuilder_public_api_cors_origins` | textarea | `*` | Разрешённые CORS origins для браузера |

## Связь со сниппетом {#связь-со-сниппетом}

| Настройка | Параметр сниппета | Поведение |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `load_css` | Параметр переопределяет системную настройку |
| — | `wrap_page` | Обёртка `<div class="pb-page">` (по умолчанию как у `load_css`) |

Параметры `load_css` и `wrap_page` задаются только на вызове сниппета, в properties сниппета они не перечислены.
