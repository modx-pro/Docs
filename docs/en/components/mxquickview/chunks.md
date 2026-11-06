---
title: Чанки
description: Чанки mxqv_product и mxqv_resource для отрисовки контента в quick view
---
<!-- TODO: translate from docs/components/mxquickview/chunks.md -->


# Чанки

Компонент включает два готовых чанка для быстрой отрисовки контента в модальном окне.

## mxqv_product

**Path:** `core/components/mxquickview/elements/chunks/mxqv_product.tpl`

**Purpose:** Render product card in quick view. Uses Fenom syntax (requires pdoTools).

**Chunk source code:**

```fenom
<div class="qv-product"
    data-ms3-product-id="{$id}"
    data-mxqv-variants="{$has_variants}"
    data-mxqv-variants-json="{$variants_json|escape:'html'}"
    itemscope itemtype="http://schema.org/Product">
    <div class="qv-product__inner">
        <div class="qv-product__row">
            <div class="qv-product__image">
                <img class="qv-product__thumb"
                    src="{if $thumb}{$thumb}{else}{$assets_url}components/minishop3/img/web/ms3_small.png{/if}"
                    alt="{$pagetitle}"
                    itemprop="image"
                    loading="lazy">
            </div>
            <div class="qv-product__info">
                <h3 class="qv-product__title" itemprop="name">{$pagetitle}</h3>
                {if $article}
                    <p class="qv-product__article">Арт. {$article}</p>
                {/if}
                <div class="qv-product__desc">{$description}</div>
                <div class="qv-product__price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                    <span class="qv-product__price-old">{$old_price}</span>
                    <span class="qv-product__price-current" itemprop="price" content="{$price}" data-mxqv-price>{$price}</span>
                    <meta itemprop="priceCurrency" content="RUB">
                </div>
                <form method="post" class="ms3_form ms3-add-to-cart qv-product__form" data-ms3-form data-cart-state="add">
                    <input type="hidden" name="id" value="{$id}">
                    <input type="hidden" name="count" value="1">
                    <input type="hidden" name="options" value="[]">
                    <input type="hidden" name="ms3_action" value="cart/add">
                    <div class="qv-product__variants">{$variants_html}</div>
                    <button type="submit" class="qv-product__btn-cart">В корзину</button>
                </form>
                <a href="{$id | url}" class="qv-product__link-more">Подробнее</a>
            </div>
        </div>
    </div>
</div>
```

**Входные данные:**

| Переменная | Тип | Описание |
| --- | --- | --- |
| `$id` | int | ID ресурса/товара |
| `$pagetitle` | string | Название товара |
| `$price` | float | Цена |
| `$old_price` | float | Старая цена |
| `$image` | string | URL изображения |
| `$introtext` | string | Краткое описание |
| `$content` | string | Полное описание |
| `$vendor` | string | Производитель |
| `$article` | string | Артикул |
| `$weight` | float | Вес |
| `$remains` | int | Остаток на складе |
| `$variants_html` | string | HTML выбора вариантов (если ms3Variants) |
| `$variants_json` | string | JSON вариантов для JS |
| `$has_variants` | bool | Есть ли варианты |

**Пример использования:**

::: code-group

```fenom
{'mxqv_product' | chunk : [
  'id' => $product.id,
  'pagetitle' => $product.pagetitle,
  'price' => $product.price,
  'image' => $product.image,
]}
```

```modx
[[!pdoFetch?
  &tpl=`mxqv_product`
  &resources=`[[+id]]`
]]
```

:::

## mxqv_resource

**Path:** `core/components/mxquickview/elements/chunks/mxqv_resource.tpl`

**Purpose:** Render arbitrary resource (non-product) in quick view.

**Chunk source code:**

```fenom
<div class="qv-resource" data-mxqv-id="{$id}">
    <div class="qv-resource__inner">
        <h3 class="qv-resource__title">{$pagetitle}</h3>
        {if $introtext}
            <div class="qv-resource__intro">{$introtext}</div>
        {/if}
        <div class="qv-resource__content">{$content}</div>
        <a href="{$id | url}" class="qv-resource__link">Подробнее</a>
    </div>
</div>
```

**Входные данные:**

| Переменная | Тип | Описание |
| --- | --- | --- |
| `$id` | int | ID ресурса |
| `$pagetitle` | string | Заголовок |
| `$introtext` | string | Вступление |
| `$content` | string | Контент |
| `$image` | string | Изображение |
| `$publishedon` | string | Дата публикации |
| `$author` | string | Автор |

**Пример использования:**

```fenom
{'mxqv_resource' | chunk : [
  'id' => $resource.id,
  'pagetitle' => $resource.pagetitle,
  'content' => $resource.content,
]}
```

## Добавление своих чанков

1. Создайте чанк в `core/components/mxquickview/elements/chunks/` или в админке MODX.
2. Добавьте имя чанка в белый список: **Системные настройки** → `mxquickview_allowed_chunk`.
3. Используйте в триггере: `data-mxqv-action="chunk" data-mxqv-element="ваш_чанк"`.

::: tip
Для ресурсов, не являющихся товарами, обязательно добавьте `mxqv_resource` в `mxquickview_allowed_chunk`.
:::
