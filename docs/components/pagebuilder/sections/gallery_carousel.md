---
title: "Карусель галереи"
description: "Слайдер изображений с опцией автопрокрутки. Слой Pro."
---

# Карусель галереи

Те же слайды, что в **Галерее**, но по одному на экране с листанием. Можно включить автопрокрутку.

<!-- ![Карусель галереи](/components/pagebuilder/screenshots/sections/gallery_carousel.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем эта секция

- Экономит высоту страницы на мобильном
- Автопрокрутка опциональна
- Те же поля слайдов, что у [Галереи](gallery)

## Где применять

- **Баннеры** на главной
- **Портфолио** — крупные превью работ
- **Фото товара** — несколько ракурсов на лендинге

## Примеры страниц

- Главная: [Hero](hero) → [Carousel](gallery_carousel) баннеров → [Products grid](products_grid)
- Портфолио: [Текст](richtext) → [Carousel](gallery_carousel) → [CTA](cta)

## Что заполнить

Repeater **Слайды** как в галерее. **Автовоспроизведение** включает таймер; на фронте нужен `pagebuilder-sections.js`.

## Похожие секции

- [Галерея](gallery) для сетки всех кадров сразу
- [Карусель товаров](products_carousel) для SKU (Pro, MS3)

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `gallery_carousel` |
| Слой | Pro |
| Категория | медиа (`media`) |
| Chunk | `pagebuilderpro_gallery_carousel` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Автовоспроизведение (`autoplay`)

Тип [yesno](../fields/yesno#vyvod-v-section-data). Необязательное. Переключатель да/нет.

### Слайды (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `image` | [image](../fields/image#vyvod-v-section-data) | Изображение | да |
| `alt` | [text](../fields/text#vyvod-v-section-data) | Alt-текст | нет |
| `caption` | [text](../fields/text#vyvod-v-section-data) | Подпись | нет |

## Что видит посетитель

Карусель `pb-carousel` с partial изображений.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "autoplay": false,
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

Fenom chunk `pagebuilderpro_gallery_carousel`:

```fenom
{var $slideCount = $items|count}
<section
  class="pb-section pb-section--gallery-carousel pb-gallery-carousel{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="gallery_carousel"
  data-pb-carousel
  data-pb-autoplay="{$autoplay|default:0}"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    <div class="pb-carousel__viewport" tabindex="0" role="region" aria-roledescription="carousel" aria-label="{$title|default:'Gallery'|escape}">
      <div class="pb-carousel__track">
        {foreach $items as $item}
          <figure class="pb-carousel__slide" role="group" aria-roledescription="slide" aria-label="{$item@index + 1} / {$slideCount}">
            {include 'pagebuilder_partial_image' image=$item.image alt=($item.alt ?: $item.caption) class='pb-carousel__media'}
            {if $item.caption}
              <figcaption class="pb-carousel__caption">{$item.caption|escape}</figcaption>
            {/if}
          </figure>
        {/foreach}
      </div>
      {if $slideCount > 1}
        <div class="pb-carousel__controls">
          <button type="button" class="pb-carousel__btn" data-pb-carousel-prev aria-label="Previous slide">‹</button>
          <button type="button" class="pb-carousel__btn" data-pb-carousel-next aria-label="Next slide">›</button>
        </div>
        <div class="pb-carousel__dots" role="tablist" aria-label="Slides">
          {foreach $items as $item}
            <button
              type="button"
              class="pb-carousel__dot{if $item@first} pb-carousel__dot--active{/if}"
              data-pb-carousel-dot="{$item@index}"
              role="tab"
              aria-label="Slide {$item@index + 1}"
              {if $item@first}aria-selected="true"{/if}
            ></button>
          {/foreach}
        </div>
      {/if}
    </div>
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/gallery_carousel.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
