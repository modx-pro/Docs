---
title: "Сетка товаров"
description: "Витрина товаров категории miniShop3 через msProducts. Слой Pro."
---

# Сетка товаров

Классическая сетка интернет-магазина: карточки с фото, ценой, бейджами и кнопкой «В корзину». Товары из выбранной категории.

<!-- ![Сетка товаров](/components/pagebuilder/screenshots/sections/products_grid.png) -->

::: info
Требуются PageBuilder Pro и miniShop3.
:::

## Зачем эта секция

- msProducts внутри chunk: цены и корзина из miniShop3
- Категория и лимит меняет редактор
- Не нужен отдельный вызов сниппета на странице

## Где применять

- **Главная магазина** — хиты или новинки категории
- **Лендинг коллекции** — товары одной линейки
- **Страница акции** — товары со скидкой в категории

## Примеры страниц

- Главная магазина: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)
- Коллекция: [Promo banner](promo_banner) → [Products grid](products_grid) → [Brands row](brands_row)

## Что заполнить

**Родительская категория** — msCategory. **Лимит** и **Сортировка** как в msProducts. Нужен установленный miniShop3.

## Похожие секции

- [Карусель товаров](products_carousel) для узкой полосы
- [Подборка](curated_products) для ручного списка SKU

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `products_grid` |
| Слой | Pro |
| Категория | магазин (`commerce`) |
| Chunk | `pagebuilderpro_products_grid` |
| Требования | pro, minishop3 |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Корень каталога (`parent`)

Тип [relation](../fields/relation#vyvod-v-section-data). Обязательное. Выбор одного ресурса MODX в модальном окне поиска.

### Лимит (`limit`)

Тип [number](../fields/number#vyvod-v-section-data). Необязательное.

### Сортировка (`sortby`)

Тип [select](../fields/select#vyvod-v-section-data). Необязательное. Выпадающий список с заранее заданными вариантами.

## Что видит посетитель

Сетка `pb-products-grid` через msProducts.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "limit": 6,
  "sortby": "menuindex"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_products_grid`:

```fenom
{var $catalogParent = $parent.id|default:($parent_id|default:0)}
{var $listing = ''}
{if $catalogParent}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => $catalogParent,
    'depth' => 10,
    'limit' => $limit|default:12,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1,
    'sortby' => $ms_sortby|default:'msProduct.menuindex',
    'sortdir' => $ms_sortdir|default:'ASC'
  ])}
{/if}
<section class="pb-section pb-section--products-grid pb-products-grid pb-listing{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="products_grid"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-listing__grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">В этой категории пока нет товаров.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/products_grid.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
