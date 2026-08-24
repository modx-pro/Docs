---
title: "readonly"
description: "Read-only string still shown in the inspector"
---

# Field readonly

Layer: **Free**.

<!-- ![readonly](/components/pagebuilder/screenshots/fields/readonly.png) -->

## Why this type

- Editors see value but cannot edit
- Same scalar in data as text
- Fits SKU, id, sync from external system

## When to use

- SKU or article from MS3 on product section
- Preview slug or id after save
- Hint that value is auto-filled

## Tips

- Fully hidden value use [hidden](hidden)
- Editable copy is [text](text)

## Similar types

- [hidden](hidden) with no UI
- [text](text) for normal input

## Schema

```json
{
  "name": "sku",
  "type": "readonly",
  "label": "SKU",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка только для чтения.

## Output in section.data в section.data

Ключ `sku` в `section.data`:

```json
{
  "sku": "sku-001"
}
```

## Chunk example в chunk

```html
<span class="sku">{$sku|escape}</span>
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
