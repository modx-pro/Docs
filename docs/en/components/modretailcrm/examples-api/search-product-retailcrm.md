# Search for a product in RetailCRM

Use the **storeProducts** method with three parameters:

1. **Filter** — array (product ID, price, vendor, groups, tags, segments, etc.)
2. **page** — page number (pagination). Up to 20 products per request.
3. **limit** — number of products per request (max 20).

## Search by site product ID (externalId)

```php
$products = $modRetailCrm->request->storeProducts(array('externalId' => 100), 1, 20);
```

More filter options: [RetailCRM API docs](https://help.retailcrm.ru/Developers/ApiVersion5#get--api-v5-store-products)
