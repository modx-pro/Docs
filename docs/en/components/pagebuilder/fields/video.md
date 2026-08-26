---
title: "video"
description: "Video object with enrich embed_url provider and watch_url"
---

# Field video

Layer: **Free**.

<!-- ![video](/components/pagebuilder/screenshots/fields/video.png) -->

## Why this type

YouTube, Vimeo, and upload in one field. Save draft enrich fills embed and provider. Flat video_* when type=video or name contains video.

## When to use

- Hero background video or demo block
- Embed on product landing
- Single clip with poster and caption

## Tips

Chunk should use enrich fields, not raw url only. Frame gallery is [gallery](gallery), not video.

## Similar types

- [image](image) for static poster frame
- [url](url) for simple external watch link

## Schema

```json
{
  "name": "video",
  "type": "video",
  "label": "Video",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ url, poster }`. `poster` is a media object like `image`. Enrich adds `embed_url`, `provider`, and `watch_url`.

## Section data {#output-in-section-data}

Key `video` in the section data after save enrich (`SectionFieldEnricher` + `VideoEmbedResolver`):

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

- Flat `video_embed_url`, `video_provider`, and `video_watch_url` are added when the field name contains `video` or the section has `type=video`.

## Chunk example

```html
<iframe src="{$video.embed_url|escape}" title="Video"></iframe>
<img src="{$video.poster.url|escape}" alt="{$video.poster.title|escape}">
```

## Notes

Flat `video_embed_url` / `video_provider` / `video_watch_url` apply only when the section has `type=video` or the field name contains "video".

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25–100 | Field width as % of the row (flex) | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

- Also: `poster`: nested media object. Enrich: `embed_url`, `provider`, `watch_url`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Manager and events](../integration)
