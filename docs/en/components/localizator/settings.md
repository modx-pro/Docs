---
title: System settings
---
# System settings

Component settings use the `localizator_` prefix.

**Where to change:** **Manage → System settings** — filter by name or find keys with the `localizator_` prefix.

## Required setting for pdoTools

For pdoTools snippets (pdoResources, pdoMenu, etc.) to fetch localized resources, set the system setting **pdoFetch.class** (pdotools namespace) to `pdotools.pdofetchlocalizator`.

## Page content output

All resource fields are replaced by localized values **except** the `content` field. Content is output via `$_modx->resource.localizator_content` (in Fenom: `{$_modx->resource.localizator_content}`).

## mFilter2

For mFilter2 to work correctly, set the system setting **mse2_filters_handler_class** to `mse2LocalizatorFilter`.

## Localizator settings table

| Setting | Default | Description |
|---------|---------|-------------|
| `localizator_default_language` | No | Default localization key (main language version) |
| `localizator_check_permissions` | No | Check permissions to edit resource localizations |
| `localizator_disabled_templates` | — | Comma-separated template IDs; the “Localizator” tab is hidden for resources using these templates |
| `localizator_default_translator` | Yandex | Translator for auto-translation: Yandex, Google, DeepL or empty (copy without translation) |
| `localizator_key_yandex` | No | API key for [Yandex Translate](https://translate.yandex.ru/developers/keys) |
| `localizator_key_google` | No | API key for Google Translate |
| `localizator_key_deepl` | No | API key for DeepL |
| `localizator_translate_fields` | pagetitle, longtitle, … | Fields to translate when auto-translating (including TVs) |
| `localizator_translate_translated` | No | When auto-translating, translate **empty** fields in existing localizations |
| `localizator_translate_translated_fields` | No | When auto-translating, overwrite all localization fields |
| `localizator_tv_fields` | No | TV names to edit in localizations. Empty — all TVs with “Available in localizations” enabled in TV settings; use a leading minus to exclude (e.g. `-image`) |

## site.com/en/ style setup

To support URLs like site.com/en/..., add rules to your web server config.

### Apache (.htaccess)

```apache
RewriteRule ^(ru|en)/assets(.*)$ assets$2 [L,QSA]
```

### Nginx

```nginx
location ~ ^/(ru|en) {
  rewrite ^/(ru|en)/(favicon.ico|assets.*)$ /$2 redirect;
  try_files $uri $uri/ @rewrite;
}
```
