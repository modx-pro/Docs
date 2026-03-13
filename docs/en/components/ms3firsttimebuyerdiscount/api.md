---
title: API and events
---
# API and events

## FtbDiscountService

**Class:** `Ms3FirstTimeBuyerDiscount\Services\FtbDiscountService`  
**Container key:** `ms3ftb_discount`

### Constructor

```php
public function __construct(modX $modx)
```

### Public methods

#### isEligible

Checks if the customer is eligible for the discount: setting is on and they have 0 paid orders.

- For logged-in users: check by `user_id`
- For guests: check by `email`/`phone` from `draft -> Address`
- If `draft` is provided, the current order is excluded from the count

```php
public function isEligible(int $userId, ?object $draft = null): bool
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | int | User ID |
| `draft`  | object\|null | Order draft (optional) |

**Returns:** `true` if discount can be applied, otherwise `false`.

---

#### getPaidOrdersCount

Number of paid orders for the user in statuses from `ms3_status_for_stat`.

```php
public function getPaidOrdersCount(int $userId, int $excludeOrderId = 0): int
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | int | User ID |
| `excludeOrderId` | int | Order ID to exclude from count (`0` = don't exclude) |

**Returns:** number of orders (0 or more).

---

#### getGuestContactFromDraft

Gets guest contact from `draft -> Address` and normalizes values.

```php
public function getGuestContactFromDraft(?object $draft): array
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `draft` | object\|null | Order draft |

**Returns:** array like `['email' => string, 'phone' => string]`.

---

#### getPaidOrdersCountByContact

Number of paid orders for a guest by email/phone.

```php
public function getPaidOrdersCountByContact(string $email, string $phone, int $excludeOrderId = 0): int
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `email` | string | Guest email |
| `phone` | string | Guest phone |
| `excludeOrderId` | int | Order ID to exclude from count (`0` = don't exclude) |

Comparison:
- `email` — lowercased
- `phone` — normalized digits (tail-10 match via `LIKE`)

**Returns:** number of orders (0 or more).

---

#### calculateDiscount

Calculates cost after discount (percent or fixed).

```php
public function calculateDiscount(float $cost, string $type, float $value): float
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `cost`   | float | Original amount |
| `type`   | string | `percent` or `fixed` |
| `value`  | float | Percent (0–100) or fixed amount |

**Returns:** new amount (`fixed`: `max(0, cost - max(0, value))`; `percent`: with 0–100 cap).

---

#### apply

Full flow: eligibility check → `ftbOnBeforeApply` → calculation → `ftbOnApply`.

```php
public function apply(array $scriptProperties): ?float
```

| Key | Type | Description |
|-----|------|-------------|
| `cost` | float | Current cart cost |
| `cart` | mixed | MiniShop3 cart object/data |
| `draft` | object\|null | Order draft |

Also respects `ftb_allow_combination`:
- if `false` and cart already has a discount (`total_discount > 0`), FTB is not applied

**Returns:** new cost (`float`) or `null`.

---

## MODX events

### ftbOnBeforeApply

Fired before the discount is calculated. Lets you cancel application or override the base amount.

| Key | Type | Description |
|-----|------|-------------|
| `user_id` | int | User ID |
| `cost` | float | Current cost |
| `draft` | object\|null | Order draft |
| `cart` | mixed | Cart |
| `settings` | array | `ftb_enabled`, `ftb_discount_type`, `ftb_discount_value`, `ftb_allow_combination` |

`returnedValues`:

| Key | Type | Description |
|-----|------|-------------|
| `apply` | bool | `false` — do not apply the discount |
| `cost` | float | Override amount used for discount calculation |

---

### ftbOnApply

Fired after the discount is successfully applied.

| Key | Type | Description |
|-----|------|-------------|
| `user_id` | int | User ID |
| `cost_before` | float | Cost before discount |
| `cost_after` | float | Cost after discount |
| `discount_amount` | float | Discount amount |
| `draft` | object\|null | Order draft |

---

## System settings

Prefix: `ms3firsttimebuyerdiscount_`.

| Key | xtype | Default | Description |
|-----|-------|---------|-------------|
| `ftb_enabled` | combo-boolean | true | Enable first-time buyer discount |
| `ftb_discount_type` | textfield | percent | Type: `percent` or `fixed` (case-insensitive) |
| `ftb_discount_value` | number | 10 | Discount value: percent (0–100) or amount |
| `ftb_allow_combination` | combo-boolean | true | Allow combining with other cart discounts |

Related MiniShop3 settings:
- `ms3_status_for_stat` — paid order statuses
- `ms3_status_new` — added to the list of statuses as first-order marker
