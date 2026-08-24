---
title: "imask"
description: "String with IMask input pattern in inspector"
---

# Field imask

Layer: **Pro**.

<!-- ![imask](/components/pagebuilder/screenshots/fields/imask.png) -->

## Why this type

- Phone, tax id, card pattern without validate-only
- mask or preset in schema
- Pro advanced-fields

## When to use

- Phone in contact_form fields
- SKU or serial with fixed format
- Promo code pattern

## Tips

- Plain numeric use [number](number)
- Value is string with mask literals per preset

## Similar types

- [text](text) without format constraint
- [url](url) for links, not phone mask

## Schema

```json
{
  "name": "phone",
  "type": "imask",
  "label": "Телефон",
  "mask": "+7 (000) 000-00-00",
  "maskOptions": {
    "lazy": false
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка по маске.

## Output in section.data в section.data

Ключ `phone` в `section.data` — строка по маске:

```json
{
  "phone": "+7 (495) 123-45-67"
}
```

## Chunk example в chunk

```html
<a href="tel:{$phone|escape}">{$phone|escape}</a>
```

## Notes

Короткая маска: `mask`. Полный конфиг IMask: `maskOptions` (object или JSON-строка).

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

- Дополнительно: `mask` или `maskOptions` (JSON IMask).

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
