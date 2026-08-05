---
title: Delivery methods
---
# Delivery methods

Delivery methods are managed via **Extras → MiniShop3 → Settings → Deliveries**.

## Delivery fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Delivery method name |
| `description` | text | Description for the customer |
| `price` | number | Base delivery cost |
| `weight_price` | float | Cost per unit of weight |
| `distance_price` | float | Cost per unit of distance |
| `free_delivery_amount` | float | Order total for free delivery |
| `logo` | string | Image path |
| `position` | int | Sort order |
| `active` | bool | Active |
| `class` | string | PHP handler class |
| `validation_rules` | JSON | Field validation rules |

## Payment linkage

Each delivery method can be linked to specific payment methods. This allows you to:

- Restrict cash payment to pickup only
- Allow online payment for courier delivery
- Configure specific combinations for different regions

When the customer selects delivery, the list of available payment methods is filtered automatically.

## Cost calculation

Delivery cost is calculated with:

```
Total cost = price + (weight_price × weight) + (distance_price × distance)
```

If the order total exceeds `free_delivery_amount`, delivery cost = 0.

### Custom calculation

For complex logic, create a custom handler class:

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
        // Your calculation logic
        $cartCost = $order->get('cart_cost');
        $weight = $order->get('weight');

        if ($cartCost > 10000) {
            return 0; // Free from 10000
        }

        if ($weight > 5000) {
            return 500 + ($weight - 5000) * 0.1; // Surcharge for heavy orders
        }

        return 300; // Base cost
    }
}
```

Set the class in `class`: `MyComponent\Delivery\CustomDelivery`

## Order field validation

MiniShop3 lets you configure required fields and validation rules for each delivery method. For example, courier delivery can require a full address, while pickup can require only a phone number.

### Visual builder

The validation setup interface offers two modes:

#### Visual mode

Intuitive rule builder:

1. Click **Add field**
2. Select a field from the list (grouped: Order, Address)
3. Add validation rules for the field
4. For rules with parameters, set the value

Rules appear as tags (chips) you can remove with the close icon.

#### JSON mode

A toggle switches to manual JSON editing:

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

### Custom validation fields

Besides standard order and address fields, you can add arbitrary fields with validation rules. For example, an agreement checkbox:

```json
{
  "phone": "required",
  "email": "required|email",
  "agreement": "required|accepted"
}
```

Custom fields (`agreement` and others outside the standard set) are stored in the order draft between `order/add` and `order/submit` steps. When the order is created they are passed to `msOnBeforeCreateOrder` / `msOnCreateOrder` via the `customFields` parameter.

::: tip Checkboxes
On the frontend, checkboxes send `input.checked` (`'1'` or `'0'`), not a static `value` attribute. This ensures the `accepted` rule works correctly.
:::

### Available validation fields

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

MiniShop3 uses the [rakit/validation](https://github.com/rakit/validation) library.

#### Basic rules

| Rule | Description | Example |
|------|-------------|---------|
| `required` | Required field | `required` |
| `nullable` | Field may be null | `nullable` |
| `present` | Field must be present (even empty) | `present` |
| `accepted` | Value must be "yes", "on", "1", true | `accepted` |

#### Data types

| Rule | Description | Example |
|------|-------------|---------|
| `email` | Valid email | `email` |
| `url` | Valid URL | `url` |
| `ip` | IP address (v4 or v6) | `ip` |
| `ipv4` | IPv4 address | `ipv4` |
| `ipv6` | IPv6 address | `ipv6` |
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
| `alpha_dash` | Letters, digits, dash, underscore | `alpha_dash` |
| `alpha_spaces` | Letters and spaces | `alpha_spaces` |
| `uppercase` | Uppercase only | `uppercase` |
| `lowercase` | Lowercase only | `lowercase` |

#### Rules with parameters

| Rule | Description | Syntax |
|------|-------------|--------|
| `min` | Min string length or numeric value | `min:3` |
| `max` | Max string length or numeric value | `max:100` |
| `between` | Value in range | `between:1,10` |
| `digits` | Exact digit count | `digits:6` |
| `digits_between` | Digit count in range | `digits_between:4,8` |
| `in` | Value from list | `in:pickup,courier,post` |
| `not_in` | Value NOT from list | `not_in:test,demo` |
| `same` | Matches another field | `same:email_confirm` |
| `different` | Differs from another field | `different:old_password` |
| `regex` | Matches regular expression | `regex:/^[0-9]{6}$/` |

#### Date rules

| Rule | Description | Syntax |
|------|-------------|--------|
| `date` | Valid date in format | `date:Y-m-d` |
| `after` | Date after specified | `after:2024-01-01` |
| `before` | Date before specified | `before:2025-12-31` |

#### Conditional rules

| Rule | Description | Syntax |
|------|-------------|--------|
| `required_if` | Required if another field equals value | `required_if:delivery,courier` |
| `required_unless` | Required if another field ≠ value | `required_unless:delivery,pickup` |
| `required_with` | Required if another field is set | `required_with:phone` |
| `required_without` | Required if another field is NOT set | `required_without:email` |
| `required_with_all` | Required if ALL fields are set | `required_with_all:city,street` |
| `required_without_all` | Required if NONE of the fields are set | `required_without_all:phone,email` |

### Configuration examples

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

#### Postal delivery

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

#### Parcel locker delivery

Contact data only:

```json
{
  "first_name": "required",
  "phone": "required|regex:/^\\+?[0-9]{10,15}$/",
  "email": "required|email"
}
```

### Combining rules

Combine rules with `|`:

```json
{
  "email": "required|email",
  "phone": "required|numeric|min:10|max:15",
  "index": "nullable|digits:6"
}
```

### Error messages

The validator generates error messages in the interface language. The user sees messages such as:

- "The Email field is required"
- "The Phone field must be at least 10 characters"
- "The Index field must be 6 digits"

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
