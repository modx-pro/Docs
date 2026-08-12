---
title: Login and registration
description: Customer login and registration forms, AuthUI, password reset, and related settings
---
# Login and registration

Open an account page without a session. You see the `tpl.msCustomer.unauthorized` chunk: Login and Register tabs. Any `msCustomer` call for a guest returns the same chunk.

The package has no separate “login only” or “register only” templates. Keys `ms3_customer_login_page_id` and `ms3_customer_register_page_id` set URLs for links and redirects. Those resources usually run the same `msCustomer` call (often `service=profile`).

## What to do

1. Create an account resource (or two resources: login and registration).
2. Call `msCustomer` uncached.
3. Set the page IDs in system settings under namespace `minishop3`.
4. Confirm the storefront loads MS3 scripts ([Frontend JavaScript](/en/components/minishop3/development/frontend-js)).

::: code-group

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile'
]}
```

```modx
[[!msCustomer?
    &service=`profile`
]]
```

:::

A guest gets `unauthorizedTpl`. After login, the profile (or another `service`) opens.

## Form markup

Chunk file: `core/components/minishop3/elements/chunks/ms3_customer_unauthorized.tpl`.

| Element | ID / name | Purpose |
| --- | --- | --- |
| Login form | `#ms3-login-form` | `email`, `password` |
| Login messages | `#login-messages` | errors and success |
| Register form | `#ms3-register-form` | `email`, `password`, `password_confirm`, name, phone, privacy |
| Register messages | `#register-messages` | errors and success |
| Tabs | `#login-tab`, `#register-tab` | Bootstrap tabs (`data-bs-toggle="tab"`) |
| Forgot password | `#forgot-password-link` | link under the login form |

If you edit the chunk for your design, keep these `id` and `name` values. `AuthUI` takes selectors from `ms3.js` and will not pick up the forms otherwise.

## AuthUI

Class `AuthUI` (`assets/components/minishop3/js/web/ui/AuthUI.js`) listens for submit and hits the Web API:

| Action | Method | Endpoint |
| --- | --- | --- |
| Login | `handleLogin` | `POST /api/v1/customer/login` |
| Register | `handleRegister` | `POST /api/v1/customer/register` |
| Logout | from account / API | `POST /api/v1/customer/logout` |

On success the script redirects via `ms3_customer_redirect_after_login` or reloads the page. The server puts a **new** token in the httpOnly cookie `ms3_token` (rotation against token fixation): the old guest token is revoked, the cart draft moves to the customer session. Response format: [REST API](/en/components/minishop3/development/api).

### Auth providers

`AuthManager::registerProvider()` lets you add a custom login method (OAuth, SMS, etc.) in PHP. The stock storefront uses only the password provider via `AuthUI`. Provider registration example: [Customer Backend API](/en/components/minishop3/development/backend-api/customer).

::: warning SMS verification
The package's `SmsVerificationService` is a **stub**: `sendVerificationCode()` logs a warning and returns an error. SMS login is not available out of the box until you connect your own provider.
:::

## Password reset

The Web API already has:

- `POST /api/v1/customer/forgot-password` (body: `email`)
- `POST /api/v1/customer/reset-password` (body: `token`, `password`, `password_confirm`)

The `#forgot-password-link` in the stock chunk does **not** call these endpoints. `handleForgotPassword` only shows that the UI is not ready yet. Build your own “forgot password” screen on top of the API.

Reset token TTL: `ms3_password_reset_token_ttl`.

## Email verification

Turn on `ms3_customer_require_email_verification`. After registration the customer gets an email with a link to `GET /api/v1/customer/email/verify`. Resend: `POST /api/v1/customer/email/resend-verification` (auth required).

Set URLs in `ms3_email_verification_url` and `ms3_email_verification_success_url` if the default redirect to `api.php` does not fit.

## Page and behavior settings

| Key | Why you need it |
| --- | --- |
| `ms3_customer_login_page_id` | “Log in” URL in chunks and emails |
| `ms3_customer_register_page_id` | “Register” URL |
| `ms3_customer_profile_page_id` | Profile after login |
| `ms3_customer_redirect_after_login` | Where to go after login (`0` = stay) |
| `ms3_customer_auto_login_after_register` | Log in immediately after registration |
| `ms3_customer_require_privacy_consent` | Consent checkbox on the form |
| `ms3_customer_send_welcome_email` | Welcome email |

At checkout you can turn a guest into an `msCustomer` without the account form. Keys: `ms3_customer_auto_register_on_order` and `ms3_customer_auto_login_on_order`. Details: [Checkout](/en/components/minishop3/frontend/order).

## Relation to modUser

By default the account runs on `msCustomer` and the MS3 token. Turn on sync with `modUser` separately (`ms3_customer_sync_enabled` and related keys in [system settings](/en/components/minishop3/settings)) if you need MODX groups or shared ACL.

## See also

- [Customer profile](/en/components/minishop3/frontend/customer-profile)
- [msCustomer snippet](/en/components/minishop3/snippets/mscustomer)
- [REST API: customer](/en/components/minishop3/development/api#customer)
- [Frontend JavaScript: AuthUI](/en/components/minishop3/development/frontend-js)
