---
title: MODX events
description: OnBeforeReaction, OnAfterReaction, OnReactionRemoved, OnReactionChanged — parameters and plugin examples
---
# MODX events

Reactions fires system events when reactions change. Use plugins to log, block selected objects, clear cache, or send notifications.

Outbound HTTP callbacks after success are separate: [Webhooks](webhooks). Built-in author messages use the `reactions_notify_authors` setting.

## Event list

| Event | When | Cancellable |
| --- | --- | --- |
| `OnBeforeReaction` | After request validation, **before** writing to the DB | yes (`cancel`) |
| `OnAfterReaction` | After a successful transaction (any `action`) | no |
| `OnReactionRemoved` | Extra when `action = removed` | no |
| `OnReactionChanged` | Extra when `action = changed` | no |

`OnAfterReaction` always runs on success. For remove and type change, a specialized event with the same parameters follows.

Registration: **Elements → Plugins → System Events tab**. Events are created on package install.

---

## Server execution order

Typical path for `POST`/`DELETE` `action=react`:

```text
1. Origin + CSRF + nonce (API layer)
2. IdentityResolver (fingerprint / user_id)
3. BotDetector + ReactionBan + RateLimiter
4. Object exists (short class_key → FQCN/STI + object_id)
5. Type active; type ∈ set; for set=full — reactions_full_types
6. OnBeforeReaction  ← can cancel
7. DB transaction (insert / update / delete)
8. OnAfterReaction
9. OnReactionRemoved  or  OnReactionChanged  (by action)
10. AggregateService::recount
11. WebhookDispatcher (if enabled)
12. NotificationService (only for react/POST branch, not for the pure unreact notification path — see code)
```

Notes:

- At steps 8–9 the **aggregate is not recalculated yet**. Do not read `ReactionAggregate` from an `OnAfter*` plugin for “fresh” numbers — recount yourself, use `request` / `action` fields, or subscribe to the webhook (it leaves after recount in the current service flow — the webhook gets a `ReactionResult` with updated counts).
- `OnBeforeReaction` runs **after** rate limit and object checks. Cancel does not return the rate-limit “slot” for this request (the limit is already consumed).

---

## Parameters

Parameters arrive in the plugin `$scriptProperties` and as local variables in plugin scope (MODX `invokeEvent` + `compact`).

### DTO objects

`Reactions\Dto\ReactionRequest` (readonly):

| Property | Type | Description |
| --- | --- | --- |
| `classKey` | `string` | e.g. `modResource` |
| `objectId` | `int` | Object ID |
| `typeName` | `string` | Type name (`like`, `fire`…) |
| `context` | `string` | MODX context |
| `setKey` | `string` | Set key; may be empty until default resolve |
| `allowMultiple` | `bool` | Flag from the setting at request time |

`Reactions\Dto\VisitorIdentity` (readonly):

| Property | Type | Description |
| --- | --- | --- |
| `fingerprint` | `string` | Stable fingerprint for reaction uniqueness |
| `userId` | `?int` | User ID when authenticated |
| `ipHash` | `?string` | IP hash (depends on strategy) |
| `sessionId` | `?string` | Session ID (`session` strategy) |

xPDO models:

- `Reactions\Model\ReactionType` — type (`name`, `emoji`, `active`…)
- `Reactions\Model\ReactionSet` — set (`key`, `exclusive`, `active`…)

### OnBeforeReaction

| Key | Type | Description |
| --- | --- | --- |
| `request` | `ReactionRequest` | Request |
| `identity` | `VisitorIdentity` | Who reacts |
| `type` | `ReactionType` | Type from DB |
| `set` | `ReactionSet` | Set from DB |

Cancel:

```php
$modx->event->returnedValues['cancel'] = true;
```

The service throws `ReactionNotAllowed` → API responds `403` / `code: forbidden` with lexicon `reactions_err_forbidden`.

### OnAfterReaction, OnReactionRemoved, OnReactionChanged

| Key | Type | Description |
| --- | --- | --- |
| `request` | `ReactionRequest` | Request |
| `identity` | `VisitorIdentity` | Visitor |
| `type` | `ReactionType` | Type |
| `action` | `string` | `added` \| `removed` \| `changed` |

`action` values match the `data.action` field in the API response and webhook events (`reaction.added`, etc.).

---

## Action values

| `action` | Typical scenario |
| --- | --- |
| `added` | First reaction of this type (or a new one after removal) |
| `removed` | Toggle cleared the reaction; or an explicit DELETE |
| `changed` | Exclusive: was `dislike`, became `like` without a separate remove in the client response |

For `changed`, `OnAfterReaction` + `OnReactionChanged` fire (not `OnReactionRemoved`).

---

## Plugin examples

### Logging

Event: `OnAfterReaction`.

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var \Reactions\Dto\ReactionRequest $request */
/** @var \Reactions\Dto\VisitorIdentity $identity */
/** @var string $action */

$modx->log(
    \MODX\Revolution\modX::LOG_LEVEL_INFO,
    sprintf(
        '[Reactions] %s %s on %s#%d ctx=%s fp=%s user=%s',
        $action,
        $request->typeName,
        $request->classKey,
        $request->objectId,
        $request->context,
        $identity->fingerprint,
        $identity->userId ?? '-'
    )
);
```

### Block reactions on unpublished resources

Event: `OnBeforeReaction`.

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey !== 'modResource'
    && $request->classKey !== 'MODX\\Revolution\\modResource'
) {
    return;
}

$resource = $modx->getObject(\MODX\Revolution\modResource::class, $request->objectId);
if (!$resource) {
    return;
}

if (!(bool) $resource->get('published') || (bool) $resource->get('deleted')) {
    $modx->event->returnedValues['cancel'] = true;
}
```

### Only selected types on comments

```php
<?php
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey !== 'TicketComment') {
    return;
}

$allowed = ['like', 'dislike', 'funny'];
if (!in_array($request->typeName, $allowed, true)) {
    $modx->event->returnedValues['cancel'] = true;
}
```

### Invalidate resource cache (Fenom / pdoTools)

Event: `OnAfterReaction`.

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey === 'modResource' || str_contains($request->classKey, 'modResource')) {
    $modx->cacheManager->refresh([
        'resource' => ['contexts' => [$request->context]],
    ]);
    // Or pointwise if your keys look like resource/{id}:
    // $modx->cacheManager->delete('resource/' . $request->objectId);
}
```

Exact keys depend on the site cache config.

### Telegram notification (quick prototype)

Event: `OnAfterReaction`. Only `added`:

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var string $action */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($action !== 'added') {
    return;
}

$token = $modx->getOption('telegram_bot_token');
$chatId = $modx->getOption('telegram_chat_id');
if (!$token || !$chatId) {
    return;
}

$text = sprintf(
    'Реакция %s на %s #%d (%s)',
    $request->typeName,
    $request->classKey,
    $request->objectId,
    $request->context
);

$url = sprintf(
    'https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s',
    rawurlencode($token),
    rawurlencode((string) $chatId),
    rawurlencode($text)
);

@file_get_contents($url);
```

In production prefer [webhooks](webhooks) or a queue: the plugin blocks the API response for the HTTP call duration.

### “Likes only” counter in a TV

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var string $action */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey !== 'modResource' || $request->typeName !== 'like') {
    return;
}

$resource = $modx->getObject(\MODX\Revolution\modResource::class, $request->objectId);
if (!$resource) {
    return;
}

$tv = (int) $resource->getTVValue('likes_mirror');
if ($action === 'added') {
    $tv++;
} elseif ($action === 'removed') {
    $tv = max(0, $tv - 1);
} else {
    return;
}

$resource->setTVValue('likes_mirror', $tv);
```

Watch races under load — more reliable to read the aggregate after recount (deferred bus / cron).

---

## Relation to API and webhooks

| Layer | What happens |
| --- | --- |
| Plugin `OnBeforeReaction` + `cancel` | HTTP `403`, reaction not written, webhook not sent |
| Successful `react` | Events → recount → webhook `reaction.*` → optional author message |
| Widget | Does not see events directly; sees JSON `data.action` / `counts` |

Webhook payload signature: see [Webhooks](webhooks). Event names there use the `reaction.` prefix (`reaction.added`); in MODX they have no prefix (`OnAfterReaction` + `action=added`).

---

## Debugging

1. Set the log level to **INFO** / **ERROR** in MODX system settings.
2. Check `core/cache/logs/error.log` (prefixes `[Reactions]`, your plugin).
3. Confirm the plugin is **enabled** and the event is checked.
4. Cancel test: unpublished resource + the plugin above → API response:

   ```json
   {
     "success": false,
     "error": "…",
     "code": "forbidden"
   }
   ```

5. To debug order, attach a temporary log to all four events and one `curl` to `POST react`.

---

## Plugin checklist

- Do not throw unhandled exceptions from after-hooks: they can become `500` after a committed transaction.
- Do not run long HTTP/email synchronously in after — use a webhook or a queue.
- Do not rely on “multiselect” by set name: multi only when `!exclusive` **and** `reactions_allow_multiple`.
- For UI filters (`&types=`): the API only cuts `reactions_full_types` for `set=full`; block other types via `OnBeforeReaction`.
