---
title: Cabinet
description: User cabinet
logo: https://modstore.pro/assets/extras/cabinet/logo.png
author: prihod
modstore: https://modstore.pro/packages/users/cabinet
---

# Cabinet

Cabinet is an all-in-one solution for quick setup of a user cabinet in MODX Revolution. It suits both experienced developers and beginners.

## ✨ Main features

- Automatic access rights setup
- Automatic creation of pages and sections
- Support for modal mode
- Integration with social networks for registration and login
- Phone verification via SMS/Voice OTP
- Integration with extras:
  - [miniShop2](https://modstore.pro/packages/ecommerce/minishop2)
  - [Polylang](https://modstore.pro/packages/other/polylang)
  - [MyFavorites](https://modstore.pro/packages/other/myfavorites)
  - [msInShopNotify](https://modstore.pro/packages/alerts-mailing/msinshopnotify)
  - [msMultiCurrency](https://modstore.pro/packages/integration/msmulticurrency)
- E-commerce features:
  - Auto-login on first order
  - Order history and management
  - Reorder products
  - Order sharing
- Flexible user profile management
- CSRF protection
- Integration with reCAPTCHA 3
- Bootstrap 5
- Native JavaScript

## 🎬 Demo video

[![Demo video](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/video-cover.jpg)](https://youtu.be/I5pu-droYPM)

[RuTube](https://rutube.ru/video/734a3c496022641c991a15b658b7ecc3/)

## 🚀 Quick start

### Installation

When installing, the following options are available in the install window:

- User group for private pages (created automatically if missing)
- Registration mode:
  - E-mail — with confirmation via email
  - Phone — with confirmation via SMS or call
- Display mode:
  - Modal with AJAX
  - Standard pages
- Settings for created pages:
  - Name
  - Alias
  - Parent resource
  - Access type (private/public)
  - Show in menu
  - Template
  - Content

[![Install settings](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/install.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/install.png)

[![Main options](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/base.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/base.png)

### Registration and login

To output registration/login links and cabinet menu use the snippet:

```modx
[[!cabinetLogin]]
```

When using modal mode, add to the footer of each page:

```modx
[[!cabinetAuth]]
```

#### Registration form

Depending on the selected registration mode, in the `cabinet.auth` chunk the registration form can have a minimal set of fields:

- For `E-mail` mode: email field only
- For `Phone` mode: phone field only

By default, data confirmation is required on registration. To disable it, set the system option `User activation` (key cabinet_auth_activation) to `No`. With activation disabled, the registration form must include a password field.

## ⚙️ System settings

### Authorization

[![Authorization options](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/auth.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/auth.png)

### SMS/Voice OTP

#### Provider settings

In system settings, section "OTP":

1. Set the provider class in option `SMS and Voice OTP provider class` (cabinet_phone_handler_class)
2. By default `CabinetPhoneLog` is set — a test provider that writes to the MODX log
3. Configure the chosen provider in the corresponding configuration option

#### Operation mode settings

- Choose OTP mode in option `Phone OTP mode` (cabinet_otp_phone_mode):
  - `sms` — confirmation via SMS
  - `call` — confirmation via call

#### Security settings

- Set the code request limit in option `Code request limit` (cabinet_otp_phone_sending_limit)
- Set lockout time in option `Code request lockout time` (cabinet_otp_phone_sending_lock_time)
  - Value is in minutes
  - Default: 360 minutes (6 hours)

#### Supported providers

| Provider                                   | Country | SMS | Voice | Config option         |
|---------------------------------------------|--------|-----|-------|----------------------------|
| [CabinetGreenSms](https://greensms.ru/)     | RU     | ✓   | ✓     | cabinet_greensms_config    |
| [CabinetTeraSms](https://terasms.ru/)       | RU     | ✓   | ✓     | cabinet_terasms_config     |
| [CabinetAlphaSms](https://alphasms.ua/)     | UA     | ✓   | ✓     | cabinet_alphasms_config    |
| [CabinetSmsClubMobi](https://smsclub.mobi/) | UA     | ✓   | ✗     | cabinet_smsclubmobi_config |
| CabinetPhoneLog                             | Demo   | ✓   | ✓     | -                          |

New providers can be added at no cost if a PHP API library is available.

[![OTP options](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/otp.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/otp.png)

### Social networks

#### Main settings

In the package system settings, section "Social networks", the following options are available:

1. **`Use social networks` (key cabinet_social_providers):**
   Comma-separated list of social network names available to the user for registration and login.

2. **`User login via social networks` (key cabinet_social_login):**
   Allow or disallow users to log in via social networks.

3. **`Register new users via social networks` (key cabinet_social_signup):**

- Allow or disallow new user registration via social networks.
- If registration is off but "User login via social networks" is on, users can add social networks for login in their profile settings.

4. **`Enable social networks` (key cabinet_enable_socials):**
   Globally enable or disable use of social networks.

#### Supported social networks

| Network      | Config option           |
|---------------|------------------------------|
| Google        | cabinet_social_Google        |
| Yandex        | cabinet_social_Yandex        |
| Mailru        | cabinet_social_Mailru        |
| Vkontakte     | cabinet_social_Vkontakte     |
| Odnoklassniki | cabinet_social_Odnoklassniki |
| Facebook      | cabinet_social_Facebook      |
| Instagram     | cabinet_social_Instagram     |
| Twitter       | cabinet_social_Twitter       |
| LinkedIn      | cabinet_social_LinkedIn      |
| GitHub        | cabinet_social_GitHub        |

Instructions for obtaining API keys for most providers can be found [here](https://docs.modx.pro/components/hybridauth/providers/).

[![Social network options](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/socials.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/socials.png)

### Security

[![Security options](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/security.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/security.png)

### reCAPTCHA 3

Integration with Google reCAPTCHA 3 for protection against automated attacks.

[![reCAPTCHA 3 options](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/recaptcha.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/recaptcha.png)

## 🧩 Snippets

### cabinetLogin

Snippet for outputting registration/login links or the logged-in user menu.

#### Parameters

| Parameter      | Default                 | Description                                                                                                        |
|---------------|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| cabinetPageId | 0                            | Cabinet page ID. If 0, value from system option `cabinet_home_page_id` is used            |
| loginPageId   | 0                            | Post-login page ID. If 0, value from system option `cabinet_login_page_id` is used |
| logoutPageId  | 0                            | Post-logout page ID. If 0, value from system option `cabinet_logout_page_id` is used     |
| tpl           | cabinet.login                | Display chunk                                                                                                 |
| tplWrapper    | -                            | Wrapper chunk                                                                                                    |
| gravatarUrl   | <https://gravatar.com/avatar/> | Gravatar service URL                                                                                            |
| css           | -                            | Path to CSS file                                                                                                |
| js            | -                            | Path to JavaScript file                                                                                         |

### cabinetAuth

Snippet for outputting login, registration and password recovery forms.

#### Parameters

| Name          | Default                           | Description                                                                                                                                           |
|-------------------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| groups            | -                                               | Comma-separated list of groups for user registration. If empty, value from system option `cabinet_auth_user_group` is used   |
| addContexts       | -                                               | Additional contexts, comma-separated. E.g. &addContexts=`web,ru,en`                                                                        |
| widget            | login                                           | Active form widget. Allowed values: login; register; recovery                                                                              |
| loginPageId       | 0                                               | Page ID to send the user to after login. If 0, value from system option `cabinet_login_page_id` is used        |
| logoutPageId      | 0                                               | Page ID to send the user to after logout. If 0, value from system option `cabinet_logout_page_id` is used |
| tpl               | cabinet.login                                   | Chunk name for snippet output                                                                                                |
| tplWrapper        | cabinet.auth.wrapper                            | Wrapper chunk name for snippet output                                                                                                   |
| tplMessageWrapper | cabinet.message.wrapper                         | Chunk name for form message wrapper                                                                                                              |
| css               | {assets_url}components/cabinet/css/web/auth.css | Path to CSS file                                                                                                             |
| js                | {assets_url}components/cabinet/js/web/auth.js   | Path to JavaScript file                                                                                                                   |

### cabinetProfile

Snippet for outputting the user profile form.

#### Parameters

| Name          | Default                                                                                                                                              | Description                                                                                                                            |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| allowedFields     | username:50, email:50, fullname:50, phone:12, mobilephone:12, dob:10, gender, address, country, city, state, zip, fax, comment, specifiedpassword, confirmpassword | Comma-separated list of user fields allowed for editing. You can also set max length with a colon. |
| avatar            | `{"w":200,"h":200,"zc":0,"bg":"ffffff","f":"jpg"}`                                                                                                                 | JSON string with phpThumb conversion parameters for the avatar                                                                   |
| avatarPath        | images/avatar/                                                                                                                                                     | Directory for user avatars inside MODX_ASSETS_PATH                                                            |
| gravatarUrl       | <https://gravatar.com/avatar/>                                                                                                                                       | Gravatar URL                                                                                                                        |
| requiredFields    | username,email                                                                                                                                                     | List of required fields when editing. These must be filled for a successful profile update.                      |
| tpl               | cabinet.profile                                                                                                                                                    | Chunk name for snippet output                                                                                 |
| tplWrapper        | cabinet.profile.wrapper                                                                                                                                            | Wrapper chunk name for snippet output                                                                                    |
| tplMessageWrapper | cabinet.message.wrapper                                                                                                                                            | Chunk name for form message wrapper                                                                                               |
| css               | {assets_url}components/cabinet/css/web/profile.css                                                                                                                 | Path to CSS file                                                                                              |
| js                | {assets_url}components/cabinet/js/web/profile.js                                                                                                                   | Path to JavaScript file                                                                                                    |

### cabinetOrders

Snippet for outputting the user's order list.

[![Order list output](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/orders.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/orders.png)

#### Parameters

| Name             | Default                                                                                | Description                                                                                                                                                                                        |
|----------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| statusAlias          | -                                                                                                    | JSON string with alternative order status IDs. E.g. {6:1,8:11} where 6 is current order status and 1 is the status shown to the client                                                                |
| allowCancelStatuses  | 1                                                                                                    | Comma-separated list of order status IDs for which the client can cancel the order                                                                                                          |
| cancelledStatus      | 4                                                                                                    | Status ID for orders cancelled by the client                                                                                                                                                      |
| excludeStatuses      | 5                                                                                                    | Comma-separated list of order status IDs to exclude from the filter                                                                                                                        |
| criteriaAvailability | `{"published":1,"deleted":0}`. Example of extending default: `{"price:>":0,"count:!=":0}` | JSON string with additional product availability criteria for ordering                                                                                                          |
| sharePageId          | 0                                                                                                    | Page ID for shared order output. If 0, value from system option `cabinet_shared_order_page_id` is used                                                              |
| detailsPageId        | 0                                                                                                    | Page ID for order details. If 0, value from system option `cabinet_order_details_page_id` is used                                                  |
| thumbs               |                                                                                                      | Comma-separated list of thumbnail sizes. E.g. "120x90,360x240" gives placeholders `[[+120x90]]` and `[[+360x240]]`. Images must be pre-generated in the product gallery |
| currencySymbol       | symbol_right                                                                                         | Currency symbol column in msMultiCurrency. Allowed values: symbol_left; symbol_right                                                                                              |
| limit                | 12                                                                                                   | Maximum number of results                                                                                                                                                                       |
| offset               | 0                                                                                                    | Number of results to skip                                                                                                                                                            |
| sortby               | createdon                                                                                            | Sort field                                                                                                                                                                     |
| sortdir              | DESC                                                                                                 | Sort direction                                                                                                                                                                          |
| where                |                                                                                                      | Additional query parameters, JSON-encoded                                                                                                                                         |
| return               | tpl                                                                                                  | Output method. Allowed values: tpl and data                                                                                                                                      |
| tpl                  | cabinet.orders                                                                                       | Chunk name for snippet output                                                                                                                                             |
| tplWrapper           | -                                                                                                    | Wrapper chunk name for snippet output                                                                                                                                                |
| tplMessageWrapper    | cabinet.message.wrapper                                                                              | Chunk name for form message wrapper                                                                                                                                                           |
| css                  | -                                                                                                    | Path to CSS file                                                                                                                                                          |
| js                   | {assets_url}components/cabinet/js/web/orders.js                                                      | Path to JavaScript file                                                                                                                                                                |

### cabinetOrderDetails

Snippet for outputting order details.

[![Order details output](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/order_details.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/order_details.png)

#### Parameters

| Name | Default | Description                                            |
|----------|-----------------------|-----------------------------------------------------|
| tpl      | cabinet.order.details | Chunk name for snippet output |

This snippet is a wrapper over `cabinetOrders` and accepts all its parameters.

### cabinetOrdersStats

Snippet for outputting overall order statistics.

#### Parameters

| Name          | Default | Description                                                                                           |
|-------------------|-----------------------|----------------------------------------------------------------------------------------------------|
| activeStatuses    | 1                     | Comma-separated list of active order status IDs                                                 |
| cancelledStatuses | 4                     | Comma-separated list of cancelled order status IDs                                               |
| completedStatuses | 2,3                   | Comma-separated list of completed order status IDs                                              |
| currencySymbol    | symbol_right          | Currency symbol column in msMultiCurrency. Allowed values: symbol_left; symbol_right |
| return            | tpl                   | Output method. Allowed values: tpl and data                                         |
| tpl               | cabinet.orders.stats  | Chunk name for snippet output                                                |
| tplWrapper        | -                     | Wrapper chunk name for snippet output                                                   |
| css               | -                     | Path to CSS file                                                             |
| js                | -                     | Path to JavaScript file                                                                   |

### cabinetSharedOrder

Snippet for outputting a shared order.

#### Parameters

| Name          | Default   | Description                                                                                                                                                                                    |
|-------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| thumbs            |                         | Comma-separated list of thumbnail sizes. E.g. "120x90,360x240" gives placeholders [[+120x90]] and [[+360x240]]. Images must be pre-generated in the product gallery |
| currencySymbol    | symbol_right            | Currency symbol column in msMultiCurrency. Allowed values: symbol_left; symbol_right                                                                                          |
| tpl               | cabinet.shared.order    | Chunk name for snippet output                                                                                                                                         |
| tplWrapper        | -                       | Wrapper chunk name for snippet output                                                                                                                                            |
| tplMessageWrapper | cabinet.message.wrapper | Chunk name for form message wrapper                                                                                                                                                       |
| css               | -                       | Path to CSS file                                                                                                                                                      |
| js                | -                       | Path to JavaScript file                                                                                                                                                            |

## 📫 System events

### cabinetBeforeMakeUrl

Event before URL creation.

#### Parameters

| Parameter | Description                                                          |
|----------|-------------------------------------------------------------------|
| id       | Resource ID                                                        |
| url      | Final URL (if not empty, cabinetMakeUrl will not run) |
| context  | Context for URL creation scope                             |
| args     | Query string                                                    |
| scheme   | URL format                                               |
| options  | Options array                                                 |
| tools    | CabinetTools instance                                            |

### cabinetMakeUrl

URL creation event.

#### Parameters

| Name | Description                                                  |
|----------|-----------------------------------------------------------|
| id       | Resource ID for which the URL is created                |
| url      | Final URL value                              |
| context  | Context that limits URL creation       |
| args     | Query string appended to the generated URL |
| scheme   | Scheme in which the URL is created    |
| options  | Options array for resource URL creation         |
| tools    | CabinetTools instance                    |

### cabinetIsAvailableProduct

Event for product availability status for ordering.

#### Parameters

| Name  | Description                                      |
|-----------|-----------------------------------------------|
| id        | Product ID                                     |
| data      | Product data as array                  |
| available | Availability. Allowed values 0 and 1 |
| tools     | CabinetTools instance        |

### cabinetBeforePrepareOrderProduct

Event for preparing order product data.

#### Parameters

| Name   | Description                               |
|------------|----------------------------------------|
| order_id   | Order ID                              |
| product_id | Product ID                              |
| data       | Product data as array           |
| order      | msOrder instance       |
| tools      | CabinetTools instance |

### cabinetBeforeUploadAvatar

Event before avatar upload.

#### Parameters

| Name | Description                               |
|----------|----------------------------------------|
| userId   | User ID                        |
| user     | modUser instance      |
| file     | Avatar file                          |
| tools    | CabinetTools instance |

### cabinetUploadAvatar

Avatar upload event.

#### Parameters

| Name | Description                               |
|----------|----------------------------------------|
| userId   | User ID                        |
| user     | modUser instance      |
| file     | Avatar file                          |
| url      | URL of uploaded avatar            |
| tools    | CabinetTools instance |

### cabinetBeforeRemoveAvatar

Event before avatar removal.

#### Parameters

| Name | Description                               |
|----------|----------------------------------------|
| userId   | User ID                        |
| user     | modUser instance      |
| file     | Avatar file                          |
| tools    | CabinetTools instance |

### cabinetRemoveAvatar

Avatar removal event.

#### Parameters

| Name | Description                               |
|----------|----------------------------------------|
| userId   | User ID                        |
| user     | modUser instance      |
| tools    | CabinetTools instance |

## 💻 Development

### Lexicons

All messages and notifications are in lexicons:

- Topic `auth`: authorization messages
- Topic `profile`: profile messages

[![](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_auth.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_auth.png)

[![](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_profile.png)](https://raw.githubusercontent.com/Prihod/modx-extras-docs/main/Cabinet/images/lexicon_profile.png)

### Console scripts

**core/components/cabinet/scripts/generate_orders_share_key.php**
Script for generating order sharing keys for orders created before Cabinet was installed.
