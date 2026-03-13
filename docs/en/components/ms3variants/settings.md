---
title: System settings
---
# System settings

All settings are under **System → System settings** in the `ms3variants` namespace.

## Main settings

### ms3variants_enabled

Enable or disable the component.

| Parameter | Value |
|-----------|-------|
| Key | `ms3variants_enabled` |
| Type | Yes/No |
| Default | `true` |

When disabled, variants are not processed in the cart or on the frontend.

---

### ms3variants_default_active

Default activity for new variants.

| Parameter | Value |
|-----------|-------|
| Key | `ms3variants_default_active` |
| Type | Yes/No |
| Default | `true` |

Controls whether a new variant is active right after creation.

---

### ms3variants_sku_pattern

SKU generation pattern for variants.

| Parameter | Value |
|-----------|-------|
| Key | `ms3variants_sku_pattern` |
| Type | Text |
| Default | `{product_article}-{option_values}` |

**Available placeholders:**

| Placeholder | Description |
|-------------|-------------|
| `{product_id}` | Product ID |
| `{product_article}` | Product article/SKU |
| `{option_values}` | Option values joined by hyphen |
| `{variant_id}` | Variant ID |

**Examples:**

```
{product_article}-{option_values}     → ABC-123-red-XL
{product_id}-{option_values}          → 42-red-XL
SKU-{product_article}-{variant_id}   → SKU-ABC-123-1
```

## Stock settings

### ms3variants_check_stock

Enable stock control.

| Parameter | Value |
|-----------|-------|
| Key | `ms3variants_check_stock` |
| Type | Yes/No |
| Default | `true` |

When enabled:
- Cannot add to cart more than in stock
- Cannot change cart quantity above stock
- Out-of-stock variants may be hidden (see `ms3variants_show_out_of_stock`)

---

### ms3variants_show_out_of_stock

Show variants with no stock.

| Parameter | Value |
|-----------|-------|
| Key | `ms3variants_show_out_of_stock` |
| Type | Yes/No |
| Default | `true` |

**When enabled (true):**
- All variants are shown
- Out-of-stock variants are shown as "Out of stock"
- Add to cart button is disabled

**When disabled (false):**
- Out-of-stock variants are hidden
- Only purchasable variants are shown

---

### ms3variants_deduct_stock_status

Order status at which stock is deducted.

| Parameter | Value |
|-----------|-------|
| Key | `ms3variants_deduct_stock_status` |
| Type | Number |
| Default | `2` |

Order status ID at which variant stock is decreased.

**Default MiniShop3 statuses:**

| ID | Status |
|----|--------|
| 1 | New |
| 2 | Paid |
| 3 | Shipped |
| 4 | Delivered |
| 5 | Cancelled |

**Value `0`** — deduction disabled.

::: tip Recommendation
Use "Paid" (2) for prepaid stores or "Shipped" (3) for cash-on-delivery stores.
:::
