---
title: "video"
description: "Объект видео с enrich embed_url provider и watch_url"
---

# Поле video

Версия: **Free**.

<!-- ![video](/components/pagebuilder/screenshots/fields/video.jpg) -->

## Зачем этот тип

URL YouTube, Vimeo или Rutube плюс poster, как у [image](image). При сохранении enrich распознаёт ссылку и добавляет `embed_url`, `provider`, `watch_url`. URL без распознанного провайдера остаётся без embed.

## Когда использовать

- Фоновое видео на первом экране или в блоке с демонстрацией
- Ролик на странице товара
- Один ролик с обложкой и подписью

## Советы

В чанке берите `embed_url` и `provider`, не только исходный `url`. Набор фотографий делают полем [gallery](gallery), не video.

## Похожие типы

- [image](image) для неподвижной обложки
- [url](url) для обычной ссылки на ролик

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

Объект `{ url, poster }`. `poster` — media-объект, как у [image](image).

## Данные секции {#vyvod-v-section-data}

Ключ `video` в данных секции после сохранения (`SectionFieldEnricher` + `VideoEmbedResolver`):

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

- Плоские `video_*` — только у секции `type=video`. Объект enrich-ится, если имя ключа содержит `video`.

## Пример в chunk

::: code-group

```modx
<iframe src="[[+video.embed_url]]" title="Video"></iframe>
[[$pagebuilder_partial_image?
  &image=`[[+video.poster]]`
  &alt=`[[+video.poster.title]]`
]]
```

```fenom
<iframe src="{$video.embed_url|escape}" title="Video"></iframe>
{include 'pagebuilder_partial_image' image=$video.poster alt=$video.poster.title}
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Менеджер и события](../integration)
