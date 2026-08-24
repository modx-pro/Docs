---
title: "combo"
description: "Single value from xPDO optionsSource via Select with search"
---

# Field combo

Layer: **Pro**.

<!-- ![combo](/components/pagebuilder/screenshots/fields/combo.png) -->

## Why this type

- Database list: modResource, modTemplate, and other whitelist classes
- Loaded via `mgr/field/options` and `pbOnFieldValues`
- Dropdown search without a relation modal

## When to use

- Pick template, chunk, or TV by xPDO class
- Store a related record id when the chunk does not need pagetitle
- Dynamic enum from MODX tables

## Tips

- Resource with pagetitle in data → [relation](relation)
- Multiple values → [multicombo](multicombo)

## Similar types

- [select](select) for a static `options` list
- [tablecombo](tablecombo) for a custom table row id

## Schema

```json
{
  "name": "related",
  "type": "combo",
  "label": "Связанная",
  "optionsSource": {
    "class": "modResource"
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Выбранное значение (строка или id).

## Output in section.data в section.data

Ключ `related` в `section.data` — строка или id из `optionsSource`:

```json
{
  "related": 5
}
```

## Chunk example в chunk

```fenom
{$related|escape}
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
