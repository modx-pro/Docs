---
title: "editorjs"
description: "Editor.js object with json and html in section.data"
---

# Field editorjs

Layer: **Free**.

<!-- ![editorjs](/components/pagebuilder/screenshots/fields/editorjs.png) -->

## Why this type

- Block content with headings, lists, embeds
- html ready for chunk, json for custom render
- Structure safer than free-form HTML

## When to use

- Long article or block-based landing
- Content parsed from json later
- richtext alternative for block-first UX

## Tips

- Chunk usually `{$body.html}`, not raw json
- Simple HTML without blocks is faster in [richtext](richtext)

## Similar types

- [richtext](richtext) for classic WYSIWYG HTML
- [ace](ace) when a developer owns markup

## Schema

```json
{
  "name": "body",
  "type": "editorjs",
  "label": "Контент",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ json, html }`; на фронте обычно `html`.

## Output in section.data в section.data

Ключ `body` в `section.data`:

```json
{
  "body": {
    "json": {
      "time": 1710000000000,
      "blocks": [
        {
          "type": "paragraph",
          "data": {
            "text": "Текст блока"
          }
        }
      ],
      "version": "2.29.0"
    },
    "html": "<p>Текст блока</p>"
  }
}
```

- В chunk обычно используют `html`; `json` — сырой Editor.js.

## Chunk example в chunk

```html
<div class="pb-richtext__content">{$body.html}</div>
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

- Дополнительно: в data `{ json, html }`; в chunk обычно `{$field.html}`.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
