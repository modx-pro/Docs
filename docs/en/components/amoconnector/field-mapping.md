# Field mapping

The component uses a flexible field mapping system to send order and form data to amoCRM.

## Manager

Mapping is configured in CMP: **Apps** → **amoConnector** → **Field mapping** tab.

Each mapping row has:

| Field | Description |
|-------|-------------|
| **Context** | `order` (ms2 orders) or `form` (forms) |
| **Source field** | Field name in MODX (e.g. `receiver`, `email`, `cost`) |
| **Target entity** | `lead` or `contact` |
| **Target field** | Standard amoCRM field (`name`, `email`, `phone`, `price`) or custom field ID |
| **Active** | Enable/disable this mapping |

## Default mappings

On install, default mappings are created:

### Orders → Contact

| Source field | amoCRM field |
|--------------|--------------|
| `receiver` | `name` |
| `email` | `email` |
| `phone` | `phone` |

### Orders → Lead

| Source field | amoCRM field |
|--------------|--------------|
| `cost` | `price` (budget) |

### Forms → Contact

| Source field | amoCRM field |
|--------------|--------------|
| `name` | `name` |
| `email` | `email` |
| `phone` | `phone` |

## Available order fields

Inactive mappings for all available order fields are also created:

- **msOrder**: `num`, `cart_cost`, `delivery_cost`, `weight`
- **Related**: `status_name`, `delivery_name`, `payment_name`
- **msOrderAddress**: `country`, `index`, `region`, `city`, `metro`, `street`, `building`, `entrance`, `floor`, `room`, `comment`, `text_address`
- **Synthetic**: `_products_text`, `_products_count`

To use them, open CMP, enable the needed fields and set target amoCRM fields.

## Custom amoCRM fields

To map to custom amoCRM fields, put the numeric field ID in **Target field**. Custom field IDs can be found in CMP (when loading from API) or in amoCRM.
