---
title: msOrderTotal
---
# msOrderTotal

Сниппет для получения итоговой информации о текущей корзине и заказе. Используется для мини-корзины в шапке сайта с поддержкой автоматического обновления при изменениях в корзине.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно** (`!msOrderTotal`).
:::

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msOrderTotal` | Чанк оформления |
| **return** | `tpl` | Формат: `data` (массив), `tpl` (рендеринг чанка) |
| **selector** | (авто) | CSS-селектор контейнера для автообновления |

## Чанк по умолчанию

Компонент поставляется с готовым чанком `tpl.msOrderTotal`:

```fenom
<span class="ms3-order-total">
    <span class="ms3-order-total__count">{$total_count}</span>
    {if $total_count > 0}
        <span class="ms3-order-total__cost">{$total_cost} {'ms3_frontend_currency' | lexicon}</span>
    {/if}
</span>
```

Для чанка предоставляются готовые CSS-стили в `default.css`.

## Автообновление виджетов

Сниппет автоматически регистрируется для обновления при изменениях в корзине. При добавлении, удалении или изменении товаров виджет **перерендеривается** с актуальными данными.

### Как это работает

1. При вызове сниппет регистрирует себя в `ms3Config.render.cart`
2. При изменении корзины JavaScript отправляет запрос на сервер
3. Сервер перевызывает сниппет с теми же параметрами
4. Новый HTML заменяет содержимое виджета

### Параметр selector

По умолчанию виджет обновляется внутри контейнера, определённого автоматически. Для указания конкретного контейнера используйте параметр `selector`:

```fenom
<div id="header-cart">
    {'!msOrderTotal' | snippet : [
        'selector' => '#header-cart'
    ]}
</div>
```

При обновлении весь HTML внутри `#header-cart` будет заменён новым содержимым.

### Несколько виджетов на странице

Можно разместить несколько виджетов с разными чанками:

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

### Базовый вызов с дефолтным чанком

```fenom
{'!msOrderTotal' | snippet}
```

Выведет счётчик с количеством товаров и суммой в стилизованном виджете.

### Получение данных без рендеринга

```fenom
{set $total = '!msOrderTotal' | snippet : ['return' => 'data']}

{if $total.total_count > 0}
    В корзине: {$total.total_count} товаров на {$total.cart_cost} руб.
{/if}
```

::: warning Без автообновления
При `return=data` автообновление не работает — данные получаются однократно при загрузке страницы.
:::

### Кастомный чанк

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
|------|----------|
| `cost` | Итого к оплате (товары + доставка + комиссия оплаты) |
| `cart_cost` | Стоимость товаров |
| `delivery_cost` | Стоимость доставки |
| `payment_cost` | Комиссия за способ оплаты |
| `total_count` | Общее количество товаров |
| `total_cost` | Стоимость товаров (дубль `cart_cost`) |
| `total_weight` | Общий вес |
| `total_discount` | Сумма скидки |
| `total_positions` | Количество позиций (уникальных товаров) |

```php
[
    'cost' => 8100,            // Итого к оплате
    'cart_cost' => 7500,       // Стоимость товаров
    'delivery_cost' => 300,    // Стоимость доставки
    'payment_cost' => 300,     // Комиссия оплаты (например, 4%)
    'total_count' => 5,        // Общее количество товаров
    'total_cost' => 7500,      // Стоимость товаров
    'total_weight' => 2500,    // Общий вес (граммы)
    'total_discount' => 500,   // Сумма скидки
    'total_positions' => 3,    // Количество позиций
]
```

::: tip Разница между cost и cart_cost
- `cart_cost` — стоимость только товаров в корзине
- `cost` — итоговая сумма к оплате: товары + доставка + комиссия оплаты
:::

## Плейсхолдеры в чанке

При использовании `return=tpl` в чанк передаются все поля как плейсхолдеры:

```fenom
{* tpl.myMiniCart *}
<div class="mini-cart">
    {if $total_count > 0}
        <a href="/cart/" class="mini-cart-link">
            <span class="mini-cart-count">{$total_count}</span>
            <span class="mini-cart-cost">{$cart_cost}</span> руб.
        </a>
    {else}
        <span class="mini-cart-empty">Корзина пуста</span>
    {/if}
</div>
```

## CSS-классы

Дефолтный чанк использует BEM-именование:

| Класс | Описание |
|-------|----------|
| `.ms3-order-total` | Контейнер виджета |
| `.ms3-order-total__count` | Счётчик количества товаров |
| `.ms3-order-total__cost` | Сумма заказа |

### Готовые стили

Стили из `default.css`:

```css
.ms3-order-total {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    border-radius: 2rem;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.ms3-order-total:hover {
    background: #e9ecef;
}

.ms3-order-total__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.4rem;
    background: var(--bs-primary, #0d6efd);
    color: #fff;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.ms3-order-total__count:empty,
.ms3-order-total__count[data-count="0"] {
    background: #6c757d;
}

.ms3-order-total__cost {
    font-weight: 500;
    color: #212529;
}
```

## Полный пример мини-корзины

```fenom
<header class="site-header">
    <nav class="main-nav">
        {* ... меню ... *}
    </nav>

    <div id="header-cart" class="header-cart">
        {'!msOrderTotal' | snippet : [
            'selector' => '#header-cart',
            'tpl' => '@INLINE
                <a href="/cart/" class="header-cart__link">
                    <svg class="header-cart__icon" width="24" height="24">
                        <use xlink:href="#icon-cart"/>
                    </svg>
                    {if $total_count > 0}
                        <span class="header-cart__badge">{$total_count}</span>
                        <span class="header-cart__sum">{$cart_cost} ₽</span>
                    {/if}
                </a>
            '
        ]}
    </div>
</header>
```

## Отличие от msCart

| msOrderTotal | msCart |
|--------------|--------|
| Только итоговые данные | Полная корзина с товарами |
| Лёгкий, быстрый | Загружает данные всех товаров |
| Для мини-корзины в шапке | Для страницы корзины |
| Минимум данных | Все поля товаров, опции, превью |
| Автообновление виджета | Автообновление корзины |

## Устаревшие data-атрибуты

::: warning Устаревший способ
Атрибуты `data-ms-cart-count`, `data-ms-cart-cost` по-прежнему поддерживаются для обратной совместимости, но рекомендуется использовать автообновление через параметр `selector`.
:::

Для совместимости со старым кодом можно использовать:

```html
<span data-ms-cart-count>0</span>
<span data-ms-cart-cost>0</span>
```

JavaScript MiniShop3 обновит эти элементы при изменениях в корзине, но без полного перерендеринга чанка.
