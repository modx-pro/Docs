---
title: Localizator
description: Multilingual, SEO and automation
author: modx-pro
modstore: https://modstore.pro/packages/utilities/localizator
repository: https://github.com/modx-pro/localizator

items: [
  { text: 'Snippet Localizator', link: 'snippet-localizator' },
  { text: 'Language switching', link: 'switch-languages' },
  { text: 'Events', link: 'events' },
  { text: 'Sitemap formation', link: 'sitemap-formation' },
  { text: 'Import in localization', link: 'import-in-localization' },
  { text: 'seoTemplates', link: 'seotemplates' },
  { text: 'hreflang attribute', link: 'hreflang-attribute' },
]
---
# Localizator

Localizator lets you create language versions / satellites without contexts, with automatic translation of all resource fields (including TVs) and lexicons.

- Friendly URLs must be enabled
- Requires pdoTools and MIGX

## Setup

Create "localization" pseudo-contexts (e.g. site.ru/en/ and ch.site.ru):

![pseudo-contexts](https://file.modx.pro/files/a/2/d/a2d8c479da8603723ac5b480e0e2408d.png)

Resources get a tab where you fill standard fields + SEO + TVs; a button then translates everything into other languages.

![Localizator tab](https://file.modx.pro/files/1/5/2/152cc01c77ac4a8a5c923cb7204f678f.png)
![Localization window](https://file.modx.pro/files/3/b/3/3b382b1f2be63655d70f844555369527.png)

### System settings

To use pdoTools snippets (pdoResources, pdoMenu) for localized resources, set `pdoFetch.class` to `pdotools.pdofetchlocalizator`.

All resource fields are replaced by localized values except `content`, which is output via `{$_modx->resource.localizator_content}`.

For mFilter2, set `mse2_filters_handler_class` to `mse2LocalizatorFilter`.

| Name                                    | Default                                                                                  | Description                                                                                                                                                                                                     |
|----------------------------------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **localizator_default_language**        | `No`                                                                                     | Default localization key                                                                                                                                                                                       |
| **localizator_default_translator**       | `Yandex`                                                                                 | Translator for auto-translation                                                                                                                                                                                |
| **localizator_key_yandex**              | `No`                                                                                     | API key for Yandex Translate, <https://translate.yandex.ru/developers/keys>                                                                                                                                     |
| **localizator_translate_fields**        | `pagetitle` `longtitle` `menutitle` `seotitle` `keywords` `introtext` `description` `content` | Fields to translate when using auto-translate (including TVs)                                                                                                                                                   |
| **localizator_translate_translated**    | `No`                                                                                     | When auto-translating, also translate EMPTY fields in existing localizations                                                                                                                                   |
| **localizator_translate_translated_fields** | `No`                                                                                     | When auto-translating, overwrite all localization fields                                                                                                                                                      |
| **localizator_tv_fields**               | `No`                                                                                     | TVs listed here are editable in localizations. Leave empty for all. Use minus prefix to exclude ('-image')                                                                                                    |

## site.ru/en/ style setup

### Apache2

Add a rule in **.htaccess**

```apache
RewriteRule ^(ru|en)/assets(.*)$ assets$2 [L,QSA]
```

### NGINX

```nginx
location ~ ^/(ru|en) {
  rewrite ^/(ru|en)/(favicon.ico|assets.*)$ /$2 redirect;
  try_files $uri $uri/ @rewrite;
}
```
