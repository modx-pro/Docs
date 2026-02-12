---
title: Product options
---
# Product options

Option management is available via **Extras → MiniShop3 → Settings → Options**.

## Purpose

Options are an EAV (Entity-Attribute-Value) system for extra product attributes. They let you add arbitrary properties without changing the database schema:

- Color, size, material
- Technical specs
- Contents
- Any custom attributes

## Option fields

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Unique option key (Latin) |
| `caption` | string | Display name |
| `description` | text | Option description |
| `measure_unit` | string | Unit (pcs, kg, cm) |
| `type` | string | Value type |
| `properties` | JSON | Extra settings |

## Option types

| type | Description | Example value |
|------|-------------|---------------|
| `textfield` | Single-line text | "Red" |
| `textarea` | Multi-line text | Long description |
| `number` | Numeric value | 42 |
| `combo` | Dropdown | Choice from list |
| `checkbox` | Checkbox | true/false |

## Category binding

Options are bound to product categories. This allows:

- Showing only relevant options for category products
- Grouping options
- Reusing options across categories

### Via interface

1. Open the option for editing
2. Check the desired categories in the list
3. Save

### Via PHP

```php
// Bind option to categories
$option = $modx->getObject(\MiniShop3\Model\msOption::class, ['key' => 'color']);
$option->setCategories([5, 10, 15]); // Category IDs
```

## Product option values

### Adding a value

```php
// Add option value to product
$optionValue = $modx->newObject(\MiniShop3\Model\msProductOption::class);
$optionValue->fromArray([
    'product_id' => 123,
    'key' => 'color',
    'value' => 'Red',
]);
$optionValue->save();
```

### Getting values

```php
// Get all product options
$options = $modx->getCollection(\MiniShop3\Model\msProductOption::class, [
    'product_id' => 123
]);

foreach ($options as $option) {
    echo $option->get('key') . ': ' . $option->get('value');
}
```

## Outputting options

### msOptions snippet

Outputs option list for filtering:

```fenom
{'msOptions' | snippet: [
    'tpl' => 'tpl.msOptions.row',
    'parents' => 5
]}
```

### msProductOptions snippet

Outputs options for a specific product:

```fenom
{'msProductOptions' | snippet: [
    'product' => $id,
    'tpl' => 'tpl.msProductOptions.row'
]}
```

### In product card

```fenom
{* Output product options in msProducts *}
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

## Combo options

For `combo` type options, set variants in the `properties` field:

```json
{
  "values": [
    {"value": "S", "label": "Small"},
    {"value": "M", "label": "Medium"},
    {"value": "L", "label": "Large"},
    {"value": "XL", "label": "Extra large"}
  ]
}
```

### Size selector output

```fenom
{var $sizes = ['S', 'M', 'L', 'XL']}
<div class="size-selector">
    {foreach $sizes as $size}
        <label class="size-option">
            <input type="radio" name="options[size]" value="{$size}">
            <span>{$size}</span>
        </label>
    {/foreach}
</div>
```

## Options in cart

When adding a product to the cart you can pass selected options:

### JavaScript (Web API)

```javascript
// Add product with options
fetch('/assets/components/minishop3/api.php?route=/api/v1/cart/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'MS3TOKEN': token
    },
    body: JSON.stringify({
        id: 123,
        count: 1,
        options: {
            color: 'Red',
            size: 'L'
        }
    })
});
```

### Display in cart

Options are stored in the cart line and shown in the chunk:

```fenom
{* tpl.msCart.row *}
<tr>
    <td>{$pagetitle}</td>
    <td>
        {if $options?}
            {foreach $options as $key => $value}
                <small>{$key}: {$value}</small>
            {/foreach}
        {/if}
    </td>
    <td>{$count}</td>
    <td>{$price}</td>
</tr>
```

## Filtering by options

### msProducts snippet with filter

```fenom
{'msProducts' | snippet: [
    'parents' => 5,
    'options' => 'color==Red,size==L',
    'tpl' => 'tpl.msProducts.row'
]}
```

### Dynamic filtering

Use GET parameters:

```
/catalog/?color=Red&size=L
```

```fenom
{var $filters = []}
{if $_GET.color?}
    {$filters[] = 'color==' ~ $_GET.color}
{/if}
{if $_GET.size?}
    {$filters[] = 'size==' ~ $_GET.size}
{/if}

{'msProducts' | snippet: [
    'parents' => 5,
    'options' => $filters | join : ',',
    'tpl' => 'tpl.msProducts.row'
]}
```

## Option indexing

For fast filtering, options are indexed in a separate table. When product option values change, the index is updated automatically.

### Force reindex

```php
// Reindex product options
$product = $modx->getObject(\MiniShop3\Model\msProduct::class, 123);
$optionService = $modx->services->get('ms3_option_service');
$optionService->reindexProduct($product);
```

## Importing options

When importing products from CSV, options are created automatically from columns with the `option_` prefix:

| pagetitle | price | option_color | option_size |
|-----------|-------|--------------|-------------|
| T-shirt   | 1500  | Red          | L           |
| T-shirt   | 1500  | Blue         | M           |

Options `color` and `size` are created automatically if they do not exist.
