---
title: "table"
description: "Row array by columns with typed cells in section.data"
---

# Field table

Layer: **Pro**.

<!-- ![table](/components/pagebuilder/screenshots/fields/table.png) -->

## Why this type

- Columns text number image color date tag currency url
- All rows stored in section data
- Editors edit grid in inspector

## When to use

- Product spec table
- Comparison matrix with images in cells
- Spec rows when count is small and lives in section

## Tips

- columns sets name label type per column
- Large DB-backed sets use [embeddedTable](embeddedTable)

## Similar types

- [keyvalue](keyvalue) for simple key value pairs
- [embeddedTable](embeddedTable) for table_key and runtime rows

## Schema

```json
{
  "name": "specs",
  "type": "table",
  "label": "Характеристики",
  "columns": [
    {
      "name": "key",
      "label": "Ключ",
      "type": "text"
    },
    {
      "name": "value",
      "label": "Значение",
      "type": "text"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив строк-объектов по `columns[].name`.

## Output in section.data в section.data

Ключ `specs` в `section.data` — массив строк по `columns[].name`:

```json
{
  "specs": [
    {
      "key": "Вес",
      "value": "1.2 кг"
    },
    {
      "key": "Цвет",
      "value": "#111827"
    },
    {
      "key": "Фото",
      "value": {
        "url": "assets/images/hero.jpg",
        "id": 12,
        "path": "assets/images/",
        "filename": "hero.jpg",
        "extension": "jpg",
        "name": "hero",
        "title": "hero.jpg",
        "width": 1920,
        "height": 1080,
        "size": 245760,
        "type": "image"
      }
    }
  ]
}
```

- Ячейки с `type: image` хранят media-объект, как у поля `image`.

## Chunk example в chunk

```fenom
{foreach $specs as $row}
  <div class="spec">
    <span class="spec__key">{$row.key|escape}</span>
    <span class="spec__value">{$row.value|escape}</span>
  </div>
{/foreach}
```

## Notes

Колонки в CMP: `columnsText` (`name|Подпись|type`). Типы ячеек: text, number, image, color, date, tag, currency, url.

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

- Дополнительно: `columns[]` с `name`, `label`, `type` (text, number, image, color, …).

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
