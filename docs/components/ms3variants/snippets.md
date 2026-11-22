---
title: Сниппеты
---
# Сниппеты

## msProductVariants

Выводит варианты товара на странице товара: готовый HTML по чанкам или массив данных для своей разметки.

::: warning Вызывайте сниппет некэшируемым
Пишите `'!msProductVariants'`, с восклицательным знаком. Без него цены и остатки вариантов попадают в кэш страницы: изменение варианта в админке и списание остатков этот кэш не сбрасывают, и покупатель видит старую цену и наличие. С параметром `returnData` кэшируемый вызов приводит к ошибке 500 при повторной загрузке страницы.
:::

### Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **product** | текущий ресурс | ID товара. Если ресурс не товар — пустой вывод (см. [ниже](#empty)) |
| **tpl** | `ms3_variants` | Чанк-обёртка для всех вариантов |
| **tplRow** | `ms3_variants_row` | Чанк для одного варианта |
| **activeOnly** | `1` | `1` — только активные варианты, `0` — все. Неактивный вариант считается отсутствующим, поэтому при [`ms3variants_show_out_of_stock`](settings#ms3variants_show_out_of_stock) = Нет он скрыт и при `0`. По умолчанию настройка — Да |
| **sortby** | `position` | Любое поле варианта: `position`, `price`, `old_price`, `sku`, `count`, `weight`, `id`. Ошибка в имени поля — сниппет ничего не выводит, а в журнале ошибок MODX появляется запись `Error … executing query` |
| **sortdir** | `ASC` | Направление: `ASC` или `DESC` |
| **includeJs** | `1` | Подключить JavaScript (1/0). При `returnData` не подключается |
| **includeCss** | `1` | Подключить CSS (1/0). При `returnData` не подключается |
| **outputSeparator** | `\n` | Разделитель между вариантами |
| **returnData** | `0` | Вернуть массив данных вместо HTML (1/0) |

### Вызов

```fenom
{'!msProductVariants' | snippet}
```

Свои чанки, сортировка, другой товар:

```fenom
{'!msProductVariants' | snippet : [
    'tpl' => 'my_variants_wrapper',
    'tplRow' => 'my_variant_item',
    'sortby' => 'price',
    'sortdir' => 'ASC',
    'product' => 42
]}
```

### Данные в переменную {#return-data}

С `returnData` сниппет возвращает массив, а разметку вы пишете сами.

```fenom
{set $variantsData = '!msProductVariants' | snippet : ['returnData' => 1]}

{if $variantsData.total > 0}
    {foreach $variantsData.variants as $variant}
        <div>{$variant.sku} — {$variant.price}</div>
    {/foreach}
{/if}
```

| Ключ | Тип | Описание |
|------|-----|----------|
| `product_id` | int | ID товара |
| `variants` | array | Варианты со всеми полями [строки варианта](#row), включая `idx` и `options_string` |
| `available_options` | array | Значения опций вариантов — как в [обёртке](#wrapper) |
| `total` | int | Количество вариантов |

JavaScript и CSS в этом режиме не подключаются. Если ваша разметка использует `data-ms3v-*`, подключите `assets/components/ms3variants/js/web/ms3variants.js` и `assets/components/ms3variants/css/web/ms3variants.css` сами.

### Если вариантов нет {#empty}

| Ситуация | Обычный вызов | С `returnData` |
|----------|---------------|----------------|
| У товара нет вариантов или все скрыты | пустая строка, чанк `tpl` не выводится | пустой массив `[]` |
| Ресурс не товар | пустая строка и запись в журнале ошибок MODX | пустая строка, а не массив |

Товаром считается только ресурс с `class_key` = `MiniShop3\Model\msProduct`. Не вызывайте сниппет в общем шаблоне для всех страниц: каждая страница-не-товар добавит запись в журнал ошибок.

### Плейсхолдеры в tpl (обёртка) {#wrapper}

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$product_id}` | int | ID товара |
| `{$rows}` | string | Строки вариантов из чанка `tplRow` |
| `{$variants}` | array | Массив вариантов для Fenom |
| `{$available_options}` | array | Значения опций вариантов по ключам: `{color: ['Красный', 'Синий']}` |
| `{$total}` | int | Количество вариантов |
| `{$options_json}` | string | `available_options` в JSON |
| `{$variants_json}` | string | Опции каждого варианта в JSON: `{"12": {"color": "Красный"}}` |

`available_options` собирается по всем активным вариантам товара. Настройку `ms3variants_show_out_of_stock` он не учитывает: значение, у которого все варианты закончились, в нём остаётся, хотя строк с ним нет.

### Плейсхолдеры в tplRow (строка варианта) {#row}

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$id}` | int | ID варианта |
| `{$product_id}` | int | ID товара |
| `{$sku}` | string, может быть пустым | Артикул |
| `{$price}` | float | Цена |
| `{$old_price}` | float, может быть пустым | Старая цена |
| `{$count}` | int | Остаток |
| `{$weight}` | float, может быть пустым | Вес |
| `{$active}` | bool | Вариант активен |
| `{$position}` | int | Позиция |
| `{$in_stock}` | bool | В наличии: вариант активен и остаток больше нуля. При [`ms3variants_check_stock`](settings#ms3variants_check_stock) = Нет — у любого активного варианта. По умолчанию настройка — Да |
| `{$file_id}` | int, может быть пустым | ID изображения из галереи товара |
| `{$image_url}` | string, может быть пустым | URL изображения. Пусто, если изображение не выбрано |
| `{$options}` | array | Опции варианта списком: `[{key, value}, ...]` |
| `{$options_string}` | string | Значения опций строкой: «Красный, XL» |
| `{$options_array}` | array | Опции по ключам: `{color: 'Красный', size: 'XL'}` |
| `{$created_at}`, `{$updated_at}` | string | Даты создания и изменения |
| `{$idx}` | int | Порядковый номер, начиная с 0 |

Цены — числа без форматирования.

## Варианты в каталоге (msProducts)

Чтобы вывести варианты в каталоге, передайте стандартному сниппету `msProducts` параметр `usePackages`:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'ms3_products_row_variants'
]}
```

Значение `ms3Variants` пишется с учётом регистра: при `ms3variants` варианты не загрузятся.

В каталог попадают только активные варианты в порядке `position`. Параметры `activeOnly` и `sortby` сниппета `msProductVariants` здесь не действуют. Закончившиеся варианты скрываются по той же настройке `ms3variants_show_out_of_stock`, что и на странице товара.

::: warning Без замены ProductCardUI в корзину попадёт товар, а не вариант
Чтобы кнопки каталога добавляли выбранный вариант, замените стандартный модуль MiniShop3 на модуль ms3Variants — см. раздел «Модуль ProductCardUI» на странице [Каталог товаров](frontend/catalog).
:::

### Плейсхолдеры товара с вариантами

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$has_variants}` | bool | Есть ли варианты у товара |
| `{$variants_count}` | int | Количество вариантов |
| `{$variants_json}` | string | Те же данные, что в `{$variants}`, JSON-массивом. Структура не совпадает с `{$variants_json}` обёртки `msProductVariants` |
| `{$variants}` | array | Массив вариантов для Fenom |

У товара без вариантов: `{$has_variants}` = false, `{$variants_count}` = 0, `{$variants}` — пустой массив, `{$variants_json}` — `[]`.

### Поля варианта в `{$variants}`

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
    'position' => 0,
    'in_stock' => true,
    'file_id' => 7,
    'image_url' => '/assets/images/products/42/product.jpg',
    'small' => '/assets/images/products/42/small/product.jpg', // только с includeThumbs
    'options' => [['key' => 'color', 'value' => 'red'], ['key' => 'size', 'value' => 'XL']],
    'options_array' => ['color' => 'red', 'size' => 'XL'],
]
```

### С эскизами изображений

`includeThumbs` — стандартный параметр `msProducts`. Эскизы вариантов загружаются, только если указан и `usePackages`. Передайте имена эскизов из настроек источника файлов товаров:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium'
]}
```

У варианта с изображением появятся поля `small`, `medium` с URL эскизов. У варианта без изображения этих полей нет. Сниппет `msProductVariants` эскизы не загружает.
