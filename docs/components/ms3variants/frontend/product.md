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
     data-variant-sku="{$sku}"
     data-variant-weight="{$weight}">

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

## Обновление данных на странице

При выборе варианта JavaScript автоматически обновляет элементы с `data-ms3v-*` атрибутами на странице:

| Атрибут | Описание | Обновляемое значение |
|---------|----------|---------------------|
| `data-ms3v-price` | Текущая цена | Форматированная цена варианта |
| `data-ms3v-old-price` | Старая цена | Показывается/скрывается автоматически |
| `data-ms3v-sku` | Артикул | SKU варианта |
| `data-ms3v-weight` | Вес | Показывается/скрывается автоматически |
| `data-ms3v-stock` | Остаток | Количество на складе |
| `data-ms3v-image` | Изображение | URL изображения варианта |
| `data-ms3v-field="{поле}"` | Произвольное поле | Значение из данных варианта |

### Пример разметки

Добавьте эти атрибуты к элементам в шаблоне страницы товара:

```fenom
{* Артикул — всегда в DOM, обновляется при выборе варианта *}
<span class="text-muted">Артикул: <strong data-ms3v-sku>{$article}</strong></span>

{* Цена *}
<div class="product-price">
    <div data-ms3v-old-price
         {if !$old_price || $old_price <= 0}style="display:none"{/if}>
        {if $old_price? && $old_price > 0}{$old_price} ₽{/if}
    </div>
    <div data-ms3v-price>
        {$price ?: 0} ₽
    </div>
</div>

{* Вес *}
<strong data-ms3v-weight>{$weight} кг</strong>
```

::: warning Элементы должны быть в DOM
Элемент с `data-ms3v-old-price` должен всегда присутствовать в HTML (не внутри `{if}`). JS сам управляет его видимостью через `style.display`. Если элемент обёрнут в Fenom-условие и не отрендерен — JS не сможет его обновить.
:::

В комплекте идёт пример шаблона страницы товара с уже расставленными атрибутами:
`core/components/ms3variants/elements/templates/product_variants.tpl`

## Интеграция с формой корзины

Сниппет вызывается рядом с формой корзины. При выборе варианта JS автоматически находит форму `.ms3_form` на странице и обновляет поле `options`:

```fenom
{* Варианты *}
{'msProductVariants' | snippet}

{* Форма добавления в корзину *}
<form method="post" class="ms3_form" data-cart-state="add">
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">

    <button type="submit">В корзину</button>
</form>
```

При выборе варианта JavaScript автоматически:
1. Заполняет скрытое поле `_variant_id`
2. Обновляет поле `options` с `_variant_id` выбранного варианта
3. Обновляет элементы с `data-ms3v-*` атрибутами

## JavaScript API

### Инициализация

JavaScript инициализируется автоматически для элементов с `data-ms3v-init`.

Для ручной инициализации:

```javascript
const variants = new ms3Variants({
    productId: 42,
    containerId: 'ms3variants-42',
    priceFormat: {
        decimals: 0,
        decPoint: ',',
        thousandsSep: ' ',
        currency: '₽',
        currencyPosition: 'after'
    },
    onSelect: function(variantData) {
        console.log('Выбран вариант:', variantData);
    }
});
```

### Настройка формата цены

Формат цены можно задать через data-атрибуты контейнера:

```fenom
<div data-ms3v-init
     data-ms3v-product-id="{$product_id}"
     data-ms3v-price-decimals="0"
     data-ms3v-price-currency="₽"
     data-ms3v-price-currency-position="after"
     data-ms3v-price-thousands-sep=" "
     data-ms3v-price-dec-point=",">
```

### Методы

```javascript
// Получить ID текущего выбранного варианта
const currentId = variants.getSelectedVariant();

// Выбрать вариант программно
variants.setVariant(variantId);

// Сбросить выбор
variants.reset();
```

### События

При выборе варианта генерируется событие `ms3variants:selected`:

```javascript
document.addEventListener('ms3variants:selected', function(e) {
    console.log('Product ID:', e.detail.productId);
    console.log('Variant ID:', e.detail.id);
    console.log('Price:', e.detail.price);
    console.log('Old price:', e.detail.old_price);
    console.log('SKU:', e.detail.sku);
    console.log('Count:', e.detail.count);
    console.log('Weight:', e.detail.weight);
});
```

## Интеграция с галереей

При выборе варианта с изображением генерируется событие `ms3variants:image-change`:

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
