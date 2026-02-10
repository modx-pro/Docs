---
title: Страница товара
---
# Страница товара

Вывод и выбор вариантов на странице товара.

## Базовый вывод

```fenom
{'msProductVariants' | snippet}
```

Сниппет выводит:
- Список вариантов
- Скрытое поле для выбранного варианта
- Подключает JS и CSS

## Чанки по умолчанию

### ms3_variants (обёртка)

```fenom
{if $variants?}
    <div class="ms3-variants"
         id="ms3variants-{$product_id}"
         data-ms3v-init
         data-ms3v-product-id="{$product_id}">

        {* Скрытое поле для ID варианта *}
        <input type="hidden" name="_variant_id" data-ms3v-variant-id value="">

        {* Список вариантов *}
        <div class="ms3-variants-list">
            {$rows}
        </div>
    </div>
{/if}
```

### ms3_variants_row (строка варианта)

```fenom
<div class="ms3-variant-row {if !$in_stock}ms3-variant-out-of-stock{/if}"
     data-ms3v-variant="{$id}"
     data-variant-price="{$price}"
     data-variant-old-price="{$old_price}"
     data-variant-count="{$count}"
     data-variant-sku="{$sku}">

    {* Изображение *}
    {if $image_url?}
        <div class="ms3-variant-image">
            <img src="{$image_url}" alt="{$sku}" loading="lazy">
        </div>
    {/if}

    {* Опции *}
    <div class="ms3-variant-options">
        {foreach $options as $opt}
            <span class="ms3-variant-option">{$opt.value}</span>
        {/foreach}
    </div>

    {* Цена *}
    <div class="ms3-variant-price">
        {if $old_price > 0}
            <span class="ms3-variant-old-price">{$old_price}</span>
        {/if}
        <span class="ms3-variant-current-price">{$price}</span>
    </div>

    {* Наличие *}
    <div class="ms3-variant-stock">
        {if $in_stock}
            <span class="ms3-variant-in-stock">В наличии: {$count}</span>
        {else}
            <span class="ms3-variant-out">Нет в наличии</span>
        {/if}
    </div>
</div>
```

## Интеграция с формой корзины

Варианты должны находиться внутри формы добавления в корзину:

```fenom
<form method="post" class="ms3_form" data-ms-form>
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="{}">

    {* Варианты *}
    {'msProductVariants' | snippet}

    <button type="submit" name="ms3_action" value="cart/add">
        В корзину
    </button>
</form>
```

При выборе варианта JavaScript автоматически:
1. Заполняет скрытое поле `_variant_id`
2. Обновляет поле `options` с данными варианта
3. Обновляет отображаемую цену (если настроено)

## JavaScript API

### Инициализация

JavaScript инициализируется автоматически для элементов с `data-ms3v-init`.

Для ручной инициализации:

```javascript
const variants = new ms3Variants({
    productId: 42,
    containerId: 'ms3variants-42',
    onSelect: function(variantData) {
        console.log('Выбран вариант:', variantData);
    }
});
```

### Методы

```javascript
// Получить текущий выбранный вариант
const current = variants.currentVariant;

// Выбрать вариант программно
variants.selectVariant(variantId);

// Получить данные варианта
const data = variants.getVariantData(variantId);
```

### События

При выборе варианта генерируется событие:

```javascript
document.addEventListener('ms3variants:selected', function(e) {
    console.log('Product ID:', e.detail.productId);
    console.log('Variant ID:', e.detail.variantId);
    console.log('Price:', e.detail.price);
    console.log('Options:', e.detail.options);
});
```

## Интеграция с галереей

При выборе варианта генерируется событие для переключения изображения в галерее:

```javascript
document.addEventListener('ms3variants:image-change', function(e) {
    console.log('Image URL:', e.detail.imageUrl);
    console.log('File ID:', e.detail.fileId);
});
```

### Адаптер для Splide

В комплекте есть адаптер для галереи Splide:

```fenom
{* Подключение адаптера *}
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/splide-adapter.js"></script>
```

Адаптер автоматически:
- Слушает событие `ms3variants:image-change`
- Находит слайд с нужным изображением
- Переключает галерею на этот слайд

### Адаптер для GLightbox

```fenom
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/glightbox-adapter.js"></script>
```

### Кастомная интеграция

Для других галерей подпишитесь на событие:

```javascript
document.addEventListener('ms3variants:image-change', function(e) {
    const imageUrl = e.detail.imageUrl;

    // Ваш код переключения галереи
    myGallery.goToSlide(imageUrl);
});
```

## Обновление цены на странице

При выборе варианта можно обновлять цену:

```javascript
document.addEventListener('ms3variants:selected', function(e) {
    const priceEl = document.querySelector('.product-price');
    if (priceEl) {
        priceEl.textContent = e.detail.price + ' ₽';
    }

    const oldPriceEl = document.querySelector('.product-old-price');
    if (oldPriceEl && e.detail.oldPrice > 0) {
        oldPriceEl.textContent = e.detail.oldPrice + ' ₽';
        oldPriceEl.style.display = 'block';
    } else if (oldPriceEl) {
        oldPriceEl.style.display = 'none';
    }
});
```

## Селекторы опций

Для создания интерфейса с отдельными селекторами опций (вместо списка вариантов):

```fenom
{set $data = 'msProductVariants' | snippet : ['returnData' => 1]}

{if $data.total > 0}
    <div class="variant-selectors" data-ms3v-selectors>
        {foreach $data.available_options as $key => $values}
            <div class="variant-option-group">
                <label>{$key}</label>
                <select data-option-key="{$key}">
                    <option value="">Выберите {$key}</option>
                    {foreach $values as $value}
                        <option value="{$value}">{$value}</option>
                    {/foreach}
                </select>
            </div>
        {/foreach}
    </div>

    <input type="hidden" name="_variant_id" data-ms3v-variant-id>
{/if}
```

JavaScript для обработки селекторов:

```javascript
document.querySelectorAll('[data-option-key]').forEach(select => {
    select.addEventListener('change', findMatchingVariant);
});

function findMatchingVariant() {
    const selected = {};
    document.querySelectorAll('[data-option-key]').forEach(select => {
        if (select.value) {
            selected[select.dataset.optionKey] = select.value;
        }
    });

    // Найти вариант с такими опциями
    // и установить его ID в скрытое поле
}
```
