---
title: "Карусель товаров"
description: "Горизонтальная лента товаров из категории с автопрокруткой. Слой Pro."
---

# Карусель товаров

Те же данные, что в **Сетке товаров**, но в карусели. Удобно, когда места мало, а товаров много.

<!-- ![Карусель товаров](/components/pagebuilder/screenshots/sections/products_carousel.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Зачем эта секция

- Те же товары, что в сетке, но в карусели
- Экономит место на главной
- Автопрокрутка по флагу

## Где применять

- **Главная** — «Хиты продаж»
- **Карточка товара** — cross-sell (если не используете **Похожие товары**)
- **Лендинг** — подборка из категории

## Примеры страниц

- Главная: [Products carousel](products_carousel) «Хиты» → [Products grid](products_grid) «Новинки»
- Товар: [Related](related_products) + [Carousel](products_carousel) cross-sell

## Что заполнить

Категория и лимит как в сетке. **Автовоспроизведение** и JS секций на фронте.

## Похожие секции

- [Сетка товаров](products_grid) для полной витрины
- [Товар в фокусе](product_spotlight) для одного SKU

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `products_carousel` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_products_carousel` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Корень каталога (`parent`)

Тип [relation](../fields/relation#vyvod-v-section-data). Обязательное. Выбор одного ресурса MODX в модальном окне поиска.

### Лимит (`limit`)

Тип [number](../fields/number#vyvod-v-section-data). Необязательное.

### Автовоспроизведение (`autoplay`)

Тип [yesno](../fields/yesno#vyvod-v-section-data). Необязательное. Переключатель да/нет.

### Сортировка (`sortby`)

Тип [select](../fields/select#vyvod-v-section-data). Необязательное. Выпадающий список с заранее заданными вариантами.

## Что видит посетитель

Карусель `pb-products-carousel` на msProducts.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "limit": 6,
  "autoplay": false,
  "sortby": "menuindex"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_products_carousel`:

```fenom
{var $catalogParent = $parent.id|default:($parent_id|default:0)}
{var $listing = ''}
{if $catalogParent}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => $catalogParent,
    'depth' => 10,
    'limit' => $limit|default:8,
    'tpl' => 'pagebuilderpro_ms3_product_carousel_slide',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1,
    'sortby' => $ms_sortby|default:'msProduct.menuindex',
    'sortdir' => $ms_sortdir|default:'ASC'
  ])}
{/if}
<section
  class="pb-section pb-section--products-carousel pb-products-carousel pb-listing pb-listing--carousel{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="products_carousel"
  data-pb-carousel
  data-pb-autoplay="{$autoplay|default:0}"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-carousel__viewport" tabindex="0" role="region" aria-roledescription="carousel" aria-label="{$title|default:'Products'|escape}">
        <div class="pb-carousel__track">
          {$listing}
        </div>
        <div class="pb-carousel__controls">
          <button type="button" class="pb-carousel__btn" data-pb-carousel-prev aria-label="Previous slide">‹</button>
          <button type="button" class="pb-carousel__btn" data-pb-carousel-next aria-label="Next slide">›</button>
        </div>
      </div>
    {else}
      <p class="pb-listing__empty">В этой категории пока нет товаров для карусели.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/products_carousel.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
