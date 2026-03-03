---
title: msAltCart
description: Dynamic cart for MiniShop2 with JS API.
outline: [ 2,3 ]
lastUpdated: true
logo: https://msaltcart.art-sites.ru/assets/components/msaltcart/logo.jpg
modstore: https://modstore.pro/packages/integration/msaltcart
repository: https://github.com/ShevArtV/msaltcart
author: ShevArtV
items: [
  { text: 'Getting started', link: 'index' },
  { text: 'Snippets', link: 'snippets' },
  { text: 'JavaScript', link: 'javascript' },
  { text: 'Events', link: 'events' },
  { text: 'Number input field', link: 'inputnumber' },

]
dependencies: [ 'pdoTools', 'SendIt', 'miniShop2' ]
---

# msAltCart

This page shows chunk examples, attribute descriptions, and snippet calls. Use the right sidebar to jump to the section you need.
::: danger
The component does not work correctly with other components that change product keys in the cart, such as msPromoCode2.
:::
::: warning
Before installing, ensure **pdoTools**, **SendIt**, and **miniShop2** are already installed.
:::
::: tip
This component can replace the main cart. It supports standard miniShop2 JS events. Compatibility with other add-ons has not been tested, so using it as the main cart may break functionality from other components, including checkout.
:::

## Requirements

1. miniShop2 >= 3.0.7
2. SendIt >= 2.0.2
3. PHP >= 7.4 (PHP 8 not tested, but IDE reports no errors).

## Features

1. Multiple carts on one page.
2. Dynamic updates for all carts.
3. Each cart can have its own template.
4. Change options in the cart.
5. JS API for programmatic cart control.
6. Get cart status and contents on the frontend.
7. Customize behavior via JS events.
8. Supports msOptionsPrice2 modifications.
9. Customizable quantity input field.

## Behavior

1. The component replaces the default cart handler with its own.
2. The component makes getProductKey() public.
3. The component adds a plugin on **msOnCreateOrder** that sets the product name to the modification name when a modification is selected.

## Basic usage

Add a dynamic cart that slides in from the left using [offcanvas](https://bootstrap-4.ru/docs/5.0/components/offcanvas/).

:::warning
The example below uses Bootstrap 5. For it to work on your site, include Bootstrap 5 scripts and styles as in the [documentation](https://bootstrap-4.ru/docs/5.0/getting-started/download/#cdn-via-jsdelivr).
:::

:::danger
Do not mix standard miniShop2 attributes with this component's attributes. The only exception is the **ms2_form** class.
:::

### Steps

1. Create a wrapper chunk.
2. Create a row (product) chunk (optional).
3. Call the [getCarts](https://docs.modx.pro/components/msaltcart/snippets#getcarts) snippet in the template.
4. Insert the placeholder where the dynamic cart should appear.
5. Use the cart.

## Wrapper chunk

```fenom:line-numbers
<div data-msac-rows class="{!$rows ? 'd-none':''}">
  {$rows}
</div>
<div class="col-12 {!$rows ? 'd-none':''}" data-msac-totals>
  <div class="row">
    <p class="col-5 mb-3 h6">Total: <br><span  data-msac-prop="total_cost">{$total.cost}</span> {'ms2_frontend_currency' | lexicon}</p>
    <p class="col-3 mb-3 h6">Weight: <br><span data-msac-prop="total_weight">{$total.weight}</span> {'ms2_frontend_weight_unit' | lexicon}</p>
    <p class="col-4 mb-3 h6">Qty: <br><span data-msac-prop="total_count">{$total.count}</span> {'ms2_frontend_count_unit' | lexicon}</p>
    <div class="col-6">
      <button class="btn btn-danger" type="button" data-si-form data-si-preset="cart_clean" data-si-event="click">
        {'ms2_cart_clean' | lexicon}
      </button>
    </div>
    <div class="col-6">
      <a href="{179 | url}" class="btn btn-primary">Checkout</a>
    </div>
  </div>
</div>

<div class="alert alert-warning {$rows ? 'd-none':''}" data-msac-empty>
    {'ms2_cart_is_empty' | lexicon}
</div>
```

This chunk has three **separate** blocks marked by the corresponding attributes.

### Product list

**data-msac-rows** — block for the product list. If missing, products will not be shown.

```fenom:line-numbers
<div data-msac-rows class="{!$rows ? 'd-none':''}">
  {$rows}
</div>
```

### Totals

**data-msac-totals** — block for total price, weight, and quantity.

```fenom:line-numbers
<div class="col-12 {!$rows ? 'd-none':''}" data-msac-totals>
  <div class="row">
    <p class="col-5 mb-3 h6">Total: <br><span  data-msac-prop="total_cost">{$total.cost}</span> {'ms2_frontend_currency' | lexicon}</p>
    <p class="col-3 mb-3 h6">Weight: <br><span data-msac-prop="total_weight">{$total.weight}</span> {'ms2_frontend_weight_unit' | lexicon}</p>
    <p class="col-4 mb-3 h6">Qty: <br><span data-msac-prop="total_count">{$total.count}</span> {'ms2_frontend_count_unit' | lexicon}</p>
    <div class="col-6">
      <button class="btn btn-danger" type="button" data-si-form data-si-preset="cart_clean" data-si-event="click">
        {'ms2_cart_clean' | lexicon}
      </button>
    </div>
    <div class="col-6">
      <a href="{179 | url}" class="btn btn-primary">Checkout</a>
    </div>
  </div>
</div>
```

### Empty cart

**data-msac-empty** — block shown when the cart is empty.

```fenom:line-numbers
<div class="alert alert-warning {$rows ? 'd-none':''}" data-msac-empty>
  {'ms2_cart_is_empty' | lexicon}
</div>
```

:::danger
No block should be nested inside another.
:::

### Clearing the cart

Because [SendIt](https://docs.modx.pro/components/sendit/#standartnoe-ispolzovanie) is used to send data to the server, the clear-cart button must have these attributes:

* **data-si-form** — no value.
* **data-si-preset** — value **cart_clean**.
* **data-si-event** — value **click** to clear on click.

```fenom:line-numbers
<button class="btn btn-danger" type="button" data-si-form data-si-preset="cart_clean" data-si-event="click">
  {'ms2_cart_clean' | lexicon}
</button>
```

### Outputting data

Use **data-msac-prop** to output any cart data by key (the key is the attribute value):

```fenom:line-numbers
<span data-msac-prop="total_cost">{$total.cost}</span>
```

## Product row chunk

:::danger
This chunk is optional. If you only need totals (e.g. in the header), do not set the **row** parameter in [getCarts](https://docs.modx.pro/components/msaltcart/snippets#getcarts).
:::

```fenom:line-numbers
<div class="col-12 py-2" data-msac-product="{$key}">
  <div class="row align-items-center justify-content-between">
    <div class="col-12 mb-3 d-flex" style="gap:15px;">
      {if $thumb?}
        <img src="{$thumb}" alt="{$pagetitle}" title="{$pagetitle}"/>
      {else}
        <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
          srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
          alt="{$pagetitle}" title="{$pagetitle}"/>
      {/if}
      <form data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
        <input type="hidden" name="key" value="{$key}"/>
        {if $id?}
          <a href="{$id | url}">{$pagetitle}</a>
        {else}
          {$name}
        {/if}
        {'!msOptions' | snippet: [
          'options' => 'color',
          'product' => $id,
          'currentOptions' => $options,
          'tpl' => '@FILE chunks/selectoption.tpl'
        ]}
        <div class="small">
          Sizes: {$options['size']}
        </div>

        <form class="col-10 mb-3" data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
            <input type="hidden" name="key" value="{$key}"/>
            <div class="ms-input-number-wrap">
                <button class="ms-input-number-btn ms-input-number-minus btn btn-sm btn-secondary" type="button">&#8722;</button>
                <input class="ms-input-number-emulator" value="{$count}" name="count" data-msac-prop="count" type="text">
                <button class="ms-input-number-btn ms-input-number-plus btn btn-sm btn-secondary" type="button">&#43;</button>
            </div>
        </form>
        <form class="col-2 mb-3" data-si-form data-si-preset="cart_remove">
            <input type="hidden" name="key" value="{$key}">
            <button class="btn btn-sm btn-danger" type="button" data-si-preset="cart_remove" data-si-event="click">&times;</button>
        </form>
        <div class="col-3 mb-3">
            <span class="text-nowrap">{$weight} {'ms2_frontend_weight_unit' | lexicon}</span>
        </div>
        <div class="col-6 mb-3">
            <span class="mr-2 text-nowrap">{$price | replace: ' ': '' | number: 0: '.': ' '} {'ms2_frontend_currency' | lexicon}</span>
            {if $old_price?}
                <s class="old_price text-nowrap">{$old_price | replace: ' ': '' | number: 0: '.': ' '} {'ms2_frontend_currency' | lexicon}</s>
            {/if}
        </div>
        <div class="col-3 mb-3">
            <span class="mr-2 text-nowrap"><span data-msac-prop="cost">{$cost | replace: ' ': '' | number: 0: '.': ' '}</span> {'ms2_frontend_currency' | lexicon}</span>
        </div>
      </form>
    </div>
    <form class="col-10 mb-3" data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
      <input type="hidden" name="key" value="{$key}"/>
      <div class="ms-input-number-wrap">
        <button class="ms-input-number-btn ms-input-number-minus btn btn-sm btn-secondary" type="button">&#8722;</button>
        <input class="ms-input-number-emulator" value="{$count}" name="count" data-msac-prop="count" type="text">
        <button class="ms-input-number-btn ms-input-number-plus btn btn-sm btn-secondary" type="button">&#43;</button>
      </div>
    </form>
    <form class="col-2 mb-3" data-si-form data-si-preset="cart_remove">
      <input type="hidden" name="key" value="{$key}">
      <button class="btn btn-sm btn-danger" type="button" data-si-event="click">&times;</button>
    </form>
    <div class="col-3 mb-3">
      <span class="text-nowrap">{$weight} {'ms2_frontend_weight_unit' | lexicon}</span>
    </div>
    <div class="col-6 mb-3">
      <span class="mr-2 text-nowrap">{$price | replace: ' ': '' | number: 0: '.': ' '} {'ms2_frontend_currency' | lexicon}</span>
      {if $old_price?}
        <s class="old_price text-nowrap">{$old_price | replace: ' ': '' | number: 0: '.': ' '} {'ms2_frontend_currency' | lexicon}</s>
      {/if}
    </div>
    <div class="col-3 mb-3">
      <span class="mr-2 text-nowrap"><span data-msac-prop="cost">{$cost | replace: ' ': '' | number: 0: '.': ' '}</span> {'ms2_frontend_currency' | lexicon}</span>
    </div>
  </div>
</div>
```

:::warning
All product data must be inside a block with **data-msac-product** set to the product key in the cart.
:::

### Changing options

To allow changing a product option in the dynamic cart, wrap the select for that option in a form. For multiple options you can use one form or several. Each form must have:

* **data-si-form** — no value.
* **data-si-preset** — value **cart_change**
* **data-si-event** — value **change** so the cart updates when the form changes.
* **data-si-nosave** — no value, so selected values are not saved.
And a hidden input **key** with the product key value.

```fenom:line-numbers
<form data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
  <input type="hidden" name="key" value="{$key}"/>
  {if $id?}
    <a href="{$id | url}">{$pagetitle}</a>
  {else}
    {$name}
  {/if}
  {'!msOptions' | snippet: [
    'options' => 'color',
    'product' => $id,
    'currentOptions' => $options,
    'tpl' => '@FILE chunks/selectoption.tpl'
  ]}
  <div class="small">
    Sizes: {$options['size']}
  </div>
  <div class="small">
    Weight: {$options['weight']}
  </div>
</form>
```

### Changing quantity

Quantity is changed the same way; for a custom quantity field use the [custom plugin](https://docs.modx.pro/components/msaltcart/inputnumber).

```fenom:line-numbers
<form class="col-10 mb-3" data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
  <input type="hidden" name="key" value="{$key}"/>
  <div class="ms-input-number-wrap">
    <button class="ms-input-number-btn ms-input-number-minus btn btn-sm btn-secondary" type="button">&#8722;</button>
    <input class="ms-input-number-emulator" value="{$count}" name="count" data-msac-prop="count" type="text">
    <button class="ms-input-number-btn ms-input-number-plus btn btn-sm btn-secondary" type="button">&#43;</button>
  </div>
</form>
```

### Removing a product

To allow removing a product from the cart, add a form in the product chunk with:

* **data-si-form** — no value.
* **data-si-preset** — value **cart_remove**

Inside the form add a hidden input **key** with the product key and a button with **type="button"** and **data-si-event="click"**.

```fenom:line-numbers
<form class="col-2 mb-3" data-si-form>
    <input type="hidden" name="key" value="{$key}">
    <button class="btn btn-sm btn-danger" type="button" data-si-preset="cart_remove" data-si-event="click">&times;</button>
</form>
```

### Outputting properties

For dynamic updates, each block that shows a property must have **data-msac-prop** with the property key (for line total use **cost**):

```fenom:line-numbers
<span data-msac-prop="cost">{$cost | replace : ' ' : '' | number : 0 : '.' : ' '}</span>
```

## Snippet call

The [getCarts](https://docs.modx.pro/components/msaltcart/snippets#getcarts) snippet has a single parameter **tpls**, which takes a JSON string.

```fenom:line-numbers
{'!getCarts' | snippet: [
  'tpls' => '{ "maincart": { "wrapper":"@FILE msac/cart.tpl","row":"@FILE msac/cartrow.tpl" } }'
]}
```

:::warning
Call the snippet uncached.
:::

## Placeholder

Because the dynamic cart should appear on all pages, place the placeholder before the closing **body** tag.

```fenom:line-numbers
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Cart</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body" data-msac-cart="maincart" data-mspd-cart-wrap>
    {'maincart' | placeholder}
  </div>
</div>
```

:::warning
The placeholder name must match the key in the snippet's JSON, and the placeholder must be inside a block with **data-mspd-cart-wrap** and **data-msac-cart**. **data-msac-cart** must equal the placeholder name.
:::

## System settings

| Key                 | Description              | Default value                                      |
|:-------------------:|:------------------------:|:--------------------------------------------------:|
| **msac_frontend_js** | Path to main JS scripts | *assets/components/msaltcart/js/web/default.js*   |
