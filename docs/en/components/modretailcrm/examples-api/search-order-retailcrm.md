# Search for an order in RetailCRM

Use the **ordersList** method with three parameters:

1. **Filter** — array (order number, customer email, date, etc.)
2. **page** — page number (pagination). Up to 20 orders per request; use page for more.
3. **limit** — number of orders per request (max 20).

## Search by order number (externalId)

externalIds must be an array even for one order. You can pass multiple IDs.

```php
$orders = $modRetailCrm->request->ordersList(array('externalIds' => [100]), 1, 20);
```

## Search by customer email

Get all orders for one customer.

```php
$orders = $modRetailCrm->request->ordersList(array('email' => 'info@site.ru'), 1, 20);
```

## Search by date

Get orders in a date range. Use Y-m-d for createdAtFrom and createdAtTo.

```php
$orders = $modRetailCrm->request->ordersList(array('createdAtTo' => '2019-01-06', 'createdAtFrom' => '2019-01-06'), 1, 20);
```

More filter options: [RetailCRM API docs](https://help.retailcrm.ru/Developers/ApiVersion5#get--api-v5-orders)
