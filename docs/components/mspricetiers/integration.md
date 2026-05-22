---
title: Интеграция и сценарии
description: Шаблон товара, корзина, каталог, ms3Variants, категорийные пороги
---

# Интеграция и сценарии

Пошаговые сценарии для витрины MiniShop3.

| Тема | Раздел |
|------|--------|
| Карточка товара | [Шаблон msProduct](#шаблон-товара-msproduct) |
| ms3Variants | [Интеграция с ms3Variants](#ms3variants) |
| Корзина | [Корзина](#корзина) |
| Каталог | [Страница категории](#страница-категории) |
| Каскад цен | [Наследование от категории](#наследование-от-категории) |

## Шаблон товара (msProduct)

::: code-group

```fenom
{'!msPriceTiers.initialize' | snippet}

<article class="product" data-product-id="{$_modx->resource.id}">
  <h1>{$_modx->resource.pagetitle}</h1>

  <div class="product-price">
    <span class="mspricetiers-cost">{$price} ₽</span>
    {if $old_price > 0}
      <span class="mspricetiers-old-cost">{$old_price} ₽</span>
    {/if}
  </div>

  <form method="post" class="ms3_form mspricetiers-form">
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="number" name="count" class="mspricetiers-quantity" value="1" min="1">
    <button type="submit" name="ms3_action" value="cart/add">В корзину</button>
  </form>

  <section>
    <h3>{'mspricetiers_price_tiers' | lexicon}</h3>
    {'!msPriceTiers' | snippet : ['product' => $_modx->resource.id]}
  </section>

  {'!msPriceTiersProgress' | snippet : ['product' => $_modx->resource.id]}
</article>
```

```modx
[[!msPriceTiers.initialize]]

<article class="product" data-product-id="[[*id]]">
  <h1>[[*pagetitle]]</h1>

  <div class="product-price">
    <span class="mspricetiers-cost">[[+price]] ₽</span>
    [[+old_price:notempty=`<span class="mspricetiers-old-cost">[[+old_price]] ₽</span>`]]
  </div>

  <form method="post" class="ms3_form mspricetiers-form">
    <input type="hidden" name="id" value="[[*id]]">
    <input type="number" name="count" class="mspricetiers-quantity" value="1" min="1">
    <button type="submit" name="ms3_action" value="cart/add">В корзину</button>
  </form>

  <section>
    <h3>[[%mspricetiers_price_tiers]]</h3>
    [[!msPriceTiers? &product=`[[*id]]`]]
  </section>

  [[!msPriceTiersProgress? &product=`[[*id]]`]]
</article>
```

:::

## ms3Variants

При **`mspricetiers_integrate_ms3variants`** = Да:

1. Покупатель выбирает вариант (цвет, размер).
2. Базовая цена = цена варианта из `ms3_product_variants`.
3. Пороги применяются к этой базе.
4. Смена варианта → событие `ms3variants:selected` → пересчёт в `mspricetiers.js`.

На странице должна быть стандартная разметка [ms3Variants](/components/ms3variants/): форма `.ms3variants-product-{id}`, поле `_variant_id` в `options` при добавлении в корзину.

В AJAX `price` можно передать `variant_id` — см. [AJAX API](api).

## Корзина

Цены в корзине обновляет плагин `mspricetiers_events` при **`mspricetiers_apply_in_cart`** = Да.

Прогресс по всей корзине:

::: code-group

```fenom
{'!msPriceTiersProgress' | snippet : ['cart' => 1, 'tpl' => 'mspricetiers.progress_cart']}
```

```modx
[[!msPriceTiersProgress?
  &cart=`1`
  &tpl=`mspricetiers.progress_cart`
]]
```

:::

## Страница категории

В начале шаблона категории:

::: code-group

```fenom
{'!msPriceTiers.initialize' | snippet}
{'!msProducts' | snippet : ['parents' => $_modx->resource.id, 'tpl' => 'tpl.Product.row']}
```

```modx
[[!msPriceTiers.initialize]]
[[!msProducts?
  &parents=`[[*id]]`
  &tpl=`tpl.Product.row`
]]
```

:::

В чанке строки каталога — опционально компактная таблица или бейдж «Оптовые цены» (`mspricetiers.badge`).

## Наследование от категории

1. Задайте пороги на **категории** ([Управление порогами](manager#категорийные-пороги)).
2. Товары без своих порогов получат эту сетку автоматически.
3. Для отдельного товара — свои пороги на вкладке товара (перекрывают категорию).

## Условный вывод по группам

::: code-group

```fenom
{set $userGroups = $_pls['user_groups'] ?: []}
{if 2 in $userGroups}
  {'!msPriceTiers' | snippet : ['product' => $_modx->resource.id]}
{else}
  <p>Розничная цена: {$price} ₽</p>
{/if}
```

```modx
[[!+user_groups:contains=`2`:then=`
  [[!msPriceTiers? &product=`[[*id]]`]]
`:else=`
  <p>Розничная цена: [[+price]] ₽</p>
`]]
```

:::

Группы в плейсхолдере зависят от настройки MODX / дополнений; при необходимости получите группы отдельным сниппетом.

## Проверка интеграции

| Действие | Ожидание |
|----------|----------|
| Товар, qty &lt; первого порога | Базовая / цена варианта |
| qty ≥ порога | Цена порога, подсветка строки в таблице |
| Корзина, 10+ шт. | Позиция с tier-ценой |
| Смена варианта | Пересчёт без перезагрузки |

## См. также

- [Быстрый старт](quick-start)
- [Подключение на сайте](frontend)
- [Управление порогами](manager)
