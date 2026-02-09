# PayAndSee Settings

PayAndSee settings are in **System settings** > **PayAndSee**

## Main

Main settings:

- `{working_templates}` — active templates. Comma-separated list of template IDs for which to enable the feature.
- `{front_css}` — CSS file to load on the frontend.
- `{front_js}` — JavaScript file to load on the frontend.
- `{client_groups}` — client registration groups, comma-separated.
- `{email_manager}` — manager email addresses, comma-separated.

## Order

Order-related settings:

- `{order_handler_class}` — class name that implements the checkout logic.
- `{order_delivery_id}` — delivery method ID from [miniShop2][020104], used during checkout.
- `{order_resource_id}` — order page resource ID where checkout is performed.

[020104]: /en/components/minishop2/interface/settings
