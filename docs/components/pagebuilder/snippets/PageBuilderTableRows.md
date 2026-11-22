---
title: PageBuilderTableRows
description: Вывод строк табличных данных ресурса PageBuilder
---

# Сниппет PageBuilderTableRows

Возвращает строки **табличных данных** ресурса (вкладка **Таблицы**). Формат: JSON или Fenom-чанк.

Разметку пишите в шаблоне, виджете или чанке. Секция Pro [data_table](../sections/data_table) использует чанк `pagebuilder_data_table` из пакета.

## Где вызывать

Шаблон, чанк или поле сниппета в другой секции. Таблица на текущем ресурсе или на `resource_id`.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resource_id` | `0` | ID ресурса. `0` = текущий ресурс |
| `table_key` | пусто | Ключ таблицы на ресурсе |
| `table_id` | `0` | ID таблицы в БД. Если больше нуля, имеет приоритет над `table_key` |
| `limit` | `20` | Максимум строк (1–100) |
| `return` | `json` | `json` или `chunk` |
| `tpl` | `pagebuilder_table_rows` | Чанк при `return=chunk` |

Пустой ответ (`[]` или пустая строка) остаётся, только если ресурс не определился.

Если `table_id` больше нуля, сниппет не проверяет, что таблица принадлежит `resource_id`. Ресурс всё равно должен определиться.

### Фильтрация и пагинация

Все ключи работают в сниппете. Процессор менеджера `mgr/datatable/rows/list` принимает только `page`, `limit`, `search` и `filters`. Контекстные и UTM-фильтры в него не передаются.

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `page` | `1` | Номер страницы |
| `search` | пусто | Поиск по строкам |
| `filters` | пусто | JSON фильтров по колонкам |
| `context_column` | пусто | Колонка для фильтра по контексту |
| `use_context` | `1` | Подставить `context_key` текущего ресурса в `context_column` |
| `context_key` | пусто | Явный контекст вместо текущего |
| `use_utm` | `0` | Добавить фильтры из UTM-сессии |
| `utm` / `utm_filters` | пусто | JSON UTM-фильтров для колонок |

Пример `filters`:

```json
{"price": {"op": "gte", "value": "100"}}
```

Операторы: `eq`, `contains`, `in`, `gt`, `lt`, `gte`, `lte`, `between`, `empty`, `not_empty`. Подробнее: [Системные настройки → Табличные данные](../settings#табличные-данные-ресурса).

Событие `pbOnBeforeTableGetList` получает `table`, `query` и `criteria` по ссылке:

- Выборка читает из `query` ключи `search`, `filters`, `page` и `limit`
- Пары из `criteria`, кроме `table_id`, попадают в условие выборки
- После плагина `table_id` записывается заново: сменить таблицу из плагина нельзя
- Событие списка вызывается из сниппета и из `mgr/datatable/rows/list`

`pbOnTableRowSave` передаёт `data` по ссылке. Это значение записывается в строку.

## JSON

Таблица не найдена → `[]`. Иначе массив записей: `id`, `table_id`, `position`, `data`, `editedon`, `editedby`. Ячейки лежат в `data`.

При `return=chunk` в чанк попадает только `data`. Любое значение `return`, кроме `json`, отрисовывает чанк.

::: code-group

```modx
[[!PageBuilderTableRows?
  &resource_id=`[[*id]]`
  &table_key=`offices`
  &limit=`50`
]]
```

```fenom
{'!PageBuilderTableRows' | snippet : [
  'resource_id' => $_modx->resource.id,
  'table_key' => 'offices',
  'limit' => 50
]}
```

:::

## Чанк

В чанке Fenom-переменные `rows` (массив `data` строк) и `table` (метаданные таблицы).

::: code-group

```modx
[[!PageBuilderTableRows?
  &resource_id=`[[*id]]`
  &table_key=`offices`
  &return=`chunk`
  &tpl=`my_table_rows`
]]
```

```fenom
{'!PageBuilderTableRows' | snippet : [
  'resource_id' => $_modx->resource.id,
  'table_key' => 'offices',
  'return' => 'chunk',
  'tpl' => 'my_table_rows'
]}
```

:::

## См. также

- [Секция data_table](../sections/data_table)
- [Разработчик → Таблицы данных](../developer#resource-data-tables)
