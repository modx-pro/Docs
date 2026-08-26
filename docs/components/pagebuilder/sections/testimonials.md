---
title: "Отзывы клиентов"
description: "Карточки с цитатой, именем, должностью и фото автора."
---

# Отзывы клиентов

Социальное доказательство: цитата клиента, имя, роль и аватар. Несколько отзывов выводятся сеткой.

<!-- ![Отзывы клиентов](/components/pagebuilder/screenshots/sections/testimonials.png) -->

## Что даёт блок отзывов

- Цитата, имя и фото в одной карточке
- Несколько отзывов без отдельного сниппета
- Усиливает блоки с цифрами и CTA

## Типичные места

- На главной: блок доверия после описания продукта
- На лендинге: отзывы перед формой заявки
- На странице «О компании»

## Примеры страниц

- SaaS: [Преимущества](features) → [Testimonials](testimonials) → [Тарифы](pricing_table)
- Услуги: [Карточки](cards) → [Testimonials](testimonials) → [Форма](contact_form)

## Поля в инспекторе

Repeater **Отзывы**: **Цитата**, **Имя**, **Должность**, **Фото**. Фото необязательно, но улучшает доверие.

## Похожие секции

- [Логотипы](logos) для «нам доверяют» без цитат
- [Команда](team), если нужны биографии, а не отзывы клиентов

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `testimonials` |
| Слой | Free |
| Категория | доверие (`social`) |
| Chunk | `pagebuilder_testimonials` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Отзывы (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `quote` | [textarea](../fields/textarea#vyvod-v-section-data) | Цитата | да |
| `name` | [text](../fields/text#vyvod-v-section-data) | Имя | да |
| `role` | [text](../fields/text#vyvod-v-section-data) | Должность | нет |
| `avatar` | [image](../fields/image#vyvod-v-section-data) | Фото | нет |

## Что видит посетитель

Сетка `pb-testimonials`: blockquote, подпись автора, аватар через partial.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "quote": "Отличный сервис, рекомендую коллегам.",
      "name": "Иван Петров",
      "role": "Директор, ООО Пример",
      "avatar": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      }
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_testimonials`:

```fenom
<section class="pb-section pb-section--testimonials pb-testimonials{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="testimonials"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-testimonials__inner">
    {if $title}
      <h2 class="pb-heading pb-testimonials__title">{$title|escape}</h2>
    {/if}
    <div class="pb-testimonials__grid">
      {foreach $items as $item}
        <blockquote class="pb-testimonials__item">
          {if $item.avatar}
            {include 'pagebuilder_partial_image' image=$item.avatar alt=$item.name class='pb-testimonials__avatar'}
          {/if}
          <p class="pb-testimonials__quote">{$item.quote|escape}</p>
          <footer class="pb-testimonials__footer">
            <div class="pb-testimonials__author">{$item.name|escape}</div>
            {if $item.role}
              <div class="pb-testimonials__role">{$item.role|escape}</div>
            {/if}
          </footer>
        </blockquote>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/testimonials.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
