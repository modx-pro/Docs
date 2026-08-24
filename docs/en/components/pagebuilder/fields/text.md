---
title: "text"
description: "Single-line string in section.data for titles and short labels"
---

# Field text

Layer: **Free**.

<!-- ![text](/components/pagebuilder/screenshots/fields/text.png) -->

## Why this type

- Simplest scalar, predictable in Fenom and validation
- Pro: `responsive` for desktop / tablet / mobile
- Avoids an HTML editor when you only need one line

## When to use

- Section title, subtitle, button label
- Short alt or caption next to image
- Any value that fits on one line

## Tips

- Use [textarea](textarea) for multi-line plain text
- Do not store HTML in text, pick [richtext](richtext) or [editorjs](editorjs)

## Similar types

- [textarea](textarea) for paragraphs without markup
- [slug](slug) for URLs derived from another field

## Schema

```json
{
  "name": "title",
  "type": "text",
  "label": "Заголовок",
  "tab": "Контент",
  "width": 100,
  "description": "Подсказка под полем",
  "default": "",
  "required": true,
  "active": true
}
```

## Value

Строка в `section.data.title`.

## Output in section.data в section.data

Ключ `title` в `section.data`:

```json
{
  "title": "Заголовок секции"
}
```

## Chunk example в chunk

```fenom
{$title|escape}
```

## Notes

Pro: `field.responsive` (desktop / tablet / mobile).

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

**Pro** (capability `responsive`): при `responsive: true` в `section.data` — ключи `desktop`, `tablet`, `mobile` вместо скаляра.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
