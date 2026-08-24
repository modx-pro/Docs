---
title: "tablemulticombo"
description: "Id array from a custom table via MultiSelect"
---

# Field tablemulticombo

Layer: **Pro**.

<!-- ![tablemulticombo](/components/pagebuilder/screenshots/fields/tablemulticombo.png) -->

## Why this type

- Multiple row ids from the same table source
- Pair to [tablecombo](tablecombo)
- Only ids in data, no inline rows

## When to use

- Multi-brand filter ids
- Several category row keys from a table
- Curated id list without a relation modal

## Tips

- Objects with pagetitle → [multirelation](multirelation)
- Static list → [multiselect](multiselect)

## Similar types

- [tablecombo](tablecombo) for a single table id
- [multicombo](multicombo) for an xPDO class list

## Schema

```json
{
  "name": "templates",
  "type": "tablemulticombo",
  "label": "Шаблоны",
  "optionsSource": {
    "class": "modTemplate"
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив id.

## Output in section.data в section.data

Ключ `templates` в `section.data` — массив значений:

```json
{
  "templates": [
    "admin",
    "editor"
  ]
}
```

## Chunk example в chunk

```fenom
{foreach $templates as $id}
  <span>{$id}</span>
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

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
