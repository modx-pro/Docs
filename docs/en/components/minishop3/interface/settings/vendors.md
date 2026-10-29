---
title: Vendors
---
# Vendors

Open **Extras → MiniShop3 → Settings → Product vendors**.

::: warning msOnVendor* events
CRUD in this section goes through the Manager API (`VendorsController`), **without** calling the processors `Processors/Settings/Vendor/*`. Plugins on `msOnBeforeVendorCreate` and the related events fire only from the legacy `runProcessor()`. Details: [Vendor events](/en/components/minishop3/development/events/vendor).
:::

## Purpose

The directory is there so you can:

- link products to brands
- show vendor data on the product page
- filter the catalog by vendor
- build brand pages

## Vendor fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Vendor name |
| `resource_id` | int | Resource ID of the vendor page |
| `country` | string | Vendor country |
| `logo` | string | Path to the logo |
| `address` | string | Address |
| `phone` | string | Phone |
| `email` | string | Email |
| `description` | text | Description |
| `position` | int | Sort order |
| `properties` | JSON | Extra properties |

## Resource link

The `resource_id` field links the vendor to a MODX resource:

- SEO pages for brands
- A catalog of that vendor's products
- A longer text about the brand

When `resource_id` is set, snippets can take the URL of the vendor page.

## Usage

### Vendor on the product card

The vendor is set on the product card in the **Vendor** field. A product has only one vendor.

### Output in snippets

`msProducts` prints vendor placeholders **by default**: the join and the `vendor_*` columns come from `includeVendorFields`, whose registered default is `*`. There is no `includeVendor` property on the snippet.

List the fields with commas when you do not need all of them:

```fenom
{if $vendor_name?}
    {if $vendor_logo?}
        <img src="{$vendor_logo}" alt="{$vendor_name}">
    {/if}
    {$vendor_name}
    {if $vendor_country?} ({$vendor_country}){/if}
{/if}
```

```fenom
{$_modx->runSnippet('msProducts', [
    'parents' => 0,
    'includeVendorFields' => 'name,logo',  {* the default is * — every vendor column *}
    'tpl' => 'tpl.msProducts.row'
])}
```

### Filter by vendor

`msProducts` has no `vendors` parameter. Filter with `where` on the product data:

```fenom
{$_modx->runSnippet('msProducts', [
    'parents' => 0,
    'where' => ['Data.vendor_id:IN' => [1, 2, 3]],  {* an array: xPDO binds a string as one value *}
    'tpl' => 'tpl.msProducts.row'
])}
```

### Vendor list

The list comes from a direct query on the model, or from your own snippet:

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

::: info Since v1.9.0
Vendors support custom fields created in **Utilities → Extra fields**.
:::

To add a custom field to vendors:

1. Go to **Extras → MiniShop3 → Utilities → Extra fields**
2. In the dropdown, select the **msVendor** model
3. Click **Create field** and set the key and the type (`textfield`, `numberfield`, `checkbox`, `textarea`, and others)

The field appears on the vendor edit form. All 13+ `DynamicField` types are supported, including:

- `textfield`: text field
- `numberfield`: number field
- `textarea`: multiline text
- `checkbox`: checkbox
- `file` / `image`: file picker through FileBrowser
- `combobox`: dropdown

Custom field values are saved and returned by the API together with the standard vendor fields.

## Extra properties

The `properties` field stores arbitrary JSON:

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

When products are imported from CSV, vendors are created automatically if the `vendor` column is set. The component looks up the vendor by name and creates a new one when it is missing.
