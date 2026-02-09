---
title: msOrder
---
# msOrder

Snippet for the checkout form. Shows customer fields, delivery and payment methods.

::: warning Caching
The snippet uses the user session and must be called **uncached**.
:::

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msOrder` | Order form chunk |
| **userFields** | | Mapping of MODX profile fields to order fields (JSON) |
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

### With extra fields

```fenom
{'!msOrder' | snippet: [
    'userFields' => 'comment,company_name'
]}
```

### Get data

```fenom
{'!msOrder' | snippet: [
    'return' => 'data'
]}
```

## Data structure

With `return=data` the snippet returns an array with `order`, `form`, `deliveries`, `payments`, `addresses`, `isCartEmpty`, `isCustomerAuth`, and related keys. See [frontend/order](../frontend/order) for form structure and placeholders.
