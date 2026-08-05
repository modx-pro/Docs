---
title: REST API
---
# REST API

Базовый URL:

```text
https://ваш-сайт/assets/components/reactions/api.php
```

Файл точки входа: `assets/components/reactions/api.php` (загружает bootstrap и вызывает `Reactions\Api\Router`).

## Маршрутизация

Действие задаётся параметром `action` или `PATH_INFO`:

```http
GET  /assets/components/reactions/api.php?action=counts
GET  /assets/components/reactions/api.php/counts
POST /assets/components/reactions/api.php?action=react
GET  /assets/components/reactions/api.php?action=admin/types
```

Вложенные admin-ресурсы: `action=admin/types`, `admin/sets`, `admin/bans`, `admin/stats`.

Метод HTTP берётся из `REQUEST_METHOD`. Для клиентов без DELETE можно эмулировать:

- `POST` + поле тела `_method=DELETE`, или
- `POST` + `$_POST['_method']=DELETE`.

## Формат ответов

Все ответы — JSON (`JSON_UNESCAPED_UNICODE`). Поле `success` всегда присутствует.

Успех (поля верхнего уровня зависят от endpoint):

```json
{
  "success": true,
  "data": { },
  "csrf": "…"
}
```

Ошибка:

```json
{
  "success": false,
  "error": "Человекочитаемое описание",
  "code": "error_code"
}
```

### Коды ошибок и HTTP-статусы

| `code` | HTTP | Когда |
| --- | --- | --- |
| `validation_error` | 400 | Нет обязательных полей (`class_key`, `object_id`, `type`…) |
| `bad_request` | 400 | Пустой `action` |
| `not_found` | 404 | Неизвестный action / объект / тип / набор |
| `method_not_allowed` | 405 | Неверный HTTP-метод для endpoint |
| `forbidden` | 403 | CSRF/Origin/nonce, бан, бот, тип вне набора/`full_types`, отмена плагином |
| `auth_required` | 401 | Admin без `reactions_manage`. Стратегия `auth_only` для гостя |
| `rate_limit` | 429 | Превышен `reactions_rate_limit` |
| `internal_error` | 500 | Непойманное исключение (детали в `error.log`) |
| `save_failed` | 500 | Admin: не удалось сохранить объект |

---

## Обзор публичных endpoint

| Method | action | Описание | CSRF |
| --- | --- | --- | --- |
| GET | `csrf` | Выдать CSRF-токен | нет |
| GET | `counts` | Счётчики + реакции текущего посетителя | нет |
| POST | `react` | Поставить / переключить реакцию | да |
| DELETE | `react` | Снять реакцию | да |
| GET | `top` | Топ по likes / rating / total | нет |
| GET | `trending` | Топ по `trending_score` | нет |
| GET | `latest` | Лента последних реакций | нет |

GET-эндпоинты кэшируются на стороне CDN только если вы сами так настроите. Ответ `counts` зависит от cookie/сессии (`user_reaction`) — **не** кэшируйте его публично.

---

## GET csrf

Выдаёт токен, привязанный к PHP-сессии (`$_SESSION['reactions_csrf']`). Новый вызов перезаписывает предыдущий токен.

```bash
curl -c cookies.txt \
  "https://example.com/assets/components/reactions/api.php?action=csrf"
```

Ответ:

```json
{
  "success": true,
  "csrf": "a1b2c3d4e5f6…"
}
```

Дальше передавайте cookie сессии (`-b cookies.txt`) во все запросы, которым нужен тот же CSRF.

JS-виджет делает этот запрос сам, если `data-csrf` пустой.

---

## GET counts

Счётчики по объекту и список типов реакций текущего посетителя (по fingerprint / user_id).

| Параметр | Обязательный | Описание |
| --- | --- | --- |
| `class_key` | да | Класс объекта (`modResource`, `msProduct`, `TicketComment`…) |
| `object_id` | да | ID объекта (> 0) |
| `context` | нет | Контекст. По умолчанию `web` |

```bash
curl -b cookies.txt \
  "https://example.com/assets/components/reactions/api.php?action=counts&class_key=modResource&object_id=1&context=web"
```

Ответ:

```json
{
  "success": true,
  "data": {
    "class_key": "modResource",
    "object_id": 1,
    "context": "web",
    "counts": {
      "like": 42,
      "dislike": 3,
      "love": 7
    },
    "total": 52,
    "user_reaction": ["like"]
  }
}
```

- `counts` — ассоциативный массив имя типа → число.
- `total` — сумма всех типов в агрегате.
- `user_reaction` — массив имён типов, которые уже стоят у текущего посетителя (может быть пустым или содержать несколько имён, если разрешён multi).

---

## POST react

Поставить реакцию. Повторный POST того же типа обычно **снимает** её (toggle). В exclusive-режиме (`updown` или `!allow_multiple`) другой тип заменяет предыдущий (`action=changed`).

### Тело (JSON)

| Поле | Обязательное | Описание |
| --- | --- | --- |
| `csrf` | да | Токен из `GET csrf` |
| `nonce` | да | Одноразовая строка (рекомендуется 32 hex). TTL 300 с, не более ~50 активных в сессии |
| `class_key` | да | Класс объекта |
| `object_id` | да | ID |
| `type` | да | Имя типа (`like`, `love`, `fire`…) |
| `context` | нет | По умолчанию `web` |
| `set` | нет | Ключ набора для валидации типа. Пусто → `reactions_default_set` |

### Проверки сервера (порядок)

1. Origin / Referer совпадает с host из `site_url` (fail-closed: без заголовков — 403).
2. CSRF совпадает с сессией.
3. Nonce ещё не использован.
4. Identity + антибот + бан + rate limit.
5. Объект существует: короткий `class_key` (например `msProduct`) резолвится в FQCN / STI, затем проверка по `object_id`.
6. Тип активен и входит в набор `set`.
7. Для `set=full`: тип в `reactions_full_types`, если настройка не пуста.
8. `OnBeforeReaction` (можно отменить).

### Пример

```bash
CSRF=$(curl -s -c cookies.txt -b cookies.txt \
  "https://example.com/assets/components/reactions/api.php?action=csrf" \
  | jq -r '.csrf')

NONCE=$(openssl rand -hex 16)

curl -s -b cookies.txt -c cookies.txt \
  -X POST "https://example.com/assets/components/reactions/api.php?action=react" \
  -H "Content-Type: application/json" \
  -H "Origin: https://example.com" \
  -d "{
    \"csrf\": \"$CSRF\",
    \"nonce\": \"$NONCE\",
    \"class_key\": \"modResource\",
    \"object_id\": 1,
    \"type\": \"like\",
    \"context\": \"web\",
    \"set\": \"github\"
  }"
```

Ответ:

```json
{
  "success": true,
  "data": {
    "action": "added",
    "counts": { "like": 43, "dislike": 3 },
    "total": 46,
    "user_reaction": ["like"],
    "type": "like"
  }
}
```

| `action` | Значение |
| --- | --- |
| `added` | Новая реакция |
| `removed` | Повторный клик / снятие |
| `changed` | Смена типа в exclusive-режиме |

### Набор `full` и подмножество типов

```json
{ "set": "full", "type": "beer", ... }
```

Если `reactions_full_types=like,love,fire` и клиент шлёт `type=beer` → `403 forbidden`, даже если тип есть в БД-наборе `full`.

Параметр сниппета `&types=` сужает **только UI** (кнопки / `data-types`). API для `set=full` дополнительно режет по `reactions_full_types`. Тип вне UI, но разрешённый API, всё ещё можно отправить POST вручную. Для жёсткого запрета используйте `OnBeforeReaction` или сузьте набор в админке/CLI.

---

## DELETE react

Снять указанный тип. Тело — те же поля, что у POST (`csrf`, `nonce`, `class_key`, `object_id`, `type`, `context`, `set`).

```bash
curl -s -b cookies.txt \
  -X DELETE "https://example.com/assets/components/reactions/api.php?action=react" \
  -H "Content-Type: application/json" \
  -H "Origin: https://example.com" \
  -d "{
    \"csrf\": \"$CSRF\",
    \"nonce\": \"$NONCE\",
    \"class_key\": \"modResource\",
    \"object_id\": 1,
    \"type\": \"like\",
    \"context\": \"web\",
    \"set\": \"github\"
  }"
```

В ответе `action` обычно `removed`. После снятия тоже вызываются события, пересчёт агрегата и (при включении) webhook. Уведомление автору для DELETE не шлётся.

---

## GET top

Топ объектов по агрегатам (или пересчёт за период по сырым реакциям, если `period` ≠ `all`).

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `class_key` | `modResource` | Класс объектов |
| `sort` | `likes` | `likes`, `rating`, `total` |
| `period` | `all` | `day`, `week`, `month`, `year`, `all` |
| `context` | *(пусто)* | Фильтр по контексту. Пусто — все |
| `limit` | `20` | 1–100 |
| `offset` | `0` | Смещение |

```bash
curl "https://example.com/assets/components/reactions/api.php?action=top&class_key=modResource&sort=likes&period=week&limit=10"
```

Ответ:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "class_key": "modResource",
        "object_id": 42,
        "context": "web",
        "counts": { "like": 120, "dislike": 5 },
        "total": 125,
        "likes": 120,
        "dislikes": 5,
        "rating": 115,
        "trending_score": 2.079181
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 10
  }
}
```

`data.total` здесь — число элементов в текущей странице выборки (не общий count по таблице).

---

## GET trending

Сортировка по `trending_score` (формула Reddit hot). Параметр `period` для trending фактически не меняет окно — используется актуальный score в агрегате.

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `class_key` | `modResource` | Класс |
| `context` | *(пусто)* | Фильтр |
| `limit` | `20` | 1–100 |
| `offset` | `0` | Смещение |

```bash
curl "https://example.com/assets/components/reactions/api.php?action=trending&class_key=msProduct&limit=5"
```

Структура ответа как у `top` (список items с метриками).

---

## GET latest

Лента последних реакций (сырые записи, не агрегаты). Поле `user_id` в публичный ответ **не** отдаётся.

| Параметр | Описание |
| --- | --- |
| `class_key` | Опциональный фильтр |
| `context` | Опциональный фильтр |
| `limit` | 1–100, по умолчанию 20 |
| `offset` | Смещение |

```bash
curl "https://example.com/assets/components/reactions/api.php?action=latest&class_key=modResource&limit=10"
```

Ответ:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 501,
        "class_key": "modResource",
        "object_id": 42,
        "context": "web",
        "type": "like",
        "emoji": "👍",
        "created_at": 1710000000
      }
    ],
    "limit": 10,
    "offset": 0,
    "total": 10
  }
}
```

`created_at` — Unix timestamp. `total` — размер текущей страницы.

---

## Admin API {#admin}

### Доступ

Требуется авторизованный пользователь менеджера (или фронт с той же сессией) с политикой **`reactions_manage`**.

Без права → `401` / `auth_required`.

Мутации admin (POST/DELETE) дополнительно требуют **Origin + CSRF + nonce**, как `react` (см. `guardMutation`).

### Ресурсы

| Method | action | Описание |
| --- | --- | --- |
| GET/POST/DELETE | `admin/types` | Типы реакций |
| GET/POST/DELETE | `admin/sets` | Наборы и привязка типов |
| GET/POST/DELETE | `admin/bans` | Баны IP / user |
| GET | `admin/stats` | Сводка |

### GET admin/types

```bash
curl -b mgr-cookies.txt \
  "https://example.com/assets/components/reactions/api.php?action=admin/types"
```

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "like",
        "emoji": "👍",
        "icon": null,
        "ordering": 10,
        "active": true
      }
    ]
  }
}
```

### POST admin/types

Создать или обновить. Поля: `id` (для update), `name`, `emoji`, `icon`, `ordering`, `active`.

```bash
curl -b mgr-cookies.txt \
  -X POST "https://example.com/assets/components/reactions/api.php?action=admin/types" \
  -H "Content-Type: application/json" \
  -H "Origin: https://example.com" \
  -d '{
    "csrf": "'"$CSRF"'",
    "nonce": "'"$NONCE"'",
    "name": "favorite",
    "emoji": "⭐",
    "ordering": 90,
    "active": true
  }'
```

Обновление:

```json
{ "id": 9, "emoji": "🌟", "active": false, "csrf": "…", "nonce": "…" }
```

### DELETE admin/types

```bash
curl -b mgr-cookies.txt \
  -X DELETE "https://example.com/assets/components/reactions/api.php?action=admin/types" \
  -H "Content-Type: application/json" \
  -H "Origin: https://example.com" \
  -d '{"id":9,"csrf":"…","nonce":"…"}'
```

`id` можно передать и query-параметром.

### GET admin/sets

Список наборов с привязанными типами.

### POST admin/sets

Поля: `id`, `key`, `title`, `exclusive`, `active`, `types` (массив имён или ID).

```bash
curl -b mgr-cookies.txt \
  -X POST "https://example.com/assets/components/reactions/api.php?action=admin/sets" \
  -H "Content-Type: application/json" \
  -H "Origin: https://example.com" \
  -d '{
    "csrf": "'"$CSRF"'",
    "nonce": "'"$NONCE"'",
    "key": "social",
    "title": "Social",
    "exclusive": false,
    "active": true,
    "types": ["like", "love", "funny"]
  }'
```

`exclusive=true` — взаимоисключающие типы (как `updown`). Для multi на фронте всё равно нужен `reactions_allow_multiple=Да`.

### DELETE admin/sets

Тело: `{ "id": 3, "csrf": "…", "nonce": "…" }`.

### GET / POST / DELETE admin/bans

Бан по IP (хешируется на сервере) или `user_id`.

```bash
curl -b mgr-cookies.txt \
  -X POST "https://example.com/assets/components/reactions/api.php?action=admin/bans" \
  -H "Content-Type: application/json" \
  -H "Origin: https://example.com" \
  -d '{
    "csrf": "'"$CSRF"'",
    "nonce": "'"$NONCE"'",
    "ip": "203.0.113.10",
    "reason": "spam",
    "expires_at": 1711000000
  }'
```

Или: `{ "user_id": 42, "reason": "abuse", "csrf": "…", "nonce": "…" }`.

`expires_at` — Unix timestamp. Можно опустить для бессрочного бана.

### GET admin/stats

```bash
curl -b mgr-cookies.txt \
  "https://example.com/assets/components/reactions/api.php?action=admin/stats"
```

```json
{
  "success": true,
  "data": {
    "totals": {
      "reactions": 1500,
      "aggregates": 320,
      "types": 8,
      "bans": 2,
      "today": 45
    },
    "top_liked": [
      {
        "class_key": "modResource",
        "object_id": 12,
        "context": "web",
        "likes": 90,
        "total": 100,
        "trending_score": 1.5
      }
    ],
    "top_trending": [ ]
  }
}
```

`today` — реакции с `created_at` от начала текущих суток сервера. Топы — до 10 строк.

---

## Безопасность

| Механизм | Детали |
| --- | --- |
| CSRF | Сессионный токен. Обязателен для POST/DELETE (публичный `react` и admin-мутации) |
| Nonce | Одноразовый, TTL 300 с. Защита от replay |
| Origin | Сравнение host `Origin` или `Referer` с host `site_url`. Без заголовков — отказ |
| Rate limit | `reactions_rate_limit` / `reactions_rate_limit_window` на fingerprint |
| Боты | `reactions_block_bots` + детектор User-Agent |
| Баны | Таблица `ReactionBan` по IP-hash / user_id |
| Права | Admin только с `reactions_manage` |

Запросы виджета идут с `credentials: 'same-origin'` — cookie сессии уходят автоматически.

Для CDN-хостинга `reactions.js` задайте API явно (`data-api` или `window.Reactions.config.api` на том же origin, что и сайт).

---

## Связанные документы

- [JS-виджет](js) — как клиент вызывает API
- [События](events) — хуки вокруг `react` / `unreact`
- [Webhooks](webhooks) — исходящие HTTP после изменения
- [CLI](cli) — то же администрирование без HTTP
