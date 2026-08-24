---
title: "textarea"
description: "Multi-line plain text without HTML in section.data"
---

# Field textarea

Layer: **Free**.

<!-- ![textarea](/components/pagebuilder/screenshots/fields/textarea.png) -->

## Why this type

- Several lines with no accidental HTML markup
- Better than text for descriptions and quotes
- Simpler than richtext when formatting is optional

## When to use

- Lead paragraph or short blurb without lists
- FAQ answer when HTML is not required
- Editor note or internal comment

## Tips

- Long formatted copy belongs in [richtext](richtext) or [editorjs](editorjs)
- Pro: `responsive` behaves like text

## Similar types

- [text](text) for a single line
- [richtext](richtext) for MODX HTML output

## Schema

```json
{
  "name": "intro",
  "type": "textarea",
  "label": "Вводный текст",
  "rows": 6,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Многострочная строка.

## Output in section.data в section.data

Ключ `intro` в `section.data`:

```json
{
  "intro": "Первый абзац.\nВторой абзац."
}
```

## Chunk example в chunk

```fenom
{if $intro}
  <p class="intro">{$intro|escape|nl2br}</p>
{/if}
```

## Notes

Высота: `rows` или `height` в schema. Pro: `responsive`.

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
