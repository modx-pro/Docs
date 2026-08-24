---
title: "Сравнение товаров"
description: "Таблица сравнения выбранных товаров miniShop3. Слой Pro."
---

# Сравнение товаров

Вы вручную выбираете несколько товаров в инспекторе — на сайте таблица характеристик по колонкам.

<!-- ![Сравнение товаров](/components/pagebuilder/screenshots/sections/product_comparison.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Зачем эта секция

- Несколько товаров в одной таблице характеристик
- Подсветка отличий опциональна
- Выбор SKU в инспекторе, не GET-параметры

## Где применять

- **Страница «Сравнение»** в каталоге
- **Подбор аналогов** для B2B
- **Лендинг** — два–три SKU рядом

## Примеры страниц

- Страница «Сравнение»: [Hero](hero) → [Product comparison](product_comparison) → [CTA](cta)
- B2B: [Spec table](spec_table) + [Product comparison](product_comparison) для линейки

## Что заполнить

Repeater или multirelation **Товары**. **Подсветить отличия** включает визуальное выделение разных значений.

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

## Вывод в section.data

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
{var $productIds = $comparison_product_ids|default:''}
{var $listing = ''}
{if $productIds}
  {var $listing = $modx->runSnippet('msProducts', [
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
      <p class="pb-listing__empty">Выберите от 2 до 4 товаров для сравнения.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/product_comparison.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
