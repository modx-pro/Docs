---
title: Vendors
---
# Vendors

Vendor (brand) management is available via **Extras → MiniShop3 → Settings → Vendors**.

## Purpose

The vendor directory lets you:

- Link products to brands
- Show vendor info on the product page
- Filter catalog by vendor
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
| `properties` | JSON | Extra properties |

## Resource association

The `resource_id` field links a vendor to a MODX resource. Useful for:

- SEO brand pages
- Outputting products of a vendor
- Detailed brand info

When `resource_id` is set, snippets can get the vendor page URL.

## Usage

### Assigning vendor to product

The vendor is set in the product card in the **Vendor** field. A product can have only one vendor.

### Output in snippets

The `msProducts` snippet exposes vendor placeholders:

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

### Filtering by vendor

```fenom
{$_modx->runSnippet('msProducts', [
    'parents' => 0,
    'vendors' => '1,2,3',  // Vendor IDs
    'tpl' => 'tpl.msProducts.row'
])}
```

### Vendor list

To output a vendor list use a direct query or custom snippet:

```php
<?php
// msVendors snippet
$vendors = $modx->getCollection(\MiniShop3\Model\msVendor::class, [
    'position:>' => 0
]);

$output = '';
foreach ($vendors as $vendor) {
    $output .= $modx->getChunk('tpl.msVendor.row', $vendor->toArray());
}

return $output;
```

## Extra properties

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

Access in chunk:

```fenom
{if $properties.website?}
    <a href="{$properties.website}" target="_blank">Vendor website</a>
{/if}
```

## Importing vendors

When importing products from CSV, vendors are created automatically if the `vendor` column is present. The system looks up a vendor by name and creates a new one if not found.
