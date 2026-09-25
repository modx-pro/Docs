---
title: "Сравнение товаров"
description: "Таблица сравнения выбранных товаров miniShop3. Слой Pro."
---

# Сравнение товаров

Вы вручную выбираете несколько товаров в инспекторе. На сайте появится таблица характеристик по колонкам.

![Сравнение товаров](/components/pagebuilder/screenshots/sections/product_comparison.jpg)

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Сравнение в PageBuilder

- Несколько товаров в одной таблице характеристик
- Подсветка отличий опциональна
- Выбор SKU в инспекторе, не GET-параметры

## Где показывать

- На странице «Сравнение» в каталоге
- Для подбора аналогов в B2B
- На лендинге: два–три SKU рядом

## Примеры страниц

- Страница «Сравнение»: [Hero](hero) → [Product comparison](product_comparison) → [CTA](cta)
- B2B: [Spec table](spec_table) + [Product comparison](product_comparison) для линейки

## Товары и подсветка

Multirelation **Товары** (не более четырёх SKU в выводе). **Подсветить отличия** добавляет модификатор класса `pb-product-comparison--diff` для оформления темы. Тип помечен `"cacheable": false`.

## Похожие секции

- [Таблица характеристик](spec_table) для одного продукта
- [Подборка](curated_products) без табличного сравнения

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `product_comparison` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_product_comparison` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Товары (`products`)

Тип [multirelation](../fields/multirelation#vyvod-v-section-data). Обязательное. Выбор нескольких ресурсов. В JSON сохраняются ID.

### Подсветить отличия (`highlight_differences`)

Тип [yesno](../fields/yesno#vyvod-v-section-data). Необязательное. Переключатель да/нет.

## Что видит посетитель

Таблица `pb-product-comparison`.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "products": [
    201,
    202,
    203
  ],
  "highlight_differences": true
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_product_comparison`:

```fenom
{set $productIds = $comparison_product_ids|default:''}
{set $listing = ''}
{if $productIds}
  {set $listing = $modx->runSnippet('msProducts', [
    'parents' => 0,
    'resources' => $productIds,
    'limit' => 4,
    'tpl' => 'pagebuilderpro_product_comparison_cell',
    'includeVendorFields' => '*',
    'includeOptions' => '*',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section
  class="pb-section pb-section--product-comparison pb-product-comparison{if $highlight_differences} pb-product-comparison--diff{/if}{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="product_comparison"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner pb-product-comparison__inner">
    {if $title}
      <h2 class="pb-heading pb-product-comparison__title">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-product-comparison__scroll" tabindex="0" role="region" aria-label="{$title|default:'Product comparison'|escape}">
        <div class="pb-product-comparison__grid">
          {$listing}
        </div>
      </div>
    {else}
      <div class="pb-listing__empty">
        <p>{'pagebuilder_fe_comparison_empty_lead' | lexicon}</p>
        <p>{'pagebuilder_fe_comparison_empty_hint' | lexicon}</p>
      </div>
    {/if}
  </div>
</section>
```

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
