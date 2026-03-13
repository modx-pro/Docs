---
title: System settings
---
# System settings

All settings use the prefix `ms3firsttimebuyerdiscount_` and are in the **ms3firsttimebuyerdiscount** namespace.

**Where to change:** **Manage → System settings** (in MODX 3: **Settings → System settings**) — filter by namespace `ms3firsttimebuyerdiscount`.

## Settings table

| Setting | Description | Default |
|---------|-------------|---------|
| `ms3firsttimebuyerdiscount_ftb_enabled` | Enable or disable first-order discount | `1` (on) |
| `ms3firsttimebuyerdiscount_ftb_discount_type` | Discount type: `percent` — percent of order total, `fixed` — fixed amount in shop currency. Case-insensitive | `percent` |
| `ms3firsttimebuyerdiscount_ftb_discount_value` | Discount value: percent (0–100) or fixed amount in shop currency (for fixed, negative values are treated as 0) | `10` |
| `ms3firsttimebuyerdiscount_ftb_allow_combination` | Allow combining with other cart discounts. If off and cart has `total_discount > 0`, FTB is not applied | `1` (on) |

## Setting area

- **ms3firsttimebuyerdiscount_main** — all of the above (enable, type, value, combination).

## Recommendations

- **ftb_discount_type:** allowed values are `percent` and `fixed` (case-insensitive).
- **ftb_discount_value:** for `percent` keep in 0–100; for `fixed` use amount in shop currency (e.g. 500).
- **ftb_allow_combination:** turn off to block FTB when other cart discounts are present.
- Ensure MiniShop3 **ms3_status_for_stat** and **ms3_status_new** are set — they define who has 0 “paid” orders and who gets the discount.
