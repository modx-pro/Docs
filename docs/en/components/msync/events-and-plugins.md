# Events and plugins

## Plugins

Plugins required for the component and for extending it. May be extended in future versions.

### removeUuid

Removes product property bindings when products are deleted in MODX. Fired on **OnBeforeEmptyTrash**.

## Events

### mSyncOnProductImport

Fired when processing each category and product in the products file after creating or updating a product or category.

| Parameter      | Value                                                                 | Description                                                         |
|----------------|------------------------------------------------------------------------|---------------------------------------------------------------------|
| **$mode**      | String `category` for categories, `create` for new products, `update` for updates | Object type being processed                                        |
| **$resource**  | `msCategory` or `msProduct` object                                    | miniShop object created or updated                                 |
| **$properties**| `array`                                                                | Product properties from XML; empty for categories                 |
| **$data**      | `mSyncCategoryData` or `mSyncProductData` object                      | 1C category/product to miniShop object mapping                     |

### mSyncBeforeProductOffers

Fired before processing one offer.

| Parameter      | Value             | Description                    |
|----------------|-------------------|--------------------------------|
| **$uuid**      | string            | Product UUID in 1C             |
| **$uuid_offer**| string            | Offer UUID in 1C                |
| **$xml**       | SimpleXMLElement  | XML with the offer             |

### mSyncOnProductOffers

Fired after processing one offer.

| Parameter   | Value             | Description                                      |
|-------------|-------------------|--------------------------------------------------|
| **$resource** | msProduct object  | miniShop product updated with offer data         |
| **$offer**  | mSyncOfferData    | Offer object                                     |
| **$xml**    | SimpleXMLElement  | XML with the offer                               |

### mSyncAfterOffers

Fired after processing all offers.

| Parameter     | Value | Description              |
|---------------|-------|--------------------------|
| **$totalOffers** | int   | Number of exported offers |

### mSyncOnCsvExport

Fired when adding each product to the CSV export. Lets you customize the export.

| Parameter   | Value                       | Description                                                                 |
|-------------|-----------------------------|-----------------------------------------------------------------------------|
| **$fields** | array                       | Product fields: key = field (CSV column name), value = field value         |
| **$product**| msProduct object            | miniShop product being processed                                            |
| **$filename** | string                    | Export file name                                                             |
| **$start**  | number                      | First product index in current export iteration                             |
| **$export** | mSyncExportPrepareProcessor | Export processor                                                             |

### mSyncOnBeforeImport

Fired before processing product and offer files.

| Parameter   | Value                    | Description                                              |
|-------------|--------------------------|----------------------------------------------------------|
| **$mode**   | "catalog" or "offers"    | Whether catalog or offers are being processed            |
| **$filename** | string                 | File name                                                |

### mSyncOnBeforeImportCategory

Fired before saving category temp data to the database.

| Parameter | Value            | Description                                                                                                                       |
|-----------|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **$xml**  | SimpleXmlElement | XML with Group (category) data                                                                                                    |
| **$data** | array            | Fields you can change in the plugin: 'name' — category name, 'uuid' — 1C ID, 'parent_uuid' — parent group ID in 1C                 |
| **$level**| number           | Category nesting level                                                                                                            |

### mSyncOnBeforeImportProduct

Fired before saving product temp data to the database.

| Parameter | Value            | Description                                                                 |
|-----------|------------------|-----------------------------------------------------------------------------|
| **$xml**  | SimpleXmlElement | XML with Product data                                                       |
| **$data** | array            | Product fields you can change in the plugin; see var_dump or source code     |

You can change $data the same way as in miniShop2 event plugins:

```php
if ($modx->event->name == 'mSyncOnBeforeImportCategory') {
  $values = & $modx->event->returnedValues;
  $data['name'] .= "-test";
  $values['data'] = $data;
}
```

This plugin appends "-test" to the category name.

### mSyncAfterImportCategories

Fired after categories are loaded from XML into the temp table.

| Parameter | Value   | Description              |
|-----------|---------|--------------------------|
| **$total**| number  | Number of imported categories |

### mSyncAfterImportProducts

Fired after all properties are loaded from XML into the temp table.

| Parameter | Value   | Description                    |
|-----------|---------|--------------------------------|
| **$last** | number  | Last processed product index   |
| **$total**| number  | Number of imported products    |

### mSyncOnPrepareCategory

Fired before creating or updating a miniShop category. Lets you change category mapping.

| Parameter    | Value                 | Description                                                                 |
|--------------|-----------------------|-----------------------------------------------------------------------------|
| **$data**    | mSyncCategoryData     | 1C category to miniShop category mapping. May be empty for new category.    |
| **$uuid**    | string                | Category ID in 1C                                                            |
| **$parent**  | number                | Parent category ID in miniShop                                              |
| **$parentUuid** | string              | Parent category ID in 1C                                                    |

### mSyncOnPrepareProduct

Fired before creating or updating a miniShop product. Lets you change product mapping.

| Parameter     | Value   | Description                              |
|---------------|---------|------------------------------------------|
| **$data**     | array   | Product temp data                        |
| **$p**        | number  | Parent category ID in miniShop           |
| **$parent**   | number  | Parent category ID in miniShop           |
| **$properties** | array  | Product properties                       |

### mSyncAfterImportProperties

Fired after product properties are loaded from XML into the import session.

| Parameter | Value            | Description                        |
|-----------|------------------|------------------------------------|
| **$xml**  | SimpleXmlElement | XML with product properties        |
| **$last** | number           | Last processed property index      |
| **$total**| number           | Number of properties found         |

### mSyncAfterImport

Fired at the end of the catalog import.

| Parameter           | Value   | Description                                                                                                                                                       |
|---------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **$totalProducts**  | number  | Number of imported products                                                                                                                                       |
| **$totalCategories** | number | Number of imported categories                                                                                                                                     |
| **$importResources** | array  | Resource IDs affected by this import: `array( 'category' => array('created' => array(), 'updated' => array()), 'product' => array('created' => array(),'updated' => array())` |

### mSyncOnCatalogFileImport

Fired before loading a catalog file. Lets you change the file name if it differs from the default.

| Parameter    | Value  | Description  |
|--------------|--------|--------------|
| **$filename**| string | File name    |

### mSyncOnBeforeSalesExport

Fired before exporting an order. Lets you add fields to the order.

| Parameter    | Value   | Description                |
|--------------|---------|----------------------------|
| **$order_ext** | array  | Product fields to export   |
| **$order**   | msOrder | miniShop order             |

### mSyncOnSalesExport

Fired before building the orders XML file.

| Parameter | Value            | Description           |
|------------|------------------|-----------------------|
| **$xml**   | SimpleXMLElement | Document with orders  |
| **$orders**| array of msOrder | Order collection      |

### mSyncOnImportUnknownFile

Fired when an import file has an unknown name.

| Parameter    | Value  | Description |
|--------------|--------|-------------|
| **$filename**| string | File name   |
