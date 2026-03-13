---
title: Checkout
---
# Checkout

The checkout page is the final step of a purchase. MiniShop3 provides a ready-made page template and order form chunk with contact details, delivery and payment options.

[![](https://file.modx.pro/files/5/2/e/52ee1eb19597215187ec2cac0010586as.jpg)](https://file.modx.pro/files/5/2/e/52ee1eb19597215187ec2cac0010586a.png)

## Page structure

| Component | File | Chunk name in DB | Purpose |
|-----------|------|------------------|---------|
| Page template | `elements/templates/order.tpl` | — | Page layout, msOrder snippet call |
| Form chunk | `elements/chunks/ms3_order.tpl` | `tpl.msOrder` | Checkout form |

### Snippet call

```fenom
{'!msOrder' | snippet : [
    'tpl' => 'tpl.msOrder'
]}
```

::: warning Caching
The msOrder snippet must be called **uncached** (`!msOrder`), as it works with the user session.
:::

## Order form

The form contains the following sections:

| Section | Description |
|---------|-------------|
| Empty cart | Message and link to catalog (if cart is empty) |
| Contact details | First name, last name, email, phone, comment |
| Payment methods | Radio buttons with logo and description |
| Delivery methods | Radio buttons with logo and description |
| Delivery address | Postal code, region, city, street, building, entrance, floor, apartment |
| Saved addresses | Dropdown of previously saved addresses (for logged-in customers) |
| Totals panel | Products cost, delivery cost, total, cancel and submit buttons |

### Placeholders

The following data is available in the form chunk:

| Placeholder | Type | Description |
|-------------|------|-------------|
| `$isCartEmpty` | bool | Cart is empty |
| `$form` | array | Form field values (`$form.first_name`, `$form.email`, etc.) |
| `$order` | array | Order data (`$order.cost`, `$order.delivery_cost`, `$order.cart_cost`) |
| `$deliveries` | array | Delivery methods |
| `$payments` | array | Payment methods |
| `$addresses` | array | Customer's saved addresses |
| `$isCustomerAuth` | bool | Customer is logged in |

### Delivery and payment relationship

Each delivery contains a `payments` array with IDs of available payment methods. JavaScript automatically filters payments when delivery changes.

## Validation

### How field validation works

Required fields and validation rules are **configured per delivery method** in the admin panel. This allows, for example, requiring a full address for courier delivery but only an email for pickup.

Detailed documentation on setting up validation rules — in the [Delivery settings  → Order field validation](/en/components/minishop3/interface/settings/deliveries#order-field-validation) section.

### Validation process

1. When a field value is set (`ms3.order.setField`) — the server validates it against the delivery rules
2. When the order is submitted — the server checks that all required fields are filled
3. On error — the frontend highlights the problematic fields

### Error display

Each form field contains an `.invalid-feedback` container. On validation error, JavaScript adds the `is-invalid` class to the field and the error text to the container:

```fenom
<input type="text" name="email" class="form-control"
       value="{$form.email}">
<div class="invalid-feedback"></div>
```

### Checkbox validation

For a required checkbox (e.g., terms agreement), use the `accepted` rule in the delivery settings. It validates that the value is `"yes"`, `"on"`, `"1"`, or `true`.

## JavaScript API

### ms3.order object

```javascript
// Place order
ms3.order.submit();

// Update delivery method
ms3.order.setDelivery(deliveryId);

// Update payment method
ms3.order.setPayment(paymentId);

// Update form field
ms3.order.setField('city', 'Moscow');
```

### Events

```javascript
// Before order submission
document.addEventListener('ms3:order:before-submit', (e) => {
    console.log('Order data:', e.detail);
    // Cancel submission: e.preventDefault()
});

// After successful checkout
document.addEventListener('ms3:order:success', (e) => {
    console.log('Order created:', e.detail.order_id);
    window.location.href = e.detail.redirect;
});

// On checkout error
document.addEventListener('ms3:order:error', (e) => {
    console.error('Errors:', e.detail.errors);
});

// On delivery method change
document.addEventListener('ms3:order:delivery-changed', (e) => {
    console.log('Selected delivery:', e.detail.delivery_id);
});

// On payment method change
document.addEventListener('ms3:order:payment-changed', (e) => {
    console.log('Selected payment:', e.detail.payment_id);
});
```

## Server events

### Order field events

| Event | When | Parameters |
|-------|------|------------|
| `msOnBeforeAddToOrder` | Before adding a field | `key`, `value`, `draft` |
| `msOnAddToOrder` | After adding a field | `key`, `value`, `draft` |
| `msOnBeforeRemoveFromOrder` | Before removing a field | `key`, `draft` |
| `msOnRemoveFromOrder` | After removing a field | `key`, `draft` |

### Validation events

| Event | When | Parameters |
|-------|------|------------|
| `msOnBeforeValidateOrderValue` | Before value validation | `key`, `value`, `orderData` |
| `msOnValidateOrderValue` | Validation passed | `key`, `value` |
| `msOnErrorValidateOrderValue` | Validation error | `key`, `value`, `error` |

### Checkout events

| Event | When | Parameters |
|-------|------|------------|
| `msOnSubmitOrder` | Before checkout starts | `handler`, `draft`, `orderData`, `data` |
| `msOnBeforeCreateOrder` | Before order creation | `handler`, `msOrder` |
| `msOnCreateOrder` | After order creation | `handler`, `msOrder` |

## Customization

### Changing the order form

1. Create your own chunk, e.g. `tpl.myOrder`
2. Specify it in the call: `'tpl' => 'tpl.myOrder'`
3. Use the available placeholders from the [msOrder documentation](/en/components/minishop3/snippets/msorder)

### Adding custom fields

Custom fields (not part of the standard order model) are handled in two steps:

**1. Validation** — via [delivery validation rules](/en/components/minishop3/interface/settings/deliveries#order-field-validation).

Add the field in JSON mode of the delivery settings:

```json
{
  "first_name": "required",
  "email": "required|email",
  "agree": "accepted"
}
```

**2. Saving** — via a plugin, if the custom field value needs to be stored in the order.

Standard fields (`first_name`, `email`, `city`, etc.) are saved automatically. Custom fields (not in the `msOrder` / `msOrderAddress` model) need to be saved to the order's `properties` via a plugin:

```php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrder':
        // $msOrder is available from event parameters
        $address = $msOrder->Address;
        if ($address) {
            $properties = $msOrder->get('properties') ?: [];
            $properties['agree'] = $address->get('properties')['agree'] ?? '';
            $msOrder->set('properties', $properties);
        }
        break;
}
```

::: tip
If a custom field is used only for validation (e.g., an "I agree to the terms" checkbox), saving it is not necessary — the `accepted` rule in the delivery settings is sufficient.
:::

### Responsive layout

The form uses Bootstrap 5 Grid:

| Screen | Columns |
|--------|---------|
| < 992px | One section per row (100%) |
| ≥ 992px | Two sections per row (50% + 50%) |
