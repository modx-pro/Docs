---
title: Product options
---
# Product options

Open **Extras → MiniShop3 → Settings → Options**.

::: info Starting with v1.10.0-beta1
Options UI is on Vue 3 + PrimeVue. Old ExtJS windows and processors `Processors/Settings/Option/*`, `Processors/Category/Option/*` are removed. All operations go through `/api/mgr/options/*` and `/api/mgr/categories/{id}/options/*`.
:::

## Purpose

Options store product attributes (EAV): color, size, material, any custom keys. You do not touch core MODX tables for this.

## Interface

Two tabs:

1. **Options:** category tree on the left, options grid on the right.
2. **Option groups:** CRUD and drag-and-drop sort for `msOptionGroup` (since v1.11).

### Options tab

- **Left:** MODX category tree (`class_key = msCategory`). Checkboxes are independent: checking a parent does not select children. Context menu: refresh branch, expand or collapse, select or clear selection on the branch. Search by name is available.
- **Right:** options grid. Filters: selected categories + group (`option_group_id`). Bulk actions: assign options to categories, delete.

Create and edit dialog: form on the left (key, caption, description, type, `msOptionGroup` group, unit), category tree on the right for binding. For `combobox` / `comboMultiple` / `comboColors` there is a value editor with drag-drop. For `comboColors`, a `ColorPicker` sits next to the hex field.

### Option groups tab

Groups live in table `ms3_option_groups` (`name`, `description`, `sort_order`). This is not `modCategory`: unrelated categories from other packages no longer clutter the list.

Option field: `option_group_id` (nullable). Deleting a group unlinks options (`option_group_id = NULL`) and does not delete the options themselves.

::: warning Breaking (v1.11)
Previously the group used `msOption.modcategory_id` and `modCategory`. A Phinx migration moves data into `msOptionGroup`. In chunks replace `{$option.category_name}` / `{$option.category}` with `{$option.group_name}`. Endpoint `/api/mgr/options/modcategories` was removed. Use `/api/mgr/option-groups`.
:::

## Option fields

| Field | Type | Description |
| --- | --- | --- |
| `key` | string | Unique option key (Latin letters, digits, `_`, `-`) |
| `caption` | string | Display name |
| `description` | text | Option description |
| `measure_unit` | string | Unit of measure (pcs, kg, cm) |
| `option_group_id` | int / null | `msOptionGroup` group. Optional |
| `type` | string | Value type (see below) |
| `properties` | JSON | Extra settings (for list-based types) |

## Option types

Type is stored in `msOption.type` as `lowerCamelCase`. All 10 supported types:

| type | Description | Value editor in settings | UI on product card |
| --- | --- | --- | --- |
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

If an option should have a different label in a category than globally — set an override
in the category options grid (inline edit on "Caption (for category)") or in the
"Add option" dialog. Empty means "use global". Non-empty —
shown in the manager (product form in that category) and on the storefront via
`OptionLoaderService::loadForProduct` / `loadForProducts`.

**Conflict resolution when a product is in multiple categories:** if the product belongs to several
categories and each has its own override, resolution order:

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
For multi-value types (`comboMultiple`, `comboColors`, `comboOptions`) — multiple rows
with the same `key` per product.

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
| --- | --- | --- |
| `GET` | `/api/mgr/options` | List. Params: `start`, `limit`, `option_group_id` (`0` = no group), `category_id`, `categories[]` |
| `GET` | `/api/mgr/options/{id}` | Detail + `categories` map |
| `POST` | `/api/mgr/options` | Create (`key`, `caption`, `type`, `option_group_id`, `properties`, `categories`, …) |
| `PUT` | `/api/mgr/options/{id}` | Update (partial) |
| `DELETE` | `/api/mgr/options/{id}` | Delete option (cascade product values) |
| `DELETE` | `/api/mgr/options/bulk` | Bulk delete (`ids[]`) |
| `POST` | `/api/mgr/options/bulk/assign` | Assign `options[]` to `categories[]` |
| `GET` | `/api/mgr/options/types` | Type list |
| `GET` | `/api/mgr/options/tree` | `msCategory` category tree (lazy by `parent`) |
| `GET` | `/api/mgr/options/suggestions` | Unique values for `comboOptions` (`key`, `query`, `limit`) |
| `GET` | `/api/mgr/option-groups` | Group list |
| `POST` | `/api/mgr/option-groups` | Create group |
| `GET` / `PUT` / `DELETE` | `/api/mgr/option-groups/{id}` | Read, update, delete |
| `PUT` | `/api/mgr/option-groups/positions` | Order after DnD |
| `DELETE` | `/api/mgr/option-groups/bulk` | Bulk delete |

### Category bindings

| Method | Path | Description |
| --- | --- | --- |
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
| --- | --- | --- | --- |
| T-shirt | 1500 | Red | L |
| T-shirt | 1500 | Blue | M |

Options `color` and `size` are created automatically if missing. By default they are created as `textfield` — change the type later in the UI.
