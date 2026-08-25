---
title: System settings
description: msbundles namespace, stock behavior, and access permissions
---

# System settings

Open **System → System Settings** and choose the `msbundles` namespace.

## Keys

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msbundles_stock_behavior` | textfield | `block` | How the storefront behaves when a required line is short on stock |
| `msbundles_max_bundle_quantity` | numberfield | `99` | Max bundles in the card qty field and in the add-to-cart request |

### When to use each `stock_behavior`

| Value | When to use it | What the shopper sees |
| --- | --- | --- |
| `block` | Show the offer, but block checkout without stock | Card stays, Add button disabled |
| `message` | Explain the reason in text | Card stays, `stock_message` under it |
| `hide` | Prefer hiding empty offers | Snippet skips the card |

Optional lines with zero stock do not make the whole set unavailable. On add that line is skipped. The API response may include `warnings`.

`msbundles_max_bundle_quantity` caps both the card field and the server limit. If the shopper asks for more, the add request fails.

## Permissions

| Permission | What it unlocks |
| --- | --- |
| `msbundles_view` | Menu item, list, view |
| `msbundles_save` | Create, edit, delete, duplicate, reorder |

Without `msbundles_view`, the **msBundles** menu item stays hidden.

After install, open the manager access policy, enable both permissions, then clear the MODX cache.
