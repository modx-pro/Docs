---
title: FAQ
description: Common questions about YandexMapsLocator Free and Pro
---

# FAQ

## How do Free and Pro differ?

Free: map, list, search, geolocation. Pro adds "open now" (badges and filter), MiniShop3 pickup on the product page, CSV in the manager, and REST on the same UI. Table: [Free and Pro](free-vs-pro).

## Empty map / map does not load

- Is `yandexmapslocator_api_key` set?
- Is the key active in the Yandex dashboard (up to 15 minutes)?
- Do Referer/IP in the dashboard match the site domain and server?

## Locations not found

- Are resources published?
- Correct `parents`?
- Are `latitude` / `longitude` filled?
- Context: `context` parameter and `allowed_contexts`?

## search.php vs api.php

| | Free `search.php` | Pro `api.php` |
|---|-------------------|---------------|
| Same-origin locator AJAX | yes | optional |
| CORS / Bearer / `fields` | no | yes |
| Headless | no | yes |

## "Open now" always closed

- Is Pro installed?
- JSON schedule in the TV, not plain text? Example: [Open now](pro/working-now).
- Timezone: TV `yandexmaps_timezone` on the location or network `yandexmapslocator_timezone`?

## Open only / pickup only

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

More examples: [snippet](snippets/YandexMapsLocator).

## CSV exports wrong locations

Export uses context `yandexmapslocator_default_context` (default `web`), not the mgr context.

## Package provider not found (Pro)

Add the [modstore.pro](https://modstore.pro/extras/) provider in the Installer.

## productId does not filter

You need Pro and TV `ms3_product_ids` or `ms3_product_id` on locations. Parameter `productId` enables the filter automatically. Without Pro the value is reset.
