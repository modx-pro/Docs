---
title: "Логотипы партнёров"
description: "Ряд логотипов клиентов или партнёров. Слой Pro."
---

# Логотипы партнёров

Блок «Нам доверяют»: логотипы в одну линию или сетку. У каждого лого alt и необязательная ссылка.

<!-- ![Логотипы партнёров](/components/pagebuilder/screenshots/sections/logos.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Блок «нам доверяют»

- Быстрый блок «нам доверяют»
- Alt у каждого лого для доступности
- Ссылка на сайт партнёра опциональна

## Типичные места

- На B2B-главной: клиенты и интеграторы
- На лендинге перед отзывами
- На странице партнёрства

## Примеры страниц

- B2B: [Stats](stats) → [Logos](logos) → [Testimonials](testimonials)
- Лендинг: [Features](features) → [Logos](logos) → [Pricing](pricing_table)

## Repeater логотипов

Repeater **Логотипы**: изображение, alt, URL. Держите одинаковую высоту логотипов в макете.

## Похожие секции

- [Ряд брендов](brands_row) для вендоров из miniShop3 (Pro, MS3)
- [Отзывы](testimonials), если нужны цитаты, а не логотипы

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `logos` |
| Слой | Pro |
| Категория | доверие (`social`) |
| Chunk | `pagebuilderpro_logos` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Логотипы (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `image` | [image](../fields/image#vyvod-v-section-data) | Логотип | да |
| `alt` | [text](../fields/text#vyvod-v-section-data) | Alt-текст | нет |

## Что видит посетитель

Сетка `pb-logos` с изображениями.

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
      "alt": "Описание изображения для скринридеров"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_logos`:

```fenom
<section class="pb-section pb-section--logos pb-logos{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="logos"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-logos__inner">
    {if $title}
      <h2 class="pb-heading pb-logos__title">{$title|escape}</h2>
    {/if}
    <div class="pb-logos__grid">
      {foreach $items as $item}
        {include 'pagebuilder_partial_image' image=$item.image alt=($item.alt ?: 'Logo') class='pb-logos__item'}
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/logos.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
