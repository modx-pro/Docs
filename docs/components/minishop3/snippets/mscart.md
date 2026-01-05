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
| **includeTVs** | | TV-параметры товаров через запятую |
| **includeThumbs** | | Превью изображений через запятую |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать лог выполнения |
| **return** | `tpl` | Формат вывода: `tpl`, `data`, `json` |

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

### Получение данных в JSON

```fenom
{'!msCart' | snippet : [
    'return' => 'json'
]}
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
    'items' => [
        [
            'key' => 'abc123',           // Уникальный ключ позиции
            'id' => 15,                  // ID товара
            'count' => 2,                // Количество
            'price' => 1500,             // Цена за единицу
            'weight' => 500,             // Вес за единицу
            'options' => ['size' => 'M'], // Выбранные опции
            'pagetitle' => 'Футболка',   // Название товара
            'article' => 'ART-001',      // Артикул
            // ... остальные поля товара
        ],
        // ...
    ],
    'total' => [
        'count' => 5,                    // Общее количество товаров
        'weight' => 2500,                // Общий вес
        'cost' => 7500,                  // Общая стоимость
        'discount' => 0,                 // Скидка
        'positions' => 3,                // Количество позиций
    ],
]
```

## Плейсхолдеры в чанке

### Товары корзины

Перебор товаров в чанке:

```fenom
{foreach $items as $item}
    {$item.pagetitle} — {$item.count} шт. × {$item.price} руб.
{/foreach}
```

Для каждого товара доступны:

- `{$item.key}` — Уникальный ключ позиции
- `{$item.id}` — ID товара
- `{$item.count}` — Количество
- `{$item.price}` — Цена за единицу
- `{$item.weight}` — Вес за единицу
- `{$item.cost}` — Стоимость позиции (цена × количество)
- `{$item.options}` — Массив опций
- Все поля товара (`pagetitle`, `article`, `thumb` и т.д.)

### Итоги

- `{$total.count}` — Общее количество товаров
- `{$total.positions}` — Количество позиций (уникальных товаров)
- `{$total.weight}` — Общий вес
- `{$total.cost}` — Общая стоимость
- `{$total.discount}` — Сумма скидки

## Пример чанка

```fenom
{* tpl.msCart *}
<div class="ms-cart" data-ms-cart>
    {if $items?}
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
                {foreach $items as $item}
                    <tr data-ms-cart-item="{$item.key}">
                        <td>
                            {if $item.thumb?}
                                <img src="{$item.thumb}" alt="{$item.pagetitle}" width="60">
                            {/if}
                            <a href="{$item.id | resource : 'uri'}">{$item.pagetitle}</a>

                            {if $item.options?}
                                <small>
                                    {foreach $item.options as $key => $value}
                                        {$key}: {$value}{if !$value@last}, {/if}
                                    {/foreach}
                                </small>
                            {/if}
                        </td>
                        <td>{$item.price} руб.</td>
                        <td>
                            <input type="number"
                                   name="count"
                                   value="{$item.count}"
                                   min="1"
                                   data-ms-action="cart/change"
                                   data-key="{$item.key}">
                        </td>
                        <td>{$item.cost} руб.</td>
                        <td>
                            <button type="button"
                                    data-ms-action="cart/remove"
                                    data-key="{$item.key}">
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
```
