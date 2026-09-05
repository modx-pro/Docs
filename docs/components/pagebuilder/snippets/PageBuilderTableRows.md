---
title: PageBuilderTableRows
description: Вывод строк табличных данных ресурса PageBuilder
---

# Сниппет PageBuilderTableRows

Возвращает строки **табличных данных** ресурса (вкладка **Таблицы** в менеджере). Формат: JSON или Fenom-chunk.

## Назначение

Кастомный вывод таблицы в шаблоне, widget или отдельный chunk. Секция Pro [data_table](../sections/data_table) использует встроенный chunk `pagebuilder_data_table`. Этот сниппет нужен, когда разметку пишете сами.

## Где вызывать

Шаблон, chunk, другая секция через snippet-поле. Таблица должна быть создана на том же или указанном `resource_id`.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resource_id` | `0` | ID ресурса. `0` = текущий |
| `table_key` | пусто | Ключ таблицы на ресурсе |
| `table_id` | `0` | ID таблицы в БД вместо `table_key` |
| `limit` | `20` | Максимум строк (1–100) |
| `return` | `json` | `json` или `chunk` |
| `tpl` | `pagebuilder_table_rows` | Chunk при `return=chunk` |

### Фильтрация и пагинация

Те же ключи, что у embed-таблиц и `mgr/datatable/rows/list`:

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

Операторы: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. Подробнее: [Системные настройки → Табличные данные](../settings#табличные-данные-ресурса).

## JSON

::: code-group

```modx
[[!PageBuilderTableRows?
  &table_key=`offices`
  &limit=`50`
]]
```

```fenom
{'!PageBuilderTableRows' | snippet : [
  'table_key' => 'offices',
  'limit' => 50
]}
```

:::

Ответ: JSON-массив объектов строк (поле `data` каждой записи). Таблица не найдена → `[]`.

## Chunk

::: code-group

```modx
[[!PageBuilderTableRows?
  &table_key=`offices`
  &return=`chunk`
  &tpl=`my_table_rows`
]]
```

```fenom
{'!PageBuilderTableRows' | snippet : [
  'table_key' => 'offices',
  'return' => 'chunk',
  'tpl' => 'my_table_rows'
]}
```

:::

В chunk доступны Fenom-переменные `rows` (массив `data` строк) и `table` (метаданные таблицы). В пакете есть chunk `pagebuilder_table_rows`.

## См. также

- [Секция data_table](../sections/data_table)
- [Разработчик → Таблицы данных](../developer#resource-data-tables)
