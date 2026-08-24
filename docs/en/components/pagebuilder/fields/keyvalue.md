---
title: "keyvalue"
description: "Array of key value pairs without typed columns"
---

# Field keyvalue

Layer: **Pro**.

<!-- ![keyvalue](/components/pagebuilder/screenshots/fields/keyvalue.png) -->

## Why this type

- Simpler than table for single text value column
- keyLabel and valueLabel customize captions
- Free row count without column schema

## When to use

- Meta attributes, params, simple specs
- Custom props for chunk
- Name/value list without cell types

## Tips

- Typed cells or image in cell need [table](table)
- Single flat map sometimes beats repeater of two text fields

## Similar types

- [table](table) for typed grid
- [repeater](repeater) with two text fields (Free)

## Schema

```json
{
  "name": "meta",
  "type": "keyvalue",
  "label": "Мета",
  "keyLabel": "Параметр",
  "valueLabel": "Значение",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив `{ key, value }`.

## Output in section.data в section.data

Ключ `meta` в `section.data` — массив пар:

```json
{
  "meta": [
    {
      "key": "author",
      "value": "PageBuilder"
    },
    {
      "key": "version",
      "value": "1.0"
    }
  ]
}
```

## Chunk example в chunk

```fenom
{foreach $meta as $row}
  <div><strong>{$row.key|escape}:</strong> {$row.value|escape}</div>
{/foreach}
```

## Notes

Подписи колонок: `keyLabel`, `valueLabel` (или `key_label` / `value_label`).

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

- Дополнительно: `keyLabel`, `valueLabel` (или `key_label` / `value_label`).

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
