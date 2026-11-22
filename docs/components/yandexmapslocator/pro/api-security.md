---
title: Безопасность API
description: Настройки безопасности REST YandexMapsLocator Pro
---

# Безопасность API

Ключи `yandexmapslocator_api_*` ставит Free. URL и выключатель оживают после Pro. Лимит list считается отдельно для REST (бакет `locations`) и отдельно для Free `search.php` (бакет `search`).

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
| `yandexmapslocator_api_list_rate_limit` | Два независимых счётчика: бакет `locations` на REST и бакет `search` на `search.php` |
| `yandexmapslocator_api_geocode_rate_limit` | Геокод дороже по квоте Яндекса. Счётчик общий для REST и `search.php` |

Полный список: [Системные настройки](../settings#rest-i-limity-yandexmapslocatorapi).

## Заголовки ответа

- `Content-Type: application/json; charset=utf-8`
- `X-Content-Type-Options: nosniff`
- List: `Cache-Control: public, max-age=60` только если токен пуст, нет заголовка `Authorization` и набор `fields` из короткого публичного списка. Иначе `private, max-age=60`. Любой непустой `include` (`resource` или `tv`) тоже уводит ответ в `private`
- Успешный geocode: `Cache-Control: private, max-age=60`
- `meta`: без `Cache-Control` вовсе. Правила кеширования выше относятся только к `locations` и `geocode`
- Ошибки: `Cache-Control: no-store`
- CORS только из белого списка
- `429` + `Retry-After: 60` при превышении лимита

С `127.0.0.1`, `::1` и системной `debug` лимит не режет. Поиск по `address` в `search.php` тратит бакет geocode так же, как REST.

Страницы админки Pro кэшировать нельзя: в HTML уходит `window.yandexMapsLocatorProMgr` с `connectorUrl` и менеджерским токеном `modAuth`.

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

REST не отдаёт `apiKey` Яндекс.Карт в JSON. Но в HTML страницы со сниппетом ключ **есть**: он лежит в конфиге карты, который сниппет печатает инлайном в `<script type="application/json" data-yml-config>`, а браузер потом дописывает его к URL скрипта карт. Ключ JS API по определению публичный, так что ограничивайте его в кабинете Яндекса по домену и Referer, а не прячьте. См. [FAQ](../faq#karta-pustaya-ne-gruzitsya).

`yandexmapslocator_api_token` в `data-yml-config` не попадает. Локатор на сайте с заданным токеном ходит в `search.php`.

`where` в REST и `search.php` запрещён (`400 where_not_allowed`).

`search.php` проверяет параметры строже REST: `include`, `fields` и `route` в нём запрещены (`400 invalid_param`), пустой `parents` даёт `400 parents_required`, неизвестный или запрещённый контекст — `400 invalid_context`, любой метод кроме GET — `405 method_not_allowed`.

Без Pro параметр `product_id` сбрасывается даже если передан в запросе.
