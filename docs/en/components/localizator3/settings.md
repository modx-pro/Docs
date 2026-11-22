---
title: System settings
description: 'localizator3_* keys, translators, CLI, and site.example/en/ paths'
---

# System settings

Key prefix: `localizator3_`. Namespace: `localizator3`.

**Where to edit:** **System → System Settings**, filter by `localizator3`.

## Selection via pdoTools

Output localized lists with the **getLocalizedResources** snippet. On install and upgrade the resolver creates or overwrites `pdotools_fetch_class` = `ModxPro\PdoTools\FetchLocalizator` (extends `Fetch`). The class is loaded by the Localizator3 namespace bootstrap via Composer PSR-4.

## Content output on the page

The plugin assigns resource fields from `localizator3_translate_fields`. The `content` field is written to `localizator3_content` and does not replace resource `content`. Non-empty TVs from `getTVKeys()` are assigned to the resource.

```fenom
{$_modx->resource.localizator3_content}
```

The **Localization** tab shows only TVs with the `localizator3_enabled` flag on the TV form.

## Main settings

| Key | Default | Description |
| --- | --- | --- |
| `localizator3_default_language` | empty | Default language. Empty value falls back to the first active language by rank: site, selection, mSearch, auto-translation, CLI, and blocking localization of the base language. The base language is hidden on the tab only when the setting is filled. Without the setting and without an active language, auto-translation and CLI stop with an error |
| `localizator3_default_from_resource` | No | Base language from resource fields and TVs. The tab keeps translations only |
| `localizator3_check_permissions` | No | Enforce LocalizatorManagerPolicy permissions |
| `localizator3_disabled_templates` | empty | Template IDs without the Localization tab, comma-separated |
| `localizator3_404_if_no_localization` | No | Return 404 when localization is missing. Skipped without a language key and for the base language when `localizator3_default_from_resource` is on. Before the response: `OnHasLocalizatorError404`; `false` cancels the 404 |
| `localizator3_auto_detect_language` | No | No language segment in the URL: request param, else `localizator3_key` cookie, else Accept-Language. Then 302 redirect to the language `http_host` plus the current request path |
| `localizator3_request_language_param` | `language` | Parameter name in `$_REQUEST`. Value must be an active key matching `^[a-z]{2}(-[a-z0-9]{2,8})?$`. Empty name disables the check |
| `localizator3_debug_log` | No | Extra `$modx->log` lines with prefixes like `[localizator3 getformconfig]`. With the setting on, some lines are INFO, some DEBUG. TV render errors are always ERROR. The same toggle is `LOCALIZATOR3_DEBUG_LOG`. Target is the MODX log (usually `core/cache/logs/error.log`). DEBUG needs `log_level` not stricter than DEBUG |

## Translator

| Key | Default | Description |
| --- | --- | --- |
| `localizator3_default_translator` | Yandex | `Yandex`, `Google`, `DeepL`, `LibreTranslate`, `MyMemory`, `SimpleCopy` |
| `localizator3_key_yandex` | empty | Yandex Translate API key |
| `localizator3_key_google` | empty | Google Cloud Translation API key |
| `localizator3_key_deepl` | empty | DeepL API key |
| `localizator3_libretranslate_url` | `http://localhost:5000` | LibreTranslate URL |
| `localizator3_key_libretranslate` | empty | LibreTranslate API key |
| `localizator3_mymemory_email` | empty | Email for MyMemory |
| `localizator3_translate_fields` | pagetitle, longtitle, menutitle, seotitle, keywords, introtext, description, content | Auto-translation fields |
| `localizator3_translate_translated` | No | Translate empty fields on existing resource localizations |
| `localizator3_translate_translated_fields` | No | Resource: overwrite non-empty `translate_fields` only when `localizator3_translate_translated` is Yes. Lexicon: this flag alone is enough |

`SimpleCopy` copies text without calling an API.

## CLI: bulk translation

Without `localizator3_default_language` and without an active language the script writes to stderr and exits with code 1.

```bash
cd core/components/localizator3/scripts
php translate_resources.php --parents=1 --depth=5
php translate_resources.php --ids=1,2,3 --dry-run
```

In one run only the first of `--ids` and `--parents` in the arguments is used. The other is ignored.

| Parameter | Description |
| --- | --- |
| `--ids=1,2,3` | Resource IDs |
| `--parents=1` | Parent |
| `--depth=5` | Depth with `--parents` (default 10) |
| `--dry-run` | Plan without writes |

Environment variables: `MODX_BASE_PATH`, `LOCALIZATOR_CONTEXT` (default `web`).

## Localizations like site.example/en/ {#localizations-like-siteexampleen}

For `site.example/en/...` configure the web server. The samples below are not part of the package. PHP routing looks at `http_host` and the first URL segment.

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
