---
title: Delivery methods
---
# Delivery methods

Delivery method management is available via **Extras → MiniShop3 → Settings → Deliveries**.

## Delivery fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Delivery method name |
| `description` | text | Description for customer |
| `price` | number | Base delivery cost |
| `weight_price` | float | Cost per weight unit |
| `distance_price` | float | Cost per distance unit |
| `free_delivery_amount` | float | Order amount for free delivery |
| `logo` | string | Image path |
| `position` | int | Sort order |
| `active` | bool | Active |
| `class` | string | PHP handler class |
| `validation_rules` | JSON | Field validation rules |

## Payment association

Each delivery method can be linked to specific payment methods. This allows:

- Restricting cash payment to pickup only
- Allowing online payment for courier delivery
- Configuring specific combinations for different regions

When the customer selects a delivery method, the list of available payment methods is filtered automatically.

## Cost calculation

Delivery cost is calculated as:

```
Total cost = price + (weight_price × weight) + (distance_price × distance)
```

If the order total exceeds `free_delivery_amount`, delivery cost = 0.

### Custom calculation

For complex logic, create your own handler class:

```php
<?php
namespace MyComponent\Delivery;

use MiniShop3\Controllers\Delivery\DeliveryProviderInterface;
use MiniShop3\Model\msDelivery;
use MiniShop3\Model\msOrder;

class CustomDelivery implements DeliveryProviderInterface
{
    public function getCost(msDelivery $delivery, msOrder $order, float $cost): float
    {
        $cartCost = $order->get('cart_cost');
        $weight = $order->get('weight');

        if ($cartCost > 10000) {
            return 0; // Free over 10000
        }

        if ($weight > 5000) {
            return 500 + ($weight - 5000) * 0.1; // Surcharge for heavy orders
        }

        return 300; // Base cost
    }
}
```

Specify the class in the `class` field: `MyComponent\Delivery\CustomDelivery`

## Order field validation

MiniShop3 lets you configure required fields and validation rules per delivery method. For example, courier delivery can require a full address, while pickup may require only a phone number.

### Visual builder

The validation settings interface has two modes:

#### Visual mode

Intuitive rule builder:

1. Click **Add field**
2. Select a field from the list (grouped: Order, Address)
3. Add validation rules for the field
4. For rules with parameters, enter the value

Rules are shown as chips that can be removed by clicking the cross.

#### JSON mode

A switch lets you edit JSON manually:

```json
{
  "phone": "required",
  "email": "required|email",
  "city": "required|min:2",
  "street": "required|min:3",
  "building": "required"
}
```

Useful for:

- Copying rules between deliveries
- Complex rules with regular expressions
- Import/export of configuration

### Fields available for validation

#### Order fields

| Field | Description |
|-------|-------------|
| `order_comment` | Order comment |

#### Address fields

| Field | Description |
|-------|-------------|
| `first_name` | First name |
| `last_name` | Last name |
| `phone` | Phone |
| `email` | Email |
| `country` | Country |
| `index` | Postal code |
| `region` | Region/state |
| `city` | City |
| `metro` | Metro station |
| `street` | Street |
| `building` | Building |
| `entrance` | Entrance |
| `floor` | Floor |
| `room` | Apartment/office |
| `comment` | Address comment |
| `text_address` | Full address as text |

### Validation rules

MiniShop3 uses [rakit/validation](https://github.com/rakit/validation) for validation.

#### Basic rules

| Rule | Description | Example |
|------|-------------|---------|
| `required` | Required field | `required` |
| `nullable` | Field may be null | `nullable` |
| `present` | Field must be present (even if empty) | `present` |
| `accepted` | Value must be "yes", "on", "1", true | `accepted` |

#### Data types

| Rule | Description | Example |
|------|-------------|---------|
| `email` | Valid email | `email` |
| `url` | Valid URL | `url` |
| `ip` | IP address (v4 or v6) | `ip` |
| `numeric` | Numeric value | `numeric` |
| `integer` | Integer | `integer` |
| `boolean` | Boolean | `boolean` |
| `array` | Array | `array` |
| `json` | Valid JSON | `json` |

#### String rules

| Rule | Description | Example |
|------|-------------|---------|
| `alpha` | Letters only | `alpha` |
| `alpha_num` | Letters and digits | `alpha_num` |
| `min` | Minimum length or value | `min:3` |
| `max` | Maximum length or value | `max:100` |
| `regex` | Matches regular expression | `regex:/^[0-9]{6}$/` |

#### Parameterized rules

| Rule | Description | Syntax |
|------|-------------|--------|
| `min` | Min string length or number value | `min:3` |
| `max` | Max string length or number value | `max:100` |
| `between` | Value in range | `between:1,10` |
| `digits` | Exact digit count | `digits:6` |
| `in` | Value from list | `in:pickup,courier,post` |
| `required_if` | Required if another field = value | `required_if:delivery,courier` |

### Example configurations

#### Courier delivery

Full address required:

```json
{
  "first_name": "required|min:2",
  "last_name": "required|min:2",
  "phone": "required|regex:/^\\+?[0-9]{10,15}$/",
  "email": "required|email",
  "city": "required|min:2",
  "street": "required|min:3",
  "building": "required",
  "room": "required_if:building_type,apartment"
}
```

#### Pickup

Minimum contact data:

```json
{
  "first_name": "required|min:2",
  "phone": "required"
}
```

#### Parcel delivery

Postal code and full address required:

```json
{
  "first_name": "required",
  "last_name": "required",
  "phone": "required",
  "index": "required|digits:6",
  "region": "required",
  "city": "required",
  "street": "required",
  "building": "required"
}
```

### Combining rules

Rules are combined with `|`:

```json
{
  "email": "required|email",
  "phone": "required|numeric|min:10|max:15",
  "index": "nullable|digits:6"
}
```

### Error messages

The validator generates error messages in the interface language. The user sees clear messages such as:

- "Email field is required"
- "Phone field must be at least 10 characters"
- "Index field must be 6 digits"

## API

### Get validation rules

```
GET /api/v1/order/delivery/validation-rules?delivery_id=1
```

**Response:**

```json
{
  "success": true,
  "data": {
    "phone": "required",
    "city": "required|min:2",
    "street": "required"
  }
}
```

### Get required fields

```
GET /api/v1/order/delivery/required-fields?delivery_id=1
```

**Response:**

```json
{
  "success": true,
  "data": ["phone", "city", "street"]
}
```

Use these endpoints to update the order form dynamically when the delivery method changes.
