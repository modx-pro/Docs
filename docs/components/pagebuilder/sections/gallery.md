---
title: "Галерея"
description: "Сетка изображений с alt-текстом и подписью к каждому кадру."
---

# Галерея

Несколько фото или скриншотов в одной секции. У каждого изображения свой alt и необязательная подпись под превью.

<!-- ![Галерея](/components/pagebuilder/screenshots/sections/gallery.png) -->

## Что даёт галерея

- Несколько фото в одной секции с alt и подписью к каждому
- Repeater в инспекторе: добавили строку, получили кадр на сайте
- Сетка в chunk, не ручная вёрстка колонок

## Где уместна

- В портфолио работ или проектов
- Для фото продукции: несколько ракурсов без карусели
- В кейсе или отчёте с иллюстрациями

## Примеры страниц

- Портфолио: [Hero](hero) → [Галерея](gallery) → [CTA](cta)
- Товар (без MS3): [Текст](richtext) → [Галерея](gallery) → [FAQ](faq)

## Слайды и alt

В repeater **Слайды** добавьте строки с **Изображением**. Alt заполняйте для доступности и SEO.

## Похожие секции

- [Карусель галереи](gallery_carousel), если кадры листают по одному (Pro)
- [Изображение](image) для одного кадра на всю ширину

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `gallery` |
| Слой | Free |
| Категория | медиа (`media`) |
| Chunk | `pagebuilder_gallery` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Слайды (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `image` | [image](../fields/image#vyvod-v-section-data) | Изображение | да |
| `alt` | [text](../fields/text#vyvod-v-section-data) | Alt-текст | нет |
| `caption` | [text](../fields/text#vyvod-v-section-data) | Подпись | нет |

## Что видит посетитель

Сетка `pb-gallery`. Каждый кадр через partial `pagebuilder_partial_image`.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "image": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      },
      "alt": "Описание изображения для скринридеров",
      "caption": "Подпись под изображением"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_gallery`:

```fenom
<section class="pb-section pb-section--gallery pb-gallery{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="gallery"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-gallery__inner">
    {if $title}
      <h2 class="pb-heading pb-gallery__title">{$title|escape}</h2>
    {/if}
    <div class="pb-gallery__grid">
      {foreach $items as $item}
        <figure class="pb-gallery__item">
          {include 'pagebuilder_partial_image' image=$item.image alt=($item.alt ?: $item.caption) class='pb-gallery__media'}
          {if $item.caption}
            <figcaption class="pb-gallery__caption">{$item.caption|escape}</figcaption>
          {/if}
        </figure>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/gallery.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
