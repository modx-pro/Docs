---
title: Order history
description: Customer order history page
---
# Order history

Customer order history page. Shows all orders with status filter and pagination, plus full details for a single order.

## Page structure

| Component | Chunk | Purpose |
|-----------|------|----------|
| Base layout | `tpl.msCustomer.base` | Wrapper with sidebar |
| Sidebar | `tpl.msCustomer.sidebar` | Account navigation |
| Order list | `tpl.msCustomer.orders` | Orders table |
| Order row | `tpl.msCustomer.order.row` | Single order row |
| Order details | `tpl.msCustomer.order.details` | Full order info |

## Snippet call

```fenom
{'!msCustomer' | snippet: [
    'service' => 'orders',
    'limit' => 20
]}
```

### Parameters

| Parameter | Default | Description |
|----------|---------|-------------|
| **service** | | Service type (`orders`) |
| **tpl** | `tpl.msCustomer.orders` | Order list chunk |
| **orderTpl** | `tpl.msCustomer.order.row` | Order row chunk |
| **detailTpl** | `tpl.msCustomer.order.details` | Order details chunk |
| **limit** | `20` | Orders per page |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Chunk for guests |
| **return** | `tpl` | Format: `tpl` or `data` |

## Modes

| URL | Mode | Description |
|-----|------|-------------|
| `/cabinet/orders/` | List | Orders table |
| `/cabinet/orders/?order_id=15` | Details | Order #15 info |
| `/cabinet/orders/?status=2` | Filter | Orders with status 2 |
| `/cabinet/orders/?offset=20` | Pagination | Second page |

## Order list placeholders

### In tpl.msCustomer.orders

| Placeholder | Type | Description |
|-------------|-----|-------------|
| `{$orders}` | string | Rendered order rows (HTML) |
| `{$orders_count}` | int | Orders on page |
| `{$total}` | int | Total orders |
| `{$statuses}` | array | Statuses for filter |
| `{$pagination}` | array | Pagination data |
| `{$customer}` | array | Customer data |

### In tpl.msCustomer.order.row

| Placeholder | Type | Description |
|-------------|-----|-------------|
| `{$id}` | int | Order ID |
| `{$num}` | string | Order number (MS-00015) |
| `{$createdon_formatted}` | string | Created date |
| `{$cost_formatted}` | string | Order total |
| `{$status_id}` | int | Status ID |
| `{$status_name}` | string | Status name |
| `{$status_color}` | string | Status color (HEX without #) |

## Order list chunk

```fenom
{* tpl.msCustomer.orders *}
{extends 'tpl.msCustomer.base'}

{block 'content'}
<div class="ms3-customer-orders">
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">{'ms3_customer_orders_title' | lexicon}</h5>
        </div>
        <div class="card-body">
            {* Status filter *}
            {if $statuses}
            <form class="mb-4" method="get" action="">
                <div class="row align-items-end">
                    <div class="col-md-4">
                        <label for="status-filter" class="form-label">
                            {'ms3_customer_orders_filter_by_status' | lexicon}
                        </label>
                        <select class="form-select" id="status-filter" name="status"
                                onchange="this.form.submit()">
                            <option value="">
                                {'ms3_customer_orders_all_statuses' | lexicon}
                            </option>
                            {foreach $statuses as $status}
                            <option value="{$status.id}" {if $status.selected}selected{/if}>
                                {$status.name}
                            </option>
                            {/foreach}
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-secondary"
                                onclick="location.href='?'">
                            {'ms3_customer_orders_reset_filter' | lexicon}
                        </button>
                    </div>
                </div>
            </form>
            {/if}

            {* Order list *}
            {if $orders_count > 0}
            <div class="table-responsive">
                <table class="table table-hover align-middle ms3-order-table">
                    <thead class="table-light">
                        <tr>
                            <th>{'ms3_customer_order_num' | lexicon}</th>
                            <th>{'ms3_customer_order_date' | lexicon}</th>
                            <th>{'ms3_customer_order_status' | lexicon}</th>
                            <th class="text-end">{'ms3_customer_order_total' | lexicon}</th>
                            <th class="col-actions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {$orders}
                    </tbody>
                </table>
            </div>

            {* Pagination *}
            {if $pagination.total_pages > 1}
            <nav aria-label="{'ms3_customer_orders_pagination' | lexicon}">
                <ul class="pagination justify-content-center">
                    {if $pagination.has_prev}
                    <li class="page-item">
                        <a class="page-link" href="?offset={$pagination.prev_offset}">
                            {'ms3_customer_orders_prev' | lexicon}
                        </a>
                    </li>
                    {/if}

                    {foreach $pagination.pages as $page}
                    <li class="page-item {if $page.active}active{/if}">
                        <a class="page-link" href="?offset={$page.offset}">
                            {$page.num}
                        </a>
                    </li>
                    {/foreach}

                    {if $pagination.has_next}
                    <li class="page-item">
                        <a class="page-link" href="?offset={$pagination.next_offset}">
                            {'ms3_customer_orders_next' | lexicon}
                        </a>
                    </li>
                    {/if}
                </ul>
            </nav>
            {/if}

            <div class="text-muted small mt-3">
                {'ms3_customer_orders_total' | lexicon}: {$total}
            </div>
            {else}
            <div class="alert alert-info" role="alert">
                {'ms3_customer_orders_empty' | lexicon}
            </div>
            {/if}
        </div>
    </div>
</div>
{/block}
```

## Order row chunk

```fenom
{* tpl.msCustomer.order.row *}
<tr>
    <td>
        <a href="?order_id={$id}" class="fw-semibold text-decoration-none">
            №{$num}
        </a>
    </td>
    <td class="text-nowrap">
        {$createdon_formatted}
    </td>
    <td>
        <span class="badge" style="background-color: #{$status_color};">
            {$status_name}
        </span>
    </td>
    <td class="text-end text-nowrap fw-bold">
        {$cost_formatted} {'ms3_frontend_currency' | lexicon}
    </td>
    <td class="text-end">
        <a href="?order_id={$id}" class="btn btn-sm btn-outline-primary">
            {'ms3_customer_order_view' | lexicon}
        </a>
    </td>
</tr>
```

## Order details placeholders

### In tpl.msCustomer.order.details

| Placeholder | Type | Description |
|-------------|-----|-------------|
| `{$order}` | array | Order data |
| `{$order.id}` | int | Order ID |
| `{$order.num}` | string | Order number |
| `{$order.status_name}` | string | Status name |
| `{$order.status_color}` | string | Status color |
| `{$order.createdon_formatted}` | string | Created date |
| `{$order.comment}` | string | Order comment |
| `{$products}` | array | Order products |
| `{$delivery}` | array | Delivery method |
| `{$payment}` | array | Payment method |
| `{$address}` | array | Delivery address |
| `{$total}` | array | Order totals |
| `{$customer}` | array | Customer data |

### Product in order ({$products})

| Name | Description |
|------|----------|
| `{$product.product_id}` | Product ID |
| `{$product.pagetitle}` | Name |
| `{$product.article}` | SKU |
| `{$product.count}` | Quantity |
| `{$product.price}` | Price (formatted) |
| `{$product.old_price}` | Old price |
| `{$product.cost}` | Total (formatted) |
| `{$product.weight}` | Weight |
| `{$product.options}` | Product options (array) |

### Totals ({$total})

| Name | Description |
|------|----------|
| `{$total.cost}` | Total to pay |
| `{$total.cart_cost}` | Products cost |
| `{$total.delivery_cost}` | Delivery cost |
| `{$total.weight}` | Total weight |

## Order details chunk

```fenom
{* tpl.msCustomer.order.details *}
<div class="ms3-customer-order-details">
    {* Back navigation *}
    <div class="mb-3">
        <a href="?" class="btn btn-sm btn-outline-secondary">
            ← {'ms3_customer_orders_back' | lexicon}
        </a>
    </div>

    {* Order info *}
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    {'ms3_customer_order_title' | lexicon} №{$order.num}
                </h5>
                <span class="badge bg-light text-dark"
                      style="color: #{$order.status_color} !important;">
                    {$order.status_name}
                </span>
            </div>
        </div>
        <div class="card-body">
            <p class="text-muted mb-2">
                <small>
                    {'ms3_customer_order_created' | lexicon}: {$order.createdon_formatted}
                </small>
            </p>

            {* Products table *}
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>{'ms3_cart_title' | lexicon}</th>
                            <th class="text-center">{'ms3_cart_count' | lexicon}</th>
                            <th class="text-end">{'ms3_cart_price' | lexicon}</th>
                            <th class="text-end">{'ms3_cart_cost' | lexicon}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foreach $products as $product}
                        <tr>
                            <td>
                                <div class="fw-semibold">{$product.pagetitle}</div>
                                {if $product.article}
                                <div class="small text-muted">
                                    {'ms3_frontend_article' | lexicon}: {$product.article}
                                </div>
                                {/if}
                                {if $product.options && count($product.options) > 0}
                                <div class="small text-muted mt-1">
                                    {foreach $product.options as $option => $value}
                                    {$option}: {$value}{if !$value@last}; {/if}
                                    {/foreach}
                                </div>
                                {/if}
                            </td>
                            <td class="text-center">
                                <span class="badge bg-secondary">
                                    {$product.count} {'ms3_frontend_count_unit' | lexicon}
                                </span>
                            </td>
                            <td class="text-end">
                                {if $product.old_price && $product.old_price > $product.price}
                                <div class="text-decoration-line-through text-muted small">
                                    {$product.old_price}
                                </div>
                                {/if}
                                <div class="fw-semibold">{$product.price}</div>
                            </td>
                            <td class="text-end fw-bold">
                                {$product.cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                        {/foreach}
                    </tbody>
                    <tfoot class="table-light">
                        <tr>
                            <td colspan="3" class="text-end fw-bold">
                                {'ms3_frontend_cart_total' | lexicon}:
                            </td>
                            <td class="text-end fw-bold">
                                {$total.cart_cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                        {if $total.delivery_cost}
                        <tr>
                            <td colspan="3" class="text-end">
                                {'ms3_frontend_delivery' | lexicon}:
                            </td>
                            <td class="text-end">
                                {$total.delivery_cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                        {/if}
                        <tr class="fw-bold">
                            <td colspan="3" class="text-end fs-5">
                                {'ms3_frontend_total' | lexicon}:
                            </td>
                            <td class="text-end fs-5">
                                {$total.cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    {* Delivery address *}
    {if $address && count($address) > 0}
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-light">
            <h6 class="mb-0">{'ms3_frontend_delivery_address' | lexicon}</h6>
        </div>
        <div class="card-body">
            <p class="mb-0">
                {if $address.index}{$address.index}, {/if}
                {$address.city}
                {if $address.region}, {$address.region}{/if}
                {if $address.country}, {$address.country}{/if}
                <br>
                {$address.street}
                {if $address.building}, {$address.building}{/if}
                {if $address.room}, {$address.room}{/if}
            </p>
        </div>
    </div>
    {/if}

    {* Delivery and payment *}
    <div class="row">
        {if $delivery && count($delivery) > 0}
        <div class="col-md-6">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-light">
                    <h6 class="mb-0">{'ms3_frontend_delivery_method' | lexicon}</h6>
                </div>
                <div class="card-body">
                    <p class="mb-0">{$delivery.name}</p>
                    {if $delivery.description}
                    <small class="text-muted">{$delivery.description}</small>
                    {/if}
                </div>
            </div>
        </div>
        {/if}

        {if $payment && count($payment) > 0}
        <div class="col-md-6">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-light">
                    <h6 class="mb-0">{'ms3_frontend_payment_method' | lexicon}</h6>
                </div>
                <div class="card-body">
                    <p class="mb-0">{$payment.name}</p>
                    {if $payment.description}
                    <small class="text-muted">{$payment.description}</small>
                    {/if}
                </div>
            </div>
        </div>
        {/if}
    </div>

    {* Comment *}
    {if $order.comment}
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-light">
            <h6 class="mb-0">{'ms3_frontend_comment' | lexicon}</h6>
        </div>
        <div class="card-body">
            <p class="mb-0">{$order.comment}</p>
        </div>
    </div>
    {/if}
</div>
```

## Pagination structure

```php
[
    'total' => 50,           // Total orders
    'total_pages' => 3,      // Total pages
    'current_page' => 1,     // Current page
    'limit' => 20,           // Per page
    'offset' => 0,           // Offset
    'pages' => [             // Page list
        ['num' => 1, 'offset' => 0, 'active' => true],
        ['num' => 2, 'offset' => 20, 'active' => false],
        ['num' => 3, 'offset' => 40, 'active' => false],
    ],
    'has_prev' => false,     // Has previous
    'has_next' => true,      // Has next
    'prev_offset' => 0,      // Previous offset
    'next_offset' => 20,     // Next offset
]
```

## Status structure

```php
[
    ['id' => 2, 'name' => 'Paid', 'color' => '008000', 'selected' => false],
    ['id' => 3, 'name' => 'Shipped', 'color' => '0000FF', 'selected' => true],
    ['id' => 4, 'name' => 'Delivered', 'color' => '28a745', 'selected' => false],
]
```

::: tip Status color
Color is stored in the DB without `#`. In CSS add `#`:

```fenom
style="background-color: #{$status_color};"
```

:::

## System settings

| Setting | Description |
|---------|-------------|
| `ms3_customer_orders_page_id` | Orders page ID |

## CSS classes

| Class | Element |
|-------|---------|
| `.ms3-customer-orders` | Order list container |
| `.ms3-customer-order-details` | Order details container |
| `.ms3-order-table` | Orders table |
