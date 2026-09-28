---
title: Безопасность API
description: Настройки безопасности REST YandexMapsLocator Pro
---

# Безопасность API

Ключи `yandexmapslocator_api_*` ставит Free. URL и выключатель оживают после Pro. Лимит list режет и Free `search.php`.

## Обработка запроса

Запрос → `ApiSecurityMiddleware` (включён, Bearer, лимит, CORS) → парсер → проверка parents → controller → serializers → JSON + заголовки безопасности.

## Ключевые настройки

| Ключ | Рекомендация на рабочем сайте |
|------|----------------------------|
| `yandexmapslocator_api_enabled` | Да. Выключайте при инциденте |
| `yandexmapslocator_api_token` | Длинный секрет для серверных клиентов. В HTML локатора не попадает |
| `yandexmapslocator_api_cors_origins` | Точные origins сайта, не `*` |
| `yandexmapslocator_api_allowed_parents` | Ограничьте контейнеры точек |
| `yandexmapslocator_api_resource_tvs` | Белый список TV для `include=tv` |
| `yandexmapslocator_api_trust_proxy` | Да только за доверенным обратным прокси |
| `yandexmapslocator_api_list_rate_limit` | Под нагрузку сети |
| `yandexmapslocator_api_geocode_rate_limit` | Геокод дороже по квоте Яндекса |

Полный список: [Системные настройки](../settings#rest-и-лимиты-yandexmapslocator_api).

## Заголовки ответа

- `Content-Type: application/json; charset=utf-8`
- `X-Content-Type-Options: nosniff`
- List: `Cache-Control: public, max-age=60` только если токен пуст, нет заголовка `Authorization` и набор `fields` из короткого публичного списка. Иначе `private, max-age=60`
- Успешный geocode: `Cache-Control: private, max-age=60`
- Ошибки: `Cache-Control: no-store`
- CORS только из белого списка
- `429` + `Retry-After: 60` при превышении лимита

С `127.0.0.1`, `::1` и системной `debug` лимит не режет. Поиск по `address` в `search.php` тратит бакет geocode так же, как REST.

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

`yandexmapslocator_api_token` в `data-yml-config` не попадает. Локатор на сайте с заданным токеном ходит в `search.php`.

`where` в REST и `search.php` запрещён (`400 where_not_allowed`).

Без Pro параметр `product_id` сбрасывается даже если передан в запросе.
