---
title: Product API
description: 'Programmatic product create/update, options, images, categories and links'
---
# Product API

Programmatic interface for working with MiniShop3 products from PHP.

A product in MiniShop3 uses two models:

- **msProduct** — extends `modResource`, holds standard resource fields (pagetitle, content, parent, etc.)
- **msProductData** — extends `xPDOSimpleObject`, holds commerce fields (price, article, stock, etc.) in table `ms3_products`

Relation is one-to-one by `id`.

## Creating a product

### Via processor

Recommended way is processor `Product\Create`. It creates both `msProduct` and `msProductData`, sets defaults and fires system events.

```php
$response = $modx->runProcessor('Product\\Create', [
    'pagetitle' => 'New product',
    'parent' => 5,          // Category ID (msCategory)
    'price' => 1500,
    'article' => 'ART-001',
    'published' => true,
    'stock' => 100,
    'weight' => 500,

    // Options use prefix options-
    'options-color' => ['Red', 'Blue'],
    'options-size' => ['L', 'XL'],
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

if ($response->isError()) {
    $modx->log(1, $response->getMessage());
} else {
    $productId = $response->getObject()['id'];
}
```

The processor automatically:

- Sets `class_key = msProduct`, `show_in_tree`, `template` from system settings
- Creates related `msProductData`
- If `ms3_product_id_as_alias` is on — sets alias to product ID
- Saves options (fields with prefix `options-`)

### Via model

For simple cases you can create a product with xPDO directly:

```php
use MiniShop3\Model\msProduct;

$product = $modx->newObject(msProduct::class);
$product->set('pagetitle', 'New product');
$product->set('parent', 5);
$product->set('published', true);
$product->set('template', $modx->getOption('ms3_template_product_default'));

if ($product->save()) {
    // msProductData is created on msProduct save
    $productData = $product->getOne('Data');
    $productData->set('price', 1500);
    $productData->set('article', 'ART-001');
    $productData->set('stock', 100);
    $productData->save();
}
```

::: warning Difference between approaches
Creating via model does not fire system events (`OnBeforeDocFormSave`, `OnDocFormSave`), does not set defaults and does not refresh resource cache. Use the processor for full product creation.
:::

## Reading and updating

### Reading product data

```php
use MiniShop3\Model\msProduct;
use MiniShop3\Model\msProductData;

// Via msProduct → Data relation
$product = $modx->getObject(msProduct::class, $productId);
$productData = $product->getOne('Data');
$price = $productData->get('price');
$article = $productData->get('article');

// Directly via msProductData
$productData = $modx->getObject(msProductData::class, $productId);
$price = $productData->get('price');
```

### msProductData virtual fields

`msProductData::get()` supports virtual keys that load related data from the DB:

| Key | Type | Description |
|------|-----|----------|
| `categories` | `array` | Additional category IDs |
| `options` | `array` | Options: `['color' => ['Red'], 'size' => ['L']]` |
| `links` | `array` | Links: `['master' => [...], 'slave' => [...]]` |

```php
$categories = $productData->get('categories');  // [5, 12, 18]
$options = $productData->get('options');          // ['color' => ['Red', 'Blue']]
$links = $productData->get('links');             // ['master' => [...], 'slave' => [...]]
```

### Update via processor

```php
$response = $modx->runProcessor('Product\\Update', [
    'id' => $productId,
    'price' => 2000,
    'old_price' => 2500,
    'popular' => true,
    'options-color' => ['Red', 'Green'],
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);
```

### Update via model

```php
$productData = $modx->getObject(msProductData::class, $productId);
$productData->set('price', 2000);
$productData->set('old_price', 2500);
$productData->set('popular', true);
$productData->save();
```

### Update via service

`ProductDataService` provides helpers for read and update:

```php
$service = $modx->services->get('ms3_product_data_service');

// Get all data (msProduct + msProductData in one array)
$data = $service->getProductData($productId);

// Update
$updated = $service->updateProductData($productId, [
    'price' => 2000,
    'old_price' => 2500,
]);
```

### msProductData fields

| Field | DB type | PHP type | Default | Description |
|------|----------|---------|--------------|----------|
| `article` | varchar(50) | string | null | SKU |
| `price` | decimal(12,2) | float | 0.0 | Price |
| `old_price` | decimal(12,2) | float | 0.0 | Old price |
| `stock` | decimal(13,3) | float | 0.0 | Stock |
| `weight` | decimal(13,3) | float | 0.0 | Weight |
| `image` | varchar(255) | string | null | Main image path |
| `thumb` | varchar(255) | string | null | Thumb path |
| `vendor_id` | int unsigned | integer | 0 | Vendor ID |
| `made_in` | varchar(100) | string | '' | Country of origin |
| `new` | tinyint(1) | boolean | false | "New" flag |
| `popular` | tinyint(1) | boolean | false | "Popular" flag |
| `favorite` | tinyint(1) | boolean | false | "Favorite" flag |
| `tags` | text | json | null | Tags (string array) |
| `color` | text | json | null | Colors (string array) |
| `size` | text | json | null | Sizes (string array) |
| `source_id` | int unsigned | integer | 1 | Media source ID |

::: info JSON fields and options
`tags`, `color`, `size` are stored in `msProductData` as JSON but on save are synced to options table `ms3_product_options`. This allows filtering by these fields via the EAV options system.
:::

### Price and weight modification via events

`getPrice()` and `getWeight()` fire events so plugins can modify values:

```php
// Get price with plugin logic
$price = $productData->getPrice();

// Get weight with plugin logic
$weight = $productData->getWeight();

// All fields with plugin logic
$fields = $productData->modifyFields();
```

Events used: `msOnGetProductPrice`, `msOnGetProductWeight`, `msOnGetProductFields`.

## Product options

Options use the EAV pattern (Entity-Attribute-Value) in table `ms3_product_options`. Each row has `product_id`, `key` (option name) and `value`.

### OptionService

Main service for options:

```php
$optionService = $modx->services->get('ms3_option_service');
```

### Saving options

```php
$optionService->saveProductOptions($productId, [
    'color' => ['Red', 'Blue'],
    'size' => ['L', 'XL'],
    'material' => ['Cotton'],
]);

// By default removeOther=true — options not in the array are removed.
// To add without removing existing:
$optionService->saveProductOptions($productId, [
    'brand' => ['Nike'],
], false);  // removeOther = false
```

### Reading options

```php
// All product options
$options = $optionService->getProductOptionValues($productId);
// ['color' => ['Red', 'Blue'], 'size' => ['L', 'XL']]

// Specific options
$colors = $optionService->getProductOptionValues($productId, ['color']);
// ['color' => ['Red', 'Blue']]
```

### Loading options for template

`loadOptionsForProduct` returns data ready for Fenom templates:

```php
$options = $optionService->loadOptionsForProduct($productId);
// [
//     'color' => ['Red', 'Blue'],
//     'color.caption' => 'Color',
//     'color.type' => 'combo-multiple',
//     ...
// ]

// Batch load (avoids N+1)
$allOptions = $optionService->loadOptionsForProducts([1, 2, 3]);
// [1 => [...], 2 => [...], 3 => [...]]
```

### Available option keys

```php
// Which options are available for the product (from categories)
$keys = $optionService->getAvailableOptionKeys($productId);
// ['color', 'size', 'material']
```

::: warning Do not use msProductOption model directly
Always use `OptionService` for options. Creating/saving `msProductOption` objects directly bypasses sync with JSON fields and categories.
:::

## Images (gallery)

Product images are `msProductFile` objects in table `ms3_product_files`. Files are stored in the media source configured for the product.

### Upload via processor

Main upload path is processor `Gallery\Upload`:

```php
// Upload from URL
$response = $modx->runProcessor('Gallery\\Upload', [
    'id' => $productId,
    'file' => 'https://example.com/image.jpg',
    'description' => 'Product photo',
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

// Upload from local file
$response = $modx->runProcessor('Gallery\\Upload', [
    'id' => $productId,
    'file' => '/path/to/image.jpg',
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);
```

For `$_FILES` (multipart/form-data) pass the file as usual in PHP; the processor picks it up.

The processor:

- Checks extension against the media source allow list
- Computes hash to avoid duplicates
- Generates thumbnails
- Updates `image` and `thumb` in `msProductData` if this is the first image

### ProductImageService

Service for working with images in code:

```php
$imageService = $modx->services->get('ms3_product_image');

// Update product main image (from first gallery file)
$imageService->updateProductImage($productData);

// Generate thumbnails for all images
$imageService->generateAllThumbnails($productData);

// Reorder images
$imageService->rankProductImages($productData, [
    $fileId1 => 0,  // first
    $fileId2 => 1,
    $fileId3 => 2,
]);

// Remove product folder from media source
$imageService->removeProductCatalog($productData);
```

### Gallery processors

| Processor | Description |
|-----------|----------|
| `Gallery\Upload` | Upload image (file, URL, path) |
| `Gallery\GetList` | List product images |
| `Gallery\Update` | Update image description |
| `Gallery\Remove` | Remove one image |
| `Gallery\RemoveAll` | Remove all product images |
| `Gallery\Sort` | Sort images |
| `Gallery\Multiple` | Bulk operations (remove several) |
| `Gallery\Generate` | Generate thumbnails for one image |
| `Gallery\GenerateAll` | Generate thumbnails for all product images |

## Additional categories

A product can belong to multiple categories. The main category is `parent` on `msProduct`. Additional ones are in table `ms3_product_categories` via model `msCategoryMember`.

### Managing in code

```php
use MiniShop3\Model\msCategoryMember;

// Add product to additional category
$member = $modx->newObject(msCategoryMember::class);
$member->set('product_id', $productId);
$member->set('category_id', $categoryId);
$member->save();

// Get product additional categories
$categories = $modx->getIterator(msCategoryMember::class, [
    'product_id' => $productId,
]);
foreach ($categories as $member) {
    echo $member->get('category_id');
}

// Remove from additional category
$member = $modx->getObject(msCategoryMember::class, [
    'product_id' => $productId,
    'category_id' => $categoryId,
]);
if ($member) {
    $member->remove();
}
```

### Via msProductData

On save you can pass a categories array — the service syncs the table:

```php
$productData = $modx->getObject(msProductData::class, $productId);

// fromArray + save replaces all additional categories
$productData->fromArray(['categories' => [5, 12, 18]]);
$productData->save();
// save() calls saveCategories(), which removes old and creates new records
```

::: info Composite primary key
`msCategoryMember` uses composite PK `product_id` + `category_id`. Pass both in criteria when getting an object.
:::

## Product links

Links relate products (e.g. "Similar", "Frequently bought together"). Two models:

- **msLink** — link type (id, type, name)
- **msProductLink** — link between products (link, master, slave)

### Link types (msLink)

```php
use MiniShop3\Model\msLink;

// Get all link types
$links = $modx->getIterator(msLink::class);
foreach ($links as $link) {
    echo $link->get('name');  // "Similar products"
    echo $link->get('type');  // "similar"
}
```

Link types are managed via processors `Settings\Link\*` or admin UI.

### Managing links in code

```php
use MiniShop3\Model\msProductLink;

// Create link between products
$productLink = $modx->newObject(msProductLink::class);
$productLink->set('link', $linkTypeId);   // Link type ID (msLink)
$productLink->set('master', $productId);  // Master product ID
$productLink->set('slave', $relatedId);   // Related product ID
$productLink->save();

// Get related products
$related = $modx->getIterator(msProductLink::class, [
    'master' => $productId,
    'link' => $linkTypeId,
]);
foreach ($related as $rel) {
    echo $rel->get('slave');  // Related product ID
}

// Remove link
$link = $modx->getObject(msProductLink::class, [
    'link' => $linkTypeId,
    'master' => $productId,
    'slave' => $relatedId,
]);
if ($link) {
    $link->remove();
}
```

### Via processors

```php
// Create link
$response = $modx->runProcessor('Product\\ProductLink\\Create', [
    'link' => $linkTypeId,
    'master' => $productId,
    'slave' => $relatedId,
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

// Remove link
$response = $modx->runProcessor('Product\\ProductLink\\Remove', [
    'link' => $linkTypeId,
    'master' => $productId,
    'slave' => $relatedId,
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);
```

::: info Composite primary key
`msProductLink` uses composite PK `link` + `master` + `slave`. Pass all three when getting or removing.
:::

### Via msProductData

Links are also available via virtual field `links`:

```php
$links = $productData->get('links');
// [
//     'master' => [linkTypeId => [slaveId1, slaveId2, ...]],
//     'slave' => [linkTypeId => [masterId1, ...]],
// ]
```

## Vendors

Vendors are in model `msVendor` (table `ms3_vendors`). Product link is `vendor_id` on `msProductData`.

### msVendor fields

| Field | Type | Description |
|------|-----|----------|
| `name` | varchar(100) | Name |
| `resource_id` | int | Related resource ID (vendor page) |
| `country` | varchar(100) | Country |
| `logo` | varchar(255) | Logo path |
| `address` | text | Address |
| `phone` | varchar(20) | Phone |
| `email` | varchar(255) | Email |
| `description` | text | Description |
| `position` | int | Sort order |
| `properties` | json | Extra properties |

### Linking vendor to product

```php
use MiniShop3\Model\msVendor;
use MiniShop3\Model\msProductData;

// Create vendor
$vendor = $modx->newObject(msVendor::class);
$vendor->set('name', 'Samsung');
$vendor->set('country', 'South Korea');
$vendor->save();

// Link to product
$productData = $modx->getObject(msProductData::class, $productId);
$productData->set('vendor_id', $vendor->get('id'));
$productData->save();

// Get product vendor
$vendor = $productData->getOne('Vendor');
echo $vendor->get('name');  // "Samsung"
```

### Vendor processors

Vendors are managed via processors `Settings\Vendor\*`:

| Processor | Description |
|-----------|----------|
| `Settings\Vendor\Create` | Create |
| `Settings\Vendor\Get` | Get |
| `Settings\Vendor\GetList` | List |
| `Settings\Vendor\Update` | Update |
| `Settings\Vendor\Remove` | Remove |
| `Settings\Vendor\Multiple` | Bulk operations |

## Product processors

Full list of product-related processors:

| Processor | Description |
|-----------|----------|
| `Product\Create` | Create product |
| `Product\Update` | Update product |
| `Product\UpdateFromGrid` | Update from grid (inline edit) |
| `Product\Delete` | Mark for deletion |
| `Product\Undelete` | Unmark deletion |
| `Product\Get` | Get product |
| `Product\GetList` | List products |
| `Product\GetOptions` | Get product options |
| `Product\Publish` | Publish |
| `Product\Unpublish` | Unpublish |
| `Product\Show` | Show in tree |
| `Product\Hide` | Hide from tree |
| `Product\Sort` | Sort |
| `Product\Multiple` | Bulk operations |
| `Product\Autocomplete` | Autocomplete (product search) |
| `Product\Category` | Product categories |

### Calling processors

All are called via `$modx->runProcessor()` with the path:

```php
$response = $modx->runProcessor('Product\\GetList', [
    'parent' => 5,
    'limit' => 20,
    'sort' => 'price',
    'dir' => 'ASC',
], [
    'processors_path' => $modx->getOption('core_path')
        . 'components/minishop3/src/Processors/',
]);

if (!$response->isError()) {
    $products = json_decode($response->getResponse(), true);
}
```
