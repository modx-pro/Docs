---
title: msOrderTotal
---
# msOrderTotal

Итоги текущей корзины и заказа для мини-корзины в шапке. Виджет сам обновляется при изменениях в корзине.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно** (`!msOrderTotal`).
:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msOrderTotal` | Чанк оформления |
| **return** | `tpl` | Формат: `data` (массив), `tpl` (отрисовка чанка) |
| **selector** | (авто) | CSS-селектор контейнера для автообновления. В properties transport не объявлен ([#805](https://github.com/modx-pro/MiniShop3/issues/805)) |

::: warning Свойства formatPrices / withCurrency
В админке у сниппета могут отображаться `formatPrices` и `withCurrency`. Код их не читает: `*_formatted` всегда с валютой/единицей веса ([#825](https://github.com/modx-pro/MiniShop3/issues/825)).
:::

## Чанк по умолчанию

Компонент поставляет чанк `tpl.msOrderTotal`:

```fenom
<span class="ms3-order-total">
    <span class="ms3-order-total__count">{$total_count}</span>
    {if $total_count > 0}
        <span class="ms3-order-total__cost">{$total_cost_formatted}</span>
    {/if}
</span>
```

## Автообновление виджетов

Сниппет автоматически регистрируется для обновления виджета: при добавлении, удалении или изменении товаров он заново отрисовывается с актуальными данными.

### Как это работает

1. При вызове сниппет регистрирует себя в `ms3Config.render.cart`
2. При изменении корзины JavaScript отправляет запрос на сервер
3. Сервер перевызывает сниппет с теми же параметрами
4. Новый HTML заменяет содержимое виджета

### Параметр selector

По умолчанию контейнер виджета определяется автоматически. Задайте `selector` явно:

```fenom
<div id="header-cart">
    {'!msOrderTotal' | snippet : [
        'selector' => '#header-cart'
    ]}
</div>
```

При обновлении весь HTML внутри `#header-cart` будет заменён новым содержимым.

### Несколько виджетов на странице

```fenom
{* Мини-корзина в шапке *}
<div id="header-minicart">
    {'!msOrderTotal' | snippet : [
        'tpl' => 'tpl.headerMiniCart',
        'selector' => '#header-minicart'
    ]}
</div>

{* Счётчик в мобильном меню *}
<div id="mobile-cart-count">
    {'!msOrderTotal' | snippet : [
        'tpl' => 'tpl.mobileCartCount',
        'selector' => '#mobile-cart-count'
    ]}
</div>
```

Каждый виджет будет обновляться независимо со своим чанком.

## Примеры

### Базовый вызов

```fenom
{'!msOrderTotal' | snippet}
```

### Получение данных без отрисовки

```fenom
{set $total = '!msOrderTotal' | snippet : ['return' => 'data']}

{if $total.total_count > 0}
    В корзине: {$total.total_count} товаров на {$total.cart_cost} руб.
{/if}
```

::: warning Без автообновления
При `return=data` автообновление не работает — данные получаются однократно при загрузке страницы.
:::

### Свой чанк

```fenom
{'!msOrderTotal' | snippet : [
    'tpl' => 'tpl.myMiniCart'
]}
```

### Мини-корзина в шапке

```fenom
<a href="/cart/" class="header-cart-link">
    {'!msOrderTotal' | snippet : [
        'tpl' => '@INLINE <span class="cart-count">{$total_count}</span>
                  <span class="cart-sum">{$cart_cost} ₽</span>'
    ]}
</a>
```

## Структура данных

Сниппет возвращает массив с итогами корзины и заказа:

| Поле | Описание |
| --- | --- |
| `cost` | Итого к оплате (товары + доставка + комиссия оплаты) |
| `cost_formatted` | Итого с символом валюты |
| `cart_cost` | Стоимость товаров |
| `cart_cost_formatted` | Стоимость товаров с валютой |
| `delivery_cost` | Стоимость доставки |
| `delivery_cost_formatted` | Стоимость доставки с валютой |
| `payment_cost` | Комиссия за способ оплаты |
| `payment_cost_formatted` | Комиссия с валютой |
| `total_count` | Общее количество товаров |
| `total_cost` | Стоимость товаров (дубль `cart_cost`) |
| `total_cost_formatted` | Стоимость товаров с валютой |
| `total_weight` | Общий вес |
| `total_weight_formatted` | Общий вес с единицей измерения |
| `total_discount` | Сумма скидки |
| `total_discount_formatted` | Скидка с валютой |
| `total_positions` | Количество позиций (уникальных товаров) |

## Плейсхолдеры в чанке

При использовании `return=tpl` в чанк передаются все поля как плейсхолдеры. Для вывода сумм на сайте используйте `*_formatted`:

- `{$cost_formatted}`, `{$cart_cost_formatted}`, `{$delivery_cost_formatted}`, `{$payment_cost_formatted}`
- `{$total_cost_formatted}`, `{$total_discount_formatted}`, `{$total_weight_formatted}`

```fenom
{* tpl.myMiniCart *}
<div class="mini-cart">
    {if $total_count > 0}
        <a href="/cart/" class="mini-cart-link">
            <span class="mini-cart-count">{$total_count}</span>
            <span class="mini-cart-cost">{$cost_formatted}</span>
        </a>
    {else}
        <span class="mini-cart-empty">Корзина пуста</span>
    {/if}
</div>
```

## CSS-классы

Стандартный чанк использует BEM-именование:

| Класс | Описание |
| --- | --- |
| `.ms3-order-total` | Контейнер виджета |
| `.ms3-order-total__count` | Счётчик количества товаров |
| `.ms3-order-total__cost` | Сумма заказа |

Стили этих классов — в `default.css`.

## Отличие от msCart

| msOrderTotal | msCart |
| --- | --- |
| Только итоговые данные | Полная корзина с товарами |
| Лёгкий, быстрый | Загружает данные всех товаров |
| Для мини-корзины в шапке | Для страницы корзины |
| Минимум данных | Все поля товаров, опции, превью |
| Автообновление виджета | Автообновление корзины |
