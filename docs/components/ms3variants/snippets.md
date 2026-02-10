---
title: Сниппеты
---
# Сниппеты

## msProductVariants

Сниппет для вывода вариантов товара на странице товара.

### Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **product** | текущий ресурс | ID товара |
| **tpl** | `ms3_variants` | Чанк-обёртка для всех вариантов |
| **tplRow** | `ms3_variants_row` | Чанк для одного варианта |
| **activeOnly** | `1` | Только активные варианты (1/0) |
| **sortby** | `position` | Поле сортировки: `position`, `price`, `sku`, `count` |
| **sortdir** | `ASC` | Направление: `ASC` или `DESC` |
| **includeJs** | `1` | Подключить JavaScript (1/0) |
| **includeCss** | `1` | Подключить CSS (1/0) |
| **outputSeparator** | `\n` | Разделитель между вариантами |
| **returnData** | `0` | Вернуть данные массивом вместо HTML (1/0) |

### Базовый вызов

```fenom
{'msProductVariants' | snippet}
```

### С кастомными чанками

```fenom
{'msProductVariants' | snippet : [
    'tpl' => 'my_variants_wrapper',
    'tplRow' => 'my_variant_item'
]}
```

### Сортировка по цене

```fenom
{'msProductVariants' | snippet : [
    'sortby' => 'price',
    'sortdir' => 'ASC'
]}
```

### Для другого товара

```fenom
{'msProductVariants' | snippet : [
    'product' => 42
]}
```

### Получение данных в переменную

```fenom
{set $variantsData = 'msProductVariants' | snippet : ['returnData' => 1]}

{if $variantsData.total > 0}
    <p>Доступно {$variantsData.total} вариантов</p>

    {foreach $variantsData.variants as $variant}
        <div>{$variant.sku} — {$variant.price} ₽</div>
    {/foreach}
{/if}
```

### Плейсхолдеры в tpl (обёртка)

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$product_id}` | int | ID товара |
| `{$rows}` | string | Отрендеренные строки вариантов |
| `{$variants}` | array | Массив вариантов для Fenom |
| `{$available_options}` | array | Уникальные опции со значениями |
| `{$total}` | int | Количество вариантов |
| `{$options_json}` | string | JSON доступных опций |
| `{$variants_json}` | string | JSON маппинга вариантов |

### Плейсхолдеры в tplRow (строка варианта)

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$id}` | int | ID варианта |
| `{$product_id}` | int | ID товара |
| `{$sku}` | string | Артикул |
| `{$price}` | float | Цена |
| `{$old_price}` | float | Старая цена |
| `{$count}` | int | Остатки |
| `{$weight}` | float | Вес |
| `{$active}` | bool | Активность |
| `{$position}` | int | Позиция |
| `{$in_stock}` | bool | Есть на складе |
| `{$image_url}` | string | URL изображения |
| `{$options}` | array | Массив опций `[{key, value}, ...]` |
| `{$options_string}` | string | Опции строкой: "Красный, XL" |
| `{$options_array}` | array | Ассоциативный массив `{color: 'red', size: 'XL'}` |
| `{$idx}` | int | Порядковый номер |

## Интеграция с msProducts

Для вывода вариантов в каталоге используется стандартный сниппет `msProducts` с параметром `usePackages`.

### Параметр usePackages

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants'
]}
```

При указании `usePackages => 'ms3Variants'` плагин загружает варианты для всех товаров одним запросом и добавляет данные в каждый товар.

### Плейсхолдеры товара с вариантами

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$has_variants}` | bool | Есть ли варианты у товара |
| `{$variants_count}` | int | Количество вариантов |
| `{$variants_json}` | string | JSON массив вариантов |
| `{$variants}` | array | Массив вариантов для Fenom |

### Пример вывода в каталоге

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium',
    'tpl' => 'ms3_products_row_variants'
]}
```

### Структура варианта в массиве

```php
[
    'id' => 1,
    'product_id' => 42,
    'sku' => 'ABC-123-red-XL',
    'price' => 1500.00,
    'old_price' => 2000.00,
    'count' => 10,
    'weight' => 0.5,
    'active' => true,
    'in_stock' => true,
    'image_url' => '/assets/images/products/42/product.jpg',
    'small' => '/assets/images/products/42/small/product.jpg',
    'medium' => '/assets/images/products/42/medium/product.jpg',
    'options_array' => [
        'color' => 'red',
        'size' => 'XL'
    ]
]
```

### С эскизами изображений

Для загрузки эскизов вариантов передайте `includeThumbs`:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium'
]}
```

В массиве варианта появятся поля `small`, `medium` и т.д. с URL эскизов.
