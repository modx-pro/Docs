---
title: Product fields cookbook
description: Sections, visibility, and page_key product_data on the Data tab
---

# Product fields cookbook

**Product fields** control layout of the **Data** tab on the product card. Create DB columns via [extra fields](/en/components/minishop3/manager/extra-fields/cookbook).

Reference: [Product fields](/en/components/minishop3/interface/utilities/product-fields).

## Goal

Group `article`, `price`, and extra fields into sections, hide noise, change order. The Data tab Vue component reads `GET /api/mgr/config/page-fields/product_data`.

## page_key

| page_key | Screen |
| --- | --- |
| `product_data` | Product “Data” tab |

No other page_key for this utility in 1.13.x.

## Relation to extra fields

1. POST in **Extra fields** for `MiniShop3\Model\msProductData` creates a column and a `ms3_product_fields` row.
2. **Product fields** change section, label, xtype, `visible`, `sort_order`. Do not create columns here.

Full walkthrough: [Wholesale price](/en/components/minishop3/manager/examples/product-extra-field).

## Case: Prices section

1. **Utilities → Product fields** → **Add section**.
2. Key `prices`, label **Prices**, `sort_order` after Main data.
3. Move `price`, `old_price`, extra `wholesale_price` into **Prices**.
4. Save, reload the product card.

## Case: hide color and size

When size and color use options:

1. Open field `color` → disable **Visibility**.
2. Same for `size`.
3. Fields stay in DB, hidden on the tab.

## Case: SEO block

1. Section `seo`, label **SEO**.
2. Move `tags` or custom metadata extra fields.
3. Reorder sections via drag-and-drop.

## API appendix

```http
GET /api/mgr/config/page-fields/product_data
GET /api/mgr/config/sections/product_data
PUT /api/mgr/config/page-fields/product_data
POST /api/mgr/config/sections/product_data
```

Example PUT:

```json
{
  "name": "wholesale_price",
  "label": "Wholesale price",
  "section": 2,
  "visible": true,
  "sort_order": 10
}
```

Writes require `mssetting_save`.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Changes not visible | Hard reload product card |
| Field missing from list | Create extra field for `msProductData` first |
| Confused with model fields | Model fields — order, vendor. Product fields — Data tab only |
| Wrong xtype | Edit field in utility or PUT page-fields |

See [Manager cookbooks](/en/components/minishop3/manager/), [model fields](/en/components/minishop3/manager/model-fields/cookbook).
