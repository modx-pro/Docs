---
title: Public API
description: Read-only JSON API for headless frontends. Published sections only, no drafts
---

# Public API (Headless)

Read-only JSON for an external frontend (Next.js, Nuxt, React, and similar). Returns **published** PageBuilder content only. Drafts and writes go through the [Agent API](agent-api) (Pro) or the resource **Sections** tab in the manager.

Entry point:

```text
/assets/components/pagebuilder/api.php
```

MODX context: `web`. Methods: **GET** and **OPTIONS** (CORS preflight).

## Enable

System settings, namespace `pagebuilder`:

| Key | Default | Description |
| --- | --- | --- |
| `pagebuilder_public_api_enabled` | `0` | Turn the API on |
| `pagebuilder_public_api_key` | empty | API key. Empty means no key (dev only) |
| `pagebuilder_public_api_cors_origins` | `*` | Allowed browser origins |

Clear site cache after you change these keys if MODX does not pick them up immediately.

Details: [System settings → Public API](settings#public-api).

Example env on the frontend:

```bash
PAGEBUILDER_API_URL=https://cms.example.com/assets/components/pagebuilder/api.php
PAGEBUILDER_API_KEY=your-secret-key
```

## Authorization

When `pagebuilder_public_api_key` is set, send the key as:

- header `X-PageBuilder-Api-Key: <key>` (preferred: the key does not land in access logs)
- query `api_key=<key>`

MODX then checks:

- the resource is published and not deleted
- **view** policy on the resource for the web guest
- PageBuilder has a published snapshot (`publishedRevision > 0`)

If the API is disabled, protected endpoints return 404. `web/health/ping` still responds and reports `publicApiEnabled`.

## Response format

Same envelope as the manager connector:

```json
{
  "success": true,
  "message": "",
  "object": {}
}
```

| HTTP | Example `message` | When |
| --- | --- | --- |
| 401 | `Invalid API key.` | Wrong or missing key |
| 403 | `Access denied.` | No view policy |
| 404 | `Resource not found.` | Unknown resource or API disabled |
| 404 | `Page has no published content.` | Resource exists, PageBuilder never published |
| 400 | `resource_id or alias is required.` | No identifier |
| 400 | `Invalid action.` | Unknown `action=` |

## Endpoints

### `web/health/ping`

Health check. Works when the API is off (`publicApiEnabled` in the response).

```bash
curl -s "https://example.com/assets/components/pagebuilder/api.php?action=web/health/ping"
```

```json
{ "success": true, "object": { "ok": true, "publicApiEnabled": true } }
```

### `web/page/get`

Published page for one resource.

| Parameter | Required | Description |
| --- | --- | --- |
| `resource_id` | * | MODX resource ID |
| `alias` | * | Resource alias when `resource_id` is omitted |
| `context_key` | no | Context for `alias`, default `web` |
| `include` | no | Comma list: `document`, `values`, `html`, `sections`. Default `document,values` |
| `section_types` | no | Filter types: `hero,cta` |
| `api_key` | if key set | API key in query |

You need `resource_id` **or** `alias`.

#### `include`

| Value | In `object` |
| --- | --- |
| `document` | Full published JSON: `sections`, `trash`, `schemaVersion`, `typeVersion`, `settings`, raw `data` |
| `values` | Visible sections plus `plainText` (same idea as `[[!PageBuilder? &return_values=1]]`) |
| `html` | One HTML string, like the snippet on the site |
| `sections` | Each visible section with its own `html` from Fenom chunks |

`values` skips sections hidden by UTM, context, or Pro `conditions`. `document` keeps the stored JSON as in `published_json`.

#### Example request

```bash
BASE="https://example.com/assets/components/pagebuilder/api.php"

curl -s -H "X-PageBuilder-Api-Key: ${KEY}" \
  "${BASE}?action=web/page/get&alias=about&include=document,values"
```

#### Response `object` (fragment)

```json
{
  "resourceId": 42,
  "publishedRevision": 3,
  "resource": {
    "id": 42,
    "pagetitle": "About",
    "alias": "about",
    "uri": "about.html",
    "context": "web",
    "template": 5
  },
  "document": {
    "schemaVersion": 1,
    "sections": [
      {
        "id": "a1b2c3d4",
        "type": "hero",
        "typeVersion": 1,
        "enabled": true,
        "data": { "title": "Hello" },
        "settings": {}
      }
    ],
    "trash": []
  },
  "values": {
    "plainText": "Hello",
    "sections": [{ "id": "a1b2c3d4", "type": "hero", "enabled": true, "data": { "title": "Hello" } }]
  }
}
```

With `include=sections`:

```json
{
  "id": "a1b2c3d4",
  "type": "hero",
  "enabled": true,
  "data": { "title": "Hello" },
  "settings": {},
  "html": "<section class=\"pb-section pb-hero\">…</section>",
  "renderFailed": false
}
```

`renderFailed: true` means the chunk did not render (unknown type, Fenom error). Skip the block or show a fallback in your app.

#### JavaScript (fetch)

```javascript
async function getPage(alias) {
  const url = new URL(process.env.PAGEBUILDER_API_URL)
  url.searchParams.set('action', 'web/page/get')
  url.searchParams.set('alias', alias)
  url.searchParams.set('include', 'document,values')

  const res = await fetch(url, {
    headers: { 'X-PageBuilder-Api-Key': process.env.PAGEBUILDER_API_KEY },
    next: { revalidate: 60 },
  })
  const body = await res.json()
  if (!body.success) throw new Error(body.message)
  return body.object
}
```

#### PHP (same MODX site)

```php
/** @var \MODX\Revolution\modX $modx */
$api = $modx->services->get(\PageBuilder\PublicApi\PageBuilderPublicApiService::class);
$api->assertEnabled();
$api->assertApiKey($_SERVER['HTTP_X_PAGEBUILDER_API_KEY'] ?? null);

$page = $api->getPage(
    $api->resolveResourceId(0, 'about', 'web'),
    ['include' => 'document,values'],
);
```

Class `PageBuilder\PublicApi\PageBuilderPublicApiService` registers in `ServiceRegistry`.

Compare `publishedRevision` after a manager publish to decide when to revalidate frontend cache.

### `web/catalog/list`

Section type metadata for mapping `section.type` to your components.

| Parameter | Description |
| --- | --- |
| `context_key` | Catalog context, default `web` |

```bash
curl -s "${BASE}?action=web/catalog/list&context_key=web&api_key=${KEY}"
```

```json
{
  "success": true,
  "object": {
    "items": [
      {
        "key": "hero",
        "version": 1,
        "label": "Hero",
        "category": "hero",
        "fields": [
          { "name": "title", "type": "text", "label": "Title", "required": true }
        ],
        "thumbnail": ""
      }
    ]
  }
}
```

Cache the list for an hour or until deploy. It changes when you add JSON types or UI types in the CMP.

## CORS

Set `pagebuilder_public_api_cors_origins` to one origin or a comma-separated list:

```text
https://app.example.com,https://staging.example.com
```

Preflight:

```bash
curl -s -D - -o /dev/null -X OPTIONS \
  "${BASE}?action=web/page/get" \
  -H "Origin: https://app.example.com" \
  -H "Access-Control-Request-Method: GET"
```

Expect `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers: Content-Type, X-PageBuilder-Api-Key`.

## Picking `include`

| Goal | `include` |
| --- | --- |
| SPA with your own components | `document` or `values` |
| Keep MODX chunks without rewriting markup | `html` or `sections` |
| SEO meta plus blocks | `values` (`plainText`, resource fields) |
| One block on a landing page | `section_types=hero&include=document` |

## Headless flow

1. Enable the API and set a key in production.
2. Call `web/catalog/list` once and cache field schemas (or generate TS types from `fields`).
3. On each route, call `web/page/get` by `alias` or `resource_id`.
4. Render `object.document.sections` with your components, or use `object.sections[].html` / `object.html` for an SSR hybrid.
5. After publish in the manager, revalidate when `publishedRevision` changes.

## Events

| Event | When |
| --- | --- |
| `pbOnGetValues` | `include` contains `values` |
| `pbOnBeforeGetList` | `web/catalog/list` |

Plugins can adjust `plainText` or hide types the same way as on the public site.

## Public API vs Agent API

| | Public API | Agent API (Pro) |
| --- | --- | --- |
| URL | `api.php` | `connector.php` |
| Context | `web` | `mgr` |
| Auth | API key (optional) | Manager session + `modAuth` |
| Data | published only | draft, schemas, published snapshot |
| Write | no | `mgr/api/page/apply` |

## Free vs Pro

| Feature | Free | Pro |
| --- | --- | --- |
| Public API read (published) | yes | yes |
| Agent API write | no | yes |
| Pro-only section types in output | yes, if published on the page | yes |

## Related pages

- [Agent API (Pro)](agent-api)
- [PageBuilder snippet](snippets/PageBuilder)
- [Events](integration#events)
- [Developer](developer)
