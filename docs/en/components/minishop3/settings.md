---
title: System settings
---
# System settings

MiniShop3 settings live under **System → System Settings**, namespace **minishop3**. Every name starts with the `ms3_` prefix.

## General settings

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_services_config` | *(not in transport)* | Path to `ms3.services.php`. Without this key `ServiceRegistry` looks for `{core_path}config/ms3.services.php`. The file returns `[service_id => ClassName]` and overrides default classes |
| `ms3_services_addons_dir` | *(not in transport)* | Folder with service registration fragments, `{core_path}config/ms3.services.d/` by default. `*.php` files load in alphabetical order after the main config |
| `ms3_assets_url` | *(not in transport)* | Overrides the component assets URL. Default `{assets_url}components/minishop3/` |
| `ms3_action_url` | *(not in transport)* | Overrides the Web API base URL. Default `{ms3_assets_url}api.php` |
| `ms3_core_path` | *(not in transport)* | Overrides the component core path. Default `{core_path}components/minishop3/` |
| `ms3_version` | *(empty)* | Version of the installed package. Filled in automatically on install and upgrade, no need to edit it. Returned by `/health` and compared against the version of the files on disk |
| `ms3_chunks_categories` | | Comma-separated category IDs for the chunk list. On install the `MiniShop3` category is placed here |
| `ms3_use_scheduler` | `false` | Use [Scheduler](/en/components/scheduler/) for background tasks |

::: warning Version and files out of sync
When `ms3_version` is newer than the version of the files on disk, the Manager shows a warning: the files were not copied completely. This happens when an upgrade breaks halfway through. Reinstall the package to fix it.
:::

## Product category

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_template_category_default` | | Default template for new categories |
| `ms3_category_show_nested_products` | `true` | Show nested products from subcategories |
| `ms3_category_show_options` | `false` | Show product options in the category table |
| `ms3_category_id_as_alias` | `false` | Use category ID as URL alias |
| `ms3_category_content_default` | *(not in transport)* | Default content for new categories (snippet call). Read by the category panel JS on create. Add the key manually if you need auto-filled `content` |
| `ms3_category_products_default_rows` | `20` *(code fallback)* | Rows per page in the category product table. Not in transport: until you create the key, `20` applies |
| `mgr_tree_icon_mscategory` | `icon icon-barcode` | CSS class for the category icon in the resource tree |

## Product

### Main fields

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_template_product_default` | | Default template for new products |
| `ms3_product_main_fields` | `pagetitle,longtitle,description,introtext,content` | Main fields on the product panel |
| `ms3_product_extra_fields` | `price,old_price,article,weight,color,size,vendor_id,made_in,tags,new,popular,favorite` | Extra product fields |
| `ms3_product_show_in_tree_default` | `false` | Show new products in the resource tree |
| `ms3_product_id_as_alias` | `false` | Use product ID as URL alias |
| `ms3_product_remember_tabs` | `true` | Remember the active product panel tab |
| `mgr_tree_icon_msproduct` | `icon icon-tag` | CSS class for the product icon in the resource tree |

### Product tabs

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_product_tab_extra` | `true` | Show the product properties tab |
| `ms3_product_tab_gallery` | `true` | Show the gallery tab |
| `ms3_product_tab_links` | `true` | Show the product links tab |
| `ms3_product_tab_options` | `true` | Show the options tab |
| `ms3_product_tab_categories` | `true` | Show the categories tab |

### Gallery

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_product_source_default` | `0` | Default media source ID for the gallery |
| `ms3_product_thumbnail_default` | `{assets_url}components/minishop3/img/mgr/ms3_small.png` | Placeholder image path |
| `ms3_product_thumbnail_size` | `small` | Default thumbnail size |

### Price and weight formatting

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_price_format` | `[2, ".", " "]` | Price format: [decimal places, decimal separator, thousands separator] |
| `ms3_weight_format` | `[3, ".", " "]` | Weight format: [decimal places, decimal separator, thousands separator] |
| `ms3_price_format_no_zeros` | `true` | Strip trailing zeros in prices (15.00 → 15) |
| `ms3_weight_format_no_zeros` | `true` | Strip trailing zeros in weight |
| `ms3_price_snippet` | | Deprecated. Any non-empty value turns on price recalculation when products are fetched. The value itself is never used |
| `ms3_weight_snippet` | | Deprecated. Same for weight |
| `ms3_currency_symbol` | `₽` | Currency symbol (₽, $, €, £, ₴, ¥, ₸) |
| `ms3_currency_position` | `after` | Symbol position: `before` ($ 100) or `after` (100 ₽) |
| `ms3_weight_unit` | `kg` | Weight unit (e.g. `kg`, `г`, `lbs`, `oz`). Used in `*_formatted` placeholders |

## Cart

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_cart_context` | `false` | Use a single cart across all contexts |
| `ms3_cart_max_count` | `1000` | Maximum number of items in the cart |
| `ms3_cart_page_id` | `0` | Cart page ID. Used for “Go to cart” in the mini cart and JS redirects |
| `ms3_order_page_id` | `0` | Checkout page ID. Used for the “Checkout” link from the cart |

## Orders

### General settings

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_order_format_num` | `ym` | Order number format (`date()` format) |
| `ms3_order_format_num_separator` | `/` | Separator in the order number |
| `ms3_date_format` | `d.m.y H:M` | Date format in the Manager |
| `ms3_order_user_groups` | | Groups for customer registration (comma-separated) |
| `ms3_order_show_drafts` | `false` | Show drafts in the Manager order list |
| `ms3_order_redirect_thanks_id` | `1` | ID of the “Thank you for your order” page |
| `ms3_order_success_page_id` | `0` | ID of the successful payment page |
| `ms3_order_register_user_on_submit` | `false` | Create modUser on checkout |
| `ms3_email_manager` | | Manager email addresses for notifications (comma-separated) |
| `ms3_delete_drafts_after` | | Delete old drafts (`strtotime` format: `-1 year`, `-2 weeks`) |
| `ms3_order_log_actions` | `status,products,field,address` | Logged order actions |
| `ms3_payment_on_failed_status` | `0` | Order status ID for a failed or cancelled payment. `0` — leave the status unchanged |
| `ms3_payment_on_refunded_status` | `5` | Order status ID for a full refund. `0` — leave the status unchanged. A partial refund never changes the status |

::: warning Failed payment and the stock reservation
`ms3_payment_on_failed_status` set to `0` keeps the order in its current status so the customer can retry the payment. With inventory enabled, however, the stock reservation stays with that order until it is cancelled. Set a cancellation status ID here if you want the stock released automatically.

Before 1.14 the default was `5`. On upgrade it becomes `0` only for those who never touched the setting: a manually edited value is left alone by the migration.
:::

### Manager fields

::: info Order, address, and product table fields
These used to be configured via `ms3_order_grid_fields`, `ms3_order_address_fields`, `ms3_order_product_fields`, and `ms3_order_product_options`. They are now managed in **Utilities → Model fields** (tables `ms3_model_fields` and `ms3_model_field_sections`, models `msOrder` / `msOrderAddress`) and **Utilities → Grid settings** (`ms3_grid_fields`). The old system settings are no longer read.
:::

## Order statuses

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_status_draft` | `1` | ID of the “Draft” status |
| `ms3_status_new` | `2` | ID of the new order status after checkout |
| `ms3_status_paid` | `3` | ID of the paid order status |
| `ms3_status_sent` | `4` | ID of the “Sent” status. A shipment moves the order here when it becomes “shipped” |
| `ms3_status_canceled` | `5` | ID of the canceled order status |
| `ms3_status_for_stat` | `2,3` | Status IDs for completed order statistics |
| `ms3_order_status_transitions` | *(empty)* | Allowed transitions between statuses. Empty — transitions are limited only by the “final” and “fixed” flags on the statuses themselves |

::: tip Statuses after install
The `seed_order_statuses` migration creates five rows in `ms3_order_statuses` (ids 1–5: draft, new, paid, sent, canceled) and updates `ms3_status_new`, `ms3_status_paid`, and `ms3_status_canceled` to match. If you changed or deleted statuses manually, verify ids under **Settings → Statuses** against these keys.

The migration does not update `ms3_status_sent` — it stays at `4`. If the “Sent” status got a different id, set it here yourself.
:::

### Allowed transitions

By default an order can move to any status except in two cases: it cannot leave a status flagged “final”, and it cannot move back down the order from a status flagged “fixed”.

`ms3_order_status_transitions` defines the exact route on top of those rules. The format is `from:to` pairs separated by commas:

```
2:3,3:4,2:5
```

From status 2 the order may go to 3 or 5, from 3 only to 4. Anything not on the list is forbidden. The same list is accepted as JSON: `[[2,3],[3,4],[2,5]]`.

::: warning A malformed value forbids every transition
Parsing does not tolerate typos. If the value cannot be parsed, no order changes status at all, and the response reports a disallowed transition — not a broken setting. Check the format right after editing it.
:::

## Inventory

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_inventory_enabled` | `false` | Take stock into account when placing an order |

While the setting is off, the cart and checkout ignore stock entirely. Once enabled, stock is reserved when the order moves to “New”, committed on “Paid” and released on “Canceled” if the order had not been paid.

::: danger Fill in stock before enabling
An empty stock value (`NULL` in the `stock` column) reads as zero, and the decrement runs on a “stock is at least the requested amount” condition. Enabling inventory on an unfilled warehouse makes every such product impossible to order.
:::

Stock is per product. Order lines with the same product, including variants with different options, draw from one shared amount.

## Shipments

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_shipment_enabled` | `false` | Move the order status along with the shipment state |
| `ms3_shipment_on_delivered_status` | `0` | Order status ID for the “delivered” state. `0` — leave unchanged |
| `ms3_shipment_on_in_transit_status` | `0` | Order status ID for the “in transit” state. `0` — leave unchanged |

A shipment holds the tracking number and the delivery state. Creating one and setting a tracking number works with the setting off as well — only the automatic order status change is disabled.

A shipment has seven states, and the order does not react to all of them:

| Shipment state | What happens to the order |
| --- | --- |
| Shipped | Moves to `ms3_status_sent` |
| Cancelled, Failed | Move to `ms3_status_canceled` |
| In transit, Delivered | Take the status from their own setting; `0` leaves it unchanged |
| Preparing, Returned | Leave the status alone: the package ships no settings for them |

::: tip Why “delivered” changes nothing by default
The shipped status is flagged final in the default set, and an order cannot leave a final status. A value other than `0` only makes sense if you made “Sent” non-final or use a status of your own.
:::

## Customers

Customer account settings. How it looks on the frontend: [Login and registration](/en/components/minishop3/frontend/customer-auth).

`ms3_customer_login_page_id` and `ms3_customer_register_page_id` only set the URLs used in links. The forms themselves are rendered by `msCustomer` through `unauthorizedTpl`; the package has no separate login-only chunk.

### Customer account pages

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_customer_login_page_id` | `0` | Login page ID |
| `ms3_customer_register_page_id` | `0` | Registration page ID |
| `ms3_customer_profile_page_id` | `0` | Profile page ID |
| `ms3_customer_addresses_page_id` | `0` | Addresses page ID |
| `ms3_customer_orders_page_id` | `0` | Order history page ID |
| `ms3_customer_redirect_after_login` | `0` | Page ID to redirect to after login (`0` — stay) |

### Authentication and registration

With `ms3_customer_auto_register_on_order` and `ms3_customer_auto_login_on_order` enabled, a guest becomes an `msCustomer` during checkout, without the account form. Turn them off if you create accounts only manually.

`ms3_customer_require_email_verification` sends an email with a link to `GET /api/v1/customer/email/verify`. Until the address is confirmed, some account flows may require a resend.

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_customer_auto_register_on_order` | `true` | Automatically register the customer on checkout |
| `ms3_customer_auto_login_on_order` | `true` | Automatically log in after checkout |
| `ms3_customer_auto_login_after_register` | `true` | Automatically log in after registration |
| `ms3_customer_require_email_verification` | `false` | Require email verification |
| `ms3_customer_send_welcome_email` | `true` | Send welcome email |
| `ms3_customer_require_privacy_consent` | `true` | Require data processing consent (GDPR) |

### Order cancellation

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_customer_cancel_allowed_statuses` | `2,3` | Status IDs where the customer can cancel an order (comma-separated). Default: new and paid |

::: tip Order cancellation settings
The customer sees the “Cancel order” button only for orders with a status from this list. On cancel, the order moves to `ms3_status_canceled`.

To disable customer cancellation, set the value to `0`.
:::

::: warning An empty value does not disable cancellation
Clearing the setting does not turn cancellation off — it falls back to the statuses from `ms3_status_new` and `ms3_status_paid`, that is, the same “New” and “Paid”. Customers will still be able to cancel a paid order.
:::

### modUser sync

Off by default: the account runs on `msCustomer` and the MS3 token. Enable sync if you need MODX groups, ACL, or shared sessions with other components.

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_customer_sync_enabled` | `false` | Enable msCustomer ↔ modUser sync |
| `ms3_customer_sync_create_moduser` | `false` | Create modUser when msCustomer registers |
| `ms3_customer_sync_delete_with_user` | `false` *(not in transport)* | Delete msCustomer when modUser is deleted. Read by the `minishop3.php` plugin; create the key manually if needed |
| `ms3_customer_sync_user_group` | `0` | Group ID for new modUser accounts |
| `ms3_customer_duplicate_fields` | `["email", "phone"]` | JSON array of fields for duplicate checks |

## Security

### Tokens

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_customer_token_ttl` | `86400` | Customer token lifetime (seconds, 24 hours) |
| `ms3_customer_api_token_ttl` | `86400` | API token lifetime (seconds, 24 hours) |
| `ms3_password_reset_token_ttl` | `3600` | Password reset token lifetime (seconds, 1 hour) |
| `ms3_email_verification_token_ttl` | `86400` | Email verification token lifetime (seconds, 24 hours) |
| `ms3_email_verification_url` | | Your own URL for the verification email. If empty, the link points to Web API `api.php?route=…/email/verify&token=…&html=1` |
| `ms3_email_verification_success_url` | | URL to redirect to after successful email verification. If empty, returns to the site with `?ms3_email_verified=1` |
| `ms3_snippet_token_secret` | (auto-generated) | Secret key for snippet tokens |
| `ms3_snippet_cache_ttl` | `3600` | Snippet parameter cache lifetime (seconds) |
| `ms3_payment_secret` | | Secret key for payment notifications |
| `ms3_payment_link_statuses` | (empty → `ms3_status_new`) | CSV status IDs for which `PaymentLinkResolver` returns the payment URL in emails and msGetOrder |

### Brute-force protection

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_customer_max_login_attempts` | `5` | Maximum failed login attempts |
| `ms3_customer_block_duration` | `300` | Block duration (seconds, 5 minutes) |

### Password requirements

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_password_min_length` | `8` | Minimum password length |
| `ms3_password_require_uppercase` | `false` | Require uppercase letters |
| `ms3_password_require_number` | `false` | Require numbers |
| `ms3_password_require_special` | `false` | Require special characters |

## API

Web API (`api.php`) settings. Method list: [REST API](/en/components/minishop3/development/api).

`ms3_cors_allowed_origins` is **empty** by default: requests are accepted only from the same domain. Value `*` allows any origin, but without credentials; for a cookie token from another domain, list the exact origins comma-separated.

The rate limit applies to all `/api/v1/*`. On a single server the `file` counter store is enough.


| Setting | Default | Description |
| --- | --- | --- |
| `ms3_api_debug` | `false` | API debug mode (extended logging) |
| `ms3_cors_allowed_origins` | `-` | Allowed CORS origins: empty = same domain only, `*` = any (without credentials), or comma-separated list |
| `ms3_rate_limit_max_attempts` | `60` | Maximum requests per period |
| `ms3_rate_limit_decay_seconds` | `60` | Rate limit period (seconds) |
| `ms3_rate_limit_store` | `file` | Counter store: `file`, `redis`, `memcached` |
| `ms3_rate_limit_storage_path` | `-` | Directory for `file` (empty = system temp) |
| `ms3_rate_limit_redis_dsn` | `-` | Redis DSN (overrides host/port when set) |
| `ms3_rate_limit_redis_host` | `127.0.0.1` | Redis host |
| `ms3_rate_limit_redis_port` | `6379` | Redis port |
| `ms3_rate_limit_redis_password` | `-` | Redis password |
| `ms3_rate_limit_redis_database` | `0` | Redis DB index |
| `ms3_rate_limit_memcached_servers` | `127.0.0.1:11211` | Memcached server list |
| `ms3_web_catalog_respect_resource_groups` | `true` | Hide products and categories closed by MODX resource groups from the catalog |
| `ms3_public_seo_tv_map` | *(empty)* | Override SEO block values with your own TVs. JSON such as `{"title":"tv.seo_title"}` |


### Restricted catalog sections

`ms3_web_catalog_respect_resource_groups` is on by default: products and categories from a closed MODX resource group are hidden from outsiders in the Web API, in the snippets and in the cart. A signed-in customer whose customer group is linked to a MODX user group sees the restricted section.

Works only together with the MODX system setting `access_resource_group_enabled`.

::: danger A restricted catalog does not work on a cached page
MODX serves the finished HTML before the snippets run. The first guest writes their reduced list into the cache, and a signed-in customer sees exactly that. Call the snippets uncached: `[[!ms3_products]]`, `[[!ms3_gallery]]`.
:::

### Overriding SEO with your own TVs

The format of `ms3_public_seo_tv_map` is JSON: the key on the left comes from a fixed set (`title`, `description`, `canonical`, `robots`, `og.title`, `og.description`, `og.image`, `og.type`), the right side is a TV name prefixed with `tv.`:

```json
{"title": "tv.seo_title", "robots": "tv.robots"}
```

Applies to the product and category cards, and to lists and trees when `include_seo=1`.

::: warning Malformed JSON is ignored silently
A formatting error produces no message: the setting is simply skipped and the SEO block returns its default values. If the override did not work, check the JSON first.
:::

## Frontend

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_token_name` | `ms3_token` | Token name for visitor identification |
| `ms3_register_global_config` | `true` | Register `ms3Config` in the DOM |
| `ms3_frontend_assets` | JSON array | CSS and JS loaded on the frontend (`hooks.js`, `CartAPI.js`, `CartUI.js`, `ms3.js`, etc.) |

`order-addresses.js` is **not** in the default list. Include it separately if checkout needs the saved-address block.

### Placeholders in `ms3_frontend_assets`

- `[[+assetsUrl]]` — `assets/components/minishop3/`
- `[[+jsUrl]]` — `assets/components/minishop3/js/`
- `[[+cssUrl]]` — `assets/components/minishop3/css/`

## Import

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_utility_import_fields` | `pagetitle,parent,price,article` | Fields for import |
| `ms3_utility_import_fields_delimiter` | `;` | CSV column delimiter |
| `ms3_import_sync_limit` | `300` | Synchronous import limit (rows) |
| `ms3_import_preview_rows` | `5` | Preview row count |
| `ms3_import_upload_path` | `assets/import/` | Upload path for import files |

## Notifications

### Email

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_email_manager` | | Manager email addresses for notifications (comma-separated) |

### Telegram

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_telegram_bot_token` | | Telegram bot token (get from [@BotFather](https://t.me/BotFather)) |
| `ms3_telegram_manager` | | CSV manager chat IDs for status-change notifications. `OrderStatusService` reads it alongside **Utilities → Notifications** |

::: tip Telegram bot setup

1. Create a bot via [@BotFather](https://t.me/BotFather) and get the token
2. Set the token in `ms3_telegram_bot_token`
3. Configure recipients either way:
   - **Utilities → Notifications** — Telegram channel, `recipient_value` = chat ID (recommended since 1.11+)
   - `ms3_telegram_manager` — CSV chat IDs for the older status-change delivery

Get your chat ID from [@userinfobot](https://t.me/userinfobot).

:::

## Usage examples

### Getting a setting in PHP

```php
$priceFormat = $modx->getOption('ms3_price_format');
$currencySymbol = $modx->getOption('ms3_currency_symbol');
```

### Getting a setting in Fenom

```fenom
{* Currency symbol *}
{'ms3_currency_symbol' | option}

{* Customer profile page ID *}
{'ms3_customer_profile_page_id' | option}
```

### Price format

`ms3_price_format` accepts a JSON array of three values — decimal places, decimal separator, thousands separator:

```json
[2, ".", " "]
```

Result: `1 234.56`

### Changing price and weight

Price and weight are modified by plugins on the `msOnGetProductPrice` and `msOnGetProductWeight` events. Attaching a plugin to the event is enough — nothing has to be enabled in the settings.

```php
<?php
// Plugin on the msOnGetProductPrice event
// Read the price from eventData: a previous plugin may have changed it
$price = $modx->eventData['msOnGetProductPrice']['price'] ?? $scriptProperties['price'];
$data = $scriptProperties['data'];

// 10% discount for products in category 5
if ((int) ($data['parent'] ?? 0) === 5) {
    $price = $price * 0.9;
}

// Return through eventData so the next plugin receives the changed price
$modx->eventData['msOnGetProductPrice']['price'] = $price;
```

Event parameters and their call order are described in [Product events](/en/components/minishop3/development/events/product).
