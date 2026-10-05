---
title: msOrder
---
# msOrder

Snippet for the checkout form. Shows customer fields, delivery methods, and payment methods.

::: warning Caching
The snippet uses the user session and must be called **uncached**.
:::

::: info Thank-you page
If the URL contains GET parameter `msorder` (redirect after checkout), the snippet returns an **empty string**. On the same page use [msGetOrder](msgetorder). Do not show checkout and order details together without a URL condition.
:::

```mermaid
flowchart TB
  call[msOrder on the checkout page]
  getMsorder{GET msorder?}
  empty[Empty string]
  form[Form: delivery / payment / fields]
  submit[Order submit]
  redirect[Redirect ?msorder=uuid]
  thanks[msGetOrder on the thanks page]
  call --> getMsorder
  getMsorder -->|Yes| empty
  getMsorder -->|No| form --> submit --> redirect --> thanks
```

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **tpl** | `tpl.msOrder` | Order form chunk |
| **userFields** | | Where to take order fields from in the MODX profile (modUserProfile): JSON shaped `{"order_field": "profile_field"}`. Used when `ms3_customer_sync_enabled = true` |
| **customerFields** | | Where to take order fields from in the customer data (msCustomer): JSON shaped `{"order_field": "customer_field"}`. Used when `ms3_customer_sync_enabled = false` |
| **includeDeliveryFields** | `*` | Comma-separated delivery fields (`*` = all). `id` is always included. In PHP, when the property is empty, `id` is used ([#824](https://github.com/modx-pro/MiniShop3/issues/824)) |
| **includePaymentFields** | `*` | Comma-separated payment fields (`*` = all) |
| **includeCustomerAddresses** | `true` | Load saved customer addresses. Not yet declared in the transport properties ([#824](https://github.com/modx-pro/MiniShop3/issues/824)) |
| **showLog** | `false` | Show execution log |
| **return** | `tpl` | Output format: `tpl`, `data` |

The sources are mutually exclusive: with `ms3_customer_sync_enabled = false` (the default) `customerFields` and the msCustomer data are used, with `true` — `userFields` and the MODX profile.

## Examples

### Basic output

```fenom
{'!msOrder' | snippet}
```

### Customer field mapping (msCustomer)

When sync is disabled (`ms3_customer_sync_enabled = false`), data is taken from msCustomer:

```fenom
{'!msOrder' | snippet : [
    'customerFields' => '{"company": "company_name", "inn": "tax_id"}'
]}
```

### MODX profile field mapping (modUserProfile)

When sync is enabled (`ms3_customer_sync_enabled = true`), data is taken from modUserProfile:

```fenom
{'!msOrder' | snippet : [
    'userFields' => '{"company": "extended[company_name]"}'
]}
```

The key after `extended[` is a name from `profile.extended`. Nested fields take this form and no other: `extended[comment]`, `extended[building]` and so on. Dot notation does not work — the parser cuts a fixed number of characters and would read `company_nam` from `extended.company_name`.


## Data structure

```fenom
{'!msOrder' | snippet : [
    'return' => 'data'
]}
```

With `return=data` the snippet returns an array:

```php
[
    'order' => [
        'delivery_id' => 1,
        'payment_id' => 2,
        'order_comment' => '...',
        'cost' => 5300,                  // Total (number)
        'cost_formatted' => '5 300 ₽',  // Total with currency
        'cart_cost' => 5000,             // Products cost
        'cart_cost_formatted' => '5 000 ₽',
        'delivery_cost' => 300,          // Delivery cost
        'delivery_cost_formatted' => '300 ₽',
        'currency_symbol' => '₽',       // Currency symbol from the settings
        'discount_cost' => 0,            // Discount
        'discount_cost_formatted' => '0 ₽',
    ],
    'form' => [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'user@example.com',
        'phone' => '+1 234 567-89-00',
        'city' => 'New York',
        'street' => 'Example St',
        'building' => '1',
        'room' => '42',
        // ... other address fields
    ],
    'deliveries' => [
        1 => [
            'id' => 1,
            'name' => 'Pickup',
            'description' => '...',
            'price' => 0,
            'logo' => '...',
            'payments' => [1, 2],     // IDs of available payment methods
        ],
        // ...
    ],
    'payments' => [
        1 => [
            'id' => 1,
            'name' => 'Cash',
            'description' => '...',
            'logo' => '...',
        ],
        // ...
    ],
    'addresses' => [                  // Saved addresses (when includeCustomerAddresses)
        [
            'id' => 1,
            'city' => 'New York',
            'street' => 'Main St',
            // ...
        ],
    ],
    'isCustomerAuth' => true,         // Whether customer is logged in
    'isCartEmpty' => false,           // Whether cart is empty
]
```

## Placeholders in chunk

### Form data (contacts and address)

- Contacts: `{$form.first_name}`, `{$form.last_name}`, `{$form.email}`, `{$form.phone}`
- Address: `{$form.city}`, `{$form.street}`, `{$form.building}` (house), `{$form.room}` (apartment or office)

::: warning Every field goes inside a `<div>`
The handler looks for the nearest parent `<div>` and silently stops without one, never reaching the save. A field placed directly in the form, or inside another tag, never reaches the draft: the customer fills it in and gets a «field is empty» error on submit.

Put `.invalid-feedback` in the same `<div>` — that is where this field's error text goes.
:::

### State flags

- `{$isCustomerAuth}` — Whether customer is logged in (bool)
- `{$isCartEmpty}` — Whether cart is empty (bool)

### Delivery methods

```fenom
{foreach $deliveries as $delivery}
    <label>
        <input type="radio"
               name="delivery_id"
               value="{$delivery.id}"
               {if $order.delivery_id == $delivery.id}checked{/if}>
        {$delivery.name}
        {if $delivery.price > 0}
            — {$delivery.price}
        {/if}
    </label>
{/foreach}
```

::: warning Nothing is selected by default
The first method does not check itself: `delivery_id` and `payment_id` stay empty in the draft until the customer clicks, and a submission without them returns «no delivery method selected». miniShop2 checked the first option automatically; MiniShop3 lost that.

Until it is fixed, check the first option in the chunk yourself and fire a `change` event on it, otherwise the value never reaches the draft:

```fenom
<input type="radio" name="delivery_id" value="{$delivery.id}"
    {if $order.delivery_id == $delivery.id || (!$order.delivery_id && $delivery@first)}checked{/if}>
```
:::

::: tip `price` is the base price only
A delivery method also has `weight_price`, `distance_price` and `free_delivery_amount`. The final cost is calculated on the server and arrives in `{$order.delivery_cost_formatted}` — showing that to the customer is safer than `{$delivery.price}`.
:::

### Payment methods

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

::: warning Payments must be filtered by the chosen delivery
Not every payment method goes with every delivery method. The server checks the pair on each saved field and answers with an error, but it does not shorten the list itself — and nothing is hidden on the client either.

List only the compatible options: a delivery method carries `{$delivery.payments}` for exactly this. Show the whole list and the customer picks an incompatible pair, then runs into an error without knowing what is wrong.
:::

### Saved addresses

The list arrives in `{$addresses}`.

::: warning The select id is baked into the script
When the customer is signed in and `includeCustomerAddresses` is on, the snippet loads `js/web/order-addresses.js`. The script looks for exactly `<select id="saved_address_id">` and reads the address JSON from the chosen option's `data-address` attribute.

The id cannot be overridden through `ms3Config.selectors`: name the select anything else and address filling stops working, with no message. The markup to copy is in the shipped chunk `ms3_order.tpl`.
:::

### Totals

| Placeholder | Value (number) |
| --- | --- |
| `{$order.cart_cost}` | Product cost |
| `{$order.delivery_cost}` | Delivery cost |
| `{$order.discount_cost}` | Discount. A reference figure: already reflected in `cart_cost`, do not subtract it from the total |
| `{$order.cost}` | Total to pay |

The same amounts with currency carry the `_formatted` suffix: `{$order.cart_cost_formatted}`, `{$order.delivery_cost_formatted}`, `{$order.discount_cost_formatted}`, `{$order.cost_formatted}`. The currency symbol from the MS3 settings is `{$order.currency_symbol}`.

## Example chunk

::: warning The form needs exactly `data-ms3-form="order"`
The `ms3_form` class alone is not enough, even though a form carrying it does get submitted. Field auto-saving is attached through a different selector — `[data-ms3-form="order"], .ms3_order_form` — and without it nothing the customer types goes anywhere.

The order is assembled on the server from the draft: the submission goes out with no form body. So a form without the right mark submits and comes back with «no delivery method selected» — even when the customer picked one ([#832](https://github.com/modx-pro/MiniShop3/issues/832)).
:::

```fenom
{* tpl.msOrder *}
{if $isCartEmpty}
    <div class="alert alert-warning">Cart is empty</div>
{else}
<form data-ms3-form="order" method="post">
    <input type="hidden" name="ms3_action" value="order/submit">
    <h2>Checkout</h2>

    {* Contact details *}
    <fieldset>
        <legend>Contact details</legend>

        <div class="form-group">
            <label>First name *</label>
            <input type="text"
                   name="first_name"
                   value="{$form.first_name}"
                   required>
            <div class="invalid-feedback"></div>
        </div>

        <div class="form-group">
            <label>Last name</label>
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
            <label>Phone *</label>
            <input type="tel"
                   name="phone"
                   value="{$form.phone}"
                   required>
        </div>
    </fieldset>

    {* Address *}
    <fieldset>
        <legend>Delivery address</legend>

        <div class="form-group">
            <label>City</label>
            <input type="text" name="city" value="{$form.city}">
        </div>

        <div class="form-group">
            <label>Street</label>
            <input type="text" name="street" value="{$form.street}">
        </div>

        <div class="row">
            <div class="col">
                <label>Building</label>
                <input type="text" name="building" value="{$form.building}">
            </div>
            <div class="col">
                <label>Room</label>
                <input type="text" name="room" value="{$form.room}">
            </div>
        </div>
    </fieldset>

    {* Delivery *}
    <fieldset>
        <legend>Delivery method</legend>

        {foreach $deliveries as $delivery}
            <label class="delivery-option">
                <input type="radio"
                       name="delivery_id"
                       value="{$delivery.id}"
                       {if $order.delivery_id == $delivery.id}checked{/if}>
                <span>{$delivery.name}</span>
                {if $delivery.price > 0}
                    <span class="price">+{$delivery.price}</span>
                {/if}
            </label>
        {/foreach}
    </fieldset>

    {* Payment *}
    <fieldset>
        <legend>Payment method</legend>

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

    {* Comment *}
    <fieldset>
        <legend>Order comment</legend>
        <textarea name="order_comment" rows="3">{$order.order_comment}</textarea>
    </fieldset>

    {* Totals. The ids are required: JavaScript updates the amounts through
       them after a delivery or payment method is picked, without a reload *}
    <div class="order-total">
        <div>Products: <span id="ms3_order_cart_cost">{$order.cart_cost_formatted}</span></div>
        <div>Delivery: <span id="ms3_order_delivery_cost">{$order.delivery_cost_formatted}</span></div>
        {if $order.discount_cost}
            <div>Discount: <span>{$order.discount_cost_formatted}</span></div>
        {/if}
        <div class="total">
            <strong>Total: <span id="ms3_order_cost">{$order.cost_formatted}</span></strong>
        </div>
    </div>

    <button type="submit" class="btn btn-primary btn-lg">
        Place order
    </button>
</form>
{/if}
```

## Working from JavaScript

The form uses `OrderUI` + `ms3.orderAPI`. There is no public `ms3.order` object.

::: tip What refreshes itself and what does not
After a cart change only three amounts refresh — through the ids `#ms3_order_cart_cost`, `#ms3_order_delivery_cost` and `#ms3_order_cost`.

The form markup itself is not re-rendered: msOrder does not register for re-rendering, unlike msCart and msOrderTotal. The list of delivery methods, their prices and the free-delivery threshold stay as the page loaded them.
:::

```javascript
// Draft fields
await ms3.orderAPI.add('delivery_id', deliveryId)
await ms3.orderAPI.add('payment_id', paymentId)
await ms3.orderAPI.add('city', 'Moscow')
await ms3.orderAPI.add('order_comment', 'Call before delivery')

// Submit
const response = await ms3.orderAPI.submit()
if (response.success) {
  window.location.href = response.data.redirect
}
```

### Hooks

`hooks.js` is part of `ms3_frontend_assets` by default — check only if you overrode the setting.

```javascript
ms3Hooks.addHook('beforeSubmitOrder', async (data) => {
  // There is no order data here — the object is empty.
  // The one thing it can do is cancel the submission
  data.cancel = true
})

ms3Hooks.addHook('afterSubmitOrder', async ({ response }) => {
  if (response.success) {
    console.log('Order:', response.data.order_id)
  }
})
```

::: tip Need the form fields — use the other hook
`beforeSubmitOrder` receives an empty object: the submission goes out with no body, and the order is assembled on the server from the draft. To read or adjust what was entered, subscribe to `beforeFormSubmit` — it gets `entity`, `method` and `formData`. Cancelling works from either one: `data.cancel = true`.
:::

Details: [JavaScript API](/en/components/minishop3/development/javascript), [Frontend JS](/en/components/minishop3/development/frontend-js).
