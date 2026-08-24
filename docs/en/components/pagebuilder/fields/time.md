---
title: "time"
description: "Time of day in section.data without calendar date"
---

# Field time

Layer: **Free**.

<!-- ![time](/components/pagebuilder/screenshots/fields/time.png) -->

## Why this type

- Time picker, not a free string
- Pairs with date in separate fields
- Good for schedules and opening hours

## When to use

- Webinar start time with date elsewhere
- "Open until 6pm" in contact
- Delivery slot without full datetime

## Tips

- Single date+time value use [datetime](datetime)
- Site timezone is a MODX concern, not the field

## Similar types

- [datetime](datetime) for full timestamp
- [date](date) for calendar day only

## Schema

```json
{
  "name": "starts_at",
  "type": "time",
  "label": "Время",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка `HH:MM`.

## Output in section.data в section.data

Ключ `starts_at` в `section.data` (`HH:MM`):

```json
{
  "starts_at": "14:30"
}
```

## Chunk example в chunk

```html
<span class="time">{$starts_at|escape}</span>
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
