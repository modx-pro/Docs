---
title: Интеграция на сайт
---
# Интеграция на сайт

## 1. Подключение ресурсов (обязательно)

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js"></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js"></script>
```

:::

## 2. Блок на карточке товара

::: code-group

```fenom
{set $msps_buy_together = 'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
{if $msps_buy_together}
<section class="product-set">
  <h2>С этим товаром покупают</h2>
  {$msps_buy_together}
</section>
{/if}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
  &toPlaceholder=`msps_buy_together`
]]
[[+msps_buy_together:notempty=`
<section class="product-set">
  <h2>С этим товаром покупают</h2>
  [[+msps_buy_together]]
</section>
`]]
```

:::

## 3. Блок для главной или лендинга

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'auto',
  'category_id' => 5,
  'resource_id' => 0,
  'max_items' => 8,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`auto`
  &category_id=`5`
  &resource_id=`0`
  &max_items=`8`
  &tpl=`tplSetItem`
]]
```

:::

## 4. VIP-набор

1. Заполните `ms3productsets.vip_set_1`.
2. Выведите блок:

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'max_items' => 6,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &max_items=`6`
  &tpl=`tplSetVIP`
]]
```

:::

## 5. Управление пустым результатом

По умолчанию блок скрывается, если подборка пустая.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'hideIfEmpty' => 0,
  'emptyTpl' => 'tplSetEmpty'
]}
```

```modx
[[!ms3ProductSets?
  &type=`similar`
  &resource_id=`[[*id]]`
  &hideIfEmpty=`0`
  &emptyTpl=`tplSetEmpty`
]]
```

:::

## 6. AJAX-рендер через JS API

```html
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

## 7. Кнопка add-to-cart в карточке

::: code-group

```fenom
<button type="button" data-add-to-cart="{$id}" data-count="1">В корзину</button>
```

```modx
<button type="button" data-add-to-cart="[[+id]]" data-count="1">В корзину</button>
```

:::

`productsets.js` сам отправит запрос в `connector.php`.

## 8. Кнопка «Добавить весь набор»

Кнопка с атрибутом `data-add-set` добавляет все товары подборки в корзину. Используется в чанках **tplSetVIP** и **tplSetWrapper** (при `count > 0`). Контейнер подборки должен содержать элементы с `data-product-id` (карточки из tplSetItem). JS находит контейнер от кнопки (`.msps__vip-set`, `.msps__wrapper` или `[data-set-type]`) и последовательно вызывает `addToCart` для каждого товара.

::: code-group

```fenom
<button type="button" class="msps__add-all-button" data-add-set="1">
  {$_modx->lexicon('msproductsets_add_all_to_cart')}
</button>
```

```modx
<button type="button" class="msps__add-all-button" data-add-set="1">
  [[%msproductsets_add_all_to_cart]]
</button>
```

:::

## Чек-лист после внедрения

- На странице есть `mspsLexiconScript`, `productsets.css`, `productsets.js`.
- `ms3ProductSets` вызывается с корректным `resource_id` или `category_id`.
- Товары опубликованы и доступны в текущем контексте.
- Для `vip` заполнен `vip_set_1` или ручные связи в таблице.
