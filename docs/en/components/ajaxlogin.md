---
title: ajaxLogin
description: User authentication via ajax
logo: https://modstore.pro/assets/extras/ajaxlogin/logo-lg.png
author: modx-pro
modstore: https://modstore.pro/packages/users/ajaxlogin
repository: https://github.com/modx-pro/ajaxLogin
---

# ajaxLogin

Original component by Marat Marabar. Donated to the MODX community on June 13, 2023.

## Main features

- Login
- Registration
- Password recovery

All actions happen in a modal window; default styling uses Bootstrap 5.

## Dependencies

- [Login](https://docs.modx.com/current/en/extras/login/login) (required)
- [pdoTools](/en/components/pdotools/) (optional, for Fenom)

## ajaxLogin snippet

| Name | Default | Description |
|------|---------|-------------|
| **activationEmailTpl** | `ajaxLoginActivateEmailTpl` | Chunk for the email confirmation letter (Register snippet). |
| **activationResourceId** | | Resource ID for email confirmation after registration (Register snippet). |
| **emailTpl** | `ajaxLoginForgotPassEmailTpl` | Chunk for the password reset email (ForgotPassword snippet). |
| **errTpl** | `ajaxLoginErrTpl` | Error output chunk for Login and ForgotPassword. |
| **frontendCss** | | Path to the CSS file. |
| **frontendJs** | | Path to the JavaScript file. |
| **loginTpl** | `ajaxLoginFormTpl` | Chunk for the login form (Login snippet). |
| **logoutResourceId** | | Resource ID to redirect to on logout. If empty, current resource. |
| **registerTpl** | `ajaxLoginRegisterFormTpl` | Chunk for the registration form (Register snippet). |
| **resetResourceId** | | Resource ID for the password reset link from email. |
| **sentTpl** | `ajaxLoginForgotPassSentTpl` | Chunk shown after requesting password reset. |
| **tpl** | `ajaxLoginForgotFormTpl` | Chunk for the password recovery form (ForgotPassword snippet). |
| **tplAjax** | `ajaxLoginTpl` | Chunk split in two by a separator; one part shown for logged-in users, the other for guests. |
| **tplModal** | `ajaxLoginModalTpl` | Chunk for the modal window. |
| **tplType** | `embedded` | Tells Login and ForgotPassword where the form is. **Not recommended to change.** |
| **submittedResourceId** | | Redirect to this resource after registration. |

## Examples

Minimal working setup:

::: code-group

```modx
[[!ajaxLogin?
  &resetResourceId=`87`
  &emailSubject=`Password reset requested`
  &usergroups=`Users::Member`
  &activationEmailSubject=`Thanks for registering!`
  &activationResourceId=`84`
  &successMsg=`We sent a link to your email; please follow it to confirm your address.`
]]
```

```fenom
{'!ajaxLogin' | snippet: [
  'resetResourceId' => 10,
  'emailSubject' => 'Password reset requested',
  'usergroups' => 'Users::Member',
  'activationEmailSubject' => 'Thanks for registering!',
  'activationResourceId' => 84,
  'successMsg' => 'We sent a link to your email; please follow it to confirm your address.',
]}
```

:::
