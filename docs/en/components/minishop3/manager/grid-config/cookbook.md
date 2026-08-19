---
title: Grid columns cookbook
description: Badge in the orders list and inline edit with select in category-products
---

# Grid columns cookbook

Configure admin table columns: visibility, type, badge, relation, inline edit.

Full reference: [Grid columns](/en/components/minishop3/interface/utilities/grid-columns).

<!-- ![Grid columns utility](/components/minishop3/screenshots/mgr-grid-columns.png) -->

## Goal

Change orders, customers, or category product lists without editing Vue components. Config is stored in `ms3_grid_fields`.

## grid_key in 1.13

| grid_key | Screen |
| --- | --- |
| `orders` | Orders list |
| `order_products` | Products inside an order |
| `customers` | Customers |
| `vendors` | Vendors |
| `category-products` | Product table on a category resource |

::: warning Inline edit
Cell editing is enabled **only** for `category-products`. There is no inline edit on `orders` in 1.13. For the orders list use badge, relation, or model columns.
:::

## Case: status badge in orders

The default MS3 setup uses column `order_status`:

- hidden relation columns `status_name` and `status_color` load text and HEX from `msOrderStatus`
- visible column `order_status` with type `badge`

Badge config (from `ms3_grid_fields`):

```json
{
  "type": "badge",
  "source_field": "status_name",
  "color_field": "status_color"
}
```

### Custom badge column

1. **Utilities → Grid columns** → grid **orders**.
2. Add hidden relation columns if you need `source_field` / `color_field` from a related table.
3. Add a **Badge** column:
   - **Value source field** — column with label text
   - **Color field** — column with HEX (e.g. `#3b82f6`)
4. Save column order.

Via API:

```http
POST /api/mgr/grid-config/orders/field
```

```json
{
  "field_name": "my_badge",
  "label": "Badge",
  "type": "badge",
  "config": {
    "type": "badge",
    "source_field": "status_name",
    "color_field": "status_color"
  },
  "visible": true
}
```

<!-- ![Status badge in the orders list](/components/minishop3/screenshots/mgr-orders.png) -->

## Case: relation with aggregation (customers)

“Order count” for a customer:

1. Grid **customers** → new column, type **relation**.
2. Parameters:
   - table: `msOrder`
   - foreignKey: `customer_id`
   - displayField: `id`
   - aggregation: `COUNT`

Aggregations: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`. Relation aggregation is **not** supported for `category-products`.

## Case: inline edit + select (category-products)

1. Grid **category-products** → pick a column (e.g. `vendor_name` or a product extra field).
2. Enable **Inline cell edit**.
3. **Editor type**: `select`.
4. **editor_options** — array of `[value, label]` pairs:

```json
[
  ["1", "Warehouse A"],
  ["2", "Warehouse B"]
]
```

For a combo editor backed by an API reference, use `editor_type: combo` and a key from `editor_references` in `GET /api/mgr/grid-config/category-products`.

<!-- ![Inline edit in the category products grid](/components/minishop3/screenshots/mgr-category-products.png) -->

## Case: product option column

1. Grid **category-products** → add column.
2. Type **option**, config `option.key` = option key (e.g. `color`).
3. Column name must not collide with built-in product fields (use a prefix like `option_color` if needed).

## Case: price, weight, datetime

Types **price**, **weight**, and **datetime** format model column values without PHP.

**Price in category-products:**

1. Column `price`, type **price**.
2. displayConfig:

```json
{
  "decimals": 2,
  "currency": "₽",
  "currency_position": "after",
  "thousands_separator": " "
}
```

**Weight:**

```json
{
  "decimals": 2,
  "unit": "kg",
  "unit_position": "after"
}
```

**Order created date** (grid `orders`, field `createdon`):

```json
{
  "format": "dd.MM.yyyy HH:mm"
}
```

## Case: computed column

Type **computed** calls a PHP column class on the server:

```
Type: computed
Class: MyVendor\Ms3\Columns\MarginColumn
```

The class must be in MODX autoload. For simple price or date formatting use **price** / **datetime** instead.

## API appendix

**Read** (`view_document`):

```http
GET /api/mgr/grid-config/orders?include_hidden=1
```

Response:

```json
{
  "columns": [ ... ],
  "direct_filter_keys": ["query", "status_id", "delivery_id"],
  "editor_references": []
}
```

`direct_filter_keys` are filters sent without the `filter_` prefix in list queries. For `orders` the source is `OrdersController::getDirectFilterKeys()`.

**Save order and metadata** (`mssetting_save`):

```http
PUT /api/mgr/grid-config/orders
```

```json
{
  "fields": [
    { "name": "id", "label": "ID", "visible": true, "sortable": true, "type": "model" },
    { "name": "order_status", "label": "Status", "visible": true, "type": "badge", "source_field": "status_name", "color_field": "status_color" }
  ]
}
```

The PUT body expects array **`fields`**, not `columns`.

| Method | Path |
| --- | --- |
| POST | `/api/mgr/grid-config/{grid_key}/field` |
| PUT | `/api/mgr/grid-config/{grid_key}/field/{field_name}` |
| DELETE | `/api/mgr/grid-config/{grid_key}/{field_name}` |

## Troubleshooting

| Symptom | Action |
| --- | --- |
| 403 on PUT | `mssetting_save` |
| Badge without color | Check `color_field` and HEX in row data |
| Combo editor error | `editor_references` whitelist only for category-products |
| Column missing in orders list | `visible: true`, reload the grid |

See [routing: grid-config](/en/components/minishop3/development/routing.md), [Manager cookbooks](/en/components/minishop3/manager/).
