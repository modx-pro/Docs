---
title: Agent API
description: PageBuilder Pro snapshot and apply for scripts and agents
---

# Agent API (Pro)

HTTP layer for scripts, agents, and mini-builders: add or replace sections without hand-building the full `document` JSON or editing MODX tables directly.

Requires **PageBuilder Pro** (capability `api`). Same `connector.php` and manager session as the Vue editor.

Published read-only JSON for the storefront lives in the [Public API](public-api). Agent API works with drafts, field schemas, and writes.

```text
/assets/components/pagebuilder/connector.php
```

Context: `mgr` (the connector sets `ctx=mgr`). Method: **POST**.

## What to use

| Task | Tool |
| --- | --- |
| Read published page for headless | [Public API](public-api) `web/page/get` |
| Draft, revision, field schemas | `mgr/api/page/snapshot` |
| Add or replace blocks without full document | `mgr/api/page/apply` |
| Full control over document and trash | `mgr/page/save` (Vue editor) |

## Without Agent API

1. Read `modResource`, templates, TVs.
2. Guess section JSON shape.
3. POST the full draft through `mgr/page/save` with revision locking.

## With Agent API

1. `mgr/api/page/snapshot` returns revision, draft, section types, and their fields.
2. `mgr/api/page/apply` writes `{ type, data }` blocks.
3. Pass `publish=1` when the page should go live.

## Permissions

| Requirement | Value |
| --- | --- |
| HTTP | `POST` to `assets/components/pagebuilder/connector.php` |
| Context | `ctx=mgr` |
| Session | Manager login (cookie from `/manager/`) |
| Token | Header `modAuth` = `MODx.siteId` (same as the editor) |
| Read | `pagebuilder_view` or `save_document` + **view** on the resource |
| Write | `pagebuilder_save` or `save_document` + **save** on the resource |
| Pro | `pagebuilderpro` installed, capability `api` in `PageBuilderConfig` |

### Get `modAuth`

In the manager browser console (Sections tab or any mgr page):

```js
MODx.siteId
```

For curl, log in to the manager, save cookies, and send the token:

```bash
# after POST /manager/ with -c cookies.txt
MODX_MODAUTH="value from MODx.siteId"

curl -sS -X POST "${CONNECTOR}" \
  -b cookies.txt \
  -H "modAuth: ${MODX_MODAUTH}" \
  ...
```

Without a valid session and `modAuth`, the connector returns a MODX auth error.

## Response format

Same envelope as other PageBuilder processors:

```json
{ "success": true, "message": "", "object": {} }
```

On failure: `success: false`. Details are in `message` (string or error code).

| Example `message` | When |
| --- | --- |
| `revision_conflict` | `revision` in apply does not match the server |
| `Resource id is required.` | Missing or invalid `resource_id` |
| `Resource not found.` | Resource does not exist |
| `Access denied.` | No view/save policy on the resource |
| `Save permission denied.` | No `pagebuilder_save` / `save_document` |
| `Permission denied.` | No read permission (snapshot) |
| `PageBuilder Pro API is required.` | No Pro or missing capability `api` |
| `Sections payload must be a JSON array.` | `sections` is not an array |
| `Unknown section type: …` | Type not in catalog |
| `Section type is hidden: …` | Type hidden in UI |
| `Section type is not available for this resource: …` | template/parent/context limit |
| `Section type requirements not satisfied: …` | `requires` not met (`pro`, `minishop3`) |
| `Unsupported mode: …` | Invalid `mode` |
| `Section type is required.` | Empty `type` in a section item |

On `revision_conflict`, call `snapshot` again, take the new `revision`, and retry `apply`. Do not bump revision by hand.

Over HTTP, conflicts return JSON only. In PHP, `PageBuilderApiService::apply()` can throw `\PageBuilder\Exception\RevisionConflictException`.

## `mgr/api/page/snapshot`

Snapshot for one resource: draft, revision, short section list, catalog types filtered by `resourceContext` (template, parent, context).

| Parameter | Required | Description |
| --- | --- | --- |
| `resource_id` | yes | MODX resource ID |
| `include_schemas` | no | `1` (default): `fields` on each type. `0`: metadata only |

Sample `object`:

```json
{
  "resourceId": 42,
  "revision": 3,
  "publishedRevision": 2,
  "resourceContext": {
    "template": 1,
    "parent": 0,
    "resource": 42,
    "context": "web"
  },
  "draft": { "schemaVersion": 1, "sections": [], "trash": [] },
  "published": { "schemaVersion": 1, "sections": [], "trash": [] },
  "availableTypes": [
    {
      "key": "hero",
      "label": "Hero",
      "category": "hero",
      "version": 1,
      "chunk": "pagebuilder_hero",
      "requires": [],
      "fields": [
        { "name": "title", "type": "text", "required": true },
        { "name": "description", "type": "textarea", "required": false },
        { "name": "button_label", "type": "text", "required": false },
        { "name": "button_url", "type": "url", "required": false }
      ]
    }
  ],
  "sectionsSummary": [
    { "id": "a1b2c3d4e5f6789012345678abcdef01", "type": "hero", "enabled": true }
  ]
}
```

`availableTypes[].fields` is the schema for `data` in `apply`. Use `sectionsSummary[].id` for `mode=upsert`. Full `data` lives in `draft.sections`.

## `mgr/api/page/apply`

Write sections without assembling the full editor document.

| Parameter | Required | Description |
| --- | --- | --- |
| `resource_id` | yes | Target resource |
| `sections` | yes | JSON array (string or parsed) |
| `mode` | no | `append` (default), `prepend`, `replace`, `upsert` |
| `revision` | no | Expected draft revision. `-1` or omit uses current server value |
| `publish` | no | `1`, `true`, or `yes` publishes after save |

Each item in `sections`:

```json
{
  "type": "hero",
  "data": {
    "title": "Welcome",
    "description": "Built by agent",
    "button_label": "Contact",
    "button_url": "/contact/"
  },
  "settings": {},
  "enabled": true,
  "typeVersion": 1,
  "id": "optional-32-hex-id-for-upsert"
}
```

| Field | Role |
| --- | --- |
| `type` | Key from `availableTypes[].key` |
| `data` | Merged over defaults from the type schema |
| `settings` | Section settings (visibility, UTM, Pro `conditions`) |
| `enabled` | Default `true` |
| `typeVersion` | Default: type `version` from catalog |
| `id` | 32 hex chars for `upsert`. Empty: new id generated |

Unknown type, hidden type, or failed `requires` (`pro`, `minishop3`) returns an error. Free `richtext` uses field name `content`, not `body`.

| `mode` | Behavior |
| --- | --- |
| `append` | New sections at the end of the draft |
| `prepend` | New sections at the start |
| `replace` | Draft sections replaced entirely (`trash` unchanged) |
| `upsert` | Update by `id` or add new. No `id`: append like `append` |

Sample `object` after apply (no publish):

```json
{
  "resourceId": 42,
  "revision": 4,
  "publishedRevision": 2,
  "draft": { "schemaVersion": 1, "sections": [], "trash": [] },
  "addedSectionIds": ["a1b2c3d4e5f6789012345678abcdef01"],
  "published": false
}
```

## Examples

`MODX_MODAUTH` is `MODx.siteId` from the manager session (DevTools → Network → any POST to `connector.php` → header `modAuth`).

### cURL: snapshot

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=1'
```

Smaller payload without field schemas:

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=0'
```

### cURL: landing (replace + publish)

```bash
SECTIONS='[
  {
    "type": "hero",
    "data": {
      "title": "City delivery in 2 hours",
      "description": "Warehouse nearby, tracking in the app.",
      "button_label": "Get a quote",
      "button_url": "/calc/",
      "alignment": "center"
    }
  },
  {
    "type": "faq",
    "data": {
      "title": "FAQ",
      "items": [
        {
          "question": "How do I place an order?",
          "answer": "<p>Add a product to the cart and proceed to checkout.</p>"
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Ready to start?",
      "text": "Leave a request — we call back within 15 minutes.",
      "button_label": "Contact us",
      "button_url": "/contact/"
    }
  }
]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=replace&publish=1&revision=3" \
  --data-urlencode "sections=${SECTIONS}"
```

Take `revision=3` from the previous `snapshot`. Without `revision` (or with `-1`) the service uses the current server revision.

### cURL: append, prepend, upsert

Append:

```bash
SECTIONS='[{"type":"richtext","data":{"content":"<p>Extra block.</p>"}}]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=append" \
  --data-urlencode "sections=${SECTIONS}"
```

Upsert by id from `sectionsSummary`:

```bash
SECTIONS='[{
  "id": "a1b2c3d4e5f6789012345678abcdef01",
  "type": "hero",
  "data": {
    "title": "Updated title",
    "description": "After upsert",
    "button_label": "Buy",
    "button_url": "/buy/"
  }
}]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=upsert" \
  --data-urlencode "sections=${SECTIONS}"
```

### PHP: replace + publish

```php
/** @var \MODX\Revolution\modX $modx */
$api = $modx->services->get(\PageBuilderPro\PageBuilderApiService::class);
$userId = (int) $modx->user->get('id');
$resourceId = 42;

$snapshot = $api->snapshot($resourceId);
$result = $api->apply(
    resourceId: $resourceId,
    sectionsInput: [
        [
            'type' => 'hero',
            'data' => [
                'title' => 'Welcome',
                'description' => 'Built from PHP',
                'button_label' => 'Contact',
                'button_url' => '/contact/',
            ],
        ],
        [
            'type' => 'richtext',
            'data' => ['content' => '<p>Page text.</p>'],
        ],
    ],
    mode: 'replace',
    expectedRevision: $snapshot['revision'],
    userId: $userId,
    publish: true,
);
```

Class `PageBuilderPro\PageBuilderApiService` registers in the `pagebuilderpro` bootstrap.

### PHP: append with retry on conflict

```php
/** @var \PageBuilderPro\PageBuilderApiService $api */
$resourceId = 42;
$userId = (int) $modx->user->get('id');
$sections = [
    [
        'type' => 'cta',
        'data' => [
            'title' => 'Subscribe',
            'text' => 'News once a week.',
            'button_label' => 'Sign up',
            'button_url' => '/subscribe/',
        ],
    ],
];

for ($attempt = 0; $attempt < 3; $attempt++) {
    $snapshot = $api->snapshot($resourceId, includeSchemas: false);
    try {
        $api->apply(
            resourceId: $resourceId,
            sectionsInput: $sections,
            mode: 'append',
            expectedRevision: $snapshot['revision'],
            userId: $userId,
            publish: false,
        );
        break;
    } catch (\PageBuilder\Exception\RevisionConflictException $e) {
        continue;
    }
}
```

### JavaScript: PageBuilderApi

```js
const api = new PageBuilderApi({
  baseUrl: '/assets/components/pagebuilder/connector.php',
  modAuth: MODx.siteId,
})

const snap = await api.post('mgr/api/page/snapshot', {
  resource_id: 42,
  include_schemas: 1,
})
if (!snap.success) throw new Error(snap.message)

const apply = await api.post('mgr/api/page/apply', {
  resource_id: 42,
  revision: snap.object.revision,
  mode: 'append',
  sections: JSON.stringify([
    {
      type: 'cta',
      data: {
        title: 'Subscribe',
        text: 'News once a week',
        button_label: 'OK',
        button_url: '/subscribe/',
      },
    },
  ]),
})

if (apply.message === 'revision_conflict') {
  // snapshot again and retry
}
```

Send `sections` as a JSON string in POST, same as curl `--data-urlencode`.

Wrapper: `assets/components/pagebuilder/js/pagebuilder-api.js`. Lite POST: `pb-fetch-lite.js` (`pbFetch(action, payload, options)`).

## Agent workflow

1. `snapshot` on the target resource. Take `revision`, `availableTypes[].fields`, `sectionsSummary`, and `draft.sections` when you need current `data`.
2. Map source content to `{ type, data }` using field names from `availableTypes`, not guessed keys.
3. `apply` with `mode=replace` (full rebuild), `append`, or `upsert`. Pass `revision` from step 1.
4. On `revision_conflict`, go back to step 1.
5. Publish with `publish=1` on apply, or call `mgr/page/publish` separately.
6. Verify on the site, in manager preview, or via [Public API](public-api) `web/page/get` if enabled.

Free processor `mgr/catalog/list` returns types without field schemas. Agent API adds schemas and single-call writes.

## Events

Apply uses `PageService::saveDraft` / `publishDraft`, same as the editor:

| Event | When |
| --- | --- |
| `pbOnBeforeSave` / `pbOnAfterSave` | Draft write |
| `pbOnBeforePublish` / `pbOnAfterPublish` | When `publish=1` |

## Agent API vs `mgr/page/save`

| | `mgr/api/page/apply` | `mgr/page/save` |
| --- | --- | --- |
| Body | Array of `{ type, data }` | Full `PageDocument` JSON |
| Trash | Unchanged | Full control |
| Type schemas | In `snapshot` | Separate `mgr/catalog/list`, no fields |
| Revision lock | yes | yes |

Use apply for generated landings from section templates. Use save or the editor for reorder, trash, and fine-grained `settings`.

## Related pages

- [PageBuilder Pro](pro)
- [Public API](public-api)
- [Data model](developer#data-model)
- [Events](integration#events)
