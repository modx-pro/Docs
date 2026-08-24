---
title: "color"
description: "Hex or rgba color string from a color picker"
---

# Field color

Layer: **Free**.

<!-- ![color](/components/pagebuilder/screenshots/fields/color.png) -->

## Why this type

- Picker instead of typing into text
- Fits section background and accents
- String value for inline CSS or variables in chunk

## When to use

- Hero background, overlay, button color
- Accent border or badge
- When palette is not fixed upfront

## Tips

- Fixed brand swatches fit [colorpalette](colorpalette)
- Check text contrast on chosen background in chunk

## Similar types

- [colorpalette](colorpalette) for JSON option swatches
- [select](select) when colors are named themes

## Schema

```json
{
  "name": "accent",
  "type": "color",
  "label": "Акцент",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

HEX-строка.

## Output in section.data в section.data

Ключ `accent` в `section.data` (HEX):

```json
{
  "accent": "#3b82f6"
}
```

## Chunk example в chunk

```html
<span style="color: {$accent|escape}">…</span>
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
