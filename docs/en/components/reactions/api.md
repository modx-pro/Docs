---
title: REST API
description: Public and admin REST API for Reactions — endpoints, CSRF, nonce, error codes
---
# REST API

Base URL:

```text
https://your-site/assets/components/reactions/api.php
```

Entry point file: `assets/components/reactions/api.php` (loads bootstrap and calls `Reactions\Api\Router`).

## Routing

The action comes from the `action` parameter or `PATH_INFO`:

```http
GET  /assets/components/reactions/api.php?action=counts
GET  /assets/components/reactions/api.php/counts
POST /assets/components/reactions/api.php?action=react
GET  /assets/components/reactions/api.php?action=admin/types
```

Nested admin resources: `action=admin/types`, `admin/sets`, `admin/bans`, `admin/stats`.

The HTTP method comes from `REQUEST_METHOD`. Clients without DELETE can emulate it:

- `POST` + body field `_method=DELETE`, or
- `POST` + `$_POST['_method']=DELETE`.

## Response format

All responses are JSON (`JSON_UNESCAPED_UNICODE`). The `success` field is always present.

Success (top-level fields depend on the endpoint):

```json
{
  "success": true,
  "data": { },
  "csrf": "…"
}
```

Error:

```json
{
  "success": false,
  "error": "Human-readable description",
  "code": "error_code"
}
```

### Error codes and HTTP statuses

| `code` | HTTP | When |
| --- | --- | --- |
| `validation_error` | 400 | Missing required fields (`class_key`, `object_id`, `type`…) |
| `bad_request` | 400 | Empty `action` |
| `not_found` | 404 | Unknown action / object / type / set |
| `method_not_allowed` | 405 | Wrong HTTP method for the endpoint |
| `forbidden` | 403 | CSRF/Origin/nonce, ban, bot, type outside set/`full_types`, cancelled by plugin |
| `auth_required` | 401 | Admin without `reactions_manage`; `auth_only` strategy for a guest |
| `rate_limit` | 429 | Exceeded `reactions_rate_limit` |
| `internal_error` | 500 | Uncaught exception (details in `error.log`) |
| `save_failed` | 500 | Admin: failed to save the object |

---

## Public endpoint overview

| Method | action | Description | CSRF |
| --- | --- | --- | --- |
| GET | `csrf` | Issue a CSRF token | no |
| GET | `counts` | Counters + current visitor reactions | no |
| POST | `react` | Add / toggle a reaction | yes |
| DELETE | `react` | Remove a reaction | yes |
| GET | `top` | Top by likes / rating / total | no |
| GET | `trending` | Top by `trending_score` | no |
| GET | `latest` | Feed of latest reactions | no |

GET endpoints are cached on a CDN only if you configure that yourself. The `counts` response depends on cookie/session (`user_reaction`) — do **not** cache it publicly.

---

## GET csrf

Returns a token bound to the PHP session (`$_SESSION['reactions_csrf']`). A new call overwrites the previous token.

```bash
curl -c cookies.txt \
  "https://example.com/assets/components/reactions/api.php?action=csrf"
```

Response:

```json
{
  "success": true,
  "csrf": "a1b2c3d4e5f6…"
}
```

Then pass the session cookie (`-b cookies.txt`) on every request that needs the same CSRF.

The JS widget makes this request itself when `data-csrf` is empty.

---

## GET counts

Counters for an object and the list of reaction types for the current visitor (by fingerprint / user_id).

| Parameter | Required | Description |
| --- | --- | --- |
| `class_key` | yes | Object class (`modResource`, `msProduct`, `TicketComment`…) |
| `object_id` | yes | Object ID (> 0) |
| `context` | no | Context; default `web` |

```bash
curl -b cookies.txt \
  "https://example.com/assets/components/reactions/api.php?action=counts&class_key=modResource&object_id=1&context=web"
```

Response:

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

- `counts` — associative array of type name → number.
- `total` — sum of all types in the aggregate.
- `user_reaction` — array of type names already set by the current visitor (may be empty or hold several names when multi is allowed).

---

## POST react

Add a reaction. A repeated POST of the same type usually **removes** it (toggle). In exclusive mode (`updown` or `!allow_multiple`) another type replaces the previous one (`action=changed`).

### Body (JSON)

| Field | Required | Description |
| --- | --- | --- |
| `csrf` | yes | Token from `GET csrf` |
| `nonce` | yes | One-time string (32 hex recommended); TTL 300 s, at most ~50 active in the session |
| `class_key` | yes | Object class |
| `object_id` | yes | ID |
| `type` | yes | Type name (`like`, `love`, `fire`…) |
| `context` | no | Default `web` |
| `set` | no | Set key for type validation; empty → `reactions_default_set` |

### Server checks (order)

1. Origin / Referer matches the host from `site_url` (fail-closed: no headers → 403).
2. CSRF matches the session.
3. Nonce has not been used yet.
4. Identity + anti-bot + ban + rate limit.
5. Object exists: a short `class_key` (e.g. `msProduct`) resolves to FQCN / STI, then a check by `object_id`.
6. Type is active; belongs to set `set`.
7. For `set=full`: type is in `reactions_full_types` when that setting is not empty.
8. `OnBeforeReaction` (can cancel).

### Example

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

Response:

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

| `action` | Meaning |
| --- | --- |
| `added` | New reaction |
| `removed` | Repeated click / removal |
| `changed` | Type change in exclusive mode |

### Set `full` and type subsets

```json
{ "set": "full", "type": "beer", ... }
```

If `reactions_full_types=like,love,fire` and the client sends `type=beer` → `403 forbidden`, even when the type exists in the DB set `full`.

The snippet parameter `&types=` narrows **UI only** (buttons / `data-types`). The API for `set=full` also filters by `reactions_full_types`. A type outside the UI but allowed by the API can still be sent via a manual POST. For a hard ban use `OnBeforeReaction` or narrow the set in the manager/CLI.

---

## DELETE react

Remove the given type. Body fields match POST (`csrf`, `nonce`, `class_key`, `object_id`, `type`, `context`, `set`).

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

In the response `action` is usually `removed`. After removal the package still fires events, recalculates the aggregate, and (when enabled) the webhook; author notification is not sent for DELETE.

---

## GET top

Top objects by aggregates (or a recount over raw reactions for a period when `period` ≠ `all`).

| Parameter | Default | Description |
| --- | --- | --- |
| `class_key` | `modResource` | Object class |
| `sort` | `likes` | `likes`, `rating`, `total` |
| `period` | `all` | `day`, `week`, `month`, `year`, `all` |
| `context` | *(empty)* | Context filter; empty means all |
| `limit` | `20` | 1–100 |
| `offset` | `0` | Offset |

```bash
curl "https://example.com/assets/components/reactions/api.php?action=top&class_key=modResource&sort=likes&period=week&limit=10"
```

Response:

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

Here `data.total` is the number of items on the current result page (not the full table count).

---

## GET trending

Sort by `trending_score` (Reddit hot formula). The `period` parameter does not change the window for trending — the package uses the current score in the aggregate.

| Parameter | Default | Description |
| --- | --- | --- |
| `class_key` | `modResource` | Class |
| `context` | *(empty)* | Filter |
| `limit` | `20` | 1–100 |
| `offset` | `0` | Offset |

```bash
curl "https://example.com/assets/components/reactions/api.php?action=trending&class_key=msProduct&limit=5"
```

Response shape matches `top` (list of items with metrics).

---

## GET latest

Feed of latest reactions (raw rows, not aggregates). The public response does **not** include `user_id`.

| Parameter | Description |
| --- | --- |
| `class_key` | Optional filter |
| `context` | Optional filter |
| `limit` | 1–100, default 20 |
| `offset` | Offset |

```bash
curl "https://example.com/assets/components/reactions/api.php?action=latest&class_key=modResource&limit=10"
```

Response:

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

`created_at` is a Unix timestamp. `total` is the current page size.

---

## Admin API {#admin}

### Access

Requires an authenticated manager user (or the front end with the same session) with the **`reactions_manage`** policy.

Without permission → `401` / `auth_required`.

Admin mutations (POST/DELETE) also require **Origin + CSRF + nonce**, same as `react` (see `guardMutation`).

### Resources

| Method | action | Description |
| --- | --- | --- |
| GET/POST/DELETE | `admin/types` | Reaction types |
| GET/POST/DELETE | `admin/sets` | Sets and type bindings |
| GET/POST/DELETE | `admin/bans` | IP / user bans |
| GET | `admin/stats` | Summary |

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

Create or update. Fields: `id` (for update), `name`, `emoji`, `icon`, `ordering`, `active`.

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

Update:

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

You can also pass `id` as a query parameter.

### GET admin/sets

List of sets with bound types.

### POST admin/sets

Fields: `id`, `key`, `title`, `exclusive`, `active`, `types` (array of names or IDs).

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

`exclusive=true` — mutually exclusive types (like `updown`). Multi on the front still needs `reactions_allow_multiple=Yes`.

### DELETE admin/sets

Body: `{ "id": 3, "csrf": "…", "nonce": "…" }`.

### GET / POST / DELETE admin/bans

Ban by IP (hashed on the server) or `user_id`.

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

Or: `{ "user_id": 42, "reason": "abuse", "csrf": "…", "nonce": "…" }`.

`expires_at` is a Unix timestamp; omit it for a permanent ban.

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

`today` — reactions with `created_at` from the start of the current server day. Tops — up to 10 rows.

---

## Security

| Mechanism | Details |
| --- | --- |
| CSRF | Session token; required for POST/DELETE (public `react` and admin mutations) |
| Nonce | One-time, TTL 300 s; replay protection |
| Origin | Compare host of `Origin` or `Referer` with host of `site_url`; no headers → reject |
| Rate limit | `reactions_rate_limit` / `reactions_rate_limit_window` per fingerprint |
| Bots | `reactions_block_bots` + User-Agent detector |
| Bans | `ReactionBan` table by IP-hash / user_id |
| Permissions | Admin only with `reactions_manage` |

Widget requests use `credentials: 'same-origin'` — the session cookie is sent automatically.

For CDN-hosted `reactions.js`, set the API explicitly (`data-api` or `window.Reactions.config.api` on the same origin as the site).

---

## Related docs

- [JS widget](js) — how the client calls the API
- [Events](events) — hooks around `react` / `unreact`
- [Webhooks](webhooks) — outbound HTTP after a change
- [CLI](cli) — the same admin work without HTTP
