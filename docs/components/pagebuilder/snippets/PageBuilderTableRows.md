---
title: PageBuilderTableRows
description: Вывод строк табличных данных ресурса PageBuilder
---

# Сниппет PageBuilderTableRows

Возвращает строки **табличных данных** ресурса (вкладка **Таблицы** в менеджере). Формат: JSON или Fenom-chunk.

## Назначение

Нужен, когда таблицу выводят своей разметкой: в шаблоне, виджете или отдельном chunk. Секция Pro [data_table](../sections/data_table) использует встроенный chunk `pagebuilder_data_table`.

## Где вызывать

Шаблон, chunk, другая секция через snippet-поле. Таблица создана на том же или указанном `resource_id`.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resource_id` | `0` | ID ресурса. Переданный `0` не подставляет текущую страницу: ответ пустой (`[]` или пустая строка). Для текущей страницы передайте её id |
| `table_key` | пусто | Ключ таблицы на ресурсе |
| `table_id` | `0` | ID таблицы в БД вместо `table_key` |
| `limit` | `20` | Максимум строк (1–100) |
| `return` | `json` | `json` или `chunk` |
| `tpl` | `pagebuilder_table_rows` | Chunk при `return=chunk` |

### Фильтрация и пагинация

Все ключи работают в сниппете. Менеджерский процессор `mgr/datatable/rows/list` принимает только `page`, `limit`, `search` и `filters`: контекстные и UTM-фильтры в него не передаются.

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

Событие `pbOnBeforeTableGetList` получает `table`, `query` и `criteria`. `criteria` передаётся ссылкой, но `DataTableRowQuery::fetch()` строит свой критерий из `query` и массив `criteria` не читает. Запись в эти аргументы из плагина строки не фильтрует. `pbOnTableRowSave` передаёт `data` ссылкой, и это значение дальше записывается в строку. Событие списка вызывается и из сниппета, и из `mgr/datatable/rows/list`.

## JSON

Ответ: JSON-массив объектов строк (поле `data` каждой записи). Таблица не найдена → `[]`.

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

## Chunk

В chunk доступны Fenom-переменные `rows` (массив `data` строк) и `table` (метаданные таблицы). В пакете есть chunk `pagebuilder_table_rows`.

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
