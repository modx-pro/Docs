---
title: "colorpalette"
description: "Single value from preset options with color swatches"
---

# Field colorpalette

Layer: **Free**.

<!-- ![colorpalette](/components/pagebuilder/screenshots/fields/colorpalette.png) -->

## Why this type

- Editors pick brand palette, not any hex
- Static options like select with swatch UI
- Fewer random colors in production

## When to use

- Theme token primary / secondary / muted
- Section background from design system
- Limited set for white-label sites

## Tips

- Arbitrary hex needs [color](color)
- Stored value is option key, not raw CSS

## Similar types

- [color](color) for free picker
- [select](select) without visual swatches

## Schema

```json
{
  "name": "theme",
  "type": "colorpalette",
  "label": "Цвет",
  "swatches": [
    "#111827",
    "#c2410c"
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

HEX-строка.

## Output in section.data в section.data

Ключ `theme` в `section.data` (HEX):

```json
{
  "theme": "#3b82f6"
}
```

## Chunk example в chunk

```html
<span style="color: {$theme|escape}">…</span>
```

## Notes

В CMP: `optionsText` (как у select); при сохранении пишутся `options` и `swatches`.

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

- Дополнительно: `swatches` или `options` со цветами.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
