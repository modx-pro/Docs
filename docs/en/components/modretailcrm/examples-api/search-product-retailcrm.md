# Search for a product in RetailCRM

To search for products in the RetailCRM API use the **storeProducts** method, which takes three parameters:

1. **Filter** — required array of product data (ID, price, vendor, product groups, tags, segments, etc.)
2. **page** — page number for pagination. If there are many results (at most 20 per request), use this to request further pages.
3. **limit** — number of products returned per request (max 20).

## Search by site product ID (externalId)

```php
$products = $modRetailCrm->request->storeProducts(array('externalId' => 100), 1, 20);
```

More filter options: [RetailCRM API docs](https://help.retailcrm.ru/Developers/ApiVersion5#get--api-v5-store-products)
