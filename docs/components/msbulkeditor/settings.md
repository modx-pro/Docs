---
title: Системные настройки
description: Ключи msbulkeditor_*, права доступа, Scheduler и рекомендации для production
---

# Системные настройки

Namespace: **`msbulkeditor`**. Ключи в БД: `msbulkeditor_*`.

## Основные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msbulkeditor_chunk_size` | number | `50` | Товаров за один проход apply / batch |
| `msbulkeditor_expert_limit` | number | `5000` | Максимум товаров в операции «все по фильтру» |
| `msbulkeditor_preview_detail_limit` | number | `100` | Строк в детальном preview |
| `msbulkeditor_history_retention_days` | number | `90` | Срок хранения записей истории (дней) |
| `msbulkeditor_enable_save_setting_user` | boolean | `Да` | Сохранять колонки и экспертный режим в `modUserSetting` |
| `msbulkeditor_expert_mode` | boolean | `Нет` | Разрешить экспертный режим в UI |
| `msbulkeditor_import_max_rows` | number | `10000` | Максимум строк CSV/XLSX за upload |

## Scheduler

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msbulkeditor_scheduler_enabled` | boolean | `Нет` | Очистка истории через задачу Scheduler |

Задача **`msbulkeditor / operation_cleanup`** удаляет операции старше `history_retention_days`.

1. Установите [Scheduler](/components/scheduler/).
2. Включите `msbulkeditor_scheduler_enabled = Да`.
3. Настройте cron на `php /path/to/assets/components/scheduler/run.php` (обычно раз в сутки).

Без Scheduler таблицы `msbe_operations` / `msbe_operation_items` растут, пока не настроите задачу или ручную очистку.

## Права доступа

Права создаются при установке. Назначайте их политике менеджеров магазина.

| Право | Назначение |
| --- | --- |
| `msbulkeditor_view` | Сетка, preview, история (чтение), состояние UI |
| `msbulkeditor_edit` | Apply массовых операций, сохранение UI |
| `msbulkeditor_rollback` | Откат завершённых операций |
| `msbulkeditor_presets` | Создание / изменение / удаление пресетов |
| `msbulkeditor_import_export` | Импорт и экспорт файлов |

Доступ к странице компонента возможен и при глобальном **`view`** (только просмотр).

### Маршрут API → право

| Группа | Routes | Право |
| --- | --- | --- |
| Чтение | `health/ping`, `products/list`, `products/preview`, `products/progress`, `history/list`, `history/items`, `presets/list`, `ui/state/get`, `fields/catalog`, `filters/references`, `bindings/check` | `view` |
| Запись | `products/apply`, `ui/state/save`, `bindings/apply` | `edit` |
| Откат | `products/rollback` | `rollback` |
| Пресеты | `presets/save`, `presets/delete` | `presets` |
| Файлы | `export/run`, `import/run`, `import/parse` | `import_export` |

Вкладки **Пресеты** и **Импорт и экспорт** скрыты без соответствующих прав. Прямой URL без права редиректит на **Товары**.

## Рекомендации для production

- Каталог **> 5000** позиций: держите `expert_limit` согласованным с RAM и timeout PHP. Уменьшите `chunk_size`, если чанк не укладывается в лимит времени.
- **`enable_save_setting_user = Да`** — у менеджеров свои колонки. **Нет** — единый вид таблицы.
- **`expert_mode = Нет`** — только явный выбор строк. Так меньше риск массовой ошибки.

## Пути после установки

| Путь | Содержимое |
| --- | --- |
| `core/components/msbulkeditor/` | PHP, processors, lexicon |
| `assets/components/msbulkeditor/` | connector, JS/CSS бандл |

Connector: `assets/components/msbulkeditor/connector.php`.

После обновления пакета очистите кэш MODX и сделайте жёсткий reload страницы панели (или `?_reload=1`).

## Связанные разделы

- [События MODX](events) — плагины на apply и экспорт
- [FAQ](faq) — типичные ошибки прав и лимитов
