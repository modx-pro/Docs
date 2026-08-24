---
title: "tablecombo"
description: "Single id from a custom table row via optionsSource table"
---

# Field tablecombo

Layer: **Pro**.

<!-- ![tablecombo](/components/pagebuilder/screenshots/fields/tablecombo.png) -->

## Why this type

- Select with search over embedded/custom table rows
- combo alternative when the source is not an xPDO class
- Requires Pro and `advanced-fields` capability

## When to use

- Pick a brand or vendor row from an MS table
- id from a Collections column
- Dynamic pick when modResource is wrong

## Tips

- modResource picker → [relation](relation) or [combo](combo)
- Multiple ids → [tablemulticombo](tablemulticombo)

## Similar types

- [combo](combo) for a standard xPDO class
- [embeddedTable](embeddedTable) to render many rows by `table_key`

## Schema

```json
{
  "name": "template",
  "type": "tablecombo",
  "label": "Шаблон",
  "optionsSource": {
    "class": "modTemplate",
    "valueField": "id",
    "labelField": "templatename"
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Значение `valueField`.

## Output in section.data в section.data

Ключ `template` в `section.data` — значение `valueField` из `optionsSource`:

```json
{
  "template": 3
}
```

## Chunk example в chunk

```fenom
{if $template}{$template}{/if}
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
