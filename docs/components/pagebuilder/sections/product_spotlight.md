---
title: "Товар в фокусе"
description: "Крупная карточка одного товара с галереей, ценой и корзиной. Слой Pro."
---

# Товар в фокусе

Hero магазина или «товар недели»: крупное фото, цена, описание и добавление в корзину. Один товар из msProducts.

<!-- ![Товар в фокусе](/components/pagebuilder/screenshots/sections/product_spotlight.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Зачем эта секция

- Один товар крупно: галерея, цена, корзина
- Промо «товар недели» без отдельного шаблона
- msProducts по relation на ресурс

## Где применять

- **Главная** — промо SKU
- **Лендинг бренда** — флагман
- **Страница акции** — товар со скидкой

## Примеры страниц

- Главная магазина: [Product spotlight](product_spotlight) → [Products carousel](products_carousel)
- Акция: [Promo banner](promo_banner) → [Product spotlight](product_spotlight)

## Что заполнить

Поле **Товар** — relation на ресурс miniShop3. Остальные поля секции дополняют заголовок блока.

## Похожие секции

- [Промо-баннер](promo_banner) с текстом и optional product
- [Сетка](products_grid), если нужно много SKU

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `product_spotlight` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_product_spotlight` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Товар (`product`)

Тип [relation](../fields/relation#vyvod-v-section-data). Обязательное. Выбор одного ресурса MODX в модальном окне поиска.

## Что видит посетитель

Двухколоночный `pb-product-spotlight` через msProducts.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "product": 201
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_product_spotlight`:

```fenom
{var $productId = $pb_product_resource|default:($product_id|default:0)}
{var $listing = ''}
{if $productId}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => 0,
    'resources' => $productId,
    'limit' => 1,
    'tpl' => 'pagebuilderpro_ms3_product_spotlight_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section class="pb-section pb-section--product-spotlight pb-product-spotlight{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="product_spotlight"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-product-spotlight__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      {$listing}
    {else}
      <p class="pb-listing__empty">Товар не выбран или недоступен.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/product_spotlight.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
