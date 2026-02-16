---
title: Quick start
---
# Quick start

Step-by-step setup of multilingual content with Localizator.

## Requirements

| Requirement | Description |
|-------------|-------------|
| MODX Revolution | 2.x / 3.x |
| PHP | 7.4+ |
| pdoTools | installed |
| MIGX | installed |
| Friendly URLs | enabled |

## Step 1: Installation

1. Go to **Extras → Installer**
2. Find **Localizator** in the list of available packages
3. Click **Download** and then **Install**
4. **Manage → Clear cache**

## Step 2: System setting for pdoTools

For pdoTools snippets (pdoResources, pdoMenu, etc.) to output localized resources, set the system setting **pdoFetch.class** to `pdotools.pdofetchlocalizator`.

**Where to change:** **Manage → System settings** — find `pdoFetch.class` (pdotools namespace) and set it to `pdotools.pdofetchlocalizator`.

## Step 3: Creating languages and localizations

1. In the Manager, create “localizations” (pseudo-contexts) — language versions, e.g. site.com/ and site.com/en/
2. Resources will get a **“Localizator”** tab: fill fields per language; use the button to translate all fields into other languages (auto-translate or copy)

For web server setup for paths like site.com/en/, see [System settings](settings#site-com-en-style-setup).

## Step 4: Outputting content on the site

Page content: the `content` field is output via `localizator_content`; other resource fields are replaced with localized values automatically. For resource lists use the **Localizator** snippet, passing it the pdoTools snippet name.

::: code-group

```fenom
{'!Localizator' | snippet : [
  'snippet' => 'pdoMenu',
  'parents' => 0,
  'level' => 1,
]}
```

```modx
[[!Localizator?
  &snippet=`pdoMenu`
  &parents=`0`
  &level=`1`
]]
```

:::

See: [Snippet Localizator](snippet-localizator), [Language switching](switch-languages).

## What next

- [System settings](settings) — translators, fields to translate, TVs, Apache/Nginx rules
- [Snippet Localizator](snippet-localizator) — parameters and examples with pdoPage, mFilter2, msProducts
- [Language switching](switch-languages) — getLocales and custom getLanguages
