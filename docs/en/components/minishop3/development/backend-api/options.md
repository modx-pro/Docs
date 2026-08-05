---
title: Options API
description: Programmatic work with product options — create, assign to categories, read and write values
---

# Options API

Programmatic interface for working with the MiniShop3 options system from PHP.

Options in MiniShop3 use the EAV pattern (Entity-Attribute-Value) and three models:

- **msOption** — option definition (key, caption, type)
- **msCategoryOption** — option-to-category link (active, required, position)
- **msProductOption** — option value for a specific product

```
msOption (color, "Color", combo-multiple)
    ├── msCategoryOption (option → category "Clothing", active=true)
    │       ├── msProductOption (product=10, key=color, value="Red")
    │       ├── msProductOption (product=10, key=color, value="Blue")
    │       └── msProductOption (product=11, key=color, value="Green")
    └── msCategoryOption (option → category "Shoes", active=true)
            └── msProductOption (product=20, key=color, value="Black")
```

## OptionService (facade)

Main service for options. Wraps three sub-services.

```php
$optionService = $modx->services->get('ms3_option_service');
```

### Reading product options

```php
// All option values for a product
$values = $optionService->getProductOptionValues($productId);
// ['color' => ['Red', 'Blue'], 'size' => ['L', 'XL']]

// Specific options
$values = $optionService->getProductOptionValues($productId, ['color']);
// ['color' => ['Red', 'Blue']]
```

### Loading for templates

`loadOptionsForProduct` returns data with metadata for Fenom templates:

```php
$options = $optionService->loadOptionsForProduct($productId);
// [
//     'color' => ['Red', 'Blue'],
//     'color.caption' => 'Color',
//     'color.type' => 'combo-multiple',
//     'color.description' => 'Select color',
//     'color.category_name' => 'Product properties',
//     'size' => ['L', 'XL'],
//     'size.caption' => 'Size',
//     ...
// ]

// Without metadata (keys and values only)
$options = $optionService->loadOptionsForProduct($productId, false);
```

### Batch loading

For catalogs use batch loading to avoid N+1:

```php
$allOptions = $optionService->loadOptionsForProducts([1, 2, 3, 4, 5]);
// [
//     1 => ['color' => ['Red'], 'size' => ['L']],
//     2 => ['color' => ['Blue', 'Green']],
//     ...
// ]
```

### Saving options

```php
// Save options (default removeOther=true — removes unspecified)
$optionService->saveProductOptions($productId, [
    'color' => ['Red', 'Blue'],
    'size' => ['L', 'XL'],
    'material' => ['Cotton'],
]);

// Add options without removing existing
$optionService->saveProductOptions($productId, [
    'brand' => ['Nike'],
], false);  // removeOther = false
```

On save, values are normalized: trimmed, deduplicated, empty strings removed.

### Available option keys

```php
// Which options are available for the product (from its categories)
$keys = $optionService->getAvailableOptionKeys($productId);
// ['color', 'size', 'material']
```

### Assigning options to categories

```php
// Assign option to several categories
$assigned = $optionService->assignOptionToCategories($optionId, [5, 12, 18]);
// [5, 12, 18] — category IDs the option was assigned to

// Assign with parameters
$optionService->addOptionToCategory(
    $optionId,
    $categoryId,
    '',       // default value
    true,     // active
    0         // position
);

// Remove option from category
$optionService->removeOptionFromCategory($optionId, $categoryId);

// Force remove (removes values even if option is active in other categories)
$optionService->removeOptionFromCategory($optionId, $categoryId, true);
```

::: info Auto-assignment to products
When an option is assigned to a category it is automatically added to all products in that category (including products in additional categories). On remove — values are kept if the option is active in another category of the product.
:::

### Accessing sub-services

For specific tasks you can use sub-services directly:

```php
$loader = $optionService->getLoader();     // OptionLoaderService — read
$sync = $optionService->getSync();         // OptionSyncService — write
$category = $optionService->getCategory(); // OptionCategoryService — categories
```

## msOption model

Option definition is stored in table `ms3_options`.

### msOption fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `key` | varchar(191) | '' | Unique key (letters, digits, hyphen, underscore) |
| `caption` | varchar(191) | '' | Display name |
| `description` | text | null | Description |
| `measure_unit` | tinytext | null | Unit of measure |
| `modcategory_id` | integer | 0 | MODX category ID (for manager grouping) |
| `type` | varchar(191) | '' | Option type (combo-multiple, textfield, numberfield, etc.) |
| `properties` | json | null | Extra properties |

### Key validation

Option key must:
- Contain only Latin letters, digits, hyphen, underscore
- Not start with a digit or space
- Not match reserved field names (`id`, `type`, `price`, `weight`, `image`, `published`, and other `modResource` fields)

### Programmatic usage

```php
use MiniShop3\Model\msOption;

// Create option
$option = $modx->newObject(msOption::class);
$option->set('key', 'material');
$option->set('caption', 'Material');
$option->set('type', 'combo-multiple');
$option->save();

// Get option
$option = $modx->getObject(msOption::class, ['key' => 'color']);

// Assign to categories
$assigned = $option->setCategories([5, 12, 18]);

// Get all options
$options = $modx->getIterator(msOption::class);
```

## msCategoryOption model

Option–category link. Table `ms3_category_options`.

### msCategoryOption fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `option_id` | integer | 0 | Option ID (part of PK) |
| `category_id` | integer | 0 | Category ID (part of PK) |
| `position` | integer | 0 | Sort order |
| `active` | boolean | false | Whether option is active in category |
| `required` | boolean | false | Whether option is required |
| `value` | text | null | Default value |

::: info Composite primary key
`msCategoryOption` uses composite PK of `option_id` + `category_id`.
:::

### Cascade behavior

On **save** of `msCategoryOption` the option is automatically added to all products in the category that don’t have it yet.

On **remove** of `msCategoryOption`, `msProductOption` values are deleted only for products where the option is not active in any other category. This avoids data loss when a product belongs to multiple categories with the same option.

### Programmatic usage

```php
use MiniShop3\Model\msCategoryOption;

// Assign option to category
$link = $modx->newObject(msCategoryOption::class);
$link->set('option_id', $optionId);
$link->set('category_id', $categoryId);
$link->set('active', true);
$link->set('position', 0);
$link->save();
// On save() option is auto-added to all products in the category

// Get category options
$categoryOptions = $modx->getIterator(msCategoryOption::class, [
    'category_id' => $categoryId,
    'active' => true,
]);

// Deactivate option in category
$link = $modx->getObject(msCategoryOption::class, [
    'option_id' => $optionId,
    'category_id' => $categoryId,
]);
$link->set('active', false);
$link->save();

// Remove option from category (cascade deletes product values)
$link->remove();
```

## msProductOption model

Option value for a product. Table `ms3_product_options`. One row per value. For multi-value options (combo-multiple) multiple rows with the same `key` are created.

### msProductOption fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `product_id` | integer | null | Product ID |
| `key` | varchar(191) | null | Option key |
| `value` | text | '' | Value |

::: warning Use OptionService
Always use `OptionService` for product options. Creating `msProductOption` directly bypasses sync with `msProductData` JSON fields (`tags`, `color`, `size`) and category cascade logic.
:::

## CategoryOptionService

Dedicated service for category-side options. Used in the manager to build the category options list.

```php
use MiniShop3\Model\msCategory;

$categoryOptionService = $modx->services->get('ms3_category_option_service');

// Get category option keys
$category = $modx->getObject(msCategory::class, $categoryId);
$keys = $categoryOptionService->getOptionKeys($category);
// ['color', 'size', 'material']

// Get full field configs
$fields = $categoryOptionService->getOptionFields($category);

// Clear options cache
$categoryOptionService->clearCache($categoryId);
// Or full cache
$categoryOptionService->clearCache();
```

## OptionService sub-services

### OptionLoaderService

Handles all option read operations.

```php
$loader = $optionService->getLoader();

// Load options for one product (with metadata)
$data = $loader->loadForProduct($productId, true);

// Load options for multiple products (no metadata)
$data = $loader->loadForProducts([1, 2, 3], false);

// Get field configs for manager
$fields = $loader->getFieldsForProduct($productId, $parentId);

// Get keys only
$keys = $loader->getOptionKeys($productId, $parentId);
```

### OptionSyncService

Handles writing and syncing option values.

```php
$sync = $optionService->getSync();

// Save options
$sync->saveProductOptions($productId, [
    'color' => ['Red', 'Blue'],
], true);

// Read current values
$values = $sync->getForProduct($productId);

// Rename option key across all products
$sync->updateOptionKey('old_key', 'new_key');
```

::: warning Renaming key
`updateOptionKey()` runs a bulk `UPDATE` on all `ms3_product_options` rows. Use only when renaming an option in settings.
:::

### OptionCategoryService

Manages option–category links.

```php
$categoryService = $optionService->getCategory();

// Assign option to categories
$assigned = $categoryService->assignToCategories($optionId, [5, 12]);

// Add with parameters
$categoryService->addToCategory($optionId, $categoryId, '', true, 0);

// Remove from category
$categoryService->removeFromCategory($optionId, $categoryId);

// Get products in category
$productIds = $categoryService->getProductsInCategory($categoryId);

// Find products that already have the option
$withOption = $categoryService->getProductsWithOption($productIds, 'color');

// Batch insert option for products
$categoryService->batchInsertOptions($productIds, 'color', 'Red');

// Batch remove from categories
$categoryService->removeFromCategories($optionId, [5, 12, 18]);
```

## REST API

::: info Since v1.10.0-beta1
Legacy processors `Processors/Settings/Option/*` and `Processors/Category/Option/*` were fully removed together with the ExtJS UI (22 files, ~2600 lines). All operations go through two REST controllers: `OptionsController` and `CategoryOptionsController`.
:::

### Option management — `/api/mgr/options/*`

Controller `MiniShop3\Controllers\Api\Manager\OptionsController`, permission `mssetting_save`.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/mgr/options` | List options with filters: `query`, `modcategory_id`, `category_id`, `categories[]` |
| `GET` | `/api/mgr/options/{id}` | Option detail + linked categories map |
| `POST` | `/api/mgr/options` | Create: normalizes `key`, checks uniqueness, links to categories |
| `PUT` | `/api/mgr/options/{id}` | Partial update; on `key` change resyncs `msProductOption` via `OptionSyncService::updateOptionKey` |
| `DELETE` | `/api/mgr/options/{id}` | Delete (cascade via lifecycle `msOption::remove` → `msCategoryOption` → `msProductOption`) |
| `DELETE` | `/api/mgr/options/bulk` | Bulk delete: `ids[]` |
| `POST` | `/api/mgr/options/bulk/assign` | Assign `options[]` to `categories[]` |
| `GET` | `/api/mgr/options/types` | Type list with localized names |
| `GET` | `/api/mgr/options/tree` | Resource tree for linking options to product categories (since 1.11.0 — `msCategory` as selectable nodes + `modResource`/`modDocument`/`modWebLink` with `isfolder=1` as navigation, `selectable: bool` flag per node). Lazy by `parent`. `checked` flag for categories where the option is already assigned (if `option_id` is passed) |
| `GET` | `/api/mgr/options/suggestions` | Unique `msProductOption.value` values by `key` for `comboOptions` autocomplete on the product card |

> Since 1.11.0 the `GET /api/mgr/options/modcategories` endpoint was removed. Option grouping now uses `msOptionGroup` — see «Option groups» below.

### Option groups — `/api/mgr/option-groups/*`

Controller `MiniShop3\Controllers\Api\Manager\OptionGroupsController`, permission `mssetting_save`. Added in 1.11.0 — replace grouping via `modCategory` (#10).

| Method | Path | Description |
|---|---|---|
| `GET` | `` | Group list. Params: `start`, `limit` (`0` = all), `query` (search by `name` / `description`). Response: groups with `options_count`. |
| `GET` | `/{id}` | One group + `options_count` |
| `POST` | `` | Create group: `name` (required), `description`, `sort_order` |
| `PUT` | `/{id}` | Update: `name`, `description`, `sort_order` |
| `DELETE` | `/{id}` | Delete group. Options are not deleted — `option_group_id` is cleared (moved to «No group») |
| `PUT` | `/positions` | Save new order: either `positions: { id: position, ... }` or `ids: [id, id, ...]` (ordered list) |
| `DELETE` | `/bulk` | Bulk delete: `ids[]`. Options are unlinked (not deleted), then groups are removed |

### Category options — `/api/mgr/categories/{category_id}/options/*`

Controller `MiniShop3\Controllers\Api\Manager\CategoryOptionsController`, permission `mscategory_save`.

| Method | Path | Description |
|---|---|---|
| `GET` | `` | Options linked to the category. Each row returns `caption` (effective), `global_caption`/`global_description` + `category_caption`/`category_description` (override) |
| `POST` | `` | Link option to category: `option_id`, `value`, `active`, `required`, `caption`, `description` |
| `PUT` | `/{option_id}` | Partial update of link: `value`, `active`, `required`, `position`, `caption`, `description` |
| `DELETE` | `/{option_id}` | Remove link. Product values are deleted only if the option is not active in any other product category |
| `POST` | `/sort` | Save new order (`option_ids[]`) |
| `POST` | `/bulk` | Bulk actions: `activate` / `deactivate` / `require` / `unrequire` / `remove` for `option_ids[]` |
| `POST` | `/duplicate` | Copy links from `category_from`; existing in current category are skipped |

### Schema API — `msOptionType::getSchema()`

::: info Since v1.10.0-beta1
:::

Each type class in `Controllers/Options/Types/` can return a declarative field description instead of an ExtJS JS string:

```php
abstract class msOptionType
{
    abstract public function getField($field);        // legacy — returns JS string for ExtJS
    public function getSchema(array $field): array;   // new — array for Vue renderer
}
```

`OptionLoaderService::getFieldsForProduct()` attaches `schema` to each `option_fields` row alongside legacy `ext_field`. The Vue product card reads `schema`; legacy `ext_field` remains for backward compatibility (but is no longer used in core).
