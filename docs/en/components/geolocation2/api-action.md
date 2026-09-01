---
title: Web API (action.php)
description: GeoLocation2 REST endpoint — state, data, search, save, confirm, dismiss
---

# Web API (action.php)

URL:

```text
/assets/components/geolocation2/action.php
```

Response is always JSON. Send requests with header `X-Requested-With: XMLHttpRequest`.

With `geolocation2_debug = 1`, details may appear in the MODX error log.

## CSRF

POST (`save`, `confirm`, `dismiss`) requires `csrf` from placeholder `gl2_csrf` (session). Modal snippet and `action=state` provide the token.

## GET

### `action=state`

Current state without changing the session.

```http
GET /assets/components/geolocation2/action.php?action=state
```

Example response:

```json
{
  "success": true,
  "message": "",
  "state": {
    "gl2_current_id": "1",
    "gl2_current_name_ru": "Moscow"
  },
  "confirmed": true
}
```

Full `state` keys depend on service and session.

### `action=data`

HTML fragment of `gl_data` for current or given city (same chunk as the snippet).

| Parameter | Description |
|-----------|-------------|
| `tpl` | Chunk, default `tpl.GeoLocation2.data.current` |
| `city_id` | City ID; if omitted, taken from session |

Example response:

```json
{
  "success": true,
  "html": "<div class=\"gl2-data-current\">...</div>",
  "city_id": 8,
  "tpl": "tpl.GeoLocation2.data.current"
}
```

### `action=search`

Search active cities for the modal.

| Parameter | Description |
|-----------|-------------|
| `query` | Substring in `name_ru` or `name_en` (may be empty) |
| `limit` | 1–100, default 20 |

Example response:

```json
{
  "success": true,
  "items": [{ "id": 1, "name_ru": "Moscow", "name_en": "Moscow" }],
  "query": "mos",
  "count": 1
}
```

## POST

Body: `application/x-www-form-urlencoded` or `multipart/form-data`.

| Field | Description |
|-------|-------------|
| `action` | `save`, `confirm` or `dismiss` |
| `csrf` | Token |
| `city_id` | City ID (`GlCity`) for `save` |
| `use_default` | `1` — use city with `default` flag |

### `action=save`

Saves `city_id`, sets `confirmed=1`.

### `action=confirm`

Confirms current or given city. With `use_default=1` — default city from DB.

### `action=dismiss`

Close modal. With `use_default=1` — write default city and `confirmed=1`. Otherwise only `confirmed=1` without changing city (see `dismissSetsDefault` on [GeoLocation2Modal](snippets/GeoLocation2Modal)).

## Errors

```json
{ "success": false, "message": "..." }
```

Common causes: invalid CSRF, unknown `city_id`, unknown `action`, missing `X-Requested-With`.

## fetch examples

Search:

```javascript
fetch('/assets/components/geolocation2/action.php?action=search&query=kaz', {
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
}).then((r) => r.json());
```

Save city:

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

Modal JS in `assets/components/geolocation2/js/web/modal.js` uses the same actions.

See [FAQ](faq).
