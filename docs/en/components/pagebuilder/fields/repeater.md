---
title: "repeater"
description: "Array of objects with nested fields and service _rowId"
---

# Field repeater

Layer: **Free**.

<!-- ![repeater](/components/pagebuilder/screenshots/fields/repeater.png) -->

## Why this type

- Any nested field schema per row
- _rowId stable for Vue keys and anchors
- Free way to build cards, FAQ, slides lists

## When to use

- Card items, FAQ questions, slides
- Any "add row" list in a section
- Nested image + text without custom JSON type

## Tips

- In chunk `{foreach}` and `{$item._rowId|escape}` when needed
- Single object without list is [jsongrid](jsongrid) (Pro)

## Similar types

- [jsongrid](jsongrid) for one object row (Pro)
- [table](table) for column grid (Pro)

## Schema

```json
{
  "name": "items",
  "type": "repeater",
  "label": "Элементы",
  "fields": [
    {
      "name": "title",
      "type": "text",
      "label": "Заголовок"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив объектов; у строк есть `_rowId`.

## Output in section.data в section.data

Ключ `items` в `section.data` — массив строк; у каждой строки стабильный `_rowId`:

```json
{
  "items": [
    {
      "_rowId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Пункт 1"
    },
    {
      "_rowId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Пункт 2"
    }
  ]
}
```

## Chunk example в chunk

```fenom
{foreach $items as $item}
  <article id="{$item._rowId|escape}">
    <h3>{$item.title|escape}</h3>
  </article>
{/foreach}
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

- Дополнительно: `fields[]` — схема строк; в data у каждой строки `_rowId`.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
