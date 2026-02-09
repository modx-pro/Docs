---
title: msCart
---
# msCart

Сниппет для вывода корзины покупок. Отображает список товаров в корзине с возможностью изменения количества и удаления.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно**.
:::

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msCart` | Чанк оформления корзины |
| **selector** | | CSS-селектор для автообновления HTML корзины |
| **includeTVs** | | TV-параметры товаров через запятую |
| **includeThumbs** | | Превью изображений через запятую |
| **includeContent** | | Включить поле `content` товара в выборку |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать лог выполнения (только для менеджеров) |
| **return** | `tpl` | Формат вывода: `tpl` или `data` |
| **customer_token** | | Токен клиента (по умолчанию берётся из сессии) |

### Параметры pdoTools

Сниппет наследует параметры pdoTools:

| Параметр | Описание |
|----------|----------|
| **where** | Дополнительные условия выборки (JSON) |
| **leftJoin** | Дополнительные JOIN (JSON) |
| **select** | Дополнительные поля для выборки (JSON) |
| **sortby** | Сортировка (по умолчанию `msProduct.id`) |
| **sortdir** | Направление сортировки (по умолчанию `ASC`) |

## Примеры

### Базовый вывод

```fenom
{'!msCart' | snippet}
```

### С превью изображений

```fenom
{'!msCart' | snippet : [
    'includeThumbs' => 'small'
]}
```

### С несколькими размерами превью

```fenom
{'!msCart' | snippet : [
    'includeThumbs' => 'small,medium'
]}
```

### С TV-параметрами

```fenom
{'!msCart' | snippet : [
    'includeTVs' => 'my_tv,another_tv'
]}
```

### С автообновлением в указанный элемент

```fenom
{'!msCart' | snippet : [
    'selector' => '#header-mini-cart'
]}
```

При изменении корзины JavaScript автоматически перерендерит HTML и обновит содержимое элемента `#header-mini-cart`.

### Получение данных в массиве

```fenom
{var $cart = '!msCart' | snippet : ['return' => 'data']}
{$cart.total.cost} руб.
```

### Вывод в плейсхолдер

```fenom
{'!msCart' | snippet : [
    'toPlaceholder' => 'cart'
]}

{* Использование *}
{$_modx->getPlaceholder('cart')}
```

## Структура данных корзины

При `return=data` возвращается массив:

```php
[
    'products' => [
        [
            'key' => 'abc123',           // Уникальный ключ позиции
            'id' => 15,                  // ID товара
            'product_id' => 15,          // ID товара (дублируется)
            'count' => 2,                // Количество
            'price' => 1500,             // Цена за единицу
            'weight' => 500,             // Вес за единицу
            'options' => ['size' => 'M'], // Выбранные опции
            'option_size' => 'M',        // Опции как отдельные поля
            'pagetitle' => 'Футболка',   // Название товара
            'article' => 'ART-001',      // Артикул
            'old_price' => 2000,         // Старая цена
            'discount_price' => 500,     // Скидка на единицу
            'discount_cost' => 1000,     // Скидка на позицию
            // ... остальные поля товара
        ],
        // ...
    ],
    'total' => [
        'count' => 5,                    // Общее количество товаров
        'weight' => 2500,                // Общий вес
        'cost' => 7500,                  // Общая стоимость
        'discount' => 0,                 // Сумма скидок
        'positions' => 3,                // Количество позиций
    ],
]
```

## Плейсхолдеры в чанке

### Товары корзины

Перебор товаров в чанке:

```fenom
{foreach $products as $product}
    {$product.pagetitle} — {$product.count} шт. × {$product.price} руб.
{/foreach}
```

Для каждого товара доступны:

- `{$product.key}` — Уникальный ключ позиции
- `{$product.id}` — ID товара
- `{$product.count}` — Количество
- `{$product.price}` — Цена за единицу
- `{$product.weight}` — Вес за единицу
- `{$product.old_price}` — Старая цена
- `{$product.discount_price}` — Скидка на единицу
- `{$product.discount_cost}` — Скидка на позицию (количество × скидка)
- `{$product.options}` — Массив опций
- `{$product.option_*}` — Опции как отдельные поля (например `option_size`)
- Все поля товара (`pagetitle`, `article`, `thumb` и т.д.)
- Все поля производителя с префиксом `vendor.` (`vendor.name`, `vendor.logo` и т.д.)

### Итоги

- `{$total.count}` — Общее количество товаров
- `{$total.positions}` — Количество позиций (уникальных товаров)
- `{$total.weight}` — Общий вес
- `{$total.cost}` — Общая стоимость
- `{$total.discount}` — Сумма скидок

## Пример чанка

```fenom
{* tpl.msCart *}
<div class="ms-cart" data-ms-cart>
    {if $products?}
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {foreach $products as $product}
                    <tr data-ms-cart-item="{$product.key}">
                        <td>
                            {if $product.thumb?}
                                <img src="{$product.thumb}" alt="{$product.pagetitle}" width="60">
                            {/if}
                            <a href="{$product.id | resource : 'uri'}">{$product.pagetitle}</a>

                            {if $product.options?}
                                <small>
                                    {foreach $product.options as $key => $value}
                                        {$key}: {$value}{if !$value@last}, {/if}
                                    {/foreach}
                                </small>
                            {/if}
                        </td>
                        <td>
                            {if $product.old_price > 0}
                                <del>{$product.old_price} руб.</del>
                            {/if}
                            {$product.price} руб.
                        </td>
                        <td>
                            <input type="number"
                                   name="count"
                                   value="{$product.count}"
                                   min="1"
                                   data-ms-action="cart/change"
                                   data-key="{$product.key}">
                        </td>
                        <td>{$product.count * $product.price} руб.</td>
                        <td>
                            <button type="button"
                                    data-ms-action="cart/remove"
                                    data-key="{$product.key}">
                                ✕
                            </button>
                        </td>
                    </tr>
                {/foreach}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Итого:</td>
                    <td colspan="2">
                        <strong data-ms-cart-total-cost>{$total.cost}</strong> руб.
                    </td>
                </tr>
            </tfoot>
        </table>

        <a href="{'ms3_order_page' | option}" class="btn btn-primary">
            Оформить заказ
        </a>
    {else}
        <p>Корзина пуста</p>
    {/if}
</div>
```

## JavaScript взаимодействие

Корзина обновляется через JavaScript API MiniShop3:

```javascript
// Добавить товар
ms3.cart.add(productId, count, options);

// Изменить количество
ms3.cart.change(key, count);

// Удалить товар
ms3.cart.remove(key);

// Очистить корзину
ms3.cart.clean();
```

### События

При изменении корзины генерируется событие:

```javascript
document.addEventListener('ms3:cart:updated', function(e) {
    console.log('Корзина обновлена:', e.detail);
});
```

### Data-атрибуты

Для автоматического взаимодействия используйте data-атрибуты:

```html
<!-- Добавить в корзину -->
<button data-ms-action="cart/add" data-id="15" data-count="1">
    В корзину
</button>

<!-- С опциями -->
<button data-ms-action="cart/add"
        data-id="15"
        data-options='{"size":"M","color":"red"}'>
    В корзину
</button>

<!-- Изменить количество -->
<input type="number"
       data-ms-action="cart/change"
       data-key="abc123"
       value="2">

<!-- Удалить из корзины -->
<button data-ms-action="cart/remove" data-key="abc123">
    Удалить
</button>
```
