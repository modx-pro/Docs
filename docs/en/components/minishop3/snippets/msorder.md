---
title: msOrder
---
# msOrder

Snippet for the checkout form. Shows customer fields, delivery and payment methods.

::: warning Caching
The snippet uses the user session and must be called **uncached** (`!msOrder`).
:::

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msOrder` | Order form chunk |
| **userFields** | | Mapping of MODX profile fields (modUserProfile) to order fields (JSON). Used when `ms3_customer_sync_enabled = true` |
| **customerFields** | | Mapping of customer fields (msCustomer) to order fields (JSON). Used when `ms3_customer_sync_enabled = false` |
| **includeDeliveryFields** | `id` | Comma-separated delivery fields (`*` = all) |
| **includePaymentFields** | `*` | Comma-separated payment fields (`*` = all) |
| **includeCustomerAddresses** | `true` | Load saved customer addresses |
| **showLog** | `false` | Show execution log |
| **return** | `tpl` | Output format: `tpl`, `data` |

## Examples

### Basic output

```fenom
{'!msOrder' | snippet}
```

### Customer fields mapping (msCustomer)

When sync is disabled (`ms3_customer_sync_enabled = false`), data is taken from msCustomer:

```fenom
{'!msOrder' | snippet : [
    'customerFields' => '{"company": "company_name", "inn": "tax_id"}'
]}
```

### MODX profile fields mapping (modUserProfile)

When sync is enabled (`ms3_customer_sync_enabled = true`), data is taken from modUserProfile:

```fenom
{'!msOrder' | snippet : [
    'userFields' => '{"company": "extended.company_name"}'
]}
```

::: tip Data source
- `ms3_customer_sync_enabled = false` (default): use `customerFields` and msCustomer data
- `ms3_customer_sync_enabled = true`: use `userFields` and modUserProfile data

Only one source is active at a time, depending on the setting.
:::

### Get data

```fenom
{'!msOrder' | snippet : [
    'return' => 'data'
]}
```

## Data structure

With `return=data` the snippet returns an array:

```php
[
    'order' => [
        'delivery_id' => 1,
        'payment_id' => 2,
        'comment' => '...',
        'cost' => '5 300',           // Total (formatted)
        'cart_cost' => '5 000',      // Products cost
        'delivery_cost' => '300',    // Delivery cost
        'discount_cost' => '0',      // Discount
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
    'addresses' => [                 // Saved addresses (when includeCustomerAddresses)
        [
            'id' => 1,
            'city' => 'New York',
            'street' => 'Main St',
            // ...
        ],
    ],
    'errors' => [],                  // Fields with validation errors
    'isCustomerAuth' => true,       // Whether customer is logged in
    'isCartEmpty' => false,          // Whether cart is empty
]
```

## Placeholders in chunk

### Form data (contacts and address)

- `{$form.first_name}` — First name
- `{$form.last_name}` — Last name
- `{$form.email}` — Email
- `{$form.phone}` — Phone
- `{$form.city}` — City
- `{$form.street}` — Street
- `{$form.building}` — Building
- `{$form.room}` — Apartment/office

### State flags

- `{$isCustomerAuth}` — Whether customer is logged in (bool)
- `{$isCartEmpty}` — Whether cart is empty (bool)

### Delivery methods

```fenom
{foreach $deliveries as $delivery}
    <label>
        <input type="radio"
               name="delivery"
               value="{$delivery.id}"
               {if $order.delivery_id == $delivery.id}checked{/if}>
        {$delivery.name}
        {if $delivery.price > 0}
            — {$delivery.price}
        {/if}
    </label>
{/foreach}
```

### Payment methods

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

### Totals

- `{$order.cart_cost}` — Products cost
- `{$order.delivery_cost}` — Delivery cost
- `{$order.discount_cost}` — Discount
- `{$order.cost}` — Total to pay

## Example chunk

```fenom
{* tpl.msOrder *}
{if $isCartEmpty}
    <div class="alert alert-warning">Cart is empty</div>
{else}
<form class="ms-order ms3_form" method="post">
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
        <textarea name="comment" rows="3">{$order.comment}</textarea>
    </fieldset>

    {* Total *}
    <div class="order-total">
        <div>Products: <span>{$order.cart_cost}</span></div>
        <div>Delivery: <span>{$order.delivery_cost}</span></div>
        {if $order.discount_cost}
            <div>Discount: <span>{$order.discount_cost}</span></div>
        {/if}
        <div class="total">
            <strong>Total: <span>{$order.cost}</span></strong>
        </div>
    </div>

    <button type="submit" class="btn btn-primary btn-lg">
        Place order
    </button>
</form>
{/if}
```

## JavaScript API

```javascript
// Submit order
ms3.order.submit();

// Update delivery method
ms3.order.setDelivery(deliveryId);

// Update payment method
ms3.order.setPayment(paymentId);

// Update field
ms3.order.setField(name, value);
```

## Events

Order submission triggers events:

```javascript
// Before submit
document.addEventListener('ms3:order:before-submit', (e) => {
    console.log('Order data:', e.detail);
});

// After successful submit
document.addEventListener('ms3:order:success', (e) => {
    console.log('Order created:', e.detail.order_id);
    window.location.href = e.detail.redirect;
});

// On error
document.addEventListener('ms3:order:error', (e) => {
    console.error('Error:', e.detail.message);
});
```
