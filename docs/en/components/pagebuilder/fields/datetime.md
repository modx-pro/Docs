---
title: "datetime"
description: "Date and time in one section.data value"
---

# Field datetime

Layer: **Free**.

<!-- ![datetime](/components/pagebuilder/screenshots/fields/datetime.png) -->

## Why this type

- One picker instead of date + time pair
- ISO-like string for timed events
- Fewer sync mistakes across two fields

## When to use

- Promo start with exact hour
- Scheduled news publish
- Countdown or timer on a landing

## Tips

- Day-only needs [date](date)
- Format for display in the chunk or a snippet

## Similar types

- [date](date) when time is irrelevant
- [time](time) when date lives elsewhere

## Schema

```json
{
  "name": "starts_at",
  "type": "datetime",
  "label": "Дата и время",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка datetime-local.

## Output in section.data в section.data

Ключ `starts_at` в `section.data` (строка `datetime-local`):

```json
{
  "starts_at": "2026-08-24T14:30"
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
