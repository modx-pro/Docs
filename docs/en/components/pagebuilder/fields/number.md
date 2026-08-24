---
title: "number"
description: "Numeric value in section.data for counters and limits"
---

# Field number

Layer: **Free**.

<!-- ![number](/components/pagebuilder/screenshots/fields/number.png) -->

## Why this type

- Number input in the inspector, not a digit string
- Pro: `responsive` across breakpoints
- Easy to sort and compute in the chunk

## When to use

- Item limit, discount percent, year
- Stat value next to a label field
- Order or weight when a select list is overkill

## Tips

- Money and currency format belong in [currency](currency) (Pro)
- Phone or SKU with mask use [imask](imask) (Pro)

## Similar types

- [currency](currency) for amounts with currency symbol
- [select](select) for a fixed set of numbers

## Schema

```json
{
  "name": "count",
  "type": "number",
  "label": "Количество",
  "min": 0,
  "max": 100,
  "allowDecimals": false,
  "default": 0,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Число или `null`.

## Output in section.data в section.data

Ключ `count` в `section.data` (число или `null`):

```json
{
  "count": 12
}
```

## Chunk example в chunk

```fenom
{if $count !== null}<span class="count">{$count}</span>{/if}
```

## Notes

Лимиты: `min`, `max`, `minValue`, `maxValue`, `allowDecimals`. Pro: `responsive`.

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

**Pro** (capability `responsive`): при `responsive: true` в `section.data` — ключи `desktop`, `tablet`, `mobile` вместо скаляра.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
