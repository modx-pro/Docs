---
title: Manager comment on an order
description: End-to-end extra field on an order and saving from the Vue manager form
---

# Manager comment on an order

Add a text extra field to an order and use it on **Extras → MiniShop3 → Orders**.

## Goal

A manager enters an internal order comment. The value is stored in the `ms3_orders` table and saved via `PUT /api/mgr/orders/{id}`.

## Prerequisites

- MiniShop3 1.13.x
- Permission `mssetting_save` (create extra field)
- Permission `msorder_view` / order edit access

## Step 1. Create the extra field

1. Open **Extras → MiniShop3 → Utilities → Extra fields**.
2. In **Model class**, select **msOrder (Orders)**.
3. Click **Create field** and set:

| Parameter | Value |
| --- | --- |
| Key | `manager_comment` |
| Label | Manager comment |
| xtype | `textfield` |
| dbtype | `varchar` |
| precision | `500` |
| phptype | `string` |
| Active | yes |

Save the form. The package runs a migration and adds a column to the orders table.

<!-- ![Extra fields utility](/components/minishop3/screenshots/mgr-extra-fields.png) -->

::: tip Class in the database
The UI stores class as `MiniShop3\Model\msOrder`. Use the same value in the `class` field when creating via API.
:::

## Step 2. Verify via API

```http
GET /api/mgr/extra-fields?class=MiniShop3\Model\msOrder
```

The list should include `manager_comment` with `"active": true` and `"column_exists": true`.

## Step 3. Open the order in the manager

1. **Extras → MiniShop3 → Orders** → pick an order.
2. On the order data tab, find **Additional order fields**.
3. Enter text in **Manager comment**.
4. Save the card.

<!-- ![Additional order fields section on the order card](/components/minishop3/screenshots/mgr-order-extra-field.png) -->

The Vue form sends the value at the top level of the request body:

```json
{
  "manager_comment": "Call before delivery"
}
```

## Step 4. Confirm persistence

Reload the card or fetch the order:

```http
GET /api/mgr/orders/{id}
```

The response should contain `"manager_comment": "Call before delivery"`.

## Extra fields vs model fields

An extra field **creates a DB column**. [Model fields](/en/components/minishop3/manager/model-fields/cookbook) only change how existing columns render (sections, xtype, `visible`). For new order text, use extra fields.

## API appendix

| Method | Path | Permissions |
| --- | --- | --- |
| GET | `/api/mgr/extra-fields?class=MiniShop3\Model\msOrder` | `mssetting_save` |
| POST | `/api/mgr/extra-fields` | `mssetting_save` |
| PUT | `/api/mgr/orders/{id}` | `msorder_view` + edit |
| GET | `/api/mgr/orders/{id}` | `msorder_view` |

**POST /api/mgr/extra-fields** (fragment):

```json
{
  "class": "MiniShop3\\Model\\msOrder",
  "key": "manager_comment",
  "label": "Manager comment",
  "xtype": "textfield",
  "dbtype": "varchar",
  "precision": "500",
  "phptype": "string",
  "null": true,
  "active": true
}
```

## Troubleshooting

| Symptom | Check |
| --- | --- |
| 403 on extra-fields | User policy includes `mssetting_save` |
| Empty section on the order | `active = 1` in `ms3_extra_fields`, key spelling |
| Field in utility but not on order | Column `class` in `ms3_extra_fields`. Form calls `GET ...?class=msOrder`, DB often has `MiniShop3\Model\msOrder`. Check DevTools |
| Error after create | MODX log: Phinx migration, write access to `core/components/minishop3/migrations` |
| Two field systems confuse you | See [issue #214](https://github.com/modx-pro/MiniShop3/issues/214) and [model fields cookbook](/en/components/minishop3/manager/model-fields/cookbook) |

See also: [Extra fields cookbook](/en/components/minishop3/manager/extra-fields/cookbook), [Orders](/en/components/minishop3/interface/orders).
