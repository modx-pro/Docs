---
title: Model fields cookbook
description: Sections, sort_order, visible list, and page-fields in the Vue manager
---

# Model fields cookbook

Model fields configure **display** of columns that already exist in the database. Create a new column via [extra fields](/en/components/minishop3/manager/extra-fields/cookbook).

Reference: [Model fields](/en/components/minishop3/interface/utilities/model-fields).

<!-- ![Model fields utility: sections and field list](/components/minishop3/screenshots/mgr-model-fields.png) -->

## Goal

Group fields into sections, set xtype and width, hide technical columns. Vue order and entity forms load the **visible** list from the server.

## Models

| model (short name) | Manager form |
| --- | --- |
| `msOrder` | Order card |
| `msOrderAddress` | Address on order |
| `msOrderProduct` | Order line item |
| `msVendor` | Vendor |
| `msProductData` | Product data (partial) |

## Visible list vs full CRUD

| Request | Purpose |
| --- | --- |
| `GET /api/mgr/model-fields/visible/{model}` | Fields for Vue forms (`visible` only) |
| `GET /api/mgr/model-fields?model={model}` | Full list in “Model fields” utility |
| `PUT /api/mgr/model-fields/{id}` | Single field metadata |
| `PUT /api/mgr/model-fields/ranks` | Field order (drag-and-drop) |

The order card calls `visible/msOrder` and `visible/msOrderAddress` on load.

## Case: “Additional” section on an order

1. **Utilities → Model fields** → model **msOrder**.
2. Create a section:
   - key `extra_info`
   - label “Additional”
   - `sort_order` as needed
3. Open a field (e.g. `comment`) → section **Additional**, `visible = true`, width 12.
4. Drag sections and fields to the order you need.

Section order: `PUT /api/mgr/model-fields/sections/ranks`. Field order: `PUT /api/mgr/model-fields/ranks`.

::: info Section sorting
If section drag-and-drop does not persist, see [issue #611](https://github.com/modx-pro/MiniShop3/issues/611).
:::

## Case: hide a technical field

1. Find the field in the list (e.g. `token` or `properties`).
2. Clear **Visible** or move it to a section you do not show on the form.
3. Confirm it is absent from `GET .../visible/msOrder`.

## Relation to page-fields

| System | Table | API | Scope |
| --- | --- | --- | --- |
| Model fields | `ms3_model_fields` | `/api/mgr/model-fields/*` | MS3 models (order, vendor, …) |
| Page fields | `ms3_product_fields` | `/api/mgr/config/page-fields/product_data` | Product “Data” tab only |

An extra field on `msProductData` creates the column **and** a row in `ms3_product_fields`. Layout of that tab is edited in [Product fields](/en/components/minishop3/interface/utilities/product-fields), without duplicating model-field entries.

## API appendix

### Sections

```http
GET /api/mgr/model-fields/sections/{model}
POST /api/mgr/model-fields/sections
PUT /api/mgr/model-fields/sections/{id}
PUT /api/mgr/model-fields/sections/ranks
DELETE /api/mgr/model-fields/sections/{id}
```

### Visible fields

```http
GET /api/mgr/model-fields/visible/msOrder
```

### Combo for combo xtype

```http
GET /api/mgr/model-fields/combo-options/{model}/{field_name}
```

All write endpoints require `mssetting_save`.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| 403 | MS3 policies, see [issue #613](https://github.com/modx-pro/MiniShop3/issues/613) |
| Field not on form | `visible = false` or not in visible response |
| Confusion with extra fields | Extra creates a column. Model fields are UI only. See [#214](https://github.com/modx-pro/MiniShop3/issues/214) |
| Changes not visible | Refresh the entity card |

See [Manager cookbooks](/en/components/minishop3/manager/).
