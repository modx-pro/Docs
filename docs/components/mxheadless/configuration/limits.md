---
title: Лимиты
description: Rate limit, размер тела, pagination и include limits mxHeadless
---

# Лимиты

## Rate limit

| Ключ | По умолчанию |
| --- | --- |
| `mxheadless_rate_limit_enabled` | `true` |
| `mxheadless_rate_limit_max_requests` | `120` |
| `mxheadless_rate_limit_window_seconds` | `60` |

При `false` middleware пропускает запрос без счётчика и без заголовков.

Ключ учёта: `sha1(identity + ':' + ip)`, где ip взят после [trusted proxies](trusted-proxies). Лимит и окно можно переопределить на уровне ключа: колонки `rate_limit_max` и `rate_limit_window` в `mxheadless_api_keys` и `mxheadless_oauth_clients`.

Лимит считается в кэше MODX (namespace `mxheadless/rate_limit`) по фиксированному окну: счётчик сбрасывается по истечении `mxheadless_rate_limit_window_seconds`, запись в кэш имеет TTL до конца окна. Счётчик обновляется read-modify-write без блокировки, поэтому при параллельных запросах фактическое число запросов может ненадолго превысить лимит. При `limit <= 0` запросы не ограничиваются.

Заголовки успешного ответа: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (unix-время сброса).

Исчерпание лимита → `429` с кодом `rate_limited` и заголовком `Retry-After` (секунды до сброса, минимум 1):

```text
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1789000060
Retry-After: 42
```

## Размер запроса

| Ключ | По умолчанию | Превышение |
| --- | --- | --- |
| `mxheadless_max_body_bytes` | `1048576` (1 MB) | `413` по `Content-Length` |
| `mxheadless_max_uri_bytes` | `2048` | `414` по длине path |

`mxheadless_max_uri_bytes` считает только path. Длинный `filter[...]` в query под лимит не попадает: при `GET /api/v1/resources?filter[<2000 символов>]` 414 не будет.

Проверка идёт до маршрутизации, поэтому лимит действует и на несуществующий путь.

## Query

| Ключ | По умолчанию | Нарушение |
| --- | --- | --- |
| `mxheadless_max_limit` | `100` | `limit` тихо урезается до 100 |
| `mxheadless_max_offset` | `100000` | `offset` тихо урезается до 100000 |
| `mxheadless_max_fields` | `50` | `422` `validation_failed`, поле `fields` |
| `mxheadless_max_include_relations` | `10` | `422` `validation_failed`, поле `include` |
| `mxheadless_max_include_depth` | `2` | `422` `validation_failed`, поле `include` |
| `mxheadless_allowed_contexts` | `web,mgr` | `422` `validation_failed`, поле `context` |

Эти шесть ключей транспорт не создаёт: в `_build/elements/settings.php` их нет, в админке они не появятся. Задавайте их в `core/config/config.inc.php` или через `getOption`.

Глубина include считается по точкам в пути связи: `category` это глубина 1, `category.parent` это глубина 2.

Значение `limit` по умолчанию 20. `limit` меньше 1 → `422`. Одновременное использование `page` и `offset` → `422`.

См. также [Запросы](../api/querying).
