---
title: "checkbox"
description: "Single boolean flag true or false in section.data"
---

# Field checkbox

Layer: **Free**.

<!-- ![checkbox](/components/pagebuilder/screenshots/fields/checkbox.png) -->

## Why this type

- Explicit checkbox for one option
- Boolean value, not string "1"/"0"
- Pairs with showWhen for conditional fields

## When to use

- "Show button", "Open in new tab"
- Enable block or overlay flag
- showWhen trigger for dependent fields

## Tips

- Multiple independent flags use [checkboxgroup](checkboxgroup)
- Visible on/off switch fits [toggle](toggle) better

## Similar types

- [toggle](toggle) for switch UI
- [yesno](yesno) for classic MODX yes/no

## Schema

```json
{
  "name": "featured",
  "type": "checkbox",
  "label": "Избранное",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Булево.

## Output in section.data в section.data

Ключ `featured` в `section.data`:

```json
{
  "featured": true
}
```

## Chunk example в chunk

```fenom
{if $featured}<span class="badge">Избранное</span>{/if}
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
