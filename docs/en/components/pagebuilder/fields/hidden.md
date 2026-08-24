---
title: "hidden"
description: "String in section.data with no visible inspector field"
---

# Field hidden

Layer: **Free**.

<!-- ![hidden](/components/pagebuilder/screenshots/fields/hidden.png) -->

## Why this type

- Value saves and reaches the chunk
- No UI space for editors
- default set in JSON or CMP

## When to use

- Service token, preset key, analytics id
- Section constant changed by dev only
- Default duplicated for front-end forms

## Tips

- Editors need to see value use [readonly](readonly)
- `active: false` hides any type, hidden is for data-only semantics

## Similar types

- [readonly](readonly) for visible non-editable
- [text](text) with active false for CMP toggle

## Schema

```json
{
  "name": "token",
  "type": "hidden",
  "label": "Token",
  "tab": "Контент",
  "width": 100
}
```

## Value

Строка в `section.data`, в форме не показывается визуально.

## Output in section.data в section.data

Ключ `token` в `section.data`:

```json
{
  "token": "sku-001"
}
```

## Chunk example в chunk

```html
<input type="hidden" name="token" value="{$token|escape}">
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

- Поле скрыто в UI; `active: false` тоже скрывает любое поле.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
