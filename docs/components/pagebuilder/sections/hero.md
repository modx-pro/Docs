---
title: "Первый экран (Hero)"
description: "Заголовок, текст, кнопка и фоновое изображение в верхней части страницы."
---

# Первый экран (Hero)

Первый блок после шапки сайта. Посетитель сразу видит заголовок, короткий текст и кнопку с ссылкой. Фоновую картинку можно включить или оставить однотонный фон.

<!-- ![Первый экран (Hero)](/components/pagebuilder/screenshots/sections/hero.png) -->

## Зачем эта секция

- Редактор меняет заголовок, текст и кнопку без правки Fenom
- Фон и выравнивание задаются полями, не CSS в шаблоне
- Chunk `pagebuilder_hero` уже размечен под типичный первый экран

## Где применять

- **Главная** — оффер компании или магазина и основной переход (в каталог, на акцию)
- **Лендинг** услуги, курса или мероприятия
- **Промо-страница** с одним призывом: записаться, скачать, оформить заявку

## Примеры страниц

- Лендинг SaaS: [Hero](hero) → [Преимущества](features) → [Цифры](stats) → [Тарифы](pricing_table) → [CTA](cta)
- Магазин: [Hero](hero) → [Сетка товаров](products_grid) → [Отзывы](testimonials) → [Контакты](contact)
- Услуга: [Hero](hero) → [Карточки](cards) → [FAQ](faq) → [Форма](contact_form)

## Что заполнить

Поле **Заголовок** обязательно. Кнопка выводится только если заполнены и **Текст кнопки**, и **URL кнопки**. **Выравнивание** переключает текст слева или по центру.

## Похожие секции

- [CTA](cta), если не нужен блок на всю ширину с фоном
- [Промо-баннер](promo_banner) для акции в каталоге (Pro, miniShop3)

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `hero` |
| Слой | Free |
| Категория | герой (`hero`) |
| Chunk | `pagebuilder_hero` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Обязательное.

### Описание (`description`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Текст кнопки (`button_label`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### URL кнопки (`button_url`)

Тип [url](../fields/url#vyvod-v-section-data). Необязательное.

### Фон (`background`)

Тип [image](../fields/image#vyvod-v-section-data). Необязательное.

### Выравнивание (`alignment`)

Тип [select](../fields/select#vyvod-v-section-data). Необязательное. Выпадающий список с заранее заданными вариантами.

## Что видит посетитель

На сайте блок `pb-hero` с заголовком, описанием, ссылкой-кнопкой (`pb-button`) и опциональным фоном через partial изображения.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "description": "Короткое описание блока для первого экрана.",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action",
  "background": {
    "url": "assets/images/example.jpg",
    "id": 12,
    "filename": "example.jpg",
    "extension": "jpg",
    "title": "example.jpg",
    "width": 1920,
    "height": 1080,
    "type": "image"
  },
  "alignment": "left"
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_hero`:

```fenom
{var $heroBg = is_array($background) ? ($background.url ?: '') : ($background ?: '')}
<section class="pb-section pb-section--hero pb-hero{if $alignment == 'center'} pb-hero--center{/if}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="hero"{if $id} id="pb-{$id|escape}"{/if}{if $heroBg} style="--pb-hero-bg: url('{$heroBg|escape}')"{/if}>
  <div class="pb-section__inner pb-hero__inner">
    <h1 class="pb-hero__title">{$title|escape}</h1>
    {if $description}
      <div class="pb-hero__description">{$description|escape}</div>
    {/if}
    {if $button_label && $button_url}
      <a class="pb-hero__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
    {/if}
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/hero.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
