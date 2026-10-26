---
title: Системные настройки
description: Ключи msbulkeditor_*, права доступа, Scheduler и рекомендации для рабочего сервера
---

# Системные настройки

Namespace **`msbulkeditor`**, ключи в БД: `msbulkeditor_*`.

## Основные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msbulkeditor_chunk_size` | number | `50` | Товаров за пачку применения |
| `msbulkeditor_expert_limit` | number | `5000` | Максимум товаров в операции «все по фильтру» |
| `msbulkeditor_preview_detail_limit` | number | `100` | Строк в детальном предпросмотре |
| `msbulkeditor_history_retention_days` | number | `90` | Срок хранения записей истории (дней) |
| `msbulkeditor_enable_save_setting_user` | boolean | `Да` | Сохранять колонки и экспертный режим в `msbe_user_states` |
| `msbulkeditor_expert_mode` | boolean | `Нет` | Разрешить экспертный режим в интерфейсе |
| `msbulkeditor_import_max_rows` | number | `10000` | Максимум строк CSV/XLSX за загрузку |

## Scheduler

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msbulkeditor_scheduler_enabled` | boolean | `Нет` в transport | Очистка истории через Scheduler. При установленном Scheduler установка и обновление пакета ставят `Да` |
| `msbulkeditor_cleanup_task_stub` | textarea | JSON | Служебный ключ: встроенная очистка без Scheduler. Не для ручной правки |

Задача **`msbulkeditor / operation_cleanup`** удаляет операции старше `history_retention_days`.

При установке или обновлении msBulkEditor со Scheduler пакет ставит `msbulkeditor_scheduler_enabled = Да` и отключает заглушку. Следующее обновление снова включит настройку, даже если вы её выключили. Задаче нужен cron: `php /path/to/assets/components/scheduler/run.php` (обычно раз в сутки).

Без Scheduler в transport остаётся `Нет`. Плагин `msbulkeditor_bootstrap` на `OnManagerPageInit` чистит историю не чаще раза в сутки, пока в `msbulkeditor_cleanup_task_stub` значение `enabled: true`.

## Права доступа

Права создаются при установке. Назначьте их политике менеджеров магазина.

| Право | Назначение |
| --- | --- |
| `msbulkeditor_view` | Сетка, предпросмотр, история (чтение), чтение и сохранение состояния интерфейса |
| `msbulkeditor_edit` | Применение массовых операций |
| `msbulkeditor_rollback` | Откат завершённых операций |
| `msbulkeditor_presets` | Создание / изменение / удаление пресетов |
| `msbulkeditor_import_export` | Импорт и экспорт файлов |

Доступ к странице компонента есть и при глобальном **`view`** (только просмотр).

### Маршрут API → право

| Группа | Маршруты | Право |
| --- | --- | --- |
| Чтение | `health/ping`, `products/list`, `products/preview`, `products/progress`, `history/list`, `history/items`, `presets/list`, `ui/state/get`, `ui/state/save`, `fields/catalog`, `filters/references`, `bindings/check` | `view` |
| Запись | `products/apply`, `bindings/apply` | `edit` |
| Откат | `products/rollback` | `rollback` |
| Пресеты | `presets/save`, `presets/delete` | `presets` |
| Файлы | `export/run`, `import/run`, `import/parse` | `import_export` |

Вкладки **Пресеты** и **Импорт и экспорт** скрыты без соответствующих прав. Прямой URL без права перенаправит на **Товары**.

## Рекомендации для рабочего сервера

- Каталог **> 5000** позиций: согласуйте `expert_limit` с памятью и лимитом времени PHP. Уменьшите `chunk_size`, если пачка не укладывается в лимит.
- **`enable_save_setting_user = Да`**: свои колонки у каждого менеджера. **`Нет`**: сервер вид не хранит, в браузере копия остаётся в `localStorage`.
- **`expert_mode = Нет`**: только явный выбор строк, меньше риск массовой ошибки.

## Пути после установки

| Путь | Содержимое |
| --- | --- |
| `core/components/msbulkeditor/` | PHP, processors, lexicon |
| `assets/components/msbulkeditor/` | connector, JS/CSS бандл |

Connector: `assets/components/msbulkeditor/connector.php`.

После обновления пакета очистите кэш MODX и сделайте жёсткое обновление страницы панели в браузере (Ctrl/Cmd + Shift + R).

## Связанные разделы

- [События MODX](events) — плагины на применение и экспорт
- [FAQ](faq) — типичные ошибки прав и лимитов
