---
title: "radio"
description: "Single value from options shown as radio buttons"
---

# Field radio

Layer: **Free**.

<!-- ![radio](/components/pagebuilder/screenshots/fields/radio.png) -->

## Why this type

- All choices visible without opening a dropdown
- Same static options model as select
- Best for two to five exclusive values

## When to use

- Alignment left / center / right
- Background type image / color / video
- Small labeled choice sets

## Tips

- Long lists belong in [select](select)
- Simple on/off is faster with [yesno](yesno) or [toggle](toggle)

## Similar types

- [select](select) for long static lists
- [checkboxgroup](checkboxgroup) for multiple flags

## Schema

```json
{
  "name": "align",
  "type": "radio",
  "label": "Выравнивание",
  "options": [
    {
      "label": "Слева",
      "value": "left"
    },
    {
      "label": "По центру",
      "value": "center"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка выбранного `value`.

## Output in section.data в section.data

Ключ `align` в `section.data` — строка `value` выбранной опции:

```json
{
  "align": "lg"
}
```

## Chunk example в chunk

```html
<div class="align-{$align|escape}">
  …
</div>
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
