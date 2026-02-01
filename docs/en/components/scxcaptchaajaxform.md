---
title: scxcaptchaAjaxForm
description: Non-blocking numeric CAPTCHA (5 digits) for AjaxForm and FormIt. Easy for humans, harder for bots.
logo: https://sait-modx.by/assets/images/components/scxcaptchaajaxform/logo_captha.png
author: sait-modx.by
---

# scxcaptchaAjaxForm

Non-blocking numeric CAPTCHA (5 digits) for **AjaxForm** and **FormIt**. Easy for humans, harder for bots. All names and classes use the `scx_` prefix.

**Documentation:**

## Quick start

```modx
[[!ScxCaptchaAjaxForm]]
```

### AjaxForm

```modx
[[!AjaxForm?
  &snippet=`FormIt`
  &form=`tpl.AjaxForm.example`
  &hooks=`ScxCaptchaAjaxFormHook,email`
  &validate=`name:required,email:required:email,scx_code:required`
]]
```

### FormIt

```modx
[[!FormIt?
  &hooks=`ScxCaptchaAjaxFormHook,email`
  &validate=`name:required,email:required:email,scx_code:required`
]]
[[!ScxCaptchaAjaxForm]]
```

## Requirements

MODX Revolution 2.8+ or 3.x

PHP 7.2+ (7.4 recommended)

GD + TrueType (for TTF font)

## Key features

- Snippet must be called uncached.
- Asset placement: head (default), inline, none.
- Validation via ScxCaptchaAjaxFormHook.
- Form fields: scx_hp, scx_ts, scx_code, scx_token.

### Snippet parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| ttl | 1200 | Token lifetime (seconds). |
| includeAssets | head | How to load CSS/JS: head, inline, none. |
| render | 1 | Return CAPTCHA HTML (1) or only assets (0). |

## Debugging

Add `&debug=1` to the URL: `captcha.php?...&debug=1` — outputs debug data.

If you see **Bad token**, check:

- uncached snippet call,
- single host/subdomain,
- correct asset loading,
- hidden af_action field present in AjaxForm.
