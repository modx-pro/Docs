---
title: Wholesale price on product
description: End-to-end — extra field on msProductData, Data tab layout, optional category grid column
---

# Wholesale price on product

Add a numeric extra field to product data and choose where it appears in the manager.

## Goal

Managers enter a wholesale price on the **Data** tab. The value lives in `ms3_product_data` and saves with the product card.

## Requirements

- MiniShop3 1.13.x
- Permission `mssetting_save`
- Permission to edit the product resource

## Step 1. Create extra field

1. **Extras → MiniShop3 → Utilities → Extra fields**.
2. Class **msProductData (Product data)**.
3. **Create field**:

| Parameter | Value |
| --- | --- |
| Key | `wholesale_price` |
| Label | Wholesale price |
| xtype | `numberfield` |
| dbtype | `decimal` |
| precision | `12,2` |
| phptype | `float` |
| Active | yes |

The package adds a table column and a row in `ms3_product_fields`.

::: tip Class in DB
The UI stores class as `MiniShop3\Model\msProductData`. Use the same value in POST `class`.
:::

## Step 2. Layout on the Data tab

1. **Utilities → Product fields**.
2. Find **Wholesale price** (or move it from “No section”).
3. Place it in **Main data** or create a **Prices** section.
4. Enable **Visibility**, set order.
5. Reload the product card.

See [Product fields cookbook](/en/components/minishop3/manager/product-fields/cookbook).

## Step 3. Category grid column (optional)

1. **Utilities → Grid columns** → grid **category-products**.
2. Add column `wholesale_price`, type **price**.
3. In **displayConfig**:

```json
{
  "decimals": 2,
  "currency": "₽",
  "currency_position": "after",
  "thousands_separator": " "
}
```

See [Grid columns cookbook](/en/components/minishop3/manager/grid-config/cookbook).

## Step 4. Verify

```http
GET /api/mgr/extra-fields?class=MiniShop3\Model\msProductData
```

Open a product, enter a value, save. The product GET response should include `"wholesale_price": 1200.5`.

## CSV import

Map column `wholesale_price` in **Utilities → Import** after the field exists and migration ran. Repeater and key-value are not supported in CSV.

## vs model fields

Extra fields **create a column**. [Model fields](/en/components/minishop3/manager/model-fields/cookbook) adjust order forms and other MS3 entities, not the product Data tab layout. For a new `ms3_product_data` column use extra fields, then **Product fields**.

## API appendix

| Method | Path | Permissions |
| --- | --- | --- |
| POST | `/api/mgr/extra-fields` | `mssetting_save` |
| PUT | `/api/mgr/config/page-fields/product_data` | `mssetting_save` |
| PUT | `/api/mgr/grid-config/category-products` | `mssetting_save` |

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Field in utility but not on tab | `visible` in **Product fields**, reload page |
| Missing in **Product fields** list | Row in `ms3_product_fields` after POST extra field |
| Empty grid column | Type **price** or **model**, name matches extra field key |
| Migration error | MODX log, permissions on `core/components/minishop3/migrations` |

See [Extra fields cookbook](/en/components/minishop3/manager/extra-fields/cookbook), [Product](/en/components/minishop3/interface/product).
