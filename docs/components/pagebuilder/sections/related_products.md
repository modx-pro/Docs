---
title: "Похожие товары"
description: "Подборка из категории с исключением текущего товара. Слой Pro."
---

# Похожие товары

На карточке товара показывает другие SKU из той же (или заданной) категории, кроме текущего ресурса.

<!-- ![Похожие товары](/components/pagebuilder/screenshots/sections/related_products.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Cross-sell на карточке

- Исключает текущий товар из выборки
- Контекст страницы товара, не отдельный сниппет
- Категория и лимит в инспекторе

## Типичные места

- На карточке товара: «Смотрите также»
- В корзине: допродажа
- На странице «Спасибо за заказ»

## Примеры страниц

- Карточка товара (шаблон MS3): … → [Related products](related_products) → [FAQ](faq)
- Корзина: [Related products](related_products) «Добавьте к заказу»

## Категория и исключение

**Категория**, **Исключить товар** (текущий), **Лимит**. Работает в контексте страницы товара.

## Похожие секции

- [Подборка](curated_products) для фиксированного списка
- [Карусель товаров](products_carousel) для общей категории

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `related_products` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_related_products` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Корень каталога (`parent`)

Тип [relation](../fields/relation#vyvod-v-section-data). Обязательное. Выбор одного ресурса MODX в модальном окне поиска.

### Исключить товар (`product`)

Тип [relation](../fields/relation#vyvod-v-section-data). Необязательное. Выбор одного ресурса MODX в модальном окне поиска.

### Лимит (`limit`)

Тип [number](../fields/number#vyvod-v-section-data). Необязательное.

### Сортировка (`sortby`)

Тип [select](../fields/select#vyvod-v-section-data). Необязательное. Выпадающий список с заранее заданными вариантами.

## Что видит посетитель

Сетка `pb-related-products` через msProducts.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "product": 201,
  "limit": 6,
  "sortby": "menuindex"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_related_products`:

```fenom
{var $catalogParent = $parent.id|default:($parent_id|default:0)}
{var $excludeId = $product.id|default:($product_id|default:0)}
{var $listing = ''}
{if $catalogParent}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => $catalogParent,
    'depth' => 10,
    'limit' => $limit|default:4,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1,
    'resources' => ($excludeId > 0) ? ('-' ~ $excludeId) : '',
    'sortby' => $ms_sortby|default:'msProduct.menuindex',
    'sortdir' => $ms_sortdir|default:'ASC'
  ])}
{/if}
<section class="pb-section pb-section--related-products pb-related-products pb-listing{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="related_products"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-listing__grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">Подходящих товаров пока нет.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/related_products.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
