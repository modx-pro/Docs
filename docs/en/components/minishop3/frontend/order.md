---
title: Checkout
---
# Checkout

The checkout page is the final step of a purchase. MiniShop3 provides a ready-made page template and order form chunk with contact details, delivery and payment options.

## Page structure

| Component | File | Purpose |
|-----------|------|---------|
| Page template | `elements/templates/order.tpl` | Page layout, msOrder snippet call |
| Form chunk | `elements/chunks/ms3_order.tpl` | Checkout form |

## Order page template

**Path:** `core/components/minishop3/elements/templates/order.tpl`

The template extends the base template and contains:

```fenom
{extends 'file:templates/base.tpl'}
{block 'pagecontent'}
    <div class="container py-4">
        {* Breadcrumbs *}
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="/">{'site_name' | option}</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {$_modx->resource.pagetitle}
                </li>
            </ol>
        </nav>

        <main>
            <h1 class="mb-4">{$_modx->resource.pagetitle}</h1>

            {* Order form *}
            {'!msOrder' | snippet: [
                'tpl' => 'tpl.msOrder'
            ]}
        </main>
    </div>
{/block}
```

::: warning Caching
The msOrder snippet must be called **uncached** (`!msOrder`), as it works with the user session.
:::

## Order form

**Path:** `core/components/minishop3/elements/chunks/ms3_order.tpl`

**Chunk name in DB:** `tpl.msOrder`

The form contains the following sections:

### Form sections

| Section | Description |
|--------|-------------|
| Empty cart | Message and link to catalog |
| Contact details | First name, last name, email, phone |
| Delivery methods | Radio buttons with price and description |
| Payment methods | Radio buttons with description |
| Delivery address | City, street, building, apartment/office |
| Saved addresses | Choice from previously used addresses (for logged-in users) |
| Comment | Textarea for order notes |
| Totals | Products cost, delivery, discount, total |

### Cart check

At the beginning of the form, the presence of products is checked:

```fenom
{if $isCartEmpty}
    <div class="alert alert-info">
        <p>Your cart is empty.</p>
        <a href="/" class="btn btn-primary">Back to catalog</a>
    </div>
{else}
    {* Order form *}
{/if}
```

### Contact details

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Contact details</legend>

    <div class="row g-3">
        <div class="col-md-6">
            <label class="form-label">First name *</label>
            <input type="text"
                   class="form-control"
                   name="first_name"
                   value="{$form.first_name}"
                   required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Last name</label>
            <input type="text"
                   class="form-control"
                   name="last_name"
                   value="{$form.last_name}">
        </div>

        <div class="col-md-6">
            <label class="form-label">Email *</label>
            <input type="email"
                   class="form-control"
                   name="email"
                   value="{$form.email}"
                   required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Phone *</label>
            <input type="tel"
                   class="form-control"
                   name="phone"
                   value="{$form.phone}"
                   required>
        </div>
    </div>
</fieldset>
```

### Delivery methods

Deliveries are output from the `$deliveries` array:

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Delivery method</legend>

    {foreach $deliveries as $delivery}
        <div class="form-check mb-2">
            <input class="form-check-input"
                   type="radio"
                   name="delivery_id"
                   id="delivery_{$delivery.id}"
                   value="{$delivery.id}"
                   {if $order.delivery_id == $delivery.id}checked{/if}>
            <label class="form-check-label" for="delivery_{$delivery.id}">
                {if $delivery.logo}
                    <img src="{$delivery.logo}" alt="" class="me-2" style="height: 24px;">
                {/if}
                <strong>{$delivery.name}</strong>
                {if $delivery.price > 0}
                    <span class="text-muted ms-2">+{$delivery.price}</span>
                {else}
                    <span class="text-success ms-2">Free</span>
                {/if}
                {if $delivery.description}
                    <small class="d-block text-muted">{$delivery.description}</small>
                {/if}
            </label>
        </div>
    {/foreach}
</fieldset>
```

### Payment methods

Payments are filtered by selected delivery via JavaScript:

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Payment method</legend>

    {foreach $payments as $payment}
        <div class="form-check mb-2">
            <input class="form-check-input"
                   type="radio"
                   name="payment_id"
                   id="payment_{$payment.id}"
                   value="{$payment.id}"
                   {if $order.payment_id == $payment.id}checked{/if}>
            <label class="form-check-label" for="payment_{$payment.id}">
                {if $payment.logo}
                    <img src="{$payment.logo}" alt="" class="me-2" style="height: 24px;">
                {/if}
                <strong>{$payment.name}</strong>
                {if $payment.description}
                    <small class="d-block text-muted">{$payment.description}</small>
                {/if}
            </label>
        </div>
    {/foreach}
</fieldset>
```

### Delivery address

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Delivery address</legend>

    <div class="row g-3">
        <div class="col-12">
            <label class="form-label">City</label>
            <input type="text"
                   class="form-control"
                   name="city"
                   value="{$form.city}">
        </div>

        <div class="col-12">
            <label class="form-label">Street</label>
            <input type="text"
                   class="form-control"
                   name="street"
                   value="{$form.street}">
        </div>

        <div class="col-md-6">
            <label class="form-label">Building</label>
            <input type="text"
                   class="form-control"
                   name="building"
                   value="{$form.building}">
        </div>

        <div class="col-md-6">
            <label class="form-label">Apartment / office</label>
            <input type="text"
                   class="form-control"
                   name="room"
                   value="{$form.room}">
        </div>
    </div>
</fieldset>
```

### Saved addresses

For logged-in customers, a list of previously used addresses is displayed:

```fenom
{if $isCustomerAuth && $addresses}
    <fieldset class="mb-4">
        <legend class="h5 mb-3">Saved addresses</legend>

        <div class="list-group">
            {foreach $addresses as $address}
                <button type="button"
                        class="list-group-item list-group-item-action"
                        data-address-id="{$address.id}"
                        data-city="{$address.city}"
                        data-street="{$address.street}"
                        data-building="{$address.building}"
                        data-room="{$address.room}">
                    {$address.city}, {$address.street}, bld. {$address.building}
                    {if $address.room}, apt. {$address.room}{/if}
                </button>
            {/foreach}
        </div>
    </fieldset>
{/if}
```

When an address is clicked, JavaScript fills the form fields with the corresponding data.

### Totals panel

Right column with order totals:

```fenom
<div class="card">
    <div class="card-header">
        <h5 class="mb-0">Your order</h5>
    </div>
    <div class="card-body">
        <dl class="row mb-0">
            <dt class="col-7">Products:</dt>
            <dd class="col-5 text-end">{$order.cart_cost}</dd>

            <dt class="col-7">Delivery:</dt>
            <dd class="col-5 text-end">{$order.delivery_cost}</dd>

            {if $order.discount_cost != '0'}
                <dt class="col-7 text-success">Discount:</dt>
                <dd class="col-5 text-end text-success">−{$order.discount_cost}</dd>
            {/if}
        </dl>

        <hr>

        <div class="d-flex justify-content-between align-items-center">
            <strong class="fs-5">Total:</strong>
            <strong class="fs-4">{$order.cost}</strong>
        </div>
    </div>

    <div class="card-footer">
        <button type="submit" class="btn btn-primary btn-lg w-100">
            Place order
        </button>
    </div>
</div>
```

## JavaScript interaction

### ms3.order object

MiniShop3 provides a JavaScript API for working with the order:

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

### Event handling

```javascript
// Before order submission
document.addEventListener('ms3:order:before-submit', (e) => {
    console.log('Order data:', e.detail);
    // Cancel submission: e.preventDefault()
});

// After successful checkout
document.addEventListener('ms3:order:success', (e) => {
    console.log('Order created:', e.detail.order_id);
    // Automatic redirect to success page
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

### Address autofill

Example of handling a click on a saved address:

```javascript
document.querySelectorAll('[data-address-id]').forEach(btn => {
    btn.addEventListener('click', function() {
        // Fill form fields
        document.querySelector('[name="city"]').value = this.dataset.city;
        document.querySelector('[name="street"]').value = this.dataset.street;
        document.querySelector('[name="building"]').value = this.dataset.building;
        document.querySelector('[name="room"]').value = this.dataset.room;

        // Update data on server
        ms3.order.setField('city', this.dataset.city);
        ms3.order.setField('street', this.dataset.street);
        ms3.order.setField('building', this.dataset.building);
        ms3.order.setField('room', this.dataset.room);
    });
});
```

## Form validation

### Required fields

By default, the following are required:

- `first_name` — First name
- `email` — Email
- `phone` — Phone

### Error display

The `$errors` array contains the names of fields with errors:

```fenom
<input type="text"
       name="email"
       class="form-control {if 'email'|in:$errors}is-invalid{/if}"
       value="{$form.email}">
{if 'email'|in:$errors}
    <div class="invalid-feedback">Enter a valid email</div>
{/if}
```

## Delivery and payment relationship

Each delivery contains a `payments` array with IDs of available payment methods:

```fenom
{foreach $deliveries as $delivery}
    <input type="radio"
           name="delivery_id"
           value="{$delivery.id}"
           data-payments="{$delivery.payments|json_encode}">
{/foreach}
```

JavaScript uses this data to filter payments when delivery changes.

## Customization

### Changing the page template

1. Copy `order.tpl` to your theme
2. Change the layout and msOrder snippet parameters
3. Assign the template to the checkout page

### Changing the order form

1. Create your own chunk, e.g. `tpl.myOrder`
2. Specify it in the call: `'tpl' => 'tpl.myOrder'`
3. Use the available placeholders from the [msOrder documentation](/en/components/minishop3/snippets/msorder)

### Adding fields

To add custom fields:

1. Add the field to the form chunk
2. Handle it in a plugin on the `msOnBeforeOrderCreate` event
3. Save it in order properties or user profile

```php
// Plugin to save custom field
switch ($modx->event->name) {
    case 'msOnBeforeOrderCreate':
        $properties = $order->get('properties') ?: [];
        $properties['custom_field'] = $_POST['custom_field'] ?? '';
        $order->set('properties', $properties);
        break;
}
```

## Responsive layout

The form uses Bootstrap 5 Grid with responsive columns:

| Screen | Form | Totals |
|--------|------|--------|
| < 992px | 12 columns (100%) | 12 columns (100%) |
| ≥ 992px | 8 columns (~66%) | 4 columns (~33%) |

```html
<div class="row">
    <div class="col-lg-8">
        {* Order form *}
    </div>
    <div class="col-lg-4">
        {* Totals panel *}
    </div>
</div>
```
