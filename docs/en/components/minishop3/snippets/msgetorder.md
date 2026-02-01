---
title: msGetOrder
---
# msGetOrder

Snippet for displaying order information. Used on the "Thank you" page or in the customer account.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **id** | | Order ID or UUID (overrides GET) |
| **tpl** | `tpl.msGetOrder` | Order layout chunk |
| **includeThumbs** | | Comma-separated product thumbnails |
| **includeContent** | `false` | Include product content |
| **payStatus** | `1` | Status IDs for payment link (comma-separated) |
| **toPlaceholder** | | Save result to placeholder |
| **showLog** | `false` | Show execution log |

## Order resolution

The snippet resolves the order in this order:

1. Snippet parameter `id` (ID or UUID)
2. GET parameter `msorder` (e.g. `?msorder=15` or `?msorder=uuid`)
3. Empty result if order not found

::: tip UUID access
You can pass the order UUID (36 chars) instead of numeric ID for public links without login.
:::

## Access check

The order is shown if any of these is true:

- Order is in user session (`$_SESSION['ms3']['orders']`)
- Order `user_id` matches current user
- Order `customer_id` matches current customer (by token)
- User is logged in to manager (mgr context)
- Access via order UUID

## Examples

### Basic output

```fenom
{'msGetOrder' | snippet}
```

### With product thumbnails

```fenom
{'msGetOrder' | snippet: [
    'includeThumbs' => 'small'
]}
```

### Specific order by ID

```fenom
{'msGetOrder' | snippet: [
    'id' => 15,
    'includeThumbs' => 'small,medium'
]}
```

### Order by UUID

```fenom
{'msGetOrder' | snippet: [
    'id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
]}
```

### To placeholder

```fenom
{'msGetOrder' | snippet: [
    'toPlaceholder' => 'orderHtml'
]}
```
