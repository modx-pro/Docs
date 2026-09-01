---
title: MODX contexts
description: 'Multi-context in YandexMapsLocator: context parameter, allowlist'
---

# MODX contexts

The locator supports multi-context: it filters by `context_key`, builds the resource URL in that context, and initializes the requested context on endpoints.

## Snippet

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 2080,
    'context' => 'en'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`2080`
    &context=`en`
]]
```

:::

| `context` value | Behavior |
|--------------------|-----------|
| *(empty)* | Current page context |
| `en` | Single context |
| `en,de` | Search across multiple contexts |

The resolved context is sent in `map_config.context` and in AJAX `search.php`.

## Settings

| Key | Purpose |
|------|------------|
| `yandexmapslocator_default_context` | Fallback when the active context is unavailable (default `web`). Also Pro CSV export context |
| `yandexmapslocator_allowed_contexts` | Allowlist. Empty = any existing context key |

## Endpoints

`search.php` and Pro `api.php` accept `context` or `ctx`:

```text
/assets/components/yandexmapslocator/search.php?parents=2080&context=en
```

Successful response (`data` is a Store array, as in `Store::toArray`):

```json
{
  "success": true,
  "data": [
    {
      "id": 2085,
      "pagetitle": "Store on Broadway",
      "address": "Broadway 10, New York",
      "latitude": 40.71,
      "longitude": -74.01,
      "url": "https://example.com/en/stores/broadway/",
      "context_key": "en",
      "distance": null,
      "distance_formatted": ""
    }
  ],
  "meta": { "total": 3 }
}
```

Unknown or disallowed context → `400 invalid_context`:

```json
{
  "success": false,
  "error": "Invalid or disallowed context",
  "code": "invalid_context"
}
```

## REST (Pro)

```text
?route=api/v1/locations&parents=5&context=en&fields=id,title,address,url,context_key,coordinates
```

Successful response (excerpt):

```json
{
  "success": true,
  "data": [
    {
      "id": 2085,
      "title": "Store on Broadway",
      "address": "Broadway 10, New York",
      "url": "https://example.com/en/stores/broadway/",
      "context_key": "en",
      "coordinates": { "lat": 40.71, "lon": -74.01 }
    }
  ],
  "meta": { "total": 3, "limit": 20, "offset": 0 }
}
```

`context_key` is returned only when listed in `fields`. `url` is built in the resource context.

Unknown or disallowed `context` (same as `search.php`):

```json
{
  "success": false,
  "error": "Invalid or disallowed context",
  "code": "invalid_context"
}
```

Location detail with the same filter:

```text
?route=api/v1/locations/2085&context=en&fields=id,title,url,context_key
```

```json
{
  "success": true,
  "data": {
    "id": 2085,
    "title": "Store on Broadway",
    "url": "https://example.com/en/stores/broadway/",
    "context_key": "en"
  }
}
```

A location from another context or unpublished → `404 not_found`.
