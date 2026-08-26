---
title: Agent API
description: PageBuilder Pro snapshot and apply for scripts and agents
---

# Agent API (Pro)

HTTP layer for scripts, agents, and mini-builders: assemble a page from sections without hand-building the full `document` or editing MODX tables directly.

Requires **PageBuilder Pro** (capability `api`). Same `connector.php` and manager session as the Vue editor.

## Why

Without Agent API, a typical flow is:

1. Read `modResource`, templates, TVs.
2. Guess section JSON shape.
3. Send the full draft via `mgr/page/save` with a revision check.

With Agent API:

1. `mgr/api/page/snapshot` returns revision, draft, section types, and their fields.
2. `mgr/api/page/apply` adds or replaces sections with `{ type, data }`.
3. Optionally pass `publish=1`.

## Permissions

| Requirement | Value |
| --- | --- |
| Transport | `POST` to `assets/components/pagebuilder/connector.php` |
| Context | `ctx=mgr` |
| Token | Header `modAuth` = `MODx.siteId` (same as the editor) |
| Read | `pagebuilder_view` or `save_document` + **view** policy on the resource |
| Write | `pagebuilder_save` or `save_document` + **save** policy on the resource |
| Pro | `pagebuilderpro` installed, capabilities include `api` |

## `mgr/api/page/snapshot`

Page snapshot: draft, revision, short section list, type schemas from the catalog.

| Parameter | Required | Description |
| --- | --- | --- |
| `resource_id` | yes | MODX resource ID |
| `include_schemas` | no | `1` (default): `fields` on each type; `0`: metadata only |

Sample response `object`:

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

`availableTypes[].fields` is the schema for building `data` in `apply`. Use `sectionsSummary[].id` for `mode=upsert`.

## `mgr/api/page/apply`

Write sections without assembling the full editor document.

| Parameter | Required | Description |
| --- | --- | --- |
| `resource_id` | yes | Target resource |
| `sections` | yes | JSON array (string or parsed) |
| `mode` | no | `append` (default), `prepend`, `replace`, `upsert` |
| `revision` | no | Expected draft revision; `-1` or omit uses current |
| `publish` | no | `1` publishes after save |

`sections` array item:

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

`data` merges over defaults from the type schema. Unknown type, hidden type, or unmet `requires` (`pro`, `minishop3`) returns an error. The Free `richtext` section field is `content`, not `body`.

| `mode` | Behavior |
| --- | --- |
| `append` | New sections at the end of the draft |
| `prepend` | New sections at the start |
| `replace` | Draft sections replaced entirely (`trash` unchanged) |
| `upsert` | By `id`: update existing or add new |

Sample `object` after `apply` (without `publish`):

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

On revision mismatch the response is `{ "success": false, "message": "revision_conflict" }`. Call `snapshot` again and retry `apply` with the current `revision`.

## Examples

`MODX_MODAUTH` is `MODx.siteId` from the manager session (DevTools → Network → any POST to `connector.php` → `modAuth` header).

### cURL: snapshot

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=1'
```

Without field schemas (smaller payload):

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=0'
```

### cURL: landing page (replace + publish)

Rebuilds the draft from hero, FAQ, and CTA, then publishes:

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
        },
        {
          "question": "Is pickup available?",
          "answer": "<p>Yes. Pickup points are on the delivery page map.</p>"
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
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=replace&publish=1&revision=3" \
  --data-urlencode "sections=${SECTIONS}"
```

Take `revision=3` from the previous `snapshot`. Without `revision` (or `-1`) the service uses the current revision.

### cURL: append

```bash
SECTIONS='[
  {
    "type": "richtext",
    "data": {
      "content": "<p>Extra block under the main content.</p>"
    }
  }
]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=append" \
  --data-urlencode "sections=${SECTIONS}"
```

### cURL: prepend

```bash
SECTIONS='[{"type":"cta","data":{"title":"Sale until Friday","text":"−15% on the first order","button_label":"Shop","button_url":"/catalog/"}}]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=prepend" \
  --data-urlencode "sections=${SECTIONS}"
```

### cURL: upsert (update section by id)

Take `id` from `sectionsSummary` in the `snapshot` response:

```bash
SECTIONS='[
  {
    "id": "a1b2c3d4e5f6789012345678abcdef01",
    "type": "hero",
    "data": {
      "title": "Updated title",
      "description": "Text after upsert",
      "button_label": "Buy",
      "button_url": "/buy/"
    }
  }
]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=upsert" \
  --data-urlencode "sections=${SECTIONS}"
```

Without `id` on an item, the section is added as new (same as `append`).

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
            'data' => [
                'content' => '<p>Page text.</p>',
            ],
        ],
    ],
    mode: 'replace',
    expectedRevision: $snapshot['revision'],
    userId: $userId,
    publish: true,
);

// $result['revision'], $result['addedSectionIds'], $result['published']
```

Class `PageBuilderPro\PageBuilderApiService` registers in the `pagebuilderpro` bootstrap.

### PHP: append with revision_conflict retry

```php
/** @var \PageBuilderPro\PageBuilderApiService $api */
$resourceId = 42;
$userId = (int) $modx->user->get('id');
$sections = [
    [
        'type' => 'cta',
        'data' => [
            'title' => 'Subscribe',
            'text' => 'News and deals once a week.',
            'button_label' => 'Sign up',
            'button_url' => '/subscribe/',
        ],
    ],
];

$attempts = 0;
while ($attempts < 3) {
    $attempts++;
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
        // another editor saved the draft — snapshot again
        continue;
    }
}
```

Over the HTTP connector a conflict returns `{ "success": false, "message": "revision_conflict" }` without a PHP exception.

### JavaScript: append (manager session)

```js
const api = new PageBuilderApi({
  baseUrl: '/assets/components/pagebuilder/connector.php',
  modAuth: MODx.siteId,
})

const snap = await api.post('mgr/api/page/snapshot', {
  resource_id: 42,
  include_schemas: 1,
})

await api.post('mgr/api/page/apply', {
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
```

### JavaScript: upsert by id from snapshot

```js
const snap = await api.post('mgr/api/page/snapshot', {
  resource_id: 42,
  include_schemas: 0,
})
const hero = (snap.object.sectionsSummary || []).find((s) => s.type === 'hero')
if (!hero) {
  throw new Error('No hero section on the page')
}

await api.post('mgr/api/page/apply', {
  resource_id: 42,
  revision: snap.object.revision,
  mode: 'upsert',
  sections: JSON.stringify([
    {
      id: hero.id,
      type: 'hero',
      data: {
        title: 'New title',
        description: 'Updated by script',
        button_label: 'Catalog',
        button_url: '/catalog/',
      },
    },
  ]),
})
```

### JavaScript: pb-fetch-lite

POST without the Vue wrapper:

```js
import { pbFetch } from '/assets/components/pagebuilder/js/pb-fetch-lite.js'

const connector = '/assets/components/pagebuilder/connector.php'
const auth = { baseUrl: connector, modAuth: MODx.siteId }

const snap = await pbFetch('mgr/api/page/snapshot', { resource_id: 42 }, auth)

await pbFetch(
  'mgr/api/page/apply',
  {
    resource_id: 42,
    revision: snap.object.revision,
    mode: 'append',
    sections: JSON.stringify([
      { type: 'spacer', data: { size: 'md' } },
    ]),
  },
  auth,
)
```

`PageBuilderApi` wrapper: `assets/components/pagebuilder/js/pagebuilder-api.js`. Lite POST: `pb-fetch-lite.js` (`pbFetch(action, payload, options)`).

## Agent workflow

1. `snapshot` on the target resource. Take `revision`, `availableTypes[].fields`, `sectionsSummary`.
2. Map source content to `{ type, data }` using schemas from `availableTypes`.
3. `apply` with `mode=replace` (full rebuild) or `append` / `upsert` (targeted edits), pass `revision` from step 1.
4. On `revision_conflict`, call `snapshot` again and retry `apply`.
5. Publish: `publish=1` on `apply` or separately `mgr/page/publish`.

Free processor `mgr/catalog/list` still returns the type list. Agent API adds field schemas and single-call section writes.

## Related pages

- [PageBuilder Pro](pro)
- [Data model](developer#data-model)
- [Events](integration#events): `pbOnBeforeSave`, `pbOnAfterSave` on apply
