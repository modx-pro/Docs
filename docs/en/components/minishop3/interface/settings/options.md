---
title: Product options
---
# Product options

Options are managed via **Extras → MiniShop3 → Settings → Options**.

::: info Starting with v1.10.0-beta1
The options management interface is fully on Vue 3 + PrimeVue. ExtJS windows and grids were removed together with all `Processors/Settings/Option/*` and `Processors/Category/Option/*` processors. All operations go through REST API `/api/mgr/options/*` and `/api/mgr/categories/{id}/options/*`.
:::

## Purpose

Options are an EAV (Entity-Attribute-Value) system for extra product attributes. Add arbitrary properties without changing the database schema:

- Color, size, material
- Technical specifications
- Package contents
- Any custom properties

## Interface

The page has two columns:

- **Left** — MODX category tree (only resources with `class_key = msCategory`). Category checkboxes are **independent** (checking a parent does not cascade to children and vice versa). Context menu (right-click on a node): refresh branch, expand/collapse subtree, "Select all" / "Clear selection" recursively on the branch. Category name search is available.
- **Right** — options grid (PrimeVue DataTable). Toolbar filters: categories selected in the tree + "Group (modCategory)". Bulk actions — assign selected options to multiple categories at once, delete.

Create and edit open in a dialog: form on the left (key, caption, description, type, group, unit), category tree on the right for binding. For `combobox` / `comboMultiple` / `comboColors` a value editor with drag-drop sorting appears; for `comboColors` — built-in `ColorPicker` next to the hex field.

## Option fields

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Unique option key (Latin letters, digits, `_`, `-`) |
| `caption` | string | Display name |
| `description` | text | Option description |
| `measure_unit` | string | Unit of measure (pcs, kg, cm) |
| `modcategory_id` | int | Group (MODX category) for UI grouping. Optional |
| `type` | string | Value type (see below) |
| `properties` | JSON | Extra settings (for list-based types) |

## Option types

Type is stored in `msOption.type` as `lowerCamelCase`. All 10 supported types:

| type | Description | Value editor in settings | UI on product card |
|------|-------------|--------------------------|-------------------|
| `textfield` | Single-line text | — | InputText |
| `textarea` | Multiline text | — | Textarea |
| `numberfield` | Number | — | InputNumber |
| `datefield` | Date | — | DatePicker (YYYY-MM-DD) |
| `checkbox` | Checkbox (Yes / No) | — | Checkbox |
| `comboBoolean` | Yes / No dropdown | — | Select with two values |
| `combobox` | Single select from list | String list (drag-drop) | Select |
| `comboMultiple` | Multiple select from list | String list (drag-drop) | MultiSelect |
| `comboColors` | Multiple select with colors | List `{value, name=hex}` + ColorPicker | MultiSelect with color squares |
| `comboOptions` | Free-form tags with autocomplete | — (values accumulate when saving products) | PrimeVue InputChips + suggestions from previously entered values |

### `properties` structure for list types

`combobox`, `comboMultiple`:

```json
{
  "values": ["S", "M", "L", "XL"]
}
```

`comboColors` (hex stored in `name`, display label in `value`):

```json
{
  "values": [
    { "value": "Red", "name": "#FF0000" },
    { "value": "Blue",   "name": "#0000FF" }
  ]
}
```

`comboOptions` does not require a preset list — on the product card the user enters any text (Enter, comma, or blur → chip). Autocomplete loads values already used for the same key on **other products** via `/api/mgr/options/suggestions`.

## Category binding

Options appear only on products in bound categories. Binding options:

- **In the option edit dialog** — check categories in the tree on the right.
- **On category card → Options tab** — add the option to that category.
- **Bulk assign** — select multiple options in the grid, click "Assign to categories", pick categories.

### Per-category caption / description override

::: info Starting with v1.10.0-beta1
The "option ↔ category" link (`msCategoryOption`) has its own `caption` and `description`.
:::

If an option should have a different label in a category than globally — set an override in the category options grid (inline edit on "Caption (for category)") or in the "Add option" dialog. Empty means "use global". Non-empty — shown in the manager (product form in that category) and on the storefront via `OptionLoaderService::loadForProduct` / `loadForProducts`.

**Conflict resolution when a product is in multiple categories:** if the product belongs to several categories and each has its own override, resolution order:

1. Product parent category (`msProduct.parent`)
2. Lower `msCategoryOption.position`
3. Lower `category_id` (stable tiebreak)

### Via PHP

```php
/** @var \MiniShop3\Model\msOption $option */
$option = $modx->getObject(\MiniShop3\Model\msOption::class, ['key' => 'color']);
$option->setCategories([5, 10, 15]); // Category IDs

// Via service (with caption/description override support):
$optionService = $modx->services->get('ms3_option_service');
$optionService->addOptionToCategory(
    optionId: $option->get('id'),
    categoryId: 5,
    defaultValue: 'Red',
    active: true,
    position: 0,
    caption: 'Upholstery color',       // override for this category
    description: null
);
```

## Product option values

Values are stored in `ms3_product_options` (`product_id`, `key`, `value`).
For multi-value types (`comboMultiple`, `comboColors`, `comboOptions`) — multiple rows with the same `key` per product.

### Adding a value

```php
$modx->services->get('ms3_option_service')->saveProductOptions(
    productId: 123,
    options: [
        'color' => 'Red',            // single value
        'size' => ['S', 'M', 'L'],   // multi value
    ],
    removeOther: true                     // remove keys not listed in $options
);
```

### Getting values

Standard path — via `OptionLoaderService`:

```php
$loader = $modx->services->get('ms3_option_service')->getLoader();

// Single product (with per-category caption override applied)
$data = $loader->loadForProduct(123);
// $data = [
//   'color'         => ['Red'],
//   'color.caption' => 'Upholstery color',  // override from msCategoryOption (if set)
//   'size'          => ['S', 'M'],
//   ...
// ]

// Catalog (batch, no N+1)
$byProduct = $loader->loadForProducts([123, 124, 125]);
```

## Displaying options

### msOptions snippet

Lists options for filtering:

```fenom
{'msOptions' | snippet : [
    'tpl' => 'tpl.msOptions.row',
    'parents' => 5
]}
```

### msProductOptions snippet

Shows options for a specific product:

```fenom
{'msProductOptions' | snippet : [
    'product' => $id,
    'tpl' => 'tpl.msProductOptions.row'
]}
```

### On the product page

```fenom
{if $options?}
<div class="product-options">
    {foreach $options as $key => $value}
    <div class="option">
        <span class="option-name">{$key}:</span>
        <span class="option-value">{$value}</span>
    </div>
    {/foreach}
</div>
{/if}
```

## Options in the cart

When adding a product to the cart you can pass selected options:

### JavaScript (Web API)

```javascript
await ms3.cartAPI.add(123, 1, { color: 'Red', size: 'L' })
```

### Display in cart

Options are stored on the cart line and available in the chunk:

```fenom
{if $options?}
    {foreach $options as $key => $value}
        <small>{$key}: {$value}</small>
    {/foreach}
{/if}
```

## REST API

All UI operations use these endpoints (manager API, `/assets/components/minishop3/connector.php`, action `MiniShop3\Processors\Api\Router`). Permissions: `mssetting_save` for options, `mscategory_save` for category binding.

### Options

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/mgr/options` | Option list. Params: `start`, `limit`, `modcategory_id`, `category_id`, `categories[]` |
| `GET` | `/api/mgr/options/{id}` | Detail + `categories` map |
| `POST` | `/api/mgr/options` | Create (`key`, `caption`, `type`, `properties`, `categories`, …) |
| `PUT` | `/api/mgr/options/{id}` | Update (partial) |
| `DELETE` | `/api/mgr/options/{id}` | Delete option (cascade product values via model hook) |
| `DELETE` | `/api/mgr/options/bulk` | Bulk delete (`ids[]`) |
| `POST` | `/api/mgr/options/bulk/assign` | Assign `options[]` to `categories[]` |
| `GET` | `/api/mgr/options/types` | Available types (localized names) |
| `GET` | `/api/mgr/options/tree` | MODX category tree (only `class_key = msCategory`). Lazy by `parent` |
| `GET` | `/api/mgr/options/modcategories` | Flat `modCategory` list for "Group" filter |
| `GET` | `/api/mgr/options/suggestions` | Unique values by `key` for `comboOptions` autocomplete (`key`, `query`, `limit`) |

### Category bindings

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/mgr/categories/{category_id}/options` | Options bound to category (with `global_caption`/`global_description` + `category_caption`/`category_description` override) |
| `POST` | `/api/mgr/categories/{category_id}/options` | Add option to category (`option_id`, `value`, `active`, `required`, `caption`, `description`) |
| `PUT` | `/api/mgr/categories/{category_id}/options/{option_id}` | Partial update of binding (value / active / required / position / caption / description) |
| `DELETE` | `/api/mgr/categories/{category_id}/options/{option_id}` | Remove binding |
| `POST` | `/api/mgr/categories/{category_id}/options/sort` | Save new order (`option_ids[]`) |
| `POST` | `/api/mgr/categories/{category_id}/options/bulk` | Bulk actions: `activate` / `deactivate` / `require` / `unrequire` / `remove` for `option_ids[]` |
| `POST` | `/api/mgr/categories/{category_id}/options/duplicate` | Copy all bindings from another category (`category_from`), skipping existing |

## Option import

When importing products from CSV, options are created automatically from columns with the `option_` prefix:

| pagetitle | price | option_color | option_size |
|-----------|-------|--------------|-------------|
| T-shirt  | 1500  | Red          | L           |
| T-shirt  | 1500  | Blue         | M           |

Options `color` and `size` are created automatically if missing. By default they are created as `textfield` — change the type later in the UI.
