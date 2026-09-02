---
title: "video"
description: "Объект видео с enrich embed_url provider и watch_url"
---

# Поле video

Версия: **Free**.

<!-- ![video](/components/pagebuilder/screenshots/fields/video.png) -->

## Зачем этот тип

YouTube, Vimeo и upload в одном поле. При save enrich заполняет `embed_url`, `provider`, `watch_url`. Плоские `video_*` появляются при `type=video` или имени поля с «video».

## Когда использовать

- Фоновое видео в hero или demo-блок
- Embed на product landing
- Один ролик с poster и подписью

## Советы

В chunk выводите enrich-поля, не только raw `url`. Галерея кадров: [gallery](gallery), не video.

## Похожие типы

- [image](image) для poster static frame
- [url](url) для простой внешней ссылки на ролик

## Настройка

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

## Значение

Объект `{ url, poster }`. `poster`: media-объект как у `image`. Enrich добавляет `embed_url`, `provider`, `watch_url`.

## Данные секции {#vyvod-v-section-data}

Ключ `video` в данных секции после save enrich (`SectionFieldEnricher` + `VideoEmbedResolver`):

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

## Пример в chunk

```html
<iframe src="{$video.embed_url|escape}" title="Video"></iframe>
<img src="{$video.poster.url|escape}" alt="{$video.poster.title|escape}">
```

## Примечание

Плоские `video_embed_url` / `video_provider` / `video_watch_url`: только для секции `type=video` или имени поля с «video».

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `poster`: вложенный media-объект. Enrich: `embed_url`, `provider`, `watch_url`.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Менеджер и события](../integration)
