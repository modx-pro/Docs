---
title: "Видео"
description: "Встраивание ролика по URL (YouTube, Vimeo, Rutube). Слой Pro."
---

# Видео

Responsive iframe по ссылке на ролик. Поддерживаются популярные хостинги; URL разбирает `VideoEmbedResolver`.

<!-- ![Видео](/components/pagebuilder/screenshots/sections/video.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем эта секция

- URL вместо embed-кода в richtext
- `VideoEmbedResolver` подставляет iframe под YouTube, Vimeo, Rutube
- Responsive-обёртка в chunk

## Где применять

- **Обзор продукта** на главной
- **Инструкция** на странице поддержки
- **Промо-ролик** на лендинге

## Примеры страниц

- Продукт: [Hero](hero) → [Видео](video) → [Features](features)
- Обучение: [Текст](richtext) → [Видео](video) → [FAQ](faq)

## Что заполнить

Вставьте полный **URL видео** из адресной строки браузера, не embed-код. Заголовок секции необязателен.

## Похожие секции

- [Hero](hero) с фоновым изображением, если видео не нужно
- [Structured content](structured_content) для встроенного media в статье

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `video` |
| Слой | Pro |
| Категория | медиа (`media`) |
| Chunk | `pagebuilderpro_video` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### URL видео (`video`)

Тип [video](../fields/video#vyvod-v-section-data). Обязательное. URL ролика. На сайте — embed через VideoEmbedResolver.

## Что видит посетитель

Iframe в блоке `pb-video`. Соотношение сторон сохраняется в CSS темы.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "video": {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "embed_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "provider": "youtube"
  }
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_video`:

```fenom
<section class="pb-section pb-section--video pb-video{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="video"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-video__inner">
    {if $title}
      <h2 class="pb-heading pb-video__title">{$title|escape}</h2>
    {/if}
    {if $video_provider}
      {var $providerLabel = $video_provider == 'youtube' ? 'YouTube' : ($video_provider == 'vimeo' ? 'Vimeo' : ($video_provider == 'rutube' ? 'Rutube' : $video_provider))}
      <p class="pb-video__provider">{$providerLabel|escape}</p>
    {/if}
    {if $video_embed_url}
      <div class="pb-video__embed">
        <iframe src="{$video_embed_url|escape}" title="{$title|default:'Video'|escape}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
      </div>
    {elseif $video_watch_url}
      <p><a class="pb-button" href="{$video_watch_url|escape}">Смотреть видео</a></p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/video.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
