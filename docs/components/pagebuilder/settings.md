---
title: Системные настройки
description: Ключи namespace pagebuilder — пути, превью, вкладки ресурса и Collections
---
# Системные настройки

Namespace MODX: **pagebuilder**. Ключ в базе: `pagebuilder_<name>`.

<!-- ![System Settings → pagebuilder](/components/pagebuilder/screenshots/mgr-system-settings.png) -->

При установке или апгрейде transport добавляет отсутствующие ключи. Уже заданные значения resolver не перезаписывает.

## Пути и превью

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_core_path` | text | `{core_path}components/pagebuilder/` | Путь к PHP core компонента |
| `pagebuilder_assets_url` | text | `{assets_url}components/pagebuilder/` | URL connector, preview, статики |
| `pagebuilder_preview_secret` | text | из resolver / `site_uuid` | Секрет подписи токена превью черновика |
| `pagebuilder_load_frontend_css` | boolean | `1` | Подключать `pagebuilder-sections.css` при вызове сниппета `PageBuilder` |
| `pagebuilder_preview_include_template_css` | boolean | `1` | Подтягивать `<link rel="stylesheet">` шаблона ресурса в iframe превью |
| `pagebuilder_preview_css_urls` | textarea | пусто | Дополнительные CSS для превью (через запятую), плейсхолдеры `{assets_url}` и др. |

## Вкладки на форме ресурса

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_resource_tab_enabled` | boolean | `0` | Вкладка «Секции» на форме ресурса |
| `pagebuilder_resource_tab_parents` | text | пусто | ID родителей через запятую. Пусто при включённой вкладке = все ресурсы |
| `pagebuilder_resource_tab_index` | number | `-1` | Позиция вкладки «Секции»: `0` первая, `1` вторая, `-1` последняя |
| `pagebuilder_resource_tables_tab_enabled` | boolean | `0` | Вкладка «Таблицы» (resource data tables) |
| `pagebuilder_resource_tables_tab_index` | number | `-1` | Позиция вкладки «Таблицы» |

## Collections (CMP)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `pagebuilder_collections_enabled` | boolean | `0` | Dynamic multi-tab из CMP Collections |
| `pagebuilder_collections_modx_bridge_enabled` | boolean | `0` | Тип вкладки `modx_collections` |

Включайте только если используете Collections и настроили конфигурацию вкладок в CMP PageBuilder.

## Связь со сниппетом

| Настройка | Параметр сниппета | Поведение |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `load_css` | Параметр переопределяет системную настройку |
| — | `wrap_page` | Обёртка `<div class="pb-page">` (по умолчанию как у `load_css`) |
| — | `qa_css` | Дополнительный QA-CSS для отладки вёрстки |

Параметры `load_css`, `wrap_page`, `qa_css` задаются только на вызове сниппета, в transport properties они не перечислены.
