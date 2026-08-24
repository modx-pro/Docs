---
title: "image"
description: "Image media object with alt and enrich metadata"
---

# Field image

Layer: **Free**.

<!-- ![image](/components/pagebuilder/screenshots/fields/image.png) -->

## Why this type

- width, height, extension after enrich
- Alt and caption in section schema
- Single frame without gallery repeater

## When to use

- Hero background, card thumb, author photo
- OG-style preview in section
- Partner logo with alt

## Tips

- Multiple frames use [gallery](gallery) (Pro)
- In chunk `{$photo.url}`, not path string

## Similar types

- [gallery](gallery) for image sets (Pro)
- [file](file) for non-image assets

## Schema

```json
{
  "name": "photo",
  "type": "image",
  "label": "Изображение",
  "description": "Рекомендуемый размер 1920×1080",
  "width": 50,
  "tab": "Контент",
  "active": true
}
```

## Value

Media-объект. Кнопка Info редактирует width, height, title. При выборе из браузера подтягиваются size и имя файла.

## Output in section.data в section.data

Ключ `photo` в `section.data` после save enrich:

```json
{
  "photo": {
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
    "type": "image"
  }
}
```

- Поля `width`, `height`, `size` дополняются с диска, если файл доступен MODX.

## Chunk example в chunk

```html
<img src="{$photo.url|escape}" width="{$photo.width}" height="{$photo.height}" alt="{$photo.title|escape}">
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

- Дополнительно в schema: нет `responsive`. Значение — media-объект, enrich при save.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
