---
title: "slug"
description: "Slug string, often auto-generated from sourceField"
---

# Field slug

Layer: **Free**.

<!-- ![slug](/components/pagebuilder/screenshots/fields/slug.png) -->

## Why this type

- Normalized URL segment, not free-form text
- `sourceField` copies a title on first save
- Pro: responsive map excludes alt, caption, slug names

## When to use

- Section anchor, card slug, filter segment
- Catalog or landing path segment
- Tab or in-page navigation key

## Tips

- Store full URLs in [url](url), not slug
- Slug is excluded from the responsive map by default

## Similar types

- [text](text) for the visible source title
- [url](url) for a complete link with protocol

## Schema

```json
{
  "name": "slug",
  "type": "slug",
  "label": "Slug",
  "sourceField": "title",
  "separator": "-",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка slug.

## Output in section.data в section.data

Ключ `slug` в `section.data`:

```json
{
  "slug": "zagolovok-sekcii"
}
```

## Chunk example в chunk

```html
<span class="slug">{$slug|escape}</span>
```

## Notes

Источник: `sourceField`, `slugSource` или алиас `from`. Разделитель: `separator`.

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

- Дополнительно: `sourceField` / `from`, `separator`. Responsive для имени `slug` отключён.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
