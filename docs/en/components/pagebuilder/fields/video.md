---
title: "video"
description: "Video object with enrich embed_url provider and watch_url"
---

# Field video

Layer: **Pro**.

<!-- ![video](/components/pagebuilder/screenshots/fields/video.png) -->

## Why this type

- YouTube, Vimeo, and upload in one field
- save draft enrich fills embed and provider
- Flat video_* when type=video or name contains video

## When to use

- Hero background video or demo block
- Embed on product landing
- Single clip with poster and caption

## Tips

- Chunk should use enrich fields, not raw url only
- Frame gallery is [gallery](gallery), not video

## Similar types

- [image](image) for static poster frame
- [url](url) for simple external watch link

## Schema

```json
{
  "name": "video",
  "type": "video",
  "label": "Видео",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ url, poster }`. `poster` — media-объект как у `image`. Enrich добавляет `embed_url`, `provider`, `watch_url`.

## Output in section.data в section.data

Ключ `video` в `section.data` после save enrich (`SectionFieldEnricher` + `VideoEmbedResolver`):

```json
{
  "video": {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "embed_url": "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    "provider": "youtube",
    "watch_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "poster": {
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
  },
  "video_embed_url": "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
  "video_provider": "youtube",
  "video_watch_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

- Плоские `video_embed_url`, `video_provider`, `video_watch_url` добавляются, если имя поля содержит `video` или секция имеет `type=video`.

## Chunk example в chunk

```html
<iframe src="{$video.embed_url|escape}" title="Video"></iframe>
<img src="{$video.poster.url|escape}" alt="{$video.poster.title|escape}">
```

## Notes

Плоские `video_embed_url` / `video_provider` / `video_watch_url` — только для секции `type=video` или имени поля с «video».

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

- Дополнительно: `poster` — вложенный media-объект. Enrich: `embed_url`, `provider`, `watch_url`.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
