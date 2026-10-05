---
title: "datasource"
description: "Объект провайдера, фильтров и лимита. Capability datasources. Слой Pro."
---

# Поле datasource

Версия: **Pro**, capability `datasources`.

Объект запроса, не список строк. Провайдеры: `modx-resources`, `pagebuilder-tables`, `minishop3`. Строки появляются на рендере в секциях [dynamic_list](../sections/dynamic_list) и [filterable_grid](../sections/filterable_grid).

Операторы фильтра: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. Ключи `sql`, `php`, `snippet` и `class` отклоняются. `limit` не больше 100. Превью в менеджере: `mgr/datasource/query`.

## Настройка

```json
{
  "name": "source",
  "type": "datasource",
  "label": "Источник"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "source": {
    "provider": "modx-resources",
    "table": "",
    "filters": [{ "field": "parent", "op": "eq", "value": "5" }],
    "sort": [{ "field": "menuindex", "direction": "asc" }],
    "search": "",
    "limit": 20
  }
}
```

Для `pagebuilder-tables` заполните `table` ключом таблицы.

## Похожие типы

- [resourcelist](resourcelist) для выбора ресурсов вручную
