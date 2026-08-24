---
title: "multicombo"
description: "Value array from xPDO optionsSource via MultiSelect with search"
---

# Field multicombo

Layer: **Pro**.

<!-- ![multicombo](/components/pagebuilder/screenshots/fields/multicombo.png) -->

## Why this type

- Multiple ids from one xPDO class
- Same `optionsSource` contract as combo
- Scalar ids, not pagetitle objects like relation

## When to use

- Several template or category ids
- Multiple foreign keys in a custom section
- Tags from a DISTINCT SQL query

## Tips

- Resource objects with titles → [multirelation](multirelation)
- Fixed list → [multiselect](multiselect)

## Similar types

- [combo](combo) for a single xPDO value
- [tablemulticombo](tablemulticombo) for custom table ids

## Schema

```json
{
  "name": "ids",
  "type": "multicombo",
  "label": "ID",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив значений.

## Output in section.data в section.data

Ключ `ids` в `section.data` — массив значений:

```json
{
  "ids": [
    "admin",
    "editor"
  ]
}
```

## Chunk example в chunk

```fenom
{foreach $ids as $id}
  <span>{$id|escape}</span>
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
