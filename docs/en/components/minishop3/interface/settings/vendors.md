---
title: Vendors
---
# Vendors

Vendors (brands) are managed via **Extras → MiniShop3 → Settings → Vendors**.

## Purpose

The vendor directory lets you:

- Link products to brands
- Show vendor information on the product page
- Filter the catalog by vendor
- Create brand pages

## Vendor fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Vendor name |
| `resource_id` | int | Resource ID — vendor page |
| `country` | string | Vendor country |
| `logo` | string | Logo path |
| `address` | string | Address |
| `phone` | string | Phone |
| `email` | string | Email |
| `description` | text | Description |
| `position` | int | Sort order |
| `properties` | JSON | Additional properties |

## Resource linkage

The `resource_id` field links a vendor to a MODX resource. Useful for:

- SEO brand pages
- Catalog of products from a specific vendor
- Detailed brand information

When `resource_id` is set, snippets can resolve the vendor page URL.

## Usage

### Assigning a vendor to a product

Set the vendor in the product card in the **Vendor** field. A product can have only one vendor.

### Output in snippets

In `msProducts` these vendor placeholders are available:

```fenom
{if $vendor_name?}
<div class="product-vendor">
    {if $vendor_logo?}
        <img src="{$vendor_logo}" alt="{$vendor_name}">
    {/if}
    <span>{$vendor_name}</span>
    {if $vendor_country?}
        <span class="country">({$vendor_country})</span>
    {/if}
</div>
{/if}
```

### Filter by vendor

```fenom
{$_modx->runSnippet('msProducts', [
    'parents' => 0,
    'vendors' => '1,2,3',  // Vendor IDs
    'tpl' => 'tpl.msProducts.row'
])}
```

### Vendor list

To list vendors use a direct query or a custom snippet:

```php
<?php
// Snippet msVendors
$vendors = $modx->getCollection(\MiniShop3\Model\msVendor::class, [
    'position:>' => 0
]);

$output = '';
foreach ($vendors as $vendor) {
    $output .= $modx->getChunk('tpl.msVendor.row', $vendor->toArray());
}

return $output;
```

## Extra fields {#extra-fields}

::: info Starting with v1.9.0
Vendors support custom fields created via **Utilities → Extra fields**.
:::

To add a custom vendor field:

1. Go to **Extras → MiniShop3 → Utilities → Extra fields**
2. Select model **msVendor** in the dropdown
3. Click **Create field** and set key, type (`textfield`, `numberfield`, `checkbox`, `textarea`, etc.)

The field appears in the vendor edit form. All 13+ `DynamicField` types are supported, including:

- `textfield` — text field
- `numberfield` — number field
- `textarea` — multiline text
- `checkbox` — checkbox
- `file` / `image` — file picker via FileBrowser
- `combobox` — dropdown

Extra field values are saved and returned via API together with standard vendor fields.

## Additional properties

The `properties` field stores arbitrary JSON data:

```json
{
  "website": "https://vendor-site.com",
  "founded": 1985,
  "slogan": "Quality first",
  "social": {
    "facebook": "https://facebook.com/vendor",
    "instagram": "https://instagram.com/vendor"
  }
}
```

In a chunk:

```fenom
{if $properties.website?}
    <a href="{$properties.website}" target="_blank">Vendor website</a>
{/if}
```

## Vendor import

When importing products from CSV, vendors are created automatically if the `vendor` column is present. The system looks up an existing vendor by name and creates a new one if missing.
