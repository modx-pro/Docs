---
title: Quick start
description: 'Install Localizator3, languages, pdoTools, and first front-end output'
---

# Quick start

## Requirements

| Requirement | Description |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| VueTools | 1.1.2-pl+ |
| pdoTools | 2.11.3-pl or newer |
| Friendly URLs | enabled |

## Step 1: Install

1. Connect the [modstore.pro](https://modstore.pro/info/connection) provider.
2. Install **VueTools**, then **Localizator3**.
3. **Manage → Clear Cache**.

## Step 2: Default language

In system settings, set `localizator3_default_language` to one of your language keys (for example `en`). An empty value falls back to the first active language by rank. Without the setting and without an active language, manager auto-translation and the `translate_resources.php` CLI stop with an error.

## Step 3: Languages and localizations

1. Open the **Localizator3** menu (Localizations page) and create languages:
   - Localization key (`ru`, `en`)
   - Name
   - HTTP HOST
   - Language key
   - Active
2. On the TV form, enable «TV available in localizations» for the fields you need.
3. On a resource, open the **Localization** tab, pick a language, and save the localization. The **Automatic translation** button enables only for an already saved record. Then fill fields or run auto-translation.

URLs like `site.example/en/`: [System settings](settings#localizations-like-siteexampleen).

## Step 4: Front-end output

Resource fields are replaced with localized values. Field `content` goes to `localizator3_content`. In Fenom: `{$_modx->resource.localizator3_content}`.

Output resource lists with **getLocalizedResources**. The resolver sets `pdotools_fetch_class` = `ModxPro\PdoTools\FetchLocalizator`. The class is loaded by the namespace bootstrap, so localized selection via pdoTools works.

::: code-group

```fenom
{'!getLocalizedResources' | snippet : [
  'snippet' => 'pdoMenu',
  'parents' => 0,
  'level' => 1,
]}
```

```modx
[[!getLocalizedResources?
  &snippet=`pdoMenu`
  &parents=`0`
  &level=`1`
]]
```

:::

Language switcher: [Language switching](switch-languages). Snippet parameters: [getLocalizedResources](snippet-localizator).

## Next steps

- [System settings](settings): translators, 404, CLI
- [getLocalizedResources snippet](snippet-localizator): pdoMenu, products, mSearch, Fenom
- [hreflang attribute](hreflang-attribute) and [sitemap](sitemap-formation)
