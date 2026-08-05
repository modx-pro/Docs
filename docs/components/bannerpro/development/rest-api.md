---
title: REST API
description: "REST API BannerPro v1.1: чтение и опциональная запись, Bearer-токен, CORS, rate limit"
---

# REST API

HTTP API для внешних систем: баннеры, позиции, статистика, audit и preset-шаблоны. Запись баннеров через JSON опциональна.

**Версия API:** `1.1.0` (константа `BANNERPRO_REST_VERSION` в `include/rest.php`).

Точка входа:

```text
assets/components/bannerpro/api.php
```

REST не использует сессию менеджера и ACL пользователя. Доступ только по ключу `bannerpro_api_key`. Записи в audit идут от username `rest-api`.

Connector админки (`connector.php`) работает отдельно: POST `action`, сессия `mgr`, права `bannerpro_*`.

## Включение

1. **Система → Настройки системы** → namespace **`bannerpro`**.
2. **`bannerpro_api_enabled`** = **Да**.
3. Скопируйте **`bannerpro_api_key`** ([Ключ API](#ключ-api)).
4. Для POST/PATCH: **`bannerpro_api_write_enabled`** = **Да**.

| Настройка | По умолчанию | Назначение |
| --- | --- | --- |
| `bannerpro_api_enabled` | `false` | Включает API |
| `bannerpro_api_key` | пусто | Bearer-токен (32 hex при install, если поле пустое) |
| `bannerpro_api_write_enabled` | `false` | POST/PATCH баннеров |
| `bannerpro_api_cors_origin` | пусто | CORS: `*`, origin или список через запятую |
| `bannerpro_api_rate_limit` | `0` | Запросов в минуту на ключ (`0` = без лимита) |

Подробнее: [Системные настройки](../settings#rest-api).

## Маршрутизация

Путь передают query-параметром **`route`** или **`path`**:

```text
https://example.com/assets/components/bannerpro/api.php?route=/ads&limit=10
```

Фильтры не вкладывайте в `route`:

```text
✓ ?route=/ads&tag=sale&limit=10
✗ ?route=/ads?tag=sale          → 404
```

PATH_INFO (`/api.php/ads`) на nginx часто отдаёт 404 MODX. Preflight **`OPTIONS`** → **204**, если настроен CORS.

## Ключ API

В примерах `curl` плейсхолдер **`YOUR_API_KEY`**: значение **`bannerpro_api_key`**.

| Способ | Путь |
| --- | --- |
| Менеджер | **Система → Настройки системы** → namespace `bannerpro` → **REST API ключ** |
| База | `modx_system_settings`, ключ `bannerpro_api_key` |

При установке или обновлении resolver записывает 32 hex-символа, если поле было пустым. После смены ключа очистите кэш MODX.

## Аутентификация

```http
Authorization: Bearer YOUR_API_KEY
```

| Способ | Пример |
| --- | --- |
| Заголовок | `Authorization: Bearer …` |
| `X-API-Key` | `X-API-Key: YOUR_API_KEY` |
| Query (не для prod) | `?api_key=YOUR_API_KEY` |

| Код | `message` | Причина |
| --- | --- | --- |
| `401` | `unauthorized` | Ключ отсутствует или неверен |
| `403` | `write disabled` | POST/PATCH при выключенном `bannerpro_api_write_enabled` |
| `404` | `not found` | Маршрут или сущность |
| `429` | `rate limit exceeded` | Превышен `bannerpro_api_rate_limit` (+ `Retry-After: 60`) |
| `503` | `api disabled` | Выключен `bannerpro_api_enabled` |

## Формат ответа

Успех:

```json
{
  "success": true,
  "data": {},
  "total": 0
}
```

Ошибка:

```json
{
  "success": false,
  "message": "not found"
}
```

List-эндпоинты отдают `total` в теле и заголовке **`X-Total-Count`**. При наличии соседних страниц добавляют заголовок **`Link`** (`rel="prev"` / `rel="next"`).

Параметр **`fields=id,name,active`** сужает проекцию полей.

Пагинация: `offset` (алиас `start`, default `0`), `limit` (default `20`, max **500**).

## Сводка маршрутов

| Метод | Маршрут | Write | Описание |
| --- | --- | --- | --- |
| GET | `/` | — | Discovery (версия, список routes) |
| GET | `/ads` | — | Список баннеров |
| GET | `/ads/{id}` | — | Баннер + счётчики |
| GET | `/ads/{id}/clicks` | — | Журнал кликов |
| POST | `/ads` | ✓ | Создать баннер |
| PATCH | `/ads/{id}` | ✓ | Обновить баннер |
| POST | `/ads/from-template` | ✓ | Из preset-шаблона |
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
| GET | `/templates` | — | Preset-шаблоны |

CRUD **позиций** через REST не реализован. DELETE баннеров через REST нет.

OpenAPI-описание в репозитории пакета: `docs/openapi.yaml`.

## GET /ads

| Параметр | Описание |
| --- | --- |
| `query` | Поиск по name/description |
| `active` | `0` / `1` |
| `type` | `image` / `html` |
| `product_id`, `category_id` | Таргетинг MS3 |
| `tag` | Метка |
| `position`, `mode` | `include` / `exclude` |
| `on_schedule` | `1`: только «на расписании сейчас» |
| `sort`, `dir` | `id`, `name`, `active`, `start`, `end` |
| `offset`, `limit`, `fields` | Пагинация, проекция |

В строке: `clicks`, `conversions`, `impressions`, `positions[]`, `current_image`, …

```bash
curl -s -H "Authorization: Bearer YOUR_API_KEY" \
  "https://example.com/assets/components/bannerpro/api.php?route=/ads&limit=10&active=1"
```

## GET /stats и подмаршруты

Общие параметры: `period` (default `all`), `from`, `to`, `position` (`0` = все).

| `period` | Алиасы |
| --- | --- |
| `all` | `overall` |
| `today` | — |
| `last_7_days` | `last7days`, `7days` |
| `this_week` | `thisweek` |
| `last_week` | `lastweek` |
| `this_month` | `thismonth`, `month` |
| `last_month` | `lastmonth` |
| `this_year` | `thisyear` |

Кастомный диапазон: `from` + `to` (`YYYY-MM-DD` или с временем).

`GET /stats/compare`: `base` (default `this_week`), `compare` (default `last_week`), `position` → объекты `base`, `compare`, `delta`.

`GET /stats/export` отдаёт CSV, не JSON. Параметр `type`: `clicks`, `impressions`, `referrers`, `report` / `summary`.

В сводке и `by_day` есть поле `conversions` (заказы MS3 с атрибуцией клика).

## GET /audit и GET /templates

**Audit:** фильтры `entity`, `action`, `sort` (default `id`), `dir` (default `DESC`), пагинация. Username в REST: `rest-api`.

**Templates:** preset-шаблоны из `bannerpro_ad_templates` + `defaults_data`.

## Запись (POST / PATCH)

Нужны `Content-Type: application/json` и `bannerpro_api_write_enabled=1`.

Whitelist полей: `name`, `url`, `image`, `source`, `active`, `description`, `type`, `html`, `start`, `end`, `newimage`, `product_id`, `category_id`, `max_clicks`, `max_impressions`, `show_hours`, `target_resource_id`, `target_parent_id`, `tags`, массив **`positions`**.

**POST /ads:** обязателен `name`. Audit: `create`.

**PATCH /ads/{id}:** поле `positions` — `[]` снимает все привязки, `[1,2]` заменяет список. Если `positions` нет в теле, привязки не меняются. Audit: `update`.

**POST /ads/from-template:** `{ "template_id": 1, "positions": [3] }`. Audit: `create_from_template`.

```bash
API="https://example.com/assets/components/bannerpro/api.php"
KEY="YOUR_API_KEY"

curl -s -X POST \
  -H "Authorization: Bearer ${KEY}" \
  -H "Content-Type: application/json" \
  -d '{"name":"REST Banner","type":"html","html":"<p>Hi</p>","positions":[3]}' \
  "${API}?route=/ads"
```

## CORS и rate limit

**CORS** (`bannerpro_api_cors_origin`): `*`, точный origin или список. Разрешённые методы: GET, POST, PATCH, OPTIONS.

**Rate limit:** bucket 1 минута на ключ в кэше MODX. При превышении ответ HTTP 429.

## Безопасность

- Write выключен по умолчанию.
- Не передавайте ключ во frontend.
- Ограничьте `api.php` по IP на веб-сервере для internal API.
- Используйте HTTPS.

## См. также

- [Системные настройки](../settings): ключи `bannerpro_api_*`.
- [События MODX](events): серверные события и connector actions.
- [FAQ](../faq): коды 401, 403, 429, 503.
