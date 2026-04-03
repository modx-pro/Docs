---
title: Интеграция на сайт
---
# Интеграция на сайт

Документ рассчитан на две роли:

- **Менеджер**: что включить и где проверить результат.
- **Разработчик**: как правильно подключить сниппеты в Fenom и стандартном MODX.

## 1. Подключение ресурсов (обязательно)

В шаблоне (или общем head/footer) подключите **сначала** лексикон, затем CSS и JS.

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js" defer></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js" defer></script>
```

:::

## 2. Блок в карточке товара: «С этим товаром покупают»

Для менеджера: после добавления вызова на карточке товара должен появиться блок рекомендаций. Если товаров нет, блок не выводится.

::: code-group

```fenom
{set $buyTogether = 'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
{if $buyTogether != ''}
<section class="product-set">
  <h2>{'ms3productsets_type_buy_together' | lexicon}</h2>
  {$buyTogether}
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
  <h2>[[%ms3productsets_type_buy_together? &namespace=`ms3productsets` &topic=`default`]]</h2>
  [[+msps_buy_together]]
</section>
`]]
```

:::

## 3. Авто-рекомендации по категории

Для менеджера: удобно для главной страницы или лендинга, когда нужен блок из конкретной категории.

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

Для менеджера:

1. Заполните системную настройку `ms3productsets.vip_set_1` (`1,2,3,...`).
2. Убедитесь, что товары опубликованы.

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

## 5. Пустой результат: скрыть блок или показать `emptyTpl`

По умолчанию `hideIfEmpty=true` и сниппет вернёт пустую строку.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'hideIfEmpty' => false,
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

## 6. AJAX-рендер блока (через JS API)

Логика `render()` одна и та же; в шаблоне отличается подстановка `resource_id` и разметка контейнера.

::: code-group

```fenom
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      resource_id: {$_modx->resource.id},
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

```modx
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      resource_id: [[*id]],
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

:::

На страницах без текущего ресурса (главная и т.п.) передайте `resource_id: 0` или не передавайте поле — см. [API](api).

## 7. Кнопка «В корзину» в карточке подборки

Текст кнопки — из лексикона MiniShop3 (`ms3_cart_add`), как в чанке **tplSetItem**.

::: code-group

```fenom
<button type="button" data-add-to-cart="{$id}" data-count="1">{'ms3_cart_add' | lexicon}</button>
```

```modx
<button type="button" data-add-to-cart="[[+id]]" data-count="1">[[%ms3_cart_add? &namespace=`minishop3` &topic=`default`]]</button>
```

:::

`productsets.js` обработает клик и отправит запрос в `connector.php`.

## 8. Кнопка «Добавить весь набор»

Кнопка с атрибутом `data-add-set` добавляет все товары подборки в корзину. Входит в чанки **tplSetVIP** и **tplSetWrapper** (при `count > 0`).

Контейнер подборки должен содержать элементы с `data-product-id` (карточки из tplSetItem). JS находит контейнер от кнопки (`.msps__vip-set`, `.msps__wrapper`) и последовательно вызывает `addToCart` для каждого товара.

::: code-group

```fenom
<button type="button" class="msps__add-all-button" data-add-set="1">
  {'msproductsets_add_all_to_cart' | lexicon}
</button>
```

```modx
<button type="button" class="msps__add-all-button" data-add-set="1">
  [[%msproductsets_add_all_to_cart? &namespace=`ms3productsets` &topic=`default`]]
</button>
```

:::

Текст кнопки должен браться из лексикона компонента (`ms3productsets`, топик `default`), а не храниться в шаблоне в явном виде.

## Чек-лист после внедрения

- На странице подключены `mspsLexiconScript`, `productsets.css`, `productsets.js`.
- Сниппет `ms3ProductSets` вызывается с корректным `resource_id` или `category_id`.
- Товары опубликованы и доступны в текущем контексте.
- Для типа `vip` задан `vip_set_1` или ручные связи в таблице подборок.
