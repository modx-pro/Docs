---
title: "gallery"
description: "Array of image media objects with enrich metadata"
---

# Field gallery

Layer: **Pro**.

<!-- ![gallery](/components/pagebuilder/screenshots/fields/gallery.png) -->

## Why this type

- Multiple photos with alt and caption in repeater-like UI
- Same enrich as image per frame
- Pro advanced-fields

## When to use

- Slides without dedicated carousel section
- Product screenshot set
- Portfolio grid source data

## Tips

- Single frame fits [image](image)
- In chunk loop array and `{$slide.url}`

## Similar types

- [image](image) for one file
- [repeater](repeater) + image for custom nested schema (Free)

## Schema

```json
{
  "name": "shots",
  "type": "gallery",
  "label": "Галерея",
  "groups": true,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив media-объектов (изображения, видео, pdf и др.).

## Output in section.data в section.data

Ключ `shots` в `section.data` — массив media-объектов после enrich:

```json
{
  "shots": [
    {
      "url": "assets/images/hero.jpg",
      "id": 12,
      "path": "assets/images/",
      "filename": "hero.jpg",
      "extension": "jpg",
      "name": "hero",
      "title": "hero.jpg",
      "width": 1920,
      "height": 1080,
      "size": 245760,
      "type": "image",
      "description": "Подпись к кадру",
      "preview": "assets/images/hero.jpg",
      "groups": [
        "main",
        "slider"
      ]
    },
    {
      "url": "assets/files/catalog.pdf",
      "id": 34,
      "path": "assets/files/",
      "filename": "catalog.pdf",
      "extension": "pdf",
      "name": "catalog",
      "title": "catalog.pdf",
      "size": 1048576,
      "type": "pdf",
      "groups": "docs"
    }
  ]
}
```

- `groups` — строка или массив, если включено в schema поля.

## Chunk example в chunk

```fenom
{foreach $shots as $image}
  <img src="{$image.url|escape}" width="{$image.width}" height="{$image.height}" alt="{$image.title|escape}">
{/foreach}
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

- Дополнительно: `groups: true` — группы у элементов галереи.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
