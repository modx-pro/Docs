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
| **userFields** | | Маппинг полей профиля MODX (modUserProfile) на поля заказа (JSON). Используется при `ms3_customer_sync_enabled = true` |
| **customerFields** | | Маппинг полей клиента (msCustomer) на поля заказа (JSON). Используется при `ms3_customer_sync_enabled = false` |
| **includeDeliveryFields** | `id` | Поля доставки через запятую (`*` = все) |
| **includePaymentFields** | `*` | Поля оплаты через запятую (`*` = все) |
| **includeCustomerAddresses** | `true` | Загружать сохранённые адреса покупателя |
| **showLog** | `false` | Показать лог выполнения |
| **return** | `tpl` | Формат вывода: `tpl`, `data` |

## Примеры

### Базовый вывод

```fenom
{'!msOrder' | snippet}
```

### Маппинг полей клиента (msCustomer)

При отключённой синхронизации (`ms3_customer_sync_enabled = false`) данные берутся из msCustomer:

```fenom
{'!msOrder' | snippet : [
    'customerFields' => '{"company": "company_name", "inn": "tax_id"}'
]}
```

### Маппинг полей профиля MODX (modUserProfile)

При включённой синхронизации (`ms3_customer_sync_enabled = true`) данные берутся из modUserProfile:

```fenom
{'!msOrder' | snippet : [
    'userFields' => '{"company": "extended.company_name"}'
]}
```

::: tip Выбор источника данных
- `ms3_customer_sync_enabled = false` (по умолчанию): используется `customerFields` и данные msCustomer
- `ms3_customer_sync_enabled = true`: используется `userFields` и данные modUserProfile

Источники данных взаимоисключающие — активен только один в зависимости от настройки.
:::

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
    'order' => [
        'delivery_id' => 1,
        'payment_id' => 2,
        'comment' => '...',
        'cost' => '5 300 ₽',          // Итого (форматировано)
        'cart_cost' => '5 000 ₽',     // Стоимость товаров
        'delivery_cost' => '300 ₽',   // Стоимость доставки
        'discount_cost' => '0 ₽',     // Скидка
    ],
    'form' => [
        'first_name' => 'Иван',
        'last_name' => 'Иванов',
        'email' => 'user@example.com',
        'phone' => '+7 999 123-45-67',
        'city' => 'Москва',
        'street' => 'ул. Примерная',
        'building' => '1',
        'room' => '42',
        // ... другие поля адреса
    ],
    'deliveries' => [
        1 => [
            'id' => 1,
            'name' => 'Самовывоз',
            'description' => '...',
            'price' => 0,
            'logo' => '...',
            'payments' => [1, 2],     // ID доступных способов оплаты
        ],
        // ...
    ],
    'payments' => [
        1 => [
            'id' => 1,
            'name' => 'Наличными',
            'description' => '...',
            'logo' => '...',
        ],
        // ...
    ],
    'addresses' => [                  // Сохранённые адреса (при includeCustomerAddresses)
        [
            'id' => 1,
            'city' => 'Москва',
            'street' => 'ул. Ленина',
            // ...
        ],
    ],
    'errors' => [],                   // Массив полей с ошибками
    'isCustomerAuth' => true,         // Авторизован ли покупатель
    'isCartEmpty' => false,           // Пуста ли корзина
]
```

## Плейсхолдеры в чанке

### Данные формы (контакты и адрес)

- `{$form.first_name}` — Имя
- `{$form.last_name}` — Фамилия
- `{$form.email}` — Email
- `{$form.phone}` — Телефон
- `{$form.city}` — Город
- `{$form.street}` — Улица
- `{$form.building}` — Дом
- `{$form.room}` — Квартира/офис

### Флаги состояния

- `{$isCustomerAuth}` — Авторизован ли покупатель (bool)
- `{$isCartEmpty}` — Пуста ли корзина (bool)

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

- `{$order.cart_cost}` — Стоимость товаров
- `{$order.delivery_cost}` — Стоимость доставки
- `{$order.discount_cost}` — Скидка
- `{$order.cost}` — Итого к оплате

## Пример чанка

```fenom
{* tpl.msOrder *}
{if $isCartEmpty}
    <div class="alert alert-warning">Корзина пуста</div>
{else}
<form class="ms-order ms3_form" method="post">
    <input type="hidden" name="ms3_action" value="order/submit">
    <h2>Оформление заказа</h2>

    {* Контактные данные *}
    <fieldset>
        <legend>Контактные данные</legend>

        <div class="form-group">
            <label>Имя *</label>
            <input type="text"
                   name="first_name"
                   value="{$form.first_name}"
                   required>
        </div>

        <div class="form-group">
            <label>Фамилия</label>
            <input type="text"
                   name="last_name"
                   value="{$form.last_name}">
        </div>

        <div class="form-group">
            <label>Email *</label>
            <input type="email"
                   name="email"
                   value="{$form.email}"
                   required>
        </div>

        <div class="form-group">
            <label>Телефон *</label>
            <input type="tel"
                   name="phone"
                   value="{$form.phone}"
                   required>
        </div>
    </fieldset>

    {* Адрес *}
    <fieldset>
        <legend>Адрес доставки</legend>

        <div class="form-group">
            <label>Город</label>
            <input type="text" name="city" value="{$form.city}">
        </div>

        <div class="form-group">
            <label>Улица</label>
            <input type="text" name="street" value="{$form.street}">
        </div>

        <div class="row">
            <div class="col">
                <label>Дом</label>
                <input type="text" name="building" value="{$form.building}">
            </div>
            <div class="col">
                <label>Квартира</label>
                <input type="text" name="room" value="{$form.room}">
            </div>
        </div>
    </fieldset>

    {* Доставка *}
    <fieldset>
        <legend>Способ доставки</legend>

        {foreach $deliveries as $delivery}
            <label class="delivery-option">
                <input type="radio"
                       name="delivery_id"
                       value="{$delivery.id}"
                       {if $order.delivery_id == $delivery.id}checked{/if}>
                <span>{$delivery.name}</span>
                {if $delivery.price > 0}
                    <span class="price">+{$delivery.price} руб.</span>
                {/if}
            </label>
        {/foreach}
    </fieldset>

    {* Оплата *}
    <fieldset>
        <legend>Способ оплаты</legend>

        {foreach $payments as $payment}
            <label class="payment-option">
                <input type="radio"
                       name="payment_id"
                       value="{$payment.id}"
                       {if $order.payment_id == $payment.id}checked{/if}>
                <span>{$payment.name}</span>
            </label>
        {/foreach}
    </fieldset>

    {* Комментарий *}
    <fieldset>
        <legend>Комментарий к заказу</legend>
        <textarea name="comment" rows="3">{$order.comment}</textarea>
    </fieldset>

    {* Итого *}
    <div class="order-total">
        <div>Товары: <span>{$order.cart_cost}</span></div>
        <div>Доставка: <span>{$order.delivery_cost}</span></div>
        {if $order.discount_cost}
            <div>Скидка: <span>{$order.discount_cost}</span></div>
        {/if}
        <div class="total">
            <strong>Итого: <span>{$order.cost}</span></strong>
        </div>
    </div>

    <button type="submit" class="btn btn-primary btn-lg">
        Оформить заказ
    </button>
</form>
{/if}
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
