---
title: "date"
description: "ISO date in section.data without time of day"
---

# Field date

Layer: **Free**.

<!-- ![date](/components/pagebuilder/screenshots/fields/date.png) -->

## Why this type

- PrimeVue calendar, not manual text entry
- Separate from time and datetime
- Predictable format for sorting and Fenom

## When to use

- Event date, promo deadline, publish day
- "Valid until" on a promo section
- Calendar-based content filter

## Tips

- Hours need [time](time) or [datetime](datetime)
- Do not mix timezone logic in the chunk without a clear contract

## Similar types

- [datetime](datetime) for date and time
- [time](time) for time only

## Schema

```json
{
  "name": "starts_at",
  "type": "date",
  "label": "Дата",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка `YYYY-MM-DD`.

## Output in section.data в section.data

Ключ `starts_at` в `section.data` (`YYYY-MM-DD`):

```json
{
  "starts_at": "2026-08-24"
}
```

## Chunk example в chunk

```html
<time datetime="{$starts_at|escape}">{$starts_at|escape}</time>
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
