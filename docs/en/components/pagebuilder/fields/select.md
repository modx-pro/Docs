---
title: "select"
description: "Single value from a static options array"
---

# Field select

Layer: **Free**.

<!-- ![select](/components/pagebuilder/screenshots/fields/select.png) -->

## Why this type

- List lives in section JSON, no xPDO query
- Compact than radio for long lists
- Stored value is option value, not label

## When to use

- Size, theme, alignment, layout preset
- Five to twenty fixed choices without search
- Enum-like section settings

## Tips

- Database-driven lists need [combo](combo) (Pro)
- Two to four visible choices fit [radio](radio) better

## Similar types

- [radio](radio) for a short on-screen list
- [multiselect](multiselect) for multiple static picks (Pro)

## Schema

```json
{
  "name": "size",
  "type": "select",
  "label": "Размер",
  "options": [
    {
      "label": "S",
      "value": "sm"
    },
    {
      "label": "L",
      "value": "lg"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка: `value` выбранной опции.

## Output in section.data в section.data

Ключ `size` в `section.data` — строка `value` выбранной опции:

```json
{
  "size": "lg"
}
```

## Chunk example в chunk

```fenom
{switch $size}
  {case 'sm'}<div class="block block--sm">{/case}
  {case 'lg'}<div class="block block--lg">{/case}
  {default}<div class="block">{/default}
{/switch}
```

## Notes

Динамический список: `optionsSource` → processor `mgr/field/options`.

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

- Дополнительно: `options` или `optionsSource`.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
