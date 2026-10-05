---
title: msOrder
---
# msOrder

Сниппет выводит форму оформления заказа: поля покупателя, способы доставки и оплаты.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно**.
:::

::: info Страница «Спасибо за заказ»
Если в URL есть GET-параметр `msorder` (редирект после оформления), сниппет возвращает **пустую строку**. На той же странице выводите [msGetOrder](msgetorder). Форму оформления заказа и детали заказа не совмещайте без условия по URL.
:::

```mermaid
flowchart TB
  call[msOrder на странице checkout]
  getMsorder{GET msorder?}
  empty[Пустая строка]
  form[Форма доставка / оплата / поля]
  submit[submit заказа]
  redirect[Редирект ?msorder=id]
  thanks[msGetOrder на thanks]
  call --> getMsorder
  getMsorder -->|Да| empty
  getMsorder -->|Нет| form --> submit --> redirect --> thanks
```

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msOrder` | Чанк формы заказа |
| **userFields** | | Маппинг полей профиля MODX (modUserProfile) на поля заказа (JSON). Используется при `ms3_customer_sync_enabled = true` |
| **customerFields** | | Маппинг полей клиента (msCustomer) на поля заказа (JSON). Используется при `ms3_customer_sync_enabled = false` |
| **includeDeliveryFields** | `*` | Поля доставки через запятую (`*` = все). В выборку всегда попадает `id`. В PHP, если свойство пустое, берётся `id` ([#824](https://github.com/modx-pro/MiniShop3/issues/824)) |
| **includePaymentFields** | `*` | Поля оплаты через запятую (`*` = все) |
| **includeCustomerAddresses** | `true` | Загружать сохранённые адреса покупателя. В properties transport пока не объявлен ([#824](https://github.com/modx-pro/MiniShop3/issues/824)) |
| **showLog** | `false` | Показать журнал выполнения |
| **return** | `tpl` | Формат вывода: `tpl`, `data` |

::: tip Выбор источника данных

- `ms3_customer_sync_enabled = false` (по умолчанию): используется `customerFields` и данные msCustomer
- `ms3_customer_sync_enabled = true`: используется `userFields` и данные modUserProfile

Источники взаимоисключающие: активен только тот, что задан настройкой.
:::

## Примеры

### Базовый вывод

```fenom
{'!msOrder' | snippet}
```

### Маппинг полей клиента (msCustomer)

```fenom
{'!msOrder' | snippet : [
    'customerFields' => '{"company": "company_name", "inn": "tax_id"}'
]}
```

Имена полей справа должны существовать в msCustomer: на чистой установке маппинг молча ничего не подставит, пока не заведёте такие поля (например, дополнительные). Имена в примере условные.

### Маппинг полей профиля MODX (modUserProfile)

```fenom
{'!msOrder' | snippet : [
    'userFields' => '{"company": "extended[company_name]"}'
]}
```

Ключ после `extended[` — имя из `profile.extended`. Для вложенных полей формат только такой: `extended[comment]`, `extended[building]` и т. п.

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
        'order_comment' => '...',
        'cost' => 5300,                  // Итого (число)
        'cost_formatted' => '5 300 ₽',  // Итого с валютой
        'cart_cost' => 5000,             // Стоимость товаров
        'cart_cost_formatted' => '5 000 ₽',
        'delivery_cost' => 300,          // Стоимость доставки
        'delivery_cost_formatted' => '300 ₽',
        'discount_cost' => 0,            // Скидка
        'discount_cost_formatted' => '0 ₽',
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
            'name' => 'Наличные',
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
            name="delivery_id"
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
            name="payment_id"
            value="{$payment.id}"
            {if $order.payment_id == $payment.id}checked{/if}>
        {$payment.name}
    </label>
{/foreach}
```

### Итоги

- `{$order.cart_cost}` — Стоимость товаров (число)
- `{$order.delivery_cost}` — Стоимость доставки (число)
- `{$order.discount_cost}` — Скидка (число)
- `{$order.cost}` — Итого к оплате (число)
- `{$order.cart_cost_formatted}`, `{$order.delivery_cost_formatted}`, `{$order.discount_cost_formatted}`, `{$order.cost_formatted}` — те же суммы с валютой
- `{$order.currency_symbol}` — Символ валюты из настроек MS3

## Пример чанка

```fenom
{* tpl.msOrder *}
{if $isCartEmpty}
    <p>Корзина пуста</p>
{else}
<form class="ms3_form" method="post">
    <input type="hidden" name="ms3_action" value="order/submit">

    {* Поля контактов и адреса: {$form.*}, раздел «Данные формы» *}
    <input type="text" name="first_name" value="{$form.first_name}" required>
    <input type="text" name="last_name" value="{$form.last_name}">
    <input type="email" name="email" value="{$form.email}" required>
    <input type="tel" name="phone" value="{$form.phone}" required>

    {* Способы доставки и оплаты — разделы «Способы доставки» и «Способы оплаты» *}
    {foreach $deliveries as $delivery}
        <label>
            <input type="radio" name="delivery_id" value="{$delivery.id}"
                   {if $order.delivery_id == $delivery.id}checked{/if}>
            {$delivery.name}{if $delivery.price > 0} (+{$delivery.price} руб.){/if}
        </label>
    {/foreach}

    {foreach $payments as $payment}
        <label>
            <input type="radio" name="payment_id" value="{$payment.id}"
                   {if $order.payment_id == $payment.id}checked{/if}>
            {$payment.name}
        </label>
    {/foreach}

    <textarea name="order_comment" rows="3">{$order.order_comment}</textarea>

    {* Итоги — раздел «Итоги» *}
    <p>Товары: {$order.cart_cost}</p>
    <p>Доставка: {$order.delivery_cost}</p>
    {if $order.discount_cost}<p>Скидка: {$order.discount_cost}</p>{/if}
    <p><strong>Итого: {$order.cost}</strong></p>

    <button type="submit">Оформить заказ</button>
</form>
{/if}
```

## JavaScript взаимодействие

Форма работает через `OrderUI` + `ms3.orderAPI`. Публичного объекта `ms3.order` нет.

```javascript
// Поля черновика
await ms3.orderAPI.add('delivery_id', deliveryId)
await ms3.orderAPI.add('payment_id', paymentId)
await ms3.orderAPI.add('city', 'Москва')
await ms3.orderAPI.add('order_comment', 'Позвонить перед доставкой')

// Оформить
const response = await ms3.orderAPI.submit()
if (response.success) {
  window.location.href = response.data.redirect
}
```

Хуки (нужен `hooks.js` в `ms3_frontend_assets`):

```javascript
ms3Hooks.addHook('beforeSubmitOrder', async (data) => {
  // data.formData — FormData формы
})

ms3Hooks.addHook('afterSubmitOrder', async ({ response }) => {
  if (response.success) {
    console.log('Заказ:', response.data.order_id)
  }
})
```

`order_id` в ответе возвращает встроенный обработчик оплаты. Для внешних платёжных шлюзов состав `data` зависит от класса оплаты.

Подробнее: [JavaScript API](/components/minishop3/development/javascript), [Frontend JS](/components/minishop3/development/frontend-js).
