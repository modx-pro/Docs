---
title: "file"
description: "File media object after enrich on save draft"
---

# Field file

Layer: **Free**.

<!-- ![file](/components/pagebuilder/screenshots/fields/file.png) -->

## Why this type

- Enrich adds filename, extension, size, url
- Fits PDF, archives, not only images
- Same media pipeline as image

## When to use

- PDF price list, deck, downloadable asset
- Attachment in contact or CTA
- Any file from MODX media

## Tips

- In chunk use `{$file.url}`, not raw path
- Photos alone often use [image](image)

## Similar types

- [image](image) for photos with alt and dimensions
- [url](url) for external link without upload

## Schema

```json
{
  "name": "pdf",
  "type": "file",
  "label": "Файл",
  "description": "PDF или другой документ",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект media: `url`, `size`, `title`, `name`, `filename`, `extension`, `type` и др. Legacy-строка при чтении оборачивается в `{ url }`.

## Output in section.data в section.data

Ключ `pdf` в `section.data` после save enrich (`MediaFieldEnricher`):

```json
{
  "pdf": {
    "url": "assets/files/catalog.pdf",
    "id": 34,
    "path": "assets/files/",
    "filename": "catalog.pdf",
    "extension": "pdf",
    "name": "catalog",
    "title": "catalog.pdf",
    "size": 1048576,
    "type": "pdf"
  }
}
```

- Legacy-строка URL при чтении нормализуется в `{ url }`.

## Chunk example в chunk

```html
<a href="{$pdf.url|escape}" download="{$pdf.title|escape}">{$pdf.title|escape}</a>
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

- Дополнительно в schema: media-объект, enrich при save.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
