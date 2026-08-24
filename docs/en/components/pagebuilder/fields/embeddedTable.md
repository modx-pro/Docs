---
title: "embeddedTable"
description: "table_key limit filters config without table rows in data"
---

# Field embeddedTable

Layer: **Pro**.

<!-- ![embeddedTable](/components/pagebuilder/screenshots/fields/embeddedTable.png) -->

## Why this type

- Rows load via PageBuilderTableRows snippet on front
- filters limit use_context utm in data object
- Fits catalog-scale data

## When to use

- Products grid from Collections table
- Any registered table_key
- When rows are too many for field table

## Tips

- Chunk `[[!PageBuilderTableRows? &table_key=`...`]]`
- Static 5–10 rows stay in [table](table)

## Similar types

- [table](table) for inline section rows
- [combo](combo) when you only need one id from table

## Schema

```json
{
  "name": "table",
  "type": "embeddedTable",
  "label": "Таблица",
  "table_key": "products",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ table_key, limit, filters, … }`.

## Output in section.data в section.data

Ключ `table` в `section.data` — конфиг выборки (строки таблицы не входят в data):

```json
{
  "table": {
    "table_key": "products",
    "limit": 10,
    "filters": {
      "category": "phones"
    },
    "use_context": true,
    "context_column": "context_key",
    "use_utm": false,
    "utm": {}
  }
}
```

- Строки на фронте: сниппет `PageBuilderTableRows` с тем же `table_key`.

## Chunk example в chunk

```html
[[!PageBuilderTableRows? &table_key=`products` &limit=`10`]]
```

## Common properties

Для полей с `name`, которые сохраняются в `section.data`:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `table_key`, `limit`, `filters`, `use_context`, `utm`.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
