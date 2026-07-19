---
title: System settings
---
# System settings

All MiniShop3 system settings use the `ms3_` prefix and live in the `minishop3` namespace.

To view settings, go to **System → System Settings** and select the **minishop3** namespace.

## General settings

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_services_config` | `{core_path}/config/ms3.services.php` | Path to the PHP file with custom service registration. Returns an array `[service_id => ClassName]` that overrides default classes (cart, order, delivery, payment, etc.) |
| `ms3_services_addons_dir` | `{core_path}/config/ms3.services.d/` | Folder with service registration fragments from third-party components. Each add-on adds its own `*.php`; files load in alphabetical order after the main config |
| `ms3_chunks_categories` | | Comma-separated category IDs for the chunk list |
| `ms3_use_scheduler` | `false` | Use [Scheduler](/en/components/scheduler/) for background tasks |

## Product category

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_template_category_default` | | Default template for new categories |
| `ms3_category_show_nested_products` | `true` | Show nested products from subcategories |
| `ms3_category_show_options` | `false` | Show product options in the category table |
| `ms3_category_id_as_alias` | `false` | Use category ID as URL alias |
| `ms3_category_content_default` | | Default content for new categories (product listing snippet call) |
| `ms3_category_products_default_rows` | `20` | Rows per page in the category product table |
| `mgr_tree_icon_mscategory` | `icon icon-barcode` | CSS class for the category icon in the resource tree |

## Product

### Main fields

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_template_product_default` | | Default template for new products |
| `ms3_product_main_fields` | `pagetitle,longtitle,description,introtext,content` | Main fields on the product panel |
| `ms3_product_extra_fields` | `price,old_price,article,weight,color,size,vendor_id,made_in,tags,new,popular,favorite` | Extra product fields |
| `ms3_product_show_in_tree_default` | `false` | Show new products in the resource tree |
| `ms3_product_id_as_alias` | `false` | Use product ID as URL alias |
| `ms3_product_remember_tabs` | `true` | Remember the active product panel tab |
| `mgr_tree_icon_msproduct` | `icon icon-tag` | CSS class for the product icon in the resource tree |

### Product tabs

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_product_tab_extra` | `true` | Show the product properties tab |
| `ms3_product_tab_gallery` | `true` | Show the gallery tab |
| `ms3_product_tab_links` | `true` | Show the product links tab |
| `ms3_product_tab_options` | `true` | Show the options tab |
| `ms3_product_tab_categories` | `true` | Show the categories tab |

### Gallery

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_product_source_default` | `0` | Default media source ID for the gallery |
| `ms3_product_thumbnail_default` | `{assets_url}components/minishop3/img/mgr/ms3_small.png` | Placeholder image path |
| `ms3_product_thumbnail_size` | `small` | Default thumbnail size |

### Price and weight formatting

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_price_format` | `[2, ".", " "]` | Price format: [decimal places, decimal separator, thousands separator] |
| `ms3_weight_format` | `[3, ".", " "]` | Weight format: [decimal places, decimal separator, thousands separator] |
| `ms3_price_format_no_zeros` | `true` | Strip trailing zeros in prices (15.00 → 15) |
| `ms3_weight_format_no_zeros` | `true` | Strip trailing zeros in weight |
| `ms3_price_snippet` | | Price modifier snippet name |
| `ms3_weight_snippet` | | Weight modifier snippet name |
| `ms3_currency_symbol` | `₽` | Currency symbol (₽, $, €, £, ₴, ¥, ₸) |
| `ms3_currency_position` | `after` | Symbol position: `before` ($ 100) or `after` (100 ₽) |
| `ms3_weight_unit` | `kg` | Weight unit (e.g. `kg`, `г`, `lbs`, `oz`). Used in `*_formatted` placeholders |

## Cart

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_cart_context` | `false` | Use a single cart across all contexts |
| `ms3_cart_max_count` | `1000` | Maximum number of items in the cart |

## Orders

### General settings

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_order_format_num` | `ym` | Order number format (date() format) |
| `ms3_order_format_num_separator` | `/` | Separator in the order number |
| `ms3_date_format` | `d.m.y H:M` | Date format in the Manager |
| `ms3_order_user_groups` | | Groups for customer registration (comma-separated) |
| `ms3_order_show_drafts` | `true` | Show drafts in the order list |
| `ms3_order_redirect_thanks_id` | `1` | ID of the "Thank you for your order" page |
| `ms3_order_success_page_id` | `0` | ID of the successful payment page |
| `ms3_order_register_user_on_submit` | `false` | Create modUser on checkout |
| `ms3_email_manager` | | Manager email addresses for notifications (comma-separated) |
| `ms3_delete_drafts_after` | | Delete old drafts (strtotime format: `-1 year`, `-2 weeks`) |
| `ms3_order_log_actions` | `status,products,field,address` | Logged order actions |

### Manager fields

::: info Order, address, and product table fields
These used to be configured via `ms3_order_grid_fields`, `ms3_order_address_fields`, `ms3_order_product_fields`, and `ms3_order_product_options`. They are now managed in **Utilities → Model fields** (tables `ms3_model_fields` and `ms3_model_field_sections`, models `msOrder` / `msOrderAddress`) and **Utilities → Grid settings** (`ms3_grid_fields`). The system settings are no longer read and are removed from the documentation.
:::

## Order statuses

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_status_draft` | `1` | ID of the "Draft" status |
| `ms3_status_new` | `0` | ID of the new order status (set by migration) |
| `ms3_status_paid` | `0` | ID of the paid order status |
| `ms3_status_canceled` | `0` | ID of the canceled order status |
| `ms3_status_for_stat` | `2,3` | Status IDs for completed order statistics |

## Customers

### Customer account pages

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_login_page_id` | `0` | Login page ID |
| `ms3_customer_register_page_id` | `0` | Registration page ID |
| `ms3_customer_profile_page_id` | `0` | Profile page ID |
| `ms3_customer_addresses_page_id` | `0` | Addresses page ID |
| `ms3_customer_orders_page_id` | `0` | Order history page ID |
| `ms3_customer_redirect_after_login` | `0` | Page ID to redirect to after login (0 = stay) |

### Authentication and registration

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_auto_register_on_order` | `true` | Automatically register the customer on checkout |
| `ms3_customer_auto_login_on_order` | `true` | Automatically log in after checkout |
| `ms3_customer_auto_login_after_register` | `true` | Automatically log in after registration |
| `ms3_customer_require_email_verification` | `false` | Require email verification |
| `ms3_customer_send_welcome_email` | `true` | Send welcome email |
| `ms3_customer_require_privacy_consent` | `true` | Require data processing consent (GDPR) |

### Order cancellation

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_cancel_allowed_statuses` | `2,3` | Status IDs where the customer can cancel an order (comma-separated). Default: new and paid |

::: tip Order cancellation settings
The customer sees the "Cancel order" button only for orders with a status from this list. On cancel, the order moves to `ms3_status_canceled`.

To disable customer cancellation, leave this setting empty.
:::

### modUser sync

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_sync_enabled` | `false` | Enable msCustomer ↔ modUser sync |
| `ms3_customer_sync_create_moduser` | `false` | Create modUser when msCustomer registers |
| `ms3_customer_sync_delete_with_user` | `false` | Delete msCustomer when modUser is deleted |
| `ms3_customer_sync_user_group` | `0` | Group ID for new modUser accounts |
| `ms3_customer_duplicate_fields` | `["email", "phone"]` | JSON array of fields for duplicate checks |

## Security

### Tokens

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_token_ttl` | `86400` | Customer token lifetime (seconds, 24 hours) |
| `ms3_customer_api_token_ttl` | `86400` | API token lifetime (seconds, 24 hours) |
| `ms3_password_reset_token_ttl` | `3600` | Password reset token lifetime (seconds, 1 hour) |
| `ms3_email_verification_token_ttl` | `86400` | Email verification token lifetime (seconds, 24 hours) |
| `ms3_email_verification_url` | | Custom URL for the verification email. If empty, the link points to Web API `api.php?route=…/email/verify&token=…&html=1` |
| `ms3_email_verification_success_url` | | URL to redirect to after successful email verification. If empty, returns to the site with `?ms3_email_verified=1` |
| `ms3_snippet_token_secret` | (auto-generated) | Secret key for snippet tokens |
| `ms3_snippet_cache_ttl` | `3600` | Snippet parameter cache lifetime (seconds) |
| `ms3_payment_secret` | | Secret key for payment notifications |

### Brute-force protection

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_max_login_attempts` | `5` | Maximum failed login attempts |
| `ms3_customer_block_duration` | `300` | Block duration (seconds, 5 minutes) |

### Password requirements

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_password_min_length` | `8` | Minimum password length |
| `ms3_password_require_uppercase` | `false` | Require uppercase letters |
| `ms3_password_require_number` | `false` | Require numbers |
| `ms3_password_require_special` | `false` | Require special characters |

## API

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_api_debug` | `false` | API debug mode (extended logging) |
| `ms3_cors_allowed_origins` | `*` | Allowed CORS domains (comma-separated or `*`) |
| `ms3_rate_limit_max_attempts` | `60` | Maximum requests per period |
| `ms3_rate_limit_decay_seconds` | `60` | Rate limit period (seconds) |

## Site (Frontend)

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_token_name` | `ms3_token` | Token name for visitor identification |
| `ms3_register_global_config` | `true` | Register `ms3Config` in the DOM |
| `ms3_frontend_assets` | JSON array | List of CSS/JS files to load |

### Path placeholders

In `ms3_frontend_assets`, these placeholders are available:

- `[[+assetsUrl]]` — `assets/components/minishop3/`
- `[[+jsUrl]]` — `assets/components/minishop3/js/`
- `[[+cssUrl]]` — `assets/components/minishop3/css/`

## Import

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_utility_import_fields` | `pagetitle,parent,price,article` | Fields for import |
| `ms3_utility_import_fields_delimiter` | `;` | CSV column delimiter |
| `ms3_import_sync_limit` | `300` | Synchronous import limit (rows) |
| `ms3_import_preview_rows` | `5` | Preview row count |
| `ms3_import_upload_path` | `assets/import/` | Upload path for import files |

## Notifications

### Email

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_email_manager` | | Manager email addresses for notifications (comma-separated) |

### Telegram

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_telegram_bot_token` | | Telegram bot token (get from [@BotFather](https://t.me/BotFather)) |

::: tip Telegram bot setup
1. Create a bot via [@BotFather](https://t.me/BotFather) and get the token
2. Set the token in `ms3_telegram_bot_token`
3. Each recipient's chat ID is set separately in **Utilities → Notifications** (`msNotificationConfig`, field `recipient_value`). Get your chat ID from [@userinfobot](https://t.me/userinfobot).
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

The `ms3_price_format` setting accepts a JSON array:

```json
[2, ".", " "]
```

- `2` — decimal places
- `"."` — decimal separator
- `" "` — thousands separator

Result: `1 234.56`

### Price modifier

Create a snippet for dynamic price changes:

```php
<?php
// Snippet: myPriceModifier
// Parameters: $product (msProductData)

$price = $product->get('price');

// Apply 10% discount for a specific category
if ($product->get('parent') == 5) {
    $price = $price * 0.9;
}

return $price;
```

Set the snippet name in `ms3_price_snippet`:

```
myPriceModifier
```
