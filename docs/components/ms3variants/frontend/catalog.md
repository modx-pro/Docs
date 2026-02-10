---
title: Каталог товаров
---
# Каталог товаров

Вывод вариантов в карточках каталога с использованием SSR (Server-Side Rendering).

## Подключение вариантов

Для загрузки вариантов в каталоге используйте параметр `usePackages`:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'ms3_products_row_variants'
]}
```

## Чанк ms3_products_row_variants

В комплекте идёт готовый чанк для карточки товара с вариантами:

```fenom
<div class="product-card" data-product-id="{$id}">
    {* Изображение *}
    <div class="product-image">
        <img src="{$thumb}" class="product-image" alt="{$pagetitle}">
    </div>

    {* Название *}
    <h3><a href="/{$id | url}">{$pagetitle}</a></h3>

    {if $has_variants}
        {* ========== ТОВАР С ВАРИАНТАМИ ========== *}
        <div class="ms3v-catalog" data-product-id="{$id}">

            {* Селектор вариантов *}
            <select class="ms3v-select">
                {foreach $variants as $idx => $variant}
                    {set $label = ''}
                    {foreach $variant.options_array as $optVal}
                        {if $label}{set $label = $label ~ ', '}{/if}
                        {set $label = $label ~ $optVal}
                    {/foreach}
                    <option value="{$variant.id}" {if $idx == 0}selected{/if}>
                        {$label} — {$variant.price | number : 0 : ',' : ' '} ₽
                    </option>
                {/foreach}
            </select>

            {* Блоки вариантов *}
            {foreach $variants as $idx => $variant}
                {set $variantImage = $variant.small ?: $variant.image_url}
                <div class="ms3v-variant-block"
                     data-variant-id="{$variant.id}"
                     data-variant-image="{$variantImage}"
                     {if $idx > 0}style="display:none"{/if}>

                    {* Цена *}
                    <div class="variant-price">
                        {if $variant.old_price > $variant.price}
                            <span class="old-price">{$variant.old_price | number} ₽</span>
                        {/if}
                        <span class="current-price">{$variant.price | number} ₽</span>
                    </div>

                    {* Форма добавления *}
                    {set $variantOptions = ["_variant_id" => $variant.id]}
                    <form method="post" class="ms3_form">
                        <input type="hidden" name="id" value="{$id}">
                        <input type="hidden" name="count" value="1">
                        <input type="hidden" name="options" value='{$variantOptions | json_encode}'>
                        <input type="hidden" name="ms3_action" value="cart/add">

                        <button type="submit" {if !$variant.in_stock}disabled{/if}>
                            В корзину
                        </button>
                    </form>
                </div>
            {/foreach}
        </div>

    {else}
        {* ========== ТОВАР БЕЗ ВАРИАНТОВ ========== *}
        <div class="product-price">{$price} ₽</div>

        <form method="post" class="ms3_form">
            <input type="hidden" name="id" value="{$id}">
            <input type="hidden" name="count" value="1">
            <input type="hidden" name="options" value="{}">
            <input type="hidden" name="ms3_action" value="cart/add">
            <button type="submit">В корзину</button>
        </form>
    {/if}
</div>
```

## Переключение вариантов

### Модуль ProductCardUI

В комплекте идёт JavaScript модуль для переключения вариантов в каталоге:

```fenom
<script src="{'assets_url' | option}components/ms3variants/js/web/ProductCardUI.js"></script>
```

Модуль автоматически:
- Обрабатывает изменение селектора `.ms3v-select`
- Показывает/скрывает блоки `.ms3v-variant-block`
- Переключает изображение в карточке товара

### Переключение изображения

При выборе варианта изображение карточки обновляется автоматически, если:
1. У блока варианта есть атрибут `data-variant-image`
2. В карточке есть элемент `.product-image`

```fenom
<div class="ms3v-variant-block"
     data-variant-id="{$variant.id}"
     data-variant-image="{$variant.small}">
```

### С эскизами изображений

Для корректной работы переключения изображений передайте `includeThumbs`:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium',
    'tpl' => 'ms3_products_row_variants'
]}
```

В данных варианта появятся поля `small`, `medium` с URL эскизов.

## Плейсхолдеры товара

При использовании `usePackages => 'ms3Variants'` добавляются:

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$has_variants}` | bool | Есть ли варианты |
| `{$variants_count}` | int | Количество вариантов |
| `{$variants}` | array | Массив вариантов |
| `{$variants_json}` | string | JSON вариантов |

## Структура варианта

```php
[
    'id' => 1,
    'sku' => 'ABC-123-red',
    'price' => 1500.00,
    'old_price' => 2000.00,
    'count' => 10,
    'in_stock' => true,
    'image_url' => '/assets/images/42/product.jpg',
    'small' => '/assets/images/42/small/product.jpg',
    'options_array' => [
        'color' => 'Красный',
        'size' => 'XL'
    ]
]
```

## Фильтрация по наличию

Настройка `ms3variants_show_out_of_stock` влияет на отображение:

**При `true` (по умолчанию):**
- Все варианты отображаются
- У вариантов без остатков кнопка заблокирована

**При `false`:**
- Варианты без остатков скрыты
- Если у товара нет доступных вариантов, `has_variants = false`

## Минимальный чанк

Простейший чанк с вариантами:

```fenom
<div class="product" data-product-id="{$id}">
    <a href="/{$id | url}">
        <img src="{$thumb}" alt="{$pagetitle}">
        <h3>{$pagetitle}</h3>
    </a>

    {if $has_variants}
        <select class="ms3v-select" onchange="this.form.elements.options.value = JSON.stringify({_variant_id: this.value})">
            {foreach $variants as $v}
                <option value="{$v.id}">{$v.options_array | join : ', '} — {$v.price} ₽</option>
            {/foreach}
        </select>

        <form method="post" class="ms3_form">
            <input type="hidden" name="id" value="{$id}">
            <input type="hidden" name="options" value='{["_variant_id" => $variants[0].id] | json_encode}'>
            <input type="hidden" name="ms3_action" value="cart/add">
            <button type="submit">В корзину</button>
        </form>
    {else}
        <span class="price">{$price} ₽</span>
        <form method="post" class="ms3_form">
            <input type="hidden" name="id" value="{$id}">
            <input type="hidden" name="ms3_action" value="cart/add">
            <button type="submit">В корзину</button>
        </form>
    {/if}
</div>
```

## Производительность

Варианты загружаются одним SQL-запросом для всех товаров страницы через событие `msOnProductsLoad`. Это обеспечивает высокую производительность даже при большом количестве товаров.

::: tip Оптимизация
Параметр `usePackages` загружает варианты только когда он указан. На страницах где варианты не нужны (главная, лендинги) не указывайте этот параметр.
:::
