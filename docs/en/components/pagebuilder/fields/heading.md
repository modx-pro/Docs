---
title: "heading"
description: "Decorative field group heading with no section.data key"
---

# Field heading

Layer: **Free**.

<!-- ![heading](/components/pagebuilder/screenshots/fields/heading.png) -->

## Why this type

- Breaks long inspector into blocks
- No key in section.data
- tab and width work like normal fields

## When to use

- Label "Button", "SEO", "Media" between fields
- Visual divider without fieldset (Pro)
- In-form docs via label text

## Tips

- name can be technical, e.g. `_h`
- Nested fields with legend use [fieldset](fieldset) (Pro)

## Similar types

- [fieldset](fieldset) for legend and nested fields (Pro)
- [dependent](dependent) marker for showWhen blocks (Pro)

## Schema

```json
{
  "name": "_h",
  "type": "heading",
  "label": "Группа полей",
  "tab": "Контент",
  "width": 100
}
```

## Value

Не попадает в `section.data`.

## Output in section.data в section.data

В `section.data` не сохраняется.

## Chunk example в chunk

Не используется в chunk.

## Common properties

Значение в `section.data` **не сохраняется**.

| Ключ | Роль | CMP |
| --- | --- | --- |
| `tab` | Группа в инспекторе | да |
| `width` | Ширина подписи, 25–100 (%) | да |
| `label` | Текст подзаголовка / маркера | да |

См. [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
