---
title: "richtext"
description: "HTML string from the familiar MODX richtext editor in section.data"
---

# Field richtext

Layer: **Free**.

<!-- ![richtext](/components/pagebuilder/screenshots/fields/richtext.png) -->

## Why this type

- WYSIWYG like a MODX resource field, no extra TV
- Links, lists, and basic formatting out of the box
- Chunk outputs ready HTML without block parsing

## When to use

- Main section copy with paragraphs and links
- FAQ answer with bold text and lists
- Any content where editors should not hand-write markup

## Tips

- Structured Editor.js blocks need [editorjs](editorjs)
- Raw HTML or CSS belongs in [ace](ace)

## Similar types

- [editorjs](editorjs) for structured blocks with json and html
- [textarea](textarea) for plain text without tags

## Schema

```json
{
  "name": "content",
  "type": "richtext",
  "label": "Текст",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

HTML-строка.

## Output in section.data в section.data

Ключ `content` в `section.data`:

```json
{
  "content": "<p>Текст с <strong>разметкой</strong>.</p>"
}
```

## Chunk example в chunk

```html
<div class="pb-richtext__content">{$content}</div>
```

## Notes

Pro: `responsive`.

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
