---
title: "Ряд брендов"
description: "Логотипы брендов вручную или из вендоров категории miniShop3. Слой Pro."
---

# Ряд брендов

Похоже на **Логотипы партнёров**, но можно подтянуть бренды (vendors) из категории каталога автоматически.

<!-- ![Ряд брендов](/components/pagebuilder/screenshots/sections/brands_row.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Зачем эта секция

- Ручной список или vendors из категории MS3
- Ссылки на фильтр по бренду
- Компактнее сетки товаров для логотипов

## Где применять

- **Главная магазина** — бренды категории
- **Страница «Бренды»** — ручной список
- **Фильтр** — переход в вендора

## Примеры страниц

- Каталог: [Categories row](categories_row) → [Brands row](brands_row) → [Products grid](products_grid)
- Главная: [Brands row](brands_row) → [Testimonials](testimonials)

## Что заполнить

**Источник**: manual (repeater) или **Бренды из категории**. Для category_vendors укажите **Родительскую категорию**.

## Похожие секции

- [Логотипы](logos) для партнёров вне каталога
- [Ряд категорий](categories_row) для навигации по разделам

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `brands_row` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_brands_row` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Источник (`source`)

Тип [select](../fields/select#vyvod-v-section-data). Необязательное. Выпадающий список с заранее заданными вариантами.

### Корень каталога (`parent`)

Тип [relation](../fields/relation#vyvod-v-section-data). Необязательное. Выбор одного ресурса MODX в модальном окне поиска.

### Лимит (`limit`)

Тип [number](../fields/number#vyvod-v-section-data). Необязательное.

### Бренды (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Необязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `logo` | [image](../fields/image#vyvod-v-section-data) | Логотип | нет |
| `name` | [text](../fields/text#vyvod-v-section-data) | Название бренда | да |
| `url` | [url](../fields/url#vyvod-v-section-data) | Ссылка | нет |

## Что видит посетитель

Ряд `pb-brands-row`.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "source": "manual",
  "parent": 101,
  "limit": 6,
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "logo": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      },
      "name": "Иван Петров",
      "url": "https://example.com/brand"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_brands_row`:

```fenom
{var $brands = $brand_items|default:$items}
<section class="pb-section pb-section--brands-row pb-brands-row{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="brands_row"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-brands-row__inner">
    {if $title}
      <h2 class="pb-heading pb-brands-row__title">{$title|escape}</h2>
    {/if}
    {if $brands && ($brands | length) > 0}
      <div class="pb-brands-row__grid">
        {foreach $brands as $item}
          {if $item.url}
            <a class="pb-brands-row__item" href="{$item.url|escape:'url'}" title="{$item.name|escape}">
              {if $item.logo}
                {include 'pagebuilder_partial_image' image=$item.logo alt=$item.name class='pb-brands-row__logo'}
              {/if}
              <span class="pb-brands-row__name">{$item.name|escape}</span>
            </a>
          {else}
            <div class="pb-brands-row__item">
              {if $item.logo}
                {include 'pagebuilder_partial_image' image=$item.logo alt=$item.name class='pb-brands-row__logo'}
              {/if}
              <span class="pb-brands-row__name">{$item.name|escape}</span>
            </div>
          {/if}
        {/foreach}
      </div>
    {else}
      <p class="pb-brands-row__empty">Добавьте бренды вручную или выберите категорию с вендорами.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/brands_row.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
