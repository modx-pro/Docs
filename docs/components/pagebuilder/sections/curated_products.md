---
title: "Подборка товаров"
description: "Фиксированный список товаров, выбранных вручную в инспекторе. Слой Pro."
---

# Подборка товаров

В отличие от **Сетки товаров**, здесь нет привязки к одной категории: вы отмечаете конкретные ID в multirelation.

<!-- ![Подборка товаров](/components/pagebuilder/screenshots/sections/curated_products.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Зачем эта секция

- Точный список SKU, порядок как в multirelation
- Не зависит от одной категории
- Тот же card markup, что у сетки

## Где применять

- **«Рекомендуем»** на главной
- **Новинки** — ручной список без фильтра категории
- **Комплект** или bundle на лендинге

## Примеры страниц

- Главная: [Curated products](curated_products) «Рекомендуем» → [Products grid](products_grid) «Каталог»
- Лендинг: [Hero](hero) → [Curated products](curated_products) → [CTA](cta)

## Что заполнить

Поле **Товары** (multirelation): порядок выбора сохраняется. Лимит задаётся количеством выбранных позиций.

## Похожие секции

- [Сетка товаров](products_grid) для автоматической выборки из категории
- [Похожие товары](related_products) на карточке с exclude

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `curated_products` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_curated_products` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Товары (`products`)

Тип [multirelation](../fields/multirelation#vyvod-v-section-data). Обязательное. Выбор нескольких ресурсов. В JSON сохраняются ID.

### Вступление (`intro`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

## Что видит посетитель

Сетка `pb-curated-products` по ID из multirelation.

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
  "intro": "Краткое вступление перед основным содержимым."
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_curated_products`:

```fenom
{var $resourceIds = $curated_product_ids|default:''}
{var $listing = ''}
{if $resourceIds}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => 0,
    'resources' => $resourceIds,
    'limit' => 12,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section class="pb-section pb-section--curated-products pb-curated-products pb-listing{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="curated_products"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-listing__intro">{$intro|escape}</p>
    {/if}
    {if $listing}
      <div class="pb-listing__grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">Выберите товары в инспекторе секции.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/curated_products.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
