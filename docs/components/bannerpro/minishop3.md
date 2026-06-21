---
title: MiniShop3
description: "Интеграция BannerPro с MiniShop3: productId, product-плейсхолдеры и атрибуция заказа"
---

# MiniShop3

BannerPro работает без MiniShop3. Если магазин установлен, компонент привязывает баннер к товару, добавляет `product_*` плейсхолдеры и связывает клик с заказом.

## Требования

| Компонент | Для чего |
| --- | --- |
| MiniShop3 | Товары `msProduct` и события заказа |
| pdoTools | `BannerPro` и `msProducts` |
| Плагин `BannerProMiniShop3` | Плейсхолдеры в каталоге и атрибуция заказа |

Плагин **BannerProMiniShop3** выключен по умолчанию. Включите его в **Элементы → Плагины**.

## Привязка баннера к товару

В таблице `bannerpro_ads` поле `product_id` хранит ID ресурса `msProduct`.

| Значение | Поведение |
| --- | --- |
| `0` или пусто | Баннер глобальный |
| `> 0` | Баннер связан с конкретным товаром |

На карточке товара передайте `productId`. Сниппет покажет глобальные баннеры и баннеры с таким же `product_id`.

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'shop-product-sidebar',
  'productId' => $_modx->resource.id,
  'tpl' => 'byAdProduct',
  'limit' => 3
]}
```

```modx
[[!BannerPro?
  &positionName=`shop-product-sidebar`
  &productId=`[[*id]]`
  &tpl=`byAdProduct`
  &limit=`3`
]]
```

:::

На каталоге и главной `productId` не передавайте. Там выводятся глобальные баннеры.

## Плейсхолдеры товара

`BannerPro` загружает товары одним batch-запросом и добавляет плейсхолдеры в строку баннера.

| Плейсхолдер | Источник |
| --- | --- |
| `product_id` | ID товара |
| `product_title` | `pagetitle` |
| `product_url` | Полный URL товара |
| `product_price` | TV `price` |
| `product_old_price` | TV `old_price` |
| `product_thumb` | TV `thumb` или `image` |

Пример чанка:

::: code-group

```fenom
<div class="bannerpro-ad bannerpro-ad--product">
  {if $product_thumb}
    <a href="/{$bannerpro_click}/{$adposition}" class="bannerpro-ad__image">
      <img src="{$product_thumb}" alt="{$product_title|escape}" loading="lazy" />
    </a>
  {elseif $image}
    <a href="/{$bannerpro_click}/{$adposition}" class="bannerpro-ad__image">
      <img src="{$image}" alt="{$name|escape}" loading="lazy" />
    </a>
  {/if}
  <div class="bannerpro-ad__body">
    {if $product_title}
      <div class="bannerpro-ad__title">{$product_title|escape}</div>
      {if $product_price}
        <div class="bannerpro-ad__price">
          {if $product_old_price}<s>{$product_old_price}</s>{/if}
          <span>{$product_price}</span>
        </div>
      {/if}
    {else}
      <div class="bannerpro-ad__title">{$name|escape}</div>
    {/if}
    {if $description}<p class="bannerpro-ad__text">{$description|escape}</p>{/if}
  </div>
</div>
```

```modx
<div class="bannerpro-ad bannerpro-ad--product">
  [[+product_thumb:notempty=`
    <a href="/[[++bannerpro_click]]/[[+adposition]]" class="bannerpro-ad__image">
      <img src="[[+product_thumb]]" alt="[[+product_title]]" loading="lazy" />
    </a>
  `]]
  [[+product_thumb:empty=`
    [[+image:notempty=`
      <a href="/[[++bannerpro_click]]/[[+adposition]]" class="bannerpro-ad__image">
        <img src="[[+image]]" alt="[[+name]]" loading="lazy" />
      </a>
    `]]
  `]]
  <div class="bannerpro-ad__body">
    [[+product_title:notempty=`
      <div class="bannerpro-ad__title">[[+product_title]]</div>
      [[+product_price:notempty=`
        <div class="bannerpro-ad__price">
          [[+product_old_price:notempty=`<s>[[+product_old_price]]</s>`]]
          <span>[[+product_price]]</span>
        </div>
      `]]
    `]]
    [[+product_title:empty=`<div class="bannerpro-ad__title">[[+name]]</div>`]]
    [[+description:notempty=`<p class="bannerpro-ad__text">[[+description]]</p>`]]
  </div>
</div>
```

:::

## Позиции магазина

| Позиция | Где вызывать | `productId` | Назначение |
| --- | --- | --- | --- |
| `shop-catalog-top` | Категория или `msProducts` | нет | Промо над листингом |
| `shop-catalog-inline` | Между рядами каталога | нет | Баннер в сетке |
| `shop-product-sidebar` | Карточка товара | да | Допродажи и аксессуары |
| `shop-product-below` | Под блоком покупки | да | Кросс-селл |
| `shop-cart-top` | Корзина | нет | Доставка или промокод |
| `shop-checkout-sidebar` | Оформление заказа | нет | Доверие и оплата |
| `shop-home-hero` | Главная магазина | нет | Главный промо-блок |

## Каталог msProducts

Если чанк `msProducts` использует данные BannerPro, передайте `usePackages`.

::: code-group

```fenom
{'!msProducts' | snippet : [
  'parents' => 10,
  'tpl' => 'tpl.msProducts.row',
  'usePackages' => 'bannerpro'
]}
```

```modx
[[!msProducts?
  &parents=`10`
  &tpl=`tpl.msProducts.row`
  &usePackages=`bannerpro`
]]
```

:::

Плагин **BannerProMiniShop3** использует события:

| Событие | Роль |
| --- | --- |
| `msOnProductPrepare` | Добавляет `bannerpro_*` к данным товара |
| `msOnProductsLoad` | Загружает баннеры для списка товаров без N+1 |
| `msOnSubmitOrder` | Связывает клик по баннеру с заказом |

## Атрибуция клик → заказ

1. Посетитель кликает по баннеру.
2. `BannerProClickout` пишет запись в `bannerpro_clicks`.
3. Компонент сохраняет cookie `bannerpro_click_id`.
4. При оформлении заказа `msOnSubmitOrder` записывает ID заказа в поле `order_id`.
5. Админка показывает заказы в колонках **Заказы** и в статистике.

Срок cookie задаёт `bannerpro_attribution_ttl`, по умолчанию 30 дней.

## Диагностика

| Симптом | Что проверить |
| --- | --- |
| Баннер товара не появляется | `productId`, `product_id` у баннера, активность и даты |
| `product_*` пустые | Товар опубликован, TV `price`, `old_price`, `thumb` или `image` заполнены |
| Пикер товара не находит запись | MiniShop3 установлен, ресурс имеет `class_key = msProduct` |
| Заказ не связан с кликом | Плагин `BannerProMiniShop3`, событие `msOnSubmitOrder`, cookie `bannerpro_click_id` |
