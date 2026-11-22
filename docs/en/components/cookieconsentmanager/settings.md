---
title: Modes and settings
description: Strict and Legacy behavior, banner layouts, language settings and consent revisions.
---

# Modes and settings

## Strict — prior consent

This is the default mode. Enabled optional services are loaded only after the visitor allows their **visible assigned category**. Video and map embeds display a placeholder rather than a live iframe before permission.

## Legacy — before the first choice

Enable **Show legacy Accept button**. On the first visit with no stored decision, enabled services in visible categories may start **before a click**. Choosing Accept then records permission for all visible optional categories.

Legacy does **not** invent consent: `getConsent()` remains `null` until a decision, and Google Consent Mode is not sent fabricated granted signals. Saved rejection, partial choices and outdated consent are not bypassed.

::: danger
Legacy is not consent-first. Verify the privacy requirements applicable to your website before enabling it.
:::

## Banner position

The `banner_position` option accepts:

| Value | Appearance |
| --- | --- |
| `bottom` | Full-width bottom banner (default) |
| `bottom-right` | Compact lower-right card |
| `bottom-left` | Compact lower-left card |

Compact cards become a bottom banner on narrow screens. The translated heading is optional; an empty value is not rendered. Site CSS may override the appearance.

## Languages and text

Use **Texts** to translate headings, buttons, category names, service descriptions and embed placeholders. The MODX context `cultureKey` selects a language with a fallback. Google Maps and Yandex Maps can have provider-specific messages; if omitted, they use the generic external-content message. `{provider}` inserts the localized provider name.

Changing only wording or layout does not automatically invalidate existing visitor choices.

## Changes to categories

`necessary` is mandatory. Visitors may select visible `analytics`, `marketing` and `external_content` categories. Enabling or moving a service can change the version of an affected category and require a fresh choice. The administrator can also request new consent from everyone.

See [Services and categories](services).
