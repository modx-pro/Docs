---
title: FAQ
description: Common questions about YandexMapsLocator Free and Pro
---

# FAQ

## How do Free and Pro differ?

Free: map, list, search, geolocation. Pro on the same UI adds open-now status (badges and filter), MiniShop3 product pickup on the product page, CSV in the manager, and REST. Table: [Free and Pro](free-vs-pro).

## Map is empty / does not load

- Is `yandexmapslocator_api_key` set?
- Is the key activated in the Yandex dashboard (up to 15 minutes)?
- Do Referer/IP restrictions in the dashboard match the site domain and server?

## Locations are not found

- Are resources published?
- Is `parents` correct?
- Are `latitude` / `longitude` filled in?
- Context: `context` parameter and `allowed_contexts`?

## search.php vs api.php

| | Free `search.php` | Pro `api.php` |
|---|-------------------|---------------|
| Same-origin locator AJAX | yes | optional |
| CORS / Bearer / `fields` | no | yes |
| Headless | no | yes |

## "Open now" always shows closed

- Is Pro installed?
- Is the TV a JSON schedule, not free text? Example: [Open now](pro/working-now).
- Does `yandexmapslocator_timezone` match the network?

## How to call open-only / pickup

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'filters' => 'working_now'
]}

{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'productId' => $_modx->resource.id,
    'filters' => 'minishop_product'
]}
```

```modx
[[!YandexMapsLocator? &parents=`42` &filters=`working_now`]]

[[!YandexMapsLocator?
    &parents=`42`
    &productId=`[[*id]]`
    &filters=`minishop_product`
]]
```

:::

More variants: [snippet](snippets/YandexMapsLocator).

## CSV exports the wrong locations

Export uses context `yandexmapslocator_default_context` (default `web`), not the manager context.

## Package provider not found (Pro)

Add provider [modstore.pro](https://modstore.pro/extras/) in the Installer.

## productId does not filter

Requires Pro, TV `ms3_product_id` on locations, and `filters=minishop_product`. Without Pro the parameter is reset.
