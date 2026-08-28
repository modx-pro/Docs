---
title: Безопасность API
description: Настройки безопасности REST YandexMapsLocator Pro
---

# Безопасность API

Ключи `yandexmapslocator_api_*` ставит Free. Endpoint и kill switch оживают после Pro. Rate limit list режет и Free `search.php`.

## Pipeline

Request → `ApiSecurityMiddleware` (enabled, Bearer, rate limit, CORS) → парсер → валидация parents → controller → serializers → JSON + security headers.

## Ключевые настройки

| Ключ | Рекомендация на production |
|------|----------------------------|
| `yandexmapslocator_api_enabled` | Да. Выключайте при инциденте |
| `yandexmapslocator_api_token` | Задайте длинный секрет, не оставляйте пустым |
| `yandexmapslocator_api_cors_origins` | Точные origins фронта, не `*` |
| `yandexmapslocator_api_allowed_parents` | Ограничьте контейнеры точек |
| `yandexmapslocator_api_resource_tvs` | Whitelist TV для `include=tv` |
| `yandexmapslocator_api_trust_proxy` | Да только за доверенным reverse proxy |
| `yandexmapslocator_api_list_rate_limit` | Под нагрузку сети |
| `yandexmapslocator_api_geocode_rate_limit` | Геокод дороже по квоте Яндекса |

Полный список: [Системные настройки](../settings#rest-и-лимиты-yandexmapslocator_api).

## Заголовки ответа

- `Content-Type: application/json; charset=utf-8`
- `X-Content-Type-Options: nosniff`
- List: `Cache-Control: public, max-age=60`
- Geocode: `Cache-Control: no-store`
- CORS только из allowlist
- `429` + `Retry-After: 60` при превышении лимита

Примеры тел ошибок:

```json
{
  "success": false,
  "error": "Unauthorized",
  "code": "unauthorized"
}
```

```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "code": "rate_limit_exceeded"
}
```

```json
{
  "success": false,
  "error": "API is disabled",
  "code": "api_disabled"
}
```

## Что не отдаёт API

REST не включает `apiKey` Яндекс.Карт в JSON. Ключ на странице сниппета попадает только в URL скрипта карт в браузере.

`where` в REST и `search.php` запрещён.

Без Pro параметр `product_id` сбрасывается даже если передан в запросе.
