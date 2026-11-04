# BannerPro REST API

HTTP API для внешних систем: баннеры, позиции, статистика, audit и preset-шаблоны. Запись баннеров через JSON опциональна.

**Версия:** 1.1.0 (`BANNERPRO_REST_VERSION`)
**Точка входа:** `{site_url}assets/components/bannerpro/api.php`
**OpenAPI:** [openapi.yaml](openapi.yaml)
**Исходник маршрутов:** `core/components/bannerpro/include/rest.php`

Отличие от **connector** менеджера (`connector.php`): REST не использует MODX‑сессию и ACL пользователя — только Bearer‑ключ. Запись в audit идёт от username `rest-api`.

---

## Быстрый старт

```bash
API="https://example.com/assets/components/bannerpro/api.php"
KEY="YOUR_API_KEY"

curl -s -H "Authorization: Bearer ${KEY}" "${API}?route=/"
curl -s -H "Authorization: Bearer ${KEY}" "${API}?route=/ads&limit=5&active=1"
curl -s -H "Authorization: Bearer ${KEY}" "${API}?route=/stats/summary&period=today"
```

Демо после `seed_bannerpro_demo.php`: ключ `bannerpro-demo-key`, URL `https://project.test/assets/components/bannerpro/api.php`.

---

## Включение

1. **Система → Настройки системы** → namespace `bannerpro`.
2. **`bannerpro_api_enabled`** = **Да**.
3. Скопируйте **`bannerpro_api_key`**.
4. Для POST/PATCH: **`bannerpro_api_write_enabled`** = **Да**.

| Настройка | По умолчанию | Описание |
|---|---|---|
| `bannerpro_api_enabled` | `false` | Включить API |
| `bannerpro_api_key` | auto (32 hex при install) | Bearer‑токен |
| `bannerpro_api_write_enabled` | `false` | POST/PATCH баннеров |
| `bannerpro_api_cors_origin` | пусто | CORS: `*`, origin или список через запятую |
| `bannerpro_api_rate_limit` | `0` | Запросов/мин на ключ (`0` = без лимита) |

Подробнее: [configuration.md](../settings#rest-api).

---

## Маршрутизация

```text
https://example.com/assets/components/bannerpro/api.php?route=/ads&limit=10
```

Путь — query `route` или `path`. Фильтры **не** вкладывайте в `route`:

```text
✓ ?route=/ads&tag=sale&limit=10
✗ ?route=/ads?tag=sale          → 404
```

`PATH_INFO` (`/api.php/ads`) на nginx часто даёт 404 MODX. Preflight `OPTIONS` → `204` (при настроенном CORS).

---

## Сводная таблица маршрутов

| Метод | Маршрут | Write | Описание |
|---|---|---|---|
| GET | `/` | — | Discovery |
| GET | `/ads` | — | Список баннеров |
| GET | `/ads/{id}` | — | Баннер + счётчики |
| GET | `/ads/{id}/clicks` | — | Журнал кликов |
| POST | `/ads` | ✓ | Создать баннер |
| PATCH | `/ads/{id}` | ✓ | Обновить баннер |
| POST | `/ads/from-template` | ✓ | Из preset‑шаблона |
| GET | `/positions` | — | Список позиций |
| GET | `/positions/{id}` | — | Одна позиция |
| GET | `/positions/{id}/ads` | — | Баннеры позиции |
| GET | `/stats` | — | summary + by_day + top_ads |
| GET | `/stats/summary` | — | KPI |
| GET | `/stats/by-day` | — | По дням |
| GET | `/stats/top-ads` | — | Топ баннеров |
| GET | `/stats/referrers` | — | Referrer |
| GET | `/stats/export` | — | CSV |
| GET | `/stats/compare` | — | Сравнение периодов |
| GET | `/audit` | — | Журнал |
| GET | `/templates` | — | Preset‑шаблоны |

CRUD **позиций** через REST не реализован.

---

## Аутентификация

```http
Authorization: Bearer YOUR_API_KEY
```

| Способ | Пример |
|---|---|
| `Authorization` header | `Authorization: Bearer …` |
| `X-API-Key` header | `X-API-Key: YOUR_API_KEY` |
| Query (не для prod) | `?api_key=YOUR_API_KEY` |

### HTTP‑коды

| Код | `message` | Причина |
|---|---|---|
| 200 | — | Успех |
| 204 | — | OPTIONS |
| 400 | `invalid id`, `name required`, … | Невалидный запрос |
| 401 | `unauthorized` | Неверный ключ |
| 403 | `write disabled` | Write выключен |
| 404 | `not found` | Маршрут / сущность |
| 429 | `rate limit exceeded` | Rate limit (+ `Retry-After: 60`) |
| 503 | `api disabled` | API выключен |

---

## Формат ответа

```json
{ "success": true, "data": {}, "total": 0 }
```

Ошибка: `{ "success": false, "message": "..." }`.

### Пагинация

| Параметр | Default | Max |
|---|---|---|
| `offset` (`start`) | `0` | — |
| `limit` | `20` | **500** |

`total` — в теле JSON и в заголовке `X-Total-Count`. При наличии следующих/предыдущих страниц — заголовок `Link` (`rel="prev"` / `rel="next"`) с сохранением `route` и фильтров.

### Проекция: `fields=id,name,active`

Параметр **`fields`** (CSV) фильтрует поля в ответе. Пример: `?fields=id,name,active` вернёт только эти ключи. Работает для одиночных объектов и списков.

---

## GET /ads

| Параметр | Описание |
|---|---|
| `query` | Поиск по `name`/`description` |
| `active` | `0` / `1` |
| `type` | `image` / `html` |
| `product_id` | ID продукта (MS3) |
| `category_id` | ID категории (MS3) |
| `tag` | Метка (строка) |
| `position` | ID позиции (фильтрация) |
| `mode` | `include` (по умолчанию) / `exclude` – инверсия фильтра |
| `on_schedule` | `1` — только «на расписании сейчас» |
| `sort`, `dir` | `id`, `name`, `active`, `start`, `end` |
| `offset`, `limit`, `fields` | Пагинация, проекция |

Строка: `clicks`, `conversions`, `impressions`, `positions[]`, `current_image`, …

---

## Позиции

### GET /positions

Параметры: `sort` (`id`, `name`), `dir`, пагинация, `fields`. Строка: `clicks`.

### GET /positions/{id}

+ `ads_total`, `clicks`.

### GET /positions/{id}/ads

Как `/ads` с `position={id}`.

---

## Статистика

Общие параметры: `period` (default `all`), `from`, `to`, `position` (0 = все).

| Эндпоинт | `data` |
|---|---|
| `/stats` | `{ summary, by_day, top_ads }` |
| `/stats/summary` | объект KPI |
| `/stats/by-day` | массив по дням |
| `/stats/top-ads` | массив; `limit` default 10 |
| `/stats/referrers` | массив; пагинация |

---

## GET /audit

`entity`, `action`, `sort` (default `id`), `dir` (default `DESC`), пагинация. REST: `username` = `rest-api`.

---

## GET /templates

Preset‑шаблоны + `defaults_data`.

---

## Запись (POST / PATCH)

`Content-Type: application/json`, `bannerpro_api_write_enabled=1`.

### Whitelist полей

`name`, `url`, `image`, `source`, `active`, `description`, `type`, `html`, `start`, `end`, `newimage`, `product_id`, `category_id`, `max_clicks`, `max_impressions`, `show_hours`, `target_resource_id`, `target_parent_id`, `tags`, массив **`positions`**.

### POST /ads

Обязателен `name`. Audit: `create`.

Параметр **`positions`** — массив ID позиций (`[1,2,3]`) или CSV (`"1,2,3"`). Пустой массив `[]` не привязывает баннер к позициям.

### PATCH /ads/{id}

| `positions` | Поведение |
|---|---|
| не в теле | привязки не меняются |
| `[]` | удалить все |
| `[1,2]` | заменить |

Audit: `update`.

---

## CORS и rate limit

**CORS** (`bannerpro_api_cors_origin`): `*`, точный origin или список. Методы: GET, POST, PATCH, OPTIONS.

Заголовки CORS:

+ `Access-Control-Allow-Origin`: `*` или origin из whitelist
+ `Access-Control-Allow-Methods`: GET, POST, PATCH, OPTIONS
+ `Access-Control-Allow-Headers`: Authorization, Content-Type, X-API-Key
+ `Access-Control-Expose-Headers`: X-Total-Count, Link
+ `Access-Control-Max-Age`: 86400 (24 часа)

**Rate limit:** bucket 1 мин/ключ в MODX cache → 429 при превышении. Заголовок `Retry-After: 60`.

---

## Безопасность

+ Write выключен по умолчанию.
+ Не передавайте ключ во frontend.
+ Ограничьте `api.php` по IP для internal API.
+ Используйте HTTPS.

---

## Smoke‑тест

```bash
bash _build/verify-rest-curl.sh
# BANNERPRO_API_URL=... BANNERPRO_API_KEY=...
```

Кратко: `_build/verify-demo-curl.sh` (секции 41–44).

---

## См. также

+ [Системные настройки](../settings)
+ [События MODX](../events)
+ [FAQ](../faq)
+ [OpenAPI‑описание](openapi.yaml)
+ [Roadmap](../roadmap)
