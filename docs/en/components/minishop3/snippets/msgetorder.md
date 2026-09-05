---
title: msGetOrder
---
# msGetOrder

Snippet for displaying order information. Used on the thank-you page or in the customer account.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **id** | | Order ID or UUID (takes precedence over GET) |
| **tpl** | `tpl.msGetOrder` | Order layout chunk |
| **includeThumbs** | | Comma-separated product image thumbnails |
| **includeContent** | `false` | Include product `content` field |
| **includeTVs** | | Comma-separated product TVs (pdoTools, `joinTVsTo` = `msProduct`) |
| **payStatus** | `1` | CSV of status IDs for which to show `payment_link`. Default `1` = draft; after checkout the order is usually in `ms3_status_new` (often `2`) — set the needed IDs explicitly |
| **toPlaceholder** | | Save result to placeholder |
| **showLog** | `false` | Show execution log |

The snippet does **not** support `return`: output is chunk HTML or a placeholder via `toPlaceholder`. Extra pdoTools `where`, `leftJoin`, `select` can be passed as JSON parameters.

## Order resolution

The snippet resolves the order in this order:

1. Snippet parameter `id` (ID or UUID)
2. GET parameter `msorder` (e.g. `?msorder=15` or `?msorder=uuid`)
3. Empty result if order not found

::: tip UUID access
Order UUID (36 characters) instead of numeric ID is useful for public links. With UUID, **access control is skipped** — anyone with the link can view the order. In the account area use numeric ID or customer login.
:::

## Access check

The order is shown if any of the following is true:

- Order is in user session (`$_SESSION['ms3']['orders']`)
- Order `user_id` matches current MODX user
- Order `customer_id` matches current customer (by token)
- User is logged in to manager (mgr context)
- Request by UUID (36 characters) — **no owner check**

## Examples

### Basic output

```fenom
{'msGetOrder' | snippet}
```

### With product thumbnails

```fenom
{'msGetOrder' | snippet : [
    'includeThumbs' => 'small'
]}
```

### Specific order by ID

```fenom
{'msGetOrder' | snippet : [
    'id' => 15,
    'includeThumbs' => 'small,medium'
]}
```

### Order by UUID

```fenom
{'msGetOrder' | snippet : [
    'id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
]}
```

### To placeholder

```fenom
{'msGetOrder' | snippet : [
    'toPlaceholder' => 'orderHtml'
]}

{if 'orderHtml' | placeholder}
    {'orderHtml' | placeholder}
{else}
    <p>Order not found</p>
{/if}
```

## Data structure in chunk

The chunk receives the following objects:

| Placeholder | Type | Description |
| --- | --- | --- |
| `{$order}` | array | Order data |
| `{$products}` | array | Order products array |
| `{$address}` | array | Delivery address |
| `{$delivery}` | array | Delivery method |
| `{$payment}` | array | Payment method |
| `{$total}` | array | Order totals |
| `{$payment_link}` | string | Payment link (if available) |

### order object

| Field | Description |
| --- | --- |
| `{$order.id}` | Order ID |
| `{$order.num}` | Formatted number (MS-00015) |
| `{$order.uuid}` | Order UUID |
| `{$order.status_id}` | Status ID |
| `{$order.cost}` | Total cost |
| `{$order.cart_cost}` | Cart cost |
| `{$order.delivery_cost}` | Delivery cost |
| `{$order.weight}` | Total weight |
| `{$order.createdon}` | Created date |
| `{$order.updatedon}` | Updated date |
| `{$order.order_comment}` | Order comment |
| `{$order.user_id}` | MODX user ID |
| `{$order.customer_id}` | Customer ID |

`msGetOrder` returns `$msOrder->toArray()`: there are no `status_name` / `status_color` fields on the object (unlike account `msCustomer`). Take the status name from the Status relation or a separate query.

### address object

| Field | Description |
| --- | --- |
| `{$address.first_name}` | First name |
| `{$address.last_name}` | Last name |
| `{$address.phone}` | Phone |
| `{$address.email}` | Email |
| `{$address.comment}` | Address comment |
| `{$address.index}` | Postal code |
| `{$address.country}` | Country |
| `{$address.region}` | Region/state |
| `{$address.city}` | City |
| `{$address.street}` | Street |
| `{$address.building}` | Building |
| `{$address.room}` | Apartment/office |

### delivery object

| Field | Description |
| --- | --- |
| `{$delivery.id}` | Delivery ID |
| `{$delivery.name}` | Name |
| `{$delivery.description}` | Description |
| `{$delivery.price}` | Cost |
| `{$delivery.logo}` | Logo |

### payment object

| Field | Description |
| --- | --- |
| `{$payment.id}` | Payment ID |
| `{$payment.name}` | Name |
| `{$payment.description}` | Description |
| `{$payment.logo}` | Logo |

### total object

| Field | Description |
| --- | --- |
| `{$total.cost}` | Total to pay (number) |
| `{$total.cost_formatted}` | Total with currency |
| `{$total.cart_cost}` | Cart cost (number) |
| `{$total.cart_cost_formatted}` | Cart cost with currency |
| `{$total.delivery_cost}` | Delivery cost (number) |
| `{$total.delivery_cost_formatted}` | Delivery with currency |
| `{$total.weight}` / `{$total.cart_weight}` | Total weight (number) |
| `{$total.weight_formatted}` | Weight with unit |
| `{$total.cart_count}` | Product count |
| `{$total.cart_discount}` | Discount amount (number) |

### products array

```fenom
{foreach $products as $product}
    {$product.name} — {$product.count} pcs. × {$product.price}
{/foreach}
```

For each product:

| Field | Description |
| --- | --- |
| `{$product.id}` | Product resource ID |
| `{$product.product_id}` | Product ID |
| `{$product.order_product_id}` | Order line ID |
| `{$product.name}` | Name |
| `{$product.pagetitle}` | Resource title |
| `{$product.article}` | SKU |
| `{$product.count}` | Quantity |
| `{$product.price}` | Unit price (number) |
| `{$product.old_price}` | Old price (number) |
| `{$product.cost}` | Line total (number) |
| `{$product.weight}` | Weight (number) |
| `{$product.discount_price}` | Discount per unit (number) |
| `{$product.discount_cost}` | Line discount (number) |
| `{$product.price_formatted}`, `{$product.cost_formatted}`, `{$product.weight_formatted}`, etc. | Formatted output with currency/unit |
| `{$product.options}` | Order line options (array) |
| `{$product.option.color}` | Option value as a separate field (`option.{key}`) |
| `{$product.thumb}` | Thumbnail (if includeThumbs) |

## Default chunk

The default chunk `tpl.msGetOrder` uses Bootstrap 5:

```fenom
{* tpl.msGetOrder *}
<div class="card shadow-sm mb-4">
    <div class="card-header bg-primary text-white">
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Order #{$order.num}</h5>
            <span class="badge bg-light text-dark">{$order.status_id}</span>
        </div>
    </div>
    <div class="card-body">
        {if $order.createdon}
            <p class="text-muted mb-2">
                <small>Order date: {$order.createdon | date_format:'%d.%m.%Y %H:%M'}</small>
            </p>
        {/if}

        {* Products table *}
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Product</th>
                    <th class="text-center">Qty</th>
                    <th class="text-end">Price</th>
                    <th class="text-end">Total</th>
                </tr>
            </thead>
            <tbody>
                {foreach $products as $product}
                    <tr>
                        <td>
                            <div class="d-flex align-items-center gap-3">
                                {if $product.thumb?}
                                    <img src="{$product.thumb}" alt="" class="img-thumbnail" width="50">
                                {/if}
                                <div>
                                    {if $product.id?}
                                        <a href="{$product.id | url}">{$product.pagetitle}</a>
                                    {else}
                                        {$product.name}
                                    {/if}
                                    {if $product.options?}
                                        <div class="small text-muted">{$product.options | join : '; '}</div>
                                    {/if}
                                </div>
                            </div>
                        </td>
                        <td class="text-center">{$product.count}</td>
                        <td class="text-end">{$product.price}</td>
                        <td class="text-end fw-bold">{$product.cost}</td>
                    </tr>
                {/foreach}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="text-end">Products:</td>
                    <td class="text-end fw-bold">{$total.cart_cost}</td>
                </tr>
                {if $total.delivery_cost}
                    <tr>
                        <td colspan="3" class="text-end">Delivery:</td>
                        <td class="text-end">{$total.delivery_cost}</td>
                    </tr>
                {/if}
                <tr class="table-primary">
                    <td colspan="3" class="text-end fw-bold fs-5">Total:</td>
                    <td class="text-end fw-bold fs-5">{$total.cost}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>

{* Delivery and payment *}
<div class="row g-4 mb-4">
    {if $delivery.name?}
        <div class="col-md-6">
            <div class="card h-100 bg-light">
                <div class="card-body">
                    <h6>Delivery method</h6>
                    <p class="fw-semibold mb-0">{$delivery.name}</p>
                </div>
            </div>
        </div>
    {/if}
    {if $payment.name?}
        <div class="col-md-6">
            <div class="card h-100 bg-light">
                <div class="card-body">
                    <h6>Payment method</h6>
                    <p class="fw-semibold mb-1">{$payment.name}</p>
                    {if $payment_link?}
                        <a href="{$payment_link}" class="btn btn-success btn-sm mt-2">
                            Pay order
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>

{* Contact details *}
{if $address.first_name || $address.phone}
    <div class="card bg-light">
        <div class="card-body">
            <h6>Contact details</h6>
            <div class="row g-3">
                {if $address.first_name?}
                    <div class="col-md-6">
                        <small class="text-muted">Receiver</small>
                        <div class="fw-semibold">{$address.first_name} {$address.last_name}</div>
                    </div>
                {/if}
                {if $address.phone?}
                    <div class="col-md-6">
                        <small class="text-muted">Phone</small>
                        <div class="fw-semibold">{$address.phone}</div>
                    </div>
                {/if}
                {if $address.email?}
                    <div class="col-md-6">
                        <small class="text-muted">Email</small>
                        <div class="fw-semibold">{$address.email}</div>
                    </div>
                {/if}
                {if $address.street?}
                    <div class="col-12">
                        <small class="text-muted">Delivery address</small>
                        <div class="fw-semibold">
                            {if $address.city?}{$address.city}, {/if}
                            {$address.street}
                            {if $address.building?}, bld. {$address.building}{/if}
                            {if $address.room?}, apt. {$address.room}{/if}
                        </div>
                    </div>
                {/if}
                {if $order.order_comment?}
                    <div class="col-12">
                        <small class="text-muted">Comment</small>
                        <div>{$order.order_comment}</div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
```

## Payment link

The payment link `{$payment_link}` is available when:

1. The payment method has a handler class (`class`) with a method that returns a URL
2. Order status is in the allowed list: snippet parameter `payStatus` (CSV) or system setting `ms3_payment_link_statuses` (fallback — `ms3_status_new`)
3. The order is not final and not in “paid” status — logic in `PaymentLinkResolver::isStatusEligibleForPaymentLink()`

```fenom
{'msGetOrder' | snippet : [
    'payStatus' => '2,3'  {* after submit status is usually ms3_status_new (2) *}
]}
```

## Thank you page

Typical use on the page after checkout:

```fenom
<div class="container py-5">
    <div class="text-center mb-5">
        <h1>Thank you for your order!</h1>
        <p class="lead">We will contact you shortly.</p>
    </div>

    {'msGetOrder' | snippet : [
        'includeThumbs' => 'small'
    ]}

    <div class="text-center mt-4">
        <a href="/" class="btn btn-primary">Back to home</a>
    </div>
</div>
```
