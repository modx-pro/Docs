---
title: Web API (action.php)
description: REST-эндпоинт GeoLocation2 — state, data, search, save, confirm, dismiss
---

# Web API (action.php)

URL:

```text
/assets/components/geolocation2/action.php
```

Ответ всегда JSON. Запросы отправляйте с заголовком `X-Requested-With: XMLHttpRequest`.

При `geolocation2_debug = 1` подробности могут попадать в MODX error log.

## CSRF

POST (`save`, `confirm`, `dismiss`) требуют поле `csrf` из плейсхолдера `gl2_csrf` (сессия). Токен выставляет сниппет модалки и отдаёт `action=state`.

## GET

### `action=state`

Текущее состояние без изменения сессии.

```http
GET /assets/components/geolocation2/action.php?action=state
```

Пример ответа:

```json
{
  "success": true,
  "message": "",
  "state": {
    "gl2_current_id": "1",
    "gl2_current_name_ru": "Москва"
  },
  "confirmed": true
}
```

Полный набор ключей в `state` зависит от сервиса и сессии.

### `action=data`

HTML-фрагмент `gl_data` для текущего или указанного города (тот же чанк, что у сниппета).

| Параметр | Описание |
|----------|----------|
| `tpl` | Чанк, по умолчанию `tpl.GeoLocation2.data.current` |
| `city_id` | ID города; если не передан, берётся из сессии |

Пример ответа:

```json
{
  "success": true,
  "html": "<div class=\"gl2-data-current\">...</div>",
  "city_id": 8,
  "tpl": "tpl.GeoLocation2.data.current"
}
```

### `action=search`

Поиск активных городов для модалки.

| Параметр | Описание |
|----------|----------|
| `query` | Подстрока в `name_ru` или `name_en` (может быть пустой) |
| `limit` | 1–100, по умолчанию 20 |

Пример ответа:

```json
{
  "success": true,
  "items": [{ "id": 1, "name_ru": "Москва", "name_en": "Moscow" }],
  "query": "моск",
  "count": 1
}
```

## POST

Тело: `application/x-www-form-urlencoded` или `multipart/form-data`.

| Поле | Описание |
|------|----------|
| `action` | `save`, `confirm` или `dismiss` |
| `csrf` | Токен |
| `city_id` | ID города (`GlCity`) для `save` |
| `use_default` | `1` — подставить город с флагом `default` |

### `action=save`

Сохраняет `city_id`, выставляет `confirmed=1`.

### `action=confirm`

Подтверждает текущий или переданный город. С `use_default=1` — город по умолчанию из БД.

### `action=dismiss`

Закрытие модалки. С `use_default=1` — записать город по умолчанию и `confirmed=1`. Иначе только `confirmed=1` без смены города (см. `dismissSetsDefault` у [GeoLocation2Modal](snippets/GeoLocation2Modal)).

## Ошибки

```json
{ "success": false, "message": "..." }
```

Типичные причины: неверный CSRF, неизвестный `city_id`, неизвестный `action`, запрос без `X-Requested-With`.

## Примеры fetch

Поиск:

```javascript
fetch('/assets/components/geolocation2/action.php?action=search&query=каз', {
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
}).then((r) => r.json());
```

Сохранение города:

```javascript
const body = new URLSearchParams({
  action: 'save',
  csrf: document.querySelector('[data-gl2-csrf]').dataset.gl2Csrf,
  city_id: '8',
});
fetch('/assets/components/geolocation2/action.php', {
  method: 'POST',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  body,
});
```

JS модалки в `assets/components/geolocation2/js/web/modal.js` вызывает те же actions.

См. [FAQ](faq).
