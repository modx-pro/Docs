---
title: Extra fields cookbook
description: Creating extra fields, xtypes, repeater and key-value for orders and products
---

# Extra fields cookbook

An extra field adds a column to the model table and a widget in the Vue form. Full parameter reference: [Extra fields](/en/components/minishop3/interface/utilities/extra-fields).

<!-- ![Extra fields utility](/components/minishop3/screenshots/mgr-extra-fields.png) -->

## Goal

Pick a model, key, and xtype. After the migration runs, the field appears in the manager and (for `msProductData`) may be available in CSV import.

## When to use

| Task | Extra field |
| --- | --- |
| New “wholesale price” column on a product | yes |
| Manager comment on an order | yes |
| Move `price` to another section without a new column | no → [model fields](/en/components/minishop3/manager/model-fields/cookbook) |
| Reorder fields on the product “Data” tab | no → [product fields](/en/components/minishop3/interface/utilities/product-fields) |

## Models (class)

In the UI and in POST, use the fully qualified class name:

| UI label | class |
| --- | --- |
| msProductData | `MiniShop3\Model\msProductData` |
| msOrder | `MiniShop3\Model\msOrder` |
| msOrderAddress | `MiniShop3\Model\msOrderAddress` |
| msVendor | `MiniShop3\Model\msVendor` |
| msCategory | `MiniShop3\Model\msCategory` |

For orders, see the [end-to-end example](/en/components/minishop3/manager/examples/order-custom-field).

## xtypes in 1.13

| xtype | Purpose |
| --- | --- |
| `textfield` | String |
| `numberfield` | Number |
| `textarea` | Multiline text |
| `xcheckbox` | Yes/no |
| `ms3-combo-select` | Select from `select_options` |
| `ms3-repeater` | Row table (JSON) |
| `ms3-key-value` | Key → value pairs (JSON) |
| `ms3-combo-vendor` | Vendor picker |
| `ms3-combo-autocomplete` | API autocomplete |
| `ms3-combo-options` | Product option |

Rich text editor and date xtypes are not in the extra-fields UI in 1.13. Track [issue #610](https://github.com/modx-pro/MiniShop3/issues/610) and [#612](https://github.com/modx-pro/MiniShop3/issues/612).

## Case: select on a product

1. **Utilities → Extra fields** → class **msProductData**.
2. Key `supply_type`, xtype `ms3-combo-select`.
3. **select_options**:

```json
[
  ["stock", "In stock"],
  ["on_request", "Pre-order"]
]
```

Set dbtype `varchar` and phptype `string`.

For `msProductData` the package also creates a row in `ms3_product_fields` so the field shows on the “Data” tab.

## Case: repeater

1. xtype `ms3-repeater`, dbtype/phptype `json`.
2. **repeater_config**:

```json
{
  "columns": [
    { "key": "name", "label": "Name" },
    { "key": "qty", "label": "Qty", "type": "number" }
  ],
  "minRows": 0,
  "maxRows": 50,
  "sortable": true,
  "rankField": "rank"
}
```

Repeaters are not included in CSV import.

## Case: key-value

1. xtype `ms3-key-value`, dbtype/phptype `json`.
2. **key_value_config**:

```json
{
  "mode": "fixed",
  "keys": [
    { "key": "width", "label": "Width", "valueType": "number", "required": false },
    { "key": "material", "label": "Material", "valueType": "string", "required": true }
  ]
}
```

`mode: free` allows adding pairs in the form.

## Order form output

After creating a field for `MiniShop3\Model\msOrder`, open an order card. **Additional order fields** is built from `GET /api/mgr/extra-fields` and `OrderExtraFieldsSection.vue`.

Save sends the field key at the top level of `PUT /api/mgr/orders/{id}` (see [example](/en/components/minishop3/manager/examples/order-custom-field)).

<!-- ![Additional order fields on the order card](/components/minishop3/screenshots/mgr-order-extra-field.png) -->

## API appendix

| Method | Path | Permission |
| --- | --- | --- |
| GET | `/api/mgr/extra-fields?class={class}` | `mssetting_save` |
| GET | `/api/mgr/extra-fields/{id}` | `mssetting_save` |
| POST | `/api/mgr/extra-fields` | `mssetting_save` |
| PUT | `/api/mgr/extra-fields/{id}` | `mssetting_save` |
| DELETE | `/api/mgr/extra-fields/{id}` | `mssetting_save` |

POST/DELETE triggers a Phinx migration. Check the MODX log if creation fails.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| “Column already exists” | Column or duplicate key already present |
| Field missing on product card | For `msProductData`, check `ms3_product_fields` and `visible`. See [product fields cookbook](/en/components/minishop3/manager/product-fields/cookbook) |
| Empty order section with active=1 | Form uses `class=msOrder`. DB: `MiniShop3\Model\msOrder`. API filters by exact match |
| Repeater/key-value won't save | JSON schema in config, dbtype must be `json` |
| 403 | `mssetting_save` |

Reference: [extra-fields](/en/components/minishop3/interface/utilities/extra-fields).
