---
title: "Подборка товаров"
description: "Фиксированный список товаров, выбранных вручную в инспекторе. Слой Pro."
---

# Подборка товаров

В отличие от **Сетки товаров**, здесь нет привязки к одной категории: вы отмечаете конкретные ID в multirelation.

![Подборка товаров](/components/pagebuilder/screenshots/sections/curated_products.jpg)

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Чем отличается от сетки

- Точный список SKU, порядок как в multirelation
- Не зависит от одной категории
- Карточки через общий tpl `pagebuilderpro_ms3_product_row`, как у [сетки товаров](products_grid)

## Сценарии подборки

- В блоке «Рекомендуем» на главной
- Для новинок: ручной список без фильтра категории
- Для комплекта или bundle на лендинге

## Примеры страниц

- Главная: [Curated products](curated_products) «Рекомендуем» → [Products grid](products_grid) «Каталог»
- Лендинг: [Hero](hero) → [Curated products](curated_products) → [CTA](cta)

## Multirelation товаров

Поиск товаров идёт в `mgr/ms3/products/search`. Поле `products` обязательно. Тип помечен `"cacheable": false`.

На рендере `ProSectionRenderSupport` собирает `curated_product_ids`: не больше 12 id через запятую, в порядке выбора. Chunk передаёт эту строку в `msProducts` (`parents` = 0). Пустой список показывает «Выберите товары в инспекторе секции.»

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
  "intro": "Краткое вступление перед основным содержимым."
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_curated_products`:

```fenom
{set $resourceIds = $curated_product_ids|default:''}
{set $listing = ''}
{if $resourceIds}
  {set $listing = $modx->runSnippet('msProducts', [
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
      <p class="pb-listing__empty">{'pagebuilder_fe_listing_empty_curated' | lexicon}</p>
    {/if}
  </div>
</section>
```

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
