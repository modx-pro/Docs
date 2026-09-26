---
title: msCart
---
# msCart

Выводит содержимое корзины: список товаров с количеством, ценами и итогами.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно**.
:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msCart` | Чанк оформления корзины |
| **selector** | | CSS-селектор для автообновления HTML корзины |
| **includeTVs** | | TV-параметры товаров через запятую |
| **includeThumbs** | | Превью изображений через запятую |
| **includeContent** | | Включить поле `content` товара в выборку |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать журнал выполнения. Виден только тому, кто вошёл в админку |
| **return** | `tpl` | Формат вывода: `tpl` или `data` |
| **customer_token** | | Токен клиента (по умолчанию берётся из сессии) |
| **hideOnThanks** | `false` | При `1` / `true` сниппет возвращает пустую строку на странице «спасибо» (она определяется по параметру URL `?msorder=...`). При `false` корзина выводится как обычно — мини-корзина в общем шаблоне продолжает работать. До 1.11.0 пустая строка на этой странице была поведением по умолчанию и не отключалась. |

### Параметры pdoTools

| Параметр | Описание |
| --- | --- |
| **where** | Дополнительные условия выборки (JSON) |
| **leftJoin** | Дополнительные JOIN (JSON) |
| **select** | Дополнительные поля для выборки (JSON) |

::: info Порядок товаров не настраивается
Товары выводятся в том порядке, в каком лежат в корзине, — сниппет обходит её содержимое, а не делает отсортированную выборку. Параметры сортировки pdoTools на вывод не влияют.
:::

## Примеры

### Базовый вывод

```fenom
{'!msCart' | snippet}
```

### С превью изображений

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

При `return=data` возвращается массив из трёх ключей; их поля — в таблицах раздела «[Плейсхолдеры в чанке](#плейсхолдеры-в-чанке)».

```php
[
    'products' => [
        [
            'product_key' => 'abc123',    // Уникальный ключ позиции
            'id' => 42,                   // ID строки заказа, НЕ товара
            'product_id' => 15,           // ID товара — его и используйте
            'count' => 2,
            'price' => 1500,
            'options' => ['size' => 'M'],
            // ... остальные поля позиции и товара
        ],
        // ...
    ],
    'total'  => [ /* итоги корзины */ ],
    'status' => [ /* агрегаты из Cart::get() */ ],
]
```

## Плейсхолдеры в чанке

### Товары корзины

```fenom
{foreach $products as $product}
    {$product.pagetitle} — {$product.count} шт. × {$product.price} руб.
{/foreach}
```

| Плейсхолдер | Значение |
| --- | --- |
| `{$product.product_key}` | Уникальный ключ позиции |
| `{$product.product_id}` | ID товара. Ссылка на карточку: `{$product.product_id \| url}` |
| `{$product.id}` | ID строки заказа, а не товара. Ссылку по нему строить нельзя |
| `{$product.count}` | Количество |
| `{$product.price}` | Цена за единицу |
| `{$product.weight}` | Вес за единицу |
| `{$product.old_price}` | Старая цена |
| `{$product.discount_price}` | Скидка на единицу |
| `{$product.discount_cost}` | Скидка на позицию (количество × скидка) |
| `{$product.price_formatted}` | Цена с валютой (например `1 234 ₽`) |
| `{$product.old_price_formatted}` | Старая цена с валютой |
| `{$product.cost_formatted}` | Стоимость позиции с валютой |
| `{$product.old_cost_formatted}` | Старая стоимость позиции с валютой |
| `{$product.weight_formatted}` | Вес с единицей (например `500 г`) |
| `{$product.discount_price_formatted}` | Скидка на единицу с валютой |
| `{$product.discount_cost_formatted}` | Скидка на позицию с валютой |
| `{$product.options}` | Массив опций |
| `{$product.option_*}` | Опции как отдельные поля (например `option_size`) |

Кроме них доступны все поля товара (`pagetitle`, `article`, `thumb` и другие) и поля производителя. Имена полей производителя содержат точку — это плоские ключи, а не вложенный массив, поэтому пишите `{$product['vendor.name']}`, а не `{$product.vendor.name}`.

### Итоги

| Плейсхолдер | Значение |
| --- | --- |
| `{$total.count}` | Общее количество товаров |
| `{$total.positions}` | Количество позиций (уникальных товаров) |
| `{$total.weight}` | Общий вес |
| `{$total.cost}` | Общая стоимость |
| `{$total.discount}` | Сумма скидок |
| `{$total.cost_formatted}` | Стоимость с символом валюты |
| `{$total.weight_formatted}` | Вес с единицей измерения |

### Статус корзины

Начиная с **v1.9.0**, в чанке и при `return=data` доступен массив `status` — данные из `Cart::get()` после обработки плагинами.

| Плейсхолдер | Значение | Синхронизируется с |
| --- | --- | --- |
| `{$status.total_count}` | Количество товаров | `total.count` |
| `{$status.total_cost}` | Итоговая стоимость (с учётом плагинов) | `total.cost` |
| `{$status.total_weight}` | Общий вес | `total.weight` |
| `{$status.total_discount}` | Сумма скидок | `total.discount` |
| `{$status.total_positions}` | Количество позиций | `total.positions` |

::: tip Синхронизация с плагинами
Если плагин на событие `msOnGetStatusCart` изменяет агрегаты в `status` (например, пересчитывает скидку или добавляет стоимость доставки), сниппет автоматически синхронизирует `total` с данными `status`. Поля из третьей колонки будут соответствовать значениям из `status`, а не простой сумме по строкам корзины.
:::

## Автообновление HTML

Сниппет регистрируется через `registerSnippet()` для перерисовки при изменении корзины (как [msOrderTotal](msordertotal)). Укажите `selector`, если на странице несколько блоков корзины:

```fenom
<div id="sidebar-cart">
    {'!msCart' | snippet : [
        'selector' => '#sidebar-cart'
    ]}
</div>
```

## Пример чанка

```fenom
{* tpl.msCart *}
<div class="ms-cart">
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
                    <tr id="{$product.product_key}">
                        <td>
                            {if $product.thumb?}
                                <img src="{$product.thumb}" alt="{$product.pagetitle}">
                            {/if}
                            <a href="{$product.product_id | url}">{$product.pagetitle}</a>

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
                                <del>{$product.old_price_formatted}</del>
                            {/if}
                            {$product.price_formatted}
                        </td>
                        <td>
                            {* Изменение количества — формой: скрипт читает ms3_action внутри неё *}
                            <form method="post" class="ms3_form" data-ms3-form>
                                <input type="hidden" name="product_key" value="{$product.product_key}">
                                <input type="hidden" name="ms3_action" value="cart/change">
                                <input type="number" name="count" value="{$product.count}" min="0">
                            </form>
                        </td>
                        <td>{$product.cost_formatted}</td>
                        <td>
                            <form method="post" class="ms3_form" data-ms3-form>
                                <input type="hidden" name="product_key" value="{$product.product_key}">
                                <input type="hidden" name="ms3_action" value="cart/remove">
                                <button type="submit">&times;</button>
                            </form>
                        </td>
                    </tr>
                {/foreach}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Итого:</td>
                    <td colspan="2">
                        <strong>{$total.cost_formatted}</strong>
                    </td>
                </tr>
            </tfoot>
        </table>

        {set $order_page_id = 'ms3_order_page_id' | option}
        <a href="{$order_page_id | url}" class="btn btn-primary">
            Оформить заказ
        </a>
    {else}
        <p>Корзина пуста</p>
    {/if}
</div>
```

## Работа из JavaScript

```javascript
// Добавить товар
await ms3.cartAPI.add(productId, count, options)

// Изменить количество
await ms3.cartAPI.change(productKey, count)

// Удалить товар
await ms3.cartAPI.remove(productKey)

// Очистить корзину
await ms3.cartAPI.clean()
```

::: warning cartAPI не перерисовывает разметку
Это только обращение к серверу. HTML корзины не обновится и событие `ms3:cart:updated` не сработает — ни у одного из методов, не только у `clean()`. Перерисовкой занимается `ms3.cartUI`: например, `ms3.cartUI.handleClean()` вместо прямого вызова `cartAPI.clean()`.
:::

### События

При изменении корзины срабатывает событие:

```javascript
document.addEventListener('ms3:cart:updated', function(e) {
    console.log('Корзина обновлена:', e.detail);
});
```

### Разметка действий с корзиной

Действия описываются формой с классом `ms3_form` и скрытым полем `ms3_action`, а позиция адресуется полем `product_key`. Полный разбор разметки, таблица допустимых действий и примеры форм — на странице [Корзина](/components/minishop3/frontend/cart#формы-и-действия).
