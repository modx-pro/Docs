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
  redirect[Редирект ?msorder=uuid]
  thanks[msGetOrder на thanks]
  call --> getMsorder
  getMsorder -->|Да| empty
  getMsorder -->|Нет| form --> submit --> redirect --> thanks
```

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msOrder` | Чанк формы заказа |
| **userFields** | | Откуда брать поля заказа в профиле MODX (modUserProfile): JSON вида `{"поле_заказа": "поле_профиля"}`. Используется при `ms3_customer_sync_enabled = true` |
| **customerFields** | | Откуда брать поля заказа в данных клиента (msCustomer): JSON вида `{"поле_заказа": "поле_клиента"}`. Используется при `ms3_customer_sync_enabled = false` |
| **includeDeliveryFields** | `*` | Поля доставки через запятую (`*` = все). `id` попадает в выборку всегда; он же берётся, если свойство пустое ([#824](https://github.com/modx-pro/MiniShop3/issues/824)) |
| **includePaymentFields** | `*` | Поля оплаты через запятую (`*` = все) |
| **includeCustomerAddresses** | `true` | Загружать сохранённые адреса покупателя. В properties transport пока не объявлен ([#824](https://github.com/modx-pro/MiniShop3/issues/824)) |
| **showLog** | `false` | Показать журнал выполнения |
| **return** | `tpl` | Формат вывода: `tpl`, `data` |

Источники взаимоисключающие: при `ms3_customer_sync_enabled = false` (по умолчанию) работают `customerFields` и данные msCustomer, при `true` — `userFields` и профиль MODX.

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

Имена справа должны существовать в msCustomer: на чистой установке маппинг молча ничего не подставит, пока такие поля не заведены (например, в «Своих полях»). Имена в примере условные.

### Маппинг полей профиля MODX (modUserProfile)

```fenom
{'!msOrder' | snippet : [
    'userFields' => '{"company": "extended[company_name]"}'
]}
```

Ключ после `extended[` — имя из `profile.extended`. Для вложенных полей формат только такой: `extended[comment]`, `extended[building]` и т. п.

## Структура данных

```fenom
{'!msOrder' | snippet : [
    'return' => 'data'
]}
```

Возвращает массив:

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
        'currency_symbol' => '₽',       // Символ валюты из настроек
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

- Контакты: `{$form.first_name}` (имя), `{$form.last_name}` (фамилия), `{$form.email}`, `{$form.phone}`
- Адрес: `{$form.city}` (город), `{$form.street}` (улица), `{$form.building}` (дом), `{$form.room}` (квартира или офис)

::: warning Каждое поле — внутри `<div>`
Обработчик ищет ближайший родительский `<div>` и без него молча прекращает работу, не дойдя до сохранения. Поле, лежащее в форме напрямую или внутри другого тега, в черновик не попадёт: покупатель его заполнит, а при отправке получит ошибку о незаполненном поле.

В тот же `<div>` кладите `.invalid-feedback` — в него подставляется текст ошибки этого поля.
:::

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

::: warning Ничего не выбрано по умолчанию
Первый способ сам не отмечается: `delivery_id` и `payment_id` в черновике пусты до клика покупателя, а отправка без них возвращает «не выбран способ доставки». В miniShop2 первый вариант отмечался автоматически, в MiniShop3 это потеряно.

Отмечайте первый вариант в чанке сами и вызывайте на нём событие `change` — иначе значение не уйдёт в черновик:

```fenom
<input type="radio" name="delivery_id" value="{$delivery.id}"
    {if $order.delivery_id == $delivery.id || (!$order.delivery_id && $delivery@first)}checked{/if}>
```

:::

::: tip `price` — только базовая цена
У доставки есть ещё `weight_price`, `distance_price` и `free_delivery_amount`. Итоговую стоимость считает сервер, и приходит она в `{$order.delivery_cost_formatted}` — покупателю надёжнее выводить её, а не `{$delivery.price}`.
:::

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

::: warning Оплаты фильтруйте по выбранной доставке
Не каждая оплата сочетается с каждой доставкой. Сервер проверяет пару при каждом сохранении поля и отвечает ошибкой, но сам список не сокращает — на клиенте тоже ничего не скрывается.

Выводите только совместимые варианты: допустимые оплаты доставки лежат в `{$delivery.payments}`. Иначе покупатель выберет несовместимую пару и упрётся в ошибку, не понимая причины.
:::

### Сохранённые адреса

Список приходит в `{$addresses}`.

::: warning Идентификатор select зашит в скрипте
Когда покупатель вошёл и `includeCustomerAddresses` включён, сниппет подключает `js/web/order-addresses.js`. Скрипт ищет строго `<select id="saved_address_id">` и читает JSON адреса из атрибута `data-address` выбранного пункта.

Через `ms3Config.selectors` идентификатор не переопределяется: назовёте select иначе — подстановка адреса не заработает, без сообщений. Образец разметки — в штатном чанке `ms3_order.tpl`.
:::

### Итоги

| Плейсхолдер | Значение (число) |
| --- | --- |
| `{$order.cart_cost}` | Стоимость товаров |
| `{$order.delivery_cost}` | Стоимость доставки |
| `{$order.discount_cost}` | Скидка. Справочная сумма экономии: она уже учтена в `cart_cost`, вычитать её из итога не нужно |
| `{$order.cost}` | Итого к оплате |

Те же суммы с валютой — имена с суффиксом `_formatted`: `{$order.cart_cost_formatted}`, `{$order.delivery_cost_formatted}`, `{$order.discount_cost_formatted}`, `{$order.cost_formatted}`. Символ валюты из настроек MS3 — `{$order.currency_symbol}`.

## Пример чанка

::: warning Форме нужен именно `data-ms3-form="order"`
Одного класса `ms3_form` мало: форма с ним отправится, но автосохранение полей навешивается по другому селектору — `[data-ms3-form="order"], .ms3_order_form`. Без него введённое никуда не попадает.

Заказ собирается на сервере из черновика, отправка уходит без тела формы. Поэтому форма без нужной пометки вернёт «не выбран способ доставки» — даже когда покупатель выбрал доставку ([#832](https://github.com/modx-pro/MiniShop3/issues/832)).
:::

```fenom
{* tpl.msOrder *}
{if $isCartEmpty}
    <p>Корзина пуста</p>
{else}
<form data-ms3-form="order" method="post">
    <input type="hidden" name="ms3_action" value="order/submit">

    {* Поля контактов и адреса: {$form.*}, раздел «Данные формы».
       Обёртка <div> обязательна — без неё поле не сохранится *}
    <div>
        <input type="text" name="first_name" value="{$form.first_name}" required>
        <div class="invalid-feedback"></div>
    </div>

    {* Остальные поля размечаются так же: email, phone, city, street и прочие *}

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

    {* Итоги. Идентификаторы обязательны: по ним JS обновляет суммы
       после выбора доставки или оплаты, без перезагрузки страницы *}
    <p>Товары: <span id="ms3_order_cart_cost">{$order.cart_cost_formatted}</span></p>
    <p>Доставка: <span id="ms3_order_delivery_cost">{$order.delivery_cost_formatted}</span></p>
    {if $order.discount_cost}<p>Скидка: {$order.discount_cost_formatted}</p>{/if}
    <p><strong>Итого: <span id="ms3_order_cost">{$order.cost_formatted}</span></strong></p>

    <button type="submit">Оформить заказ</button>
</form>
{/if}
```

## Работа из JavaScript

Форма работает через `OrderUI` + `ms3.orderAPI`. Публичного объекта `ms3.order` нет.

::: tip Что обновляется само, а что нет
После изменения корзины обновляются только три суммы — по идентификаторам `#ms3_order_cart_cost`, `#ms3_order_delivery_cost` и `#ms3_order_cost`.

Разметка формы не перерисовывается: msOrder не регистрируется на перерисовку, в отличие от msCart и msOrderTotal. Список доставок, их цены и порог бесплатной доставки останутся такими, какими страница загрузилась.
:::

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

### Хуки

`hooks.js` входит в `ms3_frontend_assets` по умолчанию — проверьте, только если переопределяли настройку.

```javascript
ms3Hooks.addHook('beforeSubmitOrder', async (data) => {
  // Данных о заказе здесь нет — объект пустой.
  // Единственное, что он умеет: отменить отправку
  data.cancel = true
})

ms3Hooks.addHook('afterSubmitOrder', async ({ response }) => {
  if (response.success) {
    console.log('Заказ:', response.data.order_id)
  }
})
```

`order_id` в ответе возвращает встроенный обработчик оплаты. Для внешних платёжных сервисов состав `data` зависит от класса оплаты.

::: tip Нужны поля формы — другой хук
`beforeSubmitOrder` получает пустой объект: отправка уходит без тела, заказ собирается на сервере из черновика. Если нужно прочитать или поправить введённое, подписывайтесь на `beforeFormSubmit` — ему передаются `entity`, `method` и `formData`. Отменить отправку можно из обоих: `data.cancel = true`.
:::

Подробнее: [JavaScript API](/components/minishop3/development/javascript), [Frontend JS](/components/minishop3/development/frontend-js).
