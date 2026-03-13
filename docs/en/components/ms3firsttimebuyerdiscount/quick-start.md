---
title: Quick start
---
# Quick start

Step-by-step setup of the first-order discount on a MiniShop3 site.

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.x |
| PHP | 8.1+ |
| MiniShop3 | installed |

## Step 1: Installation

1. Go to **Extras → Installer**
2. Find **ms3FirstTimeBuyerDiscount** in the package list
3. Click **Download** then **Install**

## Step 2: Enable the plugin

1. **Manage → Elements → Plugins** (in MODX 3: **Elements → Plugins**)
2. Find the **ms3FirstTimeBuyerDiscount** plugin
3. Enable it and attach it to the **msOnGetCartCost** event (should be selected by default)
4. Save

MiniShop3 will call this plugin when calculating cart cost.

## Step 3: Settings

1. **Manage → Settings** (in MODX 3: **Settings → System settings**)
2. Filter by area **ms3firsttimebuyerdiscount** or search for `ftb_`
3. Set:
   - **ftb_enabled** — on (yes)
   - **ftb_discount_type** — `percent` or `fixed`
   - **ftb_discount_value** — e.g. `10` (10%) or `500` (500 fixed)

See: [System settings](settings).

## Step 4: Verify

1. In MiniShop3 ensure **ms3_status_for_stat** contains the IDs of “paid” order statuses (usually `2,3` by default). This defines who is a first-time buyer.
2. Log in as a user with no paid orders in those statuses (or checkout as guest with a new email/phone)
3. Add a product to the cart — the cart block should show the total with the discount applied
4. A user with at least one order in `ms3_status_for_stat` does not get the discount

## Step 5: Checkout banner (optional)

To show a “First-order discount” block, add to the checkout page template:

::: code-group

```modx
[[!ms3ftbDiscountBanner]]
```

```fenom
{$modx->runSnippet('ms3ftbDiscountBanner', [])}
```

:::

The plugin loads the component CSS/JS on the page. For guests, the banner is refined after they enter email/phone via the eligibility endpoint.

Result: the discount is applied automatically during cart calculation; you don’t have to change templates — only the final total changes.

## Next steps

- [System settings](settings) — all component parameters
- [API and events](api) — service, events ftbOnBeforeApply and ftbOnApply
- [MiniShop3 integration](integration) — event msOnGetCartCost, input/output contract
- [Extension](extension) — replacing the service, plugins on events
