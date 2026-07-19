---
title: Extra fields
---
# Utilities: Extra fields

Create new fields to extend standard MiniShop3 models.

## Purpose

Add custom fields to data models without editing source code. Fields are stored in the database and appear automatically in the interface.

## Supported models

| Model | Description |
|-------|-------------|
| `msProductData` | Product data |
| `msVendor` | Vendor |
| `msOrder` | Order |
| `msOrderAddress` | Delivery address |
| `msCategory` | Category |

## Creating a field

### Step 1: Select model

Choose a model from the dropdown at the top of the page.

### Step 2: Add field

Click **Add field** and fill the form.

### Field parameters

#### Basic

| Parameter | Description | Required |
|-----------|-------------|----------|
| Key | Unique field name (Latin, snake_case) | Yes |
| Label | Display name | Yes |
| Description | User hint | No |
| Active | Field in use | Yes |

::: warning Field key
The key must be unique within the model. Use Latin letters and underscores. Examples: `wholesale_price`, `external_id`, `custom_field`.
:::

#### Widget type (xtype)

| Type | Description | Use |
|------|-------------|-----|
| `textfield` | Text field | Strings, SKUs |
| `numberfield` | Number field | Prices, quantities |
| `textarea` | Multiline field | Descriptions |
| `xcheckbox` | Checkbox | Yes/No |
| `ms3-combo-vendor` | Vendor picker | Link to vendor |
| `ms3-combo-autocomplete` | Autocomplete | Pick from list |
| `ms3-combo-options` | Option picker | Product variants |

#### Database type (dbtype)

| Type | Description | Example values |
|------|-------------|----------------|
| `varchar` | Variable-length string | Text up to 255 chars |
| `text` | Long text | Descriptions, HTML |
| `int` | Integer | IDs, quantities |
| `decimal` | Decimal | Prices with cents |
| `tinyint` | Small integer (0–255) | Flags, ratings |
| `datetime` | Date and time | 2024-01-15 12:30:00 |
| `timestamp` | Timestamp | Unix timestamp |
| `json` | JSON data | Arrays, objects |

#### Precision

For `varchar` and `decimal`:

- `varchar` — max string length (default 255)
- `decimal` — format `10,2` means 10 digits total, 2 after decimal

#### PHP type (phptype)

| Type | Description |
|------|-------------|
| `string` | String |
| `integer` | Integer |
| `float` | Float |
| `boolean` | Boolean |
| `json` | JSON (auto encode/decode) |
| `datetime` | DateTime object |
| `timestamp` | Unix timestamp |

#### Default value

| Type | Description |
|------|-------------|
| `NULL` | Empty value |
| `CURRENT_TIMESTAMP` | Current time (for datetime) |
| `USER_DEFINED` | Set manually |
| `NONE` | No default |

#### Indexing

| Type | Description | When to use |
|------|-------------|-------------|
| `NONE` | No index | Rarely used fields |
| `INDEX` | Regular index | Search and sort fields |
| `UNIQUE` | Unique index | Unique values |
| `FULLTEXT` | Full-text index | Text search |

## Field examples

### Wholesale price

```
Key: wholesale_price
Label: Wholesale price
xtype: numberfield
dbtype: decimal
Precision: 12,2
phptype: float
Default: NULL
Index: NONE
```

### External ID (ERP)

```
Key: external_id
Label: ERP ID
xtype: textfield
dbtype: varchar
Precision: 50
phptype: string
Default: NULL
Index: UNIQUE
```

### Delivery lead time

```
Key: delivery_days
Label: Delivery time (days)
xtype: numberfield
dbtype: int
phptype: integer
Default: USER_DEFINED → 3
Index: NONE
```

### Extra attributes (JSON)

```
Key: extra_attributes
Label: Extra attributes
xtype: textarea
dbtype: json
phptype: json
Default: NULL
Index: NONE
```

## Editing a field

Click a row in the table to open the edit dialog.

::: warning Limitations
Some parameters cannot change after creation:

- Field key
- Database type (dbtype)

To change these, delete the field and create it again.
:::

## Deleting a field

1. Click delete on the row
2. Confirm in the dialog

::: danger Warning
Deleting a field **permanently** removes:

- Field definition from the schema
- Column from the database table
- All data for that field on all records
:::

## Use in code

### Getting a value

```php
// Get product
$product = $modx->getObject(\MiniShop3\Model\msProduct::class, $id);

// Get product data
$data = $product->getOne('Data');

// Get extra field value
$wholesalePrice = $data->get('wholesale_price');
```

### Saving a value

```php
$data = $product->getOne('Data');
$data->set('wholesale_price', 999.99);
$data->save();
```

### In snippets (Fenom)

```fenom
{$wholesale_price}
{if $wholesale_price > 0}
    <span class="wholesale">Wholesale: {$wholesale_price | number_format : 0}</span>
{/if}
```

## API endpoints

### Model field list

```
GET /api/mgr/extra-fields?class=MiniShop3\Model\msProductData
```

### Create field

```
POST /api/mgr/extra-fields
```

**Request body:**

```json
{
  "class": "MiniShop3\\Model\\msProductData",
  "key": "wholesale_price",
  "label": "Wholesale price",
  "xtype": "numberfield",
  "dbtype": "decimal",
  "precision": "12,2",
  "phptype": "float",
  "null": true,
  "default": "NULL",
  "index_type": "NONE",
  "active": true
}
```

### Update field

```
PUT /api/mgr/extra-fields/{id}
```

### Delete field

```
DELETE /api/mgr/extra-fields/{id}
```

## Migrations

When a field is created the system automatically:

1. Creates a record in the field configuration table
2. Adds a column to the model table (ALTER TABLE)
3. Creates an index (if specified)

When a field is deleted:

1. Removes the configuration record
2. Drops the column from the database table
