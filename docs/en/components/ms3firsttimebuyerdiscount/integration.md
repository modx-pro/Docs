---
title: MiniShop3 integration
---
# MiniShop3 integration

## Event msOnGetCartCost

The component hooks into cart cost calculation via this MiniShop3 event.

| Property | Value |
|----------|-------|
| Event | `msOnGetCartCost` |
| Purpose | Apply discount to cart total |

### Input contract (`scriptProperties`)

| Key | Type | Description |
|-----|------|-------------|
| `cost` | float | Current calculated cart cost |
| `cart` | mixed | Cart (object/structure depends on MS3 version) |
| `draft` | object\|null | Order draft |

The plugin passes the array to `FtbDiscountService::apply($scriptProperties)`.

### Output contract (`returnedValues`)

```php
$modx->event->returnedValues['cost'] = $newCost;
```

MiniShop3 uses `returnedValues['cost']` when set.

When the discount is applied, the plugin also sets:
- `returnedValues['ftb_discount']['amount']`
- `returnedValues['ftb_discount']['message']`

### Execution order

If multiple plugins subscribe to `msOnGetCartCost`, the final cost depends on MODX plugin priority.

## Checkout banner

The component can show a “First-order discount” banner.

### Snippet

Add to the order form template/chunk:

::: code-group

```modx
[[!ms3ftbDiscountBanner]]
```

```fenom
{$modx->runSnippet('ms3ftbDiscountBanner', [])}
```

:::

The snippet:
- for logged-in users checks eligibility via the service
- for guests shows the banner by default; after email/phone is entered it may hide based on eligibility
- uses `ftb_discount_type`, `ftb_discount_value`, `ms3_currency`

### Assets and frontend logic

The `ftb_discount` plugin on `OnWebPageInit`/`OnWebPagePrerender` loads:
- CSS (`assets/components/ms3firsttimebuyerdiscount/css/*.css`)
- JS (`assets/components/ms3firsttimebuyerdiscount/js/ftb-order.js`)
- `window.MS3FTB_ELIGIBLE_URL`

`ftb-order.js`:
- listens to `email` and `phone` on the order form
- saves them via `ms3.orderAPI.add(...)`
- updates cost (`updateOrderCosts` / `getCost`)
- requests eligibility from `assets/components/ms3firsttimebuyerdiscount/eligible.php`
- shows/hides the banner based on the response

### Eligibility endpoint

`assets/components/ms3firsttimebuyerdiscount/eligible.php` returns:

```json
{"eligible": true}
```

or

```json
{"eligible": false}
```

based on `getPaidOrdersCountByContact(email, phone, 0)`.

## Dependence on MiniShop3 settings

### `ms3_status_for_stat`

Used to define “paid” orders when checking first-time buyer.

### `ms3_status_new`

Automatically added by the service to the list of statuses as first-order marker.

If `ms3_status_for_stat` is empty, the service treats paid orders as `0` and logs a warning to the `ftb` log (once per request).

## MiniShop3 models

The component uses:
- `MiniShop3\Model\msOrder`
- `MiniShop3\Model\msOrderAddress`

For guests it uses join `msOrder.id = msOrderAddress.order_id`.
