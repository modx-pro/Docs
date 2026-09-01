---
title: Контексты MODX
description: 'Multi-context в YandexMapsLocator: параметр context, allowlist'
---

# Контексты MODX

Локатор умеет multi-context: фильтрует по `context_key`, строит URL ресурса в его контексте и поднимает нужный контекст на endpoints.

## Сниппет

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

| Значение `context` | Поведение |
|--------------------|-----------|
| *(пусто)* | Текущий контекст страницы |
| `en` | Один контекст |
| `en,de` | Поиск по нескольким |

Разрешённый контекст уходит в `map_config.context` и в AJAX `search.php`.

## Настройки

| Ключ | Назначение |
|------|------------|
| `yandexmapslocator_default_context` | Fallback, если активный контекст недоступен (по умолчанию `web`). Также контекст CSV-экспорта Pro |
| `yandexmapslocator_allowed_contexts` | Allowlist. Пусто: любой существующий context key |

## Endpoints

`search.php` и Pro `api.php` принимают `context` или `ctx`:

```text
/assets/components/yandexmapslocator/search.php?parents=2080&context=en
```

Успешный ответ (`data` — массив Store, как `Store::toArray`):

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

Неизвестный или запрещённый контекст → `400 invalid_context`:

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

Успешный ответ (фрагмент):

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

Поле `context_key` только если перечислено в `fields`. `url` строится в контексте ресурса.

Неизвестный или запрещённый `context` (как у `search.php`):

```json
{
  "success": false,
  "error": "Invalid or disallowed context",
  "code": "invalid_context"
}
```

Деталь точки с тем же фильтром:

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

Точка из другого контекста или неопубликованная → `404 not_found`.
