---
title: System settings
---
# System settings

All MiniShop3 system settings use the prefix `ms3_` and are in the `minishop3` namespace.

To view settings go to **System → System Settings** and select namespace **minishop3**.

## Main settings

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_services` | JSON | Array of registered classes for cart, order, delivery, payment. Used to extend functionality via third-party components |
| `ms3_plugins` | `[]` | Array of registered plugins extending store model objects |
| `ms3_chunks_categories` | | Comma-separated category IDs for chunk list |
| `ms3_use_scheduler` | `false` | Use [Scheduler](/en/components/scheduler/) for background tasks |

## Product category

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_template_category_default` | | Default template for new categories |
| `ms3_category_grid_fields` | `id,menuindex,pagetitle,article,price,thumb,new,favorite,popular` | Visible fields in category product table |
| `ms3_category_show_nested_products` | `true` | Show products from subcategories |
| `ms3_category_show_options` | `false` | Show product options in category table |
| `ms3_category_remember_tabs` | `true` | Remember active category tab |
| `ms3_category_id_as_alias` | `false` | Use category ID as URL alias |
| `ms3_category_content_default` | | Default content for new categories (snippet call for products) |
| `mgr_tree_icon_mscategory` | `icon icon-barcode` | CSS class for category icon in resource tree |

## Product

### Main fields

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_template_product_default` | | Default template for new products |
| `ms3_product_main_fields` | `pagetitle,longtitle,description,introtext,content` | Main fields on product panel |
| `ms3_product_extra_fields` | `price,old_price,article,weight,color,size,vendor_id,made_in,tags,new,popular,favorite` | Extra product fields |
| `ms3_product_show_in_tree_default` | `false` | Show new products in resource tree |
| `ms3_product_id_as_alias` | `false` | Use product ID as URL alias |
| `ms3_product_remember_tabs` | `true` | Remember active product tab |
| `mgr_tree_icon_msproduct` | `icon icon-tag` | CSS class for product icon in resource tree |

### Product tabs

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_product_tab_extra` | `true` | Show product data tab |
| `ms3_product_tab_gallery` | `true` | Show gallery tab |
| `ms3_product_tab_links` | `true` | Show product links tab |
| `ms3_product_tab_options` | `true` | Show options tab |
| `ms3_product_tab_categories` | `true` | Show categories tab |

### Gallery

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_product_source_default` | `0` | Default file source ID for gallery |
| `ms3_product_thumbnail_default` | `{assets_url}components/minishop3/img/mgr/ms3_small.png` | Placeholder image path |
| `ms3_product_thumbnail_size` | `small` | Default thumbnail size |

### Price and weight formatting

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_price_format` | `[2, ".", " "]` | Price format: [decimals, decimal separator, thousands separator] |
| `ms3_weight_format` | `[3, ".", " "]` | Weight format: [decimals, decimal separator, thousands separator] |
| `ms3_price_format_no_zeros` | `true` | Remove trailing zeros in prices (15.00 → 15) |
| `ms3_weight_format_no_zeros` | `true` | Remove trailing zeros in weight |
| `ms3_price_snippet` | | Snippet name for price modifier |
| `ms3_weight_snippet` | | Snippet name for weight modifier |
| `ms3_currency_symbol` | `₽` | Currency symbol (₽, $, €, £, ₴, ¥, ₸) |
| `ms3_currency_position` | `after` | Symbol position: `before` ($ 100) or `after` (100 ₽) |

## Cart

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_cart_context` | `false` | Use single cart for all contexts |
| `ms3_cart_max_count` | `1000` | Maximum items in cart |

## Orders

### General

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_order_format_num` | `ym` | Order number format (date() format) |
| `ms3_order_format_num_separator` | `/` | Separator in order number |
| `ms3_date_format` | `d.m.y H:M` | Date format in manager |
| `ms3_order_user_groups` | | User groups for customer registration (comma-separated) |
| `ms3_order_show_drafts` | `true` | Show drafts in order list |
| `ms3_order_redirect_thanks_id` | `1` | "Thank you" page ID |
| `ms3_order_success_page_id` | `0` | Successful payment page ID |
| `ms3_order_register_user_on_submit` | `false` | Create modUser on checkout |
| `ms3_email_manager` | | Manager emails for notifications (comma-separated) |
| `ms3_delete_drafts_after` | | Delete old drafts (strtotime: `-1 year`, `-2 weeks`) |
| `ms3_order_log_actions` | `status,products,field,address` | Logged order actions |

### Manager fields

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_order_grid_fields` | `id,num,customer,status,cost,weight,delivery,payment,createdon,updatedon,comment` | Order table fields |
| `ms3_order_address_fields` | `first_name,last_name,email,phone,index,country,region,city,metro,street,building,entrance,floor,room,comment,text_address` | Delivery address fields |
| `ms3_order_product_fields` | `product_pagetitle,vendor_name,product_article,weight,price,count,cost` | Order product table fields |
| `ms3_order_product_options` | `size,color` | Editable product options in order |

## Order statuses

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_status_draft` | `1` | "Draft" status ID |
| `ms3_status_new` | `0` | New order status ID (set by migration) |
| `ms3_status_paid` | `0` | Paid order status ID |
| `ms3_status_canceled` | `0` | Canceled order status ID |
| `ms3_status_for_stat` | `2,3` | Status IDs for completed order statistics |

## Customers

### Account pages

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_login_page_id` | `0` | Login page ID |
| `ms3_customer_register_page_id` | `0` | Registration page ID |
| `ms3_customer_profile_page_id` | `0` | Profile page ID |
| `ms3_customer_addresses_page_id` | `0` | Addresses page ID |
| `ms3_customer_orders_page_id` | `0` | Order history page ID |
| `ms3_customer_redirect_after_login` | `0` | Redirect page after login (0 = stay) |

### Auth and registration

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_auto_register_on_order` | `true` | Auto-register customer on order |
| `ms3_customer_auto_login_on_order` | `true` | Auto-login after order |
| `ms3_customer_auto_login_after_register` | `true` | Auto-login after registration |
| `ms3_customer_require_email_verification` | `false` | Require email verification |
| `ms3_customer_send_welcome_email` | `true` | Send welcome email |
| `ms3_customer_require_privacy_consent` | `true` | Require privacy consent (GDPR) |

### modUser sync

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_sync_enabled` | `false` | Enable msCustomer ↔ modUser sync |
| `ms3_customer_sync_create_moduser` | `false` | Create modUser on msCustomer registration |
| `ms3_customer_sync_delete_with_user` | `false` | Delete msCustomer when modUser is deleted |
| `ms3_customer_sync_user_group` | `0` | User group ID for new modUser |
| `ms3_customer_duplicate_fields` | `["email", "phone"]` | JSON array of fields for duplicate check |

## Security

### Tokens

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_token_ttl` | `86400` | Customer token TTL (seconds, 24 hours) |
| `ms3_customer_api_token_ttl` | `86400` | API token TTL (seconds, 24 hours) |
| `ms3_password_reset_token_ttl` | `3600` | Password reset token TTL (seconds, 1 hour) |
| `ms3_email_verification_token_ttl` | `86400` | Email verification token TTL (seconds, 24 hours) |
| `ms3_snippet_token_secret` | (auto) | Secret for snippet tokens |
| `ms3_snippet_cache_ttl` | `3600` | Snippet parameter cache TTL (seconds) |
| `ms3_payment_secret` | | Secret for payment notifications |

### Brute-force protection

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_customer_max_login_attempts` | `5` | Max failed login attempts |
| `ms3_customer_block_duration` | `300` | Block duration (seconds, 5 minutes) |

### Password requirements

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_password_min_length` | `8` | Minimum password length |
| `ms3_password_require_uppercase` | `false` | Require uppercase |
| `ms3_password_require_number` | `false` | Require digit |
| `ms3_password_require_special` | `false` | Require special character |

## API

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_api_debug` | `false` | API debug mode (verbose logging) |
| `ms3_cors_allowed_origins` | `*` | CORS allowed origins (comma or `*`) |
| `ms3_rate_limit_max_attempts` | `60` | Max requests per period |
| `ms3_rate_limit_decay_seconds` | `60` | Rate limit period (seconds) |

## Frontend

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_token_name` | `ms3_token` | Token name for visitor identification |
| `ms3_register_global_config` | `true` | Register `ms3Config` in DOM |
| `ms3_frontend_assets` | JSON array | List of CSS/JS files to load |

### Path placeholders

In `ms3_frontend_assets` you can use:

- `[[+assetsUrl]]` — `assets/components/minishop3/`
- `[[+jsUrl]]` — `assets/components/minishop3/js/`
- `[[+cssUrl]]` — `assets/components/minishop3/css/`

## Import

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_utility_import_fields` | `pagetitle,parent,price,article` | Import fields |
| `ms3_utility_import_fields_delimiter` | `;` | CSV column delimiter |
| `ms3_import_sync_limit` | `300` | Sync import row limit |
| `ms3_import_preview_rows` | `5` | Preview rows |
| `ms3_import_upload_path` | `assets/import/` | Import file upload path |

## Notifications

| Setting | Default | Description |
|---------|---------|-------------|
| `ms3_telegram_bot_token` | | Telegram bot token for notifications |

## Usage examples

### Get setting in PHP

```php
$priceFormat = $modx->getOption('ms3_price_format');
$currencySymbol = $modx->getOption('ms3_currency_symbol');
```

### Get setting in Fenom

```fenom
{* Currency symbol *}
{'ms3_currency_symbol' | option}

{* Customer profile page ID *}
{'ms3_customer_profile_page_id' | option}
```

### Price format

`ms3_price_format` accepts a JSON array:

```json
[2, ".", " "]
```

- `2` — decimal places
- `"."` — decimal separator
- `" "` — thousands separator

Result: `1 234.56`

### Price modifier

Create a snippet to modify price dynamically:

```php
<?php
// Snippet: myPriceModifier
// Parameters: $product (msProductData)

$price = $product->get('price');

// 10% discount for a category
if ($product->get('parent') == 5) {
    $price = $price * 0.9;
}

return $price;
```

Set the snippet name in `ms3_price_snippet`:

```
myPriceModifier
```
