---
title: "currency"
description: "Amount number with currency symbol from currency setting"
---

# Field currency

Layer: **Pro**.

<!-- ![currency](/components/pagebuilder/screenshots/fields/currency.png) -->

## Why this type

- Inspector formatter, not plain number
- Pro responsive like number and text
- Separates money from counters and percents

## When to use

- Price in custom section without MS3
- Old and new price in promo
- Donation amount field

## Tips

- currency key in schema sets ISO or symbol config
- Discount percent is [number](number), not currency

## Similar types

- [number](number) for non-money numeric
- [imask](imask) for formatted string without decimal type

## Schema

```json
{
  "name": "price",
  "type": "currency",
  "label": "Цена",
  "currency": "RUB",
  "min": 0,
  "max": 999999,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Число или `null`.

## Output in section.data в section.data

Ключ `price` в `section.data` (число или `null`):

```json
{
  "price": 1990.5
}
```

## Chunk example в chunk

```fenom
{if $price !== null}<span class="price">{$price} ₽</span>{/if}
```

## Notes

Валюта: `currency`. Лимиты как у `number`. Pro: `responsive`.

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
- [Pro в менеджере](../integration)
