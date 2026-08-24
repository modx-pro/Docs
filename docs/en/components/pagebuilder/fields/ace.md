---
title: "ace"
description: "Source code string with Ace highlighting in the inspector"
---

# Field ace

Layer: **Free**.

<!-- ![ace](/components/pagebuilder/screenshots/fields/ace.png) -->

## Why this type

- Full control over HTML, CSS, or JSON
- Mode via `mode` (html, css, javascript, json)
- No WYSIWYG when you need exact markup

## When to use

- Custom section markup maintained by a developer
- SVG snippet or inline styles
- JSON or config the chunk parses itself

## Tips

- Content editors usually prefer [richtext](richtext)
- Do not escape HTML in the chunk when you output markup intentionally

## Similar types

- [richtext](richtext) for WYSIWYG without code
- [editorjs](editorjs) for block content with html on save

## Schema

```json
{
  "name": "markup",
  "type": "ace",
  "label": "Разметка",
  "mode": "html",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка с исходным кодом.

## Output in section.data в section.data

Ключ `markup` в `section.data`:

```json
{
  "markup": "<section class=\"hero\">\n  …\n</section>"
}
```

## Chunk example в chunk

```fenom
{$markup}
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
