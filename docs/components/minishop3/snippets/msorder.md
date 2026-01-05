---
title: msOrder
---
# msOrder

Сниппет для вывода формы оформления заказа. Отображает поля покупателя, способы доставки и оплаты.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно**.
:::

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msOrder` | Чанк формы заказа |
| **userFields** | | Дополнительные поля покупателя |
| **includeDeliveryFields** | `*` | Поля доставки (`*` = все) |
| **includePaymentFields** | `*` | Поля оплаты (`*` = все) |
| **showLog** | `false` | Показать лог выполнения |
| **return** | `tpl` | Формат вывода: `tpl`, `data`, `json` |

## Примеры

### Базовый вывод

```fenom
{'!msOrder' | snippet}
```

### С дополнительными полями

```fenom
{'!msOrder' | snippet : [
    'userFields' => 'comment,company_name'
]}
```

### Получение данных

```fenom
{'!msOrder' | snippet : [
    'return' => 'data'
]}
```

## Структура данных

При `return=data` возвращается массив:

```php
[
    'user' => [
        'id' => 5,                    // ID пользователя (0 если гость)
        'email' => 'user@example.com',
        'phone' => '+7 999 123-45-67',
        'receiver' => 'Иван Иванов',
        // ... другие поля
    ],
    'order' => [
        'delivery_id' => 1,
        'payment_id' => 2,
        'address' => '...',
        'comment' => '...',
    ],
    'deliveries' => [
        [
            'id' => 1,
            'name' => 'Самовывоз',
            'description' => '...',
            'price' => 0,
            'logo' => '...',
        ],
        // ...
    ],
    'payments' => [
        [
            'id' => 1,
            'name' => 'Наличными',
            'description' => '...',
            'logo' => '...',
        ],
        // ...
    ],
    'cart' => [
        // Данные корзины
    ],
    'total' => [
        'cost' => 5000,
        'delivery_cost' => 300,
        'total' => 5300,
    ],
]
```

## Плейсхолдеры в чанке

### Данные покупателя

- `{$user.id}` — ID пользователя (0 для гостя)
- `{$user.email}` — Email
- `{$user.phone}` — Телефон
- `{$user.receiver}` — ФИО получателя

### Способы доставки

```fenom
{foreach $deliveries as $delivery}
    <label>
        <input type="radio"
               name="delivery"
               value="{$delivery.id}"
               {if $order.delivery_id == $delivery.id}checked{/if}>
        {$delivery.name}
        {if $delivery.price > 0}
            — {$delivery.price} руб.
        {/if}
    </label>
{/foreach}
```

### Способы оплаты

```fenom
{foreach $payments as $payment}
    <label>
        <input type="radio"
               name="payment"
               value="{$payment.id}"
               {if $order.payment_id == $payment.id}checked{/if}>
        {$payment.name}
    </label>
{/foreach}
```

### Итоги

- `{$total.cost}` — Стоимость товаров
- `{$total.delivery_cost}` — Стоимость доставки
- `{$total.total}` — Итого к оплате

## Пример чанка

```fenom
{* tpl.msOrder *}
<form class="ms-order" data-ms-order>
    <h2>Оформление заказа</h2>

    {* Контактные данные *}
    <fieldset>
        <legend>Контактные данные</legend>

        <div class="form-group">
            <label>Имя получателя *</label>
            <input type="text"
                   name="receiver"
                   value="{$user.receiver}"
                   required>
        </div>

        <div class="form-group">
            <label>Email *</label>
            <input type="email"
                   name="email"
                   value="{$user.email}"
                   required>
        </div>

        <div class="form-group">
            <label>Телефон *</label>
            <input type="tel"
                   name="phone"
                   value="{$user.phone}"
                   required>
        </div>
    </fieldset>

    {* Доставка *}
    <fieldset>
        <legend>Способ доставки</legend>

        {foreach $deliveries as $delivery}
            <label class="delivery-option">
                <input type="radio"
                       name="delivery"
                       value="{$delivery.id}"
                       data-ms-action="order/delivery"
                       {if $order.delivery_id == $delivery.id}checked{/if}>
                <span>{$delivery.name}</span>
                {if $delivery.price > 0}
                    <span class="price">+{$delivery.price} руб.</span>
                {/if}
            </label>
        {/foreach}

        <div class="form-group">
            <label>Адрес доставки</label>
            <input type="text"
                   name="address"
                   value="{$order.address}">
        </div>
    </fieldset>

    {* Оплата *}
    <fieldset>
        <legend>Способ оплаты</legend>

        {foreach $payments as $payment}
            <label class="payment-option">
                <input type="radio"
                       name="payment"
                       value="{$payment.id}"
                       data-ms-action="order/payment"
                       {if $order.payment_id == $payment.id}checked{/if}>
                <span>{$payment.name}</span>
            </label>
        {/foreach}
    </fieldset>

    {* Комментарий *}
    <fieldset>
        <legend>Комментарий к заказу</legend>
        <textarea name="comment"
                  rows="3">{$order.comment}</textarea>
    </fieldset>

    {* Итого *}
    <div class="order-total">
        <div>Товары: <span data-ms-order-cost>{$total.cost}</span> руб.</div>
        <div>Доставка: <span data-ms-order-delivery>{$total.delivery_cost}</span> руб.</div>
        <div class="total">
            <strong>Итого: <span data-ms-order-total>{$total.total}</span> руб.</strong>
        </div>
    </div>

    <button type="submit"
            data-ms-action="order/submit"
            class="btn btn-primary btn-lg">
        Оформить заказ
    </button>
</form>
```

## JavaScript взаимодействие

```javascript
// Оформить заказ
ms3.order.submit();

// Обновить способ доставки
ms3.order.setDelivery(deliveryId);

// Обновить способ оплаты
ms3.order.setPayment(paymentId);

// Обновить поле
ms3.order.setField(name, value);
```

## События

При оформлении заказа генерируются события:

```javascript
// Перед отправкой
document.addEventListener('ms3:order:before-submit', (e) => {
    console.log('Данные заказа:', e.detail);
});

// После успешного оформления
document.addEventListener('ms3:order:success', (e) => {
    console.log('Заказ создан:', e.detail.order_id);
    // Редирект на страницу успеха
    window.location.href = e.detail.redirect;
});

// При ошибке
document.addEventListener('ms3:order:error', (e) => {
    console.error('Ошибка:', e.detail.message);
});
```
